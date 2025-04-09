import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
        <div className="logos">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>useSyncScroll Hook</h1>
        <p className="subtitle">
          Хук <code>useSyncScroll</code> обеспечивает плавную синхронизацию скроллинга между
          элементами разных размеров как по горизонтальной, так и по вертикальной оси.
        </p>
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
      </footer>
    </div>
  )
}

export default App
