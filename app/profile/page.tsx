'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Particles from '../../components/Particles';
import { User, Package, LogOut, Calendar, MapPin, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
    title: string;
    size: string;
    price: number;
    quantity: number;
    image?: string;
}

interface Order {
    _id: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    shippingDetails: {
        address: string;
        city: string;
    };
    items: OrderItem[];
}

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    // Redirect if guest
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }
    }, [status, router]);

    // Fetch orders
    useEffect(() => {
        if (session?.user?.email) {
            fetch(`/api/orders?email=${session.user.email}`)
                .then(res => res.json())
                .then(data => {
                    setOrders(data.orders || []);
                    setLoadingOrders(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoadingOrders(false);
                });
        }
    }, [session]);

    if (status === 'loading') {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    }

    if (!session) return null;

    const toggleOrder = (id: string) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white relative overflow-hidden pt-10 pb-12">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <Particles
                    particleColors={['#06b6d4', '#3b82f6', '#22d3ee']}
                    particleCount={150}
                    speed={0.05}
                />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back</span>
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* LEFT: User Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full md:w-1/3 space-y-6"
                    >
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-cyan-500/20 mb-4">
                                {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1">{session.user?.name || 'User'}</h2>
                            <p className="text-white/60 text-sm mb-6">{session.user?.email || ''}</p>

                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 hover:text-red-300 transition-all font-bold"
                            >
                                <LogOut size={18} />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>

                    {/* RIGHT: Order History */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full md:w-2/3"
                    >
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Package className="text-cyan-400" />
                            My Orders
                        </h2>

                        {loadingOrders ? (
                            <div className="text-center py-10 text-white/50">Loading orders...</div>
                        ) : orders.length === 0 ? (
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
                                <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
                                <p className="text-white/60 mb-6">Start your journey with premium hydration.</p>
                                <Link href="/products" className="inline-block px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all">
                                    Browse Products
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:bg-white/10">
                                        <div
                                            onClick={() => toggleOrder(order._id)}
                                            className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-mono text-cyan-300 font-bold">#{order._id.slice(-6).toUpperCase()}</span>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/20' :
                                                        order.status === 'Delivered' ? 'bg-green-500/20 text-green-300 border border-green-500/20' :
                                                            'bg-white/10 text-white/70'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs text-white/50">
                                                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                                    <span className="flex items-center gap-1"><Package size={12} /> {order.items.length} Items</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-6">
                                                <span className="text-xl font-bold text-white">₹{order.totalAmount.toFixed(2)}</span>
                                                {expandedOrder === order._id ? <ChevronUp className="text-white/50" /> : <ChevronDown className="text-white/50" />}
                                            </div>
                                        </div>

                                        {/* Expanded Details */}
                                        {expandedOrder === order._id && (
                                            <div className="px-6 pb-6 pt-0 border-t border-white/10 bg-black/20">
                                                <div className="mt-4 grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Items</h4>
                                                        <div className="space-y-3">
                                                            {order.items.map((item, idx) => (
                                                                <div key={idx} className="flex gap-3">
                                                                    <div className="w-10 h-10 bg-white/5 rounded-md flex items-center justify-center shrink-0">
                                                                        {item.image ? (
                                                                            <img src={item.image} alt={item.title} className="w-full h-full object-contain p-0.5" />
                                                                        ) : (
                                                                            <div className="text-[8px] text-white/20">IMG</div>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-white">{item.title}</p>
                                                                        <p className="text-xs text-white/50">{item.size} x {item.quantity}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Shipping To</h4>
                                                        <div className="flex items-start gap-2 text-sm text-white/70">
                                                            <MapPin size={16} className="mt-0.5 text-cyan-500/70" />
                                                            <p>
                                                                {order.shippingDetails.address},<br />
                                                                {order.shippingDetails.city}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
