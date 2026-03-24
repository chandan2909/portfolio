import React from 'react';
import About from '../components/About';
import useScrollReveal from '../hooks/useScrollReveal';

const AboutPage = () => {
    useScrollReveal();
    return (
        <main className="pt-16">
            <About />
        </main>
    );
};

export default AboutPage;
