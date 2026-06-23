import { useEditorStore } from '../../store/editorStore'

export function WindowFrame() {
  const frameStyle = useEditorStore((state) => state.frameStyle)
  const windowTitle = useEditorStore((state) => state.windowTitle)

  if (frameStyle === 'frameless') {
    return null
  }

  if (frameStyle === 'macos') {
    return (
      <div className="window-frame macos-frame">
        <span className="traffic-light red" />
        <span className="traffic-light yellow" />
        <span className="traffic-light green" />
        <span className="window-title">{windowTitle}</span>
      </div>
    )
  }

  if (frameStyle === 'linux-gnome') {
    return (
      <div className="window-frame gnome-frame">
        <span className="gnome-close">x</span>
        <span className="window-title">{windowTitle}</span>
      </div>
    )
  }

  if (frameStyle === 'linux-i3') {
    return (
      <div className="window-frame i3-frame">
        <span className="window-title">{windowTitle || 'workspace 1'}</span>
      </div>
    )
  }

  return (
    <div className={`window-frame ${frameStyle}-frame`}>
      <span className="window-title">{windowTitle}</span>
      <span className="window-controls" aria-hidden="true">
        <span>_</span>
        <span>{frameStyle === 'chromeos' ? 'x' : '□'}</span>
        {frameStyle !== 'chromeos' ? <span>x</span> : null}
      </span>
    </div>
  )
}
