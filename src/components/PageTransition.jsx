import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState('fadeIn');

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
            setTransitionStage('fadeOut');
        }
    }, [location, displayLocation]);

    const handleAnimationEnd = () => {
        if (transitionStage === 'fadeOut') {
            setDisplayLocation(location);
            setTransitionStage('fadeIn');
        }
    };

    return (
        <div
            className={`page-transition ${transitionStage}`}
            onAnimationEnd={handleAnimationEnd}
        >
            {children}
        </div>
    );
};

export default PageTransition;
