import React, { useEffect, useRef, useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

// Colours are display values, written straight to the screen by the shader.
// Particles pass behind text outside the glass panels: a change here needs a contrast re-check.
// Dark particles stand out less on a pale page, so the light theme uses larger ones.
const THEMES = {
    light: { color: [0.376, 0.369, 0.353], alpha: 0.39, sizeScale: 1.5 },
    dark: { color: [0.57, 0.55, 0.53], alpha: 0.28, sizeScale: 1 },
};

// Every glass panel re-blurs when the background changes, so 30fps keeps that work down.
// The drift is slow enough that the lower rate isn't visible.
const FRAME_MS = 1000 / 30;
const MAX_PARTICLES = 180;
const MIN_PARTICLES = 70;
const AREA_PER_PARTICLE = 7000;

const VERTEX_SHADER = `
    attribute float aSize;
    attribute float aSeed;
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uSizeScale;
    uniform vec2 uPointer;
    varying float vStrength;

    void main() {
        vec2 p = position.xy;
        p.x += sin(uTime * 0.12 + aSeed * 6.283) * 0.06;
        p.y += cos(uTime * 0.09 + aSeed * 12.566) * 0.08;
        // Rise slowly, wrapping from just above the top edge back to just below the bottom
        p.y = mod(p.y + 1.1 + uTime * 0.012 * (0.5 + aSeed), 2.2) - 1.1;
        // Nearer (larger seed) particles shift further with the cursor, which reads as depth
        p += uPointer * (0.012 + 0.03 * aSeed);

        gl_Position = vec4(p, 0.0, 1.0);
        gl_PointSize = aSize * uSizeScale * uPixelRatio;
        // Larger particles are softer, so none of them reads as a solid dot
        vStrength = mix(1.0, 0.45, smoothstep(3.0, 14.0, aSize));
    }
`;

const FRAGMENT_SHADER = `
    precision mediump float;
    uniform vec3 uColor;
    uniform float uAlpha;
    varying float vStrength;

    void main() {
        float d = length(gl_PointCoord - 0.5);
        float edge = smoothstep(0.5, 0.15, d);
        if (edge <= 0.0) discard;
        gl_FragColor = vec4(uColor, edge * uAlpha * vStrength);
    }
`;

const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const applyThemeRef = useRef(null);
    const isDark = useDarkMode();
    const isDarkRef = useRef(isDark);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        isDarkRef.current = isDark;
        applyThemeRef.current?.(isDark);
    }, [isDark]);

    useEffect(() => {
        let cleanup = () => {};
        let cancelled = false;

        // Three.js loads after the page has rendered, so it doesn't delay first paint.
        import('three').then((THREE) => {
            if (cancelled) return;

            let renderer;
            try {
                renderer = new THREE.WebGLRenderer({
                    canvas: canvasRef.current,
                    alpha: true,
                    antialias: false,
                    powerPreference: 'low-power',
                });
            } catch {
                return; // No WebGL: the page keeps its still background.
            }

            const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
            const canHover = window.matchMedia?.('(hover: hover)').matches;
            const area = window.innerWidth * window.innerHeight;
            const count = Math.round(Math.max(MIN_PARTICLES, Math.min(MAX_PARTICLES, area / AREA_PER_PARTICLE)));

            const positions = new Float32Array(count * 3);
            const sizes = new Float32Array(count);
            const seeds = new Float32Array(count);
            for (let i = 0; i < count; i++) {
                positions[i * 3] = Math.random() * 2.2 - 1.1;
                positions[i * 3 + 1] = Math.random() * 2.2 - 1.1;
                // Mostly fine specks, with an occasional larger soft one
                sizes[i] = Math.random() < 0.15 ? 8 + Math.random() * 6 : 2 + Math.random() * 3;
                seeds[i] = Math.random();
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
            geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

            const uniforms = {
                uTime: { value: 0 },
                uPixelRatio: { value: 1 },
                uSizeScale: { value: 1 },
                uPointer: { value: new THREE.Vector2(0, 0) },
                uColor: { value: new THREE.Color() },
                uAlpha: { value: 0 },
            };
            const material = new THREE.ShaderMaterial({
                vertexShader: VERTEX_SHADER,
                fragmentShader: FRAGMENT_SHADER,
                uniforms,
                transparent: true,
                depthTest: false,
                depthWrite: false,
            });

            const points = new THREE.Points(geometry, material);
            points.frustumCulled = false; // Positions come straight from the shader
            const scene = new THREE.Scene();
            scene.add(points);
            const camera = new THREE.Camera();

            const draw = () => renderer.render(scene, camera);

            const applyTheme = (dark) => {
                const theme = dark ? THEMES.dark : THEMES.light;
                uniforms.uColor.value.setRGB(...theme.color);
                uniforms.uAlpha.value = theme.alpha;
                uniforms.uSizeScale.value = theme.sizeScale;
                draw();
            };

            const resize = () => {
                const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
                renderer.setPixelRatio(pixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight, false);
                uniforms.uPixelRatio.value = pixelRatio;
                draw();
            };

            const pointerTarget = { x: 0, y: 0 };
            const onPointerMove = (e) => {
                pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
                pointerTarget.y = 1 - (e.clientY / window.innerHeight) * 2;
            };

            let raf = 0;
            let lastFrame = 0;
            const start = performance.now();
            const loop = (now) => {
                raf = requestAnimationFrame(loop);
                if (now - lastFrame < FRAME_MS) return;
                lastFrame = now;
                uniforms.uTime.value = (now - start) / 1000;
                const pointer = uniforms.uPointer.value;
                pointer.x += (pointerTarget.x - pointer.x) * 0.04;
                pointer.y += (pointerTarget.y - pointer.y) * 0.04;
                draw();
            };

            const onVisibilityChange = () => {
                cancelAnimationFrame(raf);
                if (!document.hidden) raf = requestAnimationFrame(loop);
            };

            applyThemeRef.current = applyTheme;
            resize();
            applyTheme(isDarkRef.current);
            window.addEventListener('resize', resize);

            // With reduced motion the particles are drawn once and stay still.
            if (!reducedMotion) {
                if (canHover) window.addEventListener('pointermove', onPointerMove, { passive: true });
                document.addEventListener('visibilitychange', onVisibilityChange);
                raf = requestAnimationFrame(loop);
            }

            setReady(true);

            cleanup = () => {
                cancelAnimationFrame(raf);
                window.removeEventListener('resize', resize);
                window.removeEventListener('pointermove', onPointerMove);
                document.removeEventListener('visibilitychange', onVisibilityChange);
                applyThemeRef.current = null;
                geometry.dispose();
                material.dispose();
                renderer.dispose();
            };
        }).catch(() => {
            // Three.js failed to load: the page keeps its still background.
        });

        return () => {
            cancelled = true;
            cleanup();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            data-testid="animated-background"
            aria-hidden="true"
            className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
            style={{ zIndex: -1 }}
        />
    );
};

export default AnimatedBackground;
