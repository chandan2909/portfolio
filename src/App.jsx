import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import BackToTop from './components/BackToTop';
import CursorGlow from './components/CursorGlow';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function Portfolio() {
    return (
        <div className="min-h-screen flex flex-col">
            <AnimatedBackground />
            <CursorGlow />
            <Navbar />
            <main className="flex-1">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="*" element={<Portfolio />} />
        </Routes>
    );
}

export default App;
