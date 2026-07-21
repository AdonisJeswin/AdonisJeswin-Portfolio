"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function InteractiveGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Extract normalized mouse pointer (-1 to 1) from fiber state
    const targetX = state.pointer.x * (Math.PI / 12); // ±15 degrees
    const targetY = state.pointer.y * (Math.PI / 12);
    
    // Smoothly interpolate (lerp) towards target mouse coordinates
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
    
    // Idle rotation spin on Z
    groupRef.current.rotation.z += 0.0015;
  });

  return (
    <group ref={groupRef}>
      {/* 1. Low-Poly Face Fill Core */}
      <mesh>
        <icosahedronGeometry args={[2.0, 1]} />
        <meshStandardMaterial
          color="#F2EFE9" // slightly darker warm off-white for depth
          roughness={0.5}
          metalness={0.05}
          flatShading={true}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
      
      {/* 2. Electric Indigo Wireframe Shell */}
      <mesh>
        <icosahedronGeometry args={[2.005, 1]} />
        <meshBasicMaterial
          color="#4F46E5"
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0 select-none pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft fill lighting */}
        <ambientLight intensity={1.0} />
        
        {/* Strong white key light */}
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        
        {/* Deep electric indigo fill light from reverse bottom */}
        <directionalLight position={[-5, -5, -3]} intensity={0.8} color="#4F46E5" />
        
        {/* Warm secondary point highlight */}
        <pointLight position={[0, 4, 2]} intensity={0.4} />

        <InteractiveGeometry />
      </Canvas>
    </div>
  );
}
