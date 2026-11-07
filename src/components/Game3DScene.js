import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating Tactical Cyber Node / Game Crystal
const FloatingGameNode = ({ position, color, scale = 0.5, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4 * speed;
      meshRef.current.rotation.y += delta * 0.6 * speed;
    }
  });

  return (
    <Float speed={2 * speed} rotationIntensity={1.5} floatIntensity={1.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </Float>
  );
};

// Central 3D Holographic Decryption Core (Reacts dynamically to gameplay)
const HolographicDecryptionCore = ({ chancesRemaining, isWon, isLoss, lastAction, mousePos }) => {
  const outerCageRef = useRef();
  const innerCoreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const groupRef = useRef();

  // Determine core color based on game state
  let coreColor = '#2563EB'; // Default cobalt cyan
  let emissiveIntensity = 0.5;

  if (isWon) {
    coreColor = '#FFD600'; // Victory Gold
    emissiveIntensity = 1.0;
  } else if (isLoss) {
    coreColor = '#EF4444'; // Red Glitch
    emissiveIntensity = 0.8;
  } else if (lastAction === 'correct') {
    coreColor = '#10B981'; // Emerald Flash
    emissiveIntensity = 0.9;
  } else if (lastAction === 'wrong') {
    coreColor = '#EF4444'; // Red Shock
    emissiveIntensity = 0.95;
  }

  useFrame((_, delta) => {
    const spinMultiplier = isWon ? 2.5 : lastAction === 'correct' ? 2 : 1;

    if (outerCageRef.current) {
      outerCageRef.current.rotation.x += delta * 0.5 * spinMultiplier;
      outerCageRef.current.rotation.y += delta * 0.7 * spinMultiplier;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x -= delta * 0.8 * spinMultiplier;
      innerCoreRef.current.rotation.z += delta * 0.6 * spinMultiplier;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.9;
      ring1Ref.current.rotation.y += delta * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.7;
      ring2Ref.current.rotation.z += delta * 0.5;
    }

    // Gentle parallax response to mouse cursor
    if (groupRef.current) {
      const targetRotX = mousePos.current.y * 0.45;
      const targetRotY = mousePos.current.x * 0.45;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.4, -1]}>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
        {/* Outer Wireframe Dodecahedron Cage */}
        <mesh ref={outerCageRef} scale={1.4}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={coreColor}
            emissive={coreColor}
            emissiveIntensity={emissiveIntensity}
            wireframe
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Glowing Crystal Core */}
        <mesh ref={innerCoreRef} scale={0.75}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={isWon ? '#FFD600' : '#FFFFFF'}
            emissive={coreColor}
            emissiveIntensity={emissiveIntensity + 0.3}
            roughness={0.1}
            metalness={0.3}
            wireframe={isLoss}
          />
        </mesh>

        {/* Concentric Coordinate Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.0, 0.02, 16, 80]} />
          <meshStandardMaterial
            color={isWon ? '#FFD600' : '#38BDF8'}
            emissive={isWon ? '#FFD600' : '#38BDF8'}
            emissiveIntensity={0.7}
          />
        </mesh>

        <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.3, 0.015, 16, 80]} />
          <meshStandardMaterial
            color="#FF5500"
            emissive="#FF5500"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>
    </group>
  );
};

const Game3DScene = ({ chancesRemaining, isWon, isLoss, lastAction }) => {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mousePos.current.x = (e.clientX / innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="game-3d-canvas-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[8, 8, 8]} intensity={1.2} color="#FFFFFF" />
        <pointLight position={[-8, -5, -5]} intensity={0.8} color="#2563EB" />
        <directionalLight position={[0, 6, 4]} intensity={1.0} color="#FFD600" />

        {/* Ambient 3D Star / Cyber Particle Field */}
        <Stars
          radius={50}
          depth={40}
          count={900}
          factor={3.5}
          saturation={0.7}
          fade
          speed={1.5}
        />

        {/* Dynamic Holographic Core */}
        <HolographicDecryptionCore
          chancesRemaining={chancesRemaining}
          isWon={isWon}
          isLoss={isLoss}
          lastAction={lastAction}
          mousePos={mousePos}
        />

        {/* Floating Peripheral Tactical Nodes */}
        <FloatingGameNode position={[-3.8, 1.8, -2]} color="#FF5500" scale={0.4} speed={0.8} />
        <FloatingGameNode position={[3.8, 1.6, -2]} color="#2563EB" scale={0.45} speed={1.1} />
        <FloatingGameNode position={[-3.2, -1.8, -2.5]} color="#10B981" scale={0.35} speed={0.9} />
        <FloatingGameNode position={[3.4, -1.9, -2.5]} color="#FFD600" scale={0.38} speed={1.2} />
      </Canvas>
    </div>
  );
};

export default Game3DScene;
