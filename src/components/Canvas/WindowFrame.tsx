import { useEditorStore } from '../../store/editorStore'
import { TitleIcon } from './TitleIcons'

export function WindowFrame() {
  const frameStyle = useEditorStore((state) => state.frameStyle)
  const windowTitle = useEditorStore((state) => state.windowTitle)
  const windowIcon = useEditorStore((state) => state.windowIcon)
  const setWindowTitle = useEditorStore((state) => state.setWindowTitle)

  if (frameStyle === 'frameless') {
    return null
  }

  const titleInput = (fallback: string) => (
    <span className="window-title-field">
      {windowIcon.trim() ? (
        <TitleIcon className="window-title-icon" id={windowIcon} />
      ) : null}
      <input
        aria-label="Window title"
        className="window-title-input"
        placeholder={fallback}
        type="text"
        value={windowTitle}
        onChange={(event) => setWindowTitle(event.target.value)}
      />
    </span>
  )

  switch (frameStyle) {
    case 'macos':
      return (
        <div className="window-frame frame-macos">
          <span className="traffic-lights" aria-hidden="true">
            <span className="traffic-light red" />
            <span className="traffic-light yellow" />
            <span className="traffic-light green" />
          </span>
          {titleInput('utils.ts')}
        </div>
      )
    case 'windows11':
      return (
        <div className="window-frame frame-windows">
          {titleInput('utils.ts')}
          <span className="window-controls controls-windows" aria-hidden="true">
            <span className="control-icon minimize" />
            <span className="control-icon maximize" />
            <span className="control-icon close" />
          </span>
        </div>
      )
    case 'linux-gnome':
      return (
        <div className="window-frame frame-gnome">
          <span className="gnome-close" aria-hidden="true" />
          {titleInput('utils.ts')}
          <span className="gnome-menu" aria-hidden="true" />
        </div>
      )
    case 'linux-kde':
      return (
        <div className="window-frame frame-kde">
          {titleInput('utils.ts')}
          <span className="window-controls controls-kde" aria-hidden="true">
            <span className="control-icon kde-close" />
            <span className="control-icon minimize" />
            <span className="control-icon maximize" />
          </span>
        </div>
      )
    case 'linux-i3':
      return (
        <div className="window-frame frame-i3">
          {titleInput('workspace 1')}
        </div>
      )
    case 'chromeos':
      return (
        <div className="window-frame frame-chromeos">
          <span className="chrome-tab">
            <span className="chrome-dot" aria-hidden="true" />
            {titleInput('untitled')}
          </span>
          <span className="window-controls controls-chromeos" aria-hidden="true">
            <span className="control-icon close" />
          </span>
        </div>
      )
    default:
      return null
  }
}
