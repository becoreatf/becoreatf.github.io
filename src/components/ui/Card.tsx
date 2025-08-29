import React from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'liquid' | 'glass' | 'solid';
  hoverable?: boolean;
  icon?: LucideIcon;
  title?: string;
  subtitle?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'liquid',
  hoverable = true,
  icon: Icon,
  title,
  subtitle,
  onClick,
}) => {
  const baseClasses = 'relative overflow-hidden';
  
  const variantClasses = {
    liquid: 'liquid-card',
    glass: 'glass-effect rounded-3xl p-6',
    solid: 'bg-graphite border border-steel-blue/30 rounded-3xl p-6',
  };
  
  const hoverClasses = hoverable 
    ? 'transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-neutron-cyan/20' 
    : '';
  
  const combinedClasses = clsx(
    baseClasses,
    variantClasses[variant],
    hoverClasses,
    className
  );

  return (
    <motion.div
      className={combinedClasses}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      whileHover={hoverable ? { y: -8 } : {}}
      onClick={onClick}
    >
      {/* Glow effect */}
      {hoverable && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-neutron-cyan/0 via-neutron-cyan/5 to-neutron-cyan/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      
      {/* Header with icon and title */}
      {(Icon || title) && (
        <div className="flex items-center gap-4 mb-4">
          {Icon && (
            <div className="p-3 rounded-2xl bg-neutron-cyan/10 border border-neutron-cyan/20">
              <Icon className="w-6 h-6 text-neutron-cyan" />
            </div>
          )}
          {title && (
            <div>
              <h3 className="text-xl font-display font-semibold text-white">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-steel-blue">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
