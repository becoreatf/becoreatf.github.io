import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Simple Holographic Atom
const BerylliumAtomModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 1.5;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 1.2;
      ring2Ref.current.rotation.x = Math.sin(time) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nucleus - Central core */}
      <group>
        {/* Main nucleus sphere */}
        <Sphere args={[0.4]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#00E5FF" 
            emissive="#00E5FF" 
            emissiveIntensity={4.0}
          />
        </Sphere>
        
        {/* Nucleus particles */}
        <Sphere args={[0.12]} position={[0.3, 0.2, 0.1]}>
          <meshStandardMaterial 
            color="#00E5FF" 
            emissive="#00E5FF" 
            emissiveIntensity={3.0}
          />
        </Sphere>
        <Sphere args={[0.12]} position={[-0.2, 0.3, -0.1]}>
          <meshStandardMaterial 
            color="#00E5FF" 
            emissive="#00E5FF" 
            emissiveIntensity={3.0}
          />
        </Sphere>
        <Sphere args={[0.12]} position={[0.1, -0.3, 0.2]}>
          <meshStandardMaterial 
            color="#00E5FF" 
            emissive="#00E5FF" 
            emissiveIntensity={3.0}
          />
        </Sphere>
      </group>

      {/* First electron shell */}
      <group ref={ring1Ref}>
        {/* First orbital ring */}
        <Torus args={[1.8, 0.03, 8, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color="#00E5FF" 
            transparent 
            opacity={0.8}
            emissive="#00E5FF" 
            emissiveIntensity={2.0}
          />
        </Torus>
        
        {/* First shell electrons */}
        <Sphere args={[0.1]} position={[1.8, 0, 0]}>
          <meshStandardMaterial 
            color="#00E5FF" 
            emissive="#00E5FF" 
            emissiveIntensity={5.0}
          />
        </Sphere>
        <Sphere args={[0.1]} position={[-1.8, 0, 0]}>
          <meshStandardMaterial 
            color="#00E5FF" 
            emissive="#00E5FF" 
            emissiveIntensity={5.0}
          />
        </Sphere>
      </group>

      {/* Second electron shell */}
      <group ref={ring2Ref}>
        {/* Second orbital ring */}
        <Torus args={[2.8, 0.03, 8, 64]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial 
            color="#00E5FF" 
            transparent 
            opacity={0.6}
            emissive="#00E5FF" 
            emissiveIntensity={1.5}
          />
        </Torus>
        
        {/* Second shell electrons */}
        <Sphere args={[0.1]} position={[2.8, 0, 0]}>
          <meshStandardMaterial 
            color="#00E5FF" 
            emissive="#00E5FF" 
            emissiveIntensity={5.0}
          />
        </Sphere>
        <Sphere args={[0.1]} position={[-2.8, 0, 0]}>
          <meshStandardMaterial 
            color="#00E5FF" 
            emissive="#00E5FF" 
            emissiveIntensity={5.0}
          />
        </Sphere>
      </group>

      {/* Connection lines between nucleus and electrons */}
      <mesh>
        <cylinderGeometry args={[0.01, 0.01, 3.6, 8]} />
        <meshStandardMaterial 
          color="#00E5FF" 
          transparent 
          opacity={0.3}
          emissive="#00E5FF" 
          emissiveIntensity={1.0}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 3.6, 8]} />
        <meshStandardMaterial 
          color="#00E5FF" 
          transparent 
          opacity={0.3}
          emissive="#00E5FF" 
          emissiveIntensity={1.0}
        />
      </mesh>

      {/* Outer energy field */}
      <Sphere args={[4.0]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#00E5FF" 
          transparent 
          opacity={0.1} 
          side={THREE.BackSide}
          emissive="#00E5FF"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Orbital path indicators */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const radius = 1.8;
        return (
          <Sphere 
            key={`path1-${i}`}
            args={[0.02]} 
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
          >
            <meshStandardMaterial 
              color="#00E5FF" 
              transparent 
              opacity={0.4}
              emissive="#00E5FF" 
              emissiveIntensity={1.0}
            />
          </Sphere>
        );
      })}

      {Array.from({ length: 32 }).map((_, i) => {
        const angle = (i / 32) * Math.PI * 2;
        const radius = 2.8;
        const y = Math.sin(angle) * 0.5; // Tilted orbit
        return (
          <Sphere 
            key={`path2-${i}`}
            args={[0.015]} 
            position={[
              Math.cos(angle) * radius * Math.cos(Math.PI / 3),
              y,
              Math.sin(angle) * radius * Math.sin(Math.PI / 3)
            ]}
          >
            <meshStandardMaterial 
              color="#00E5FF" 
              transparent 
              opacity={0.3}
              emissive="#00E5FF" 
              emissiveIntensity={0.8}
            />
          </Sphere>
        );
      })}
    </group>
  );
};

interface BerylliumAtom3DProps {
  className?: string;
}

export const BerylliumAtom3D: React.FC<BerylliumAtom3DProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ 
          position: [0, 2, 12], 
          fov: 50,
          near: 0.1,
          far: 100 
        }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance" 
        }}
      >
        {/* Bright Hologram Lighting */}
        <ambientLight intensity={0.3} color="#001133" />
        
        <pointLight 
          position={[10, 10, 10]} 
          intensity={2.0} 
          color="#00E5FF" 
        />
        
        <pointLight 
          position={[-10, 10, -10]} 
          intensity={1.5} 
          color="#00E5FF" 
        />
        
        <pointLight 
          position={[0, -10, 0]} 
          intensity={1.2} 
          color="#00E5FF" 
        />

        {/* Beryllium Atom */}
        <BerylliumAtomModel />

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={1}
          minDistance={6}
          maxDistance={15}
          enableDamping={true}
          dampingFactor={0.1}
        />
      </Canvas>
    </div>
  );
};

export default BerylliumAtom3D;
