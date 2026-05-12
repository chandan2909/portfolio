import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const wrapperRef = useRef(null);
    
    // Store positions in refs so they survive re-renders and don't reset
    const pos = useRef({
        mouseX: window.innerWidth / 2,
        mouseY: window.innerHeight / 2,
        dotX: window.innerWidth / 2,
        dotY: window.innerHeight / 2,
        ringX: window.innerWidth / 2,
        ringY: window.innerHeight / 2,
        isHovering: false,
        isVisible: false
    });

    useEffect(() => {
        if (window.matchMedia('(hover: none)').matches) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        const wrapper = wrapperRef.current;
        if (!dot || !ring || !wrapper) return;

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
            
            p.dotX += (p.mouseX - p.dotX) * 0.4;
            p.dotY += (p.mouseY - p.dotY) * 0.4;
            
            p.ringX += (p.mouseX - p.ringX) * 0.15;
            p.ringY += (p.mouseY - p.ringY) * 0.15;

            dot.style.transform = `translate3d(${p.dotX}px, ${p.dotY}px, 0) translate(-50%, -50%)`;
            ring.style.transform = `translate3d(${p.ringX}px, ${p.ringY}px, 0) translate(-50%, -50%) ${p.isHovering ? 'scale(1.5)' : 'scale(1)'}`;
            
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
            <div
                ref={ringRef}
                className="absolute top-0 left-0 w-8 h-8 rounded-full border-2 border-white transition-transform duration-150 ease-out will-change-transform opacity-100"
                style={{ transform: 'translate(-50%, -50%) scale(1)' }}
            />
            <div
                ref={dotRef}
                className="absolute top-0 left-0 w-2 h-2 rounded-full bg-white will-change-transform"
                style={{ transform: 'translate(-50%, -50%)' }}
            />
        </div>
    );
};

export default CustomCursor;
