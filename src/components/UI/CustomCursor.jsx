import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });

            const target = e.target;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "var(--accent-primary)",
            mixBlendMode: "difference"
        },
        pointer: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            height: 48,
            width: 48,
            backgroundColor: "var(--text-primary)",
            mixBlendMode: "difference"
        }
    };

    return (
        <>
            <motion.div
                className="cursor"
                variants={variants}
                animate={isPointer ? "pointer" : "default"}
                transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 400,
                    mass: 0.5
                }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 9999,
                }}
            />

            {/* Secondary trailing cursor */}
            <motion.div
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                }}
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 200,
                    mass: 0.8
                }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    pointerEvents: "none",
                    zIndex: 9999,
                }}
            />
        </>
    );
};

export default CustomCursor;
