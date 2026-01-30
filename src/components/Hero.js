import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './Hero.css';
import abhayImg from "../assets/Abhay.png";

const roles = [
  "UI/UX DESIGNER",
  "ELECTRONICS ENGINEER",
  "IOT ENTHUSIAST",
  "PASSIONATE GAMER",
  "CREATIVE DEVELOPER"
];

const menuItems = [
  { name: "HOME", href: "#home", type: "hash" },
  { name: "ABOUT", href: "#about", type: "hash" },
  { name: "SKILLS", href: "#skills", type: "hash" },
  { name: "EXPERIENCE", href: "#experience", type: "hash" },
  { name: "PROJECTS", href: "#projects", type: "hash" },
  { name: "CONTACT", href: "#contact", type: "hash" },
  { name: "GAME", href: "/game", type: "route" },
//   { name: "404 PAGE", href: "/notfound", type: "route" },
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Morph transforms - More pronounced for smooth "conclusion"
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "60px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, []);

  const getScale = (text) => {
    const isMobile = windowWidth <= 768;
    const baseLength = isMobile ? 8 : 12;
    let textScale = text.length <= baseLength ? 1 : baseLength / text.length;

    if (isMobile) {
      return Math.max(0.25, textScale * 0.7);
    }
    return Math.max(0.4, textScale);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <section id="home" className="hero-modern" ref={sectionRef}>
      <motion.div
        className="hero-morph-wrapper"
        style={{ scale, borderRadius, opacity, y }}
      >
        {/* Top Navigation */}
        <div className="hero-top-nav">
          <div className="hero-logo">AK.</div>

          <div className={`hero-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
          </div>
        </div>

        {/* Fullscreen Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                className="menu-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />

              <motion.div
                className="fullscreen-menu"
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <button className="menu-close-btn" onClick={() => setIsMenuOpen(false)}>
                  <IoCloseOutline />
                </button>

                <div className="menu-content">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      onClick={() => setIsMenuOpen(false)}
                      className="menu-item-wrapper"
                    >
                      {item.type === "route" ? (
                        <Link to={item.href} className="menu-item">
                          <span className="item-number">0{i + 1}</span>
                          <span className="item-name">{item.name}</span>
                        </Link>
                      ) : (
                        <a href={item.href} className="menu-item">
                          <span className="item-number">0{i + 1}</span>
                          <span className="item-name">{item.name}</span>
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="menu-background-text">NAVIGATE</div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="hero-main-layout">
          <motion.div
            className="hero-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-im">I'm</span>
            <span className="hero-role">ABHAY</span>
          </motion.div>

          <div className="hero-visual-center">
            <div className="hero-big-text-container">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={roles[roleIndex]}
                  className="hero-big-text"
                  style={{
                    scale: getScale(roles[roleIndex]),
                    transformOrigin: 'center'
                  }}
                  initial={{ opacity: 0, y: 20, scale: getScale(roles[roleIndex]) * 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: getScale(roles[roleIndex]) }}
                  exit={{ opacity: 0, y: -20, scale: getScale(roles[roleIndex]) * 0.9 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {roles[roleIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>

            <motion.div
              className="hero-portrait-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <img src={abhayImg} alt="Abhay M" className="hero-portrait" />
            </motion.div>
          </div>

          <motion.div
            className="hero-bottom-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#contact"
              className="chat-btn"
              style={{ textDecoration: 'none', display: 'inline-block' }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#001F3D",
                color: "var(--bg-color)",
                boxShadow: "0 20px 60px rgba(0, 31, 61, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              LET'S CHAT
            </motion.a>

            <motion.a
              href="https://drive.google.com/file/d/1PVY7UJqGHJlRHW1RHd_e5TokJuT8zboS/view?usp=sharing"
              target="_blank"
              className="resume-btn"
              style={{ textDecoration: 'none', display: 'inline-block' }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#fff",
                color: "#001F3D",
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              VIEW RESUME
            </motion.a>
          </motion.div>
          
          <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.2, duration: 1 }}
           style={{ marginTop: '20px', zIndex: 10 }}
          >
              <Link to="/game" className="game-feature-link">
                  🕹️ <span>BORED? PLAY MINIGAME</span>
              </Link>
          </motion.div>
        </div>

        {/* Sidebar-style Side Contents */}
        <div className="hero-side-content left">
          <div className="side-dash"></div>
          <p>SPECIALIZED IN WEB DESIGN,<br />UIUX WORKFLOW, AND FRONT<br />END DEVELOPMENT.</p>
        </div>

        <div className="hero-side-content right">
          <p>Build a credible, conversion-focused<br />website that shows your ideal client<br />exactly how you can help them.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
