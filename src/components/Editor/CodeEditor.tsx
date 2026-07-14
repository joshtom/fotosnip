import {
  HighlightStyle,
  LanguageDescription,
  syntaxHighlighting,
} from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { RangeSetBuilder, type Extension } from '@codemirror/state'
import {
  Decoration,
  EditorView,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from '@codemirror/view'
import { tags } from '@lezer/highlight'
import { useEffect, useRef, useState } from 'react'

import { useEditorStore } from '../../store/editorStore'

type CodeEditorProps = {
  variant?: 'panel' | 'canvas'
}

const lineHighlightDecoration = Decoration.line({
  class: 'cm-fotosnip-highlight',
})

export function CodeEditor({ variant = 'panel' }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const viewRef = useRef<EditorView | null>(null)
  const [languageExtension, setLanguageExtension] = useState<Extension>([])
  const code = useEditorStore((state) => state.code)
  const language = useEditorStore((state) => state.language)
  const fontFamily = useEditorStore((state) => state.fontFamily)
  const fontSize = useEditorStore((state) => state.fontSize)
  const lineHeight = useEditorStore((state) => state.lineHeight)
  const showLineNumbers = useEditorStore((state) => state.showLineNumbers)
  const wordWrap = useEditorStore((state) => state.wordWrap)
  const highlightedLines = useEditorStore((state) => state.highlightedLines)
  const canvasMode = useEditorStore((state) => state.canvasMode)
  const setCode = useEditorStore((state) => state.setCode)
  const toggleLineHighlight = useEditorStore(
    (state) => state.toggleLineHighlight,
  )

  useEffect(() => {
    let isCurrent = true
    const description = LanguageDescription.matchLanguageName(
      languages,
      getLanguageName(language),
      true,
    )

    if (!description) {
      setLanguageExtension([])
      return () => {
        isCurrent = false
      }
    }

    void description
      .load()
      .then((support) => {
        if (isCurrent) {
          setLanguageExtension(support)
        }
      })
      .catch(() => {
        if (isCurrent) {
          setLanguageExtension([])
        }
      })

    return () => {
      isCurrent = false
    }
  }, [language])

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const extensions: Extension[] = [
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          setCode(update.state.doc.toString())
        }
      }),
      languageExtension,
      syntaxHighlighting(getHighlightStyle(canvasMode)),
      lineHighlightExtension(highlightedLines),
      EditorView.theme(
        getEditorTheme({
          canvasMode,
          fontFamily,
          fontSize,
          lineHeight,
          variant,
        }),
      ),
    ]

    if (showLineNumbers) {
      extensions.push(
        lineNumbers({
          domEventHandlers: {
            click(view, line) {
              toggleLineHighlight(view.state.doc.lineAt(line.from).number)
              return true
            },
          },
        }),
        highlightActiveLineGutter(),
      )
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
  }, [
    canvasMode,
    fontFamily,
    fontSize,
    highlightedLines,
    languageExtension,
    lineHeight,
    setCode,
    showLineNumbers,
    toggleLineHighlight,
    variant,
    wordWrap,
  ])

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
      className={`code-editor code-editor-${variant}`}
      aria-label="Code editor"
    />
  )
}

function getLanguageName(language: string) {
  const aliases: Record<string, string> = {
    csharp: 'C#',
    jsx: 'JSX',
    tsx: 'TSX',
  }

  return aliases[language] ?? language
}

function lineHighlightExtension(highlightedLines: number[]): Extension {
  if (highlightedLines.length === 0) {
    return []
  }

  return EditorView.decorations.of((view) => {
    const builder = new RangeSetBuilder<Decoration>()

    highlightedLines.forEach((lineNumber) => {
      if (lineNumber < 1 || lineNumber > view.state.doc.lines) {
        return
      }

      const line = view.state.doc.line(lineNumber)
      builder.add(line.from, line.from, lineHighlightDecoration)
    })

    return builder.finish()
  })
}

function getHighlightStyle(canvasMode: 'dark' | 'light') {
  const dark = canvasMode === 'dark'

  return HighlightStyle.define([
    { tag: tags.keyword, color: dark ? '#ff5c8a' : '#9f1239' },
    { tag: tags.string, color: dark ? '#f8d66d' : '#a16207' },
    { tag: tags.number, color: dark ? '#c4b5fd' : '#7e22ce' },
    { tag: tags.bool, color: dark ? '#a78bfa' : '#7c3aed' },
    { tag: tags.variableName, color: dark ? '#e7e8ec' : '#293445' },
    { tag: tags.definition(tags.variableName), color: dark ? '#6ee7b7' : '#047857' },
    { tag: tags.function(tags.variableName), color: dark ? '#38bdf8' : '#0369a1' },
    { tag: tags.propertyName, color: dark ? '#7dd3fc' : '#0f766e' },
    { tag: tags.typeName, color: dark ? '#c4b5fd' : '#6d28d9' },
    { tag: tags.className, color: dark ? '#c4b5fd' : '#6d28d9' },
    { tag: tags.comment, color: dark ? '#858b98' : '#64748b', fontStyle: 'italic' },
    { tag: tags.operator, color: dark ? '#d8b4fe' : '#7c2d12' },
    { tag: tags.punctuation, color: dark ? '#cbd5e1' : '#475569' },
  ])
}

function getEditorTheme({
  canvasMode,
  fontFamily,
  fontSize,
  lineHeight,
  variant,
}: {
  canvasMode: 'dark' | 'light'
  fontFamily: string
  fontSize: number
  lineHeight: number
  variant: 'panel' | 'canvas'
}) {
  const dark = canvasMode === 'dark'
  const isCanvas = variant === 'canvas'

  return {
    '&': {
      backgroundColor: isCanvas ? 'transparent' : '#111827',
      color: dark ? '#e7e8ec' : '#293445',
      fontFamily: `"${fontFamily}", ui-monospace, SFMono-Regular, Menlo, monospace`,
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}`,
      minHeight: isCanvas ? 'auto' : '220px',
    },
    '.cm-content': {
      caretColor: dark ? '#6ee7f9' : '#0284c7',
      padding: isCanvas ? '24px 26px 24px 0' : '12px 0',
    },
    '.cm-focused': {
      outline: 'none',
    },
    '.cm-gutters': {
      backgroundColor: 'transparent',
      borderRight: isCanvas
        ? '1px solid rgba(148, 163, 184, 0.12)'
        : '1px solid rgba(148, 163, 184, 0.18)',
      color: dark ? 'rgba(148, 163, 184, 0.64)' : 'rgba(71, 85, 105, 0.62)',
    },
    '.cm-line': {
      padding: '0 18px',
    },
    '.cm-activeLine': {
      backgroundColor: dark
        ? 'rgba(255, 255, 255, 0.035)'
        : 'rgba(15, 23, 42, 0.04)',
    },
    '.cm-fotosnip-highlight': {
      backgroundColor: dark
        ? 'rgba(255, 92, 138, 0.16)'
        : 'rgba(14, 165, 233, 0.16)',
    },
    '.cm-activeLineGutter': {
      backgroundColor: dark
        ? 'rgba(255, 92, 138, 0.12)'
        : 'rgba(14, 165, 233, 0.12)',
      color: dark ? '#ff8faf' : '#0284c7',
    },
    '.cm-scroller': {
      overflow: 'auto',
    },
  }
}
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
