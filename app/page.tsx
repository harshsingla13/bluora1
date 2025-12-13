'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Eye, Gem, MapPin, Shield, Mail, Factory, Droplet, Phone } from 'lucide-react';
import ScrollImageSequence from '../components/ScrollImageSequence';
import Header from '../components/Header';
import LightRays from '../components/LightRays';
import TiltedCard from '../components/TiltedCard';
import Particles from '../components/Particles';
import Link from 'next/link';

export default function BluoraLandingVideo() {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Bottle animations - NO MOVING UP
    const videoX = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);
    const videoY = useTransform(scrollYProgress, [0, 0.5], ["0%", "1%"]);
    const videoScale = useTransform(scrollYProgress, [0, 0.6], [0.7, 0.6]);
    const videorotate = useTransform(scrollYProgress, [0, 0.6], [7, 0]);

    // Header fades
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Text fades but bottle stays
    const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    // Mission/Vision appears - STAYS VISIBLE (no fade out)
    const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
    const contentX = useTransform(scrollYProgress, [0.3, 0.5], [-50, 0]);

    return (
        <>
            {/* Fixed Glass Header */}
            <Header opacity={headerOpacity} />

            {/* HERO & MISSION SECTION */}
            <div ref={containerRef} className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-black text-white h-[200vh] overflow-x-hidden selection:bg-cyan-300 selection:text-black">

                {/* Light Rays Effect */}
                <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-5 overflow-hidden">
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#06b6d4"
                        raysSpeed={1.2}
                        lightSpread={0.6}
                        rayLength={1.5}
                        followMouse={false}
                        mouseInfluence={0}
                        noiseAmount={0.15}
                        distortion={0.08}
                        className="opacity-40"
                    />
                </div>

                {/* Radial Spotlight Behind Bottle */}
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-400/30 via-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none z-10"></div>

                {/* Main Content Container */}
                <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">

                    {/* HERO SECTION */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">

                        {/* Large Text */}
                        <motion.div
                            style={{ opacity: textOpacity }}
                            className="relative flex items-center justify-center gap-2 md:gap-4"
                        >
                            <h1 className="text-[10rem] z-10 md:text-[18rem] font-black tracking-tighter text-white drop-shadow-2xl select-none -mr-13 md:-mr-16">
                                BLU
                            </h1>
                            <div className="w-[200px] md:w-[350px]"></div>
                            <h1 className="text-[10rem] md:text-[18rem] font-black tracking-tighter text-white drop-shadow-2xl select-none -ml-8 md:-ml-16">
                                ORA
                            </h1>
                        </motion.div>

                        {/* Center: Bottle */}
                        <div className="absolute z-30 flex items-center justify-center">
                            <ScrollImageSequence
                                totalFrames={70}
                                folderPath={`${basePath}/bg/`}
                                filePrefix="ezgif-frame-"
                                fileExtension="png"
                                videoX={videoX}
                                videoY={videoY}
                                videorotate={videorotate}
                                videoScale={videoScale}
                                className="max-w-full max-h-full drop-shadow-[0_0_120px_rgba(6,182,212,0.8)] brightness-110 contrast-110"
                            />
                        </div>

                        {/* Subtitle */}
                        <motion.div
                            style={{ opacity: textOpacity }}
                            className="absolute bottom-[10%] text-center z-30"
                        >
                            <p className="text-2xl md:text-4xl font-bold text-cyan-100 tracking-wide drop-shadow-lg">
                                THE POWER OF PURE
                            </p>
                        </motion.div>

                        {/* Floating Water Bubbles */}
                        <motion.div style={{ opacity: textOpacity }}>
                            <motion.img
                                src={`${basePath}/bubble3.webp`}
                                alt="Water Bubble"
                                className="absolute top-[10%] left-[10%] w-24 md:w-40 opacity-60"
                                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.img
                                src={`${basePath}/bubble4.png`}
                                alt="Water Bubble"
                                className="absolute top-[15%] right-[8%] w-20 md:w-32 opacity-50"
                                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />
                            <motion.img
                                src={`${basePath}/bubble3.webp`}
                                alt="Water Bubble"
                                className="absolute bottom-[20%] z-0 left-[15%] w-16 md:w-28 opacity-40"
                                animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            />
                            <motion.img
                                src={`${basePath}/bubble4.png`}
                                alt="Water Bubble"
                                className="absolute bottom-[25%] right-[12%] w-20 md:w-36 opacity-30"
                                animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
                                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                            />
                        </motion.div>
                    </div>

                    {/* GLOWING CONNECTING LINES */}
                    <motion.svg
                        style={{ opacity: contentOpacity }}
                        className="absolute inset-0 w-full h-full pointer-events-none z-28"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1920 1080"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        <motion.path
                            d="M 520 250 Q 750 300, 1250 480"
                            stroke="#06b6d4"
                            strokeWidth="4"
                            fill="none"
                            filter="url(#glow-cyan)"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.7 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
                        />

                        <motion.path
                            d="M 520 600 Q 700 580, 1250 600"
                            stroke="#3b82f6"
                            strokeWidth="4"
                            fill="none"
                            filter="url(#glow-blue)"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.7 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                        />

                        <motion.path
                            d="M 520 900 Q 750 880, 1250 720"
                            stroke="#a855f7"
                            strokeWidth="4"
                            fill="none"
                            filter="url(#glow-purple)"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.7 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 2, delay: 0.7, ease: "easeInOut" }}
                        />

                        <motion.circle r="6" fill="#06b6d4" filter="url(#glow-cyan)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.3 }}>
                            <animateMotion dur="4s" repeatCount="indefinite" path="M 520 250 Q 750 300, 1250 480" begin="2.3s" />
                        </motion.circle>

                        <motion.circle r="6" fill="#3b82f6" filter="url(#glow-blue)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.5 }}>
                            <animateMotion dur="4s" repeatCount="indefinite" path="M 520 600 Q 700 580, 1250 600" begin="2.5s" />
                        </motion.circle>

                        <motion.circle r="6" fill="#a855f7" filter="url(#glow-purple)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.7 }}>
                            <animateMotion dur="4s" repeatCount="indefinite" path="M 520 900 Q 750 880, 1250 720" begin="2.7s" />
                        </motion.circle>
                    </motion.svg>

                    {/* TILTED CARDS - STAY VISIBLE */}
                    <motion.div
                        style={{ opacity: contentOpacity, x: contentX }}
                        className="absolute left-8 md:left-24 top-[15%] flex flex-col gap-5 z-30"
                    >
                        {/* Mission Card */}
                        <div className="rounded-2xl shadow-2xl pb-2">
                            <TiltedCard
                                imageSrc={`${basePath}/mission.webp`}
                                altText="Mission"
                                captionText=""
                                containerHeight="180px"
                                containerWidth="420px"
                                imageHeight="160px"
                                imageWidth="420px"
                                rotateAmplitude={10}
                                scaleOnHover={1.15}
                                showMobileWarning={false}
                                showTooltip={false}
                                displayOverlayContent={true}
                                overlayContent={
                                    <div className="p-8 bg-gradient-to-br from-cyan-500/95 via-cyan-600/95 to-blue-600/95 backdrop-blur-lg h-full flex flex-col justify-center rounded-2xl border border-cyan-400/20">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                                <Target size={28} className="text-white" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-white">Mission</h3>
                                        </div>
                                        <p className="text-white/95 text-sm leading-relaxed pl-1">
                                            Provide safe, refreshing, and high-quality hydration solutions that embody purity and trust.
                                        </p>
                                    </div>
                                }
                            />
                        </div>

                        {/* Vision Card */}
                        <div className="rounded-2xl pb-2 shadow-2xl">
                            <TiltedCard
                                imageSrc={`${basePath}/vision.jpg`}
                                altText="Vision"
                                captionText=""
                                containerHeight="180px"
                                containerWidth="420px"
                                imageHeight="160px"
                                imageWidth="420px"
                                rotateAmplitude={10}
                                scaleOnHover={1.15}
                                showMobileWarning={false}
                                showTooltip={false}
                                displayOverlayContent={true}
                                overlayContent={
                                    <div className="p-8 bg-gradient-to-br from-blue-500/95 via-blue-600/95 to-indigo-600/95 backdrop-blur-lg h-full flex flex-col justify-center rounded-2xl border border-blue-400/20">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                                <Eye size={28} className="text-white" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-white">Vision</h3>
                                        </div>
                                        <p className="text-white/95 text-sm leading-relaxed pl-1">
                                            Be the trusted name in every household, delivering uncompromising quality for generations.
                                        </p>
                                    </div>
                                }
                            />
                        </div>

                        {/* Values Card */}
                        <div className="rounded-2xl pb-2 shadow-2xl">
                            <TiltedCard
                                imageSrc={`${basePath}/va.webp`}
                                altText="Values"
                                captionText=""
                                containerHeight="180px"
                                containerWidth="420px"
                                imageHeight="160px"
                                imageWidth="420px"
                                rotateAmplitude={10}
                                scaleOnHover={1.15}
                                showMobileWarning={false}
                                showTooltip={false}
                                displayOverlayContent={true}
                                overlayContent={
                                    <div className="p-8 bg-gradient-to-br from-purple-500/95 via-purple-600/95 to-pink-600/95 backdrop-blur-lg h-full flex flex-col justify-center rounded-2xl border border-purple-400/20">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                                <Gem size={28} className="text-white" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-white">Values</h3>
                                        </div>
                                        <p className="text-white/95 text-sm leading-relaxed pl-1">
                                            Innovation, Responsibility, Trust & Quality - built on excellence, driven by integrity.
                                        </p>
                                    </div>
                                }
                            />
                        </div>
                    </motion.div>

                </div>

                {/* Scroll Progress Bar */}
                <motion.div
                    style={{ scaleY: scrollYProgress }}
                    className="fixed right-0 top-0 w-1 h-full bg-cyan-400 origin-top z-40"
                />

            </div>

            {/* ABOUT SECTION - MATCHING BACKGROUND + PARTICLES */}
            <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-black text-white pt-8 overflow-hidden">

                {/* Particles Background */}
                <div className="absolute inset-0 z-0 opacity-60">
                    <Particles
                        particleColors={['#06b6d4', '#3b82f6']}
                        particleCount={220}
                        particleSpread={8}
                        speed={0.12}
                        particleBaseSize={90}
                        moveParticlesOnHover={true}
                        alphaParticles={true}
                        disableRotation={false}
                    />
                </div>

                {/* Matching Radial Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-cyan-400/20 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-8">

                    {/* Section Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                            About Bluora
                        </h2>
                        <p className="text-xl text-cyan-100/80 max-w-2xl mx-auto">
                            Premium Packaged Drinking Water - The Power of Pure
                        </p>
                    </motion.div>

                    {/* Info Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">

                        {/* Manufacturer Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/20 shadow-2xl hover:scale-105 transition-transform duration-300"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-cyan-500/20 rounded-xl">
                                    <Factory size={32} className="text-cyan-400" />
                                </div>
                                <h3 className="text-3xl font-bold text-white">Manufacturer</h3>
                            </div>
                            <div className="space-y-4 text-cyan-50/90">
                                <p className="text-lg font-semibold">HD DRINKS & BEVERAGES</p>
                                <div className="flex items-start gap-3">
                                    <MapPin size={20} className="text-cyan-400 mt-1 flex-shrink-0" />
                                    <p>Arazi No. 453, Sachendi, Kanpur Nagar, Uttar Pradesh - 209304</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield size={20} className="text-cyan-400 flex-shrink-0" />
                                    <p className="font-mono">FSSAI LIC. NO. 12724999000167</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/20 shadow-2xl hover:scale-105 transition-transform duration-300"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-blue-500/20 rounded-xl">
                                    <Droplet size={32} className="text-blue-400" />
                                </div>
                                <h3 className="text-3xl font-bold text-white">Product Details</h3>
                            </div>
                            <div className="space-y-4 text-blue-50/90">
                                <div>
                                    <p className="text-sm text-blue-300 mb-1">Water Type</p>
                                    <p className="text-lg font-semibold">Packaged Drinking Water</p>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-300 mb-1">Treatment Process</p>
                                    <p>RO, Micron Filtered, UV Treated & Ozonised</p>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-300 mb-1">Available Sizes</p>
                                    <p className="font-semibold">250ml, 500ml, and 1L retail bottles</p>
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* Contact Info with Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/20 shadow-2xl"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-purple-500/20 rounded-xl">
                                    <Phone size={32} className="text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-purple-300 mb-1">For Enquiries</p>
                                    <a href="mailto:Info@hddrinksbeverages.com" className="text-xl font-semibold text-white hover:text-purple-300 transition-colors">
                                        Info@hddrinksbeverages.com
                                    </a>
                                    <p className="text-purple-100/70 text-sm mt-1">+91 6239 190187</p>
                                </div>
                            </div>
                            <Link href="/contact">
                                <motion.button
                                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-3 group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Mail size={20} />
                                    <span>Contact Us</span>
                                    <motion.span
                                        className="group-hover:translate-x-1 transition-transform"
                                    >
                                        →
                                    </motion.span>
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </section>
        </>
    );
}
