'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, ShieldCheck, Truck, Download } from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';

export default function BecomeDistributorPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-slate-950 text-white pt-24 md:pt-28 pb-12">
                {/* Hero Section */}
                <section className="relative px-6 py-10 md:py-20 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container mx-auto relative z-10 text-center max-w-4xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                        >
                            Partner with <span className="text-cyan-400">Bluora</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-slate-400 mb-10 leading-relaxed"
                        >
                            Join our network of premium distributors and bring the purity of Bluora to your region.
                            Together, let's redefine hydration.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex flex-col items-center gap-8 mt-12">
                                {/* Step 1: Download */}
                                <div className="flex flex-col items-center gap-4">
                                    <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm">Step 1</span>
                                    <a
                                        href="/distributor-registration-form.pdf"
                                        download="Distributor-Registration-Form.pdf"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-lg font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 group"
                                    >
                                        Download Application Form
                                        <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                                    </a>
                                </div>

                                {/* Divider */}
                                <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-700 to-transparent"></div>

                                {/* Step 2: WhatsApp */}
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm">Step 2</span>
                                    <p className="text-slate-300 text-lg">
                                        WhatsApp the filled form to <a href="https://wa.me/919463963831" target="_blank" className="text-white hover:text-cyan-400 transition-colors font-bold underline decoration-cyan-500/50 hover:decoration-cyan-500 underline-offset-4">+91 9463963831</a>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 px-6">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: TrendingUp,
                                    title: "High Growth",
                                    description: "Partner with a rapidly expanding premium brand in the hydration market."
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Quality Assured",
                                    description: "Every bottle is certified and tested to meet international standards."
                                },
                                {
                                    icon: Truck,
                                    title: "Robust Logistics",
                                    description: "Reliable supply chain ensuring timely delivery to your warehouse."
                                },
                                {
                                    icon: Globe,
                                    title: "Exclusive Territories",
                                    description: "Secure exclusive rights to distribute in your designated region."
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                                        <item.icon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6">
                    <div className="container mx-auto">
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-white/10 p-12 md:p-20 text-center">
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
                                <p className="text-slate-300 mb-8 text-lg">
                                    Complete our distributor application form and our team will get back to you within 24 hours.
                                </p>
                                <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-full text-lg font-bold hover:bg-cyan-50 hover:scale-105 transition-all duration-300">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}