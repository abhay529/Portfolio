import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const AnimatedBackground = () => {
    const { scrollYProgress } = useScroll();

    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth movement for mouse glow
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Scroll-based transforms
    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

    return (
        <div className="bg-flow">
            {/* Main aurora layers */}
            <motion.div
                className="bg-flow-layer"
                style={{ y: y1, rotate }}
            />
            <motion.div
                className="bg-flow-layer secondary"
                style={{ y: y2, rotate: -rotate }}
            />

            {/* Mouse tracking glow */}
            <motion.div
                className="mouse-glow"
                style={{
                    left: springX,
                    top: springY,
                }}
            />

            {/* Scanning noise effect for "time/flow" feel */}
            <div className="noise-overlay" />
        </div>
    );
};

export default AnimatedBackground;
