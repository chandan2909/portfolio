import React from 'react';
import Hero from '../components/Hero';
import useScrollReveal from '../hooks/useScrollReveal';
import usePageMeta from '../hooks/usePageMeta';

const HomePage = () => {
    useScrollReveal();
    usePageMeta({
        title: 'Chandan Pathak — Web Developer Portfolio',
        description: 'Chandan Pathak is a passionate web developer and MCA graduate crafting modern, responsive web experiences with clean code and creative solutions.',
    });
    return (
        <main>
            <Hero />
        </main>
    );
};

export default HomePage;
