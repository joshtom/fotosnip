import { useEditorStore } from '../../store/editorStore'

export function WindowFrame() {
  const frameStyle = useEditorStore((state) => state.frameStyle)
  const windowTitle = useEditorStore((state) => state.windowTitle)
  const title = windowTitle.trim()

  if (frameStyle === 'frameless') {
    return null
  }

  switch (frameStyle) {
    case 'macos':
      return (
        <div className="window-frame frame-macos">
          <span className="traffic-lights" aria-hidden="true">
            <span className="traffic-light red" />
            <span className="traffic-light yellow" />
            <span className="traffic-light green" />
          </span>
          <span className="window-title">{title}</span>
        </div>
      )
    case 'windows11':
      return (
        <div className="window-frame frame-windows">
          <span className="window-title">{title}</span>
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
          <span className="window-title">{title}</span>
          <span className="gnome-menu" aria-hidden="true" />
        </div>
      )
    case 'linux-kde':
      return (
        <div className="window-frame frame-kde">
          <span className="window-title">{title}</span>
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
          <span className="window-title">{title || 'workspace 1'}</span>
        </div>
      )
    case 'chromeos':
      return (
        <div className="window-frame frame-chromeos">
          <span className="chrome-tab">
            <span className="chrome-dot" aria-hidden="true" />
            <span className="window-title">{title || 'untitled'}</span>
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
