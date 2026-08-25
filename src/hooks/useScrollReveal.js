import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal — returns a ref to attach to a DOM element.
 * When the element scrolls into view, the returned `visible` state flips true.
 * Used internally by the <ScrollReveal> component.
 *
 * @param {object} options - IntersectionObserver options
 * @param {number} options.threshold - 0–1, default 0.15
 * @param {string} options.rootMargin - e.g. "0px 0px -60px 0px"
 * @param {boolean} options.once - only trigger once (default true)
 */
export function useScrollReveal({
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    once = true,
} = {}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return { ref, visible };
}

/**
 * Default export: Global page-level scroll reveal hook.
 * Activates .animate-on-scroll elements by adding the .animate-in class
 * when they enter the viewport. Called once per page in page components.
 */
export default function usePageScrollReveal() {
    useEffect(() => {
        const elements = document.querySelectorAll('.animate-on-scroll');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}
