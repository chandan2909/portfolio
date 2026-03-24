import React from 'react';
import Skills from '../components/Skills';
import useScrollReveal from '../hooks/useScrollReveal';

const SkillsPage = () => {
    useScrollReveal();
    return (
        <main className="pt-16">
            <Skills />
        </main>
    );
};

export default SkillsPage;
