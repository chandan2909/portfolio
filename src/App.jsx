import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import useScrollReveal from './hooks/useScrollReveal';

function Portfolio() {
    useScrollReveal();

    return (
        <div className="min-h-screen">
            <div>
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

function App() {
    return (
        <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/admin" element={<AdminPanel />} />
        </Routes>
    );
}

export default App;
