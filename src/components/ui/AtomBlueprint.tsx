import React from 'react';
import { motion } from 'framer-motion';

type AtomBlueprintProps = {
	className?: string;
	strokeColor?: string;
	opacity?: number;
};

// 2D engineering-style atom blueprint (white line art), optimized for dark backgrounds
const AtomBlueprint: React.FC<AtomBlueprintProps> = ({
	className = '',
	strokeColor = '#FFFFFF',
	opacity = 1,
}) => {
	return (
		<div className={className} aria-label="BeCore Atom Blueprint" role="img">
			<svg
				viewBox="0 0 256 256"
				width="100%"
				height="100%"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="3" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Outer orbit (engineering stroke) */}
				<motion.circle
					cx="128"
					cy="128"
					r="92"
					stroke={strokeColor}
					strokeOpacity={opacity}
					strokeWidth="10"
					strokeLinecap="round"
					strokeLinejoin="round"
					filter="url(#glow)"
					initial={{ rotate: 0 }}
					animate={{ rotate: 360 }}
					transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
				/>

				{/* Inner orbit */}
				<motion.circle
					cx="128"
					cy="128"
					r="62"
					stroke={strokeColor}
					strokeOpacity={opacity}
					strokeWidth="10"
					strokeLinecap="round"
					strokeLinejoin="round"
					filter="url(#glow)"
					initial={{ rotate: 0 }}
					animate={{ rotate: -360 }}
					transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
				/>

				{/* Nucleus */}
				<circle cx="128" cy="128" r="28" fill={strokeColor} fillOpacity={opacity} filter="url(#glow)" />

				{/* Electron nodes (3 on outer, 1 on inner) */}
				{[
					{ r: 92, angle: -50 },
					{ r: 92, angle: 210 },
					{ r: 92, angle: 130 },
					{ r: 62, angle: 0 },
				].map((p, idx) => {
					const rad = (p.angle * Math.PI) / 180;
					const x = 128 + p.r * Math.cos(rad);
					const y = 128 + p.r * Math.sin(rad);
					return <circle key={idx} cx={x} cy={y} r="12" fill={strokeColor} fillOpacity={opacity} filter="url(#glow)" />;
				})}

				{/* Blueprint ticks (engineering feel) */}
				{Array.from({ length: 12 }).map((_, i) => {
					const a = (i / 12) * Math.PI * 2;
					const r1 = 98;
					const r2 = 106;
					const x1 = 128 + r1 * Math.cos(a);
					const y1 = 128 + r1 * Math.sin(a);
					const x2 = 128 + r2 * Math.cos(a);
					const y2 = 128 + r2 * Math.sin(a);
					return (
						<line
							key={`tick-${i}`}
							x1={x1}
							y1={y1}
							x2={x2}
							y2={y2}
							stroke={strokeColor}
							strokeOpacity={opacity * 0.5}
							strokeWidth="2"
							strokeLinecap="round"
						/>
					);
				})}
			</svg>
		</div>
	);
};

export default AtomBlueprint;


