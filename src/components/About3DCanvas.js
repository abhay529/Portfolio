import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Orbiting Celestial Moon
const OrbitingMoon = ({ radius, speed, size, color, inclination = 0 }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = Math.sin(t * 1.5) * (radius * Math.sin(inclination));

    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
};

// Saturn-Style Planetary Dust Ring
const PlanetaryRing = ({ innerRadius, outerRadius, color, rotationSpeed = 0.2 }) => {
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * rotationSpeed;
    }
  });

  return (
    <group ref={ringRef} rotation={[Math.PI / 3, 0.2, 0]}>
      {/* Outer Ring */}
      <mesh>
        <ringGeometry args={[innerRadius, outerRadius, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          side={THREE.DoubleSide}
          transparent
          opacity={0.65}
          roughness={0.4}
        />
      </mesh>
      {/* Fine Outer Rim Ring */}
      <mesh>
        <torusGeometry args={[outerRadius + 0.05, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#FFD600"
          emissive="#FFD600"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
};

// Main Cosmic Celestial Body
const CelestialSpaceSystem = ({ mousePos, scrollY }) => {
  const groupRef = useRef();
  const planetRef = useRef();
  const haloRef = useRef();
  const gyroRingRef = useRef();

  useFrame((state, delta) => {
    // Planet rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.25;
    }

    // Gyroscope outer astrolabe spin
    if (gyroRingRef.current) {
      gyroRingRef.current.rotation.x += delta * 0.3;
      gyroRingRef.current.rotation.y += delta * 0.45;
    }

    // Gentle breathing halo
    if (haloRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
      haloRef.current.scale.set(s, s, s);
    }

    // Parallax reaction to mouse pointer & scroll
    if (groupRef.current) {
      const targetX = mousePos.current.x * 0.7;
      const targetY = mousePos.current.y * 0.5;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetX + scrollY.current * 0.0015,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -targetY,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[2.2, 0.2, 0]}>
      {/* Floating Center Celestial Planet */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
        {/* Core Planet */}
        <mesh ref={planetRef} scale={1.2}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#FFD600"
            emissive="#FF5500"
            emissiveIntensity={0.4}
            roughness={0.25}
            metalness={0.85}
            distort={0.22}
            speed={2}
          />
        </mesh>

        {/* Atmospheric Glow Shell */}
        <mesh ref={haloRef} scale={1.32}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#2563EB"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>

        {/* Primary Planetary Ring */}
        <PlanetaryRing innerRadius={1.7} outerRadius={2.35} color="#FF9900" rotationSpeed={0.2} />

        {/* Secondary Delicate Ring */}
        <PlanetaryRing innerRadius={2.55} outerRadius={2.75} color="#60A5FA" rotationSpeed={-0.15} />

        {/* Outer Gyroscope Astrolabe Ring */}
        <group ref={gyroRingRef}>
          <mesh>
            <torusGeometry args={[3.2, 0.02, 16, 120]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#FFFFFF"
              emissiveIntensity={0.9}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3.0, 0.015, 16, 120]} />
            <meshStandardMaterial
              color="#FFD600"
              emissive="#FFD600"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>

        {/* Multiple Orbiting Moons */}
        <OrbitingMoon radius={2.1} speed={0.8} size={0.16} color="#67E8F9" inclination={0.3} />
        <OrbitingMoon radius={3.6} speed={-0.5} size={0.22} color="#F59E0B" inclination={-0.4} />
        <OrbitingMoon radius={4.4} speed={0.35} size={0.12} color="#EC4899" inclination={0.6} />
      </Float>
    </group>
  );
};

const About3DCanvas = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mousePos.current.x = (e.clientX / innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="about-3d-scene-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-10, -5, -5]} intensity={0.8} color="#2563EB" />
        <directionalLight position={[0, 8, 5]} intensity={1.2} color="#FFD600" />

        {/* Realistic Deep Space Starfield */}
        <Stars
          radius={70}
          depth={50}
          count={1400}
          factor={4}
          saturation={0.7}
          fade
          speed={1.2}
        />

        {/* Space Planetary System */}
        <CelestialSpaceSystem mousePos={mousePos} scrollY={scrollY} />
      </Canvas>

      {/* Tactile PC Telemetry Badge */}
      <div className="about-space-hud">
        <span className="space-hud-pulse" />
        <span className="space-hud-text">
          CELESTIAL MATRIX // ORBITAL TELEMETRY: ACTIVE (3D SPACE ENGINE)
        </span>
      </div>
    </div>
  );
};

export default About3DCanvas;
