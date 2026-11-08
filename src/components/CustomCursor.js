import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const arrowRef = useRef(null);
  const auraRef = useRef(null);
  const rafIdRef = useRef(null);

  // Strictly verify desktop fine-pointer environment
  useEffect(() => {
    const checkEnvironment = () => {
      const isFine = window.matchMedia('(pointer: fine)').matches;
      const isWide = window.innerWidth >= 900;
      setIsDesktop(isFine && isWide);
    };

    checkEnvironment();
    window.addEventListener('resize', checkEnvironment);
    return () => window.removeEventListener('resize', checkEnvironment);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const arrowEl = arrowRef.current;
    const auraEl = auraRef.current;
    if (!arrowEl || !auraEl) return;

    let targetX = -100;
    let targetY = -100;
    let auraX = -100;
    let auraY = -100;
    let isVisible = false;

    // Direct 1:1 hardware pointermove (0 latency)
    const onPointerMove = (e) => {
      if (!isVisible) {
        isVisible = true;
        arrowEl.style.opacity = '1';
        auraEl.style.opacity = '1';
      }
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onPointerDown = () => {
      arrowEl.classList.add('cursor-down');
      auraEl.classList.add('cursor-down');
    };

    const onPointerUp = () => {
      arrowEl.classList.remove('cursor-down');
      auraEl.classList.remove('cursor-down');
    };

    const onMouseLeave = () => {
      isVisible = false;
      arrowEl.style.opacity = '0';
      auraEl.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      arrowEl.style.opacity = '1';
      auraEl.style.opacity = '1';
    };

    // Adaptive Event Delegation for hover targets
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isText = target.closest('input[type="text"], input[type="email"], textarea');
      const isInteractive = target.closest(
        'a, button, [role="button"], input[type="submit"], input[type="button"], .arc-project-card, .gravity-card-item, .skill-loadout-card, .zine-feature-card, .trait-badge-chip, .skills-tab-btn, .hm-key-btn, .arc-side-arrow, .mode-btn, .ticket-notched-btn, .contact-pod-badge'
      );

      if (isText) {
        arrowEl.classList.add('cursor-text');
        auraEl.classList.add('cursor-text');
        arrowEl.classList.remove('cursor-hover');
        auraEl.classList.remove('cursor-hover');
      } else if (isInteractive) {
        arrowEl.classList.add('cursor-hover');
        auraEl.classList.add('cursor-hover');
        arrowEl.classList.remove('cursor-text');
        auraEl.classList.remove('cursor-text');
      } else {
        arrowEl.classList.remove('cursor-hover', 'cursor-text');
        auraEl.classList.remove('cursor-hover', 'cursor-text');
      }
    };

    // GPU-accelerated render loop
    const render = () => {
      // Normal Arrow tip snaps directly to targetX, targetY with 0 latency
      arrowEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

      // Adaptive aura follows with smooth fluid momentum
      auraX += (targetX - auraX) * 0.24;
      auraY += (targetY - auraY) * 0.24;
      auraEl.style.transform = `translate3d(${auraX}px, ${auraY}px, 0)`;

      rafIdRef.current = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div className="adaptive-cursor-root" aria-hidden="true">
      {/* Adaptive Trailing Halo Aura */}
      <div ref={auraRef} className="adaptive-cursor-aura" />

      {/* Classic Normal Arrow Pointer with Adaptive SVG Geometry */}
      <div ref={arrowRef} className="adaptive-cursor-arrow">
        <svg
          className="adaptive-arrow-svg"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Classic Pointer Arrow Outline & Fill (Tip anchored precisely at 0,0) */}
          <path
            d="M2.5 1.5L9.5 21L13.8 13.5L21.5 11.2L2.5 1.5Z"
            fill="var(--paper-cream, #F5F1E8)"
            stroke="var(--ink-black, #11141A)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Adaptive Orange Tip Accent Pip */}
          <circle cx="5" cy="4" r="1.6" fill="var(--pop-orange, #FF5500)" />
        </svg>

        {/* Text Mode I-Beam */}
        <div className="adaptive-text-beam" />
      </div>
    </div>
  );
};

export default CustomCursor;
