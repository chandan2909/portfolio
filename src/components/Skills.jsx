import React from 'react';
import { GraduationCap, School } from 'lucide-react';
import { SKILL_GROUPS } from '../data/skills';
import ScrollReveal from './ScrollReveal';

const education = [
    { type: 'MCA', detail: 'Master of Computer Applications', school: 'Veer Bahadur Singh Purvanchal University, Jaunpur', result: 'CGPA: 8.0', years: '2023 – 2025', color: 'blue', Icon: GraduationCap },
    { type: 'BSc', detail: 'Bachelor of Science', school: 'Veer Bahadur Singh Purvanchal University, Jaunpur', result: '63.0%', color: 'green', Icon: GraduationCap },
    { type: 'Intermediate', detail: 'Higher Secondary Education', school: 'Parvati Public School, Jaunpur', result: '62%', color: 'purple', Icon: School },
];

const Skills = () => {
    return (
        <>
            <section id="skills" aria-labelledby="skills-heading" className="py-10 lg:py-14">
                <div className="container mx-auto max-w-6xl px-8">
                    <ScrollReveal direction="up">
                        <div className="mb-8 lg:mb-10">
                            <p className="text-gray-700 dark:text-gray-300 font-semibold text-[13px] mb-4 tracking-[0.15em] uppercase">
                                Explore My
                            </p>
                            <h2 id="skills-heading" className="text-5xl lg:text-7xl font-black text-black dark:text-white uppercase tracking-tight leading-none">
                                Technical Skills
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SKILL_GROUPS.map(({ category, skills }, i) => (
                            <ScrollReveal key={category} direction="up" delay={(i % 3) * 150}>
                                <div className="h-full glass glass-interactive rounded-3xl p-8 transition-all duration-500">
                                    <h3 className="font-black text-xl text-black dark:text-white uppercase tracking-tight mb-5">
                                        {category}
                                    </h3>
                                    <ul aria-label={category} className="flex flex-wrap gap-x-5 gap-y-2.5">
                                        {skills.map((skill) => (
                                            <li key={skill} className="flex items-center gap-2 text-[15px] font-medium text-gray-700 dark:text-gray-300">
                                                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <section id="education" aria-labelledby="education-heading" className="py-10 lg:py-14">
                <div className="container mx-auto max-w-6xl px-8">
                    <ScrollReveal direction="up">
                        <div className="mb-8 lg:mb-10">
                            <p className="text-gray-700 dark:text-gray-300 font-semibold text-[13px] mb-4 tracking-[0.15em] uppercase">
                                My Academic
                            </p>
                            <h2 id="education-heading" className="text-5xl lg:text-7xl font-black text-black dark:text-white uppercase tracking-tight leading-none">
                                Education
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {education.map((edu, i) => (
                            <ScrollReveal key={edu.type} direction="up" delay={i * 150}>
                                <div className="h-full flex flex-col glass glass-interactive rounded-3xl p-8 transition-all duration-500 group">
                                    <div className="flex items-center mb-6">
                                        <div className="bg-gray-100 dark:bg-dark-300 rounded-full p-3 mr-4 group-hover:scale-110 transition-transform">
                                            <edu.Icon size={20} className="text-black dark:text-white" aria-hidden="true" />
                                        </div>
                                        <h3 className="font-black text-xl text-black dark:text-white uppercase tracking-tight">
                                            {edu.type}
                                        </h3>
                                    </div>
                                    <div className="space-y-2 mb-6">
                                        <p className="text-gray-600 dark:text-gray-300 font-semibold text-sm uppercase tracking-normal leading-snug">
                                            {edu.detail}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-[13px] font-medium leading-snug">
                                            {edu.school}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-auto">
                                        <span className="bg-black dark:bg-white dark:text-black text-white text-[13px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                            {edu.result}
                                        </span>
                                        {edu.years && (
                                            <span className="text-gray-600 dark:text-gray-300 text-[13px] font-medium">{edu.years}</span>
                                        )}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Skills;
