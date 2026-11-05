import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import AnimatedBackground from './AnimatedBackground';

const webGLRenderer = vi.hoisted(() => vi.fn(() => {
    throw new Error('WebGL is not available');
}));

vi.mock('three', () => ({ WebGLRenderer: webGLRenderer }));

describe('AnimatedBackground', () => {
    it('stays hidden from assistive tech and pointer events', () => {
        render(<AnimatedBackground />);
        const canvas = screen.getByTestId('animated-background');
        expect(canvas).toHaveAttribute('aria-hidden', 'true');
        expect(canvas.className).toContain('pointer-events-none');
    });

    it('leaves the page usable when WebGL is unavailable', async () => {
        render(<AnimatedBackground />);
        await waitFor(() => expect(webGLRenderer).toHaveBeenCalled());
        expect(screen.getByTestId('animated-background').className).toContain('opacity-0');
    });
});
