import { useRef } from 'react';
import { useSyncScroll } from '../hooks/useSyncScroll';
import './SyncScrollDemo.css';

export const SyncScrollDemo = () => {
  // Создаем рефы для трех контейнеров, которые будем синхронизировать
  const container1Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);
  const container3Ref = useRef<HTMLDivElement>(null);

  // Используем наш хук для синхронизации скролла
  useSyncScroll([container1Ref, container2Ref, container3Ref]);

  // Создаем элементы для каждого контейнера с разной высотой
  const generateItems = (prefix: string, count: number, height: number, width: number) => {
    return Array.from({ length: count }, (_, index) => (
      <div 
        key={`${prefix}-${index}`} 
        className="scroll-item"
        style={{ 
          height: `${height}px`,
          width: `${width}px` 
        }}
      >
        {`${prefix} элемент ${index + 1}`}
      </div>
    ));
  };

  return (
    <div className="sync-scroll-demo">
      <h2>Демонстрация синхронизированного скроллинга</h2>
      
      <div className="containers-wrapper">
        <div className="scroll-container-wrapper">
          <h3>Контейнер 1</h3>
          <div className="scroll-container" ref={container1Ref}>
            <div className="scroll-content">
              {generateItems('Первый', 20, 100, 500)}
            </div>
          </div>
        </div>
        
        <div className="scroll-container-wrapper">
          <h3>Контейнер 2</h3>
          <div className="scroll-container" ref={container2Ref}>
            <div className="scroll-content">
              {generateItems('Второй', 20, 60, 900)}
            </div>
          </div>
        </div>
        
        <div className="scroll-container-wrapper">
          <h3>Контейнер 3</h3>
          <div className="scroll-container" ref={container3Ref}>
            <div className="scroll-content">
              {generateItems('Третий', 10, 80, 1200)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="description">
        <p>
          Прокрутите любой из контейнеров по вертикали или горизонтали и наблюдайте 
          синхронизированный скроллинг во всех трех контейнерах, несмотря на различную 
          высоту и ширину элементов в каждом контейнере.
        </p>
      </div>
    </div>
  );
}; 