import React, { useEffect, useRef, useCallback } from 'react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
];

const NAV_ICONS = {
    'Home': (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    'About': (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
    ),
    'Skills': (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    'Projects': (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    ),
    'Contact': (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
        </svg>
    ),
};

const ACTIVE_DESKTOP = 'bg-gray-200 text-black dark:bg-dark-200 dark:text-white';
const INACTIVE_DESKTOP = 'text-gray-500 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-white';
const ACTIVE_MOBILE = 'bg-gray-200 text-black dark:bg-dark-200 dark:text-white';
const INACTIVE_MOBILE = 'text-gray-400 dark:text-gray-500';

const Navbar = () => {
    const navRef = useRef(null);
    const activeRef = useRef('home');

    const updateHighlight = useCallback((id) => {
        if (activeRef.current === id) return;
        activeRef.current = id;

        const nav = navRef.current;
        if (!nav) return;

        const desktopLinks = nav.querySelectorAll('[data-nav-link]');
        const mobileLinks = nav.querySelectorAll('[data-nav-mobile]');

        desktopLinks.forEach((link) => {
            const isActive = link.dataset.navLink === id;
            link.className = `cursor-pointer px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-150 ${
                isActive ? ACTIVE_DESKTOP : INACTIVE_DESKTOP
            }`;
        });

        mobileLinks.forEach((link) => {
            const isActive = link.dataset.navMobile === id;
            link.className = `flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-full transition-colors duration-150 min-w-[52px] ${
                isActive ? ACTIVE_MOBILE : INACTIVE_MOBILE
            }`;
            const icon = link.querySelector('[data-nav-icon]');
            const label = link.querySelector('[data-nav-label]');
            if (icon) icon.className = `transition-transform duration-150 ${isActive ? 'scale-110' : ''}`;
            if (label) label.className = `text-[8px] font-black uppercase tracking-wider transition-colors duration-150 ${isActive ? 'text-black dark:text-white' : ''}`;
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const navbarHeight = 80;
            let current = 'home';

            for (const item of NAV_ITEMS) {
                const el = document.getElementById(item.id);
                if (el && el.getBoundingClientRect().top <= navbarHeight + window.innerHeight / 3) {
                    current = item.id;
                }
            }

            updateHighlight(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [updateHighlight]);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            ref={navRef}
            className="fixed bottom-6 lg:bottom-auto lg:top-6 left-1/2 -translate-x-1/2 z-[100000] bg-surface/80 dark:bg-dark-100/80 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-full shadow-lg px-2 py-2 flex items-center gap-1"
            aria-label="Main navigation"
        >
            {/* Desktop: text links */}
            <div className="hidden lg:flex items-center gap-1">
                {NAV_ITEMS.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        data-nav-link={item.id}
                        onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                        className={`cursor-pointer px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-150 ${
                            item.id === 'home' ? ACTIVE_DESKTOP : INACTIVE_DESKTOP
                        }`}
                    >
                        {item.name}
                    </a>
                ))}
                <div className="flex items-center gap-1 ml-1 pl-2 border-l border-gray-200 dark:border-slate-700">
                    <ThemeToggle />
                    <a
                        href="https://www.github.com/chandan2909/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-white transition-colors duration-150"
                        aria-label="Visit GitHub profile"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/chandanpathak291"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-white transition-colors duration-150"
                        aria-label="Visit LinkedIn profile"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Mobile: icon links */}
            <div className="flex lg:hidden items-center gap-0.5">
                {NAV_ITEMS.map((item, i) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        data-nav-mobile={item.id}
                        onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                        className={`flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-full transition-colors duration-150 min-w-[52px] ${
                            i === 0 ? ACTIVE_MOBILE : INACTIVE_MOBILE
                        }`}
                    >
                        <div data-nav-icon className={`transition-transform duration-150 ${i === 0 ? 'scale-110' : ''}`}>
                            {NAV_ICONS[item.name]}
                        </div>
                        <span data-nav-label className={`text-[8px] font-black uppercase tracking-wider transition-colors duration-150 ${i === 0 ? 'text-black dark:text-white' : ''}`}>
                            {item.name === 'Projects' ? 'Work' : item.name}
                        </span>
                    </a>
                ))}
                <div className="w-px h-8 bg-gray-200 dark:bg-slate-700 mx-0.5" />
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
