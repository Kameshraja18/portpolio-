import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

const ProjectCard = ({ project, index, range, targetScale }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const scale = useTransform(scrollYProgress, range, [1, targetScale]);

    // Parallax Text Effect: Text moves slightly faster/slower than card to create "auto scroll" feel
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div ref={container} className="project-card-container">
            <motion.div
                className="project-card-inner"
                style={{
                    scale,
                    rotateX,
                    rotateY,
                    background: 'var(--bg-secondary)',
                    borderRadius: '30px',
                    padding: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                    overflow: 'hidden',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Abstract Gradient Background */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60%',
                    height: '100%',
                    background: project.color,
                    opacity: 0.15,
                    filter: 'blur(80px)',
                    zIndex: 0,
                    pointerEvents: 'none',
                    transform: 'translateZ(-50px)'
                }} />

                <div className="card-header" style={{ zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', transform: 'translateZ(20px)', marginBottom: '2rem' }}>
                    <div>
                        <span style={{
                            background: 'var(--text-primary)',
                            color: 'var(--bg-primary)',
                            padding: '0.5rem 1rem',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            display: 'inline-block',
                            marginBottom: '1rem'
                        }}>
                            {project.category}
                        </span>
                        <h2 className="project-title" style={{
                            fontWeight: 800,
                            lineHeight: 1,
                            marginTop: '0.5rem',
                            maxWidth: '600px',
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)'
                        }}>
                            {project.title}
                        </h2>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="https://github.com/" className="hover-icon" style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '1rem',
                            borderRadius: '50%',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--border-color)',
                            transition: 'all 0.3s ease'
                        }}>
                            <Github size={24} />
                        </a>
                    </div>
                </div>

                {/* Main Description Area (Replaces Preview) */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center', // Center text vertically
                    transform: 'translateZ(10px)',
                    margin: '1rem 0 2rem'
                }}>
                    <p className="project-desc" style={{
                        color: 'var(--text-secondary)',
                        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', // Larger text
                        lineHeight: 1.8,
                        fontWeight: 400
                    }}>
                        {project.description}
                    </p>
                </div>

                <div className="card-footer" style={{ zIndex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', transform: 'translateZ(20px)' }}>
                    <div className="tech-tags" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                        {project.tags.map((tag, i) => (
                            <span key={i} style={{
                                border: '1px solid var(--border-color)',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '50px',
                                fontSize: '0.9rem',
                                color: 'var(--text-primary)',
                                fontWeight: 500,
                                background: 'rgba(255,255,255,0.05)'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    <a href="#" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                        fontSize: '1rem'
                    }}>
                        View Project <ArrowUpRight size={20} />
                    </a>
                </div>
            </motion.div>

            <style>{`
                .project-card-container {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: sticky;
                    top: 0;
                }
                .project-card-inner {
                    width: 1000px;
                    max-width: 95%;
                    height: 600px;
                    max-height: 80vh;
                }
                .hover-icon:hover { transform: scale(1.1); }
                .project-title { font-size: clamp(2.5rem, 5vw, 4rem); }
                .project-desc { font-size: clamp(1rem, 2vw, 1.2rem); }

                @media (max-width: 768px) {
                    .project-card-inner {
                        padding: 1.5rem !important;
                        height: auto !important;
                        min-height: 60vh;
                    }
                    .card-header {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .card-header > div:last-child {
                        align-self: flex-end;
                    }
                    .card-footer {
                        flex-direction: column;
                        gap: 1.5rem;
                        align-items: flex-start !important;
                    }
                    .tech-tags {
                        justify-content: flex-start !important;
                    }
                }
            `}</style>
        </div>
    );
};

const Projects = () => {
    const projects = [
        {
            title: 'Pneumonia Classification',
            category: 'Healthcare AI',
            description: 'AI-powered medical diagnostic system achieving 95% accuracy in classifying pneumonia from chest X-rays using advanced CNN architectures. Features a user-friendly interface for radiologists to upload scans and receive instant predictions, significantly reducing diagnosis time in critical cases.',
            tags: ['CNN', 'Python', 'Deep Learning', 'Medical AI'],
            color: 'linear-gradient(135deg, #f9a8d4 0%, #f472b6 100%)' // Pastel Pink
        },
        {
            title: 'Brain Tumor Detection',
            category: 'Healthcare AI',
            description: 'Automated detection model utilizing Convolutional Neural Networks to identify and segment brain tumors from MRI scans with high precision. Implements data augmentation techniques to handle class imbalance, ensuring robust performance across diverse patient datasets and medical imaging formats.',
            tags: ['CNN', 'Python', 'TensorFlow', 'Image Processing'],
            color: 'linear-gradient(135deg, #ddd6fe 0%, #c084fc 100%)' // Lavender
        },
        {
            title: 'Blockchain Voting System',
            category: 'Web3 / Blockchain',
            description: 'Secure, decentralized voting platform built on the Ethereum blockchain to ensure tamper-proof elections. Integrates MySQL for voter registration while leveraging smart contracts for immutable vote recording, guaranteeing transparency, anonymity, and trust throughout the electoral process.',
            tags: ['Ethereum', 'Solidity', 'MySQL', 'Blockchain'],
            color: 'linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%)' // Soft Rose
        },
        {
            title: 'College Management System',
            category: 'Web Development',
            description: 'Comprehensive educational ERP platform handling student records, attendance tracking, and exam administration. Built with Node.js and MongoDB, featuring role-based access control for admins, faculty, and students to streamline campus operations and improve data accessibility.',
            tags: ['Node.js', 'MongoDB', 'Express', 'React'],
            color: 'linear-gradient(135deg, #ccfbf1 0%, #5eead4 100%)' // Mint/Teal
        }
    ];

    return (
        <section id="projects" style={{ background: 'var(--bg-primary)' }}>
            <div className="container" style={{ paddingBottom: '10vh' }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ margin: '8rem 0 4rem', textAlign: 'center' }}
                >
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>My Portfolio</span>
                    <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, marginTop: '1rem' }}>Featured Projects.</h2>
                </motion.div>

                <div>
                    {projects.map((project, i) => {
                        const targetScale = 1 - ((projects.length - i) * 0.05);
                        return <ProjectCard key={i} index={i} project={project} range={[i * 0.25, 1]} targetScale={targetScale} />;
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;
