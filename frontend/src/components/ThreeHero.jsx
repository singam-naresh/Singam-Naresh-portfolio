import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";

// Main hero shape – layered rings + inner core
function HeroCore() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    // Smooth auto rotation
    groupRef.current.rotation.y = t * 0.6;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.25;

    // Subtle breathing scale
    const s = 1 + Math.sin(t * 0.9) * 0.04;
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef}>
      {/* Outer ribbon / ring */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh castShadow>
          <torusKnotGeometry args={[0.95, 0.22, 260, 40]} />
          <meshStandardMaterial
            metalness={0.9}
            roughness={0.15}
            color="#8b5cf6"       // violet
            emissive="#22d3ee"    // cyan glow
            emissiveIntensity={0.7}
          />
        </mesh>
      </Float>

      {/* Inner glowing core */}
      <Float speed={1.6} rotationIntensity={0.8} floatIntensity={0.9}>
        <mesh position={[0.1, 0.08, 0.05]}>
          <icosahedronGeometry args={[0.45, 1]} />
          <meshStandardMaterial
            metalness={0.85}
            roughness={0.25}
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>

      {/* Thin halo ring behind – gives depth */}
      <mesh rotation={[Math.PI / 2.1, 0, 0]} scale={[2.1, 2.1, 2.1]}>
        <torusGeometry args={[1.15, 0.03, 40, 160]} />
        <meshStandardMaterial
          metalness={0.4}
          roughness={0.95}
          color="#020617"
          emissive="#1e293b"
          emissiveIntensity={0.45}
        />
      </mesh>
    </group>
  );
}

export default function ThreeHero() {
  return (
    <div
      style={{
        width: "100%",
        height: 260,
        borderRadius: "1.25rem",
        overflow: "hidden",
        border: "1px solid var(--card-border)",
        background:
          "radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,0.3))",
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0.6, 3.4], fov: 45 }}
        dpr={[1, 2]}
      >
        {/* Lights */}
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={1.4}
          castShadow
        />
        <directionalLight
          position={[-3, -2, -4]}
          intensity={0.8}
          color="#38bdf8"
        />

        {/* Mouse control + auto rotate */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.6}
        />

        <Suspense fallback={null}>
          <HeroCore />
        </Suspense>
      </Canvas>
    </div>
  );
}
