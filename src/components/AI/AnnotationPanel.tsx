import { useAnnotations } from './useAnnotations'
import { useEditorStore } from '../../store/editorStore'

export function AnnotationPanel() {
  const { apiKey, setApiKey, requestAnnotations } = useAnnotations()
  const annotationsEnabled = useEditorStore(
    (state) => state.annotationsEnabled,
  )
  const annotationMode = useEditorStore((state) => state.annotationMode)
  const annotations = useEditorStore((state) => state.annotations)
  const annotationsLoading = useEditorStore(
    (state) => state.annotationsLoading,
  )
  const annotationsError = useEditorStore((state) => state.annotationsError)
  const setAnnotationMode = useEditorStore((state) => state.setAnnotationMode)
  const updateAnnotation = useEditorStore((state) => state.updateAnnotation)
  const deleteAnnotation = useEditorStore((state) => state.deleteAnnotation)

  if (!annotationsEnabled) {
    return null
  }

  return (
    <section className="annotation-panel">
      <div className="section-heading">
        <span className="control-label">AI Annotate</span>
        <span>{annotations.length}/8</span>
      </div>

      <label className="control-section">
        <span className="control-label">Gemini API key</span>
        <input
          autoComplete="off"
          placeholder="Stored locally"
          type="password"
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
        />
      </label>

      <label className="control-section">
        <span className="control-label">Mode</span>
        <select
          value={annotationMode}
          onChange={(event) =>
            setAnnotationMode(event.target.value as typeof annotationMode)
          }
        >
          <option value="explain">Explain</option>
          <option value="teach">Teach</option>
          <option value="review">Review</option>
        </select>
      </label>

      <button
        className="annotation-action"
        disabled={annotationsLoading}
        type="button"
        onClick={requestAnnotations}
      >
        {annotationsLoading ? 'Annotating...' : 'Generate annotations'}
      </button>

      {annotationsError ? <p className="error-text">{annotationsError}</p> : null}

      <div className="annotation-list">
        {annotations.map((annotation) => (
          <div className="annotation-edit-card" key={annotation.line}>
            <span>Line {annotation.line}</span>
            <textarea
              value={annotation.text}
              onChange={(event) =>
                updateAnnotation(annotation.line, event.target.value)
              }
            />
            <button
              type="button"
              onClick={() => deleteAnnotation(annotation.line)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
