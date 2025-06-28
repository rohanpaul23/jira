import '@radix-ui/themes/styles.css';
import React, { useState, Suspense } from 'react';
import { css } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { FaSun, FaMoon } from 'react-icons/fa';
import './styles/main.scss';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useTranslation } from 'react-i18next';
import './i18n';



// Container styling using Emotion CSS
const containerStyle = css`
  min-height: 100vh;
  background: var(--background-color);
  color: var(--primary-color);
  position: relative;
`;

// Theme toggle button styling
const themeToggleStyle = css`
  position: absolute;
  top: 20px;
  right: 10rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const langSelectorStyle = css`
  position: absolute;
  top: 20px;
  right: 6rem;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1rem;
  cursor: pointer;
`;

// Main App component with routing
const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div data-theme={theme} css={containerStyle}>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        css={themeToggleStyle}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        css={langSelectorStyle}
      >
        <option value="en">EN</option>
        <option value="kn">ಕನ್ನಡ</option>
      </select>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Landing />} />
        <Route path="/signup" element={<Landing />} />
      </Routes>
    </div>
  );
};

// Render the application
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');
createRoot(rootElement).render(
  <BrowserRouter>
    <Theme>
       <Suspense fallback={<div>Loading translations…</div>}>
        <App />
      </Suspense>
    </Theme>
  </BrowserRouter>
);