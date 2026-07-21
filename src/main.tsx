import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import '@fontsource/cascadia-code/latin-400.css'
import '@fontsource/fira-code/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/source-code-pro/latin-400.css'

import { router } from './router'
import './styles.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
