import { useState } from 'react'

import { useEditorStore } from '../../store/editorStore'

export function PresetManager() {
  const [presetName, setPresetName] = useState('')
  const [draftNames, setDraftNames] = useState<Record<string, string>>({})
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

  function handleSavePreset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!trimmedPresetName || isAtLimit) {
      return
    }

    savePreset(trimmedPresetName)
    setPresetName('')
  }

  function handleRenamePreset(fromName: string) {
    const nextName = (draftNames[fromName] ?? '').trim()

    if (!nextName || nextName === fromName) {
      return
    }

    renamePreset(fromName, nextName)
    setDraftNames((currentNames) => {
      const { [fromName]: _removedName, ...remainingNames } = currentNames

      return remainingNames
    })
  }

  return (
    <section className="preset-manager">
      <div className="section-heading">
        <span className="control-label">Presets</span>
        <span>{presets.length}/5</span>
      </div>

      <form className="preset-form" onSubmit={handleSavePreset}>
        <input
          aria-label="Preset name"
          placeholder="Creator kit"
          type="text"
          value={presetName}
          onChange={(event) => setPresetName(event.target.value)}
        />
        <button disabled={!trimmedPresetName || isAtLimit} type="submit">
          Save
        </button>
      </form>

      {isAtLimit ? (
        <p className="preset-note">Delete or overwrite a preset to save more.</p>
      ) : null}

      <div className="preset-list">
        {presets.length === 0 ? (
          <p className="preset-empty">No presets saved.</p>
        ) : null}

        {presets.map((preset) => {
          const draftName = draftNames[preset.name] ?? preset.name
          const canRename = draftName.trim() && draftName.trim() !== preset.name

          return (
            <div className="preset-card" key={preset.name}>
              <input
                aria-label={`Rename ${preset.name}`}
                type="text"
                value={draftName}
                onChange={(event) =>
                  setDraftNames((currentNames) => ({
                    ...currentNames,
                    [preset.name]: event.target.value,
                  }))
                }
              />
              <div className="preset-actions">
                <button type="button" onClick={() => applyPreset(preset.name)}>
                  Apply
                </button>
                <button
                  disabled={!canRename}
                  type="button"
                  onClick={() => handleRenamePreset(preset.name)}
                >
                  Rename
                </button>
                <button type="button" onClick={() => deletePreset(preset.name)}>
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
