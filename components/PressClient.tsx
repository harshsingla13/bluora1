'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, Check, FileText, Image as ImageIcon } from 'lucide-react';
import Header from './Header';
import Particles from './Particles';

export default function PressClient() {
    const [copied, setCopied] = React.useState(false);

    const brandBio = "Bluora is a premium alkaline packaged drinking water brand committed to delivering purity and hydration. Sourced from pristine environments and enriched with essential minerals, Bluora redefines the water experience with its distinct alkaline properties and crisp taste.";

    const handleCopy = () => {
        navigator.clipboard.writeText(brandBio);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-300 selection:text-black font-sans relative overflow-hidden">
            <Header />

            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <Particles
                    particleColors={['#06b6d4', '#3b82f6', '#a855f7']}
                    particleCount={120}
                    particleSpread={5}
                    speed={0.1}
                />
            </div>

            {/* Content Container */}
            <main className="relative z-10 pt-32 pb-20 px-6 container mx-auto max-w-5xl">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent tracking-tight">
                        Media Kit
                    </h1>
                    <p className="text-lg text-cyan-100/60 max-w-2xl mx-auto font-light">
                        Resources, assets, and brand guidelines for journalists, bloggers, and partners.
                    </p>
                </motion.div>

                {/* Brand Story Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                            <FileText className="text-cyan-400" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Brand Story</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative group flex flex-col gap-6">
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {brandBio}
                        </p>
                        <div className="flex justify-end pt-6 border-t border-white/5">
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/50 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium group/btn"
                            >
                                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="group-hover/btn:scale-110 transition-transform" />}
                                {copied ? 'Copied to Clipboard' : 'Copy Brand Story'}
                            </button>
                        </div>
                    </div>
                </motion.section>

                {/* Assets Grid */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <ImageIcon className="text-blue-400" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Brand Assets</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Logo Asset */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                            <div className="h-40 w-full bg-black/40 rounded-xl mb-4 flex items-center justify-center border border-white/5 border-dashed p-4">
                                <img src="/BLUORA-logo.png" alt="Bluora Official Logo" className="max-h-full max-w-full object-contain" />
                            </div>
                            <h3 className="font-bold text-white mb-1">Official Logo</h3>
                            <p className="text-sm text-slate-400 mb-4">High-resolution PNG</p>
                            <a
                                href="/BLUORA-logo.png"
                                download="BLUORA-logo.png"
                                className="w-full py-3 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                            >
                                <Download size={18} /> Download Logo
                            </a>
                        </div>

                        {/* Product Render Asset */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                            <div className="h-40 w-full bg-black/40 rounded-xl mb-4 flex items-center justify-center border border-white/5 border-dashed overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />
                                <img src="/1L.png" alt="Product Render" className="h-full object-contain" />
                            </div>
                            <h3 className="font-bold text-white mb-1">Product Renders</h3>
                            <p className="text-sm text-slate-400 mb-4">3D Renders, Lifestyle Shots</p>
                            <a
                                href="/1L.png"
                                download="Bluora-Product-Render.png"
                                className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                            >
                                <Download size={18} /> Download Render
                            </a>
                        </div>
                    </div>
                </motion.section>

                <div className="mt-16 text-center">
                    <p className="text-slate-400">
                        For press inquiries, please contact <a href="mailto:info@hddrinksbeverages.com" className="text-cyan-400 hover:underline">info@hddrinksbeverages.com</a>
                    </p>
                </div>

            </main>
        </div>
    );
}