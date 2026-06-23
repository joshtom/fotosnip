import { SnippetCanvas } from '../components/Canvas/SnippetCanvas'
import { ExportButton } from '../components/Export/ExportButton'
import { Toolbar } from '../components/Toolbar/Toolbar'

export function IndexRoute() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">
            &lt;&gt;
          </span>
          <div>
            <h1>Fotosnip</h1>
            <p className="eyebrow">
              The code screenshot tool built for every developer.
            </p>
          </div>
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
