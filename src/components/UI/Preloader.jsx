import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ setLoading }) => {
    const [percent, setPercent] = useState(0);
    const [status, setStatus] = useState("Thinking Design...");

    useEffect(() => {
        const timer = setInterval(() => {
            setPercent(prev => {
                const nextPercent = prev + 1;

                if (nextPercent > 100) {
                    clearInterval(timer);
                    setTimeout(() => setLoading(false), 2000); // Longer delay to appreciate the 100% state
                    return 100;
                }

                if (nextPercent < 25) setStatus("Thinking Design...");
                else if (nextPercent < 50) setStatus("Crafting Solutions...");
                else if (nextPercent < 75) setStatus("Optimizing Experience...");
                else setStatus("Welcome to my World.");

                return nextPercent;
            });
        }, 30);

        return () => clearInterval(timer);
    }, [setLoading]);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{
                y: '-100%',
                transition: {
                    duration: 1.2,
                    ease: [0.76, 0, 0.24, 1], // Custom bezier for "curtain" effect
                    delay: 0.2
                }
            }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}
        >
            <div style={{
                marginBottom: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                position: 'relative'
            }}>
                <div style={{
                    fontSize: 'clamp(4rem, 15vw, 10rem)', // Massive responsive font
                    fontWeight: 900,
                    lineHeight: 0.8,
                    display: 'flex',
                    alignItems: 'flex-start',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.8)', // Outline text style
                    letterSpacing: '-0.05em',
                    position: 'relative'
                }}>
                    <span>{percent}</span>
                    <span style={{ fontSize: '0.4em', strokeWidth: 0, WebkitTextStroke: '0px' }}>%</span>

                    {/* Glow effect behind the number */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255,255,255,0.05)',
                        filter: 'blur(80px)',
                        zIndex: -1,
                        borderRadius: '50%'
                    }} />
                </div>

                <motion.span
                    key={status}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    transition={{ duration: 0.4 }}
                    style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '1rem',
                        fontWeight: 400,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        marginTop: '1rem'
                    }}
                >
                    {status}
                </motion.span>
            </div>

            <div style={{
                width: '100%',
                maxWidth: '400px',
                height: '4px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <motion.div
                    animate={{ width: `${percent}%` }}
                    style={{
                        height: '100%',
                        background: '#fff',
                        boxShadow: '0 0 20px rgba(255,255,255,0.5)' // Glowing bar
                    }}
                />
            </div>

            {/* Background Grain/Noise for texture */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.07,
                pointerEvents: 'none',
                filter: 'contrast(120%) brightness(100%)',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
            }} />
        </motion.div>
    );
};

export default Preloader;
