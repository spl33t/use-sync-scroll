import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import syncScrollLogo from './assets/sync-scroll-logo.svg'
import { SyncScrollDemo } from './components/SyncScrollDemo'
import ApiDocumentation from './components/ApiDocumentation'
import './App.css'

// Тип для страниц
type Page = 'demo' | 'documentation';

function App() {
  // Состояние для текущей страницы
  const [currentPage, setCurrentPage] = useState<Page>('demo')

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="hook-logo">
            <img src={syncScrollLogo} alt="useSyncScroll Logo" className="sync-logo" />
          </div>
          <div className="header-right">
            <div className="header-text">
              <h1>useSyncScroll Hook</h1>
              <p className="subtitle">
                Хук обеспечивает плавную синхронизацию скроллинга между
                элементами разных размеров как по горизонтальной, так и по вертикальной оси.
              </p>
            </div>
            <div className="tech-logos">
              <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="demo-controls">
          <button
            className={`toggle-button ${currentPage === 'demo' ? 'active' : ''}`}
            onClick={() => setCurrentPage('demo')}
          >
            Показать демо
          </button>
          <button
            className={`toggle-button ${currentPage === 'documentation' ? 'active' : ''}`}
            onClick={() => setCurrentPage('documentation')}
          >
            Документация API
          </button>
        </div>

        {currentPage === 'demo' ? <SyncScrollDemo /> : <ApiDocumentation />}
      </main>

      <footer className="app-footer">
        <p>Разработано с использованием React и TypeScript</p>
        <div className="github-link">
          <a href="https://github.com/spl33t/use-sync-scroll" target="_blank" rel="noopener noreferrer">
            <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            <span>Исходный код на GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
