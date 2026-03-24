import React from 'react';
import Projects from '../components/Projects';
import useScrollReveal from '../hooks/useScrollReveal';

const ProjectsPage = () => {
    useScrollReveal();
    return (
        <main className="pt-16">
            <Projects />
        </main>
    );
};

export default ProjectsPage;
