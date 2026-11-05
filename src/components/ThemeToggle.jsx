import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

// The saved or system theme is applied by the inline script in index.html, before first paint.
const ThemeToggle = ({ className = "" }) => {
    const isDark = useDarkMode();

    const toggleTheme = () => {
        const next = !document.documentElement.classList.contains('dark');
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${className} ${isDark
                    ? 'bg-dark-200 text-yellow-300 hover:bg-dark-300 shadow-sm'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-sm'
                }`}
            aria-label="Toggle Theme"
        >
            {isDark ? <Sun size={18} fill="currentColor" /> : <Moon size={18} fill="currentColor" />}
        </button>
    );
};

export default ThemeToggle;
