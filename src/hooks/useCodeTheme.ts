import { bundledThemes } from 'shiki'
import { useEffect, useState } from 'react'

export type CodeTheme = {
  background: string
  foreground: string
  caret: string
  gutter: string
  activeLine: string
  keyword: string
  string: string
  number: string
  boolean: string
  variable: string
  definition: string
  function: string
  property: string
  type: string
  className: string
  comment: string
  operator: string
  punctuation: string
}

type RawThemeRule = {
  scope?: string | string[]
  settings?: {
    foreground?: string
  }
}

type RawTheme = {
  colors?: Record<string, string>
  tokenColors?: RawThemeRule[]
  type?: 'light' | 'dark'
}

const darkFallback: CodeTheme = {
  background: '#1f1a2b',
  foreground: '#e7e8ec',
  caret: '#6ee7f9',
  gutter: '#858b98',
  activeLine: 'rgba(255, 255, 255, 0.035)',
  keyword: '#ff5c8a',
  string: '#f8d66d',
  number: '#c4b5fd',
  boolean: '#a78bfa',
  variable: '#e7e8ec',
  definition: '#6ee7b7',
  function: '#38bdf8',
  property: '#7dd3fc',
  type: '#c4b5fd',
  className: '#c4b5fd',
  comment: '#858b98',
  operator: '#d8b4fe',
  punctuation: '#cbd5e1',
}

const lightFallback: CodeTheme = {
  background: '#fff8ef',
  foreground: '#293445',
  caret: '#0284c7',
  gutter: '#64748b',
  activeLine: 'rgba(15, 23, 42, 0.04)',
  keyword: '#9f1239',
  string: '#a16207',
  number: '#7e22ce',
  boolean: '#7c3aed',
  variable: '#293445',
  definition: '#047857',
  function: '#0369a1',
  property: '#0f766e',
  type: '#6d28d9',
  className: '#6d28d9',
  comment: '#64748b',
  operator: '#7c2d12',
  punctuation: '#475569',
}

const themeCache = new Map<string, Promise<CodeTheme>>()

export function useCodeTheme(theme: string, isLight: boolean) {
  const fallback = isLight ? lightFallback : darkFallback
  const [codeTheme, setCodeTheme] = useState<CodeTheme>(fallback)

  useEffect(() => {
    let isCurrent = true

    loadCodeTheme(theme, fallback).then((nextTheme) => {
      if (isCurrent) {
        setCodeTheme(nextTheme)
      }
    })

    return () => {
      isCurrent = false
    }
  }, [fallback, theme])

  return codeTheme
}

function loadCodeTheme(themeName: string, fallback: CodeTheme) {
  const cachedTheme = themeCache.get(themeName)

  if (cachedTheme) {
    return cachedTheme
  }

  const importer = (
    bundledThemes as Record<
      string,
      (() => Promise<{ default: RawTheme }>) | undefined
    >
  )[themeName]

  if (!importer) {
    return Promise.resolve(fallback)
  }

  const themePromise = importer()
    .then(({ default: rawTheme }) => createCodeTheme(rawTheme, fallback))
    .catch(() => fallback)

  themeCache.set(themeName, themePromise)
  return themePromise
}

function createCodeTheme(rawTheme: RawTheme, fallback: CodeTheme): CodeTheme {
  const tokenColors = rawTheme.tokenColors ?? []
  const colors = rawTheme.colors ?? {}

  return {
    background: colors['editor.background'] ?? fallback.background,
    foreground: colors['editor.foreground'] ?? fallback.foreground,
    caret: colors['editorCursor.foreground'] ?? fallback.caret,
    gutter: colors['editorLineNumber.foreground'] ?? fallback.gutter,
    activeLine: colors['editor.lineHighlightBackground'] ?? fallback.activeLine,
    keyword: findTokenColor(tokenColors, ['keyword', 'storage.type'], fallback.keyword),
    string: findTokenColor(tokenColors, ['string'], fallback.string),
    number: findTokenColor(tokenColors, ['constant.numeric', 'constant'], fallback.number),
    boolean: findTokenColor(
      tokenColors,
      ['constant.language.boolean', 'constant.language'],
      fallback.boolean,
    ),
    variable: findTokenColor(tokenColors, ['variable'], fallback.variable),
    definition: findTokenColor(
      tokenColors,
      ['variable.other.constant', 'entity.name.variable'],
      fallback.definition,
    ),
    function: findTokenColor(
      tokenColors,
      ['entity.name.function', 'support.function'],
      fallback.function,
    ),
    property: findTokenColor(
      tokenColors,
      ['variable.other.property', 'meta.object-literal.key'],
      fallback.property,
    ),
    type: findTokenColor(
      tokenColors,
      ['entity.name.type', 'support.type', 'storage.type'],
      fallback.type,
    ),
    className: findTokenColor(
      tokenColors,
      ['entity.name.class', 'entity.name.type.class'],
      fallback.className,
    ),
    comment: findTokenColor(tokenColors, ['comment'], fallback.comment),
    operator: findTokenColor(
      tokenColors,
      ['keyword.operator'],
      fallback.operator,
    ),
    punctuation: findTokenColor(
      tokenColors,
      ['punctuation'],
      fallback.punctuation,
    ),
  }
}

function findTokenColor(
  rules: RawThemeRule[],
  candidates: string[],
  fallback: string,
) {
  for (const candidate of candidates) {
    for (let index = rules.length - 1; index >= 0; index -= 1) {
      const rule = rules[index]
      const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope]
      const matches = scopes.some(
        (scope) => scope === candidate || scope?.startsWith(`${candidate}.`),
      )

      if (matches && rule.settings?.foreground) {
        return normalizeColor(rule.settings.foreground)
      }
    }
  }

  return fallback
}

function normalizeColor(color: string) {
  return color.startsWith('#') ? color : `#${color}`
}
