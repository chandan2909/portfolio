import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
    const glowRef = useRef(null);

    useEffect(() => {
        // Only enable on non-touch devices
        if (window.matchMedia('(hover: none)').matches) return;

        const glow = glowRef.current;
        if (!glow) return;

        let raf;
        let mouseX = -500;
        let mouseY = -500;
        let currentX = -500;
        let currentY = -500;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            // Smooth lerp follow
            currentX += (mouseX - currentX) * 0.08;
            currentY += (mouseY - currentY) * 0.08;
            glow.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;
            raf = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            aria-hidden="true"
            className="hidden lg:block fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
            style={{
                background: 'radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)',
            }}
        />
    );
};

export default CursorGlow;
