import React from 'react';
import Hero from '../components/Hero';
import useScrollReveal from '../hooks/useScrollReveal';

const HomePage = () => {
    useScrollReveal();
    return (
        <main>
            <Hero />
        </main>
    );
};

export default HomePage;
