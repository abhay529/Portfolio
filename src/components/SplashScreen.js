import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import './SplashScreen.css';

// 3D Spline-Style Geometric Knot & Floating Rings
const SplineLoadingCore = ({ progress, mousePos }) => {
  const knotRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    // Majestic, cinematic rotation rate
    const speed = 0.5 + (progress / 100) * 0.75;

    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.45 * speed;
      knotRef.current.rotation.y += delta * 0.6 * speed;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x -= delta * 0.35;
      ring1Ref.current.rotation.z += delta * 0.25;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.4;
      ring2Ref.current.rotation.z -= delta * 0.2;
    }

    // Gentle parallax response to mouse on desktop
    if (groupRef.current && mousePos && mousePos.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePos.current.x * 0.4,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mousePos.current.y * 0.4,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Central Spline Torus Knot */}
        <mesh ref={knotRef} scale={1.15}>
          <torusKnotGeometry args={[0.9, 0.28, 128, 28]} />
          <meshStandardMaterial
            color="#FF5500"
            roughness={0.15}
            metalness={0.85}
            emissive="#FF5500"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Outer Wireframe Octahedron Cage */}
        <mesh scale={1.85}>
          <octahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#11141A"
            wireframe
            transparent
            opacity={0.16}
          />
        </mesh>

        {/* Concentric Gyroscope Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.0, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#2563EB"
            emissive="#2563EB"
            emissiveIntensity={0.85}
          />
        </mesh>

        <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.3, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#FFD600"
            emissive="#FFD600"
            emissiveIntensity={0.85}
          />
        </mesh>
      </Float>
    </group>
  );
};

const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING ARCHITECTURE');
  const [isDone, setIsDone] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Slower, cinematic progression: counts smoothly from 0% to 100% over ~3.5 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        // Smooth granular increments of 1% (with occasional 2% or deliberate micro-pause)
        // 100 steps * ~35ms = ~3.5 seconds of smooth, cinematic loading
        let step = 1;
        const rand = Math.random();
        if (rand < 0.22) {
          step = 0; // brief organic pause on a tick
        } else if (rand > 0.85 && prev < 85) {
          step = 2; // small burst
        }

        const next = Math.min(100, prev + step);

        if (next < 25) setStatusText('BOOTING CORE ENVIRONMENT');
        else if (next < 50) setStatusText('COMPILING 3D SHADERS & RUNTIMES');
        else if (next < 75) setStatusText('CALIBRATING TELEMETRY SENSORS');
        else if (next < 95) setStatusText('FINALIZING INTERFACES');
        else if (next < 100) setStatusText('SYNCHRONIZING ASSETS');
        else setStatusText('SYSTEM ONLINE // READY');

        return next;
      });
    }, 32);

    return () => clearInterval(interval);
  }, []);

  // When reaching 100%, hold for 650ms so user can enjoy the 100% completion state
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsDone(true);
        if (onFinish) onFinish();
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [progress, onFinish]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="splash-screen-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -30,
            transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Top Editorial Meta Bar */}
          <div className="splash-top-meta">
            <div className="splash-brand">
              <span className="splash-brand-dot" />
              <span className="splash-brand-text">ABHAY M // PORTFOLIO 2.0</span>
            </div>
            <div className="splash-status-pill">
              <span>{statusText}</span>
            </div>
          </div>

          {/* Center 3D Canvas Stage */}
          <div className="splash-3d-stage">
            <Canvas
              camera={{ position: [0, 0, 5.5], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 1.5]}
              style={{ pointerEvents: 'none' }}
            >
              <ambientLight intensity={0.7} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
              <pointLight position={[-8, -5, -5]} intensity={0.8} color="#2563EB" />
              <directionalLight position={[0, 6, 4]} intensity={1.0} color="#FFD600" />

              <SplineLoadingCore progress={progress} mousePos={mousePos} />
            </Canvas>
          </div>

          {/* Bottom Minimal Percentage & Progress Meter */}
          <div className="splash-bottom-deck">
            <div className="splash-number-row">
              <span className="splash-prefix">LOADING ASSETS</span>
              <span className="splash-counter">{progress}%</span>
            </div>

            {/* Calibrated Progress Rail */}
            <div className="splash-progress-track">
              <motion.div
                className="splash-progress-fill"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            <div className="splash-sub-info">
              <span>ECE GRADUATE // GATE ASPIRANT // CREATIVE TECH</span>
              <span>COET THALASSERY</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
