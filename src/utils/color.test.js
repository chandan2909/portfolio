import { describe, it, expect } from 'vitest';
import { readableTextColor } from './color';

describe('readableTextColor', () => {
    it('uses black on light brand colours', () => {
        expect(readableTextColor('#F7DF1E')).toBe('#000000'); // JavaScript
        expect(readableTextColor('#61DAFB')).toBe('#000000'); // React
    });

    it('uses white on dark brand colours', () => {
        expect(readableTextColor('#1572B6')).toBe('#FFFFFF'); // CSS3
        expect(readableTextColor('#6B7280')).toBe('#FFFFFF'); // default chip
    });

    it('falls back to white for missing or non-hex values', () => {
        expect(readableTextColor(undefined)).toBe('#FFFFFF');
        expect(readableTextColor('rebeccapurple')).toBe('#FFFFFF');
    });
});
