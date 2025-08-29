import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

type AtomBlueprint3DProps = {
	className?: string;
	color?: string; // line/sphere color (default white)
};

const AtomModel: React.FC<{ color: string }> = ({ color }) => {
	const rootRef = useRef<THREE.Group>(null);
	const innerPivotRef = useRef<THREE.Group>(null);
	const outerPivotRef = useRef<THREE.Group>(null);
  const innerHaloRefs = useRef<THREE.Mesh[]>([]);
  const outerHaloRefs = useRef<THREE.Mesh[]>([]);

	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		if (rootRef.current) rootRef.current.rotation.y = t * 0.1;
		// Inner orbit rotates in the opposite direction (counter to outer)
		if (innerPivotRef.current) innerPivotRef.current.rotation.y = -t * 0.8;
		if (outerPivotRef.current) outerPivotRef.current.rotation.y = -t * 0.5;

		// Pulse electron halos
		innerHaloRefs.current.forEach((m, i) => {
			if (m) m.scale.setScalar(1 + 0.15 * Math.sin(t * 2 + i));
		});
		outerHaloRefs.current.forEach((m, i) => {
			if (m) m.scale.setScalar(1 + 0.15 * Math.sin(t * 1.8 + i));
		});
	});

	return (
		<group ref={rootRef}>
			{/* Nucleus - simpler wireframe */}
			<Sphere args={[0.6, 12, 12]}>
				<meshBasicMaterial color={color} wireframe />
			</Sphere>

			{/* Inner orbit (two electrons) - ring rotates with electrons */}
			<group ref={innerPivotRef}>
				<Torus args={[1.2, 0.02, 24, 192]} rotation={[Math.PI / 2, 0, 0]}>
					<meshBasicMaterial color={color} wireframe />
				</Torus>
				{/* Inner electrons (high detail + halo ring) */}
				<Sphere args={[0.12, 32, 32]} position={[1.2, 0, 0]}>
					<meshBasicMaterial color={color} />
				</Sphere>
				<Torus args={[0.2, 0.005, 8, 32]} position={[1.2, 0, 0]} ref={(m: any)=> innerHaloRefs.current[0]=m}>
					<meshBasicMaterial color={color} transparent opacity={0.7} />
				</Torus>
				<Sphere args={[0.12, 32, 32]} position={[-1.2, 0, 0]}>
					<meshBasicMaterial color={color} />
				</Sphere>
				<Torus args={[0.2, 0.005, 8, 32]} position={[-1.2, 0, 0]} ref={(m: any)=> innerHaloRefs.current[1]=m}>
					<meshBasicMaterial color={color} transparent opacity={0.7} />
				</Torus>

				{/* Inner dotted path for extra detail */}
				{Array.from({ length: 48 }).map((_, i) => {
					const a = (i / 48) * Math.PI * 2;
					return (
						<Sphere key={`id${i}`} args={[0.02, 8, 8]} position={[Math.cos(a) * 1.2, 0, Math.sin(a) * 1.2]}>
							<meshBasicMaterial color={color} transparent opacity={0.35} />
						</Sphere>
					);
				})}
			</group>

			{/* Outer orbit (two electrons, tilted) - ring rotates with electrons */}
			<group ref={outerPivotRef} rotation={[Math.PI / 3, 0, 0]}>
				<Torus args={[1.9, 0.02, 24, 192]}>
					<meshBasicMaterial color={color} wireframe />
				</Torus>
				{/* Outer electrons (high detail + halo ring) */}
				<Sphere args={[0.12, 32, 32]} position={[1.9, 0, 0]}>
					<meshBasicMaterial color={color} />
				</Sphere>
				<Torus args={[0.22, 0.005, 8, 32]} position={[1.9, 0, 0]} ref={(m: any)=> outerHaloRefs.current[0]=m}>
					<meshBasicMaterial color={color} transparent opacity={0.6} />
				</Torus>
				<Sphere args={[0.12, 32, 32]} position={[-1.9, 0, 0]}>
					<meshBasicMaterial color={color} />
				</Sphere>
				<Torus args={[0.22, 0.005, 8, 32]} position={[-1.9, 0, 0]} ref={(m: any)=> outerHaloRefs.current[1]=m}>
					<meshBasicMaterial color={color} transparent opacity={0.6} />
				</Torus>

				{/* Outer dotted path */}
				{Array.from({ length: 64 }).map((_, i) => {
					const a = (i / 64) * Math.PI * 2;
					const x = Math.cos(a) * 1.9;
					const y = 0;
					const z = Math.sin(a) * 1.9;
					return (
						<Sphere key={`od${i}`} args={[0.018, 8, 8]} position={[x, y, z]}>
							<meshBasicMaterial color={color} transparent opacity={0.3} />
						</Sphere>
					);
				})}
			</group>

			{/* Blueprint cross lines */}
			<mesh rotation={[0, 0, 0]}>
				<cylinderGeometry args={[0.01, 0.01, 5.0, 6]} />
				<meshBasicMaterial color={color} transparent opacity={0.15} />
			</mesh>
			<mesh rotation={[0, 0, Math.PI / 2]}>
				<cylinderGeometry args={[0.01, 0.01, 5.0, 6]} />
				<meshBasicMaterial color={color} transparent opacity={0.15} />
			</mesh>
		</group>
	);
};

const AtomBlueprint3D: React.FC<AtomBlueprint3DProps> = ({ className = '', color = '#FFFFFF' }) => {
	return (
		<div className={`w-full h-full ${className}`}>
			<Canvas
				camera={{ position: [0, 2, 6], fov: 50 }}
				style={{ background: 'transparent' }}
				gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
			>
				{/* Minimal lights - basic materials don't rely on lights; keep ambient low */}
				<ambientLight intensity={0.1} />

				<AtomModel color={color} />

				<OrbitControls enableZoom enablePan={false} enableRotate autoRotate autoRotateSpeed={0.6} enableDamping dampingFactor={0.08} minDistance={3} maxDistance={10} />
			</Canvas>
		</div>
	);
};

export default AtomBlueprint3D;


