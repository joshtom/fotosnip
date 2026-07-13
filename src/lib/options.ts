import type {
  Background,
  CanvasSize,
  FrameStyle,
  PaddingSize,
  ShadowSize,
} from '../store/editorStore'

export const frameOptions: Array<{ value: FrameStyle; label: string }> = [
  { value: 'macos', label: 'macOS' },
  { value: 'windows11', label: 'Windows 11' },
  { value: 'linux-gnome', label: 'GNOME' },
  { value: 'linux-kde', label: 'KDE' },
  { value: 'linux-i3', label: 'i3 / bare' },
  { value: 'chromeos', label: 'ChromeOS' },
  { value: 'frameless', label: 'Frameless' },
]

export const languageOptions = [
  'typescript',
  'javascript',
  'tsx',
  'jsx',
  'python',
  'go',
  'rust',
  'php',
  'ruby',
  'java',
  'csharp',
  'swift',
  'kotlin',
  'html',
  'css',
  'json',
  'markdown',
]

export const themeOptions = [
  { value: 'github-dark', label: 'GitHub Dark' },
  { value: 'github-light', label: 'GitHub Light' },
  { value: 'github-dark-dimmed', label: 'GitHub Dimmed' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'dracula-soft', label: 'Dracula Soft' },
  { value: 'one-dark-pro', label: 'One Dark' },
  { value: 'one-light', label: 'One Light' },
  { value: 'catppuccin-mocha', label: 'Catppuccin' },
  { value: 'catppuccin-latte', label: 'Catppuccin Light' },
  { value: 'nord', label: 'Nord' },
  { value: 'solarized-dark', label: 'Solarized' },
  { value: 'solarized-light', label: 'Solarized Light' },
  { value: 'tokyo-night', label: 'Tokyo Night' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'rose-pine', label: 'Rose Pine' },
  { value: 'rose-pine-dawn', label: 'Rose Pine Dawn' },
  { value: 'night-owl', label: 'Night Owl' },
  { value: 'material-theme', label: 'Material' },
  { value: 'material-theme-palenight', label: 'Material Palenight' },
  { value: 'gruvbox-dark-medium', label: 'Gruvbox Dark' },
  { value: 'gruvbox-light-medium', label: 'Gruvbox Light' },
  { value: 'vitesse-dark', label: 'Vitesse Dark' },
  { value: 'vitesse-light', label: 'Vitesse Light' },
  { value: 'kanagawa-wave', label: 'Kanagawa' },
  { value: 'everforest-dark', label: 'Everforest' },
]

export const fontOptions = [
  'Geist Mono',
  'Fira Code',
  'JetBrains Mono',
  'Cascadia Code',
  'Source Code Pro',
  'IBM Plex Mono',
]

export const paddingOptions: Array<{ value: PaddingSize; label: string }> = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
]

export const shadowOptions: Array<{ value: ShadowSize; label: string }> = [
  { value: 'none', label: 'None' },
  { value: 'soft', label: 'Soft' },
  { value: 'medium', label: 'Medium' },
  { value: 'strong', label: 'Strong' },
  { value: 'dramatic', label: 'Dramatic' },
]

export const canvasSizeOptions: Array<{ value: CanvasSize; label: string }> = [
  { value: 'auto', label: 'Auto' },
  { value: 'twitter', label: 'X · 1200 × 675' },
  { value: 'linkedin', label: 'LinkedIn · 1200 × 627' },
  { value: 'instagram-square', label: 'Instagram · 1080 × 1080' },
  { value: 'instagram-story', label: 'Story · 1080 × 1920' },
  { value: 'custom', label: 'Custom width' },
]

export const backgroundTypeOptions: Array<{
  value: Background['type']
  label: string
}> = [
  { value: 'solid', label: 'Solid' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'transparent', label: 'Transparent' },
]

export const gradientOptions = [
  {
    label: 'Deep Teal',
    value: 'linear-gradient(135deg, #0f172a 0%, #155e75 50%, #f97316 100%)',
  },
  {
    label: 'Aurora',
    value: 'linear-gradient(135deg, #111827 0%, #0f766e 45%, #a3e635 100%)',
  },
  {
    label: 'Cherry Ink',
    value: 'linear-gradient(135deg, #1f2937 0%, #be123c 50%, #fb7185 100%)',
  },
  {
    label: 'Cobalt Sun',
    value: 'linear-gradient(135deg, #0c4a6e 0%, #2563eb 45%, #facc15 100%)',
  },
  {
    label: 'Forest Mist',
    value: 'linear-gradient(135deg, #052e16 0%, #16a34a 45%, #ccfbf1 100%)',
  },
  {
    label: 'Graphite',
    value: 'linear-gradient(135deg, #030712 0%, #374151 52%, #d1d5db 100%)',
  },
  {
    label: 'Indigo Heat',
    value: 'linear-gradient(135deg, #312e81 0%, #7c3aed 50%, #f97316 100%)',
  },
  {
    label: 'Lagoon',
    value: 'linear-gradient(135deg, #083344 0%, #0891b2 48%, #a7f3d0 100%)',
  },
  {
    label: 'Mango Slate',
    value: 'linear-gradient(135deg, #334155 0%, #ea580c 45%, #fde68a 100%)',
  },
  {
    label: 'Rose Quartz',
    value: 'linear-gradient(135deg, #4c0519 0%, #e11d48 42%, #fecdd3 100%)',
  },
  {
    label: 'Silver Blue',
    value: 'linear-gradient(135deg, #e0f2fe 0%, #60a5fa 50%, #1e293b 100%)',
  },
  {
    label: 'Volt',
    value: 'linear-gradient(135deg, #18181b 0%, #84cc16 48%, #f8fafc 100%)',
  },
]
