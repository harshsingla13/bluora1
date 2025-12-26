'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import Particles from '../../components/Particles';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, User, CreditCard, ShieldCheck, Truck, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { items, items: cartItems, totalPrice, clearCart } = useCart();
    // Using both items/cartItems variables to be safe with existing code context
    const currentItems = items || cartItems || [];

    const [isVerifyingZip, setIsVerifyingZip] = useState(false);
    const [zipError, setZipError] = useState('');
    const [zipSuccess, setZipSuccess] = useState(false);

    // Redirect if guest/unauthenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signup');
        }
    }, [status, router]);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
    });

    // Pre-fill data from session
    useEffect(() => {
        if (session?.user) {
            const { name, email } = session.user;
            setFormData(prev => ({
                ...prev,
                fullName: name || '',
                email: email || '',
            }));
        }
    }, [session]);

    // Address Verification Effect
    useEffect(() => {
        const verifyPincode = async () => {
            if (formData.zipCode.length === 6) {
                setIsVerifyingZip(true);
                setZipError('');
                setZipSuccess(false);

                try {
                    const response = await fetch(`https://api.postalpincode.in/pincode/${formData.zipCode}`);
                    const data = await response.json();

                    if (data && data[0].Status === 'Success') {
                        const details = data[0].PostOffice[0];
                        setFormData(prev => ({
                            ...prev,
                            city: details.District,
                            state: details.State
                        }));
                        setZipSuccess(true);
                    } else {
                        setZipError('Invalid Pincode');
                        setFormData(prev => ({ ...prev, city: '', state: '' })); // Optional: clear invalid city/state?
                    }
                } catch (error) {
                    console.error('Pincode verification failed:', error);
                    setZipError('Verification failed');
                } finally {
                    setIsVerifyingZip(false);
                }
            } else {
                setZipSuccess(false);
                setZipError('');
            }
        };

        const timeoutId = setTimeout(() => {
            if (formData.zipCode) verifyPincode();
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [formData.zipCode]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session?.user?.email) {
            alert("Please sign in to place an order");
            return;
        }

        if (zipError) {
            alert("Please provide a valid zip code.");
            return;
        }

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: session.user.email,
                    items: currentItems.map(item => ({
                        productId: item.id,
                        title: item.title,
                        size: item.size,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image
                    })),
                    totalAmount: totalPrice,
                    shippingDetails: {
                        fullName: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        zipCode: formData.zipCode
                    }
                })
            });

            if (!res.ok) throw new Error('Failed to place order');

            clearCart();
            router.push('/profile');
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        }
    };

    if (status === 'loading') {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    }

    if (currentItems.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Particles particleColors={['#06b6d4', '#3b82f6']} particleCount={100} />
                </div>
                <div className="z-10 text-center space-y-4 p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Your Cart is Empty</h2>
                    <p className="text-white/60">Looks like you haven't added any premium hydration yet.</p>
                    <Link href="/products" className="inline-block px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    // Helper to determine input class based on value presence
    const getInputClass = (value: string) => `
        w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all duration-300
        ${value ? 'bg-white/10 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-black/20 border border-white/10 text-white placeholder-white/20 focus:border-cyan-500'}
    `;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white relative overflow-hidden pt-24 pb-12">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <Particles
                    particleColors={['#06b6d4', '#3b82f6', '#22d3ee']}
                    particleCount={150}
                    speed={0.05}
                />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <h1 className="text-4xl md:text-5xl font-black mb-8 text-center tracking-tight">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Checkout</span>
                </h1>

                <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">

                    {/* LEFT COLUMN: Shipping Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <Truck className="text-cyan-400" />
                                <h2 className="text-xl font-bold text-white">Shipping Details</h2>
                            </div>

                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-cyan-200 uppercase tracking-wider ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${formData.fullName ? 'text-cyan-400' : 'text-white/30'}`} size={18} />
                                            <input
                                                required
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className={getInputClass(formData.fullName)}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-cyan-200 uppercase tracking-wider ml-1">Email</label>
                                        <div className="relative group">
                                            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${formData.email ? 'text-cyan-400' : 'text-white/30'}`} size={18} />
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={getInputClass(formData.email)}
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-cyan-200 uppercase tracking-wider ml-1">Phone Number</label>
                                    <div className="relative group">
                                        <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${formData.phone ? 'text-cyan-400' : 'text-white/30'}`} size={18} />
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={getInputClass(formData.phone)}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-cyan-200 uppercase tracking-wider ml-1">Address</label>
                                    <div className="relative group">
                                        <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${formData.address ? 'text-cyan-400' : 'text-white/30'}`} size={18} />
                                        <input
                                            required
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className={getInputClass(formData.address)}
                                            placeholder="Street Height, Sector 5..."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                                    <div className="col-span-2 md:col-span-1 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold text-cyan-200 uppercase tracking-wider ml-1">Zip Code</label>
                                            {isVerifyingZip && <Loader2 size={12} className="animate-spin text-cyan-400" />}
                                            {zipSuccess && <span className="text-[10px] text-green-400 flex items-center gap-1"><CheckCircle size={10} />Verified</span>}
                                            {zipError && <span className="text-[10px] text-red-400 flex items-center gap-1"><AlertCircle size={10} />Invalid</span>}
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            maxLength={6}
                                            className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 ${zipError ? 'border-red-500/50 bg-red-500/10' :
                                                zipSuccess ? 'border-green-500/50 bg-green-500/10 text-white' :
                                                    formData.zipCode ? 'bg-white/10 border-cyan-500/50 text-white' : 'bg-black/20 border border-white/10 text-white placeholder-white/20'
                                                }`}
                                            placeholder="400001"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-cyan-200 uppercase tracking-wider ml-1">City</label>
                                        <input
                                            required
                                            readOnly // Auto-filled
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className={`${getInputClass(formData.city)} cursor-not-allowed opacity-80`}
                                            placeholder="Mumbai"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-cyan-200 uppercase tracking-wider ml-1">State</label>
                                        <input
                                            required
                                            readOnly // Auto-filled
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className={`${getInputClass(formData.state)} cursor-not-allowed opacity-80`}
                                            placeholder="Maharashtra"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl sticky top-24">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <CreditCard className="text-cyan-400" />
                                Order Summary
                            </h2>

                            {/* Cart Items List */}
                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {currentItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-3 bg-black/20 rounded-xl border border-white/5">
                                        <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                                            {/* Fallback image if actual image is missing */}
                                            {item.image ? (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1" />
                                            ) : (
                                                <div className="text-xs text-white/20">No Img</div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white text-sm">{item.title}</h3>
                                            <p className="text-xs text-white/50">{item.size}</p>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-xs text-cyan-300">Qty: {item.quantity}</span>
                                                <span className="text-sm font-bold text-white">₹{(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 pt-4 border-t border-white/10">
                                <div className="flex justify-between text-white/70">
                                    <span>Subtotal</span>
                                    <span>₹{totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/70">
                                    <span>Shipping</span>
                                    <span className="text-cyan-400">Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-white pt-2">
                                    <span>Total</span>
                                    <span>₹{totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Payment Security Badge */}
                            <div className="my-6 p-3 bg-cyan-500/10 rounded-lg flex items-center justify-center gap-2 text-cyan-300 text-xs font-bold border border-cyan-500/20">
                                <ShieldCheck size={16} />
                                <span>SSL SECURE PAYMENT</span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={!!zipError || isVerifyingZip}
                                className={`w-full py-4 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 transform 
                                    ${zipError || isVerifyingZip
                                        ? 'bg-gray-600 cursor-not-allowed opacity-50 shadow-none'
                                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-95'}`}
                            >
                                {isVerifyingZip ? 'Verifying Address...' : 'Place Order'}
                            </button>

                            <p className="text-center text-[10px] text-white/30 mt-4">
                                By placing this order, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
