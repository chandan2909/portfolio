import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getProjects } from '../utils/dataManager';

const ProjectSkeleton = () => (
    <article className="bg-white dark:bg-dark-200 rounded-[2rem] border border-gray-200 dark:border-slate-700 shadow-md overflow-hidden flex flex-col">
        <div className="aspect-video bg-gray-50 dark:bg-dark-300">
            <Skeleton height="100%" containerClassName="block h-full" baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" />
        </div>
        <div className="p-10 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <Skeleton width={200} height={28} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" />
                <div className="flex gap-2">
                    <Skeleton width={40} height={14} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" />
                    <Skeleton width={40} height={14} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" />
                </div>
            </div>
            <Skeleton count={3} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" className="mb-1" />
            <div className="flex gap-4 pt-6 mt-auto">
                <Skeleton width="100%" height={48} borderRadius={16} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" containerClassName="flex-1" />
                <Skeleton width="100%" height={48} borderRadius={16} baseColor="var(--sk-base)" highlightColor="var(--sk-highlight)" containerClassName="flex-1" />
            </div>
        </div>
    </article>
);

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProjects().then(data => {
            setProjects(data);
            setLoading(false);
        });
    }, []);

    return (
        <section id="projects" aria-labelledby="projects-heading" className="py-20 animate-on-scroll">
            <div className="container mx-auto max-w-6xl px-8">
                <div className="mb-16">
                    <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                        Explore My
                    </p>
                    <h2 id="projects-heading" className="text-5xl lg:text-7xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
                        Latest Work
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {loading ? (
                        <>
                            <ProjectSkeleton />
                            <ProjectSkeleton />
                        </>
                    ) : (
                        projects.map((project, index) => (
                            <article key={project.id || index} className="bg-white dark:bg-dark-200 rounded-[2rem] border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-700 group overflow-hidden flex flex-col">
                                {/* Image with hover overlay */}
                                <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-dark-300 relative p-2">
                                    <img
                                        src={project.image}
                                        alt={`${project.title} Screenshot`}
                                        loading="lazy"
                                        className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105"
                                    />
                                    {/* Hover overlay with quick actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 rounded-xl">
                                        {project.live && (
                                            <button
                                                onClick={() => window.open(project.live, '_blank')}
                                                className="flex items-center gap-2 bg-white text-black font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-gray-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                </svg>
                                                Live
                                            </button>
                                        )}
                                        <button
                                            onClick={() => window.open(project.github, '_blank')}
                                            className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-white/20 transition-all translate-y-2 group-hover:translate-y-0 duration-300 delay-75"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            Code
                                        </button>
                                    </div>

                                    {/* Featured badge */}
                                    {project.featured && (
                                        <div className="absolute top-4 left-4 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            Featured
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 md:p-10 flex-1 flex flex-col">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                                        <h3 className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{tag}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8 leading-relaxed font-medium text-base md:text-lg flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                                        {project.live && (
                                            <button
                                                onClick={() => window.open(project.live, '_blank')}
                                                className="flex-1 bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:bg-gray-800 text-white font-black py-3.5 md:py-4 px-6 rounded-2xl transition-all duration-300 uppercase text-xs tracking-widest shadow-sm"
                                            >
                                                Live Experience
                                            </button>
                                        )}
                                        <button
                                            onClick={() => window.open(project.github, '_blank')}
                                            className="flex-1 bg-white dark:bg-dark-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-dark-200 text-black dark:text-white font-black py-3.5 md:py-4 px-6 rounded-2xl transition-all duration-300 uppercase text-xs tracking-widest shadow-sm"
                                        >
                                            Source Code
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
