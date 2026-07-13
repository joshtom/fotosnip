import { SnippetCanvas } from '../components/Canvas/SnippetCanvas'
import { ExportButton } from '../components/Export/ExportButton'
import { Toolbar } from '../components/Toolbar/Toolbar'

export function IndexRoute() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="workspace-identity">
          <h1>fotosnip</h1>
          <span className="topbar-divider" aria-hidden="true" />
          <span className="product-intent">Write. Style. Export.</span>
        </div>
        <ExportButton />
      </header>

      <section className="workspace" aria-label="Fotosnip editor workspace">
        <SnippetCanvas />
        <Toolbar />
      </section>
    </main>
  )
}
