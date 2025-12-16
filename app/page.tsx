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
import AuroraHero from '../components/AuroraHero';

export default function BluoraLandingVideo() {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Bottle animations - NO MOVING UP
    const videoX = useTransform(scrollYProgress, [0, 0.5], ["-2%", "20%"]);
    const videoY = useTransform(scrollYProgress, [0, 0.5], ["3%", "1%"]);
    const videoScale = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.3]);
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

            {/* HERO SECTION CONTAINER - WRAPPED IN AURORA HERO */}
            <div className="relative w-full h-[200vh]">

                {/* Fixed Background Layer */}
                <div className="fixed inset-0 z-0">
                    <AuroraHero />
                </div>

                {/* Scrollable Content Container */}
                <div ref={containerRef} className="relative z-10 text-white h-[200vh] selection:bg-cyan-300 selection:text-black">

                    {/* Placeholder for ref height tracking - removed absolute, kept as flow content if needed, but height on parent is better */}

                    {/* Radial Spotlight Behind Bottle */}
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-400/30 via-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none z-10"></div>

                    {/* Main Content Container */}
                    <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">

                        {/* HERO SECTION */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">

                            {/* DESKTOP LAYOUT - Horizontal */}
                            <motion.div
                                style={{ opacity: textOpacity }}
                                className="hidden md:flex relative items-center justify-center gap-2 md:gap-4 px-4"
                            >
                                <h1 className="text-[10rem] z-10 md:text-[18rem] font-black tracking-tighter text-white drop-shadow-2xl select-none -mr-13 md:-mr-16">
                                    BLU
                                </h1>
                                <div className="w-[200px] md:w-[350px]"></div>
                                <h1 className="text-[10rem] md:text-[18rem] font-black tracking-tighter text-white drop-shadow-2xl select-none -ml-8 md:-ml-16">
                                    ORA
                                </h1>
                            </motion.div>

                            {/* MOBILE LAYOUT - Magazine Cover Style */}
                            {/* Background Text Layer - Fills the empty space */}
                            <motion.div
                                style={{ opacity: textOpacity }}
                                className="md:hidden absolute inset-0 flex flex-col justify-between py-24 z-10 overflow-hidden pointer-events-none"
                            >
                                {/* Giant BLU - Top Half */}
                                <div className="flex flex-col items-center">
                                    <h1 className="text-[35vw] mt-12 font-black leading-none tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent select-none scale-y-125 transform origin-bottom">
                                        BLU
                                    </h1>
                                    {/* Premium Badge floating near BLU */}
                                    <div className="mt-[-20px] px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-md">
                                        <p className="text-cyan-300 text-[10px] font-bold tracking-[0.3em] uppercase">Premium Hydration</p>
                                    </div>
                                </div>

                                {/* Giant ORA - Bottom Half */}
                                <div className="flex flex-col items-center">
                                    <h1 className="text-[35vw] font-black leading-none tracking-wider text-transparent bg-clip-text bg-linear-to-t from-white/20 to-transparent select-none scale-y-125 transform origin-top">
                                        ORA
                                    </h1>
                                    {/* Tagline anchoring the bottom */}
                                    <p className="mt-[-20px] mb-16 text-cyan-100/60 text-xs font-medium tracking-widest uppercase">
                                        The Power of Pure
                                    </p>
                                </div>
                            </motion.div>

                            {/* Center: Bottle */}
                            <div className="absolute z-30 flex items-center justify-center">
                                <ScrollImageSequence
                                    totalFrames={40}
                                    folderPath={`${basePath}/bg/`}
                                    filePrefix="ezgif-frame-"
                                    fileExtension="png"
                                    videoX={videoX}
                                    videoY={videoY}
                                    videorotate={videorotate}
                                    videoScale={videoScale}
                                    className="max-w-full max-h-full drop-shadow-[0_0_120px_rgba(6,182,212,0.8)] md:block hidden"
                                    scrollEndThreshold={0.6}
                                />
                                {/* Mobile: Static centered bottle - Crystal Layout Hero Scale */}
                                <ScrollImageSequence
                                    totalFrames={40}
                                    folderPath={`${basePath}/bg/`}
                                    filePrefix="ezgif-frame-"
                                    fileExtension="png"
                                    videoX={useTransform(scrollYProgress, [0, 1], ["0%", "-3%"])}
                                    videoY={useTransform(scrollYProgress, [0, 1], ["3%", "-4%"])}
                                    videorotate={useTransform(scrollYProgress, [0, 1], [7, 0])}
                                    videoScale={useTransform(scrollYProgress, [0, 0.6], [0.7, 0.8])}
                                    className="max-w-full max-h-full drop-shadow-[0_0_120px_rgba(6,182,212,0.8)] brightness-84 md:hidden block opacity-100 z-30"
                                    scrollEndThreshold={0.5}
                                />
                            </div>

                            {/* Subtitle - Desktop Only now since mobile has it integrated */}
                            <motion.div
                                style={{ opacity: textOpacity }}
                                className="hidden md:block absolute bottom-[10%] text-center z-30 px-4"
                            >
                                <p className="text-lg sm:text-2xl md:text-4xl font-bold text-cyan-100 tracking-wide drop-shadow-lg">
                                    THE POWER OF PURE
                                </p>
                            </motion.div>

                            {/* Floating Water Bubbles */}
                            <motion.div style={{ opacity: textOpacity }} className="hidden sm:block">
                                <motion.img
                                    src={`${basePath}/bubble3.webp`}
                                    alt="Water Bubble"
                                    className="absolute top-[10%] left-[5%] sm:left-[10%] w-16 sm:w-24 md:w-40 opacity-60"
                                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.img
                                    src={`${basePath}/bubble4.png`}
                                    alt="Water Bubble"
                                    className="absolute top-[15%] right-[5%] sm:right-[8%] w-14 sm:w-20 md:w-32 opacity-50"
                                    animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                />
                                <motion.img
                                    src={`${basePath}/bubble3.webp`}
                                    alt="Water Bubble"
                                    className="absolute bottom-[20%] z-0 left-[5%] sm:left-[15%] w-12 sm:w-16 md:w-28 opacity-40"
                                    animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                />
                                <motion.img
                                    src={`${basePath}/bubble4.png`}
                                    alt="Water Bubble"
                                    className="absolute bottom-[25%] right-[5%] sm:right-[12%] w-14 sm:w-20 md:w-36 opacity-30"
                                    animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
                                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                />
                            </motion.div>
                        </div>

                        {/* GLOWING CONNECTING LINES - DESKTOP ONLY */}
                        <motion.svg
                            style={{ opacity: contentOpacity }}
                            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-28"
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

                        {/* MOBILE ONLY - Small Cards Around Bottle */}
                        {/* Magazine Style Background Text for Mission/Vision Section */}
                        <motion.div
                            style={{ opacity: contentOpacity }}
                            className="md:hidden absolute inset-0 flex flex-col justify-between z-10 overflow-hidden pointer-events-none"
                        >
                            {/* Giant PURE - Top Half */}
                            <div className="flex flex-col items-center">
                                <h1 className="text-[35vw] font-black  tracking-widest text-transparent bg-clip-text bg-linear-to-b from-cyan-500/10 to-transparent select-none scale-y-125 transform">
                                    PURE
                                </h1>
                            </div>

                            {/* Giant LIFE - Bottom Half */}
                            <div className="flex flex-col items-center">
                                <h1 className="text-[35vw] pb-28 font-black leading-none tracking-widest text-transparent bg-clip-text bg-linear-to-t from-blue-100/10 to-transparent select-none scale-y-125 transform">
                                    LIFE
                                </h1>
                            </div>
                        </motion.div>

                        <motion.div
                            style={{ opacity: contentOpacity }}
                            className="md:hidden absolute inset-0 z-20 pointer-events-none"
                        >
                            {/* 1. MISSION - Top Left */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="absolute top-[6%] left-3 w-[280px] z-20 pointer-events-auto"
                            >
                                <div className="bg-gradient-to-br from-slate-900/90 to-cyan-950/90 backdrop-blur-sm rounded-2xl p-5 border border-cyan-500/30 shadow-[0_0_40px_rgba(0,0,0,0.4)] transform -rotate-2">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-cyan-500/20 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                                                <Target size={24} className="text-cyan-300" />
                                            </div>
                                            <h4 className="text-white font-black text-sm tracking-widest uppercase">MISSION</h4>
                                        </div>
                                        <p className="text-white/80 text-xs leading-relaxed">
                                            Delivering safe, pure hydration to empower healthy living for every individual.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 2. VISION - Mid Right - Shifted Up */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="absolute top-[28%] right-3 w-[280px] z-0 pointer-events-auto"
                            >
                                <div className="bg-gradient-to-br from-slate-900/90 to-blue-950/90 backdrop-blur-sm rounded-2xl p-5 border border-blue-500/30 shadow-[0_0_40px_rgba(0,0,0,0.4)] transform rotate-2">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-blue-500/20 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                                                <Eye size={24} className="text-blue-300" />
                                            </div>
                                            <h4 className="text-white font-black text-sm tracking-widest uppercase">VISION</h4>
                                        </div>
                                        <p className="text-white/80 text-xs leading-relaxed">
                                            To be the most trusted name in pure water, present in every home worldwide.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 3. VALUES - Bottom Left */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="absolute bottom-[27%] left-3 w-[280px]  pointer-events-auto -rotate-2"
                            >
                                <div className="bg-gradient-to-br from-slate-900/90 to-purple-950/90 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/30 shadow-[0_0_40px_rgba(0,0,0,0.4)] transform">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-purple-500/20 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                                                <Gem size={24} className="text-purple-300" />
                                            </div>
                                            <h4 className="text-white font-black text-sm tracking-widest uppercase">VALUES</h4>
                                        </div>
                                        <p className="text-white/80 text-xs leading-relaxed">
                                            Uncompromised quality, unwavering integrity, and absolute transparency in everything we do.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* DESKTOP ONLY - TILTED CARDS ON LEFT */}
                        <motion.div
                            style={{ opacity: contentOpacity, x: contentX }}
                            className="hidden md:flex absolute left-8 md:left-24 top-[15%] flex-col gap-5 z-30"
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
            </div>

            {/* ABOUT SECTION - Magazine Style */}
            <section className="relative z-50 min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white pt-6 overflow-hidden">

                {/* Particles Background */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <Particles
                        particleColors={['#06b6d4', '#3b82f6']}
                        particleCount={150}
                        particleSpread={8}
                        speed={0.1}
                        particleBaseSize={80}
                        moveParticlesOnHover={true}
                        alphaParticles={true}
                        disableRotation={false}
                    />
                </div>

                {/* Giant Background Text - ABOUT */}
                <div className="absolute inset-0 flex items-center justify-center z-5 pointer-events-none overflow-hidden">
                    <h1 className="text-[40vw] md:text-[30vw] font-black text-transparent bg-clip-text bg-linear-to-b from-cyan-500/5 to-transparent select-none leading-none">
                        ABOUT
                    </h1>
                </div>

                {/* MOBILE LAYOUT - Vertical Stack Style */}
                <div className="md:hidden relative z-10 px-4 py-12">

                    {/* Mobile Title */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-6xl font-black text-white mb-3">
                            Bluora
                        </h2>
                        <div className="h-1 w-16 bg-cyan-400 mx-auto rounded-full mb-3"></div>
                        <p className="text-sm text-white/70">Premium Packaged Drinking Water</p>
                    </motion.div>

                    {/* Mobile Cards - Vertical Stack */}
                    <div className="space-y-4 max-w-md mx-auto">

                        {/* Manufacturer Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-3xl p-6 border border-cyan-400/20"
                        >
                            <div className="flex flex-col items-center text-center mb-4">
                                <div className="p-4 bg-cyan-500/20 rounded-2xl mb-3">
                                    <Factory size={32} className="text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-black text-white">MANUFACTURER</h3>
                            </div>
                            <div className="space-y-3 text-sm text-center">
                                <p className="text-white font-bold text-base">HD DRINKS & BEVERAGES</p>
                                <p className="text-white/70 text-xs leading-relaxed">
                                    Arazi No. 453, Sachendi<br />
                                    Kanpur Nagar, UP - 209304
                                </p>
                                <div className="pt-2 border-t border-white/10">
                                    <p className="text-cyan-300 font-mono text-xs">FSSAI LIC. NO.</p>
                                    <p className="text-white/90 font-mono text-xs">12724999000167</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Product Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-md rounded-3xl p-6 border border-blue-400/20"
                        >
                            <div className="flex flex-col items-center text-center mb-4">
                                <div className="p-4 bg-blue-500/20 rounded-2xl mb-3">
                                    <Droplet size={32} className="text-blue-400" />
                                </div>
                                <h3 className="text-xl font-black text-white">PRODUCT</h3>
                            </div>
                            <div className="space-y-2.5 text-sm">
                                <div className="bg-white/5 rounded-xl p-3">
                                    <p className="text-blue-300 text-xs mb-1">Water Type</p>
                                    <p className="text-white font-semibold">Packaged Drinking Water</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3">
                                    <p className="text-blue-300 text-xs mb-1">Treatment</p>
                                    <p className="text-white">RO • UV • Ozonised</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3">
                                    <p className="text-blue-300 text-xs mb-1">Available Sizes</p>
                                    <p className="text-white font-semibold">250ml • 500ml • 1L</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-purple-600/20 via-cyan-600/20 to-blue-600/20 backdrop-blur-md rounded-3xl p-6 border border-purple-400/30 text-center"
                        >
                            <div className="mb-4">
                                <div className="inline-block p-4 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full mb-3">
                                    <Mail size={28} className="text-cyan-300" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2">Get In Touch</h3>
                                <p className="text-white/60 text-xs">We're here to help</p>
                            </div>
                            <div className="space-y-2 mb-4">
                                <a
                                    href="mailto:Info@hddrinksbeverages.com"
                                    className="block text-cyan-300 hover:text-cyan-200 transition-colors text-sm font-semibold"
                                >
                                    Info@hddrinksbeverages.com
                                </a>
                                <a
                                    href="tel:+916239190187"
                                    className="block text-cyan-300 hover:text-cyan-200 transition-colors text-sm font-semibold"
                                >
                                    +91 6239 190187
                                </a>
                            </div>
                            <Link href="/contact">
                                <motion.button
                                    className="w-full px-6 py-3.5 bg-linear-to-r from-cyan-600 via-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Contact Us →
                                </motion.button>
                            </Link>
                        </motion.div>

                    </div>
                </div>

                {/* DESKTOP LAYOUT - Magazine Style */}
                <div className="hidden md:block relative z-10 max-w-6xl mx-auto px-4 md:px-8">

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-4 md:mb-10"
                    >
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-white">
                            Bluora
                        </h2>
                        <p className="text-lg md:text-xl text-cyan-100/70 max-w-xl mx-auto">
                            Premium Packaged Drinking Water
                        </p>
                        <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                    </motion.div>

                    {/* Info Cards - Compact Glass Style */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

                        {/* Manufacturer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-900/90 rounded-2xl p-6 border border-white/10"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-cyan-500/20 rounded-lg">
                                    <Factory size={20} className="text-cyan-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Manufacturer</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                <p className="text-white/90 font-semibold">HD DRINKS & BEVERAGES</p>
                                <p className="text-white/60 text-xs leading-relaxed">
                                    Arazi No. 453, Sachendi, Kanpur Nagar, Uttar Pradesh - 209304
                                </p>
                                <p className="text-cyan-300/80 font-mono text-xs">FSSAI LIC. NO. 12724999000167</p>
                            </div>
                        </motion.div>

                        {/* Product */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-slate-900/90 rounded-2xl p-6 border border-white/10"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-blue-500/20 rounded-lg">
                                    <Droplet size={20} className="text-blue-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Product Details</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="text-white/60 text-xs">Water Type: </span>
                                    <span className="text-white/90 font-semibold">Packaged Drinking Water</span>
                                </div>
                                <div>
                                    <span className="text-white/60 text-xs">Process: </span>
                                    <span className="text-white/90">RO, UV, Ozonised</span>
                                </div>
                                <div>
                                    <span className="text-white/60 text-xs">Sizes: </span>
                                    <span className="text-white/90">250ml, 500ml, 1L</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact CTA - Single Prominent Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="bg-slate-900/90 mb-4 rounded-2xl p-6 md:p-8 border border-white/10 text-center"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-4 bg-cyan-500/20 rounded-full">
                                <Mail size={32} className="text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black mb-2 text-white">Get In Touch</h3>
                                <p className="text-white/60 text-sm mb-4">Have questions? We're here to help.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <a
                                    href="mailto:Info@hddrinksbeverages.com"
                                    className="text-cyan-300 hover:text-cyan-200 transition-colors text-sm md:text-base font-semibold"
                                >
                                    Info@hddrinksbeverages.com
                                </a>
                                <span className="hidden sm:inline text-white/30">•</span>
                                <a
                                    href="tel:+916239190187"
                                    className="text-cyan-300 hover:text-cyan-200 transition-colors text-sm md:text-base font-semibold"
                                >
                                    +91 6239 190187
                                </a>
                            </div>
                            <Link href="/contact" className="mt-4">
                                <motion.button
                                    className="px-8 py-3 bg-linear-to-r from-cyan-600 via-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>Contact Us</span>
                                    <span>→</span>
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </section>
        </>
    );
}
