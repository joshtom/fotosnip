import {
  Bot,
  Braces,
  CaseSensitive,
  Frame,
  Hash,
  Image,
  Moon,
  Palette,
  PanelTop,
  SlidersHorizontal,
  Sun,
  Type,
  WrapText,
} from 'lucide-react'
import type { ReactNode } from 'react'

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
  type Background,
  type CanvasMode,
  type CanvasSize,
  type FrameStyle,
  type PaddingSize,
  type ShadowSize,
  useEditorStore,
} from '../../store/editorStore'
import { AnnotationPanel } from '../AI/AnnotationPanel'
import { Select } from '../ui/Select'
import { PresetManager } from './PresetManager'

const languageSelectOptions = languageOptions.map((item) => ({
  value: item,
  label: item,
}))

const fontSelectOptions = fontOptions.map((item) => ({
  value: item,
  label: item,
}))

export function Toolbar() {
  const language = useEditorStore((state) => state.language)
  const frameStyle = useEditorStore((state) => state.frameStyle)
  const theme = useEditorStore((state) => state.theme)
  const fontFamily = useEditorStore((state) => state.fontFamily)
  const fontSize = useEditorStore((state) => state.fontSize)
  const lineHeight = useEditorStore((state) => state.lineHeight)
  const padding = useEditorStore((state) => state.padding)
  const borderRadius = useEditorStore((state) => state.borderRadius)
  const shadow = useEditorStore((state) => state.shadow)
  const background = useEditorStore((state) => state.background)
  const canvasMode = useEditorStore((state) => state.canvasMode)
  const canvasSize = useEditorStore((state) => state.canvasSize)
  const customWidth = useEditorStore((state) => state.customWidth)
  const showLineNumbers = useEditorStore((state) => state.showLineNumbers)
  const wordWrap = useEditorStore((state) => state.wordWrap)
  const highlightedLines = useEditorStore((state) => state.highlightedLines)
  const showWatermark = useEditorStore((state) => state.showWatermark)
  const annotationsEnabled = useEditorStore(
    (state) => state.annotationsEnabled,
  )
  const setLanguage = useEditorStore((state) => state.setLanguage)
  const setFrameStyle = useEditorStore((state) => state.setFrameStyle)
  const setTheme = useEditorStore((state) => state.setTheme)
  const setFontFamily = useEditorStore((state) => state.setFontFamily)
  const setFontSize = useEditorStore((state) => state.setFontSize)
  const setLineHeight = useEditorStore((state) => state.setLineHeight)
  const setPadding = useEditorStore((state) => state.setPadding)
  const setBorderRadius = useEditorStore((state) => state.setBorderRadius)
  const setShadow = useEditorStore((state) => state.setShadow)
  const setBackground = useEditorStore((state) => state.setBackground)
  const setCanvasMode = useEditorStore((state) => state.setCanvasMode)
  const setCanvasSize = useEditorStore((state) => state.setCanvasSize)
  const setCustomWidth = useEditorStore((state) => state.setCustomWidth)
  const setShowLineNumbers = useEditorStore(
    (state) => state.setShowLineNumbers,
  )
  const setWordWrap = useEditorStore((state) => state.setWordWrap)
  const clearHighlights = useEditorStore((state) => state.clearHighlights)
  const setShowWatermark = useEditorStore((state) => state.setShowWatermark)
  const setAnnotationsEnabled = useEditorStore(
    (state) => state.setAnnotationsEnabled,
  )

  function applyCanvasMode(nextMode: CanvasMode) {
    setCanvasMode(nextMode)
    setTheme(nextMode === 'dark' ? 'github-dark' : 'github-light')
    setBackground({
      type: 'solid',
      value: nextMode === 'dark' ? '#09090b' : '#f4efe7',
    })
  }

  return (
    <aside className="control-rail" aria-label="Screenshot controls">
      <div className="rail-scroll">
        <RailControl icon={<Palette size={15} />} label="Theme">
          <Select
            ariaLabel="Theme"
            options={themeOptions}
            value={theme}
            onValueChange={setTheme}
          />
        </RailControl>

        <RailControl icon={<Moon size={15} />} label="Canvas">
          <div className="segmented-control" aria-label="Canvas mode">
            <button
              aria-label="Dark canvas"
              className={canvasMode === 'dark' ? 'is-active' : ''}
              type="button"
              onClick={() => applyCanvasMode('dark')}
            >
              <Moon size={15} />
            </button>
            <button
              aria-label="Light canvas"
              className={canvasMode === 'light' ? 'is-active' : ''}
              type="button"
              onClick={() => applyCanvasMode('light')}
            >
              <Sun size={15} />
            </button>
          </div>
        </RailControl>

        <RailControl icon={<Image size={15} />} label="Background">
          <Select
            ariaLabel="Background"
            options={backgroundTypeOptions}
            value={background.type}
            onValueChange={(nextType) => {
              const typedNextType = nextType as Background['type']

              if (typedNextType === 'solid') {
                setBackground({
                  type: 'solid',
                  value: canvasMode === 'dark' ? '#09090b' : '#f4efe7',
                })
              } else if (typedNextType === 'gradient') {
                setBackground({
                  type: 'gradient',
                  value: gradientOptions[0].value,
                })
              } else {
                setBackground({ type: 'transparent', value: 'transparent' })
              }
            }}
          />
        </RailControl>

        {background.type === 'gradient' ? (
          <RailControl icon={<SlidersHorizontal size={15} />} label="Gradient">
            <Select
              ariaLabel="Gradient"
              options={gradientOptions}
              value={background.value}
              onValueChange={(value) =>
                setBackground({ type: 'gradient', value })
              }
            />
          </RailControl>
        ) : null}

        <RailControl icon={<PanelTop size={15} />} label="Frame">
          <Select
            ariaLabel="Frame style"
            options={frameOptions}
            value={frameStyle}
            onValueChange={(value) => setFrameStyle(value as FrameStyle)}
          />
        </RailControl>

        <RailControl icon={<Braces size={15} />} label="Language">
          <Select
            ariaLabel="Language"
            options={languageSelectOptions}
            value={language}
            onValueChange={setLanguage}
          />
        </RailControl>

        <RailControl icon={<CaseSensitive size={15} />} label="Padding">
          <div className="segmented-control padding-segments">
            {paddingOptions.map((option) => (
              <button
                className={padding === option.value ? 'is-active' : ''}
                key={option.value}
                type="button"
                onClick={() => setPadding(option.value as PaddingSize)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </RailControl>

        <RailToggle
          active={showLineNumbers}
          icon={<Hash size={15} />}
          label="Lines"
          onClick={() => setShowLineNumbers(!showLineNumbers)}
        />

        <RailToggle
          active={wordWrap}
          icon={<WrapText size={15} />}
          label="Wrap"
          onClick={() => setWordWrap(!wordWrap)}
        />

        <RailToggle
          active={annotationsEnabled}
          icon={<Bot size={15} />}
          label="AI"
          onClick={() => setAnnotationsEnabled(!annotationsEnabled)}
        />

        <RailToggle
          active={showWatermark}
          icon={<Image size={15} />}
          label="Mark"
          onClick={() => setShowWatermark(!showWatermark)}
        />
      </div>

      {highlightedLines.length > 0 ? (
        <div className="rail-alert">
          <span>{highlightedLines.length} highlighted line(s)</span>
          <button type="button" onClick={clearHighlights}>
            Clear
          </button>
        </div>
      ) : null}

      <details className="rail-more">
        <summary>
          <SlidersHorizontal size={15} />
          More
        </summary>
        <div className="rail-drawer">
          <div className="advanced-grid">
            <RailControl icon={<Type size={15} />} label="Font">
              <Select
                ariaLabel="Font"
                options={fontSelectOptions}
                value={fontFamily}
                onValueChange={setFontFamily}
              />
            </RailControl>

            <RailControl icon={<Frame size={15} />} label="Size">
              <Select
                ariaLabel="Canvas size"
                options={canvasSizeOptions}
                value={canvasSize}
                onValueChange={(value) => setCanvasSize(value as CanvasSize)}
              />
            </RailControl>

            <RailControl icon={<SlidersHorizontal size={15} />} label="Shadow">
              <Select
                ariaLabel="Shadow"
                options={shadowOptions}
                value={shadow}
                onValueChange={(value) => setShadow(value as ShadowSize)}
              />
            </RailControl>

            {background.type === 'solid' ? (
              <label className="color-control">
                <span className="rail-label">Color</span>
                <input
                  aria-label="Background color"
                  type="color"
                  value={background.value}
                  onChange={(event) =>
                    setBackground({
                      type: 'solid',
                      value: event.target.value,
                    })
                  }
                />
              </label>
            ) : null}
          </div>

          <div className="range-panel">
            <RangeControl
              label="Font size"
              max={20}
              min={12}
              value={fontSize}
              valueLabel={`${fontSize}px`}
              onChange={setFontSize}
            />
            <RangeControl
              label="Line height"
              max={2}
              min={1.2}
              step={0.1}
              value={lineHeight}
              valueLabel={lineHeight.toFixed(1)}
              onChange={setLineHeight}
            />
            <RangeControl
              label="Radius"
              max={20}
              min={0}
              value={borderRadius}
              valueLabel={`${borderRadius}px`}
              onChange={setBorderRadius}
            />
            {canvasSize === 'custom' ? (
              <RangeControl
                label="Custom width"
                max={1800}
                min={640}
                step={20}
                value={customWidth}
                valueLabel={`${customWidth}px`}
                onChange={setCustomWidth}
              />
            ) : null}
          </div>

          <AnnotationPanel />
          <PresetManager />
        </div>
      </details>
    </aside>
  )
}

function RailControl({
  children,
  icon,
  label,
}: {
  children: ReactNode
  icon: ReactNode
  label: string
}) {
  return (
    <section className="rail-control">
      <span className="rail-label">
        {icon}
        {label}
      </span>
      {children}
    </section>
  )
}

function RailToggle({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean
  icon: ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      aria-pressed={active}
      className={`rail-toggle ${active ? 'is-active' : ''}`}
      type="button"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function RangeControl({
  label,
  max,
  min,
  onChange,
  step,
  value,
  valueLabel,
}: {
  label: string
  max: number
  min: number
  onChange: (value: number) => void
  step?: number
  value: number
  valueLabel: string
}) {
  return (
    <label className="range-control">
      <span>{label}</span>
      <strong>{valueLabel}</strong>
      <input
        max={max}
        min={min}
        step={step}
        type="range"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  )
}
