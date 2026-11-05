import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero component', () => {
    it('renders hero title and call to action buttons', () => {
        render(<Hero />);

        expect(screen.getByRole('heading', { level: 1, name: /Chandan/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute('href', 'https://chandanpathak.me/resume');
        expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
    });

    it('renders the code window with a label for screen readers', () => {
        render(<Hero />);

        expect(screen.getByRole('figure', { name: /spring boot controller/i })).toBeInTheDocument();
        expect(screen.getByText('ProfileController.java')).toBeInTheDocument();
    });
});
