import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Active section detection
            const sections = ['home', 'about', 'skills', 'education', 'projects', 'contact'];
            let current = 'home';
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element && window.pageYOffset >= element.offsetTop - 200) {
                    current = sectionId;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Education', href: '#education' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav
            className={`bg-white border-b border-slate-200 py-4 px-4 shadow-lg transition-all duration-300 ease-in-out fixed top-0 left-0 right-0 z-[100000] ${isScrolled ? 'nav-scrolled' : ''
                }`}
            aria-label="Main navigation"
        >
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <a
                    className="text-xl font-black flex items-center text-gray-800 transition-colors duration-300 uppercase tracking-tighter"
                    href="#home"
                    aria-label="Chandan Pathak Portfolio Home"
                >
                    Chandan Pathak
                </a>

                <button
                    className="lg:hidden bg-transparent border-0 text-gray-400 hover:text-black focus:outline-none focus:ring-1 focus:ring-black p-2 rounded-full transition-all duration-300 hover:bg-gray-100"
                    type="button"
                    onClick={toggleMobileMenu}
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle navigation menu"
                >
                    <svg
                        className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        ></path>
                    </svg>
                </button>

                <div
                    className={`w-full lg:w-auto lg:flex transition-all duration-300 ease-in-out z-40 absolute lg:relative left-0 right-0 top-full lg:top-auto overflow-hidden lg:overflow-visible ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 visible translate-y-0' : 'max-h-0 opacity-0 invisible -translate-y-4 lg:max-h-none lg:opacity-100 lg:visible lg:translate-y-0'}`}
                >
                    <div className="flex flex-col lg:flex-row lg:items-center bg-white lg:bg-transparent p-4 lg:p-0 border-b border-gray-100 lg:border-none relative z-40 w-full shadow-sm lg:shadow-none">
                        <ul className="flex flex-col lg:flex-row lg:space-x-1 w-full lg:w-auto">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        className={`block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeSection === link.href.substring(1)
                                            ? 'bg-gray-200 text-black'
                                            : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                                            }`}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center gap-3 mt-4 lg:mt-0 lg:ml-2 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-3">
                            <a
                                href="https://www.github.com/chandan2909/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white border border-gray-100 hover:bg-gray-100 rounded-full transition-all duration-300 shadow-sm group"
                                aria-label="Visit GitHub profile"
                            >
                                <svg className="w-4 h-4 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/chandanpathak291"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white border border-gray-100 hover:bg-gray-100 rounded-full transition-all duration-300 shadow-sm group"
                                aria-label="Visit LinkedIn profile"
                            >
                                <svg className="w-4 h-4 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
