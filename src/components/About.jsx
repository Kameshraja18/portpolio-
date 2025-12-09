import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Layout, Server, Cpu, Globe, Zap } from 'lucide-react';

const BentoCard = ({ children, className, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={className}
        style={{
            background: 'var(--bg-secondary)',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            position: 'relative'
        }}
    >
        {children}
    </motion.div>
);

const TechItem = ({ icon: Icon, label, skills }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(!isHovered)} // For mobile support
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                position: 'relative',
                minWidth: '100px',
                minHeight: '80px',
                justifyContent: 'center'
            }}
        >
            <AnimatePresence mode='wait'>
                {isHovered ? (
                    <motion.div
                        key="skills"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            justifyContent: 'center',
                            width: '100%',
                            textAlign: 'center'
                        }}
                    >
                        {skills.map((skill, i) => (
                            <span key={i} style={{
                                fontSize: '0.75rem',
                                background: 'var(--bg-tertiary)',
                                color: 'var(--text-primary)',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                whiteSpace: 'nowrap'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="icon"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Icon size={28} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{label}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const About = () => {
    const techCategories = [
        { icon: Code, label: 'Languages', skills: ['Python', 'JavaScript', 'C', 'HTML', 'CSS'] },
        { icon: Server, label: 'Full Stack', skills: ['React.js', 'Node.js', 'Flask', 'Firebase'] },
        { icon: Database, label: 'Cloud & DB', skills: ['AWS', 'Docker', 'Kubernetes', 'MySQL', 'MongoDB'] },
        { icon: Cpu, label: 'AI / ML', skills: ['TensorFlow', 'Scikit-learn', 'OpenCV', 'Pandas'] },
        { icon: Layout, label: 'Tools', skills: ['Figma', 'Git', 'GitHub', 'VS Code'] }
    ];

    return (
        <section id="about" style={{ padding: 'var(--section-padding)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '4rem' }}
                >
                    <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                        About Me
                    </span>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1 }}>
                        Building impact with <br /> <span style={{ color: 'var(--accent-primary)' }}>code & AI.</span>
                    </h2>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto auto',
                    gap: '1.5rem'
                }}>
                    {/* Bio Card - Large */}
                    <BentoCard className="bio-card" style={{ gridColumn: 'span 12', gridRow: 'span 1' }}>
                        <style>{`
               .bio-card { grid-column: span 12; }
               @media (min-width: 968px) { .bio-card { grid-column: span 7; } }
             `}</style>
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Education & Experience</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '1rem' }}>
                                I am a <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Computer Science Engineering</span> student (2022-2026) at V.R.S. College of Engineering and Technology (CGPA: 8.1).
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                                My experience includes working as a <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Freelance Web Developer</span> and a <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Python Developer Trainee</span> at VLUG Foundation, where I built scalable web applications and AI-driven solutions.
                            </p>
                        </div>
                    </BentoCard>

                    {/* Location/Status Card - Small */}
                    <BentoCard className="status-card" delay={0.1}>
                        <style>{`
               .status-card { grid-column: span 12; height: 100%; }
               @media (min-width: 600px) { .status-card { grid-column: span 6; } }
               @media (min-width: 968px) { .status-card { grid-column: span 5; } }
             `}</style>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Location</div>
                                    <div style={{ fontWeight: 600 }}>Villupuram, TN, India</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Status</div>
                                    <div style={{ fontWeight: 600, color: '#10b981' }}>Open to Work</div>
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Tech Stack - Wide */}
                    <BentoCard className="tech-card" delay={0.2}>
                        <style>{`
               .tech-card { grid-column: span 12; }
             `}</style>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Tech Stack</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-around' }}>
                            {techCategories.map((tech, i) => (
                                <TechItem key={i} icon={tech.icon} label={tech.label} skills={tech.skills} />
                            ))}
                        </div>
                    </BentoCard>
                </div>
            </div>
        </section>
    );
};

export default About;
