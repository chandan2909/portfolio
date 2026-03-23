import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send message.');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong. Please try again.');
        }
    };

    const socialLinks = [
        {
            name: 'LinkedIn',
            value: 'LinkedIn Profile',
            href: 'https://www.linkedin.com/in/chandanpathak291',
            icon: 'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z',
        },
        {
            name: 'GitHub',
            value: 'GitHub Profile',
            href: 'https://www.github.com/chandan2909/',
            icon: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z',
        }
    ];

    return (
        <section id="contact" aria-labelledby="contact-heading" className="py-20 animate-on-scroll">
            <div className="container mx-auto max-w-6xl px-8">
                <div className="mb-16">
                    <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                        Get in Touch
                    </p>
                    <h2 id="contact-heading" className="text-6xl lg:text-8xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
                        Let's Connect
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Email Form — takes up more space */}
                    <div className="lg:col-span-3 bg-white dark:bg-dark-200 rounded-[2rem] p-10 border border-gray-100 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-gray-100 dark:bg-dark-300 rounded-full p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="text-black dark:text-white" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-black text-xl text-black dark:text-white uppercase tracking-tighter">Send a Message</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">I'll get back to you as soon as possible</p>
                            </div>
                        </div>

                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="bg-gray-100 dark:bg-dark-300 rounded-full p-6 mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black dark:text-white" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h5 className="font-black text-2xl text-black dark:text-white uppercase tracking-tighter mb-3">Message Sent!</h5>
                                <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">Thanks for reaching out. I'll be in touch soon.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="bg-black dark:bg-white text-white dark:text-black font-black py-3 px-8 rounded-2xl transition-all duration-300 uppercase text-xs tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="contact-name" className="block text-xs font-black uppercase tracking-widest text-black dark:text-white mb-2">
                                            Name
                                        </label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your name"
                                            className="w-full bg-gray-100 dark:bg-dark-300 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium focus:outline-none focus:border-black dark:focus:border-white transition-colors duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-email" className="block text-xs font-black uppercase tracking-widest text-black dark:text-white mb-2">
                                            Email
                                        </label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="your@email.com"
                                            className="w-full bg-gray-100 dark:bg-dark-300 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium focus:outline-none focus:border-black dark:focus:border-white transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="block text-xs font-black uppercase tracking-widest text-black dark:text-white mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        placeholder="Tell me about your project or just say hi..."
                                        className="w-full bg-gray-100 dark:bg-dark-300 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium focus:outline-none focus:border-black dark:focus:border-white transition-colors duration-200 resize-none"
                                    />
                                </div>

                                {status === 'error' && (
                                    <p className="text-red-500 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
                                        ⚠ {errorMessage}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full bg-black dark:bg-white text-white dark:text-black font-black py-4 px-6 rounded-2xl transition-all duration-300 uppercase text-xs tracking-widest shadow-sm hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Social Cards */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {socialLinks.map((link) => (
                            <div key={link.name} className="bg-white dark:bg-dark-200 rounded-[2rem] p-10 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-700 group flex flex-col items-center text-center flex-1">
                                <div className="bg-gray-100 dark:bg-dark-300 rounded-full p-6 mb-8 group-hover:bg-black transition-all duration-500 group-hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="text-black dark:text-white group-hover:text-white transition-colors duration-500" viewBox="0 0 16 16">
                                        <path d={link.icon} />
                                    </svg>
                                </div>
                                <h4 className="font-black text-2xl text-black dark:text-white mb-4 uppercase tracking-tighter transition-colors duration-300">
                                    {link.name}
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                                    {link.name === 'LinkedIn' ? 'Connect professionally' : 'Explore my code repositories'}
                                </p>
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:bg-gray-800 text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 uppercase text-xs tracking-widest shadow-sm text-center"
                                >
                                    View Profile
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 bg-white dark:bg-dark-200 rounded-[2rem] p-12 border border-gray-100 dark:border-slate-700 text-center shadow-sm">
                    <h4 className="text-3xl font-black text-black dark:text-white mb-4 uppercase tracking-tighter">Ready to collaborate?</h4>
                    <p className="text-gray-500 dark:text-gray-400 mb-10 font-medium text-lg max-w-2xl mx-auto">I'm always open to discussing new opportunities and exciting projects that push the boundaries of web development.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['Web Development', 'Frontend', 'JavaScript', 'Freelance'].map((tag) => (
                            <span key={tag} className="bg-gray-100 dark:bg-dark-300 text-black dark:text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
