import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const navLinks = [
        { label: 'About', to: '/about' },
        { label: 'Skills', to: '/skills' },
        { label: 'Work', to: '/projects' },
        { label: 'Contact', to: '/contact' },
    ];

    return (
        <footer className="py-20 border-t border-gray-100 dark:border-slate-700 mt-24">
            <div className="container mx-auto px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <Link to="/" className="text-3xl font-black text-black dark:text-white uppercase tracking-tighter">
                        CHANDAN PATHAK
                    </Link>
                    <div className="flex flex-wrap justify-center gap-10">
                        {navLinks.map(({ label, to }) => (
                            <Link
                                key={to}
                                to={to}
                                className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mt-20 pt-10 border-t border-gray-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-gray-500">
                    <p>&copy; {new Date().getFullYear()} CHANDAN PATHAK. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8">
                        <a href="https://github.com/chandan2909" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">GITHUB</a>
                        <a href="https://linkedin.com/in/chandanpathak291" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">LINKEDIN</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
