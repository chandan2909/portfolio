import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Glass, TabBar } from 'glisse';
import ThemeToggle from './ThemeToggle';
import { useDarkMode } from '../hooks/useDarkMode';

// These sections sit next to each other on the page, so they share one nav item.
const ABOUT_LINKS = [
    { name: 'About me', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Skills', id: 'skills' },
    { name: 'Education', id: 'education' },
];

const NAV_ITEMS = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about', links: ABOUT_LINKS },
    { name: 'Projects', id: 'projects', mobileName: 'Work' },
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

// Darker greys than the rest of the page: the bar floats over everything, including black panels.
const MENU_ITEM_ACTIVE = 'bg-black/10 text-black dark:bg-white/15 dark:text-white';
const MENU_ITEM_INACTIVE = 'text-gray-700 hover:bg-black/5 hover:text-black dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white';
const SOCIAL_LINK = `p-2 rounded-full transition-colors duration-150 ${MENU_ITEM_INACTIVE}`;

const TRACKED_SECTIONS = ['home', 'about', 'experience', 'skills', 'education', 'projects', 'contact'];
const DESKTOP_QUERY = '(min-width: 1024px)';
// With no scroll events for this long, a scroll started from the nav has finished.
const SCROLL_SETTLE_MS = 150;

const Chevron = ({ className }) => (
    <svg aria-hidden="true" className={`w-2.5 h-2.5 transition-transform duration-150 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const NavTabContext = createContext(null);

// Glisse draws every tab through this, which lets About be a menu button instead of a link.
// A press reaches here twice: Glisse's own click, then the browser's, which Glisse cancels.
// Skipping the cancelled one stops the menu opening and closing again on the same press.
const NavTab = ({ href, 'aria-current': current, draggable, children, ...props }) => {
    const { menuOpen, toggleMenu, goTo } = useContext(NavTabContext);
    const id = href.slice(1);

    if (NAV_ITEMS.find((item) => item.id === id)?.links) {
        return (
            <button
                {...props}
                type="button"
                aria-expanded={menuOpen}
                onClick={(e) => { if (!e.defaultPrevented) toggleMenu(); }}
            >
                {children}
            </button>
        );
    }

    return (
        <a
            {...props}
            href={href}
            draggable={draggable}
            aria-current={current ? 'true' : undefined}
            onClick={(e) => {
                if (e.defaultPrevented) return;
                e.preventDefault();
                goTo(id);
            }}
        >
            {children}
        </a>
    );
};

const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);

    useEffect(() => {
        const query = window.matchMedia(DESKTOP_QUERY);
        const handleChange = (e) => setIsDesktop(e.matches);
        query.addEventListener('change', handleChange);
        return () => query.removeEventListener('change', handleChange);
    }, []);

    return isDesktop;
};

const Navbar = () => {
    const navRef = useRef(null);
    const trackScrollRef = useRef(() => {});
    const isDark = useDarkMode();
    const isDesktop = useIsDesktop();
    const [active, setActive] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);

    const activeTab = NAV_ITEMS.find((item) => (item.links ? item.links.some((link) => link.id === active) : item.id === active))?.id ?? null;

    useEffect(() => {
        if (!menuOpen) return undefined;

        const handlePointerDown = (e) => {
            if (!navRef.current?.contains(e.target)) setMenuOpen(false);
        };
        const handleKeyDown = (e) => {
            if (e.key !== 'Escape') return;
            setMenuOpen(false);
            navRef.current?.querySelector('[aria-expanded]')?.focus();
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [menuOpen]);

    useEffect(() => {
        let settleTimer = 0;
        let scrollingToTarget = false;

        const updateActive = () => {
            const navbarHeight = 80;
            let current = 'home';

            for (const id of TRACKED_SECTIONS) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= navbarHeight + window.innerHeight / 3) {
                    current = id;
                }
            }

            setActive(current);
        };

        const waitForScrollToSettle = () => {
            clearTimeout(settleTimer);
            settleTimer = setTimeout(() => {
                scrollingToTarget = false;
                updateActive();
            }, SCROLL_SETTLE_MS);
        };

        // The page scrolls smoothly, so without this the selection would spring through every section it passes.
        const handleScroll = () => {
            if (scrollingToTarget) waitForScrollToSettle();
            else updateActive();
        };

        trackScrollRef.current = () => {
            scrollingToTarget = true;
            waitForScrollToSettle();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateActive();
        return () => {
            clearTimeout(settleTimer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const tabContext = useMemo(() => ({
        menuOpen,
        toggleMenu: () => setMenuOpen((open) => !open),
        goTo: (id) => {
            setMenuOpen(false);
            setActive(id);
            trackScrollRef.current();
            document.getElementById(id)?.scrollIntoView();
        },
    }), [menuOpen]);

    // The menu comes after the whole bar in the page, so Tab is steered to reach it straight after About.
    const handleMenuTab = (e) => {
        if (!menuOpen || e.key !== 'Tab') return;

        const trigger = navRef.current.querySelector('[aria-expanded]');
        const links = [...navRef.current.querySelectorAll('.site-nav-menu a')];
        const focused = document.activeElement;
        let next = null;

        if (e.shiftKey && focused === links[0]) next = trigger;
        else if (!e.shiftKey && focused === trigger) next = links[0];
        else if (!e.shiftKey && focused === links[links.length - 1]) next = trigger.nextElementSibling;

        if (next) {
            e.preventDefault();
            next.focus();
        }
    };

    const tabs = NAV_ITEMS.map((item) => ({
        value: item.id,
        href: `#${item.id}`,
        icon: isDesktop ? undefined : NAV_ICONS[item.name],
        label: item.links ? (
            <span className="inline-flex items-center gap-1">
                {item.name}
                {/* Points the way the menu opens: down from the top bar, up from the bottom one. */}
                <Chevron className={(isDesktop ? menuOpen : !menuOpen) ? 'rotate-180' : ''} />
            </span>
        ) : (!isDesktop && item.mobileName) || item.name,
    }));

    return (
        <nav
            ref={navRef}
            data-theme={isDark ? 'dark' : 'light'}
            className="site-nav fixed bottom-6 lg:bottom-auto lg:top-6 left-1/2 -translate-x-1/2 z-[100000] w-max flex items-stretch gap-1.5"
            aria-label="Main navigation"
            onKeyDown={handleMenuTab}
        >
            <NavTabContext.Provider value={tabContext}>
                {/* The nav already names this landmark. Each layout gets a fresh bar, so Glisse measures the right tab size. */}
                <TabBar
                    key={isDesktop ? 'desktop' : 'mobile'}
                    role="none"
                    items={tabs}
                    value={menuOpen ? 'about' : activeTab}
                    link={NavTab}
                />
            </NavTabContext.Provider>

            {/* Outside the bar: glass inside glass can't blur the page behind it. */}
            {menuOpen && (
                <div className="site-nav-menu absolute bottom-full mb-3 lg:bottom-auto lg:mb-0 lg:top-full lg:mt-3 w-44 p-1.5 flex flex-col gap-0.5 glass-menu rounded-2xl">
                    {ABOUT_LINKS.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            aria-current={link.id === active ? 'true' : undefined}
                            onClick={(e) => { e.preventDefault(); tabContext.goTo(link.id); }}
                            className={`px-4 py-2.5 rounded-xl text-[13px] font-semibold uppercase tracking-wider transition-colors duration-150 ${
                                link.id === active ? MENU_ITEM_ACTIVE : MENU_ITEM_INACTIVE
                            }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}

            <Glass className="rounded-full flex items-center gap-1 px-2">
                <ThemeToggle className={isDesktop ? '' : 'w-11 h-11 flex items-center justify-center flex-shrink-0'} />
                {isDesktop && (
                    <>
                        <a href="https://www.github.com/chandan2909/" target="_blank" rel="noopener noreferrer" className={SOCIAL_LINK} aria-label="Visit GitHub profile">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/chandanpathak291" target="_blank" rel="noopener noreferrer" className={SOCIAL_LINK} aria-label="Visit LinkedIn profile">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </>
                )}
            </Glass>
        </nav>
    );
};

export default Navbar;
