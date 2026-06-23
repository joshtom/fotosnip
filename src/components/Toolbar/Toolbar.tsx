import {
  backgroundTypeOptions,
  canvasSizeOptions,
  fontOptions,
  frameOptions,
  gradientOptions,
  languageOptions,
  paddingOptions,
  shadowOptions,
  themeOptions,
} from '../../lib/options'
import {
  type CanvasSize,
  type FrameStyle,
  type PaddingSize,
  type ShadowSize,
  useEditorStore,
} from '../../store/editorStore'
import { CodeEditor } from '../Editor/CodeEditor'

export function Toolbar() {
  const language = useEditorStore((state) => state.language)
  const frameStyle = useEditorStore((state) => state.frameStyle)
  const windowTitle = useEditorStore((state) => state.windowTitle)
  const theme = useEditorStore((state) => state.theme)
  const fontFamily = useEditorStore((state) => state.fontFamily)
  const fontSize = useEditorStore((state) => state.fontSize)
  const lineHeight = useEditorStore((state) => state.lineHeight)
  const padding = useEditorStore((state) => state.padding)
  const borderRadius = useEditorStore((state) => state.borderRadius)
  const shadow = useEditorStore((state) => state.shadow)
  const background = useEditorStore((state) => state.background)
  const canvasSize = useEditorStore((state) => state.canvasSize)
  const customWidth = useEditorStore((state) => state.customWidth)
  const showLineNumbers = useEditorStore((state) => state.showLineNumbers)
  const wordWrap = useEditorStore((state) => state.wordWrap)
  const showWatermark = useEditorStore((state) => state.showWatermark)
  const annotationsEnabled = useEditorStore(
    (state) => state.annotationsEnabled,
  )
  const setLanguage = useEditorStore((state) => state.setLanguage)
  const setFrameStyle = useEditorStore((state) => state.setFrameStyle)
  const setWindowTitle = useEditorStore((state) => state.setWindowTitle)
  const setTheme = useEditorStore((state) => state.setTheme)
  const setFontFamily = useEditorStore((state) => state.setFontFamily)
  const setFontSize = useEditorStore((state) => state.setFontSize)
  const setLineHeight = useEditorStore((state) => state.setLineHeight)
  const setPadding = useEditorStore((state) => state.setPadding)
  const setBorderRadius = useEditorStore((state) => state.setBorderRadius)
  const setShadow = useEditorStore((state) => state.setShadow)
  const setBackground = useEditorStore((state) => state.setBackground)
  const setCanvasSize = useEditorStore((state) => state.setCanvasSize)
  const setCustomWidth = useEditorStore((state) => state.setCustomWidth)
  const setShowLineNumbers = useEditorStore(
    (state) => state.setShowLineNumbers,
  )
  const setWordWrap = useEditorStore((state) => state.setWordWrap)
  const setShowWatermark = useEditorStore((state) => state.setShowWatermark)
  const setAnnotationsEnabled = useEditorStore(
    (state) => state.setAnnotationsEnabled,
  )

  return (
    <aside className="toolbar" aria-label="Screenshot controls">
      <section className="control-section">
        <span className="control-label">Code</span>
        <CodeEditor />
      </section>

      <section className="control-section">
        <label className="control-label" htmlFor="language-select">
          Language
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          {languageOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </section>

      <section className="control-section">
        <label className="control-label" htmlFor="frame-select">
          Frame style
        </label>
        <select
          id="frame-select"
          value={frameStyle}
          onChange={(event) => setFrameStyle(event.target.value as FrameStyle)}
        >
          {frameOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </section>

      <section className="control-section">
        <label className="control-label" htmlFor="window-title">
          Window title
        </label>
        <input
          id="window-title"
          value={windowTitle}
          onChange={(event) => setWindowTitle(event.target.value)}
          placeholder="auth.ts"
          type="text"
        />
      </section>

      <section className="control-section">
        <label className="control-label" htmlFor="theme-select">
          Theme
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={(event) => setTheme(event.target.value)}
        >
          {themeOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </section>

      <section className="control-section">
        <label className="control-label" htmlFor="font-select">
          Font
        </label>
        <select
          id="font-select"
          value={fontFamily}
          onChange={(event) => setFontFamily(event.target.value)}
        >
          {fontOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </section>

      <section className="range-grid">
        <label className="control-label" htmlFor="font-size">
          Font size
        </label>
        <span>{fontSize}px</span>
        <input
          id="font-size"
          max="20"
          min="12"
          type="range"
          value={fontSize}
          onChange={(event) => setFontSize(Number(event.target.value))}
        />
      </section>

      <section className="range-grid">
        <label className="control-label" htmlFor="line-height">
          Line height
        </label>
        <span>{lineHeight.toFixed(1)}</span>
        <input
          id="line-height"
          max="2"
          min="1.2"
          step="0.1"
          type="range"
          value={lineHeight}
          onChange={(event) => setLineHeight(Number(event.target.value))}
        />
      </section>

      <section className="control-grid">
        <label>
          <span className="control-label">Padding</span>
          <select
            value={padding}
            onChange={(event) => setPadding(event.target.value as PaddingSize)}
          >
            {paddingOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="control-label">Shadow</span>
          <select
            value={shadow}
            onChange={(event) => setShadow(event.target.value as ShadowSize)}
          >
            {shadowOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="range-grid">
        <label className="control-label" htmlFor="radius">
          Radius
        </label>
        <span>{borderRadius}px</span>
        <input
          id="radius"
          max="20"
          min="0"
          type="range"
          value={borderRadius}
          onChange={(event) => setBorderRadius(Number(event.target.value))}
        />
      </section>

      <section className="control-section">
        <label className="control-label" htmlFor="background-type">
          Background
        </label>
        <select
          id="background-type"
          value={background.type}
          onChange={(event) => {
            const nextType = event.target.value

            if (nextType === 'solid') {
              setBackground({ type: 'solid', value: '#0f172a' })
            } else if (nextType === 'gradient') {
              setBackground({ type: 'gradient', value: gradientOptions[0].value })
            } else {
              setBackground({ type: 'transparent', value: 'transparent' })
            }
          }}
        >
          {backgroundTypeOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </section>

      {background.type === 'solid' ? (
        <section className="swatch-row">
          <input
            aria-label="Background color"
            type="color"
            value={background.value}
            onChange={(event) =>
              setBackground({ type: 'solid', value: event.target.value })
            }
          />
          <span>{background.value}</span>
        </section>
      ) : null}

      {background.type === 'gradient' ? (
        <section className="control-section">
          <label className="control-label" htmlFor="gradient-select">
            Gradient
          </label>
          <select
            id="gradient-select"
            value={background.value}
            onChange={(event) =>
              setBackground({ type: 'gradient', value: event.target.value })
            }
          >
            {gradientOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </section>
      ) : null}

      <section className="control-section">
        <label className="control-label" htmlFor="canvas-size">
          Canvas size
        </label>
        <select
          id="canvas-size"
          value={canvasSize}
          onChange={(event) => setCanvasSize(event.target.value as CanvasSize)}
        >
          {canvasSizeOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </section>

      {canvasSize === 'custom' ? (
        <section className="range-grid">
          <label className="control-label" htmlFor="custom-width">
            Custom width
          </label>
          <span>{customWidth}px</span>
          <input
            id="custom-width"
            max="1800"
            min="640"
            step="20"
            type="range"
            value={customWidth}
            onChange={(event) => setCustomWidth(Number(event.target.value))}
          />
        </section>
      ) : null}

      <section className="toggle-list">
        <label>
          <input
            checked={showLineNumbers}
            type="checkbox"
            onChange={(event) => setShowLineNumbers(event.target.checked)}
          />
          Line numbers
        </label>
        <label>
          <input
            checked={wordWrap}
            type="checkbox"
            onChange={(event) => setWordWrap(event.target.checked)}
          />
          Word wrap
        </label>
        <label>
          <input
            checked={annotationsEnabled}
            type="checkbox"
            onChange={(event) => setAnnotationsEnabled(event.target.checked)}
          />
          AI Annotate
        </label>
        <label>
          <input
            checked={showWatermark}
            type="checkbox"
            onChange={(event) => setShowWatermark(event.target.checked)}
          />
          Watermark
        </label>
      </section>
    </aside>
  )
}
