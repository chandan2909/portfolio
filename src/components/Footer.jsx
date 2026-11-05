import React from 'react';

const Footer = () => {
    const navLinks = [
        { label: 'About', id: 'about' },
        { label: 'Skills', id: 'skills' },
        { label: 'Education', id: 'education' },
        { label: 'Projects', id: 'projects' },
        { label: 'Contact', id: 'contact' },
    ];

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView();
    };

    return (
        // Extra bottom padding below lg keeps the last links clear of the fixed mobile nav and back-to-top button
        <footer className="pt-12 pb-40 lg:pb-8 border-t border-gray-100 dark:border-slate-700">
            <div className="container mx-auto max-w-6xl px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} className="inline-flex items-center min-h-[44px] font-display text-3xl font-black text-black dark:text-white uppercase tracking-tight">
                        CHANDAN PATHAK
                    </a>
                    <div className="flex flex-wrap justify-center gap-x-8">
                        {navLinks.map(({ label, id }) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                                className="inline-flex items-center min-h-[44px] text-[13px] font-semibold tracking-wider text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6 text-[13px] font-medium tracking-wide text-gray-700 dark:text-gray-300">
                    <p className="normal-case">&copy; {new Date().getFullYear()} Chandan Pathak. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="https://github.com/chandan2909" target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] hover:text-black dark:hover:text-white transition-colors">GITHUB</a>
                        <a href="https://linkedin.com/in/chandanpathak291" target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] hover:text-black dark:hover:text-white transition-colors">LINKEDIN</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
