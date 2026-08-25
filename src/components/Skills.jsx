import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getSkills } from '../utils/dataManager';

// ─── Skill Icon Renderer ─────────────────────────────────────────
const SkillIcon = ({ icon, name }) => {
    // If an SVG path is provided, determine appropriate viewBox based on coordinate scale
    if (icon) {
        let viewBox = "0 0 24 24";
        if (icon.includes('395') || icon.includes('480') || icon.includes('384')) {
            viewBox = "0 0 384 512";
        } else if (icon.includes('304') || icon.includes('452') || icon.includes('468')) {
            viewBox = "0 0 512 512";
        } else if (icon.includes('22.19') || icon.includes('16.405')) {
            viewBox = "0 0 24 24";
        } else if (icon.includes('11.998') || icon.includes('16.832')) {
            viewBox = "0 0 24 24";
        } else if (icon.includes('M12 6C9.33')) {
            viewBox = "0 0 24 24";
        } else if (icon.length < 100) {
            viewBox = "0 0 16 16";
        } else {
            viewBox = "0 0 512 512";
        }

        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox={viewBox}>
                <path d={icon} />
            </svg>
        );
    }

    // Default icon
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    );
};

// ─── Skeleton ────────────────────────────────────────────────────
const SkillSkeleton = () => (
    <div className="bg-surface dark:bg-dark-200 rounded-3xl p-8 border border-gray-100 dark:border-slate-700 shadow-md">
        <div className="flex items-center mb-6">
            <Skeleton circle width={44} height={44} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" className="mr-4" />
            <Skeleton width={100} height={24} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" />
        </div>
        <Skeleton width={150} height={12} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" className="mb-4" />
        <Skeleton width={80} height={28} borderRadius={20} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" />
    </div>
);

// ─── Education data ──────────────────────────────────────────────
const education = [
    { type: 'MCA', detail: 'Master of Computer Applications', school: 'Veer Bahadur Singh Purvanchal University, Jaunpur', result: 'CGPA: 8.0', color: 'blue' },
    { type: 'BSc', detail: 'Bachelor of Science', school: 'Veer Bahadur Singh Purvanchal University, Jaunpur', result: '63.0%', color: 'green' },
    { type: 'Intermediate', detail: 'Higher Secondary Education', school: 'Parvati Public School, Jaunpur', result: '62%', color: 'purple' },
];

// ─── Main Skills Component ───────────────────────────────────────
import ScrollReveal from './ScrollReveal';

const Skills = () => {
    const [technicalSkills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSkills().then(data => {
            setSkills(data);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <section id="skills" aria-labelledby="skills-heading" className="py-20">
                <div className="container mx-auto max-w-6xl px-8">
                    <ScrollReveal direction="up">
                        <div className="mb-16">
                            <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                                Explore My
                            </p>
                            <h2 id="skills-heading" className="text-5xl lg:text-7xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
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
                                <SkillSkeleton />
                                <SkillSkeleton />
                                <SkillSkeleton />
                            </>
                        ) : (
                            technicalSkills.map((skill, i) => (
                                <ScrollReveal
                                    key={skill.id || skill.name}
                                    direction={i % 3 === 0 ? 'left' : i % 3 === 1 ? 'up' : 'right'}
                                    delay={Math.min((i % 3) * 150, 400)}
                                >
                                    <div className="bg-surface dark:bg-dark-200 rounded-3xl p-8 border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-500 group cursor-pointer" role="listitem">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="bg-black rounded-full p-3 group-hover:scale-110 transition-transform flex-shrink-0">
                                                <SkillIcon icon={skill.icon} name={skill.name} />
                                            </div>
                                            <h4 className="font-black text-xl text-black dark:text-white uppercase tracking-tighter">
                                                {skill.name}
                                            </h4>
                                        </div>
                                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{skill.category}</p>
                                    </div>
                                </ScrollReveal>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <section id="education" aria-labelledby="education-heading" className="py-20">
                <div className="container mx-auto max-w-6xl px-8">
                    <ScrollReveal direction="up">
                        <div className="mb-16">
                            <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                                My Academic
                            </p>
                            <h2 id="education-heading" className="text-5xl lg:text-7xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
                                Education
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {education.map((edu, i) => (
                            <ScrollReveal key={edu.type} direction="up" delay={i * 150}>
                                <div className="h-full bg-surface dark:bg-dark-200 rounded-3xl p-8 border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-500 group">
                                    <div className="flex items-center mb-6">
                                        <div className="bg-gray-100 dark:bg-dark-300 rounded-full p-3 mr-4 group-hover:scale-110 transition-transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-black dark:text-white" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-black text-xl text-black dark:text-white uppercase tracking-tighter">
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
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Skills;
