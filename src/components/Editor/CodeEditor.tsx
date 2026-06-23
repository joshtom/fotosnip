import { EditorState } from '@codemirror/state'
import {
  EditorView,
  highlightActiveLineGutter,
  lineNumbers,
} from '@codemirror/view'
import { useEffect, useRef } from 'react'

import { useEditorStore } from '../../store/editorStore'

export function CodeEditor() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const viewRef = useRef<EditorView | null>(null)
  const code = useEditorStore((state) => state.code)
  const fontFamily = useEditorStore((state) => state.fontFamily)
  const fontSize = useEditorStore((state) => state.fontSize)
  const lineHeight = useEditorStore((state) => state.lineHeight)
  const showLineNumbers = useEditorStore((state) => state.showLineNumbers)
  const wordWrap = useEditorStore((state) => state.wordWrap)
  const setCode = useEditorStore((state) => state.setCode)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const extensions = [
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          setCode(update.state.doc.toString())
        }
      }),
      EditorView.theme({
        '&': {
          backgroundColor: '#0f172a',
          borderRadius: '8px',
          color: '#dbeafe',
          fontFamily: `"${fontFamily}", ui-monospace, SFMono-Regular, Menlo, monospace`,
          fontSize: `${fontSize}px`,
          lineHeight: `${lineHeight}`,
          minHeight: '220px',
        },
        '.cm-content': {
          caretColor: '#67e8f9',
          padding: '12px 0',
        },
        '.cm-focused': {
          outline: 'none',
        },
        '.cm-gutters': {
          backgroundColor: '#111827',
          borderRight: '1px solid rgba(148, 163, 184, 0.18)',
          color: 'rgba(148, 163, 184, 0.72)',
        },
        '.cm-line': {
          padding: '0 14px',
        },
        '.cm-activeLineGutter': {
          backgroundColor: 'rgba(103, 232, 249, 0.12)',
          color: '#67e8f9',
        },
        '.cm-scroller': {
          overflow: 'auto',
        },
      }),
    ]

    if (showLineNumbers) {
      extensions.push(lineNumbers(), highlightActiveLineGutter())
    }

    if (wordWrap) {
      extensions.push(EditorView.lineWrapping)
    }

    const view = new EditorView({
      doc: code,
      extensions,
      parent: containerRef.current,
    })

    viewRef.current = view

    return () => {
      view.destroy()
      viewRef.current = null
    }
  }, [fontFamily, fontSize, lineHeight, setCode, showLineNumbers, wordWrap])

  useEffect(() => {
    const view = viewRef.current

    if (!view || view.state.doc.toString() === code) {
      return
    }

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: code,
      },
    })
  }, [code])

  return (
    <div
      ref={containerRef}
      className="code-editor"
      aria-label="Code editor"
    />
  )
}
