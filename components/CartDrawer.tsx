'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
    const { isCartOpen, closeCart, items, removeItem, addItem, decreaseItem, totalItems, totalPrice } = useCart();
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleCheckout = () => {
        closeCart();
        if (status === 'authenticated') {
            router.push('/checkout');
        } else {
            router.push('/auth/signup');
        }
    };

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md bg-slate-950 border-l border-white/10 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-900 rounded-xl border border-white/10">
                                    <ShoppingBag size={20} className="text-cyan-400" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Your Cart</h2>
                                <span className="text-xs font-mono text-cyan-200/50 bg-white/5 px-2 py-1 rounded">
                                    {totalItems} ITEMS
                                </span>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                    <ShoppingBag size={48} className="text-white/20" />
                                    <p className="text-white/40">Your cart is empty</p>
                                    <button
                                        onClick={closeCart}
                                        className="text-cyan-400 text-sm hover:underline"
                                    >
                                        Browse Products
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                        {/* Image Placeholder */}
                                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-900 to-black border border-white/10 flex items-center justify-center relative overflow-hidden shrink-0">
                                            {/* We can use the actual image later if stored in item, or generic based on id */}
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/${item.image || 'bluora.png'}`}
                                                alt={item.title}
                                                className="h-20 mb-2 w-auto object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-white">{item.title}</h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-white/20 hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-cyan-200/60 font-mono mt-1">{item.size}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/10">
                                                    <button
                                                        onClick={() => decreaseItem(item.id)}
                                                        className="p-1 hover:text-white text-white/50 transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-bold w-8 text-center text-white bg-white/5 py-0.5 rounded">{item.quantity}</span>
                                                    <button
                                                        onClick={() => addItem({ ...item })}
                                                        className="p-1 hover:text-white text-white/50"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-white">₹{(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 bg-slate-900/50 border-t border-white/10 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-white/60">
                                        <span>Subtotal</span>
                                        <span>₹{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-white/60">
                                        <span>Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10">
                                        <span>Total</span>
                                        <span className="text-cyan-400">₹{totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                                >
                                    Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
