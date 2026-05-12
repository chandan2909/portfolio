import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center px-8 pb-20">
            <div className="text-center max-w-lg animate-on-scroll animate-in">
                {/* Big 404 */}
                <div className="relative mb-8 select-none">
                    <p className="text-[10rem] lg:text-[14rem] font-black text-gray-100 dark:text-dark-200 leading-none tracking-tighter">
                        404
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black dark:bg-white rounded-full p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" className="dark:stroke-black" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                    Oops!
                </p>
                <h1 className="text-5xl font-black text-black dark:text-white uppercase tracking-tighter leading-none mb-6">
                    Page Not Found
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-10">
                    The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        to="/"
                        className="bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:bg-gray-800 text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-sm"
                    >
                        Back to Home
                    </Link>
                    <Link
                        to="/contact"
                        className="bg-white dark:bg-dark-200 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-dark-300 text-black dark:text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-sm"
                    >
                        Contact Me
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFoundPage;
