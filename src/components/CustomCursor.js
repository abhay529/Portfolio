import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // High-end spring physics
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const trailConfig = { damping: 30, stiffness: 200, mass: 0.8 };

    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const trail1X = useSpring(mouseX, trailConfig);
    const trail1Y = useSpring(mouseY, trailConfig);

    const handleMouseMove = useCallback((e) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);
        if (!isVisible) setIsVisible(true);
    }, [mouseX, mouseY, isVisible]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', () => setIsVisible(false));
        document.addEventListener('mouseenter', () => setIsVisible(true));

        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleHoverStart);
            el.addEventListener('mouseleave', handleHoverEnd);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
        };
    }, [handleMouseMove]);

    if (!isVisible) return null;

    return (
        <div className="gold-cursor-system">
            {/* Central Solar Core */}
            <motion.div
                className="gold-core"
                style={{ x: smoothX, y: smoothY }}
                animate={{
                    scale: isHovering ? 0.8 : 1,
                    backgroundColor: 'var(--text-primary)',
                    boxShadow: isHovering
                        ? '0 0 25px var(--text-primary)'
                        : '0 0 15px rgba(0, 31, 61, 0.6)',
                }}
            />

            {/* Primary Orbital Ring */}
            <motion.div
                className="gold-ring r1"
                style={{ x: trail1X, y: trail1Y }}
                animate={{
                    rotate: 360,
                    scale: isHovering ? 1.4 : 1,
                    borderWidth: isHovering ? '1px' : '2px',
                }}
                transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" } }}
            >
                <div className="gold-satellite" />
            </motion.div>

            {/* Secondary Pulse Ring */}
            <motion.div
                className="gold-ring r2"
                style={{ x: smoothX, y: smoothY }}
                animate={{
                    scale: isHovering ? [1, 1.8, 1] : 1,
                    opacity: isHovering ? [0.4, 0.1, 0.4] : 0.2,
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* Solar Flare / Ambient Glow */}
            <motion.div
                className="gold-glow"
                style={{ x: smoothX, y: smoothY }}
                animate={{
                    scale: isHovering ? 3 : 1.5,
                    opacity: isHovering ? 0.4 : 0.2,
                }}
            />
        </div>
    );
};

export default CustomCursor;
