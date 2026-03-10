const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const fetchProjects = async () => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
};

export const fetchSkills = async () => {
    const response = await fetch(`${API_BASE_URL}/skills`);
    if (!response.ok) throw new Error('Failed to fetch skills');
    return response.json();
};

export const submitContact = async (data) => {
    // You can replace 'YOUR_ACCESS_KEY_HERE' with your actual Web3Forms access key
    // or set VITE_WEB3FORMS_ACCESS_KEY in your .env file
    const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';

    if (WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
        console.warn('Please provide a valid Web3Forms access key in your .env file (VITE_WEB3FORMS_ACCESS_KEY) or explicitly in the code.');
    }

    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            ...data
        }),
    });

    const result = await response.json();
    if (!result.success) {
        throw new Error(result.message || 'Failed to submit contact');
    }
    return result;
};
