import { useState } from 'react'

import { generateCodeAnnotations } from '../../lib/gemini'
import { useEditorStore } from '../../store/editorStore'

const apiKeyStorageKey = 'fotosnip.geminiApiKey'

function readStoredApiKey() {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.localStorage.getItem(apiKeyStorageKey) ?? ''
}

function writeStoredApiKey(apiKey: string) {
  if (typeof window === 'undefined') {
    return
  }

  if (apiKey.trim()) {
    window.localStorage.setItem(apiKeyStorageKey, apiKey.trim())
  } else {
    window.localStorage.removeItem(apiKeyStorageKey)
  }
}

export function useAnnotations() {
  const [apiKey, setApiKeyState] = useState(readStoredApiKey)
  const code = useEditorStore((state) => state.code)
  const annotationMode = useEditorStore((state) => state.annotationMode)
  const setAnnotations = useEditorStore((state) => state.setAnnotations)
  const setAnnotationsLoading = useEditorStore(
    (state) => state.setAnnotationsLoading,
  )
  const setAnnotationsError = useEditorStore(
    (state) => state.setAnnotationsError,
  )

  function setApiKey(nextApiKey: string) {
    setApiKeyState(nextApiKey)
    writeStoredApiKey(nextApiKey)
  }

  async function requestAnnotations() {
    const trimmedApiKey = apiKey.trim()

    if (!trimmedApiKey) {
      setAnnotationsError('Add a Gemini API key first.')
      return
    }

    if (!code.trim()) {
      setAnnotationsError('Paste code before requesting annotations.')
      return
    }

    try {
      setAnnotationsLoading(true)
      setAnnotationsError('')
      const nextAnnotations = await generateCodeAnnotations({
        apiKey: trimmedApiKey,
        code,
        mode: annotationMode,
      })

      setAnnotations(nextAnnotations)
    } catch {
      setAnnotationsError('Could not generate annotations.')
    } finally {
      setAnnotationsLoading(false)
    }
  }

  return {
    apiKey,
    setApiKey,
    requestAnnotations,
  }
}
