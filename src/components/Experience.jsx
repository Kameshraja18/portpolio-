import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const ExperienceCard = ({ job, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="experience-card"
        >
            {/* Timeline Line & Dot */}
            <div className="timeline-column">
                <div style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    boxShadow: '0 0 15px var(--accent-glow)',
                    zIndex: 2
                }} />
                <div className="timeline-line" style={{
                    width: '2px',
                    height: '100%',
                    background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
                    opacity: 0.3,
                    marginTop: '0.5rem'
                }} />
            </div>

            {/* Content */}
            <div style={{
                background: 'var(--bg-secondary)',
                borderRadius: '20px',
                padding: '2.5rem',
                border: '1px solid var(--border-color)',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
            >
                {/* Glow Effect */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
                    opacity: 0.1,
                    pointerEvents: 'none'
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>{job.role}</h3>
                        <span style={{ fontSize: '1.1rem', color: 'var(--accent-primary)', fontWeight: 600 }}>{job.company}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '50px'
                        }}>
                            <Calendar size={14} /> {job.period}
                        </span>
                    </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {job.points.map((point, i) => (
                        <li key={i} style={{
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6,
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'flex-start'
                        }}>
                            <span style={{ color: 'var(--accent-primary)', marginTop: '6px' }}>▹</span>
                            {point}
                        </li>
                    ))}
                </ul>

                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                    {job.tech.map((tech, i) => (
                        <span key={i} style={{
                            fontSize: '0.8rem',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-secondary)',
                            padding: '0.4rem 1rem',
                            borderRadius: '50px',
                            border: '1px solid var(--border-color)'
                        }}>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const experiences = [
        {
            role: "Freelance Web Developer",
            company: "Self-Employed",
            period: "2023 - Present",
            location: "Remote",
            points: [
                "Designing and developing responsive, high-performance websites for diverse clients.",
                "Specializing in React, Node.js, and modern UI/UX design to deliver custom digital solutions.",
                "Managing end-to-end development lifecycle from requirement gathering to deployment."
            ],
            tech: ["React.js", "Node.js", "Tailwind", "Framer Motion"]
        },
        {
            role: "Python Developer Trainee",
            company: "VLUG Foundation, Villupuram",
            period: "April 2024 - May 2025",
            location: "Villupuram",
            points: [
                "Completed intensive 1-year training in Python development and automation.",
                "Gained hands-on experience in backend scripting, database management, and building scalable applications.",
                "Collaborated on open-source projects and enhanced coding proficiency through real-world scenarios."
            ],
            tech: ["Python", "Django", "SQL", "Automation"]
        }
    ];

    return (
        <section id="experience" style={{ padding: 'var(--section-padding)', position: 'relative' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ margin: 'auto', maxWidth: '800px', textAlign: 'center' }}
                >
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Career Path</span>
                    <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, marginTop: '1rem' }}>Experience.</h2>
                </motion.div>

                <div className="experience-list" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {experiences.map((exp, i) => (
                        <ExperienceCard key={i} job={exp} index={i} />
                    ))}
                </div>

                <style>{`
                    .experience-card {
                        display: flex;
                        gap: 2rem;
                        position: relative;
                    }
                    .timeline-column {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        min-width: 50px;
                    }
                    @media (max-width: 768px) {
                        .experience-card {
                            gap: 1rem;
                        }
                        .timeline-column {
                            min-width: 30px;
                        }
                    }
                `}</style>
            </div>
        </section>
    );
};

export default Experience;
