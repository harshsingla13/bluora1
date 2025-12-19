'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import { Database, Droplet, Star, ShoppingCart } from 'lucide-react';
import Particles from '../../components/Particles';
import SpotlightCard from '../../components/SpotlightCard';
import { useCart } from '../../context/CartContext';

// We'll define the interface to match our Schema
interface Product {
    _id: string; // MongoDB adds this
    id: string;  // Our custom ID (250ml etc)
    size: string;
    title: string;
    description: string;
    icon: string; // Stored as string name in DB
    color: string;
    gradient: string;
    border: string;
    spotlight: string;
    price: number;
    image: string;
}

// Map string icon names to components
const iconMap: { [key: string]: React.ElementType } = {
    'Star': Star,
    'Droplet': Droplet,
    'Database': Database
};

export default function ProductsPage() {
    const { addItem } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </main>
        );
    }

    if (products.length === 0) {
        return (
            <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center flex-col gap-4 relative z-0">
                <Header />
                <div className="flex flex-col items-center justify-center mt-20">
                    <div className="text-3xl font-bold text-white z-10">No products available</div>
                    <p className="text-white/60 z-10">Please add products to your database.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-300 selection:text-black overflow-x-hidden">
            <Header />

            {/* Background Effects */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-black opacity-80" />
                <Particles
                    particleColors={['#06b6d4', '#3b82f6', '#a855f7']}
                    particleCount={100}
                    particleSpread={5}
                    speed={0.2}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={true}
                    disableRotation={false}
                />
            </div>

            <div className="relative z-10 pt-24 pb-16 px-4 max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
                        Our Collection
                    </h1>
                    <p className="text-lg text-cyan-100/60 max-w-2xl mx-auto">
                        Pure hydration tailored to every need. Choose the perfect size for your lifestyle.
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                    {products.map((product, index) => {
                        const IconComponent = iconMap[product.icon] || Star;

                        return (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
                                className="h-[600px]"
                            >
                                <SpotlightCard
                                    className={`group relative h-full flex flex-col justify-between p-6 rounded-3xl border ${product.border} bg-gradient-to-br ${product.gradient} backdrop-blur-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-500`}
                                    spotlightColor={product.spotlight as `rgba(${number}, ${number}, ${number}, ${number})`}
                                >
                                    {/* Hover Glow Effect */}
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 pointer-events-none`} />

                                    {/* Content Top */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1 mt-1">{product.title}</h3>
                                        <p className="text-white/60 text-xs leading-relaxed line-clamp-2">{product.description}</p>
                                    </div>

                                    {/* Center Visual */}
                                    <div className="flex-1 flex items-center justify-center relative">
                                        <div className={`w-24 h-36 bg-gradient-to-b ${product.color} opacity-20 rounded-full blur-2xl absolute`} />

                                        {/* Big Size Text Behind Image */}
                                        <span className={`absolute font-black text-white/5 select-none pointer-events-none z-0 tracking-tighter ${product.size === '1L' ? 'text-[250px] tracking-wider' : 'text-[130px]'}`}>
                                            {product.size}
                                        </span>

                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/${product.image}`}
                                            alt={product.title}
                                            className={`relative z-10 w-auto object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105 transition-transform duration-500 ${product.size === '1L' ? 'h-82' : product.size === '500ml' ? 'h-72' : 'h-56'
                                                }`}
                                        />
                                    </div>

                                    {/* Bottom Features */}
                                    <div className="space-y-2 pt-4 border-t border-white/5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-bold text-white">₹{product.price}</span>
                                            <span className="text-xs font-mono text-cyan-200/50">IN STOCK</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => addItem({
                                            id: product.id,
                                            title: product.title,
                                            size: product.size,
                                            price: product.price,
                                            image: product.image
                                        })}
                                        className="mt-4 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40"
                                    >
                                        <ShoppingCart size={16} />
                                        Add to Cart
                                    </button>
                                </SpotlightCard>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </main>
    );
}
