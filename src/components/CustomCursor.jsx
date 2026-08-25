import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const wrapperRef = useRef(null);

    const pos = useRef({
        mouseX: window.innerWidth / 2,
        mouseY: window.innerHeight / 2,
        cursorX: window.innerWidth / 2,
        cursorY: window.innerHeight / 2,
        isHovering: false,
        isVisible: false
    });

    useEffect(() => {
        if (window.matchMedia('(hover: none)').matches) return;

        const cursor = cursorRef.current;
        const wrapper = wrapperRef.current;
        if (!cursor || !wrapper) return;

        pos.current.isVisible = true;
        let raf;

        const onMouseMove = (e) => {
            if (!pos.current.isVisible) {
                pos.current.isVisible = true;
                wrapper.style.opacity = '1';
            }
            pos.current.mouseX = e.clientX;
            pos.current.mouseY = e.clientY;
        };

        const onMouseEnter = () => {
            pos.current.isVisible = true;
            wrapper.style.opacity = '1';
        };
        const onMouseLeave = () => {
            pos.current.isVisible = false;
            wrapper.style.opacity = '0';
        };

        const handleMouseOver = (e) => {
            const isInteractive = e.target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
            pos.current.isHovering = !!isInteractive;
        };

        const animate = () => {
            const p = pos.current;

            p.cursorX += (p.mouseX - p.cursorX) * 0.2;
            p.cursorY += (p.mouseY - p.cursorY) * 0.2;

            cursor.style.transform = `translate3d(${p.cursorX}px, ${p.cursorY}px, 0) translate(-2px, -2px) ${p.isHovering ? 'scale(1.2)' : 'scale(1)'}`;

            raf = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.body.addEventListener('mouseenter', onMouseEnter);
        document.body.addEventListener('mouseleave', onMouseLeave);

        raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseenter', onMouseEnter);
            document.body.removeEventListener('mouseleave', onMouseLeave);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div ref={wrapperRef} className="pointer-events-none fixed inset-0 z-[999999] opacity-0 transition-opacity duration-300 mix-blend-difference">
            <svg
                ref={cursorRef}
                className="absolute top-0 left-0 will-change-transform"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ transform: 'translate(-2px, -2px)' }}
            >
                <path
                    d="M4 2L4 20L9.5 14.5L15 22L18 20L12.5 12.5L20 12.5L4 2Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default CustomCursor;
