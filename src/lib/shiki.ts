import { codeToTokens, type BundledLanguage } from 'shiki'

export type HighlightToken = {
  content: string
  color?: string
  fontStyle?: number
}

export type HighlightedCode = {
  background: string
  foreground: string
  lines: HighlightToken[][]
}

const fallbackHighlight: HighlightedCode = {
  background: '#101827',
  foreground: '#dbeafe',
  lines: [],
}

export async function highlightCodeToLines(
  code: string,
  language: string,
  theme: string,
): Promise<HighlightedCode> {
  const rawLines = code.length > 0 ? code.split('\n') : ['']

  try {
    const result = await codeToTokens(code || ' ', {
      lang: (language || 'text') as BundledLanguage,
      theme: theme || 'github-dark',
    })

    return {
      background: result.bg ?? fallbackHighlight.background,
      foreground: result.fg ?? fallbackHighlight.foreground,
      lines: rawLines.map((_, index) => result.tokens[index] ?? []),
    }
  } catch {
    try {
      const result = await codeToTokens(code || ' ', {
        lang: 'text',
        theme: 'github-dark',
      })

      return {
        background: result.bg ?? fallbackHighlight.background,
        foreground: result.fg ?? fallbackHighlight.foreground,
        lines: rawLines.map((_, index) => result.tokens[index] ?? []),
      }
    } catch {
      return {
        ...fallbackHighlight,
        lines: rawLines.map((line) => [{ content: line }]),
      }
    }
  }
}
