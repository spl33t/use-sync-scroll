import React from 'react';
import '../styles/ApiDocumentation.css';

const ApiDocumentation: React.FC = () => {
  return (
    <div className="api-documentation">
      <h2>API хука useSyncScroll</h2>
      
      <div className="api-card">
        <div className="api-card-header">
          <h3>Назначение</h3>
        </div>
        <div className="api-card-body">
          <p>
            Синхронизирует прокрутку нескольких контейнеров, обеспечивая согласованное 
            перемещение контента при скроллинге любого из них.
          </p>
          <p>
            При прокрутке одного контейнера по горизонтали или вертикали, 
            все другие контейнеры прокручиваются пропорционально своим размерам.
          </p>
        </div>
      </div>

      <div className="api-card">
        <div className="api-card-header">
          <h3>Сигнатура</h3>
        </div>
        <div className="api-card-body function-signature">
          <code>function useSyncScroll(refs: React.RefObject&lt;HTMLElement&gt;[]): void</code>
        </div>
      </div>
      
      <div className="api-card">
        <div className="api-card-header">
          <h3>Параметры</h3>
        </div>
        <div className="api-card-body">
          <div className="parameter">
            <div className="param-header">
              <span className="param-name">refs</span>
              <span className="param-type">React.RefObject&lt;HTMLElement&gt;[]</span>
            </div>
            <div className="param-desc">
              Массив ссылок на DOM-элементы для синхронизации скроллинга.<br/>
              <span className="param-note">Примечание: Можно передавать любое количество контейнеров (минимум 2).</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="api-card">
        <div className="api-card-header">
          <h3>Пример использования</h3>
        </div>
        <div className="api-card-body">
          <pre className="code-example">
            <code>{`import { useRef } from 'react';
import { useSyncScroll } from './hooks/useSyncScroll';

function MyComponent() {
  // Создаем рефы для контейнеров
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  
  // Используем хук для синхронизации
  useSyncScroll([containerRef1, containerRef2]);
  
  return (
    <div className="containers">
      <div className="scroll-container" ref={containerRef1}>
        {/* Содержимое первого контейнера */}
      </div>
      <div className="scroll-container" ref={containerRef2}>
        {/* Содержимое второго контейнера */}
      </div>
    </div>
  );
}`}</code>
          </pre>
        </div>
      </div>

      <div className="api-card">
        <div className="api-card-header">
          <h3>Особенности</h3>
        </div>
        <div className="api-card-body">
          <ul className="features-list">
            <li>
              <span className="feature-icon">🔄</span>
              <span className="feature-text">
                <strong>Двусторонняя синхронизация</strong> — работает по обеим осям (X и Y)
              </span>
            </li>
            <li>
              <span className="feature-icon">📏</span>
              <span className="feature-text">
                <strong>Адаптивность</strong> — поддерживает контейнеры с разными размерами
              </span>
            </li>
            <li>
              <span className="feature-icon">🌊</span>
              <span className="feature-text">
                <strong>Плавность</strong> — обеспечивает синхронизацию без рывков и дерганий
              </span>
            </li>
            <li>
              <span className="feature-icon">⚡</span>
              <span className="feature-text">
                <strong>Производительность</strong> — оптимизирован для максимальной эффективности
              </span>
            </li>
            <li>
              <span className="feature-icon">🛡️</span>
              <span className="feature-text">
                <strong>Надежность</strong> — предотвращает циклические вызовы и неожиданное поведение
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentation; 