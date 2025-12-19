'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star, Droplet, Database, ShieldCheck, Truck, Zap } from 'lucide-react';
import Header from '../../../components/Header';
import Particles from '../../../components/Particles';
import { useCart } from '../../../context/CartContext';
import SpotlightCard from '../../../components/SpotlightCard';

// Reuse types/interfaces
interface Product {
    _id: string;
    id: string;
    size: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    gradient: string;
    border: string;
    spotlight: string;
    price: number;
    image: string;
}

const iconMap: { [key: string]: React.ElementType } = {
    'Star': Star,
    'Droplet': Droplet,
    'Database': Database
};

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addItem } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!params.id) return;
            try {
                const res = await fetch(`/api/products/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                } else {
                    console.error("Product not found");
                }
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center flex-col gap-4">
                <Header />
                <h1 className="text-2xl font-bold">Product Not Found</h1>
                <button onClick={() => router.back()} className="text-cyan-400 hover:underline">
                    Go Back
                </button>
            </main>
        );
    }

    const IconComponent = iconMap[product.icon] || Star;

    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-300 selection:text-black overflow-x-hidden">
            <Header />

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-black opacity-80" />
                <Particles
                    particleColors={['#06b6d4', '#3b82f6', '#a855f7']}
                    particleCount={60}
                    particleSpread={5}
                    speed={0.2}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={true}
                    disableRotation={false}
                />
            </div>

            <div className="relative z-10 pt-28 pb-16 px-4 max-w-7xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Collection
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Visual - Cleaned up */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative h-[600px] w-full flex items-center justify-center"
                    >


                        <SpotlightCard
                            className="relative w-full h-full rounded-[3rem] p-8 flex items-center justify-center overflow-hidden !bg-transparent !border-none"
                            spotlightColor={product.spotlight as `rgba(${number}, ${number}, ${number}, ${number})`}
                        >
                            <motion.img
                                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/${product.image}`}
                                alt={product.title}
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="relative z-10 h-4/5 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            />
                        </SpotlightCard>
                    </motion.div>

                    {/* Right: Details - Redesigned */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col justify-center space-y-10 py-8"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-linear-to-r ${product.color} bg-opacity-20`}>
                                    <IconComponent className="text-white" size={20} />
                                </div>
                                <span className="text-sm font-bold tracking-[0.2em] uppercase text-cyan-400">
                                    {product.size} Edition
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
                                {product.title}
                            </h1>
                            <p className="text-lg text-slate-400 leading-relaxed max-w-xl font-light">
                                {product.description}
                            </p>
                        </div>

                        {/* Price & Features Row */}
                        <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-8">
                                <div className="space-y-1">
                                    <span className="text-xs text-white/30 font-bold uppercase tracking-widest">Price</span>
                                    <span className="text-5xl font-bold text-white tracking-tight">₹{product.price}</span>
                                </div>
                                <div className="h-12 w-px bg-white/10" />
                                <div className="space-y-1">
                                    <span className="text-xs text-white/30 font-bold uppercase tracking-widest">Availability</span>
                                    <span className="text-sm font-bold text-emerald-400 flex items-center gap-2 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        In Stock
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Area */}
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => addItem({
                                    id: product.id,
                                    title: product.title,
                                    size: product.size,
                                    price: product.price,
                                    image: product.image
                                })}
                                className="group w-full md:w-auto px-8 py-5 rounded-2xl bg-white text-black font-bold text-lg tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
                            >
                                <ShoppingCart size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                                <span>Add to Cart</span>
                            </button>
                            <p className="text-center md:text-left text-xs text-white/30 flex items-center gap-2 justify-center md:justify-start">
                                <ShieldCheck size={14} />
                                30-Day Money Back Guarantee
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
