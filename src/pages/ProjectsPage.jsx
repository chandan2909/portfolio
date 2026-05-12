import React from 'react';
import Projects from '../components/Projects';
import useScrollReveal from '../hooks/useScrollReveal';
import usePageMeta from '../hooks/usePageMeta';

const ProjectsPage = () => {
    useScrollReveal();
    usePageMeta({
        title: 'Projects — Chandan Pathak | Portfolio Work',
        description: 'Explore projects by Chandan Pathak — full-stack web applications built with React, Node.js, MySQL, and modern web technologies.',
    });
    return (
        <main className="pt-16">
            <Projects />
        </main>
    );
};

export default ProjectsPage;
