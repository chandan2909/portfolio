import React from 'react';

const Skills = () => {
    const technicalSkills = [
        { name: 'HTML', category: 'Markup Language', level: 'Intermediate', color: 'orange', icon: 'M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z M4.5 7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zM4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4.5 9a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z' },
        { name: 'CSS', category: 'Styling & Design', level: 'Intermediate', color: 'blue', icon: 'M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z M8.5 4a.5.5 0 0 0-1 0v3H6a.5.5 0 0 0 0 1h1.5v3a.5.5 0 0 0 1 0V8H10a.5.5 0 0 0 0-1H8.5V4z' },
        { name: 'JavaScript', category: 'Programming & Logic', level: 'Intermediate', color: 'yellow', icon: 'M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' },
        { name: 'Git/GitHub', category: 'Version Control', level: 'Basic', color: 'slate', icon: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' },
        { name: 'SQL', category: 'Database Management', level: 'Intermediate', color: 'green', icon: 'M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Z M.5 1a.5.5 0 0 0 0 1H2a.5.5 0 0 0 .485-.379l.626-2.5A.5.5 0 0 1 3.596 0H14.5a.5.5 0 0 1 .485.621l-1.5 6a.5.5 0 0 1-.485.379H6.5a.5.5 0 0 0-.485.621l.818 3.274a.5.5 0 0 0 .485.379h.5a.5.5 0 0 1 0 1h-.5a.5.5 0 0 1-.485-.379L5.416 8H2.5a.5.5 0 0 1 0-1h2.5l-.5-2H.5a.5.5 0 0 1 0-1Z' },
        { name: 'Java', category: 'Object-Oriented Programming', level: 'Intermediate', color: 'purple', icon: 'M8.5 5a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V9a.5.5 0 0 0 1 0V7.5H10a.5.5 0 0 0 0-1H8.5V5z M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z' },
    ];

    const education = [
        { type: 'MCA', detail: 'Master of Computer Applications', school: 'Veer Bahadur Singh Purvanchal University, Jaunpur', result: 'CGPA: 8.0', color: 'blue' },
        { type: 'BSc', detail: 'Bachelor of Science', school: 'Veer Bahadur Singh Purvanchal University, Jaunpur', result: '63.0%', color: 'green' },
        { type: 'Intermediate', detail: 'Higher Secondary Education', school: 'Parvati Public School, Jaunpur', result: '62%', color: 'purple' },
    ];

    return (
        <>
            <section id="skills" aria-labelledby="skills-heading" className="py-20 animate-on-scroll">
                <div className="container mx-auto max-w-6xl px-8">
                    <div className="mb-16">
                        <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                            Explore My
                        </p>
                        <h2 id="skills-heading" className="text-6xl lg:text-8xl font-black text-black uppercase tracking-tighter leading-none">
                            Technical Skills
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                        {technicalSkills.map((skill) => (
                            <div key={skill.name} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 group cursor-pointer" role="listitem">
                                <div className="flex items-center mb-6">
                                    <div className="bg-black rounded-full p-3 mr-4 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                                            <path d={skill.icon} />
                                        </svg>
                                    </div>
                                    <h4 className="font-black text-2xl text-black uppercase tracking-tighter">
                                        {skill.name}
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-400 mb-4 font-bold uppercase tracking-widest">{skill.category}</p>
                                <div className="flex items-center">
                                    <span className="bg-gray-100 text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">
                                        {skill.level}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="education" aria-labelledby="education-heading" className="py-20 animate-on-scroll">
                <div className="container mx-auto max-w-6xl px-8">
                    <div className="mb-16">
                        <p className="text-gray-400 font-bold text-xs mb-4 tracking-[0.2em] uppercase">
                            My Academic
                        </p>
                        <h2 id="education-heading" className="text-6xl lg:text-8xl font-black text-black uppercase tracking-tighter leading-none text-right lg:text-left">
                            Education
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {education.map((edu) => (
                            <div key={edu.type} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 group">
                                <div className="flex items-center mb-6">
                                    <div className="bg-gray-100 rounded-full p-3 mr-4 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-black text-2xl text-black uppercase tracking-tighter">
                                        {edu.type}
                                    </h4>
                                </div>
                                <div className="space-y-2 mb-6">
                                    <p className="text-gray-500 font-bold text-sm uppercase tracking-tight leading-tight">
                                        {edu.detail}
                                    </p>
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-tighter">
                                        {edu.school}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="bg-black text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                                        {edu.result}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Skills;
