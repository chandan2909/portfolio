import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Projects from './Projects';
import { PROJECTS } from '../data/projects';

describe('Projects component', () => {
    it('renders every project from the data file with its screenshot', () => {
        render(<Projects />);

        PROJECTS.forEach((project) => {
            expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
            expect(screen.getByAltText(`${project.title} Screenshot`)).toHaveAttribute('src', project.image);
        });
    });

    it('shows a live link only for projects that have one', () => {
        render(<Projects />);

        const withLive = PROJECTS.filter((project) => project.live);
        expect(screen.getAllByRole('link', { name: /^Live Experience:/ })).toHaveLength(withLive.length);
        expect(screen.getByRole('link', { name: 'Live Experience: Kodemy' })).toHaveAttribute('href', 'https://kodemy.chandanpathak.me/');
    });

    it('shows frontend and backend code links for projects split across two repos', () => {
        render(<Projects />);

        expect(screen.getByRole('link', { name: 'Frontend Code: KodCart' })).toHaveAttribute('href', 'https://github.com/chandan2909/kodcart-frontend');
        expect(screen.getByRole('link', { name: 'Backend Code: KodCart' })).toHaveAttribute('href', 'https://github.com/chandan2909/kodcart-backend');
        expect(screen.getByRole('link', { name: 'Source Code: KodBank' })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Backend Code: KodBank' })).toBeNull();
    });

    it('points no project at the retired chandanpathak.dev domain', () => {
        PROJECTS.forEach((project) => {
            expect(project.live).not.toMatch(/chandanpathak\.dev/);
        });
    });
});
