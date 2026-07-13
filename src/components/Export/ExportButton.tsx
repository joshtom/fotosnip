import { useEffect, useState } from 'react'
import { toBlob, toPng } from 'html-to-image'

type ActionTarget = 'export' | 'copy'
type Feedback = { target: ActionTarget; message: string } | null

export function ExportButton() {
  const [busyAction, setBusyAction] = useState<ActionTarget | null>(null)
  const [feedback, setFeedback] = useState<Feedback>(null)

  useEffect(() => {
    if (!feedback) {
      return
    }

    const timer = window.setTimeout(() => setFeedback(null), 1600)

    return () => window.clearTimeout(timer)
  }, [feedback])

  async function getExportTarget() {
    const target = document.querySelector<HTMLElement>('[data-export-target]')

    if (!target) {
      throw new Error('Export target not found')
    }

    await document.fonts.ready

    return target
  }

  async function downloadPng() {
    try {
      setBusyAction('export')
      const target = await getExportTarget()
      const dataUrl = await getPngDataUrl(target)

      downloadDataUrl(dataUrl)
      setFeedback({ target: 'export', message: 'Exported' })
    } catch {
      setFeedback({ target: 'export', message: 'Export failed' })
    } finally {
      setBusyAction(null)
    }
  }

  async function copyPng() {
    try {
      setBusyAction('copy')

      const target = await getExportTarget()
      const blob = await getPngBlob(target)

      if (!blob || !navigator.clipboard || !('ClipboardItem' in window)) {
        const dataUrl = await getPngDataUrl(target)

        downloadDataUrl(dataUrl)
        setFeedback({ target: 'copy', message: 'Downloaded instead' })
        return
      }

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ])

      setFeedback({ target: 'copy', message: 'Copied' })
    } catch {
      try {
        const target = await getExportTarget()
        const dataUrl = await getPngDataUrl(target)

        downloadDataUrl(dataUrl)
        setFeedback({ target: 'copy', message: 'Downloaded instead' })
      } catch {
        setFeedback({ target: 'copy', message: 'Copy failed' })
      }
    } finally {
      setBusyAction(null)
    }
  }

  const isExporting = busyAction !== null

  return (
    <div className="export-actions">
      <span className="export-action-wrap">
        <button
          className="secondary-action"
          type="button"
          disabled={isExporting}
          onClick={copyPng}
        >
          {busyAction === 'copy' ? 'Copying...' : 'Copy PNG'}
        </button>
        {feedback?.target === 'copy' ? (
          <span className="action-feedback" role="status">
            {feedback.message}
          </span>
        ) : null}
      </span>
      <span className="export-action-wrap">
        <button
          className="primary-action"
          type="button"
          disabled={isExporting}
          onClick={downloadPng}
        >
          {busyAction === 'export' ? 'Exporting...' : 'Export PNG'}
        </button>
        {feedback?.target === 'export' ? (
          <span className="action-feedback" role="status">
            {feedback.message}
          </span>
        ) : null}
      </span>
    </div>
  )
}

function getPngBlob(target: HTMLElement) {
  return toBlob(target, {
    cacheBust: true,
    pixelRatio: 2,
  })
}

function getPngDataUrl(target: HTMLElement) {
  return toPng(target, {
    cacheBust: true,
    pixelRatio: 2,
  })
}

function downloadDataUrl(dataUrl: string) {
  const link = document.createElement('a')

  link.download = `fotosnip-${new Date().toISOString().slice(0, 10)}.png`
  link.href = dataUrl
  link.click()
}
