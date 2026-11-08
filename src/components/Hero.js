import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
import './Hero.css';
import abhayImg from '../assets/Abhay.png';
import Hero3DCanvas from './Hero3DCanvas';

const roles = [
  "ELECTRONICS ENGINEER",
  "GATE ASPIRANT",
  "EMBEDDED & IOT",
  "TECH EXPLORER"
];

const menuItems = [
  { name: "About", href: "#about", num: "01" },
  { name: "Projects", href: "#projects", num: "02" },
  { name: "Skills", href: "#skills", num: "03" },
  { name: "Experience", href: "#experience", num: "04" },
  { name: "Contact", href: "#contact", num: "05" },
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const coordsRef = useRef(null);

  const isDesktop = windowWidth >= 900;

  // Window resize tracking
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cycle hero words
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Lock body scroll and prevent touch through when mobile drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  // Scroll Parallax Transforms (Only activated on desktop)
  const { scrollY } = useScroll();
  const backdropY = useTransform(scrollY, [0, 800], [0, 160]);
  const portraitY = useTransform(scrollY, [0, 800], [0, -50]);
  const tagTopLeftY = useTransform(scrollY, [0, 800], [0, -100]);
  const tagTopRightY = useTransform(scrollY, [0, 800], [0, -130]);
  const tagBottomLeftY = useTransform(scrollY, [0, 800], [0, 70]);
  const tagBottomRightY = useTransform(scrollY, [0, 800], [0, 100]);

  // Interactive 3D Mouse Tilt Physics (PC only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springTiltX = useSpring(useTransform(mouseY, [-350, 350], [4.5, -4.5]), {
    damping: 24,
    stiffness: 160,
  });
  const springTiltY = useSpring(useTransform(mouseX, [-350, 350], [-4.5, 4.5]), {
    damping: 24,
    stiffness: 160,
  });

  const handleStageMouseMove = (e) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
    if (coordsRef.current) {
      coordsRef.current.textContent = `X: ${Math.round(e.clientX)}px | Y: ${Math.round(e.clientY)}px`;
    }
  };

  const handleCloseMenu = (e) => {
    if (e && e.cancelable) e.preventDefault();
    setIsMenuOpen(false);
  };

  const handleToggleMenu = (e) => {
    if (e && e.cancelable) e.preventDefault();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header
      id="home"
      className="hero-mashup"
      onMouseMove={handleStageMouseMove}
    >
      {/* Top Zine Navigation */}
      <nav className="mashup-nav">
        <Link to="/" className="brand-lockup">
          <span className="brand-monogram">AK.</span>
          <span className="brand-tag">VOL. 26 // PORTFOLIO</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links-desktop">
          {menuItems.map((item) => (
            <a key={item.name} href={item.href} className="nav-link-pill">
              {item.name}
            </a>
          ))}
          <Link to="/game" className="nav-game-token">
            <span>🕹️</span> MINIGAME
          </Link>
        </div>

        {/* Mobile Nav Button */}
        <button
          className="mobile-nav-toggle"
          onClick={handleToggleMenu}
          onTouchEnd={handleToggleMenu}
          aria-label="Toggle Navigation"
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>
      </nav>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu-drawer"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="mobile-drawer-header">
              <span className="brand-monogram">AK.</span>
              <button
                className="mobile-close-btn"
                onClick={handleCloseMenu}
                onTouchEnd={handleCloseMenu}
                aria-label="Close Navigation"
              >
                <IoCloseOutline />
              </button>
            </div>

            <div className="mobile-links-list">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="mobile-link-item"
                  onClick={handleCloseMenu}
                  onTouchEnd={handleCloseMenu}
                >
                  <span className="mobile-link-num">{item.num}</span>
                  <span>{item.name}</span>
                </a>
              ))}
            </div>

            <div className="mono-tag" style={{ color: 'var(--ink-muted)' }}>
              ABHAY M // KANNUR, KERALA
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Stage Body */}
      <div className="hero-stage-body">
        {/* Giant Monolithic Typographic Backdrop with Scroll Parallax (PC) */}
        <motion.div
          className="hero-giant-backdrop"
          style={{ y: isDesktop ? backdropY : 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={roles[roleIndex]}
              className="hero-giant-word"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {roles[roleIndex].split(" ")[0]}
            </motion.h1>
          </AnimatePresence>
        </motion.div>

        {/* 3D Kinetic Quantum Model with Parallax (Rendered on PC only) */}
        {isDesktop && <Hero3DCanvas />}

        {/* Center Cutout Portrait Collage with 3D Depth & Tilt */}
        <div className="hero-portrait-stage">
          {/* Floating Sticker 1: Top Left Doodle Note */}
          <motion.div
            className="floating-doodle doodle-tag-top-left"
            drag
            dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            whileHover={{ scale: 1.08, rotate: -6 }}
            whileTap={{ scale: 0.95 }}
            style={{ y: isDesktop ? tagTopLeftY : 0 }}
          >
            <div className="doodle-hand-annotation">
              <span className="doodle-star">★</span>
              <span>B.Tech ECE // COET Graduate</span>
            </div>
          </motion.div>

          {/* Floating Sticker 2: Top Right Streetwear Badge */}
          <motion.div
            className="floating-doodle doodle-tag-top-right"
            drag
            dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            whileHover={{ scale: 1.08, rotate: 12 }}
            whileTap={{ scale: 0.95 }}
            style={{ y: isDesktop ? tagTopRightY : 0 }}
          >
            <span className="sticker-pill cobalt">
              ⚡ GATE ASPIRANT // CORE EC
            </span>
          </motion.div>

          {/* The Clean Cutout Portrait with 3D Perspective Tilt (PC) */}
          <motion.div
            className="hero-portrait-frame"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              y: isDesktop ? portraitY : 0,
              rotateX: isDesktop ? springTiltX : 0,
              rotateY: isDesktop ? springTiltY : 0,
              transformPerspective: 1000,
            }}
          >
            <img
              src={abhayImg}
              alt="Abhay M"
              className="hero-cutout-img"
            />
          </motion.div>

          {/* Floating Sticker 3: Bottom Left Coordinates */}
          <motion.div
            className="floating-doodle doodle-tag-bottom-left"
            drag
            dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            whileHover={{ scale: 1.08, rotate: 8 }}
            whileTap={{ scale: 0.95 }}
            style={{ y: isDesktop ? tagBottomLeftY : 0 }}
          >
            <span className="sticker-pill yellow">
              📍 KANNUR, IN // 2026
            </span>
          </motion.div>

          {/* Floating Sticker 4: Bottom Right Good Vibes Badge */}
          <motion.div
            className="floating-doodle doodle-tag-bottom-right"
            drag
            dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            whileHover={{ scale: 1.08, rotate: -4 }}
            whileTap={{ scale: 0.95 }}
            style={{ y: isDesktop ? tagBottomRightY : 0 }}
          >
            <span className="sticker-pill orange">
              EX-DESIGN LEAD (IEEE SB COET)
            </span>
          </motion.div>
        </div>

        {/* Live Telemetry Sensor HUD (PC Only) */}
        {isDesktop && (
          <div className="hero-pc-telemetry-strip">
            <span>✦ 3D PARALLAX: ACTIVE</span>
            <span ref={coordsRef}>X: 0px | Y: 0px</span>
            <span>ENGINE: WEBGL 3D</span>
          </div>
        )}

        {/* Hero Editorial Narrative */}
        <div className="hero-editorial-footer">
          <div className="hero-role-badge-row">
            <span className="sticker-pill lime">✦ FOCUS: GATE PREPARATION</span>
            <span className="sticker-pill">B.TECH ECE // COET ALUMNI</span>
          </div>

          <h2 className="hero-main-heading">
            Engineering The Edge. <br />
            <span className="highlight-tag">Silicon &amp; Core Systems.</span>
          </h2>

          <p className="hero-sub-bio">
            Electronics &amp; Communication Engineering graduate from College of Engineering Thalassery (COET), now actively preparing for GATE. Passionate about embedded silicon architectures, signal processing, and core engineering systems.
          </p>

          <div className="hero-action-cluster">
            <a href="#contact" className="btn-chunky-primary">
              LET'S CHAT ↗
            </a>
            <a
              href="https://drive.google.com/file/d/1PVY7UJqGHJlRHW1RHd_e5TokJuT8zboS/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-chunky-secondary"
            >
              VIEW RESUME 📄
            </a>
          </div>
        </div>
      </div>

      {/* Infinite Ticker Marquee Tape (Streetwear/Brutalist Transition) */}
      <div className="marquee-container">
        <div className="marquee-track">
          {[1, 2].map((k) => (
            <React.Fragment key={k}>
              <span className="marquee-item">
                <span className="marquee-star">✦</span> ABHAY M
              </span>
              <span className="marquee-item">
                <span className="marquee-star">✦</span> B.TECH ECE (COET)
              </span>
              <span className="marquee-item">
                <span className="marquee-star">✦</span> GATE ASPIRANT
              </span>
              <span className="marquee-item">
                <span className="marquee-star">✦</span> EMBEDDED SYSTEMS
              </span>
              <span className="marquee-item">
                <span className="marquee-star">✦</span> EX-DESIGN LEAD (IEEE SB COET)
              </span>
              <span className="marquee-item">
                <span className="marquee-star">✦</span> RETINA EMULATOR (FPGA)
              </span>
              <span className="marquee-item">
                <span className="marquee-star">✦</span> RASPBERRY PI & IOT
              </span>
              <span className="marquee-item">
                <span className="marquee-star">✦</span> NASA SPACE APPS HACKATHON
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Hero;
