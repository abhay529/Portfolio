import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import About3DCanvas from './About3DCanvas';
import './About.css';

const About = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 900;

  return (
    <section id="about" className="about-zine-section">
      {/* 3D Celestial Space System Canvas (Desktop Only — Spline-style Space Animation) */}
      {isDesktop && <About3DCanvas />}

      {/* Giant Ghost Number 02 from Reference Image 1 */}
      <div className="about-ghost-number">02</div>

      <div className="about-zine-container">
        {/* Header Cluster */}
        <div className="about-zine-header">
          <div className="about-zine-eyebrow">
            <span className="about-pill-white">SECTION // 02</span>
            <span className="mono-tag" style={{ color: 'var(--pop-yellow)' }}>
              ✦ ARCHITECTURE & PHILOSOPHY
            </span>
          </div>

          <motion.h2
            className="about-doodle-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Personal Overview <span className="about-doodle-asterisk">★</span>
          </motion.h2>
        </div>

        {/* Big Editorial Statement */}
        <motion.p
          className="about-manifesto-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Electronics &amp; Communication Engineering graduate from{' '}
          <span className="underline-highlight">College of Engineering Thalassery (COET)</span>,
          now intensely focused on <span className="underline-highlight">GATE preparation</span>.
          Passionate about core electronics, digital logic, embedded architectures, and engineering problem-solving.
        </motion.p>

        {/* 3-Card Zine Breakdown */}
        <div className="about-card-deck">
          {/* Card 01: Hardware Edge */}
          <motion.div
            className="zine-feature-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div>
              <div className="card-stamp-num">01.</div>
              <h3 className="card-zine-heading">The Hardware Edge</h3>
              <p className="card-zine-body">
                Graduated in Electronics &amp; Communication Engineering from COET.
                Hands-on experience with Raspberry Pi edge compute nodes, and sensor telemetry systems.
              </p>
            </div>
            <div className="card-footer-tags">
              <span className="tag-badge">B.Tech ECE (COET)</span>
              <span className="tag-badge">FPGA / Verilog</span>
              <span className="tag-badge">Raspberry Pi</span>
            </div>
          </motion.div>

          {/* Card 02: GATE Focus */}
          <motion.div
            className="zine-feature-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <div>
              <div className="card-stamp-num">02.</div>
              <h3 className="card-zine-heading">GATE Preparation</h3>
              <p className="card-zine-body">
                Currently dedicated to Graduate Aptitude Test in Engineering (GATE)
                preparation. Deepening mastery in Digital Circuits, Electronic Devices,
                Signals &amp; Systems, and Microcontroller architectures.
              </p>
            </div>
            <div className="card-footer-tags">
              <span className="tag-badge">GATE Aspirant</span>
              <span className="tag-badge">Core Electronics</span>
            </div>
          </motion.div>

          {/* Card 03: Community & Leadership */}
          <motion.div
            className="zine-feature-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div>
              <div className="card-stamp-num">03.</div>
              <h3 className="card-zine-heading">Design Lead, IEEE SB COET</h3>
              <p className="card-zine-body">
                Served as the Design Lead for IEEE Student Branch at College of
                Engineering Thalassery (tenure concluded in Feb 2026). Spearheaded visual identity,
                creative design operations, and college tech symposiums.
              </p>
            </div>
            <div className="card-footer-tags">
              <span className="tag-badge">Design Lead</span>
              <span className="tag-badge">IEEE SB COET</span>
            </div>
          </motion.div>
        </div>

        {/* Telemetry Row */}
        <div className="about-telemetry-row">
          <div className="telemetry-node">
            <span className="telemetry-label">CURRENT STATUS</span>
            <span className="telemetry-val">ECE Graduate // GATE Aspirant</span>
          </div>
          <div className="telemetry-node">
            <span className="telemetry-label">College</span>
            <span className="telemetry-val">College of Engineering Thalassery</span>
          </div>
          <div className="telemetry-node">
            <span className="telemetry-label">LEADERSHIP TERM</span>
            <span className="telemetry-val">Ex-Design Lead (IEEE SB COET, Feb 2026)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
