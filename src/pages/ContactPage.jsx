import React from 'react';
import Contact from '../components/Contact';
import useScrollReveal from '../hooks/useScrollReveal';
import usePageMeta from '../hooks/usePageMeta';

const ContactPage = () => {
    useScrollReveal();
    usePageMeta({
        title: 'Contact — Chandan Pathak | Get In Touch',
        description: 'Get in touch with Chandan Pathak for freelance web development opportunities, collaborations, or just to say hello.',
    });
    return (
        <main className="pt-16">
            <Contact />
        </main>
    );
};

export default ContactPage;
