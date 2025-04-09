import { useEffect, useRef } from 'react';

// Обновляем тип для работы с любыми HTML элементами
type ElementRef = React.RefObject<HTMLElement | null>;

/**
 * Хук для синхронизации скроллинга между несколькими контейнерами.
 * Использует прямой подход к синхронизации без дополнительных абстракций.
 * 
 * @param refs Массив ссылок на элементы, которые нужно синхронизировать
 */
export function useSyncScroll(refs: ElementRef[]): void {
  // Флаг, указывающий, что идет процесс программной синхронизации
  const isScrolling = useRef(false);
  // Сохраняем последние позиции для каждого элемента
  const lastPositions = useRef<Map<HTMLElement, { x: number, y: number }>>(new Map());

  useEffect(() => {
    // Получаем действительные элементы
    const elements = refs
      .map(ref => ref.current)
      .filter(Boolean) as HTMLElement[];

    if (elements.length <= 1) return; // Нет необходимости в синхронизации, если только один элемент

    // Инициализируем lastPositions для всех элементов
    elements.forEach(element => {
      lastPositions.current.set(element, { 
        x: element.scrollLeft, 
        y: element.scrollTop 
      });
    });

    // Функция для вычисления процентной позиции скролла
    function getScrollPercentage(element: HTMLElement) {
      // Горизонтальная процентная позиция (0 - 100)
      const xPercent = element.scrollWidth <= element.clientWidth 
        ? 0 
        : (element.scrollLeft / (element.scrollWidth - element.clientWidth)) * 100;
      
      // Вертикальная процентная позиция (0 - 100)
      const yPercent = element.scrollHeight <= element.clientHeight 
        ? 0 
        : (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
      
      return { xPercent, yPercent };
    }

    // Функция для установки позиции скролла по процентам
    function setScrollPercentage(element: HTMLElement, { xPercent, yPercent }: { xPercent: number | null, yPercent: number | null }) {
      // Обновляем X только если процент не null (т.е. было движение по X)
      if (xPercent !== null && element.scrollWidth > element.clientWidth) {
        const targetX = (xPercent / 100) * (element.scrollWidth - element.clientWidth);
        // Устанавливаем только если реально есть разница (минимум 1px)
        if (Math.abs(element.scrollLeft - targetX) >= 1) {
          element.scrollLeft = targetX;
          // Обновляем сохраненную позицию по X
          const currentPos = lastPositions.current.get(element) || { x: 0, y: 0 };
          lastPositions.current.set(element, { ...currentPos, x: targetX });
        }
      }
      
      // Обновляем Y только если процент не null (т.е. было движение по Y)
      if (yPercent !== null && element.scrollHeight > element.clientHeight) {
        const targetY = (yPercent / 100) * (element.scrollHeight - element.clientHeight);
        // Устанавливаем только если реально есть разница (минимум 1px)
        if (Math.abs(element.scrollTop - targetY) >= 1) {
          element.scrollTop = targetY;
          // Обновляем сохраненную позицию по Y
          const currentPos = lastPositions.current.get(element) || { x: 0, y: 0 };
          lastPositions.current.set(element, { ...currentPos, y: targetY });
        }
      }
    }

    // Функция синхронизации для конкретного элемента
    function syncFromElement(sourceElement: HTMLElement) {
      // Если уже синхронизируемся, предотвращаем рекурсию
      if (isScrolling.current) return;
      
      isScrolling.current = true;
      
      try {
        // Получаем последние известные позиции источника
        const lastPos = lastPositions.current.get(sourceElement) || { x: 0, y: 0 };
        
        // Определяем, по какой оси произошло движение, сравнивая с предыдущей позицией
        const movedX = Math.abs(sourceElement.scrollLeft - lastPos.x) >= 1;
        const movedY = Math.abs(sourceElement.scrollTop - lastPos.y) >= 1;
        
        // Получаем новые процентные позиции источника
        const { xPercent, yPercent } = getScrollPercentage(sourceElement);
        
        // Обновляем сохраненную позицию для источника
        lastPositions.current.set(sourceElement, { 
          x: sourceElement.scrollLeft, 
          y: sourceElement.scrollTop 
        });
        
        // Применяем проценты ко всем остальным элементам, только по тем осям, по которым было движение
        elements.forEach(element => {
          if (element !== sourceElement) {
            setScrollPercentage(element, { 
              xPercent: movedX ? xPercent : null, 
              yPercent: movedY ? yPercent : null 
            });
          }
        });
      } finally {
        // Всегда сбрасываем флаг, даже при ошибках
        isScrolling.current = false;
      }
    }
    
    // Создаем обработчики событий скролла для каждого элемента
    const handlers = elements.map(element => {
      const handler = () => syncFromElement(element);
      element.addEventListener('scroll', handler, { passive: true });
      return { element, handler };
    });

    // Очистка при размонтировании
    return () => {
      handlers.forEach(({ element, handler }) => {
        element.removeEventListener('scroll', handler);
      });
      lastPositions.current.clear();
    };
  }, [refs]); // Пересоздаем эффект только при изменении ссылок
} 