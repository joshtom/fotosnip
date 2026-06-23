import { useAnnotations } from './useAnnotations'
import { useEditorStore } from '../../store/editorStore'
import { Select } from '../ui/Select'

export function AnnotationPanel() {
  const { requestAnnotations } = useAnnotations()
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

      <div className="control-section">
        <span className="control-label">Mode</span>
        <Select
          ariaLabel="Annotation mode"
          options={[
            { value: 'explain', label: 'Explain' },
            { value: 'teach', label: 'Teach' },
            { value: 'review', label: 'Review' },
          ]}
          value={annotationMode}
          onValueChange={setAnnotationMode}
        />
      </div>

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
