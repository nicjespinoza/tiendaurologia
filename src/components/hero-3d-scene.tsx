"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";

// A simple 3D Cross (+) to represent medical
function MedicalCross(props: any) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} {...props}>
      <group>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 1.0, 0.3]} />
          <meshStandardMaterial color="#338EAE" roughness={0.2} metalness={0.1} />
        </mesh>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.3, 0.3]} />
          <meshStandardMaterial color="#338EAE" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

// A capsule representing a pill/supplement
function Pill(props: any) {
  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2} {...props}>
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.2, 0.5, 16, 32]} />
        <meshStandardMaterial color="#FFA500" roughness={0.3} metalness={0.1} />
      </mesh>
    </Float>
  );
}

// A sleek medical tool or device representation
function TechRing(props: any) {
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1} {...props}>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[0.4, 0.1, 16, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
      </mesh>
    </Float>
  );
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-80 mix-blend-normal">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#338EAE" />
        
        <Suspense fallback={null}>
          <MedicalCross position={[3.5, 1.5, -2]} rotation={[0.5, 0.5, 0]} />
          <Pill position={[-4, -1, -3]} rotation={[-0.5, 0.2, 0.5]} />
          <TechRing position={[0, 2.5, -4]} rotation={[1, 0, 0]} />
          <MedicalCross position={[-3, 2, -1]} rotation={[0.2, -0.5, 0.1]} scale={0.6} />
          <Pill position={[2.5, -2.5, -1]} rotation={[0.5, -0.2, -0.5]} scale={0.7} />
          <TechRing position={[-1, -2, -2]} rotation={[-0.5, 0.5, 0]} scale={0.5} />
          
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
            far={4.5}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
