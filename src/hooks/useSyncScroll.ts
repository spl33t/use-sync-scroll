import { useEffect, useRef } from 'react';

// Обновляем тип для работы с любыми HTML элементами
type ElementRef = React.RefObject<HTMLElement | null> | React.RefObject<Element | null>;

/**
 * Хук для синхронизации скроллинга между несколькими контейнерами
 * @param refs - Массив ссылок на DOM-элементы для синхронизации
 */
export function useSyncScroll(refs: ElementRef[]): void {
  // Флаг для отслеживания процесса синхронизации, чтобы избежать рекурсивных вызовов
  const isScrolling = useRef(false);
  // Сохраняем последнее положение скролла каждого элемента
  const scrollPositions = useRef<Map<Element, { x: number; y: number }>>(new Map());
  // ID для очистки таймаута для throttling
  const scrollTimeoutId = useRef<number | null>(null);

  useEffect(() => {
    const validRefs = refs.filter(ref => ref.current !== null) as { current: Element }[];
    
    if (validRefs.length <= 1) return; // Нет необходимости в синхронизации, если есть только один элемент

    // Инициализация позиций скролла
    validRefs.forEach(ref => {
      if (ref.current) {
        scrollPositions.current.set(ref.current, {
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop
        });
      }
    });

    // Функция для вычисления относительного положения скролла
    const calculateRelativePosition = (
      element: Element, 
      scrollPosition: number,
      scrollSize: number,
      containerSize: number
    ) => {
      // Если нет скролла, возвращаем 0
      if (scrollSize <= containerSize) return 0;
      
      // Относительная позиция в диапазоне [0, 1]
      return scrollPosition / (scrollSize - containerSize);
    };

    // Обработчик события скролла
    const handleScroll = (scrolledElement: Element) => {
      if (isScrolling.current) return; // Предотвращаем рекурсивные вызовы
      
      if (scrollTimeoutId.current !== null) {
        window.clearTimeout(scrollTimeoutId.current);
      }

      // Используем throttling для улучшения производительности
      scrollTimeoutId.current = window.setTimeout(() => {
        // Устанавливаем флаг, что мы в процессе синхронизации
        isScrolling.current = true;

        try {
          // Получаем текущую позицию прокрутки и размеры элемента, который был прокручен
          const scrollLeft = scrolledElement.scrollLeft;
          const scrollTop = scrolledElement.scrollTop;
          const scrollWidth = scrolledElement.scrollWidth;
          const scrollHeight = scrolledElement.scrollHeight;
          const clientWidth = scrolledElement.clientWidth;
          const clientHeight = scrolledElement.clientHeight;

          // Вычисляем относительное положение
          const relativeX = calculateRelativePosition(scrolledElement, scrollLeft, scrollWidth, clientWidth);
          const relativeY = calculateRelativePosition(scrolledElement, scrollTop, scrollHeight, clientHeight);

          // Синхронизируем все остальные элементы
          validRefs.forEach(ref => {
            if (ref.current && ref.current !== scrolledElement) {
              const targetElement = ref.current;
              
              // Вычисляем абсолютную позицию для целевого элемента на основе относительной позиции
              const targetScrollWidth = targetElement.scrollWidth;
              const targetScrollHeight = targetElement.scrollHeight;
              const targetClientWidth = targetElement.clientWidth;
              const targetClientHeight = targetElement.clientHeight;
              
              const targetXPosition = Math.round(relativeX * (targetScrollWidth - targetClientWidth));
              const targetYPosition = Math.round(relativeY * (targetScrollHeight - targetClientHeight));

              // Обновляем позицию прокрутки только если она изменилась
              if (targetElement.scrollLeft !== targetXPosition) {
                targetElement.scrollLeft = targetXPosition;
              }
              if (targetElement.scrollTop !== targetYPosition) {
                targetElement.scrollTop = targetYPosition;
              }
              
              // Обновляем сохраненную позицию
              scrollPositions.current.set(targetElement, { x: targetXPosition, y: targetYPosition });
            }
          });

          // Обновляем сохраненное положение для пролистанного элемента
          scrollPositions.current.set(scrolledElement, { x: scrollLeft, y: scrollTop });
        } finally {
          // Сбрасываем флаг синхронизации
          isScrolling.current = false;
        }
      }, 10); // Небольшая задержка для throttling
    };

    // Устанавливаем обработчики событий на все элементы
    const scrollHandlers = new Map<Element, (e: Event) => void>();

    validRefs.forEach(ref => {
      if (ref.current) {
        const element = ref.current;
        const handler = () => handleScroll(element);
        
        scrollHandlers.set(element, handler);
        element.addEventListener('scroll', handler, { passive: true });
      }
    });

    // Очистка обработчиков при размонтировании
    return () => {
      validRefs.forEach(ref => {
        if (ref.current) {
          const handler = scrollHandlers.get(ref.current);
          if (handler) {
            ref.current.removeEventListener('scroll', handler);
          }
        }
      });
      
      if (scrollTimeoutId.current !== null) {
        window.clearTimeout(scrollTimeoutId.current);
      }
    };
  }, [refs]); // Пересоздаем эффект при изменении refs
} 