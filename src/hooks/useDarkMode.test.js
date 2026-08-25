import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useDarkMode } from './useDarkMode';

describe('useDarkMode hook', () => {
    beforeEach(() => {
        document.documentElement.classList.remove('dark');
    });

    it('returns false when document root does not have dark class', () => {
        const { result } = renderHook(() => useDarkMode());
        expect(result.current).toBe(false);
    });

    it('returns true when document root has dark class initially', () => {
        document.documentElement.classList.add('dark');
        const { result } = renderHook(() => useDarkMode());
        expect(result.current).toBe(true);
    });

    it('updates reactivity when dark class is added/removed on html tag', async () => {
        const { result } = renderHook(() => useDarkMode());
        expect(result.current).toBe(false);

        await act(async () => {
            document.documentElement.classList.add('dark');
        });

        await waitFor(() => {
            expect(result.current).toBe(true);
        });
    });
});
