import { useState } from 'react'
import { toBlob, toPng } from 'html-to-image'
import { Copy, Download } from 'lucide-react'

type ExportStatus =
  | 'idle'
  | 'exporting'
  | 'copied'
  | 'downloaded'
  | 'downloadedFallback'
  | 'error'

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
      const dataUrl = await getPngDataUrl(target)

      downloadDataUrl(dataUrl)

      setStatus('downloaded')
    } catch {
      setStatus('error')
    }
  }

  async function copyPng() {
    try {
      setStatus('exporting')

      const target = await getExportTarget()
      const blob = await getPngBlob(target)

      if (!blob || !navigator.clipboard || !('ClipboardItem' in window)) {
        const dataUrl = await getPngDataUrl(target)

        downloadDataUrl(dataUrl)
        setStatus('downloadedFallback')
        return
      }

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ])

      setStatus('copied')
    } catch {
      try {
        const target = await getExportTarget()
        const dataUrl = await getPngDataUrl(target)

        downloadDataUrl(dataUrl)
        setStatus('downloadedFallback')
      } catch {
        setStatus('error')
      }
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
        <Download aria-hidden="true" size={17} />
        {isExporting ? 'Exporting...' : 'Export PNG'}
      </button>
      <button
        className="secondary-action"
        type="button"
        disabled={isExporting}
        onClick={copyPng}
      >
        <Copy aria-hidden="true" size={16} />
        Copy PNG
      </button>
      <span className="export-status" role="status">
        {status === 'copied' ? 'Copied' : null}
        {status === 'downloaded' ? 'Downloaded' : null}
        {status === 'downloadedFallback' ? 'Downloaded instead' : null}
        {status === 'error' ? 'Export failed' : null}
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
