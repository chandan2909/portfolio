import React, { useState, useEffect } from 'react';
import { getSkills } from '../utils/dataManager';

const Skills = () => {
    const [technicalSkills, setSkills] = useState([]);

    useEffect(() => {
        getSkills().then(data => setSkills(data));
    }, []);

    const education = [
        { type: 'MCA', detail: 'Master of Computer Applications', school: 'Veer Bahadur Singh Purvanchal University, Jaunpur', result: 'CGPA: 8.0', color: 'blue' },
        { type: 'BSc', detail: 'Bachelor of Science', school: 'Veer Bahadur Singh Purvanchal University, Jaunpur', result: '63.0%', color: 'green' },
        { type: 'Intermediate', detail: 'Higher Secondary Education', school: 'Parvati Public School, Jaunpur', result: '62%', color: 'purple' },
    ];

    return (
        <>
            <section id="skills" aria-labelledby="skills-heading" className="py-20 animate-on-scroll">
                <div className="container mx-auto max-w-6xl px-8">
                    <div className="mb-16">
                        <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                            Explore My
                        </p>
                        <h2 id="skills-heading" className="text-6xl lg:text-8xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
                            Technical Skills
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                        {technicalSkills.map((skill) => (
                            <div key={skill.name} className="bg-white dark:bg-dark-200 rounded-3xl p-8 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-500 group cursor-pointer" role="listitem">
                                <div className="flex items-center mb-6">
                                    <div className="bg-black rounded-full p-3 mr-4 group-hover:scale-110 transition-transform">
                                        {skill.icon ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                                                <path d={skill.icon} />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                                            </svg>
                                        )}
                                    </div>
                                    <h4 className="font-black text-2xl text-black dark:text-white uppercase tracking-tighter">
                                        {skill.name}
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-400 mb-4 font-bold uppercase tracking-widest">{skill.category}</p>
                                <div className="flex items-center">
                                    <span className="bg-gray-100 dark:bg-dark-300 text-black dark:text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">
                                        {skill.level}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="education" aria-labelledby="education-heading" className="py-20 animate-on-scroll">
                <div className="container mx-auto max-w-6xl px-8">
                    <div className="mb-16">
                        <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                            My Academic
                        </p>
                        <h2 id="education-heading" className="text-6xl lg:text-8xl font-black text-black dark:text-white uppercase tracking-tighter leading-none text-right lg:text-left">
                            Education
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {education.map((edu) => (
                            <div key={edu.type} className="bg-white dark:bg-dark-200 rounded-3xl p-8 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-500 group">
                                <div className="flex items-center mb-6">
                                    <div className="bg-gray-100 dark:bg-dark-300 rounded-full p-3 mr-4 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-black text-2xl text-black dark:text-white uppercase tracking-tighter">
                                        {edu.type}
                                    </h4>
                                </div>
                                <div className="space-y-2 mb-6">
                                    <p className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-tight leading-tight">
                                        {edu.detail}
                                    </p>
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-tighter">
                                        {edu.school}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="bg-black dark:bg-white dark:text-black text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                                        {edu.result}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Skills;
