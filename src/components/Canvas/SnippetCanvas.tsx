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
  soft: '0 16px 40px rgba(15, 23, 42, 0.18)',
  medium: '0 28px 70px rgba(15, 23, 42, 0.28)',
  strong: '0 38px 90px rgba(15, 23, 42, 0.36)',
  dramatic: '0 48px 120px rgba(15, 23, 42, 0.5)',
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
  const code = useEditorStore((state) => state.code)
  const fontFamily = useEditorStore((state) => state.fontFamily)
  const fontSize = useEditorStore((state) => state.fontSize)
  const lineHeight = useEditorStore((state) => state.lineHeight)
  const padding = useEditorStore((state) => state.padding)
  const borderRadius = useEditorStore((state) => state.borderRadius)
  const shadow = useEditorStore((state) => state.shadow)
  const background = useEditorStore((state) => state.background)
  const showLineNumbers = useEditorStore((state) => state.showLineNumbers)
  const wordWrap = useEditorStore((state) => state.wordWrap)
  const highlightedLines = useEditorStore((state) => state.highlightedLines)
  const showWatermark = useEditorStore((state) => state.showWatermark)
  const canvasSize = useEditorStore((state) => state.canvasSize)
  const customWidth = useEditorStore((state) => state.customWidth)
  const toggleLineHighlight = useEditorStore(
    (state) => state.toggleLineHighlight,
  )

  const lines = code.length > 0 ? code.split('\n') : ['']
  const hasHighlights = highlightedLines.length > 0
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
          className="export-canvas"
          style={{
            ...canvasStyle,
            background: backgroundValue,
            padding: paddingMap[padding],
          }}
        >
          <article
            className="snippet-card"
            style={{
              borderRadius,
              boxShadow: shadowMap[shadow],
            }}
          >
            <WindowFrame />
            <div
              className="code-preview"
              style={{
                fontFamily: `"${fontFamily}", ui-monospace, SFMono-Regular, Menlo, monospace`,
                fontSize,
                lineHeight,
              }}
            >
              {lines.map((line, index) => {
                const lineNumber = index + 1
                const isHighlighted = highlightedLines.includes(lineNumber)
                const isDimmed = hasHighlights && !isHighlighted

                return (
                  <div
                    className={`code-line ${isDimmed ? 'is-dimmed' : ''}`}
                    key={`${lineNumber}-${line}`}
                  >
                    {showLineNumbers ? (
                      <button
                        aria-label={`Toggle highlight for line ${lineNumber}`}
                        className={`line-number ${
                          isHighlighted ? 'is-highlighted' : ''
                        }`}
                        type="button"
                        onClick={() => toggleLineHighlight(lineNumber)}
                      >
                        {lineNumber}
                      </button>
                    ) : null}
                    <code className={wordWrap ? 'wrap-code' : 'nowrap-code'}>
                      {line || ' '}
                    </code>
                  </div>
                )
              })}
            </div>
            {showWatermark ? (
              <span className="watermark">made with Fotosnip</span>
            ) : null}
          </article>
        </div>
      </div>
    </section>
  )
}
