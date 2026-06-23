import { GoogleGenAI } from '@google/genai'

import type { Annotation, AnnotationMode } from '../store/editorStore'

type GeminiAnnotation = {
  line: number
  annotation: string
}

export async function generateCodeAnnotations({
  code,
  mode,
}: {
  code: string
  mode: AnnotationMode
}): Promise<Annotation[]> {
  const apiKey = import.meta.env.GEMINI_API_KEY?.trim()

  if (!apiKey) {
    throw new Error('Gemini API key is not configured')
  }

  const ai = new GoogleGenAI({ apiKey })
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: buildAnnotationPrompt(code, mode),
    config: {
      responseMimeType: 'application/json',
    },
  })
  const responseText = response.text

  if (!responseText) {
    throw new Error('Gemini returned an empty response')
  }

  const parsedValue = JSON.parse(responseText) as unknown

  if (!Array.isArray(parsedValue)) {
    throw new Error('Gemini returned an unexpected response')
  }

  const usedLines = new Set<number>()

  return parsedValue
    .filter((item): item is GeminiAnnotation => {
      return (
        typeof item === 'object' &&
        item !== null &&
        typeof item.line === 'number' &&
        Number.isFinite(item.line) &&
        typeof item.annotation === 'string'
      )
    })
    .slice(0, 8)
    .map((item) => ({
      line: Math.max(1, Math.round(item.line)),
      text: item.annotation.trim(),
    }))
    .filter((item) => {
      if (item.text.length === 0 || usedLines.has(item.line)) {
        return false
      }

      usedLines.add(item.line)
      return true
    })
}

function buildAnnotationPrompt(code: string, mode: AnnotationMode) {
  return `You are a code annotation assistant. Given a code snippet, return concise inline annotations for the most meaningful lines.

Mode: ${mode}
- explain: plain English, what the line does (max 8 words)
- teach: slightly more detail, assumes the reader is learning (max 12 words)
- review: senior developer perspective, suggest improvements (max 12 words)

Return ONLY a JSON array. No preamble, no markdown. Format:
[{ "line": <1-indexed line number>, "annotation": "<text>" }]

Rules:
- Annotate only lines that benefit from explanation. Skip blank lines, closing braces, and self-evident lines.
- Max 1 annotation per line
- Max 8 annotations total per snippet
- Be specific, not generic ("caches the result" not "stores a value")

Code:
${code}`
}
