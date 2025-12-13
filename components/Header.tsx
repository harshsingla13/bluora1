'use client';

import { useState } from 'react';
import { Droplets, Menu, X } from 'lucide-react';
import { motion, MotionValue } from 'framer-motion';

interface HeaderProps {
    opacity?: MotionValue<number>;
}

export default function Header({ opacity }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#about' },
        { name: 'Products', href: '#products' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <motion.header
            style={{ opacity }}
            className="fixed  w-full z-10 mt-2 "
        >
            {/* Glass Background Effect */}
            <div className="absolute w-10xl mx-28 rounded-full inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-md border  border-white/10"></div>

            <nav className="relative max-w-7xl mx-auto px-6 lg:px-8 pointer-events-auto">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3 group">
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
                            <Droplets size={22} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-xl font-bold text-white tracking-tight">
                                Bluora<span className="text-cyan-400">™</span>
                            </span>
                            <span className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">
                                The Power of Pure
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-white/80 hover:text-white transition-all duration-200 relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300 rounded-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden relative bg-black/70 backdrop-blur-md border-b border-white/10 pointer-events-auto">
                    <div className="px-6 py-4 space-y-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block text-base font-medium text-white/80 hover:text-white transition-colors py-2 hover:translate-x-1 duration-200"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </motion.header>
    );
}
