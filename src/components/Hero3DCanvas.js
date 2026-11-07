import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Inner Silicon Logic Core (Icosahedron + Wireframe Shell)
const SiliconLogicCore = ({ mousePos, scrollY }) => {
  const outerMeshRef = useRef();
  const innerMeshRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    // Gentle continuous spin
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x += delta * 0.35;
      outerMeshRef.current.rotation.y += delta * 0.45;

      // Parallax reaction to mouse
      const targetRotX = mousePos.current.y * 0.6;
      const targetRotY = mousePos.current.x * 0.6;
      outerMeshRef.current.rotation.x = THREE.MathUtils.lerp(
        outerMeshRef.current.rotation.x,
        targetRotX + scrollY.current * 0.002,
        0.05
      );
      outerMeshRef.current.rotation.y = THREE.MathUtils.lerp(
        outerMeshRef.current.rotation.y,
        targetRotY + scrollY.current * 0.003,
        0.05
      );
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= delta * 0.5;
      innerMeshRef.current.rotation.z += delta * 0.3;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.6;
      ring1Ref.current.rotation.y += delta * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.5;
      ring2Ref.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group position={[1.8, 0, 0]}>
      {/* Outer Floating Wireframe Cage */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh ref={outerMeshRef} scale={1.25}>
          <octahedronGeometry args={[1.3, 1]} />
          <meshStandardMaterial
            color="#FF5500"
            wireframe
            roughness={0.2}
            metalness={0.9}
            emissive="#FF5500"
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>

      {/* Inner Glowing Crystal Core */}
      <mesh ref={innerMeshRef} scale={0.75}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#FFD600"
          roughness={0.1}
          metalness={0.4}
          emissive="#FFD600"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Concentric Orbital Ring 1 (Cobalt Blue) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.8, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#2563EB"
          emissive="#2563EB"
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Concentric Orbital Ring 2 (Orange) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#FF5500"
          emissive="#FF5500"
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

// Secondary Floating Satellites (Left and Right Ambient 3D Shapes)
const FloatingSatellites = ({ mousePos, scrollY }) => {
  const leftShapeRef = useRef();

  useFrame((_, delta) => {
    if (leftShapeRef.current) {
      leftShapeRef.current.rotation.y += delta * 0.4;
      leftShapeRef.current.rotation.z += delta * 0.25;
      // Scroll parallax shift
      leftShapeRef.current.position.y = THREE.MathUtils.lerp(
        leftShapeRef.current.position.y,
        0.5 - scrollY.current * 0.0015,
        0.05
      );
    }
  });

  return (
    <group>
      {/* Floating Left Floating Geo Node */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.8}>
        <mesh ref={leftShapeRef} position={[-2.4, 0.8, -0.5]} scale={0.65}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#2563EB"
            wireframe
            roughness={0.2}
            emissive="#2563EB"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
};

// Main 3D Canvas Scene
const Hero3DCanvas = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
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
    <div className="hero-3d-scene-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FFE69B" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#2563EB" />

        <SiliconLogicCore mousePos={mousePos} scrollY={scrollY} />
        <FloatingSatellites mousePos={mousePos} scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default Hero3DCanvas;
