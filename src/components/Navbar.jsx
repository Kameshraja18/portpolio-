import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticButton from './UI/MagneticButton';
import ScrollProgress from './UI/ScrollProgress';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <ScrollProgress />
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`navbar ${scrolled ? 'scrolled' : ''}`}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 'var(--nav-height)',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 100,
                    transition: 'all 0.4s ease',
                    background: scrolled ? 'rgba(3, 3, 3, 0.8)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent'
                }}
            >
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <a href="#" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        Priyadharshini S<span style={{ color: 'var(--accent-primary)', fontSize: '2rem', lineHeight: 0.5 }}>.</span>
                    </a>

                    {/* Desktop Menu */}
                    <div style={{ display: 'none', gap: '1.5rem', alignItems: 'center' }} className="desktop-menu">
                        {navLinks.map((link) => (
                            <MagneticButton key={link.name}>
                                <a href={link.href} style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--text-secondary)',
                                    transition: 'color 0.2s',
                                    padding: '0.5rem 1rem',
                                    fontWeight: 500
                                }}
                                    onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                                    onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                                >
                                    {link.name}
                                </a>
                            </MagneticButton>
                        ))}


                    </div>

                    {/* Mobile Toggle */}
                    <div className="mobile-toggle" style={{ zIndex: 1001 }}>
                        <MagneticButton onClick={() => setIsOpen(!isOpen)}>
                            <div style={{ color: 'var(--text-primary)', padding: '0.5rem' }}>
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </div>
                        </MagneticButton>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: '100vh' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                background: 'var(--bg-secondary)',
                                padding: 'var(--nav-height) 2rem 2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2rem',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}
                        >
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.1) }}
                                    style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
            </motion.nav>
        </>
    );
};

export default Navbar;
