import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Typewriter = ({ texts, speed = 150, delay = 1500 }) => {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleTyping = () => {
            const currentText = texts[index];

            if (isDeleting) {
                setDisplayText(prev => prev.substring(0, prev.length - 1));
            } else {
                setDisplayText(prev => currentText.substring(0, prev.length + 1));
            }

            if (!isDeleting && displayText === currentText) {
                setTimeout(() => setIsDeleting(true), delay);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setIndex(prev => (prev + 1) % texts.length);
            }
        };

        const timer = setTimeout(handleTyping, isDeleting ? 50 : speed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, index, texts, speed, delay]);

    return (
        <span style={{ borderRight: '2px solid var(--accent-primary)', paddingRight: '5px' }}>
            {displayText}
        </span>
    );
};

export default Typewriter;
