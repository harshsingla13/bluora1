'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplet, Activity, Weight, Sun, ArrowRight, Share2, Info } from 'lucide-react';
import Link from 'next/link';
import Particles from './Particles';

export default function CalculatorClient() {
    const [weight, setWeight] = useState(70);
    const [activityLevel, setActivityLevel] = useState('active'); // sedentary, active, athlete
    const [climate, setClimate] = useState('moderate'); // cool, moderate, hot
    const [showResult, setShowResult] = useState(false);

    const calculateHydration = () => {
        // Base calculation: 35ml per kg of body weight
        let intake = weight * 0.035;

        // Activity adjustments
        if (activityLevel === 'sedentary') intake *= 1.0;
        if (activityLevel === 'active') intake += 0.5; // +500ml
        if (activityLevel === 'athlete') intake += 1.0; // +1L

        // Climate adjustments
        if (climate === 'cool') intake *= 1.0;
        if (climate === 'moderate') intake *= 1.0;
        if (climate === 'hot') intake += 0.5; // +500ml

        return intake.toFixed(1);
    };

    const hydrationGoal = calculateHydration();

    const handleShare = async () => {
        const text = `I need ${hydrationGoal}L of water daily! Calculate your hydration needs with Bluora.`;
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Bluora Hydration Calculator',
                    text: text,
                    url: url,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(`${text} ${url}`);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Particles
                    particleColors={['#06b6d4', '#3b82f6', '#22d3ee']}
                    particleCount={150}
                    particleSpread={5}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={true}
                    disableRotation={false}
                />
            </div>

            {/* Radial Glow - Top Centered */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>


            <main className="relative z-10 pt-28 pb-20 px-4 container mx-auto max-w-4xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block p-3 bg-cyan-500/10 rounded-full mb-4 border border-cyan-500/20">
                        <Droplet className="text-cyan-400 w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 mb-4 tracking-tight">
                        Hydration Calculator
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light">
                        Discover your optimal daily water intake based on your body and lifestyle.
                        Stay performing at your peak with pure hydration.
                    </p>
                </motion.div>

                {/* Calculator Card */}
                <div className="grid md:grid-cols-2 gap-8 items-start">

                    {/* Input Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl"
                    >
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Info size={20} className="text-cyan-300" />
                            Your Details
                        </h2>

                        <div className="space-y-8">
                            {/* Weight Input */}
                            <div>
                                <label className="flex justify-between text-sm font-medium text-slate-300 mb-4">
                                    <span className="flex items-center gap-2"><Weight size={16} /> Weight (kg)</span>
                                    <span className="text-cyan-400 font-bold bg-cyan-400/10 px-2 py-0.5 rounded">{weight} kg</span>
                                </label>
                                <input
                                    type="range"
                                    min="30"
                                    max="150"
                                    value={weight}
                                    onChange={(e) => {
                                        setWeight(Number(e.target.value));
                                        setShowResult(false);
                                    }}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                />
                            </div>

                            {/* Activity Level */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-4">
                                    <Activity size={16} /> Activity Level
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['sedentary', 'active', 'athlete'].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => {
                                                setActivityLevel(level);
                                                setShowResult(false);
                                            }}
                                            className={`py-3 px-2 rounded-xl text-sm capitalize transition-all duration-300 border ${activityLevel === level
                                                ? 'bg-cyan-600 text-white border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                                : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                                                }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Climate */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-4">
                                    <Sun size={16} /> Climate
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['cool', 'moderate', 'hot'].map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => {
                                                setClimate(c);
                                                setShowResult(false);
                                            }}
                                            className={`py-3 px-2 rounded-xl text-sm capitalize transition-all duration-300 border ${climate === c
                                                ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                                : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                                                }`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setShowResult(true)}
                                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                            >
                                Calculate Intake
                            </button>
                        </div>
                    </motion.div>

                    {/* Result Section */}
                    <div className="relative">
                        {showResult ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30 text-center h-full flex flex-col justify-center items-center relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-cyan-500/5 blur-3xl pointer-events-none" />

                                <h3 className="text-xl text-cyan-200 font-medium mb-2 relative z-10">Daily Recommendation</h3>
                                <div className="relative z-10 mb-6">
                                    <span className="text-7xl font-black text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                                        {hydrationGoal}
                                    </span>
                                    <span className="text-2xl text-cyan-300 font-bold ml-1">Liters</span>
                                </div>

                                <p className="text-slate-300 text-sm mb-8 leading-relaxed max-w-xs relative z-10">
                                    Based on your inputs, this is the optimal amount of water to keep your body functioning efficiently.
                                </p>

                                <div className="flex flex-col gap-3 w-full relative z-10">
                                    <Link href="/products" className="w-full py-3 bg-white text-blue-900 rounded-xl font-bold hover:bg-cyan-50 transition-colors flex items-center justify-center gap-2">
                                        Get Bluora Water <ArrowRight size={18} />
                                    </Link>
                                    <button
                                        onClick={handleShare}
                                        className="w-full py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Share2 size={18} /> Share Result
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col justify-center items-center text-slate-500 space-y-4 p-8 border border-white/5 rounded-2xl border-dashed"
                            >
                                <Droplet size={48} className="opacity-20" />
                                <p className="text-center font-light">
                                    Enter your details and calculate<br />your hydration needs.
                                </p>
                            </motion.div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
