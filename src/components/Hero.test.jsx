import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero component', () => {
    it('renders hero title and call to action buttons', () => {
        render(<Hero />);

        expect(screen.getByText(/Chandan/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
    });

    it('renders the avatar image in the hero section', () => {
        render(<Hero />);

        expect(screen.getByAltText(/Chandan Pathak Profile/i)).toBeInTheDocument();
    });
});
