# Fotosnip Implementation Plan

This plan breaks the PRD into small, shippable feature slices. Each slice should land
with focused commits that follow the project commitlint convention.

## Product Baseline

Goal: a browser-based code screenshot tool where a developer can paste code, style the
snippet, optionally add AI annotations, and export a polished PNG without signing in.

Target stack:

- React with TanStack Router
- Tailwind CSS
- Shadcn-style UI primitives
- Zustand for editor state
- CodeMirror 6 for editing
- Shiki for syntax highlighting
- html-to-image for export
- Google Gemini API for annotations

## Build Sequence

### 1. App Foundation

Create the React/Vite app shell, global styling, layout primitives, route setup, and
editor store scaffolding.

Acceptance:

- App runs locally with a one-screen Fotosnip workspace.
- Top bar, left toolbar column, and right preview area are present.
- Editor state has defaults matching the PRD.
- Typecheck and lint/build scripts exist.

### 2. Code Editor

Add the central code input with language selection, line numbers, word wrap, and
reasonable default sample code.

Acceptance:

- Users can paste or type code.
- Language can be selected manually.
- Line numbers and word wrap toggles update the editor.
- Editor state stays in sync with the preview.

### 3. Syntax Highlighted Preview

Render the live screenshot preview using Shiki themes and code tokens.

Acceptance:

- Preview updates as code, language, and theme change.
- At least the v1 theme list is available.
- Preview typography reflects selected font, size, and line height.
- Empty code is handled gracefully.

### 4. Window Frames

Implement all PRD frame styles: macOS, Windows 11, GNOME, KDE, i3/bare, ChromeOS, and
frameless.

Acceptance:

- Each frame can be selected from the toolbar.
- Window title input is reflected in the frame.
- Frames scale cleanly in the preview and exported image.

### 5. Appearance Controls

Add controls for background, font, font size, line height, padding, radius, and shadow.

Acceptance:

- Solid, transparent, and 12 curated gradient backgrounds are available.
- Six font family options are available.
- Sliders and presets update the preview immediately.
- Controls are usable at desktop and mobile preview widths.

### 6. Line Highlighting

Let users highlight specific lines and dim the rest.

Acceptance:

- Clicking line numbers toggles highlights.
- Highlighted lines remain full opacity while others dim.
- Clear highlights resets the state.
- Export preserves the highlight treatment.

### 7. Export

Add PNG export, copy-to-clipboard, canvas size presets, custom width, and optional
watermark.

Acceptance:

- PNG export uses a 2x pixel ratio.
- Copy to clipboard works where browser support exists and shows a useful fallback.
- Auto, Twitter/X, LinkedIn, Instagram square, Instagram story, and custom width
  presets are supported.
- Watermark is off by default and appears only when enabled.

### 8. Brand Presets

Persist up to five named visual presets in localStorage.

Acceptance:

- Users can save, apply, rename, and delete presets.
- Presets include theme, font, frame, background, padding, radius, and shadow.
- The sixth preset attempt is handled without corrupting existing presets.

### 9. AI Annotations

Add the Gemini-powered annotation flow using the app's configured Gemini API key.

Acceptance:

- Users can select explain/teach/review mode and request annotations.
- Gemini requests use structured JSON output.
- Users can edit, delete, and regenerate annotations before export.
- Annotations render inside the screenshot canvas and export with the image.
- Loading and error states are clear and non-blocking.

### 10. Polish And Browser QA

Tighten responsive layout, accessibility, empty states, and browser behavior.

Acceptance:

- Core flow works in Chrome, Firefox, Safari, and Edge.
- Paste-to-export can be completed in under 30 seconds.
- AI annotations return in under 5 seconds for snippets up to 50 lines in normal
  network conditions.
- No signup, backend, or forced watermark exists in v1.

## Deferred To v2

- SVG export
- Auto language detection on paste
- Preset sharing via URL
- Accounts or saved snippets
- Backend-proxied AI calls and shared rate limiting
