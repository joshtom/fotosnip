import { generateCodeAnnotations } from '../../lib/gemini'
import { useEditorStore } from '../../store/editorStore'

export function useAnnotations() {
  const code = useEditorStore((state) => state.code)
  const annotationMode = useEditorStore((state) => state.annotationMode)
  const setAnnotations = useEditorStore((state) => state.setAnnotations)
  const setAnnotationsLoading = useEditorStore(
    (state) => state.setAnnotationsLoading,
  )
  const setAnnotationsError = useEditorStore(
    (state) => state.setAnnotationsError,
  )

  async function requestAnnotations() {
    if (!import.meta.env.GEMINI_API_KEY?.trim()) {
      setAnnotationsError('Gemini API key is not configured.')
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
    requestAnnotations,
  }
}
