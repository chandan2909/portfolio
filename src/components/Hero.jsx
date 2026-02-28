import React from 'react';

const Hero = () => {
    const [typedText, setTypedText] = React.useState('');
    const roles = ["Passionate Web Developer", "MCA Graduate", "Creative Problem Solver"];
    const [roleIndex, setRoleIndex] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false);

    React.useEffect(() => {
        const currentRole = roles[roleIndex];
        let timer;

        if (!isDeleting && typedText === currentRole) {
            // Finished typing, pause then start deleting
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, 2000);
        } else if (isDeleting && typedText === '') {
            // Finished deleting, move to next role
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
            // Typing or deleting in progress
            const typingSpeed = isDeleting ? 50 : 100;
            timer = setTimeout(() => {
                const nextText = isDeleting
                    ? currentRole.slice(0, typedText.length - 1)
                    : currentRole.slice(0, typedText.length + 1);
                setTypedText(nextText);
            }, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [typedText, isDeleting, roleIndex]);

    return (
        <header id="home" className="pt-16 pb-8 lg:pt-36 lg:pb-12 animate-on-scroll">
            <div className="container mx-auto max-w-6xl px-8">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-10">
                    <div className="lg:w-1/2 text-left space-y-8">
                        <div className="space-y-3">
                            <h1 className="text-7xl lg:text-8xl font-black text-black leading-[0.85] tracking-tighter uppercase whitespace-pre-line">
                                Chandan{"\n"}Pathak
                            </h1>
                            <div className="pt-4">
                                <p className="text-xl lg:text-2xl font-bold text-black min-h-[1.5em] flex items-center">
                                    {typedText}
                                    <span className="animate-pulse inline-block w-0.5 h-6 bg-black ml-1"></span>
                                </p>
                                <p className="text-base text-gray-500 leading-relaxed max-w-md mt-4 font-medium">
                                    MCA Graduate crafting modern, responsive web experiences with
                                    clean code and creative solutions.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={() => window.open('https://chandanpathak.dev/resume')}
                                className="bg-black hover:bg-gray-800 text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-sm"
                                aria-label="Download Chandan Pathak Resume PDF"
                            >
                                Download Resume
                            </button>
                            <a
                                href="#contact"
                                className="bg-white border border-gray-200 hover:bg-gray-50 text-black px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-sm"
                                aria-label="Go to contact section"
                            >
                                Contact Me
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <a
                                href="https://www.github.com/chandan2909/ "
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 bg-white border border-gray-100 hover:bg-gray-50 rounded-full transition-all duration-300 shadow-sm group"
                                aria-label="Visit Chandan Pathak GitHub profile"
                            >
                                <svg className="w-5 h-5 text-black group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/chandanpathak291"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 bg-white border border-gray-100 hover:bg-gray-50 rounded-full transition-all duration-300 shadow-sm group"
                                aria-label="Visit Chandan Pathak LinkedIn profile"
                            >
                                <svg className="w-5 h-5 text-black group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="lg:w-1/2 flex justify-center mb-12 lg:mb-0">
                        <div className="relative">
                            <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gray-100 absolute -top-4 -left-4 -z-10 transition-all duration-500"></div>
                            <img
                                src="https://media1.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
                                className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full shadow-lg object-cover hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-100"
                                alt="Chandan Pathak Profile Picture"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
