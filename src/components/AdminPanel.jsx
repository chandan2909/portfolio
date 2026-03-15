import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getProjects, saveProject, deleteProject,
    getSkills, saveSkill, deleteSkill,
    checkPassword, changePassword
} from '../utils/dataManager';
import { Lock, LogOut, Plus, Trash2, Edit3, Save, X, RotateCcw, FolderOpen, Wrench, KeyRound, ArrowLeft, Check, Upload, ImageIcon } from 'lucide-react';

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('projects');
    const [projects, setProjectsList] = useState([]);
    const [skills, setSkillsList] = useState([]);
    const [editingProject, setEditingProject] = useState(null);
    const [editingSkill, setEditingSkill] = useState(null);
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMsg, setPasswordMsg] = useState('');
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const loadData = async () => {
        try {
            const [p, s] = await Promise.all([getProjects(), getSkills()]);
            setProjectsList(p || []);
            setSkillsList(s || []);
        } catch (err) {
            console.error('Failed to load data:', err);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            loadData();
        }
    }, [isAuthenticated]);

    // Toast notification
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // ─── Auth ─────────────────────────────────────────────────
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const success = await checkPassword(password);
            if (success) {
                setIsAuthenticated(true);
                setError('');
            } else {
                setError('Incorrect password');
            }
        } catch (err) {
            setError('Server error — is the backend running?');
        }
        setLoading(false);
        setPassword('');
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (!currentPassword) {
            setPasswordMsg('Current password is required');
            return;
        }
        if (newPassword.length < 4) {
            setPasswordMsg('New password must be at least 4 characters');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordMsg('Passwords do not match');
            return;
        }
        setLoading(true);
        const result = await changePassword(currentPassword, newPassword);
        setLoading(false);
        if (result.success) {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setShowPasswordChange(false);
            setPasswordMsg('');
            showToast('Password changed successfully');
        } else {
            setPasswordMsg(result.message || 'Failed to change password');
        }
    };

    // ─── Project CRUD ─────────────────────────────────────────
    const emptyProject = { id: '', title: '', description: '', image: '', github: '', live: '', tags: [] };

    const handleSaveProject = async (project) => {
        setLoading(true);
        const result = await saveProject(project);
        if (result.success) {
            await loadData();
            setEditingProject(null);
            showToast(project.id ? 'Project updated' : 'Project added');
        } else {
            showToast(result.message || 'Failed to save', 'error');
        }
        setLoading(false);
    };

    const handleDeleteProject = async (id) => {
        const result = await deleteProject(id);
        if (result.success) {
            await loadData();
            showToast('Project deleted', 'info');
        }
    };

    // ─── Skill CRUD ───────────────────────────────────────────
    const emptySkill = { id: '', name: '', category: '', level: 'Basic' };

    const handleSaveSkill = async (skill) => {
        setLoading(true);
        const result = await saveSkill(skill);
        if (result.success) {
            await loadData();
            setEditingSkill(null);
            showToast(skill.id ? 'Skill updated' : 'Skill added');
        } else {
            showToast(result.message || 'Failed to save', 'error');
        }
        setLoading(false);
    };

    const handleDeleteSkill = async (id) => {
        const result = await deleteSkill(id);
        if (result.success) {
            await loadData();
            showToast('Skill deleted', 'info');
        }
    };

    // ─── Login Screen ─────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#f8f8f8] dark:bg-dark-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-dark-200 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-xl p-10">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black dark:bg-white mb-4">
                                <Lock className="w-7 h-7 text-white dark:text-black" />
                            </div>
                            <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tighter">
                                Admin Panel
                            </h1>
                            <p className="text-gray-400 text-sm font-medium mt-2">Enter your password to continue</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-slate-600 rounded-2xl text-black dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all placeholder:text-gray-400"
                                    autoFocus
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm font-bold text-center">{error}</p>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black dark:bg-white text-white dark:text-black font-black py-4 rounded-2xl uppercase text-xs tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg disabled:opacity-50"
                            >
                                {loading ? 'Verifying...' : 'Unlock Dashboard'}
                            </button>
                        </form>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full mt-4 flex items-center justify-center gap-2 text-gray-400 hover:text-black dark:hover:text-white text-sm font-bold transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Main Admin Dashboard ─────────────────────────────────
    return (
        <div className="min-h-screen bg-[#f8f8f8] dark:bg-dark-100">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-bold text-sm transition-all animate-slide-in ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
                    }`}>
                    <Check className="w-4 h-4" /> {toast.message}
                </div>
            )}

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 dark:bg-dark-100/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
                <div className="container mx-auto max-w-6xl px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter">
                            Admin Panel
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-gray-400 hover:text-black dark:hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Portfolio
                        </button>
                        <button
                            onClick={() => setShowPasswordChange(!showPasswordChange)}
                            className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-300 hover:bg-gray-200 dark:hover:bg-dark-200 transition-colors"
                            title="Change Password"
                        >
                            <KeyRound className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-300 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto max-w-6xl px-8 py-8">
                {/* Password Change Panel */}
                {showPasswordChange && (
                    <div className="mb-8 bg-white dark:bg-dark-200 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm p-8">
                        <h3 className="text-lg font-black text-black dark:text-white uppercase tracking-tighter mb-4">Change Password</h3>
                        <form onSubmit={handlePasswordChange} className="flex flex-col sm:flex-row gap-4 flex-wrap">
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Current password"
                                className="flex-1 min-w-[180px] px-4 py-3 bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-slate-600 rounded-xl text-black dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white placeholder:text-gray-400"
                            />
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password"
                                className="flex-1 min-w-[180px] px-4 py-3 bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-slate-600 rounded-xl text-black dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white placeholder:text-gray-400"
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="flex-1 min-w-[180px] px-4 py-3 bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-slate-600 rounded-xl text-black dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white placeholder:text-gray-400"
                            />
                            <button type="submit" disabled={loading} className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-black rounded-xl uppercase text-xs tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all disabled:opacity-50">
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                        </form>
                        {passwordMsg && <p className="text-red-500 text-sm font-bold mt-3">{passwordMsg}</p>}
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-3 mb-8">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'projects'
                            ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                            : 'bg-white dark:bg-dark-200 text-gray-400 hover:text-black dark:hover:text-white border border-gray-200 dark:border-slate-700'
                            }`}
                    >
                        <FolderOpen className="w-4 h-4" /> Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('skills')}
                        className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'skills'
                            ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                            : 'bg-white dark:bg-dark-200 text-gray-400 hover:text-black dark:hover:text-white border border-gray-200 dark:border-slate-700'
                            }`}
                    >
                        <Wrench className="w-4 h-4" /> Skills
                    </button>
                </div>

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-4xl font-black text-black dark:text-white uppercase tracking-tighter">
                                Projects ({projects.length})
                            </h2>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setEditingProject({ ...emptyProject })}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-md"
                                >
                                    <Plus className="w-4 h-4" /> Add Project
                                </button>
                            </div>
                        </div>

                        {/* Project Edit Form */}
                        {editingProject && (
                            <ProjectForm
                                project={editingProject}
                                onSave={handleSaveProject}
                                onCancel={() => setEditingProject(null)}
                            />
                        )}

                        {/* Project List */}
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 flex items-center gap-6 group hover:shadow-md transition-all">
                                    {project.image && (
                                        <div className="w-20 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-300 flex-shrink-0">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-black text-lg text-black dark:text-white uppercase tracking-tighter truncate">{project.title}</h3>
                                        <p className="text-gray-400 text-sm font-medium truncate">{project.description}</p>
                                        <div className="flex gap-2 mt-2">
                                            {project.tags?.map(tag => (
                                                <span key={tag} className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100 dark:bg-dark-300 px-2 py-0.5 rounded-full">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setEditingProject({ ...project })}
                                            className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-300 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                                        >
                                            <Edit3 className="w-4 h-4 text-gray-500" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-300 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills Tab */}
                {activeTab === 'skills' && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-4xl font-black text-black dark:text-white uppercase tracking-tighter">
                                Skills ({skills.length})
                            </h2>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setEditingSkill({ ...emptySkill })}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-md"
                                >
                                    <Plus className="w-4 h-4" /> Add Skill
                                </button>
                            </div>
                        </div>

                        {/* Skill Edit Form */}
                        {editingSkill && (
                            <SkillForm
                                skill={editingSkill}
                                onSave={handleSaveSkill}
                                onCancel={() => setEditingSkill(null)}
                            />
                        )}

                        {/* Skill List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {skills.map((skill) => (
                                <div key={skill.id} className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 group hover:shadow-md transition-all">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-black text-xl text-black dark:text-white uppercase tracking-tighter">{skill.name}</h3>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setEditingSkill({ ...skill })}
                                                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-300 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                                            >
                                                <Edit3 className="w-3.5 h-3.5 text-gray-500" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSkill(skill.id)}
                                                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-300 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 text-gray-500" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-3">{skill.category}</p>
                                    <span className="bg-gray-100 dark:bg-dark-300 text-black dark:text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                                        {skill.level}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Project Form Component ─────────────────────────────────────
const ProjectForm = ({ project, onSave, onCancel }) => {
    const [form, setForm] = useState({ ...project, tags: project.tags || [] });
    const [tagInput, setTagInput] = useState('');
    const fileInputRef = React.useRef(null);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            handleChange('image', ev.target.result);
        };
        reader.readAsDataURL(file);
    };

    const addTag = () => {
        if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
            setForm(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
            setTagInput('');
        }
    };

    const removeTag = (tag) => {
        setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        onSave(form);
    };

    return (
        <div className="bg-white dark:bg-dark-200 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-lg p-8 mb-6">
            <h3 className="text-xl font-black text-black dark:text-white uppercase tracking-tighter mb-6">
                {project.id ? 'Edit Project' : 'New Project'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label="Project Title" value={form.title} onChange={v => handleChange('title', v)} placeholder="My Project" required />
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Project Image</label>
                        <div className="flex gap-2">
                            <input
                                value={form.image?.startsWith('data:') ? 'Image uploaded ✓' : (form.image || '')}
                                onChange={(e) => handleChange('image', e.target.value)}
                                placeholder="URL or upload an image"
                                readOnly={form.image?.startsWith('data:')}
                                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-slate-600 rounded-xl text-black dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white placeholder:text-gray-400"
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 px-4 py-3 bg-black dark:bg-white text-white dark:text-black font-black rounded-xl text-xs uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all whitespace-nowrap"
                            >
                                <Upload className="w-4 h-4" /> Upload
                            </button>
                        </div>
                        {form.image && (
                            <div className="mt-3 relative group/img">
                                <div className="w-full h-32 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-300 border border-gray-200 dark:border-slate-600">
                                    <img src={form.image} alt="Preview" className="w-full h-full object-contain" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => { handleChange('image', ''); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500 text-white opacity-0 group-hover/img:opacity-100 transition-opacity"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )}
                    </div>
                    <InputField label="GitHub URL" value={form.github} onChange={v => handleChange('github', v)} placeholder="https://github.com/..." />
                    <InputField label="Live URL" value={form.live || ''} onChange={v => handleChange('live', v)} placeholder="https://example.com" />
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Description</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        rows={3}
                        placeholder="Project description..."
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-slate-600 rounded-xl text-black dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none placeholder:text-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Tags</label>
                    <div className="flex gap-2 flex-wrap mb-3">
                        {form.tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1 bg-gray-100 dark:bg-dark-300 text-black dark:text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-tighter">
                                {tag}
                                <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                            placeholder="Add a tag..."
                            className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-slate-600 rounded-xl text-black dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white placeholder:text-gray-400"
                        />
                        <button type="button" onClick={addTag} className="px-4 py-2.5 bg-gray-100 dark:bg-dark-300 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-dark-200 transition-all text-gray-600 dark:text-gray-300">
                            Add
                        </button>
                    </div>
                </div>
                <div className="flex gap-3 pt-2">
                    <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-black rounded-xl uppercase text-xs tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-md">
                        <Save className="w-4 h-4" /> Save
                    </button>
                    <button type="button" onClick={onCancel} className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-dark-300 text-gray-500 font-black rounded-xl uppercase text-xs tracking-widest hover:bg-gray-200 dark:hover:bg-dark-200 transition-all">
                        <X className="w-4 h-4" /> Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

// ─── Skill Form Component ───────────────────────────────────────
const SkillForm = ({ skill, onSave, onCancel }) => {
    const [form, setForm] = useState({ ...skill });

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        onSave(form);
    };

    return (
        <div className="bg-white dark:bg-dark-200 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-lg p-8 mb-6">
            <h3 className="text-xl font-black text-black dark:text-white uppercase tracking-tighter mb-6">
                {skill.id ? 'Edit Skill' : 'New Skill'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <InputField label="Skill Name" value={form.name} onChange={v => handleChange('name', v)} placeholder="React" required />
                    <InputField label="Category" value={form.category} onChange={v => handleChange('category', v)} placeholder="Frontend Framework" />
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Level</label>
                        <select
                            value={form.level}
                            onChange={(e) => handleChange('level', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-slate-600 rounded-xl text-black dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white appearance-none cursor-pointer"
                        >
                            <option value="Basic">Basic</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-3 pt-2">
                    <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-black rounded-xl uppercase text-xs tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-md">
                        <Save className="w-4 h-4" /> Save
                    </button>
                    <button type="button" onClick={onCancel} className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-dark-300 text-gray-500 font-black rounded-xl uppercase text-xs tracking-widest hover:bg-gray-200 dark:hover:bg-dark-200 transition-all">
                        <X className="w-4 h-4" /> Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

// ─── Reusable Input Field ───────────────────────────────────────
const InputField = ({ label, value, onChange, placeholder, required }) => (
    <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{label}</label>
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-slate-600 rounded-xl text-black dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white placeholder:text-gray-400"
        />
    </div>
);

export default AdminPanel;
