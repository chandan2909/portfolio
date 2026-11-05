import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import Navbar from './Navbar';

const openMenu = () => {
    const trigger = screen.getByRole('button', { name: 'About' });
    fireEvent.click(trigger);
    return trigger;
};

const nav = () => within(screen.getByRole('navigation', { name: 'Main navigation' }));

describe('Navbar About menu', () => {
    it('is closed until the About button is clicked', () => {
        render(<Navbar />);
        expect(screen.queryByRole('link', { name: 'Education' })).toBeNull();

        const trigger = openMenu();
        expect(trigger).toHaveAttribute('aria-expanded', 'true');

        ['About me', 'Experience', 'Skills', 'Education'].forEach((name) => {
            expect(nav().getByRole('link', { name })).toBeInTheDocument();
        });
    });

    it('stays open when the browser click that Glisse cancels arrives after its own', () => {
        render(<Navbar />);
        const trigger = openMenu();

        // Cancelled on the way down, as Glisse does for the second click of a press.
        const cancel = (e) => e.preventDefault();
        document.addEventListener('click', cancel, true);
        fireEvent.click(trigger);
        document.removeEventListener('click', cancel, true);

        expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('scrolls to the section and closes when a link is chosen', () => {
        const section = document.createElement('section');
        section.id = 'education';
        section.scrollIntoView = vi.fn();
        document.body.appendChild(section);

        render(<Navbar />);
        openMenu();
        fireEvent.click(nav().getByRole('link', { name: 'Education' }));

        expect(section.scrollIntoView).toHaveBeenCalled();
        expect(screen.queryByRole('link', { name: 'Education' })).toBeNull();
        section.remove();
    });

    it('moves Tab from About into the menu, and from the last link on to the next tab', () => {
        render(<Navbar />);
        const trigger = openMenu();
        trigger.focus();

        fireEvent.keyDown(trigger, { key: 'Tab' });
        expect(nav().getByRole('link', { name: 'About me' })).toHaveFocus();

        fireEvent.keyDown(document.activeElement, { key: 'Tab', shiftKey: true });
        expect(trigger).toHaveFocus();

        const last = nav().getByRole('link', { name: 'Education' });
        last.focus();
        fireEvent.keyDown(last, { key: 'Tab' });
        expect(nav().getByRole('link', { name: 'Work' })).toHaveFocus();
    });

    it('closes on Escape and on a click outside the nav', () => {
        render(<Navbar />);

        openMenu();
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(screen.queryByRole('link', { name: 'Skills' })).toBeNull();

        openMenu();
        fireEvent.pointerDown(document.body);
        expect(screen.queryByRole('link', { name: 'Skills' })).toBeNull();
    });
});

describe('Navbar tabs', () => {
    afterEach(() => {
        document.documentElement.classList.remove('dark');
    });

    it('scrolls to the section when a tab is clicked, and closes an open menu', () => {
        const section = document.createElement('section');
        section.id = 'contact';
        section.scrollIntoView = vi.fn();
        document.body.appendChild(section);

        render(<Navbar />);
        openMenu();
        fireEvent.click(nav().getByRole('link', { name: 'Contact' }));

        expect(section.scrollIntoView).toHaveBeenCalled();
        expect(screen.queryByRole('link', { name: 'Skills' })).toBeNull();
        section.remove();
    });

    it('takes its theme from the site toggle, not the system setting', async () => {
        render(<Navbar />);
        const bar = screen.getByRole('navigation', { name: 'Main navigation' });
        expect(bar).toHaveAttribute('data-theme', 'light');

        await act(async () => {
            document.documentElement.classList.add('dark');
        });
        expect(bar).toHaveAttribute('data-theme', 'dark');
    });
});
