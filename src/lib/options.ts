import type {
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
  'Fira Code',
  'JetBrains Mono',
  'Cascadia Code',
  'Geist Mono',
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
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'instagram-square', label: 'Instagram square' },
  { value: 'instagram-story', label: 'Instagram story' },
  { value: 'custom', label: 'Custom width' },
]
