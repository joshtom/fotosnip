import { create } from 'zustand'

export type FrameStyle =
  | 'macos'
  | 'windows11'
  | 'linux-gnome'
  | 'linux-kde'
  | 'linux-i3'
  | 'chromeos'
  | 'frameless'

export type PaddingSize = 'xs' | 's' | 'm' | 'l' | 'xl'
export type ShadowSize = 'none' | 'soft' | 'medium' | 'strong' | 'dramatic'
export type Background =
  | { type: 'solid'; value: string }
  | { type: 'gradient'; value: string }
  | { type: 'transparent'; value: 'transparent' }

export type AnnotationMode = 'explain' | 'teach' | 'review'
export type CanvasMode = 'dark' | 'light'
export type CanvasSize =
  | 'auto'
  | 'twitter'
  | 'linkedin'
  | 'instagram-square'
  | 'instagram-story'
  | 'custom'

export type Annotation = {
  line: number
  text: string
}

export type EditorSettings = {
  code: string
  language: string
  frameStyle: FrameStyle
  windowTitle: string
  windowIcon: string
  theme: string
  fontFamily: string
  fontSize: number
  lineHeight: number
  padding: PaddingSize
  borderRadius: number
  shadow: ShadowSize
  background: Background
  showLineNumbers: boolean
  wordWrap: boolean
  highlightedLines: number[]
  showWatermark: boolean
  annotationsEnabled: boolean
  annotationMode: AnnotationMode
  annotations: Annotation[]
  annotationsLoading: boolean
  annotationsError: string
  canvasMode: CanvasMode
  canvasSize: CanvasSize
  customWidth: number
  presets: Preset[]
}

export type Preset = {
  name: string
  settings: Partial<Omit<EditorSettings, 'presets'>>
}

type EditorActions = {
  setCode: (code: string) => void
  setLanguage: (language: string) => void
  setFrameStyle: (frameStyle: FrameStyle) => void
  setWindowTitle: (windowTitle: string) => void
  setWindowIcon: (windowIcon: string) => void
  setTheme: (theme: string) => void
  setFontFamily: (fontFamily: string) => void
  setFontSize: (fontSize: number) => void
  setLineHeight: (lineHeight: number) => void
  setPadding: (padding: PaddingSize) => void
  setBorderRadius: (borderRadius: number) => void
  setShadow: (shadow: ShadowSize) => void
  setBackground: (background: Background) => void
  setShowLineNumbers: (showLineNumbers: boolean) => void
  setWordWrap: (wordWrap: boolean) => void
  toggleLineHighlight: (line: number) => void
  clearHighlights: () => void
  setShowWatermark: (showWatermark: boolean) => void
  setAnnotationsEnabled: (annotationsEnabled: boolean) => void
  setAnnotationMode: (annotationMode: AnnotationMode) => void
  setAnnotations: (annotations: Annotation[]) => void
  updateAnnotation: (line: number, text: string) => void
  deleteAnnotation: (line: number) => void
  setAnnotationsLoading: (annotationsLoading: boolean) => void
  setAnnotationsError: (annotationsError: string) => void
  setCanvasMode: (canvasMode: CanvasMode) => void
  setCanvasSize: (canvasSize: CanvasSize) => void
  setCustomWidth: (customWidth: number) => void
  savePreset: (name: string) => void
  applyPreset: (name: string) => void
  deletePreset: (name: string) => void
  renamePreset: (fromName: string, toName: string) => void
}

export type EditorState = EditorSettings & EditorActions

const defaultCode = `function debounce(callback, delay = 300) {
  let timerId

  return (...args) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => callback(...args), delay)
  }
}`

const presetsStorageKey = 'fotosnip.presets'

function readStoredPresets(): Preset[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedValue = window.localStorage.getItem(presetsStorageKey)

    if (!storedValue) {
      return []
    }

    const parsedValue = JSON.parse(storedValue)

    if (!Array.isArray(parsedValue)) {
      return []
    }

    return parsedValue
      .filter((item): item is Preset => {
        return (
          typeof item === 'object' &&
          item !== null &&
          typeof item.name === 'string' &&
          typeof item.settings === 'object' &&
          item.settings !== null
        )
      })
      .slice(0, 5)
  } catch {
    return []
  }
}

function writeStoredPresets(presets: Preset[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(
    presetsStorageKey,
    JSON.stringify(presets.slice(0, 5)),
  )
}

const getPresetSettings = (
  state: EditorState,
): Partial<Omit<EditorSettings, 'presets'>> => ({
  theme: state.theme,
  fontFamily: state.fontFamily,
  fontSize: state.fontSize,
  lineHeight: state.lineHeight,
  frameStyle: state.frameStyle,
  windowTitle: state.windowTitle,
  windowIcon: state.windowIcon,
  padding: state.padding,
  borderRadius: state.borderRadius,
  shadow: state.shadow,
  background: state.background,
  canvasMode: state.canvasMode,
  showLineNumbers: state.showLineNumbers,
  wordWrap: state.wordWrap,
  showWatermark: state.showWatermark,
  canvasSize: state.canvasSize,
  customWidth: state.customWidth,
})

export const useEditorStore = create<EditorState>((set, get) => ({
  code: defaultCode,
  language: 'typescript',
  frameStyle: 'macos',
  windowTitle: 'utils.ts',
  windowIcon: 'TS',
  theme: 'github-dark',
  fontFamily: 'JetBrains Mono',
  fontSize: 15,
  lineHeight: 1.6,
  padding: 'm',
  borderRadius: 14,
  shadow: 'medium',
  background: { type: 'solid', value: '#09090b' },
  showLineNumbers: true,
  wordWrap: true,
  highlightedLines: [],
  showWatermark: false,
  annotationsEnabled: false,
  annotationMode: 'explain',
  annotations: [],
  annotationsLoading: false,
  annotationsError: '',
  canvasMode: 'dark',
  canvasSize: 'auto',
  customWidth: 1200,
  presets: readStoredPresets(),
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setFrameStyle: (frameStyle) => set({ frameStyle }),
  setWindowTitle: (windowTitle) => set({ windowTitle }),
  setWindowIcon: (windowIcon) => set({ windowIcon }),
  setTheme: (theme) => set({ theme }),
  setFontFamily: (fontFamily) => set({ fontFamily }),
  setFontSize: (fontSize) => set({ fontSize }),
  setLineHeight: (lineHeight) => set({ lineHeight }),
  setPadding: (padding) => set({ padding }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setShadow: (shadow) => set({ shadow }),
  setBackground: (background) => set({ background }),
  setShowLineNumbers: (showLineNumbers) => set({ showLineNumbers }),
  setWordWrap: (wordWrap) => set({ wordWrap }),
  toggleLineHighlight: (line) =>
    set((state) => ({
      highlightedLines: state.highlightedLines.includes(line)
        ? state.highlightedLines.filter((value) => value !== line)
        : [...state.highlightedLines, line].sort((a, b) => a - b),
    })),
  clearHighlights: () => set({ highlightedLines: [] }),
  setShowWatermark: (showWatermark) => set({ showWatermark }),
  setAnnotationsEnabled: (annotationsEnabled) => set({ annotationsEnabled }),
  setAnnotationMode: (annotationMode) => set({ annotationMode }),
  setAnnotations: (annotations) => set({ annotations }),
  updateAnnotation: (line, text) =>
    set((state) => ({
      annotations: state.annotations.map((annotation) =>
        annotation.line === line ? { ...annotation, text } : annotation,
      ),
    })),
  deleteAnnotation: (line) =>
    set((state) => ({
      annotations: state.annotations.filter(
        (annotation) => annotation.line !== line,
      ),
    })),
  setAnnotationsLoading: (annotationsLoading) => set({ annotationsLoading }),
  setAnnotationsError: (annotationsError) => set({ annotationsError }),
  setCanvasMode: (canvasMode) => set({ canvasMode }),
  setCanvasSize: (canvasSize) => set({ canvasSize }),
  setCustomWidth: (customWidth) => set({ customWidth }),
  savePreset: (name) =>
    set((state) => {
      const trimmedName = name.trim()

      if (!trimmedName) {
        return {}
      }

      const nextPreset = {
        name: trimmedName,
        settings: getPresetSettings(state),
      }
      const withoutExisting = state.presets.filter(
        (preset) => preset.name !== trimmedName,
      )
      const nextPresets = [nextPreset, ...withoutExisting].slice(0, 5)

      writeStoredPresets(nextPresets)
      return {
        presets: nextPresets,
      }
    }),
  applyPreset: (name) => {
    const preset = get().presets.find((item) => item.name === name)

    if (preset) {
      set(preset.settings)
    }
  },
  deletePreset: (name) =>
    set((state) => {
      const nextPresets = state.presets.filter((preset) => preset.name !== name)

      writeStoredPresets(nextPresets)
      return { presets: nextPresets }
    }),
  renamePreset: (fromName, toName) =>
    set((state) => {
      const trimmedName = toName.trim()

      if (!trimmedName) {
        return {}
      }

      const nextPresets = state.presets.map((preset) =>
        preset.name === fromName ? { ...preset, name: trimmedName } : preset,
      )

      writeStoredPresets(nextPresets)
      return { presets: nextPresets }
    }),
}))
