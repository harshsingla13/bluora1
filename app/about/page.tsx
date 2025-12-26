'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Droplet, Factory, Building2, Truck } from 'lucide-react';
import Header from '../../components/Header';
import Particles from '../../components/Particles';
import Link from 'next/link';

export default function AboutClient() {

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
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

            <main className="relative z-10 pt-32 pb-20">

                {/* Hero Section */}
                <section className="container mx-auto px-6 mb-24 max-w-5xl text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h1 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent tracking-tight leading-tight">
                            Redefining Purity.<br />
                            <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                Delivering Excellence.
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                            Welcome to the world of <strong className="text-white">HD Drinks & Beverages</strong>, where quality meets discipline.
                        </p>
                    </motion.div>
                </section>

                {/* HD Group Profile */}
                <section className="container mx-auto px-6 mb-32 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(6,182,212,0.1)] relative overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full text-blue-300 text-sm font-bold mb-6">
                                    <Building2 size={16} />
                                    <span>CORPORATE PROFILE</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                    H.D. Drinks & Beverages (HD Group)
                                </h2>
                                <p className="text-slate-300 leading-loose mb-6">
                                    We are a quality-focused beverage manufacturing and supply company engaged in packaged drinking water and allied non-alcoholic beverage categories.
                                </p>
                                <p className="text-slate-300 leading-loose">
                                    Our operation is built on a strong foundation of <span className="text-cyan-300 font-semibold">hygiene</span>, <span className="text-cyan-300 font-semibold">process discipline</span>, and <span className="text-cyan-300 font-semibold">consistent product quality</span>. Supported by a professional operations and supply team, we ensure every drop reflects our commitment to excellence.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-center hover:bg-white/5 transition-colors">
                                    <ShieldCheck className="mx-auto text-cyan-400 mb-3" size={32} />
                                    <h3 className="font-bold text-white mb-1">Hygiene</h3>
                                    <p className="text-xs text-slate-400">Uncompromised standards</p>
                                </div>
                                <div className="bg-black/40 p-6 opacity-80 rounded-2xl border border-white/5 text-center mt-8 hover:bg-white/5 transition-colors">
                                    <Factory className="mx-auto text-blue-400 mb-3" size={32} />
                                    <h3 className="font-bold text-white mb-1">Process</h3>
                                    <p className="text-xs text-slate-400">Rigorous discipline</p>
                                </div>
                                <div className="bg-black/40 p-6 opacity-80 rounded-2xl border border-white/5 text-center hover:bg-white/5 transition-colors">
                                    <UserCheck className="mx-auto text-purple-400 mb-3" size={32} />
                                    <h3 className="font-bold text-white mb-1">Team</h3>
                                    <p className="text-xs text-slate-400">Expert operations</p>
                                </div>
                                <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-center mt-8 hover:bg-white/5 transition-colors">
                                    <Droplet className="mx-auto text-teal-400 mb-3" size={32} />
                                    <h3 className="font-bold text-white mb-1">Quality</h3>
                                    <p className="text-xs text-slate-400">Consistent purity</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Bluora Brand Spotlights */}
                <section className="container mx-auto px-6 mb-24 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Our Flagship Brand</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Brand Image/Logo Placeholder */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="order-2 md:order-1 relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full blur-[60px]" />
                            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-12 flex items-center justify-center min-h-[400px]">
                                <span className="text-5xl font-black text-white tracking-widest">
                                    BLU<span className="text-cyan-400">ORA</span>
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="order-1 md:order-2"
                        >
                            <h3 className="text-3xl font-bold text-white mb-6">Reliable. Refreshing. Radiant.</h3>
                            <p className="text-slate-300 leading-loose mb-8 text-lg">
                                <strong className="text-white">BLUORA</strong> is positioned as a reliable packaged drinking water brand, engineered for those who value consistency.
                            </p>
                            <p className="text-slate-300 leading-loose mb-8">
                                We specialize in institutional consumption, where timely delivery and uniform quality are critical. When your organization needs hydration it can trust, Bluora delivers.
                            </p>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-cyan-400 tracking-wider uppercase mb-4">Trusted By</h4>
                                <div className="flex flex-wrap gap-3">
                                    {['Transport Operators', 'Corporate Offices', 'Hospitals', 'Events', 'Schools'].map((sector, i) => (
                                        <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-default">
                                            {sector}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="container mx-auto px-6 max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-white/10 rounded-3xl p-12"
                    >
                        <Truck className="mx-auto text-cyan-300 mb-6" size={48} />
                        <h2 className="text-3xl font-bold text-white mb-4">Partner With Us</h2>
                        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                            Ensure your institution stays hydrated with the highest standards of quality. Contact us for bulk distribution and institutional supply.
                        </p>
                        <Link href="/contact" className="inline-block px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-cyan-50 transition-colors shadow-lg shadow-cyan-900/20">
                            Get in Touch
                        </Link>
                    </motion.div>
                </section>

            </main>
        </div>
    );
}