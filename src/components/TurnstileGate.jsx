import React, { useEffect, useState } from 'react';

const TurnstileGate = ({ onVerify }) => {
    const [retryVisible, setRetryVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('text-gray-400');

    useEffect(() => {
        // Add Turnstile script only if it doesn't exist
        const scriptId = 'cloudflare-turnstile-script';
        let script = document.getElementById(scriptId);
        let createdScript = false;

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            createdScript = true;
        }

        // Global callbacks for Turnstile
        window.onTurnstileSuccess = (token) => {
            setMessage('Verification complete. Welcome!');
            setMessageColor('text-green-600');
            setTimeout(onVerify, 600);
        };

        window.onTurnstileExpired = () => {
            setMessage('Verification expired. Please try again.');
            setMessageColor('text-red-600');
            setRetryVisible(true);
        };

        window.onTurnstileError = () => {
            setMessage('There was an error verifying. Please refresh and try again.');
            setMessageColor('text-red-600');
            setRetryVisible(true);
        };

        const failsafe = setTimeout(() => {
            if (!message) {
                setMessage("If the verification doesn't appear, please disable ad blockers and refresh.");
                setMessageColor('text-amber-600');
            }
        }, 12000);

        return () => {
            if (createdScript && script && document.head.contains(script)) {
                // only remove if we created it in this mount? Actually it's better to leave it loaded to avoid re-fetching, but if we want to clean it up:
                document.head.removeChild(script);
            }
            clearTimeout(failsafe);
        };
    }, [onVerify, message]);

    const handleRetry = () => {
        setRetryVisible(false);
        setMessage('');
        if (window.turnstile) {
            window.turnstile.reset('#turnstile-widget');
        }
    };

    return (
        <div
            id="turnstile-gate"
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-50"
        >
            <div className="w-full h-full flex items-center justify-center p-8 bg-slate-900/10 backdrop-blur-md">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl text-slate-900">
                    <div className="mb-4 flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="text-slate-800"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                        >
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4H4.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-.75-.75H11z" />
                        </svg>
                        <h2 className="text-xl font-bold">Security Verification</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-6 font-medium">
                        Please complete the check to access the portfolio.
                    </p>
                    <div
                        id="turnstile-box"
                        className="relative flex flex-col items-center justify-center min-h-[100px]"
                    >
                        <div
                            id="turnstile-widget"
                            className="cf-turnstile"
                            data-sitekey="0x4AAAAAABz2V0bCF0OgvPrt"
                            data-theme="light"
                            data-size="normal"
                            data-callback="onTurnstileSuccess"
                            data-expired-callback="onTurnstileExpired"
                            data-error-callback="onTurnstileError"
                            data-appearance="always"
                        ></div>
                    </div>

                    {message && (
                        <div className={`mt-4 text-sm font-medium ${messageColor}`} aria-live="polite">
                            {message}
                        </div>
                    )}

                    {retryVisible && (
                        <button
                            onClick={handleRetry}
                            type="button"
                            className="mt-4 w-full rounded-xl border-2 border-slate-200 px-4 py-2 text-sm font-bold text-gray-900 hover:bg-slate-50 transition-colors"
                        >
                            Try again
                        </button>
                    )}

                    <noscript>
                        <p className="mt-4 text-sm text-red-600 font-bold">
                            JavaScript is required to view this site.
                        </p>
                    </noscript>
                </div>
            </div>
        </div>
    );
};

export default TurnstileGate;
