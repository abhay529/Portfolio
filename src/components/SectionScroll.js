import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './SectionScroll.css';

const sections = [
    { id: 'home', name: 'HOME' },
    { id: 'about', name: 'ABOUT US' },
    { id: 'skills', name: 'SKILLS' },
    { id: 'experience', name: 'EXPERIENCE' },
    { id: 'projects', name: 'PROJECTS' },
    { id: 'contact', name: 'CONTACT' },
];

const SectionScroll = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isSidebarHovered, setIsSidebarHovered] = useState(false);
    const { scrollYProgress } = useScroll();

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0,
        };

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = sections.findIndex(s => s.id === entry.target.id);
                    if (index !== -1) setActiveIdx(index);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            className="minimal-sidebar-container"
            onMouseEnter={() => setIsSidebarHovered(true)}
            onMouseLeave={() => setIsSidebarHovered(false)}
        >
            <div className="minimal-rail-wrap">
                {/* The 1px Background Rail */}
                <div className="minimal-rail-bg" />

                {/* The Progress Fill */}
                <motion.div
                    className="minimal-rail-fill"
                    style={{ scaleY, originY: 0 }}
                />

                {/* Minimal Nodes & Labels */}
                <div className="minimal-nodes-layer">
                    {sections.map((section, idx) => {
                        const isActive = activeIdx === idx;
                        const isVisible = isActive || isSidebarHovered;

                        return (
                            <div
                                key={section.id}
                                className={`minimal-node-item ${isActive ? 'active' : ''}`}
                                style={{ top: `${(idx / (sections.length - 1)) * 100}%` }}
                                onClick={() => scrollToSection(section.id)}
                            >
                                <div className="minimal-dot" />
                                <motion.span
                                    className="minimal-label"
                                    initial={false}
                                    animate={{
                                        opacity: isVisible ? 1 : 0,
                                        x: isVisible ? -15 : -5,
                                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {section.name}
                                </motion.span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SectionScroll;
