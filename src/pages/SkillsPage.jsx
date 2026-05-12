import React from 'react';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import useScrollReveal from '../hooks/useScrollReveal';
import usePageMeta from '../hooks/usePageMeta';

const SkillsPage = () => {
    useScrollReveal();
    usePageMeta({
        title: 'Skills & Education — Chandan Pathak',
        description: 'Explore Chandan Pathak\'s technical skills in HTML, CSS, JavaScript, React, Java, MySQL and Tailwind CSS, plus academic education and certifications.',
    });
    return (
        <main className="pt-16">
            <Skills />
            <Certifications />
        </main>
    );
};

export default SkillsPage;
