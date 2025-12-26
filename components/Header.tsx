'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Droplets, Menu, X, ShoppingCart, User } from 'lucide-react';
import { motion, MotionValue } from 'framer-motion';
import { useCart } from '../context/CartContext';

import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

interface HeaderProps {
    opacity?: MotionValue<number>;
}

export default function Header({ opacity }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const { totalItems, totalPrice, toggleCart } = useCart();
    const { data: session } = useSession();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Products', href: '/products' },
        { name: 'Distributor', href: '/distributer' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <motion.header
            style={{ opacity }}
            className="fixed  w-full z-50 mt-2 "
        >
            {/* Glass Background Effect */}
            <div className="absolute max-w-full mx-4 rounded-full inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-md border  border-white/10"></div>

            <nav className="relative max-w-full mx-4 px-6 lg:px-8 pointer-events-auto">
                <div className="flex items-center justify-between h-20 relative">

                    {/* Logo */}
                    <Link href={`${basePath}/`} className="flex items-center gap-3 group">
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
                    </Link>

                    {totalItems > 0 && (
                        <>
                            {/* Desktop Center Cart - Hidden on Mobile */}
                            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <button
                                    onClick={toggleCart}
                                    className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group backdrop-blur-md"
                                >
                                    <div className="relative">
                                        <ShoppingCart size={20} className="text-white/80 group-hover:text-cyan-400 transition-colors" />
                                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-cyan-500 rounded-full text-[10px] flex items-center justify-center font-bold text-black border border-black animate-in zoom-in spin-in-180 duration-300">
                                            {totalItems}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-start leading-none gap-0.5">
                                        <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">Total</span>
                                        <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                                            ₹{totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </button>
                            </div>

                            {/* Mobile Floating Cart Button - Visible only on Mobile */}
                            <div className="md:hidden fixed bottom-6 right-6 z-50">
                                <button
                                    onClick={toggleCart}
                                    className="flex items-center gap-3 px-5 py-4 rounded-full bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 transition-all duration-300"
                                >
                                    <div className="relative">
                                        <ShoppingCart size={24} className="text-black" />
                                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-cyan-500 rounded-full text-xs flex items-center justify-center font-bold border border-cyan-500 animate-in zoom-in spin-in-180 duration-300">
                                            {totalItems}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-start leading-none gap-0.5 border-l border-black/10 pl-3">
                                        <span className="text-[10px] text-black/60 font-medium uppercase tracking-wider">Total</span>
                                        <span className="text-sm font-bold text-black">
                                            ₹{totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </>
                    )}

                    {/* Mobile Only: Profile/Sign In & Menu */}
                    <div className="flex items-center gap-4 md:hidden">

                        {/* Mobile Cart Button (Moved here if we want it in header, but user didn't explicitly ask to move cart from bottom right. 
                           The current cart is fixed bottom right. I will leave it there as per existing design unless conflicts. 
                           The user asked for header changes.) */}

                        {/* Profile / Sign In Button */}
                        {session?.user ? (
                            <Link href="/profile" className="p-2 text-white/80 hover:text-cyan-400 transition-colors">
                                <User size={24} />
                            </Link>
                        ) : (
                            <Link href="/auth/signup" className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 border border-white/10">
                                Sign In
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Desktop Navigation Container (Original) */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium transition-all duration-200 relative group ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-cyan-400 transition-all duration-300 rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </Link>
                            );
                        })}
                        {session?.user ? (
                            <div className="relative group/user">
                                <div className="flex items-center gap-3 pl-1 pr-4 py-1 bg-white/5 border border-white/10 rounded-full group-hover/user:border-cyan-500/50 transition-colors duration-300 backdrop-blur-md overflow-hidden relative">
                                    {/* Avatar */}
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-cyan-500/20 shrink-0 z-10">
                                        {session.user.name?.charAt(0).toUpperCase()}
                                    </div>

                                    {/* Container for sliding text */}
                                    <div className="grid grid-cols-1 grid-rows-1 h-5 overflow-hidden w-auto min-w-[3 rem] max-w-[150px]">
                                        {/* Name (Visible by default) */}
                                        <div className="col-start-1 row-start-1 flex items-center transition-transform duration-300 group-hover/user:-translate-y-full">
                                            <span className="text-sm font-medium text-white/90 truncate pr-1">
                                                {session.user.name?.split(' ')[0]}
                                            </span>
                                        </div>

                                        {/* Profile Link (Visible on hover) */}
                                        <div className="col-start-1 row-start-1 flex items-center transition-transform duration-300 translate-y-full group-hover/user:translate-y-0">
                                            <Link
                                                href="/profile"
                                                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors whitespace-nowrap"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                                                PROFILE
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href="/auth/signup"
                                className="px-6 py-2 text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 border border-white/10"
                            >
                                Sign Up
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {
                mobileMenuOpen && (
                    <div className="md:hidden relative bg-black/70 backdrop-blur-md border-b border-white/10 pointer-events-auto">
                        <div className="px-6 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-base font-medium text-white/80 hover:text-white transition-colors py-2 hover:translate-x-1 duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {session?.user && (
                                <button
                                    onClick={() => {
                                        signOut();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="block text-base font-bold text-red-400 hover:text-red-300 transition-colors py-2 hover:translate-x-1 duration-200 w-full text-left"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                )
            }
        </motion.header >
    );
}
