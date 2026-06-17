"use client";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
// import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef, Suspense } from "react";
import type { Group } from "three";

function SiteExecutionModel() {
  const model = useRef<Group>(null);
  const vehicles = useMemo(
    () => [
      { x: -1.55, z: 0.95, color: "#c96334" },
      { x: 1.35, z: -0.7, color: "#d5a15e" },
      { x: 0.2, z: 1.3, color: "#8aa7b2" },
    ],
    [],
  );

  useFrame(({ clock }) => {
    if (!model.current) return;
    model.current.rotation.y = -0.42 + Math.sin(clock.getElapsedTime() * 0.18) * 0.08;
  });

  return (
    <group ref={model} position={[0, -0.55, 0]} rotation={[0.18, -0.42, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <boxGeometry args={[5.2, 3.4, 0.08]} />
        <meshStandardMaterial color="#2b2b28" roughness={0.92} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[4.65, 2.75, 0.018]} />
        <meshStandardMaterial color="#3a3730" roughness={0.96} />
      </mesh>
      {Array.from({ length: 8 }, (_, index) => (
        <mesh key={`grid-x-${index}`} position={[-2.1 + index * 0.6, 0.09, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.018, 0.035, 2.6]} />
          <meshStandardMaterial color="#76716a" roughness={0.8} />
        </mesh>
      ))}
      {Array.from({ length: 5 }, (_, index) => (
        <mesh key={`grid-z-${index}`} position={[0, 0.1, -1.05 + index * 0.52]}>
          <boxGeometry args={[4.4, 0.035, 0.018]} />
          <meshStandardMaterial color="#76716a" roughness={0.8} />
        </mesh>
      ))}
      <group position={[-0.6, 0.2, -0.32]}>
        {Array.from({ length: 5 }, (_, index) => (
          <mesh key={index} position={[index * 0.28, index * 0.13, 0]} castShadow>
            <boxGeometry args={[0.24, 0.22 + index * 0.12, 0.58]} />
            <meshStandardMaterial color={index % 2 ? "#8b8b80" : "#6f716b"} roughness={0.88} metalness={0.08} />
          </mesh>
        ))}
      </group>
      <group position={[1.4, 0.25, 0.18]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.08, 1.05, 0.08]} />
          <meshStandardMaterial color="#2f3438" roughness={0.7} metalness={0.32} />
        </mesh>
        <mesh position={[-0.36, 1.03, 0]} castShadow>
          <boxGeometry args={[0.82, 0.055, 0.055]} />
          <meshStandardMaterial color="#c99b54" roughness={0.55} metalness={0.22} />
        </mesh>
        <mesh position={[-0.78, 0.66, 0]} castShadow>
          <boxGeometry args={[0.035, 0.78, 0.035]} />
          <meshStandardMaterial color="#c99b54" roughness={0.55} metalness={0.22} />
        </mesh>
      </group>
      {vehicles.map((vehicle) => (
        <group key={`${vehicle.x}-${vehicle.z}`} position={[vehicle.x, 0.18, vehicle.z]} castShadow>
          <mesh>
            <boxGeometry args={[0.42, 0.16, 0.24]} />
            <meshStandardMaterial color={vehicle.color} roughness={0.64} metalness={0.12} />
          </mesh>
          <mesh position={[0.06, 0.14, 0]}>
            <boxGeometry args={[0.18, 0.12, 0.2]} />
            <meshStandardMaterial color="#1c2327" roughness={0.68} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function HeroBuildingScene() {
  return (
    <Canvas
      className="hero-building-canvas"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows
    >
      <PerspectiveCamera makeDefault position={[0, 2.2, 5.6]} fov={42} />
      <ambientLight intensity={0.82} />
      <directionalLight position={[3.5, 5, 2.5]} intensity={2} castShadow />
      <pointLight position={[-2.8, 1.2, 2.2]} intensity={0.65} color="#d5a15e" />
      <Suspense fallback={null}>
        <SiteExecutionModel />
        {/* To use your own GLTF model, replace <SiteExecutionModel /> with: */}
        {/* <primitive object={useGLTF('/models/building.glb').scene} /> */}
      </Suspense>
      
      <EffectComposer>
        <Bloom luminanceThreshold={1.2} mipmapBlur intensity={0.8} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={0.9} />
      </EffectComposer>

      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.28} />
    </Canvas>
  );
}
