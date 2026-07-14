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
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { Fragment, useState, type ReactNode } from 'react'
import { TitleIcon, titleIconOptions } from '../Canvas/TitleIcons'
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
  const [settingsOpen, setSettingsOpen] = useState(() => {
    if (typeof window === 'undefined') {
      return true
    }

    return !window.matchMedia('(max-width: 900px)').matches
  })
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
  const windowIcon = useEditorStore((state) => state.windowIcon)
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
  const setWindowIcon = useEditorStore((state) => state.setWindowIcon)

  function applyCanvasMode(nextMode: CanvasMode) {
    setCanvasMode(nextMode)
    setTheme(nextMode === 'dark' ? 'github-dark' : 'github-light')
    setBackground({
      type: 'solid',
      value: nextMode === 'dark' ? '#09090b' : '#f4efe7',
    })
  }

  return (
    <Fragment>
      {settingsOpen ? (
        <button
          aria-label="Close settings"
          className="settings-backdrop"
          type="button"
          onClick={() => setSettingsOpen(false)}
        />
      ) : null}
      <aside className={`settings-panel ${settingsOpen ? 'is-expanded' : ''}`}>
      <button
        aria-controls="settings-panel-body"
        aria-expanded={settingsOpen}
        className="settings-summary"
        type="button"
        onClick={() => setSettingsOpen((isOpen) => !isOpen)}
      >
        <span>Settings</span>
        <span aria-hidden="true">+</span>
      </button>

      <div
        aria-hidden={!settingsOpen}
        aria-label="Screenshot controls"
        className="settings-panel-body"
        id="settings-panel-body"
        inert={!settingsOpen}
      >
        <section className="settings-section">
          <div className="settings-section-title">Canvas</div>
          <Control label="Theme">
            <Select
              ariaLabel="Theme"
              options={themeOptions}
              value={theme}
              onValueChange={setTheme}
            />
          </Control>

          <Control label="Mode">
            <div className="segmented-control" aria-label="Canvas mode">
              <button
                aria-label="Dark canvas"
                className={canvasMode === 'dark' ? 'is-active' : ''}
                type="button"
                onClick={() => applyCanvasMode('dark')}
              >
                Dark
              </button>
              <button
                aria-label="Light canvas"
                className={canvasMode === 'light' ? 'is-active' : ''}
                type="button"
                onClick={() => applyCanvasMode('light')}
              >
                Light
              </button>
            </div>
          </Control>

          <Control label="Background">
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
          </Control>

          {background.type === 'gradient' ? (
            <Control label="Gradient">
              <Select
                ariaLabel="Gradient"
                options={gradientOptions}
                value={background.value}
                onValueChange={(value) =>
                  setBackground({ type: 'gradient', value })
                }
              />
            </Control>
          ) : null}

          {background.type === 'solid' ? (
            <Control label="Color">
              <input
                aria-label="Background color"
                type="color"
                value={background.value}
                onChange={(event) =>
                  setBackground({ type: 'solid', value: event.target.value })
                }
              />
            </Control>
          ) : null}
        </section>

        <section className="settings-section">
          <div className="settings-section-title">Frame</div>
          <Control label="Style">
            <Select
              ariaLabel="Frame style"
              options={frameOptions}
              value={frameStyle}
              onValueChange={(value) => setFrameStyle(value as FrameStyle)}
            />
          </Control>

          <Control label="Title icon">
            <TitleIconSelect
              value={windowIcon}
              onValueChange={setWindowIcon}
            />
          </Control>
        </section>

        <section className="settings-section">
          <div className="settings-section-title">Code</div>
          <Control label="Language">
            <Select
              ariaLabel="Language"
              options={languageSelectOptions}
              value={language}
              onValueChange={setLanguage}
            />
          </Control>

          <Control label="Font">
            <Select
              ariaLabel="Font"
              options={fontSelectOptions}
              value={fontFamily}
              onValueChange={setFontFamily}
            />
          </Control>

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
        </section>

        <section className="settings-section">
          <div className="settings-section-title">Layout</div>
          <Control label="Padding">
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
          </Control>

          <Control label="Shadow">
            <Select
              ariaLabel="Shadow"
              options={shadowOptions}
              value={shadow}
              onValueChange={(value) => setShadow(value as ShadowSize)}
            />
          </Control>

          <Control label="Canvas size">
            <Select
              ariaLabel="Canvas size"
              options={canvasSizeOptions}
              value={canvasSize}
              onValueChange={(value) => setCanvasSize(value as CanvasSize)}
            />
          </Control>

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
        </section>

        <section className="settings-section">
          <div className="settings-section-title">Behavior</div>
          <div className="toggle-list">
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
                checked={showWatermark}
                type="checkbox"
                onChange={(event) => setShowWatermark(event.target.checked)}
              />
              Watermark
            </label>
          </div>

          {highlightedLines.length > 0 ? (
            <div className="settings-alert">
              <span>{highlightedLines.length} highlighted line(s)</span>
              <button type="button" onClick={clearHighlights}>
                Clear
              </button>
            </div>
          ) : null}
        </section>

        <PresetManager />
      </div>
      </aside>
    </Fragment>
  )
}

function TitleIconSelect({
  onValueChange,
  value,
}: {
  onValueChange: (value: string) => void
  value: string
}) {
  const currentIcon = titleIconOptions.find((option) => option.value === value)

  return (
    <SelectPrimitive.Root
      value={value || 'none'}
      onValueChange={(nextValue) =>
        onValueChange(nextValue === 'none' ? '' : nextValue)
      }
    >
      <SelectPrimitive.Trigger
        aria-label="Title icon"
        className="select-trigger title-icon-trigger"
      >
        <span className="title-icon-trigger-content">
          {currentIcon ? (
            <TitleIcon
              className="title-icon-option-svg"
              id={currentIcon.value}
            />
          ) : null}
          <SelectPrimitive.Value placeholder="No icon" />
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown aria-hidden="true" size={16} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="select-content title-icon-content"
          position="popper"
          sideOffset={6}
        >
          <SelectPrimitive.Viewport className="select-viewport title-icon-viewport">
            <TitleIconItem value="none">
              <SelectPrimitive.ItemText>No icon</SelectPrimitive.ItemText>
            </TitleIconItem>
            {titleIconOptions.map((option) => (
              <TitleIconItem key={option.value} value={option.value}>
                <TitleIcon
                  className="title-icon-option-svg"
                  id={option.value}
                />
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
              </TitleIconItem>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

function TitleIconItem({
  children,
  value,
}: {
  children: ReactNode
  value: string
}) {
  return (
    <SelectPrimitive.Item
      className="select-item title-icon-item"
      value={value}
    >
      {children}
      <SelectPrimitive.ItemIndicator className="select-indicator">
        <Check aria-hidden="true" size={15} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function Control({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  return (
    <label className="settings-control">
      <span>{label}</span>
      {children}
    </label>
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
