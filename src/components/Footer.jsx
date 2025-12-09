import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { Github, Linkedin, Mail, Check, Copy } from 'lucide-react';
import MagneticButton from './UI/MagneticButton';

const Footer = () => {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef(null);
    const email = "selvakumar19798@gmail.com";

    // Mouse follower logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Marquee variants
    const marqueeVariants = {
        animate: {
            x: [0, -1000],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <footer
            id="contact"
            ref={containerRef}
            style={{
                background: '#000',
                padding: '8rem 0 2rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Spotlight Effect */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)`,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            {/* Infinite Marquee Background */}
            <div style={{
                position: 'absolute',
                top: '5%',
                left: 0,
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                opacity: 0.03,
                pointerEvents: 'none',
                zIndex: 0
            }}>
                <motion.div
                    variants={marqueeVariants}
                    animate="animate"
                    style={{
                        display: 'inline-block',
                        fontSize: '15rem',
                        fontWeight: 900,
                        color: '#fff',
                        lineHeight: 1
                    }}
                >
                    LET'S CREATE — LET'S TALK — LET'S CREATE — LET'S TALK — LET'S CREATE — LET'S TALK —
                </motion.div>
                <motion.div
                    variants={marqueeVariants}
                    animate="animate"
                    style={{
                        display: 'inline-block',
                        fontSize: '15rem',
                        fontWeight: 900,
                        color: '#fff',
                        lineHeight: 1
                    }}
                >
                    LET'S CREATE — LET'S TALK — LET'S CREATE — LET'S TALK — LET'S CREATE — LET'S TALK —
                </motion.div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                {/* The "Best Line" - Glowing Gradient Separator */}
                <div style={{
                    width: '100%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--text-primary), transparent)',
                    opacity: 0.3,
                    marginBottom: '6rem'
                }} />

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4rem',
                    marginBottom: '8rem'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span style={{
                            color: 'var(--accent-secondary)',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            display: 'block',
                            marginBottom: '2rem'
                        }}>
                            Let's work together
                        </span>

                        <h2 style={{
                            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                            fontWeight: 800,
                            lineHeight: 0.95,
                            letterSpacing: '-0.03em',
                            maxWidth: '1200px',
                            marginBottom: '3rem',
                            background: 'linear-gradient(to right, #fff, #999)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Let's Talk.
                        </h2>

                        <p style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                            color: 'var(--text-secondary)',
                            maxWidth: '600px',
                            lineHeight: 1.6,
                            marginBottom: '4rem'
                        }}>
                            I'm always open to new opportunities and interesting projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
                            <MagneticButton>
                                <a
                                    href={`mailto:${email}`}
                                    style={{
                                        background: 'var(--text-primary)',
                                        color: 'var(--bg-primary)',
                                        padding: '1.2rem 2.5rem',
                                        borderRadius: '50px',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.8rem',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Say Hello <Mail size={20} />
                                </a>
                            </MagneticButton>

                            <div
                                onClick={handleCopy}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.2rem 2rem',
                                    borderRadius: '50px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    background: 'rgba(255,255,255,0.03)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--text-primary)';
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                            >
                                <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{email}</span>
                                <div style={{ position: 'relative', width: '20px', height: '20px' }}>
                                    <AnimatePresence mode='wait'>
                                        {copied ? (
                                            <motion.div
                                                key="check"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                style={{ position: 'absolute', inset: 0, color: '#10b981' }}
                                            >
                                                <Check size={20} />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="copy"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                style={{ position: 'absolute', inset: 0 }}
                                            >
                                                <Copy size={20} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    paddingTop: '3rem',
                    borderTop: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>Defining the Future.</span>
                        <p style={{ color: 'var(--text-tertiary)' }}>&copy; {new Date().getFullYear()} Priyadharshini S. All rights reserved.</p>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                            Designed & Built with <span style={{ color: 'var(--accent-primary)' }}>♥</span>
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {[
                            { icon: Github, label: 'Github', href: 'https://github.com/' },
                            { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/' },
                            { icon: Mail, label: 'Email', href: `mailto:${email}` }
                        ].map(({ icon: Icon, label, href }) => (
                            <MagneticButton key={label}>
                                <a href={href} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'var(--text-secondary)',
                                    transition: 'all 0.3s ease',
                                    background: 'rgba(255,255,255,0.03)'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--text-primary)';
                                        e.currentTarget.style.color = 'var(--text-primary)';
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                    }}
                                >
                                    <Icon size={20} />
                                </a>
                            </MagneticButton>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
