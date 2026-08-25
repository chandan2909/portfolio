import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle component', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove('dark');
    });

    it('renders theme toggle button', () => {
        render(<ThemeToggle />);
        const btn = screen.getByRole('button', { name: /toggle theme/i });
        expect(btn).toBeInTheDocument();
    });

    it('toggles theme between light and dark on click', () => {
        render(<ThemeToggle />);
        const btn = screen.getByRole('button', { name: /toggle theme/i });

        // Initial click to switch to dark
        fireEvent.click(btn);
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(localStorage.getItem('theme')).toBe('dark');

        // Click again to switch to light
        fireEvent.click(btn);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        expect(localStorage.getItem('theme')).toBe('light');
    });
});
