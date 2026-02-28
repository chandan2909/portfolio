import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-20 animate-on-scroll">
            <div className="container mx-auto max-w-6xl px-8">
                <div className="mb-16">
                    <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                        Explore My
                    </p>
                    <h2 className="text-6xl lg:text-8xl font-black text-black uppercase tracking-tighter leading-none">
                        About Me
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 group">
                        <div className="flex items-center mb-8">
                            <div className="bg-black rounded-full p-4 mr-5 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                                    <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3z" />
                                    <path d="M2 6h12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm11 3.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1zm-3 0a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1zm-5 3a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1zm3 0a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1z" />
                                </svg>
                            </div>
                            <h3 className="text-black font-black text-3xl uppercase tracking-tighter">My Journey</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg font-medium">
                            I am a dedicated MCA student with a strong foundation in
                            computer science fundamentals. My expertise spans across
                            <span className="text-black font-bold"> HTML, CSS, JavaScript, and Java</span>, allowing me
                            to create dynamic and responsive web applications.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 group">
                        <div className="flex items-center mb-8">
                            <div className="bg-gray-100 rounded-full p-4 mr-5 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                            </div>
                            <h3 className="text-black font-black text-3xl uppercase tracking-tighter">My Drive</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg font-medium">
                            I am highly motivated and results-oriented with a genuine
                            passion for learning new technologies. I thrive on challenges
                            and continuously seek opportunities to expand my knowledge in
                            the ever-evolving tech landscape.
                        </p>
                    </div>

                    <div className="lg:col-span-2 bg-black rounded-3xl p-12 border border-black shadow-xl group overflow-hidden relative">
                        <div className="relative z-10">
                            <div className="flex items-center mb-8">
                                <div className="bg-white rounded-full p-4 mr-6 group-hover:rotate-12 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 16 16">
                                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-black text-4xl uppercase tracking-tighter">Career Goals</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-xl font-medium max-w-3xl">
                                I look forward to applying my skills and knowledge to a
                                challenging and rewarding career in the tech industry. I
                                believe I have the dedication and expertise to be a
                                valuable asset to any development team.
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 p-12 opacity-10 font-black text-9xl uppercase tracking-tighter select-none pointer-events-none">
                            Future
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
