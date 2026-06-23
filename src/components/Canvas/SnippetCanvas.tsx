import { CodeEditor } from '../Editor/CodeEditor'
import { WindowFrame } from './WindowFrame'
import { useEditorStore } from '../../store/editorStore'

const paddingMap = {
  xs: 20,
  s: 28,
  m: 40,
  l: 56,
  xl: 72,
}

const shadowMap = {
  none: 'none',
  soft: '0 18px 48px rgba(0, 0, 0, 0.28)',
  medium: '0 30px 80px rgba(0, 0, 0, 0.36)',
  strong: '0 42px 110px rgba(0, 0, 0, 0.46)',
  dramatic: '0 56px 150px rgba(0, 0, 0, 0.6)',
}

const canvasMap = {
  auto: {},
  twitter: { width: '1200px', aspectRatio: '1200 / 675' },
  linkedin: { width: '1200px', aspectRatio: '1200 / 627' },
  'instagram-square': { width: '1080px', aspectRatio: '1 / 1' },
  'instagram-story': { width: '1080px', aspectRatio: '1080 / 1920' },
  custom: {},
}

export function SnippetCanvas() {
  const padding = useEditorStore((state) => state.padding)
  const borderRadius = useEditorStore((state) => state.borderRadius)
  const shadow = useEditorStore((state) => state.shadow)
  const background = useEditorStore((state) => state.background)
  const showWatermark = useEditorStore((state) => state.showWatermark)
  const annotationsEnabled = useEditorStore(
    (state) => state.annotationsEnabled,
  )
  const annotations = useEditorStore((state) => state.annotations)
  const canvasMode = useEditorStore((state) => state.canvasMode)
  const canvasSize = useEditorStore((state) => state.canvasSize)
  const customWidth = useEditorStore((state) => state.customWidth)
  const isLight = canvasMode === 'light'
  const backgroundValue =
    background.type === 'transparent' ? 'transparent' : background.value
  const canvasStyle =
    canvasSize === 'custom'
      ? { width: `${customWidth}px` }
      : canvasMap[canvasSize]

  return (
    <section className="canvas-stage" aria-label="Live screenshot preview">
      <div className="canvas-scroll">
        <div
          className={`export-canvas export-canvas-${canvasMode}`}
          data-export-target="true"
          style={{
            ...canvasStyle,
            background: backgroundValue,
            padding: paddingMap[padding],
          }}
        >
          <article
            className={`snippet-card snippet-card-${canvasMode}`}
            style={{
              background: isLight ? '#fff8ef' : '#1f1a2b',
              borderRadius,
              boxShadow: shadowMap[shadow],
              color: isLight ? '#293445' : '#e7e8ec',
            }}
          >
            <WindowFrame />
            <CodeEditor variant="canvas" />

            {annotationsEnabled && annotations.length > 0 ? (
              <aside className="annotation-stack" aria-label="AI annotations">
                {annotations.map((annotation) => (
                  <div className="annotation-chip" key={annotation.line}>
                    <span>Line {annotation.line}</span>
                    <p>{annotation.text}</p>
                  </div>
                ))}
              </aside>
            ) : null}

            {showWatermark ? (
              <span className="watermark">made with Fotosnip</span>
            ) : null}
          </article>
        </div>
      </div>
    </section>
  )
}
