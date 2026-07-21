"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function OrbMesh({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Smooth rotation
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.25;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      {/* Morphing glass/liquid effect using Drei helper */}
      <MeshDistortMaterial
        color={color}
        distort={0.45}
        speed={2.0}
        roughness={0.15}
        metalness={0.05}
        clearcoat={0.8}
        clearcoatRoughness={0.1}
        transparent={true}
        opacity={0.9}
      />
    </mesh>
  );
}

export default function ProjectOrb({ color = "#4F46E5" }: { color?: string }) {
  return (
    <div className="w-full h-full select-none pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4.0], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 3, 3]} intensity={2.0} />
        <pointLight position={[-3, -3, -2]} intensity={1.0} color={color} />
        
        <OrbMesh color={color} />
      </Canvas>
    </div>
  );
}
