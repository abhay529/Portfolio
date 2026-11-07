import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import './CustomCursor.css';

// Section color mapping for contextual cursor shifts
const SECTION_THEMES = {
  hero: { ring: '#FF5500', glow: 'rgba(255, 85, 0, 0.15)', label: 'EXPLORE' },
  about: { ring: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.12)', label: 'ABOUT' },
  skills: { ring: '#2563EB', glow: 'rgba(37, 99, 235, 0.12)', label: 'SKILLS' },
  experience: { ring: '#FFD600', glow: 'rgba(255, 214, 0, 0.15)', label: 'JOURNEY' },
  projects: { ring: '#FF5500', glow: 'rgba(255, 85, 0, 0.12)', label: 'PROJECTS' },
  contact: { ring: '#10B981', glow: 'rgba(16, 185, 129, 0.12)', label: 'CONNECT' },
  default: { ring: '#FF5500', glow: 'rgba(255, 85, 0, 0.1)', label: '' },
};

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState('default'); // default | hover | click | text | magnetic
  const [isVisible, setIsVisible] = useState(false);
  const [sectionTheme, setSectionTheme] = useState(SECTION_THEMES.default);
  const [hoverLabel, setHoverLabel] = useState('');
  const [isDesktop, setIsDesktop] = useState(false);
  const [trailDots, setTrailDots] = useState([]);
  const trailIdRef = useRef(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Core dot spring (tight, snappy)
  const dotSpring = { damping: 32, stiffness: 500, mass: 0.35 };
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);

  // Outer ring spring (laggier, fluid trail feel)
  const ringSpring = { damping: 18, stiffness: 180, mass: 1.0 };
  const ringX = useSpring(mouseX, ringSpring);
  const ringY = useSpring(mouseY, ringSpring);

  // Check desktop
  useEffect(() => {
    const check = () => {
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      const narrow = window.innerWidth < 900;
      setIsDesktop(!coarse && !narrow);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Detect which section the cursor is over
  const detectSection = useCallback((x, y) => {
    const el = document.elementFromPoint(x, y);
    if (!el) return;

    const section = el.closest('section[id]');
    if (section) {
      const id = section.id;
      if (SECTION_THEMES[id]) {
        setSectionTheme(SECTION_THEMES[id]);
        return;
      }
    }

    // Check if on game page
    const gamePage = el.closest('.hangman-universe');
    if (gamePage) {
      setSectionTheme({ ring: '#2563EB', glow: 'rgba(37, 99, 235, 0.15)', label: 'GAME' });
      return;
    }

    setSectionTheme(SECTION_THEMES.default);
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Spawn trail particles (throttled — every 4th pixel of movement)
      trailIdRef.current += 1;
      if (trailIdRef.current % 3 === 0) {
        const id = Date.now() + Math.random();
        setTrailDots((prev) => {
          const next = [...prev, { id, x: e.clientX, y: e.clientY }];
          if (next.length > 6) return next.slice(-6);
          return next;
        });

        // Auto-remove after animation
        setTimeout(() => {
          setTrailDots((prev) => prev.filter((d) => d.id !== id));
        }, 400);
      }

      // Section detection (throttled)
      if (trailIdRef.current % 10 === 0) {
        detectSection(e.clientX, e.clientY);
      }
    },
    [mouseX, mouseY, isVisible, detectSection]
  );

  // Attach interactive element listeners
  useEffect(() => {
    if (!isDesktop) return;

    window.addEventListener('mousemove', handleMouseMove);

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    // Click pulse
    const handleDown = () => setCursorState('click');
    const handleUp = () => setCursorState((prev) => (prev === 'click' ? 'default' : prev));
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    // Hover detection for interactive elements
    const hoverStart = (e) => {
      setCursorState('hover');
      // Check for data-cursor-label attribute
      const label = e.currentTarget.getAttribute('data-cursor-label') || '';
      if (label) setHoverLabel(label);
    };

    const hoverEnd = () => {
      setCursorState('default');
      setHoverLabel('');
    };

    // Text input detection
    const textStart = () => setCursorState('text');
    const textEnd = () => setCursorState('default');

    const attachListeners = () => {
      // Interactive hover targets
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], .arc-project-card, .gravity-card-item, .skill-loadout-card, .zine-feature-card, .trait-badge-chip, .view-mode-toggle .mode-btn, .skills-tab-btn, .hm-key-btn'
      );
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', hoverStart);
        el.removeEventListener('mouseleave', hoverEnd);
        el.addEventListener('mouseenter', hoverStart);
        el.addEventListener('mouseleave', hoverEnd);
      });

      // Text inputs
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
      inputs.forEach((el) => {
        el.removeEventListener('mouseenter', textStart);
        el.removeEventListener('mouseleave', textEnd);
        el.addEventListener('mouseenter', textStart);
        el.addEventListener('mouseleave', textEnd);
      });
    };

    attachListeners();
    const interval = setInterval(attachListeners, 2500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      clearInterval(interval);
    };
  }, [isDesktop, handleMouseMove]);

  if (!isDesktop || !isVisible) return null;

  const isHover = cursorState === 'hover';
  const isClick = cursorState === 'click';
  const isText = cursorState === 'text';

  return (
    <div className="dyn-cursor-wrapper" aria-hidden="true">
      {/* === Trail Particle Dots === */}
      <AnimatePresence>
        {trailDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="cursor-trail-dot"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              left: dot.x,
              top: dot.y,
              background: sectionTheme.ring,
            }}
          />
        ))}
      </AnimatePresence>

      {/* === Outer Context Ring (Lagging, Fluid) === */}
      <motion.div
        className={`cursor-context-ring ${isHover ? 'hover' : ''} ${isClick ? 'click' : ''} ${isText ? 'text' : ''}`}
        style={{
          x: ringX,
          y: ringY,
          borderColor: sectionTheme.ring,
          background: isHover ? sectionTheme.glow : 'transparent',
        }}
      >
        {/* Crosshair ticks inside ring */}
        {!isHover && !isText && (
          <>
            <span className="ring-tick tick-t" style={{ background: sectionTheme.ring }} />
            <span className="ring-tick tick-r" style={{ background: sectionTheme.ring }} />
            <span className="ring-tick tick-b" style={{ background: sectionTheme.ring }} />
            <span className="ring-tick tick-l" style={{ background: sectionTheme.ring }} />
          </>
        )}

        {/* Hover label text */}
        <AnimatePresence>
          {isHover && hoverLabel && (
            <motion.span
              className="cursor-hover-label"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              style={{ color: sectionTheme.ring }}
            >
              {hoverLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* === Inner Core Dot (Tight Spring, Always Centered) === */}
      <motion.div
        className={`cursor-core-dot ${isHover ? 'hover' : ''} ${isClick ? 'click' : ''} ${isText ? 'text' : ''}`}
        style={{
          x: dotX,
          y: dotY,
          background: isText ? 'transparent' : sectionTheme.ring,
          borderColor: isText ? sectionTheme.ring : 'transparent',
        }}
      />

      {/* === Section Label Micro-HUD (Bottom-Right Telemetry) === */}
      <AnimatePresence mode="wait">
        {sectionTheme.label && (
          <motion.div
            key={sectionTheme.label}
            className="cursor-section-hud"
            style={{ x: dotX, y: dotY }}
            initial={{ opacity: 0, x: 18, y: 18 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="section-hud-dot" style={{ background: sectionTheme.ring }} />
            <span className="section-hud-text">{sectionTheme.label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
