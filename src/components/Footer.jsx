import React from 'react';

const Footer = () => {
    return (
        <footer className="py-20 border-t border-gray-100 mt-24">
            <div className="container mx-auto px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="text-3xl font-black text-black uppercase tracking-tighter">
                        CHANDAN PATHAK
                    </div>
                    <div className="flex flex-wrap justify-center gap-10">
                        <a href="#about" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-black transition-colors">About</a>
                        <a href="#skills" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-black transition-colors">Skills</a>
                        <a href="#projects" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-black transition-colors">Work</a>
                        <a href="#contact" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-black transition-colors">Contact</a>
                    </div>
                </div>
                <div className="mt-20 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-gray-500">
                    <p>&copy; {new Date().getFullYear()} CHANDAN PATHAK. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8">
                        <a href="https://github.com/chandan2909" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">GITHUB</a>
                        <a href="https://linkedin.com/in/chandanpathak291" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LINKEDIN</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
