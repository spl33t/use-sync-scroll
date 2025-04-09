# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# useSyncScroll Hook

React-хук для синхронизации скроллинга нескольких контейнеров, учитывающий различия в размерах и содержимом.

## Особенности

- ✅ Синхронизация скроллинга как по оси X, так и по оси Y
- ✅ Поддержка контейнеров с разными размерами и содержимым
- ✅ Плавная синхронизация без "дерганий"
- ✅ Оптимизированная производительность с использованием throttling
- ✅ Предотвращение рекурсивных вызовов обработчиков событий
- ✅ Типизация с использованием TypeScript

## Установка

```bash
npm install scroll-sync-hook
```

## Использование

```jsx
import React, { useRef } from 'react';
import { useSyncScroll } from 'scroll-sync-hook';

function MyComponent() {
  // Создаем рефы для каждого контейнера
  const container1Ref = useRef(null);
  const container2Ref = useRef(null);
  const container3Ref = useRef(null);
  
  // Используем хук для синхронизации скроллинга
  useSyncScroll([container1Ref, container2Ref, container3Ref]);
  
  return (
    <div>
      <div className="container" ref={container1Ref}>
        {/* Содержимое первого контейнера */}
      </div>
      <div className="container" ref={container2Ref}>
        {/* Содержимое второго контейнера */}
      </div>
      <div className="container" ref={container3Ref}>
        {/* Содержимое третьего контейнера */}
      </div>
    </div>
  );
}
```

## API

### useSyncScroll

```typescript
function useSyncScroll(refs: React.RefObject<HTMLElement | Element | null>[]): void
```

#### Параметры

- `refs`: Массив ссылок (refs) на DOM-элементы для синхронизации скроллинга.

## Как это работает

1. Хук отслеживает события скроллинга на всех переданных контейнерах.
2. При скроллинге одного из контейнеров, вычисляется его относительная позиция.
3. Относительная позиция применяется к другим контейнерам с учетом их размеров.
4. Для оптимизации производительности используется throttling.
5. Специальный флаг предотвращает рекурсивные вызовы при синхронизации.

## Пример использования в реальном проекте

- Синхронизация скроллинга между редактором кода и предпросмотром
- Синхронизация нескольких панелей с разным содержимым
- Синхронизация списка и дополнительной информации
- Синхронизация временной шкалы и содержимого

## Локальная разработка

```bash
# Клонирование репозитория
git clone https://github.com/username/scroll-sync-hook.git
cd scroll-sync-hook

# Установка зависимостей
npm install

# Запуск демо
npm run dev
```

## Лицензия

MIT
