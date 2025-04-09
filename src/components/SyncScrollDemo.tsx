import { useRef, useEffect } from 'react';
import { useSyncScroll } from '../hooks/useSyncScroll';
import '../styles/SyncScrollDemo.css';

// Компонент для отображения информации о скролле
const ScrollInfo = ({ containerId }: { containerId: string }) => {
    return (
        <div className="scroll-info">
            <div className="scroll-percentage">
                <span>X: </span>
                <span className="percentage-value" id={`${containerId}-x-percent`}>0%</span>
                <span className="size-value" id={`${containerId}-x-size`}>(0px)</span>
            </div>
            <div className="scroll-percentage">
                <span>Y: </span>
                <span className="percentage-value" id={`${containerId}-y-percent`}>0%</span>
                <span className="size-value" id={`${containerId}-y-size`}>(0px)</span>
            </div>
        </div>
    );
};

export const SyncScrollDemo = () => {
    // Создаем рефы для трех контейнеров
    const container1Ref = useRef<HTMLDivElement>(null);
    const container2Ref = useRef<HTMLDivElement>(null);
    const container3Ref = useRef<HTMLDivElement>(null);

    // Используем наш хук для синхронизации скролла
    useSyncScroll([container1Ref, container2Ref, container3Ref]);

    // Отслеживаем и обновляем процентные значения для отображения
    useEffect(() => {
        // Функция для вычисления процентной позиции скролла
        const updateScrollPercentages = () => {
            [
                { element: container1Ref.current, idPrefix: 'container1' },
                { element: container2Ref.current, idPrefix: 'container2' },
                { element: container3Ref.current, idPrefix: 'container3' }
            ].forEach(({ element, idPrefix }) => {
                if (!element) return;

                const xPercent = element.scrollWidth <= element.clientWidth
                    ? 0
                    : (element.scrollLeft / (element.scrollWidth - element.clientWidth)) * 100;

                const yPercent = element.scrollHeight <= element.clientHeight
                    ? 0
                    : (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;

                const xPercentElement = document.getElementById(`${idPrefix}-x-percent`);
                const yPercentElement = document.getElementById(`${idPrefix}-y-percent`);
                const xSizeElement = document.getElementById(`${idPrefix}-x-size`);
                const ySizeElement = document.getElementById(`${idPrefix}-y-size`);

                if (xPercentElement) {
                    xPercentElement.textContent = `${Math.round(xPercent)}%`;
                }

                if (yPercentElement) {
                    yPercentElement.textContent = `${Math.round(yPercent)}%`;
                }

                if (xSizeElement) {
                    xSizeElement.textContent = `(${element.scrollWidth}px)`;
                }

                if (ySizeElement) {
                    ySizeElement.textContent = `(${element.scrollHeight}px)`;
                }
            });
        };

        // Добавляем слушатели событий скролла на каждый контейнер
        const containers = [
            container1Ref.current,
            container2Ref.current,
            container3Ref.current
        ].filter(Boolean);

        containers.forEach(container => {
            if (container) {
                container.addEventListener('scroll', updateScrollPercentages, { passive: true });
            }
        });

        // Первичное обновление
        updateScrollPercentages();

        // Очистка при размонтировании
        return () => {
            containers.forEach(container => {
                if (container) {
                    container.removeEventListener('scroll', updateScrollPercentages);
                }
            });
        };
    }, []);

    // Создаем разное содержимое для каждого контейнера
    const generateItems = (prefix: string, count: number, itemHeight: number, itemWidth: number) => {
        return Array.from({ length: count }, (_, index) => (
            <div
                key={`${prefix}-${index}`}
                className="scroll-item"
                style={{
                    height: `${itemHeight}px`,
                    width: `${itemWidth}px`,
                    backgroundColor: index % 2 === 0
                        ? `hsl(${(index * 10) % 360}, 70%, 80%)`
                        : `hsl(${(index * 10 + 180) % 360}, 70%, 85%)`
                }}
            >
                <div className="item-content">
                    <div className="item-index">{index + 1}</div>
                    <div className="item-label">{`${prefix}`}</div>
                </div>
            </div>
        ));
    };

    return (
        <div className="sync-scroll-demo">
            <h2>Демонстрация синхронизированного скроллинга</h2>

            <div className="instructions">
                <p>Прокрутите любой из контейнеров для проверки плавности синхронизации.
                    Обратите внимание на изменение позиций индикаторов в каждом контейнере.</p>
            </div>

            <div className="containers-wrapper">
                <div className="scroll-container-wrapper">
                    <ScrollInfo containerId="container1" />
                    <div className="scroll-container" ref={container1Ref}>
                        <div className="scroll-content">
                            {generateItems('A', 30, 100, 300)}
                        </div>
                    </div>

                </div>

                <div className="scroll-container-wrapper">
                    <ScrollInfo containerId="container2" />
                    <div className="scroll-container" ref={container2Ref}>
                        <div className="scroll-content">
                            {generateItems('B', 30, 60, 500)}
                        </div>
                    </div>

                </div>

                <div className="scroll-container-wrapper">
                    <ScrollInfo containerId="container3" />
                    <div className="scroll-container" ref={container3Ref}>
                        <div className="scroll-content">
                            {generateItems('C', 30, 80, 400)}
                        </div>
                    </div>

                </div>
            </div>

      
        </div>
    );
}; 