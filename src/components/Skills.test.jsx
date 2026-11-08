import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skills from './Skills';
import { SKILL_GROUPS } from '../data/skills';

describe('Skills component', () => {
    it('lists every skill under its group', () => {
        render(<Skills />);

        expect(screen.getByRole('heading', { name: /Technical Skills/i })).toBeInTheDocument();
        SKILL_GROUPS.forEach(({ category, skills }) => {
            expect(screen.getByRole('heading', { name: category })).toBeInTheDocument();
            const list = screen.getByRole('list', { name: category });
            expect(within(list).getAllByRole('listitem').map((item) => item.textContent)).toEqual(skills);
        });

        expect(screen.getByRole('heading', { name: /^Education$/i })).toBeInTheDocument();
    });
});
