import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Contact from './Contact';

describe('Contact component', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    it('renders contact form fields and social links', () => {
        render(<Contact />);

        expect(screen.getByRole('heading', { name: /Let's Connect/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('submits form successfully and shows confirmation', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        render(<Contact />);

        fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'jane@example.com' } });
        fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello Chandan!' } });

        fireEvent.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(screen.getByText(/Message Sent!/i)).toBeInTheDocument();
        });
    });
});
