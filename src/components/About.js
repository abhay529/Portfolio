import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './About.css';

const Word = ({ children, range, progress }) => {
  // Map opacity from dim (0.1) to full white (1) across the word's allocated scroll space
  // With pinning, this will feel much more deliberate
  const opacity = useTransform(progress, range, [0.1, 1]);

  return (
    <span className="min-word-wrap">
      <motion.span
        style={{ opacity }}
        className="min-word"
      >
        {children}
      </motion.span>
    </span>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const bioText = "Final-year Electronics Engineering student with a strong UI/UX focus. I design intuitive, high-performance digital experiences, bridging complex technology with clean, user-centric interfaces.";
  const words = bioText.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Pinning range: start to end of the 200vh-300vh container
    offset: ["start start", "end end"]
  });

  return (
    <section id="about" className="about-minimalist" ref={containerRef}>
      <div className="sticky-wrapper">
        <div className="about-min-container">
          {/* Top Accent Line */}
          <div className="min-top-line"></div>

          <div className="min-meta-row">
            <div className="min-pill">
              <span className="pill-active">About</span>
              <span className="pill-total">Me</span>
            </div>
          </div>

          <div className="min-main-statement">
            <h1 className="lyrics-statement">
              {words.map((word, i) => {
                // Slower mapping because of the pinning height
                const start = i / words.length;
                const end = (i + 1) / words.length;
                return (
                  <Word key={i} range={[start, end]} progress={scrollYProgress}>
                    {word}
                  </Word>
                );
              })}
            </h1>
          </div>

          <div className="min-footer-details">
            <div className="min-detail-item">
              <span className="detail-label">CORE_MISSION</span>
              <span className="detail-value">UI Engineering + Hardware Evolution</span>
            </div>
            <div className="min-detail-item">
              <span className="detail-label">COORDINATES</span>
              <span className="detail-value">Kannur, Kerala, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
