import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ className = "" }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // First check localStorage, then system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 focus:outline-none ${className} ${theme === 'dark'
                    ? 'bg-dark-200 text-yellow-300 hover:bg-dark-300 shadow-sm'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-sm'
                }`}
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? <Moon size={18} fill="currentColor" /> : <Sun size={18} fill="currentColor" />}
        </button>
    );
};

export default ThemeToggle;
