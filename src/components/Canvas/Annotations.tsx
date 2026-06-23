import { useEditorStore } from '../../store/editorStore'

export function Annotations({ line }: { line: number }) {
  const annotationsEnabled = useEditorStore(
    (state) => state.annotationsEnabled,
  )
  const annotation = useEditorStore((state) =>
    state.annotations.find((item) => item.line === line),
  )

  if (!annotationsEnabled || !annotation) {
    return null
  }

  return (
    <span className="line-annotation">
      <span className="annotation-leader" aria-hidden="true" />
      {annotation.text}
    </span>
  )
}
