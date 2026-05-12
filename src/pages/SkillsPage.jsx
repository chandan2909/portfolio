import React from 'react';
import Skills from '../components/Skills';
import useScrollReveal from '../hooks/useScrollReveal';
import usePageMeta from '../hooks/usePageMeta';

const SkillsPage = () => {
    useScrollReveal();
    usePageMeta({
        title: 'Skills & Education — Chandan Pathak',
        description: 'Explore Chandan Pathak\'s technical skills in HTML, CSS, JavaScript, React, Java, MySQL and Tailwind CSS, plus academic education.',
    });
    return (
        <main className="pt-16">
            <Skills />
        </main>
    );
};

export default SkillsPage;
