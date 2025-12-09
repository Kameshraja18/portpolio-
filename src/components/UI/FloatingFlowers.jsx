import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flower, Heart, Star } from 'lucide-react';

const FloatingFlowers = () => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const generateElements = () => {
            const newElements = [];
            for (let i = 0; i < 20; i++) {
                newElements.push({
                    id: i,
                    x: Math.random() * 100, // Random percentage for X position
                    delay: Math.random() * 5,
                    duration: 10 + Math.random() * 10,
                    size: 15 + Math.random() * 25,
                    type: Math.random() > 0.6 ? 'flower' : (Math.random() > 0.5 ? 'heart' : 'star'),
                    color: Math.random() > 0.5 ? 'var(--accent-primary)' : 'var(--accent-secondary)'
                });
            }
            setElements(newElements);
        };

        generateElements();
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
        }}>
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    initial={{ y: '110vh', x: `${el.x}vw`, opacity: 0, rotate: 0 }}
                    animate={{
                        y: '-10vh',
                        opacity: [0, 0.8, 0],
                        rotate: 360
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        delay: el.delay,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        color: el.color,
                        filter: 'drop-shadow(0 0 5px rgba(255,192,203,0.5))'
                    }}
                >
                    {el.type === 'flower' ? (
                        <Flower size={el.size} />
                    ) : el.type === 'heart' ? (
                        <Heart size={el.size} fill={el.color} />
                    ) : (
                        <Star size={el.size} />
                    )}
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingFlowers;
