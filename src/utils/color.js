function relativeLuminance(hex) {
    const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const [r, g, b] = channels.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Picks whichever of white or near-black reads better on the given background.
 * Skill colours come from the admin panel, so anything that isn't #rrggbb falls back to white.
 */
export function readableTextColor(background) {
    if (!/^#[0-9a-f]{6}$/i.test(background || '')) return '#FFFFFF';

    const luminance = relativeLuminance(background);
    const onWhite = 1.05 / (luminance + 0.05);
    const onBlack = (luminance + 0.05) / 0.05;
    return onWhite >= onBlack ? '#FFFFFF' : '#000000';
}
