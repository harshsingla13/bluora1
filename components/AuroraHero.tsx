'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, Engine, ISourceOptions } from '@tsparticles/engine';

export default function AuroraHero() {
    const [init, setInit] = useState(false);

    // Initialize particles engine
    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // console.log(container);
    };

    const premiumBubblesConfig: ISourceOptions = {
        fullScreen: { enable: false }, // confined to the div
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        particles: {
            color: { value: "#ffffff" },
            move: {
                enable: true,
                direction: "top", // Strictly moving up
                speed: 1, // Very slow
                random: false,
                straight: false,
                outModes: { default: "out" },
            },
            number: {
                density: { enable: true, width: 800, height: 800 }, // Corrected density prop
                value: 80, // Fewer particles = more premium
            },
            opacity: {
                value: 0.3,
                animation: {
                    enable: true,
                    speed: 0.5,
                    sync: false,
                    destroy: "none",
                    startValue: "random"
                }
            },
            shape: { type: "circle" },
            size: {
                value: { min: 1, max: 3 }, // Very small micro-bubbles
            },
        },
        detectRetina: true,
    };

    return (
        <div className="relative w-full h-screen bg-[#020617] overflow-hidden flex items-center justify-center">

            {/* 1. The Aurora Mesh - Moving Gradients */}
            <div className="absolute inset-0 z-0 opacity-40">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-500 rounded-full blur-[120px] mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        x: [0, 100, 0],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-400 rounded-full blur-[100px] mix-blend-screen"
                />
            </div>

            {/* 2. Particles Layer */}
            {init && (
                <div className="absolute inset-0 z-5 pointer-events-none">
                    <Particles
                        id="tsparticles"
                        particlesLoaded={particlesLoaded}
                        options={premiumBubblesConfig}
                        className="w-full h-full"
                    />
                </div>
            )}

            {/* Content Slot / Children can be placed here if needed, but for now this is just background/hero */}
        </div>
    );
}
