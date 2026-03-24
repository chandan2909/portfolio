import React, { useState } from 'react';

/* ─── Floating Label Input ─────────────────────────────── */
const FloatingInput = ({ id, name, type = 'text', label, value, onChange, required, autoComplete }) => {
    const [focused, setFocused] = useState(false);
    const lifted = focused || value.length > 0;

    return (
        <div className="relative">
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required={required}
                autoComplete={autoComplete}
                placeholder=" "
                className={`peer w-full bg-gray-50 dark:bg-dark-300 border-2 rounded-2xl px-5 pt-6 pb-2.5 text-black dark:text-white text-sm font-medium outline-none transition-all duration-200 placeholder-transparent
                    ${focused
                        ? 'border-black dark:border-white shadow-[0_0_0_3px_rgba(0,0,0,0.06)] dark:shadow-[0_0_0_3px_rgba(255,255,255,0.06)]'
                        : 'border-gray-200 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-500'
                    }`}
            />
            <label
                htmlFor={id}
                className={`absolute left-5 font-bold uppercase tracking-widest pointer-events-none transition-all duration-200 
                    ${lifted
                        ? 'top-2 text-[9px] text-black dark:text-white opacity-60'
                        : 'top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500'
                    }`}
            >
                {label}
            </label>
        </div>
    );
};

/* ─── Floating Label Textarea ──────────────────────────── */
const FloatingTextarea = ({ id, name, label, value, onChange, required, rows = 5 }) => {
    const [focused, setFocused] = useState(false);
    const lifted = focused || value.length > 0;

    return (
        <div className="relative">
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required={required}
                rows={rows}
                placeholder=" "
                className={`peer w-full bg-gray-50 dark:bg-dark-300 border-2 rounded-2xl px-5 pt-7 pb-3 text-black dark:text-white text-sm font-medium outline-none transition-all duration-200 placeholder-transparent resize-none
                    ${focused
                        ? 'border-black dark:border-white shadow-[0_0_0_3px_rgba(0,0,0,0.06)] dark:shadow-[0_0_0_3px_rgba(255,255,255,0.06)]'
                        : 'border-gray-200 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-500'
                    }`}
            />
            <label
                htmlFor={id}
                className={`absolute left-5 font-bold uppercase tracking-widest pointer-events-none transition-all duration-200 
                    ${lifted
                        ? 'top-2.5 text-[9px] text-black dark:text-white opacity-60'
                        : 'top-5 text-xs text-gray-400 dark:text-gray-500'
                    }`}
            >
                {label}
            </label>
        </div>
    );
};

/* ─── Social Card ──────────────────────────────────────── */
const SocialCard = ({ name, description, href, accentFrom, accentTo, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-5 bg-white dark:bg-dark-200 border border-gray-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
    >
        {/* gradient blob on hover */}
        <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${accentFrom} ${accentTo}`}
        />
        {/* Icon circle */}
        <div
            className={`relative flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${accentFrom} ${accentTo} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
        >
            {icon}
        </div>
        {/* Text */}
        <div className="relative flex-1 min-w-0">
            <p className="font-black text-lg text-black dark:text-white uppercase tracking-tighter leading-tight">
                {name}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-0.5 leading-snug">
                {description}
            </p>
        </div>
        {/* Arrow */}
        <div className="relative flex-shrink-0 w-9 h-9 rounded-full bg-gray-100 dark:bg-dark-300 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white transition-colors duration-300">
            <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-white dark:group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>
        </div>
    </a>
);

/* ─── Main Component ───────────────────────────────────── */
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
            if (!response.ok) throw new Error(result.error || 'Failed to send message.');
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <section id="contact" aria-labelledby="contact-heading" className="py-20 animate-on-scroll">
            <div className="container mx-auto max-w-6xl px-8">

                {/* ── Heading ── */}
                <div className="mb-16">
                    <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                        Get in Touch
                    </p>
                    <h2 id="contact-heading" className="text-6xl lg:text-8xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
                        Let's Connect
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* ── Email Form ── */}
                    <div className="lg:col-span-3 bg-white dark:bg-dark-200 rounded-[2rem] p-8 lg:p-10 border border-gray-100 dark:border-slate-700 shadow-sm">

                        {/* Form header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-black dark:bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" className="dark:stroke-black" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-black text-xl text-black dark:text-white uppercase tracking-tighter">
                                    Send a Message
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                    I'll get back to you as soon as possible
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-100 dark:bg-slate-700 mb-8" />

                        {status === 'success' ? (
                            /* Success state */
                            <div className="flex flex-col items-center justify-center py-14 text-center">
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" className="dark:stroke-black" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </div>
                                    {/* Pulse ring */}
                                    <div className="absolute inset-0 rounded-full bg-black dark:bg-white opacity-10 animate-ping" />
                                </div>
                                <h4 className="font-black text-2xl text-black dark:text-white uppercase tracking-tighter mb-2">
                                    Message Sent!
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400 font-medium mb-8 max-w-xs">
                                    Thanks for reaching out. I'll be in touch soon.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="bg-black dark:bg-white text-white dark:text-black font-black py-3 px-8 rounded-2xl transition-all duration-300 uppercase text-xs tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FloatingInput
                                        id="contact-name"
                                        name="name"
                                        label="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        autoComplete="name"
                                    />
                                    <FloatingInput
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        label="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                <FloatingTextarea
                                    id="contact-message"
                                    name="message"
                                    label="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                />

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                                        <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                                        </svg>
                                        <p className="text-red-600 dark:text-red-400 text-xs font-bold">
                                            {errorMessage}
                                        </p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="group w-full bg-black dark:bg-white text-white dark:text-black font-black py-4 px-6 rounded-2xl transition-all duration-300 uppercase text-xs tracking-widest shadow-sm hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.769 59.769 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* ── Right column ── */}
                    <div className="lg:col-span-2 flex flex-col gap-5">

                        {/* Info blurb */}
                        <div className="bg-black dark:bg-white rounded-3xl p-8 text-white dark:text-black">
                            <p className="text-xs font-black uppercase tracking-[0.2em] opacity-50 mb-3">Open to</p>
                            <h3 className="font-black text-3xl uppercase tracking-tighter leading-tight mb-4">
                                New Opportunities
                            </h3>
                            <p className="text-sm font-medium opacity-70 leading-relaxed">
                                I'm actively looking for freelance work and full-time roles in web development. Let's build something great together.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-6">
                                {['Web Dev', 'Frontend', 'Freelance'].map(tag => (
                                    <span key={tag} className="bg-white/10 dark:bg-black/10 text-white dark:text-black text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* LinkedIn */}
                        <SocialCard
                            name="LinkedIn"
                            description="Let's connect professionally"
                            href="https://www.linkedin.com/in/chandanpathak291"
                            accentFrom="from-[#0077B5]"
                            accentTo="to-[#00A0DC]"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                </svg>
                            }
                        />

                        {/* GitHub */}
                        <SocialCard
                            name="GitHub"
                            description="Explore my open source work"
                            href="https://www.github.com/chandan2909/"
                            accentFrom="from-[#24292e]"
                            accentTo="to-[#586069]"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
