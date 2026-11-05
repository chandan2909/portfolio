import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { GraduationCap, School } from 'lucide-react';
import { getSkills, getSkillStyle } from '../utils/dataManager';
import ScrollReveal from './ScrollReveal';
import { readableTextColor } from '../utils/color';

const CATEGORY_META = {
    'Languages': { icon: '⚡' },
    'Frameworks & Libraries': { icon: '⚛' },
    'Databases': { icon: '🗄' },
    'Databases & Cloud': { icon: '🗄' },
    'Cloud & Deployment': { icon: '☁' },
    'Tools': { icon: '🛠' },
    'Concepts': { icon: '💡' },
};

const SkillIcon = ({ icon, viewBox = '0 0 24 24', size = 14 }) => {
    if (!icon) return null;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox={viewBox}>
            <path d={icon} />
        </svg>
    );
};

const SkillSkeleton = () => (
    <div className="glass rounded-3xl p-8">
        <div className="flex items-center mb-6">
            <Skeleton circle width={44} height={44} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" className="mr-4" />
            <Skeleton width={100} height={24} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" />
        </div>
        <Skeleton width={150} height={12} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" className="mb-4" />
        <Skeleton width={80} height={28} borderRadius={20} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" />
    </div>
);

const education = [
    { type: 'MCA', detail: 'Master of Computer Applications', school: 'Veer Bahadur Singh Purvanchal University, Jaunpur', result: 'CGPA: 8.0', years: '2023 – 2025', color: 'blue', Icon: GraduationCap },
    { type: 'BSc', detail: 'Bachelor of Science', school: 'Veer Bahadur Singh Purvanchal University, Jaunpur', result: '63.0%', color: 'green', Icon: GraduationCap },
    { type: 'Intermediate', detail: 'Higher Secondary Education', school: 'Parvati Public School, Jaunpur', result: '62%', color: 'purple', Icon: School },
];

const Skills = () => {
    const [technicalSkills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSkills().then(data => {
            setSkills(data);
            setLoading(false);
        });
    }, []);

    const grouped = technicalSkills.reduce((acc, skill) => {
        const cat = skill.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                        {loading ? (
                            <>
                                <SkillSkeleton />
                                <SkillSkeleton />
                                <SkillSkeleton />
                            </>
                        ) : (
                            Object.entries(grouped).map(([category, skills], catIdx) => {
                                const meta = CATEGORY_META[category] || { icon: '🔧' };
                                return (
                                    <ScrollReveal key={category} direction={catIdx % 3 === 0 ? 'left' : catIdx % 3 === 1 ? 'up' : 'right'} delay={Math.min((catIdx % 3) * 150, 400)}>
                                        <div className="glass glass-interactive rounded-3xl p-8 transition-all duration-500 h-full" role="listitem">
                                            <h3 className="text-lg font-bold text-black dark:text-white mb-5 flex items-center gap-2">
                                                <span aria-hidden="true">{meta.icon}</span> {category}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.map((skill) => {
                                                    const style = getSkillStyle(skill);
                                                    return (
                                                        <div
                                                            key={skill.id || skill.name}
                                                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-semibold ring-1 ring-black/5 dark:ring-white/20"
                                                            style={{ backgroundColor: style.color, color: readableTextColor(style.color) }}
                                                        >
                                                            <SkillIcon icon={style.icon} viewBox={style.viewBox} />
                                                            <span className="uppercase tracking-wide">{skill.name}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                );
                            })
                        )}
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
