import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Skills from './Skills';
import * as dataManager from '../utils/dataManager';

describe('Skills component', () => {
    it('renders technical skills grid with scroll reveal', async () => {
        vi.spyOn(dataManager, 'getSkills').mockResolvedValue([
            { id: 's1', name: 'React', level: 'Expert', category: 'Frontend Framework' },
            { id: 's2', name: 'Node.js', level: 'Advanced', category: 'Backend' },
        ]);

        render(<Skills />);

        expect(screen.getByText(/Technical Skills/i)).toBeInTheDocument();

        // Wait for skills to load and render in grid
        await waitFor(() => {
            expect(screen.getByText('React')).toBeInTheDocument();
            expect(screen.getByText('Node.js')).toBeInTheDocument();
        });

        // Education section should also render
        expect(screen.getByRole('heading', { name: /^Education$/i })).toBeInTheDocument();
    });
});
