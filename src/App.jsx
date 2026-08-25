import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import BackToTop from './components/BackToTop';
import CursorGlow from './components/CursorGlow';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { getProjects, getSkills } from './utils/dataManager';

function Portfolio() {
    useEffect(() => {
        getProjects();
        getSkills();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <CursorGlow />
            <CustomCursor />
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
        <>
            <Routes>
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="*" element={<Portfolio />} />
            </Routes>
            <Analytics />
        </>
    );
}

export default App;
