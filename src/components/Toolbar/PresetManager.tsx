import { Check, Pencil, Trash2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useEditorStore } from '../../store/editorStore'

export function PresetManager() {
  const [presetName, setPresetName] = useState('')
  const [editingName, setEditingName] = useState<string | null>(null)
  const [draftName, setDraftName] = useState('')
  const [appliedName, setAppliedName] = useState<string | null>(null)
  const appliedTimerRef = useRef<number | null>(null)
  const presets = useEditorStore((state) => state.presets)
  const savePreset = useEditorStore((state) => state.savePreset)
  const applyPreset = useEditorStore((state) => state.applyPreset)
  const deletePreset = useEditorStore((state) => state.deletePreset)
  const renamePreset = useEditorStore((state) => state.renamePreset)
  const trimmedPresetName = presetName.trim()
  const isExistingName = presets.some(
    (preset) => preset.name === trimmedPresetName,
  )
  const isAtLimit = presets.length >= 5 && !isExistingName

  useEffect(
    () => () => {
      if (appliedTimerRef.current) {
        window.clearTimeout(appliedTimerRef.current)
      }
    },
    [],
  )

  function handleSavePreset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!trimmedPresetName || isAtLimit) {
      return
    }

    savePreset(trimmedPresetName)
    setPresetName('')
  }

  function handleApplyPreset(name: string) {
    applyPreset(name)
    setAppliedName(name)

    if (appliedTimerRef.current) {
      window.clearTimeout(appliedTimerRef.current)
    }

    appliedTimerRef.current = window.setTimeout(() => setAppliedName(null), 1400)
  }

  function beginRename(name: string) {
    setEditingName(name)
    setDraftName(name)
  }

  function cancelRename() {
    setEditingName(null)
    setDraftName('')
  }

  function commitRename(fromName: string) {
    const nextName = draftName.trim()

    if (nextName && nextName !== fromName) {
      renamePreset(fromName, nextName)
    }

    cancelRename()
  }

  return (
    <section className="preset-manager">
      <div className="section-heading">
        <span className="control-label">Creator kit</span>
        <span>{presets.length}/5</span>
      </div>

      <form className="preset-form" onSubmit={handleSavePreset}>
        <input
          aria-label="Preset name"
          placeholder="Name this setup"
          type="text"
          value={presetName}
          onChange={(event) => setPresetName(event.target.value)}
        />
        <button disabled={!trimmedPresetName || isAtLimit} type="submit">
          Save
        </button>
      </form>

      {isAtLimit ? (
        <p className="preset-note">Remove or overwrite a preset to save more.</p>
      ) : null}

      <div className="preset-list">
        {presets.length === 0 ? (
          <p className="preset-empty">Saved setups will appear here.</p>
        ) : null}

        {presets.map((preset) => {
          const isEditing = editingName === preset.name

          return (
            <div className="preset-row" key={preset.name}>
              {isEditing ? (
                <input
                  autoFocus
                  aria-label={`Rename ${preset.name}`}
                  className="preset-rename-input"
                  type="text"
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      commitRename(preset.name)
                    }

                    if (event.key === 'Escape') {
                      cancelRename()
                    }
                  }}
                />
              ) : (
                <button
                  className="preset-apply"
                  type="button"
                  onClick={() => handleApplyPreset(preset.name)}
                >
                  <span>{preset.name}</span>
                  <small>{appliedName === preset.name ? 'Applied' : 'Apply'}</small>
                </button>
              )}

              <div className="preset-row-actions">
                {isEditing ? (
                  <>
                    <button
                      aria-label={`Save ${preset.name} name`}
                      title="Save name"
                      type="button"
                      onClick={() => commitRename(preset.name)}
                    >
                      <Check aria-hidden="true" size={15} />
                    </button>
                    <button
                      aria-label={`Cancel renaming ${preset.name}`}
                      title="Cancel"
                      type="button"
                      onClick={cancelRename}
                    >
                      <X aria-hidden="true" size={15} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      aria-label={`Rename ${preset.name}`}
                      title="Rename preset"
                      type="button"
                      onClick={() => beginRename(preset.name)}
                    >
                      <Pencil aria-hidden="true" size={14} />
                    </button>
                    <button
                      aria-label={`Delete ${preset.name}`}
                      className="preset-delete"
                      title="Delete preset"
                      type="button"
                      onClick={() => deletePreset(preset.name)}
                    >
                      <Trash2 aria-hidden="true" size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
