'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Droplets, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="relative bg-slate-950 text-white pt-20 pb-10 overflow-hidden border-t border-white/5">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group w-fit">
                            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
                                <Droplets size={24} className="text-white" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-2xl font-bold text-white tracking-tight">
                                    Bluora<span className="text-cyan-400">™</span>
                                </span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
                                    The Power of Pure
                                </span>
                            </div>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Experience the pinnacle of hydration with Bluora. Sourced from pristine environments and enriched with essential minerals for your well-being.
                        </p>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wide">Explore</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <Link href="/about" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all" />
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all" />
                                    Our Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/distributer" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all" />
                                    Become a Distributor
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/hydration-calculator" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all" />
                                    Hydration Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all" />
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/press" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all" />
                                    Media Kit
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Column */}
                    {/* <div>
                        <h4 className="text-white font-bold mb-6 tracking-wide">Connect</h4>
                        <div className="flex gap-4">
                            {[
                                { Icon: Instagram, href: "https://instagram.com/bluorawater" },
                                { Icon: Twitter, href: "https://twitter.com/bluorawater" },
                                { Icon: Facebook, href: "https://facebook.com/bluorawater" },
                                { Icon: Linkedin, href: "https://linkedin.com/company/bluora" }
                            ].map(({ Icon }, index) => (
                                <div
                                    key={index}
                                    className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 cursor-default"
                                >
                                    <Icon size={18} />
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} HD Drinks & Beverages. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <Heart size={10} className="text-red-500 fill-red-500" /> in India
                    </p>
                </div>
            </div>
        </footer>
    );
}
