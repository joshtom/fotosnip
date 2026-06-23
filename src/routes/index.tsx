import { SnippetCanvas } from '../components/Canvas/SnippetCanvas'
import { ExportButton } from '../components/Export/ExportButton'
import { Toolbar } from '../components/Toolbar/Toolbar'

export function IndexRoute() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Fotosnip</p>
          <h1>The code screenshot tool built for every developer.</h1>
        </div>
        <ExportButton />
      </header>

      <section className="workspace" aria-label="Fotosnip editor workspace">
        <Toolbar />
        <SnippetCanvas />
      </section>
    </main>
  )
}
