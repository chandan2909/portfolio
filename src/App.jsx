import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TurnstileGate from './components/TurnstileGate';
import useScrollReveal from './hooks/useScrollReveal';

function App() {
    const [isVerified, setIsVerified] = useState(false);
    useScrollReveal();

    useEffect(() => {
        // Check if already verified in this session
        const verified = sessionStorage.getItem('turnstile_ok') === '1';
        if (verified) {
            setIsVerified(true);
        }
    }, []);

    const handleVerificationSuccess = () => {
        setIsVerified(true);
        sessionStorage.setItem('turnstile_ok', '1');
    };

    return (
        <div className="min-h-screen">
            {!isVerified && <TurnstileGate onVerify={handleVerificationSuccess} />}

            <div className={!isVerified ? 'blur-sm pointer-events-none' : ''}>
                <Navbar />
                <main>
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Contact />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
