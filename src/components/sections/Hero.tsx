import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap, Shield, Atom } from 'lucide-react';
import Button from '../ui/Button';
// import Badge from '../ui/Badge';
import AnimatedBlob from '../ui/AnimatedBlob';
import AtomBlueprint3D from '../ui/AtomBlueprint3D';
import TypewriterEffect from '../ui/TypewriterEffect';

import type { SiteConfig } from '../../config/siteConfig';

interface HeroProps {
  siteConfig: SiteConfig;
}

const Hero: React.FC<HeroProps> = ({ siteConfig }) => {
  const { hero } = siteConfig;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-navy via-graphite to-dark-navy" />
      <div className="absolute inset-0 bg-noise opacity-5" />
      
      {/* Animated Blobs - Responsive positioning */}
      <AnimatedBlob 
        className="top-10 sm:top-20 left-5 sm:left-10" 
        color="#00E5FF" 
        size="md" 
        speed="slow" 
      />
      <AnimatedBlob 
        className="top-20 sm:top-40 right-5 sm:right-20" 
        color="#F4D35E" 
        size="sm" 
        speed="normal" 
      />
      <AnimatedBlob 
        className="bottom-20 sm:bottom-32 left-1/4" 
        color="#3A506B" 
        size="lg" 
        speed="fast" 
      />
      <AnimatedBlob 
        className="bottom-10 sm:bottom-20 right-5 sm:right-10" 
        color="#00E5FF" 
        size="sm" 
        speed="slow" 
      />

      {/* Glow Effects - Responsive */}
      <div className="absolute top-1/4 sm:top-1/3 left-1/4 sm:left-1/3 w-48 sm:w-96 h-48 sm:h-96 bg-neutron-cyan/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 sm:bottom-1/3 right-1/4 sm:right-1/3 w-32 sm:w-64 h-32 sm:h-64 bg-safety-yellow/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content - Improved spacing and layout */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
        {/* Side by side layout - Atom left, Content right */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-0 items-center">
          
          {/* Left: 3D Atom - Much bigger */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.1 }}
            className="order-1 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="w-[24rem] h-[24rem] sm:w-[28rem] sm:h-[28rem] md:w-[32rem] md:h-[32rem] lg:w-[36rem] lg:h-[36rem] xl:w-[40rem] xl:h-[40rem]">
              <AtomBlueprint3D />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="order-2 lg:order-2 text-center lg:text-left space-y-4 lg:space-y-6"
          >
            {/* Main Title */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
              >
                <span className="block bg-gradient-to-r from-white via-neutron-cyan to-white bg-clip-text text-transparent">
                  BeCore
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-neutron-cyan to-safety-yellow bg-clip-text text-transparent mt-2">
                  <TypewriterEffect 
                    phrases={hero.typewriterSlogans}
                    typingSpeed={80}
                    deletingSpeed={40}
                    pauseTime={2500}
                  />
                </span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed"
            >
              {hero.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4"
            >
              {hero.ctaButtons.map((button, index) => (
                <Button
                  key={index}
                  href={button.href}
                  variant={button.variant}
                  size="md"
                  icon={button.variant === 'primary' ? ArrowRight : Play}
                  iconPosition={button.variant === 'primary' ? 'right' : 'left'}
                  className="group w-full sm:w-auto"
                >
                  {button.text}
                </Button>
              ))}
            </motion.div>
          </motion.div>
        </div>

          {/* Key Features Quick Preview - Smaller cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Atom,
                title: "UBe₁₃ Fazı",
                description: "Yüksek sıcaklıkta kararlı intermetalik yapı",
                stat: "2000 °C"
              },
              {
                icon: Shield,
                title: "HI-STORM Depolama",
                description: "5 yıl soğutma sonrası 24 demet için hesaplanan ısı",
                stat: "+9.31 kW"
              },
              {
                icon: Zap,
                title: "Optimum Karışım",
                description: "%95 UO₂ + %5 UBe₁₃ ile en iyi yanma performansı",
                stat: "%5 Katkı"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                className="group relative"
              >
                <div className="liquid-card text-center hover:scale-105 transition-all duration-300 p-4 sm:p-5 h-full flex flex-col justify-between">
                  {/* Stat Number */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-neutron-cyan to-safety-yellow text-dark-navy font-bold text-xs sm:text-sm px-2 py-1 rounded-full shadow-lg">
                    {feature.stat}
                  </div>
                  
                  {/* Icon */}
                  <div className="p-3 sm:p-4 rounded-xl bg-neutron-cyan/10 border border-neutron-cyan/20 w-fit mx-auto mb-3 sm:mb-4 group-hover:bg-neutron-cyan/20 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-neutron-cyan" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-neutron-cyan transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        {/* Scroll Indicator - Enhanced responsive design */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-neutron-cyan/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-neutron-cyan rounded-full mt-2"
            />
          </motion.div>
          <span className="text-neutron-cyan/70 text-xs font-medium">Keşfet</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
