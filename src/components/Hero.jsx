import React from 'react';
import ScrollReveal from './ScrollReveal';

const TOKEN_STYLES = {
    annotation: 'text-amber-800 dark:text-amber-300',
    keyword: 'text-rose-800 dark:text-rose-300',
    type: 'text-sky-800 dark:text-sky-300',
    string: 'text-teal-800 dark:text-teal-300',
};

// Each line is a list of [text, token style]. No style means plain code colour.
const CODE_LINES = [
    [['@RestController', 'annotation']],
    [['public class ', 'keyword'], ['ProfileController', 'type'], [' {']],
    [],
    [['  '], ['@GetMapping', 'annotation'], ['('], ['"/profile"', 'string'], [')']],
    [['  '], ['Profile', 'type'], [' get() {']],
    [['    '], ['return new ', 'keyword'], ['Profile', 'type'], ['(']],
    [['      '], ['"Chandan Pathak"', 'string'], [',']],
    [['      '], ['"Java & Spring Boot"', 'string'], [',']],
    [['      '], ['List', 'type'], ['.of('], ['"REST"', 'string'], [', '], ['"MySQL"', 'string'], [')']],
    [['    );']],
    [['  }']],
    [['}']],
];

const CodeWindow = () => (
    <figure
        aria-label="Spring Boot controller that returns Chandan Pathak's name and tech stack"
        className="glass rounded-3xl overflow-hidden w-full max-w-[22rem] lg:max-w-[26rem] m-0"
    >
        <figcaption className="px-4 min-[360px]:px-6 py-3.5 border-b border-black/5 dark:border-white/10 font-mono text-xs lg:text-[13px] font-medium text-gray-600 dark:text-gray-300">
            ProfileController.java
        </figcaption>
        {/* Hidden from screen readers: the figure's label says what it shows, without reading out every symbol */}
        <pre
            aria-hidden="true"
            className="m-0 px-4 min-[360px]:px-6 py-5 lg:py-6 overflow-x-auto font-mono text-[11px] min-[360px]:text-xs sm:text-[13px] lg:text-[15px] leading-relaxed text-gray-800 dark:text-gray-200"
        >
            <code>
                {CODE_LINES.map((line, i) => (
                    <div key={i} className="min-h-[1.625em]">
                        {line.map(([text, style], j) => (
                            <span key={j} className={style ? TOKEN_STYLES[style] : undefined}>{text}</span>
                        ))}
                    </div>
                ))}
            </code>
        </pre>
    </figure>
);

const roles = ["Java & Spring Boot Developer", "Software Development Intern", "MCA Graduate"];

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Hero = () => {
    const [typedText, setTypedText] = React.useState(() => (prefersReducedMotion() ? roles[0] : ''));
    const [roleIndex, setRoleIndex] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false);

    React.useEffect(() => {
        if (prefersReducedMotion()) return undefined;

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
        <header id="home" className="pt-8 pb-10 lg:pt-28 lg:pb-14">
            <div className="container mx-auto max-w-6xl px-8">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">

                    {/* ── Text side ── */}
                    <div className="w-full lg:w-1/2 text-left space-y-6">
                        <ScrollReveal direction="left">
                            <div className="space-y-3">
                                <h1 className="text-[clamp(3rem,18vw,4.5rem)] lg:text-8xl font-black text-black dark:text-white leading-[0.95] tracking-tight uppercase whitespace-pre-line">
                                    Chandan{"\n"}Pathak
                                </h1>
                                <div className="pt-4">
                                    {/* Two lines tall on small screens, so the page doesn't jump as a long role wraps */}
                                    <p className="text-xl lg:text-2xl font-bold text-black dark:text-white min-h-[3em] sm:min-h-[1.5em]">
                                        {typedText}
                                        <span className="animate-pulse inline-block w-0.5 h-6 align-middle bg-black dark:bg-white ml-1" />
                                    </p>
                                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-md mt-4 font-medium">
                                        MCA graduate building secure, high-performance backends and REST APIs with Java, Spring Boot and MySQL.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={200}>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://chandanpathak.me/resume"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:bg-gray-800 text-white px-10 py-4 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-sm"
                                    aria-label="Download Chandan Pathak Resume PDF"
                                >
                                    Download Resume
                                </a>
                                <a
                                    href="#contact"
                                    onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView(); }}
                                    className="glass glass-interactive text-black dark:text-white px-10 py-4 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300"
                                    aria-label="Go to contact section"
                                >
                                    Contact Me
                                </a>
                            </div>
                        </ScrollReveal>


                    </div>

                    {/* ── Code side ── */}
                    <ScrollReveal direction="right" className="w-full lg:w-1/2 flex items-center justify-center">
                        <CodeWindow />
                    </ScrollReveal>
                </div>
            </div>
        </header>
    );
};

export default Hero;
