'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, MotionValue } from 'framer-motion';

interface ScrollImageSequenceProps {
    totalFrames: number;
    folderPath: string;
    filePrefix: string;
    fileExtension: string;
    // Mask props (Optional)
    maskFolderPath?: string;
    maskFilePrefix?: string;
    maskFileExtension?: string;
    singleMaskPath?: string; // New: Static mask for all frames

    videoX: MotionValue<string>;
    videoY: MotionValue<string>;
    videoScale: MotionValue<number>;
    className?: string;
    videorotate: MotionValue<number>;
    scrollEndThreshold?: number;
}

export default function ScrollImageSequence({
    totalFrames,
    folderPath,
    filePrefix,
    fileExtension,
    maskFolderPath,
    maskFilePrefix = "mask-", // Default prefix
    maskFileExtension = "png", // Default to png (supports alpha)
    singleMaskPath,
    videoX,
    videoY,
    videorotate,
    videoScale,
    className,
    scrollEndThreshold = 1
}: ScrollImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<{ color: HTMLImageElement; mask: HTMLImageElement | null }[]>([]);
    const [singleMask, setSingleMask] = useState<HTMLImageElement | null>(null);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Preload all images
    useEffect(() => {
        const preloadImages = async () => {

            // 1. Load Single Mask (if provided)
            let loadedSingleMask: HTMLImageElement | null = null;
            if (singleMaskPath) {
                try {
                    loadedSingleMask = await new Promise((resolve, reject) => {
                        const img = document.createElement('img');
                        img.src = singleMaskPath;
                        img.onload = () => resolve(img);
                        img.onerror = reject;
                    });
                    setSingleMask(loadedSingleMask);
                } catch (e) {
                    console.error("Failed to load single mask:", singleMaskPath);
                }
            }

            const promises = [];

            for (let i = 1; i <= totalFrames; i++) {
                const frameNumber = String(i).padStart(3, '0');

                // Load Color Image
                const colorPath = `${folderPath}${filePrefix}${frameNumber}.${fileExtension}`;
                const colorPromise = new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = document.createElement('img');
                    img.src = colorPath;
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        console.error('Failed to load:', colorPath);
                        reject();
                    };
                });

                // Load Sequence Mask (Only if single mask is NOT used and folder is provided)
                let maskPromise: Promise<HTMLImageElement | null> = Promise.resolve(null);
                if (!singleMaskPath && maskFolderPath) {
                    const maskPath = `${maskFolderPath}${maskFilePrefix}${frameNumber}.${maskFileExtension}`;
                    maskPromise = new Promise<HTMLImageElement | null>((resolve) => {
                        const img = document.createElement('img');
                        img.src = maskPath;
                        img.onload = () => resolve(img);
                        img.onerror = () => resolve(null);
                    });
                }

                promises.push(Promise.all([colorPromise, maskPromise]));
            }

            try {
                const results = await Promise.all(promises);
                // Map results
                const frames = results.map(([color, mask]) => ({ color, mask }));
                setImages(frames);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading frames:', error);
            }
        };

        preloadImages();
    }, [totalFrames, folderPath, filePrefix, fileExtension, maskFolderPath, maskFilePrefix, maskFileExtension, singleMaskPath]);

    // Handle scroll and render frames
    useEffect(() => {
        if (isLoading || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        let rafId: number;

        const render = () => {
            const scrollTop = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            const rawFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
            const scrollFraction = Math.min(1, rawFraction / scrollEndThreshold);

            const frameIndex = Math.min(
                Math.floor(scrollFraction * totalFrames),
                totalFrames - 1
            );

            if (frameIndex !== currentFrame) {
                setCurrentFrame(frameIndex);

                const frame = images[frameIndex];

                if (frame && frame.color && frame.color.complete) {
                    const { color } = frame;
                    // Use single mask if available, otherwise frame mask
                    const mask = singleMask || frame.mask;

                    // Resize canvas to match image
                    canvas.width = color.naturalWidth;
                    canvas.height = color.naturalHeight;

                    // Clear
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    // 1. Draw Color Image (Base)
                    context.globalCompositeOperation = 'source-over';
                    context.drawImage(color, 0, 0, color.naturalWidth, color.naturalHeight);

                    // 2. Apply Mask (Cutout)
                    // 'destination-in': Keeps content where source (mask) is non-transparent. 
                    // Everything else becomes transparent.
                    if (mask && mask.complete) {
                        context.globalCompositeOperation = 'destination-in';
                        context.drawImage(mask, 0, 0, mask.naturalWidth, mask.naturalHeight);
                    }

                    // Reset for next frame safety
                    context.globalCompositeOperation = 'source-over';
                }
            }

            rafId = requestAnimationFrame(render);
        };

        rafId = requestAnimationFrame(render);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isLoading, images, currentFrame, totalFrames, scrollEndThreshold, singleMask]);

    if (isLoading) {
        return (
            <div className={`${className} flex items-center justify-center`}>
                <div className="text-white text-sm">Loading...</div>
            </div>
        );
    }

    return (
        <motion.canvas
            ref={canvasRef}
            style={{
                x: videoX,
                y: videoY,
                scale: videoScale,
                willChange: 'transform',
                width: '100%',
                height: '100%',
                rotateZ: videorotate,
                objectFit: 'contain'
            }}
            className={className}
        />
    );
}
