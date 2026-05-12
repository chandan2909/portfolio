import { useEffect } from 'react';

/**
 * Hook to set per-page document title and meta description.
 * Usage: usePageMeta({ title: 'About | Chandan Pathak', description: '...' })
 */
const usePageMeta = ({ title, description } = {}) => {
    useEffect(() => {
        const defaultTitle = 'Chandan Pathak — Web Developer Portfolio';
        const defaultDesc = 'Chandan Pathak is a passionate web developer and MCA graduate with expertise in HTML, CSS, JavaScript, React, and Java.';

        document.title = title || defaultTitle;

        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = description || defaultDesc;

        // Update OG title
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = title || defaultTitle;

        // Update OG description
        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.content = description || defaultDesc;

        return () => {
            document.title = defaultTitle;
        };
    }, [title, description]);
};

export default usePageMeta;
