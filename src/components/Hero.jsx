import React from 'react';
import ScrollReveal from './ScrollReveal';

const AVATAR_URL = 'https://media1.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif';

const Hero = () => {
    const [typedText, setTypedText] = React.useState('');
    const roles = ["Passionate Web Developer", "MCA Graduate", "Creative Problem Solver"];
    const [roleIndex, setRoleIndex] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false);

    React.useEffect(() => {
        const currentRole = roles[roleIndex];
        let timer;

        if (!isDeleting && typedText === currentRole) {
            timer = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && typedText === '') {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
            const speed = isDeleting ? 50 : 100;
            timer = setTimeout(() => {
                setTypedText(isDeleting
                    ? currentRole.slice(0, typedText.length - 1)
                    : currentRole.slice(0, typedText.length + 1)
                );
            }, speed);
        }

        return () => clearTimeout(timer);
    }, [typedText, isDeleting, roleIndex]);

    return (
        <header id="home" className="pt-8 pb-8 lg:pt-36 lg:pb-12">
            <div className="container mx-auto max-w-6xl px-8">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-10">

                    {/* ── Text side ── */}
                    <div className="lg:w-1/2 text-left space-y-8">
                        <ScrollReveal direction="left">
                            <div className="space-y-3">
                                <h1 className="text-7xl lg:text-8xl font-black text-black dark:text-white leading-[0.95] tracking-tighter uppercase whitespace-pre-line">
                                    Chandan{"\n"}Pathak
                                </h1>
                                <div className="pt-4">
                                    <p className="text-xl lg:text-2xl font-bold text-black dark:text-white min-h-[1.5em] flex items-center">
                                        {typedText}
                                        <span className="animate-pulse inline-block w-0.5 h-6 bg-black dark:bg-white ml-1" />
                                    </p>
                                    <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mt-4 font-medium">
                                        MCA Graduate crafting modern, responsive web experiences with clean code and creative solutions.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={200}>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button
                                    onClick={() => window.open('https://portfoliochandan.vercel.app/resume')}
                                    className="bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:bg-gray-800 text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-sm"
                                    aria-label="Download Chandan Pathak Resume PDF"
                                >
                                    Download Resume
                                </button>
                                <a
                                    href="#contact"
                                    onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                                    className="bg-surface dark:bg-dark-200 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-dark-300 text-black dark:text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-sm"
                                    aria-label="Go to contact section"
                                >
                                    Contact Me
                                </a>
                            </div>
                        </ScrollReveal>


                    </div>

                    {/* ── Avatar side ── */}
                    <ScrollReveal direction="right" className="lg:w-1/2 flex items-center justify-center mb-12 lg:mb-0">
                        <div className="relative group">
                            {/* Glow ring */}
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 opacity-70 blur-md group-hover:opacity-90 transition-opacity duration-500 animate-spin" style={{ animationDuration: '8s' }} />
                            {/* Avatar */}
                            <img
                                src={AVATAR_URL}
                                className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full shadow-2xl object-cover border-4 border-white dark:border-dark-200 group-hover:scale-[1.02] transition-transform duration-500"
                                alt="Chandan Pathak Profile"
                                loading="eager"
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </header>
    );
};

export default Hero;
