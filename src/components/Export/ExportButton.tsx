import { useState } from 'react'
import { toBlob, toPng } from 'html-to-image'

type ExportStatus = 'idle' | 'exporting' | 'copied' | 'downloaded' | 'error'

export function ExportButton() {
  const [status, setStatus] = useState<ExportStatus>('idle')

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
      setStatus('exporting')

      const target = await getExportTarget()
      const dataUrl = await toPng(target, {
        cacheBust: true,
        pixelRatio: 2,
      })
      const link = document.createElement('a')

      link.download = `fotosnip-${new Date().toISOString().slice(0, 10)}.png`
      link.href = dataUrl
      link.click()

      setStatus('downloaded')
    } catch {
      setStatus('error')
    }
  }

  async function copyPng() {
    try {
      setStatus('exporting')

      const target = await getExportTarget()
      const blob = await toBlob(target, {
        cacheBust: true,
        pixelRatio: 2,
      })

      if (!blob || !navigator.clipboard || !('ClipboardItem' in window)) {
        throw new Error('PNG clipboard copy is not supported')
      }

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ])

      setStatus('copied')
    } catch {
      setStatus('error')
    }
  }

  const isExporting = status === 'exporting'

  return (
    <div className="export-actions">
      <button
        className="primary-action"
        type="button"
        disabled={isExporting}
        onClick={downloadPng}
      >
        {isExporting ? 'Exporting...' : 'Export PNG'}
      </button>
      <button
        className="secondary-action"
        type="button"
        disabled={isExporting}
        onClick={copyPng}
      >
        Copy PNG
      </button>
      <span className="export-status" role="status">
        {status === 'copied' ? 'Copied' : null}
        {status === 'downloaded' ? 'Downloaded' : null}
        {status === 'error' ? 'Export failed' : null}
      </span>
    </div>
  )
}
