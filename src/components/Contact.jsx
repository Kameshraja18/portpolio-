import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" style={{ padding: 'var(--section-padding)', background: 'var(--bg-secondary)', textAlign: 'center' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ maxWidth: '800px', margin: '0 auto' }}
                >
                    <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, marginBottom: '1.5rem' }}>
                        Let's work together.
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.6 }}>
                        I'm always open to new opportunities and interesting projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <motion.a
                        href="mailto:hello@example.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            background: 'var(--accent-primary)',
                            color: 'white',
                            padding: '1rem 2.5rem',
                            borderRadius: '50px',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            boxShadow: '0 4px 20px var(--accent-glow)'
                        }}
                    >
                        <Mail size={20} />
                        Say Hello
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
