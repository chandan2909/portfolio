import React from 'react';

const Projects = () => {
    const projects = [
        {
            title: 'Portfolio Website',
            description: 'Personal portfolio showcasing modern web development skills using HTML, CSS, JavaScript, and responsive design principles.',
            image: './assets/portfolio-screenshot.png',
            github: 'https://github.com/chandan2909/portfolio',
            live: 'https://chandanpathak.dev',
            tags: ['HTML', 'CSS', 'JavaScript'],
        },
        {
            title: 'ATM Interface',
            description: 'Interactive ATM management system built with modern programming concepts, featuring secure transactions and intuitive user interface design.',
            image: './assets/project-three.gif',
            github: 'https://github.com/chandan2909/Atm-manage',
            tags: ['Java', 'OOP'],
            desktopApp: true
        }
    ];

    return (
        <section id="projects" aria-labelledby="projects-heading" className="py-20 animate-on-scroll">
            <div className="container mx-auto max-w-6xl px-8">
                <div className="mb-16">
                    <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                        Explore My
                    </p>
                    <h2 id="projects-heading" className="text-6xl lg:text-8xl font-black text-black uppercase tracking-tighter leading-none">
                        Latest Work
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((project, index) => (
                        <article key={index} className="bg-white rounded-[2rem] border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-700 group overflow-hidden flex flex-col">
                            <div className="aspect-video overflow-hidden bg-gray-50 relative">
                                <img
                                    src={project.image}
                                    alt={`${project.title} Screenshot`}
                                    loading="lazy"
                                    className={`w-full h-full transition-all duration-700 group-hover:scale-105 group-hover:brightness-95 ${index === 0 ? 'object-contain' : 'object-cover'}`}
                                />
                                
                            </div>

                            <div className="p-10 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-3xl font-black text-black uppercase tracking-tighter group-hover:text-gray-700 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-500 mb-8 leading-relaxed font-medium text-lg flex-1">
                                    {project.description}
                                </p>

                                <div className="flex gap-4 pt-4">
                                    {project.live && (
                                        <button
                                            onClick={() => window.open(project.live, '_blank')}
                                            className="flex-1 bg-black hover:bg-gray-800 text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 uppercase text-xs tracking-widest shadow-sm"
                                        >
                                            Live Experience
                                        </button>
                                    )}
                                    <button
                                        onClick={() => window.open(project.github, '_blank')}
                                        className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-black font-black py-4 px-6 rounded-2xl transition-all duration-300 uppercase text-xs tracking-widest shadow-sm"
                                    >
                                        Source Code
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
