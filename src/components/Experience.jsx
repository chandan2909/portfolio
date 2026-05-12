import React from 'react';

const experiences = [
    {
        role: 'Web Developer Intern',
        company: 'LysisFlow Technologies',
        duration: 'Jan 2024 – Present',
        type: 'Internship',
        description: 'Building and maintaining client websites using React, Node.js, and MySQL. Delivering responsive, accessible, and performant web solutions.',
        tech: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
        current: true,
    },
    {
        role: 'Freelance Web Developer',
        company: 'Self-Employed',
        duration: '2023 – Present',
        type: 'Freelance',
        description: 'Designed and delivered full-stack web applications for clients. Handled UI/UX design, development, and deployment end-to-end.',
        tech: ['HTML', 'CSS', 'JavaScript', 'React'],
        current: false,
    },
];

const TimelineDot = ({ active }) => (
    <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-4 flex-shrink-0 transition-all duration-300 ${active ? 'border-black dark:border-white bg-black dark:bg-white scale-125' : 'border-gray-300 dark:border-slate-600 bg-white dark:bg-dark-200'}`} />
        <div className="w-0.5 flex-1 bg-gray-200 dark:bg-slate-700 mt-2" />
    </div>
);

const Experience = () => {
    return (
        <section id="experience" aria-labelledby="experience-heading" className="py-20 animate-on-scroll">
            <div className="container mx-auto max-w-6xl px-8">
                <div className="mb-16">
                    <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                        My Journey
                    </p>
                    <h2 id="experience-heading" className="text-5xl lg:text-7xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
                        Experience
                    </h2>
                </div>

                <div className="relative">
                    {experiences.map((exp, i) => (
                        <div key={i} className="flex gap-6 mb-12 last:mb-0 group">
                            {/* Timeline column */}
                            <div className="flex flex-col items-center pt-1">
                                <TimelineDot active={exp.current} />
                            </div>

                            {/* Card */}
                            <div className="flex-1 bg-white dark:bg-dark-200 rounded-3xl p-8 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-500 group-hover:-translate-y-1">
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                                    <div>
                                        <h3 className="text-xl font-black text-black dark:text-white uppercase tracking-tighter">{exp.role}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 font-bold text-sm mt-1">{exp.company}</p>
                                    </div>
                                    <div className="flex flex-col sm:items-end gap-2 flex-shrink-0">
                                        <span className={`text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${exp.current ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-dark-300 text-gray-500 dark:text-gray-400'}`}>
                                            {exp.current ? '● Active' : exp.type}
                                        </span>
                                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{exp.duration}</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm font-medium mb-5">
                                    {exp.description}
                                </p>

                                {/* Tech tags */}
                                <div className="flex flex-wrap gap-2">
                                    {exp.tech.map(t => (
                                        <span key={t} className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-gray-100 dark:bg-dark-300 px-3 py-1 rounded-full">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
