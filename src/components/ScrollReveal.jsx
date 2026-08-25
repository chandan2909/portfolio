import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * ScrollReveal — wraps children and reveals them when they scroll into view.
 *
 * Props:
 *  - direction: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'  (default: 'up')
 *  - delay: number in ms, maps to CSS delay class (0, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800)
 *  - threshold: IntersectionObserver threshold (default 0.12)
 *  - className: extra classes for the wrapper
 *  - as: HTML tag for wrapper (default 'div')
 */
export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    threshold = 0.12,
    className = '',
    as: Tag = 'div',
}) {
    const { ref, visible } = useScrollReveal({ threshold });

    const delayClass = delay ? `reveal-delay-${delay}` : '';

    return (
        <Tag
            ref={ref}
            className={`reveal reveal-${direction} ${delayClass} ${visible ? 'is-visible' : ''} ${className}`.trim()}
        >
            {children}
        </Tag>
    );
}
