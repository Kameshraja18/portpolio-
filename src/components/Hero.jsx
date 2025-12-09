import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import MagneticButton from './UI/MagneticButton';
import Typewriter from './UI/Typewriter';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <section
            ref={ref}
            id="home"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                padding: '0 2rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <motion.div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                <div className="container hero-container">
                    <motion.div
                        className="hero-text"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants} style={{ minHeight: '30px' }}>
                            <span style={{
                                color: 'var(--accent-primary)',
                                fontWeight: 600,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                marginBottom: '1.5rem',
                                display: 'inline-block',
                                fontSize: '0.9rem'
                            }}>
                                <Typewriter texts={["CSE Student", "Full-Stack Developer", "AI/ML Enthusiast", "AWS Certified"]} />
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            style={{
                                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                                fontWeight: 800,
                                color: 'var(--text-primary)',
                                marginBottom: '2rem',
                                letterSpacing: '-0.03em',
                                lineHeight: 1.1
                            }}
                        >
                            Hi, I'm Priyadharshini S.
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            style={{
                                color: 'var(--text-secondary)',
                                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                                maxWidth: '600px',
                                marginBottom: '3rem',
                                lineHeight: 1.6
                            }}
                        >
                            Passionate CSE student with full-stack, AWS deployment, and AI/ML expertise, committed to building solutions that create meaningful real-world impact.
                        </motion.p>

                        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <MagneticButton
                                onClick={() => document.getElementById('projects').scrollIntoView()}
                                style={{
                                    background: 'var(--text-primary)',
                                    color: 'var(--bg-primary)',
                                    padding: '1rem 2rem',
                                    borderRadius: '50px',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '1rem'
                                }}
                            >
                                View Work <ArrowRight size={20} />
                            </MagneticButton>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {[
                                    { Icon: Github, href: 'https://github.com/' },
                                    { Icon: Linkedin, href: 'https://www.linkedin.com/' },
                                    { Icon: Mail, href: 'mailto:selvakumar19798@gmail.com' }
                                ].map(({ Icon, href }, i) => (
                                    <MagneticButton key={i}>
                                        <a
                                            href={href}
                                            style={{
                                                color: 'var(--text-secondary)',
                                                padding: '0.8rem',
                                                display: 'block',
                                                transition: 'color 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                                            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                                        >
                                            <Icon size={24} />
                                        </a>
                                    </MagneticButton>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Profile Image Section */}
                    <motion.div
                        className="hero-image"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            position: 'relative',
                            width: 'min(400px, 80vw)',
                            height: 'min(400px, 80vw)',
                            borderRadius: '50%',
                            border: '2px solid var(--accent-primary)',
                            padding: '10px',
                            boxShadow: '0 0 50px var(--accent-glow)'
                        }}>
                            <img
                                src="/profile.png"
                                alt="Priyadharshini S"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '50%'
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Background Elements */}
            <motion.div style={{
                position: 'absolute',
                top: '20%',
                right: '5%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, var(--accent-glow) 0%, rgba(0,0,0,0) 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                zIndex: 0,
                y: y
            }} />

            <style>{`
                .hero-container {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 4rem;
                    align-items: center;
                }
                @media (max-width: 968px) {
                    .hero-container {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                        text-align: center;
                    }
                    .hero-text {
                        order: 2; /* Text below image on mobile, or keep text top? Text top is usually better for Intro. Let's keep order default (Text top) */
                        order: 1; 
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .hero-image {
                        order: 2; /* Image below text on mobile? Or Image top? Common is Image Top. Let's try Image Top for mobile personality. */
                        order: 0;
                        margin-bottom: 2rem;
                    }
                     .hero-container {
                         /* Let's re-order for mobile: Image Top */
                    }
                    /* Actually, strictly Text first is better for SEO/Reading, Image second. I'll stick to default blocking */
                }
            `}</style>
        </section>
    );
};

export default Hero;
