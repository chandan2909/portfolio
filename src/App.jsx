import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import CursorGlow from './components/CursorGlow';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import { getProjects, getSkills } from './utils/dataManager';

function Layout() {
    const location = useLocation();

    // Prefetch data immediately on mount so Skills & Projects sections
    // render instantly once the user scrolls to them.
    useEffect(() => {
        getProjects();
        getSkills();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <ScrollProgress />
            <CursorGlow />
            <CustomCursor />
            <Navbar />
            <div className="flex-1">
                <PageTransition key={location.pathname}>
                    <Routes location={location}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/skills" element={<SkillsPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </PageTransition>
            </div>
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
                <Route path="/*" element={<Layout />} />
            </Routes>
            <Analytics />
        </>
    );
}

export default App;
