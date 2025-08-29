import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBlobProps {
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speed?: 'slow' | 'normal' | 'fast';
  blur?: boolean;
}

const AnimatedBlob: React.FC<AnimatedBlobProps> = ({
  className = '',
  color = '#00E5FF',
  size = 'md',
  speed = 'normal',
  blur = true,
}) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-96 h-96',
  };

  const speedDurations = {
    slow: 8,
    normal: 6,
    fast: 4,
  };

  const blobVariants = {
    animate: {
      scale: [1, 1.2, 0.8, 1.1, 1],
      rotate: [0, 90, 180, 270, 360],
      borderRadius: [
        '60% 40% 30% 70%',
        '30% 60% 70% 40%',
        '70% 30% 40% 60%',
        '40% 70% 60% 30%',
        '60% 40% 30% 70%',
      ],
    },
  };

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} ${blur ? 'blur-lg' : ''} ${className}`}
      style={{
        background: `radial-gradient(circle at 30% 40%, ${color}40, ${color}10, transparent 70%)`,
        filter: blur ? 'blur(40px)' : 'blur(0px)',
      }}
      variants={blobVariants}
      animate="animate"
      transition={{
        duration: speedDurations[speed],
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    />
  );
};

export default AnimatedBlob;
