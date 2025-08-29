import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  glow?: boolean;
  style?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  glow = false,
  style,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-neutron-cyan/20 text-neutron-cyan border border-neutron-cyan/30',
    secondary: 'bg-steel-blue/20 text-steel-blue border border-steel-blue/30',
    accent: 'bg-safety-yellow/20 text-safety-yellow border border-safety-yellow/30',
    outline: 'bg-transparent text-white border border-white/30 hover:border-neutron-cyan/50 hover:text-neutron-cyan',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };
  
  const glowClasses = glow ? 'shadow-lg shadow-current/30' : '';
  
  const combinedClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    glowClasses,
    className
  );

  return (
    <motion.span
      className={combinedClasses}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
