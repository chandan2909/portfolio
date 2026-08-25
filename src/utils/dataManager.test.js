import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    getProjects,
    saveProject,
    deleteProject,
    getSkills,
    saveSkill,
    deleteSkill,
    checkPassword,
    changePassword,
} from './dataManager';

describe('dataManager utility', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        global.fetch = vi.fn();
    });

    describe('getProjects', () => {
        it('fetches projects from API when available', async () => {
            const mockProjects = [
                { id: '1', title: 'Test Project', description: 'Desc', tags: ['React'] }
            ];
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockProjects,
            });

            const result = await getProjects();
            expect(result).toEqual(mockProjects);
            expect(global.fetch).toHaveBeenCalledWith('/api/projects');
        });

        it('returns fallback projects when API fails', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network error'));

            const result = await getProjects();
            expect(result.length).toBeGreaterThan(0);
            expect(result[0]).toHaveProperty('title');
        });
    });

    describe('saveProject', () => {
        it('creates a new project via POST when id is not provided', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, id: 'p-new' }),
            });

            const newProject = { title: 'New App', tags: ['JS'] };
            const res = await saveProject(newProject);

            expect(global.fetch).toHaveBeenCalledWith('/api/projects', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify(newProject),
            }));
            expect(res.success).toBe(true);
        });

        it('updates an existing project via PUT when id is provided', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true }),
            });

            const existing = { id: 'p123', title: 'Updated Title' };
            const res = await saveProject(existing);

            expect(global.fetch).toHaveBeenCalledWith('/api/projects/p123', expect.objectContaining({
                method: 'PUT',
                body: JSON.stringify(existing),
            }));
            expect(res.success).toBe(true);
        });
    });

    describe('deleteProject', () => {
        it('calls DELETE /api/projects/:id', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true }),
            });

            const res = await deleteProject('p123');
            expect(global.fetch).toHaveBeenCalledWith('/api/projects/p123', expect.objectContaining({ method: 'DELETE' }));
            expect(res.success).toBe(true);
        });
    });

    describe('getSkills', () => {
        it('fetches skills from API', async () => {
            const mockSkills = [{ id: 's1', name: 'React', level: 'Expert' }];
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockSkills,
            });

            const res = await getSkills();
            expect(res).toEqual(mockSkills);
        });

        it('returns fallback skills when API fails', async () => {
            global.fetch.mockRejectedValueOnce(new Error('DB unreachable'));

            const res = await getSkills();
            expect(res.length).toBeGreaterThan(0);
            expect(res[0]).toHaveProperty('name');
        });
    });

    describe('checkPassword & changePassword', () => {
        it('returns true on successful login check', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, token: 'fake.token.here' }),
            });

            const auth = await checkPassword('secret');
            expect(auth).toBe(true);
            expect(global.fetch).toHaveBeenCalledWith('/api/auth/login', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ password: 'secret' }),
            }));
        });

        it('calls change password endpoint with correct payload', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, message: 'Password updated' }),
            });

            const res = await changePassword('oldPass', 'newPass');
            expect(res.success).toBe(true);
            expect(global.fetch).toHaveBeenCalledWith('/api/auth/change-password', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ currentPassword: 'oldPass', newPassword: 'newPass' }),
            }));
        });
    });
});
