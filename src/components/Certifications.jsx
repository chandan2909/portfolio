import React from 'react';

const certifications = [
    {
        name: 'The Complete Web Developer Bootcamp',
        issuer: 'Udemy',
        date: '2023',
        credentialUrl: '#',
        color: 'from-[#a435f0] to-[#7d2cbb]',
    },
    {
        name: 'Java Programming Masterclass',
        issuer: 'Udemy',
        date: '2023',
        credentialUrl: '#',
        color: 'from-[#f59e0b] to-[#d97706]',
    },
    {
        name: 'Responsive Web Design',
        issuer: 'freeCodeCamp',
        date: '2022',
        credentialUrl: '#',
        color: 'from-[#0a0a23] to-[#1b1b32]',
    },
    {
        name: 'JavaScript Algorithms & Data Structures',
        issuer: 'freeCodeCamp',
        date: '2022',
        credentialUrl: '#',
        color: 'from-[#0a0a23] to-[#1b1b32]',
    },
];

const CertBadge = ({ cert }) => (
    <a
        href={cert.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white dark:bg-dark-200 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 flex flex-col gap-4"
    >
        {/* Issuer badge */}
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        </div>

        <div className="flex-1">
            <h4 className="font-black text-base text-black dark:text-white uppercase tracking-tighter leading-tight mb-2">
                {cert.name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                {cert.issuer}
            </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-700">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{cert.date}</span>
            <span className="text-xs font-black text-black dark:text-white uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                Verify
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
            </span>
        </div>
    </a>
);

const Certifications = () => {
    return (
        <section id="certifications" aria-labelledby="certs-heading" className="py-20 animate-on-scroll">
            <div className="container mx-auto max-w-6xl px-8">
                <div className="mb-16">
                    <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                        My Credentials
                    </p>
                    <h2 id="certs-heading" className="text-5xl lg:text-7xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
                        Certifications
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {certifications.map((cert) => (
                        <CertBadge key={cert.name} cert={cert} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
