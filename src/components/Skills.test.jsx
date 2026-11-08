import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skills from './Skills';
import { SKILLS } from '../data/skills';

describe('Skills component', () => {
    it('renders every skill from the data file, grouped by category, without loading', () => {
        render(<Skills />);

        expect(screen.getByText(/Technical Skills/i)).toBeInTheDocument();
        SKILLS.forEach((skill) => {
            expect(screen.getAllByText(skill.name).length).toBeGreaterThan(0);
        });

        const tools = screen.getByRole('heading', { name: /Tools/ }).closest('[role="listitem"]');
        expect(within(tools).getByText('Postman')).toBeInTheDocument();

        expect(screen.getByRole('heading', { name: /^Education$/i })).toBeInTheDocument();
    });

    it('uses grey chips for skills without a colour', () => {
        render(<Skills />);
        expect(screen.getByText('OOP').parentElement).toHaveStyle({ backgroundColor: '#6B7280' });
    });
});
