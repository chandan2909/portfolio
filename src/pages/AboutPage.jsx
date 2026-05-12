import React from 'react';
import About from '../components/About';
import useScrollReveal from '../hooks/useScrollReveal';
import usePageMeta from '../hooks/usePageMeta';

const AboutPage = () => {
    useScrollReveal();
    usePageMeta({
        title: 'About — Chandan Pathak | MCA Graduate & Web Developer',
        description: 'Learn about Chandan Pathak — an MCA graduate with expertise in HTML, CSS, JavaScript, React, and Java, passionate about crafting clean web experiences.',
    });
    return (
        <main className="pt-16">
            <About />
        </main>
    );
};

export default AboutPage;
