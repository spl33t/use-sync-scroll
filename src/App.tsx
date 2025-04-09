import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { SyncScrollDemo } from './components/SyncScrollDemo'
import './App.css'

function App() {
  const [showDemo, setShowDemo] = useState(true)

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
          Хук для синхронизации скроллинга между несколькими контейнерами
        </p>
      </header>

      <main>
        <div className="demo-controls">
          <button 
            className={`toggle-button ${showDemo ? 'active' : ''}`} 
            onClick={() => setShowDemo(true)}
          >
            Показать демо
          </button>
          <button 
            className={`toggle-button ${!showDemo ? 'active' : ''}`} 
            onClick={() => setShowDemo(false)}
          >
            Информация об API
          </button>
        </div>

        {showDemo ? (
          <SyncScrollDemo />
        ) : (
          <div className="api-info">
            <h2>API хука useSyncScroll</h2>
            <div className="api-details">
              <h3>Использование</h3>
              <pre>
                <code>{`import { useRef } from 'react';
import { useSyncScroll } from './hooks/useSyncScroll';

function MyComponent() {
  // Создаем рефы для каждого контейнера
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  
  // Используем хук для синхронизации скроллинга
  useSyncScroll([containerRef1, containerRef2]);
  
  return (
    <div>
      <div className="container" ref={containerRef1}>
        {/* Содержимое первого контейнера */}
      </div>
      <div className="container" ref={containerRef2}>
        {/* Содержимое второго контейнера */}
      </div>
    </div>
  );
}`}</code>
              </pre>

              <h3>Параметры</h3>
              <div className="parameters">
                <div className="parameter">
                  <span className="param-name">refs</span>
                  <span className="param-type">React.RefObject&lt;HTMLElement | Element&gt;[]</span>
                  <span className="param-desc">
                    Массив ссылок на DOM-элементы, скроллинг которых требуется синхронизировать. 
                    Можно передавать любое количество контейнеров.
                  </span>
                </div>
              </div>

              <h3>Особенности</h3>
              <ul className="features">
                <li>Синхронизация как по оси X, так и по оси Y</li>
                <li>Поддержка контейнеров с разными размерами</li>
                <li>Плавная синхронизация без "дерганий"</li>
                <li>Оптимизированная производительность с использованием throttling</li>
                <li>Предотвращение рекурсивных вызовов обработчиков событий</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Разработано с использованием React и TypeScript</p>
      </footer>
    </div>
  )
}

export default App
