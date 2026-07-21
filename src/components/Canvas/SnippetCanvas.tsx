import { useEffect, useRef } from 'react'

import { CodeEditor } from '../Editor/CodeEditor'
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
  soft: '0 22px 48px -26px rgba(0, 0, 0, 0.38)',
  medium: '0 34px 82px -34px rgba(0, 0, 0, 0.48)',
  strong: '0 48px 112px -42px rgba(0, 0, 0, 0.58)',
  dramatic: '0 64px 150px -50px rgba(0, 0, 0, 0.68)',
}

const canvasMap = {
  auto: {},
  twitter: { width: '1200px', height: '675px' },
  linkedin: { width: '1200px', height: '627px' },
  'instagram-square': { width: '1080px', height: '1080px' },
  'instagram-story': { width: '1080px', height: '1920px' },
  custom: {},
}

export function SnippetCanvas() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const padding = useEditorStore((state) => state.padding)
  const borderRadius = useEditorStore((state) => state.borderRadius)
  const shadow = useEditorStore((state) => state.shadow)
  const background = useEditorStore((state) => state.background)
  const showWatermark = useEditorStore((state) => state.showWatermark)
  const canvasMode = useEditorStore((state) => state.canvasMode)
  const canvasSize = useEditorStore((state) => state.canvasSize)
  const customWidth = useEditorStore((state) => state.customWidth)
  const isLight = canvasMode === 'light'
  const backgroundValue =
    background.type === 'transparent' ? 'transparent' : background.value
  const canvasStyle =
    canvasSize === 'custom'
      ? { width: `${customWidth}px` }
      : canvasMap[canvasSize]

  useEffect(() => {
    const scrollContainer = scrollRef.current

    if (!scrollContainer) {
      return
    }

    const focusCanvas = () => {
      const snippetCard =
        scrollContainer.querySelector<HTMLElement>('.snippet-card')

      if (!snippetCard) {
        return
      }

      const scrollBounds = scrollContainer.getBoundingClientRect()
      const cardBounds = snippetCard.getBoundingClientRect()
      const scrollPadding = Number.parseFloat(
        window.getComputedStyle(scrollContainer).paddingLeft,
      )
      const cardStart =
        cardBounds.left -
        scrollBounds.left +
        scrollContainer.scrollLeft -
        scrollPadding

      scrollContainer.scrollLeft = Math.max(0, cardStart)
    }
    const frame = window.requestAnimationFrame(focusCanvas)

    window.addEventListener('resize', focusCanvas)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', focusCanvas)
    }
  }, [canvasSize, customWidth])

  return (
    <section className="canvas-stage" aria-label="Live screenshot preview">
      <div className="canvas-scroll" ref={scrollRef}>
        <div className="canvas-positioner">
          <div
            className={`export-canvas export-canvas-${canvasMode} canvas-size-${canvasSize}`}
            data-export-target="true"
            style={{
              ...canvasStyle,
              background: backgroundValue,
              padding: paddingMap[padding],
            }}
          >
            <article
              className={`snippet-card snippet-card-${canvasMode}`}
              style={{
                background: isLight ? '#fff8ef' : '#1f1a2b',
                borderRadius,
                boxShadow: shadowMap[shadow],
                color: isLight ? '#293445' : '#e7e8ec',
              }}
            >
              <WindowFrame />
              <CodeEditor variant="canvas" />

              {showWatermark ? (
                <span className="watermark">made with Fotosnip</span>
              ) : null}
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
