"use client";

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

function VerifyForm() {
    const searchParams = useSearchParams();
    const emailFromQuery = searchParams.get('email') || '';

    const [email, setEmail] = useState(emailFromQuery);
    const [otp, setOtp] = useState(''); // Keeping OTP as string for single input field
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const router = useRouter();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else {
            setResendDisabled(false);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleResendOtp = async () => {
        if (!email) return; // Use the email state for resending
        setResendDisabled(true);
        setCountdown(30); // 30 seconds cooldown
        setError('');

        try {
            const res = await fetch('/api/auth/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to resend');
            }
            alert("New OTP sent to your email!");

        } catch (err: any) {
            setError(err.message);
            setResendDisabled(false);
            setCountdown(0);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Attempt to sign in with OTP directly
            const res = await signIn('credentials', {
                email,
                otp,
                redirect: false,
            });

            if (res?.error) {
                throw new Error(res.error);
            }

            // Successful verification & login
            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-black p-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Verify Email</h2>
                    <p className="text-cyan-100/60 text-sm mt-2">Enter the code sent to your email</p>
                </div>

                {error && <p className="text-red-400 bg-red-400/10 p-3 rounded-lg text-center text-sm border border-red-400/20">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-cyan-100/80 mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            readOnly
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 cursor-not-allowed outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-cyan-100/80 mb-2">OTP Code</label>
                        <input
                            type="text"
                            required
                            placeholder="123456"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-white text-center tracking-[0.5em] text-2xl transition-all outline-none font-mono"
                            maxLength={6}
                        />
                    </div>
                    <button
                        type="submit" // Changed back to type="submit" to trigger form onSubmit
                        disabled={loading}
                        className="w-full py-3.5 text-white font-bold bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Verifying...' : 'Verify & Login'}
                    </button>

                    <div className="text-center">
                        <button
                            type="button" // Prevent form submission
                            onClick={handleResendOtp}
                            disabled={resendDisabled || !email}
                            className={`text-sm ${resendDisabled ? 'text-white/40 cursor-not-allowed' : 'text-cyan-400 hover:text-cyan-300'} transition-colors`}
                        >
                            {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
            <VerifyForm />
        </Suspense>
    );
}
