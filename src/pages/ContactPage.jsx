import React from 'react';
import Contact from '../components/Contact';
import useScrollReveal from '../hooks/useScrollReveal';

const ContactPage = () => {
    useScrollReveal();
    return (
        <main className="pt-16">
            <Contact />
        </main>
    );
};

export default ContactPage;
