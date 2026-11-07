import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    id: '01',
    title: 'AI Face Attendance',
    description: 'Automated attendance system using face recognition on Raspberry Pi 3. Features real-time logging, anti-spoofing verification, and web admin dashboard.',
    technologies: ['Python', 'OpenCV', 'Raspberry Pi', 'Flask'],
    category: 'AI / IoT',
    color: '#FF5500',
    liveLink: 'https://github.com/abhay529/AI_Face_Attendance_system_usingPi3.git',
  },
  {
    id: '02',
    title: 'Smart Blind Stick',
    description: 'Sensor-based assistive mobility device designed for visually impaired users. Features real-time spatial obstacle detection, water sensing, and haptic feedback.',
    technologies: ['Raspberry Pi 5', 'Lidar', 'Ultrasonic', 'C++'],
    category: 'Hardware',
    color: '#FFD600',
    liveLink: '#',
  },
  {
    id: '03',
    title: 'Retina Emulator',
    description: 'FPGA-based neuromorphic retina emulator mimicking biological vision systems for low-latency, high-speed edge intelligence processing.',
    technologies: ['FPGA', 'Verilog', 'Digital Logic', 'Edge AI'],
    category: 'Seminar',
    color: '#E11D48',
    liveLink: 'https://drive.google.com/file/d/1lnBrrftWvFB_D6TeBnZzwcru30I4hTTd/view',
  },
  {
    id: '04',
    title: 'SPANDANAM Arts Fest',
    description: 'Official College Arts Festival platform featuring live schedules, multi-category registration, team portals, and real-time score updates.',
    technologies: ['Figma', 'UI/UX', 'React', 'Event Tech'],
    category: 'Web Dev',
    color: '#2563EB',
    liveLink: 'https://www.spandanam.online/',
  },
  {
    id: '05',
    title: 'Neuromesh IoT',
    description: 'Centralized telemetry command dashboard for monitoring distributed ESP8266 nodes. Visualizes real-time environmental data with responsive charts.',
    technologies: ['IoT', 'React', 'Chart.js', 'ESP8266'],
    category: 'Internship',
    color: '#7C3AED',
    liveLink: 'https://www.figma.com/proto/qP0KBOW5WWwycx8goA489r/Works?page-id=219%3A287&node-id=433-5132',
  },
  {
    id: '06',
    title: 'NASA Space Apps',
    description: 'Hackathon solution analyzing open-access NASA Earth observation datasets to model planetary climate patterns and solve space exploration challenges.',
    technologies: ['Python', 'Data Analytics', 'NASA APIs', 'ML'],
    category: 'Hackathon',
    color: '#10B981',
    liveLink: '#',
  },
  {
    id: '07',
    title: 'Tech Matrix 2024',
    description: 'Interactive technical symposium portal with paper presentation management, coding contest leaderboards, and automated digital certificate generation.',
    technologies: ['Figma', 'Full Stack', 'Tailwind', 'MongoDB'],
    category: 'Symposium',
    color: '#FF5500',
    liveLink: '#',
  },
  {
    id: '08',
    title: 'EcoPulse',
    description: 'Autonomous environmental sensing node tracking air quality (AQI), temperature, and humidity with edge alerts and solar-harvested battery management.',
    technologies: ['ESP32', 'Sensors', 'MQTT', 'Dashboard'],
    category: 'Embedded',
    color: '#10B981',
    liveLink: '#',
  },
  {
    id: '09',
    title: "Semicoloquim '24",
    description: 'Flagship national conference portal for the ECE department, featuring keynote speaker schedules, paper submission gateways, and delegate ticketing.',
    technologies: ['Web Architecture', 'Design Systems', 'Figma'],
    category: 'Conference',
    color: '#E11D48',
    liveLink: '#',
  },
  {
    id: '10',
    title: 'IEEE SB COET Portal',
    description: 'Official student chapter digital platform for IEEE Student Branch, College of Engineering Thalassery (COET), developed during tenure as Design Lead (concluded Feb 2026).',
    technologies: ['Design Lead', 'IEEE SB COET', 'Web Presence'],
    category: 'Community',
    color: '#2563EB',
    liveLink: '#',
  },
];

const Projects = () => {
  const [viewMode, setViewMode] = useState('ARC'); // 'ARC' or 'GRAVITY'
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const pauseTimeoutRef = useRef(null);
  const touchStartXRef = useRef(null);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobileScreen = windowWidth < 768;

  // Infinite slow automatic scroll effect (Advances every 3.4 seconds) — Desktop only, disabled on mobile per user request
  useEffect(() => {
    if (viewMode !== 'ARC' || !isAutoScrolling || isMobileScreen) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % projects.length);
    }, 3400);

    return () => clearInterval(interval);
  }, [viewMode, isAutoScrolling, isMobileScreen]);

  // Touch swipe support for mobile 3D Arc Studio
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    // 35px threshold for left/right swipe
    if (diff > 35) {
      // Swiped Left -> advance
      setActiveIdx((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    } else if (diff < -35) {
      // Swiped Right -> go back
      setActiveIdx((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    }
    touchStartXRef.current = null;
  };

  // Handle user selecting a card safely without clashes
  const selectCard = (idx, e) => {
    if (e) e.stopPropagation();
    setActiveIdx(idx);
    setIsAutoScrolling(false);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 6000);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setIsAutoScrolling(false);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 6000);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setActiveIdx((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setIsAutoScrolling(false);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 6000);
  };

  // Pre-calculated whimsical rotation tilts for gravity mode
  const tilts = [-2.5, 3, -1.8, 2.2, -3.2, 1.5, -2, 2.8, -1.5, 2];
  const stepX = isMobileScreen ? 140 : 240;
  const stepZ = isMobileScreen ? 80 : 120;

  return (
    <section id="projects" className="projects-mashup-section">
      <div className="projects-mashup-container">
        {/* Header Bar with View Switcher */}
        <div className="projects-header-bar">
          <div className="projects-title-box">
            <div className="projects-eyebrow">
              <span className="projects-tag-dark">SECTION // 03</span>
              <span className="mono-tag" style={{ color: 'var(--pop-yellow)' }}>
                ✦ 10 CASE STUDIES
              </span>
            </div>
            <h2 className="projects-main-title">
              Selected <span className="highlight-accent">Creations</span> &amp; Hardware.
            </h2>
          </div>

          {/* Mode Switcher */}
          <div className="view-mode-toggle">
            <button
              className={`mode-btn ${viewMode === 'ARC' ? 'active' : ''}`}
              onClick={() => setViewMode('ARC')}
            >
              <span>🌌</span> 3D Arc Studio
            </button>
            <button
              className={`mode-btn ${viewMode === 'GRAVITY' ? 'active' : ''}`}
              onClick={() => setViewMode('GRAVITY')}
            >
              <span>🎢</span> Gravity Deck
            </button>
          </div>
        </div>

        {/* ====================================================
            MODE 1: 3D CYLINDRICAL ARC (Reference Image 2 Inspired)
            ==================================================== */}
        {viewMode === 'ARC' && (
          <div
            className="perspective-stage-3d"
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="arc-cards-track">
              {projects.map((project, idx) => {
                // Continuous circular modulo offset for seamless infinite loop
                let offset = idx - activeIdx;
                const half = projects.length / 2;
                if (offset > half) offset -= projects.length;
                if (offset < -half) offset += projects.length;

                const isCenter = offset === 0;
                const isVisible = Math.abs(offset) <= 2;

                if (!isVisible) return null;

                const rotateY = offset * (isMobileScreen ? 18 : 22);
                const translateX = offset * stepX;
                const translateZ = -Math.abs(offset) * stepZ;
                const opacity = isCenter ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.4);
                const scale = isCenter ? 1 : (isMobileScreen ? 0.85 : 0.88);

                return (
                  <div
                    key={project.id}
                    className={`arc-card-wrapper ${isCenter ? 'active' : ''}`}
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity: opacity,
                      zIndex: 10 - Math.abs(offset),
                    }}
                    onClick={(e) => selectCard(idx, e)}
                  >
                    <div className="arc-project-card">
                      <div className="card-top-meta">
                        <span className="card-seq-num">#{project.id}</span>
                        <span className="card-cat-badge">{project.category}</span>
                      </div>

                      <div className="card-mid-content">
                        <h3 className="card-project-title">{project.title}</h3>
                        <p className="card-project-desc">{project.description}</p>
                      </div>

                      <div>
                        <div className="card-tech-wrap">
                          {project.technologies.map((t) => (
                            <span key={t} className="tech-chip">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="card-action-row">
                          <span
                            className="mono-tag"
                            style={{ color: 'var(--pop-yellow)', fontSize: '0.72rem' }}
                          >
                            VERIFIED
                          </span>
                          <a
                            href={project.liveLink}
                            target={project.liveLink === '#' ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            className="card-action-btn"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Explore Case <FaArrowRight />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating Side Arrow Controls (Positioned at Screen Edges) */}
            <button
              className="arc-side-arrow arc-side-left"
              onClick={handlePrev}
              aria-label="Previous Project"
            >
              <FaChevronLeft />
            </button>

            <button
              className="arc-side-arrow arc-side-right"
              onClick={handleNext}
              aria-label="Next Project"
            >
              <FaChevronRight />
            </button>

            {/* Bottom Centered Dots & Autoplay Dock */}
            <div className="arc-bottom-dock">
              <div className="arc-dots-track">
                {projects.map((p, i) => (
                  <button
                    key={p.id}
                    className={`arc-dot ${i === activeIdx ? 'active' : ''}`}
                    onClick={(e) => selectCard(i, e)}
                    aria-label={`Go to project ${p.id}`}
                  />
                ))}
              </div>

              <button
                className="arc-autoplay-pill"
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                title={isAutoScrolling ? 'Click to Pause Auto-Scroll' : 'Click to Resume Auto-Scroll'}
              >
                <span className={`autoplay-dot ${isAutoScrolling ? 'active' : ''}`} />
                <span>{isAutoScrolling ? 'AUTO' : 'PAUSED'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ====================================================
            MODE 2: FALLING / GRAVITY DECK (User's falling request + Street Zine)
            ==================================================== */}
        {viewMode === 'GRAVITY' && (
          <div className="gravity-deck-grid">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="gravity-card-item"
                initial={{ opacity: 0, y: -40, rotate: isMobileScreen ? 0 : tilts[idx] * 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: isMobileScreen ? 0 : tilts[idx] }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  damping: 18,
                  stiffness: 140,
                  delay: (idx % 3) * 0.1,
                }}
              >
                <div className="gravity-top">
                  <span className="gravity-seq">#{project.id}</span>
                  <span className="gravity-badge">{project.category}</span>
                </div>

                <div>
                  <h3 className="gravity-title">{project.title}</h3>
                  <p className="gravity-desc">{project.description}</p>
                </div>

                <div>
                  <div className="gravity-tech-row">
                    {project.technologies.map((t) => (
                      <span key={t} className="gravity-tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.liveLink}
                    target={project.liveLink === '#' ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="gravity-btn"
                  >
                    Open Artifact <FaArrowRight />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
