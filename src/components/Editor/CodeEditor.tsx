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

import { type CodeTheme, useCodeTheme } from '../../hooks/useCodeTheme'
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
  const theme = useEditorStore((state) => state.theme)
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
  const codeTheme = useCodeTheme(theme, canvasMode === 'light')

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
      syntaxHighlighting(getHighlightStyle(codeTheme)),
      lineHighlightExtension(highlightedLines),
      EditorView.theme(
        getEditorTheme({
          canvasMode,
          codeTheme,
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
    codeTheme,
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

function getHighlightStyle(theme: CodeTheme) {
  return HighlightStyle.define([
    { tag: tags.keyword, color: theme.keyword },
    { tag: tags.string, color: theme.string },
    { tag: tags.number, color: theme.number },
    { tag: tags.bool, color: theme.boolean },
    { tag: tags.variableName, color: theme.variable },
    { tag: tags.definition(tags.variableName), color: theme.definition },
    { tag: tags.function(tags.variableName), color: theme.function },
    { tag: tags.propertyName, color: theme.property },
    { tag: tags.typeName, color: theme.type },
    { tag: tags.className, color: theme.className },
    { tag: tags.comment, color: theme.comment, fontStyle: 'italic' },
    { tag: tags.operator, color: theme.operator },
    { tag: tags.punctuation, color: theme.punctuation },
  ])
}

function getEditorTheme({
  canvasMode,
  codeTheme,
  fontFamily,
  fontSize,
  lineHeight,
  variant,
}: {
  canvasMode: 'dark' | 'light'
  codeTheme: CodeTheme
  fontFamily: string
  fontSize: number
  lineHeight: number
  variant: 'panel' | 'canvas'
}) {
  const isCanvas = variant === 'canvas'

  return {
    '&': {
      backgroundColor: isCanvas ? 'transparent' : '#111827',
      color: codeTheme.foreground,
      fontFamily: `"${fontFamily}", ui-monospace, SFMono-Regular, Menlo, monospace`,
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}`,
      minHeight: isCanvas ? 'auto' : '220px',
    },
    '.cm-content': {
      caretColor: codeTheme.caret,
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
      color: codeTheme.gutter,
    },
    '.cm-line': {
      padding: '0 18px',
    },
    '.cm-activeLine': {
      backgroundColor: codeTheme.activeLine,
    },
    '.cm-fotosnip-highlight': {
      backgroundColor: canvasMode === 'dark'
        ? 'rgba(255, 92, 138, 0.16)'
        : 'rgba(14, 165, 233, 0.16)',
    },
    '.cm-activeLineGutter': {
      backgroundColor: canvasMode === 'dark'
        ? 'rgba(255, 92, 138, 0.12)'
        : 'rgba(14, 165, 233, 0.12)',
      color: codeTheme.caret,
    },
    '.cm-scroller': {
      overflow: 'auto',
    },
  }
}
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
