import React from 'react';
import { motion } from 'framer-motion';
import { 
  Atom, 
  Thermometer, 
  Shield, 
  Archive, 
  AlertTriangle,
  ChevronRight,
  Target,
  CheckCircle,
  Code,
  BarChart3,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface ResearchAnalysisProps {
  siteConfig: any;
}

const ResearchAnalysis: React.FC<ResearchAnalysisProps> = ({ siteConfig }) => {
  const { research } = siteConfig;

  const iconMap = {
    atom: Atom,
    thermometer: Thermometer,
    shield: Shield,
    archive: Archive,
    'alert-triangle': AlertTriangle,
  };

  return (
    <section id="research" className="section-padding relative overflow-hidden">
      {/* Background - Diğer bölümlerle uyumlu */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-navy via-graphite to-dark-navy" />
      <div className="absolute inset-0 bg-noise opacity-5" />
      
      {/* Animated background elements - Hero tarzında */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-neutron-cyan/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-32 left-10 w-48 h-48 bg-safety-yellow/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-steel-blue/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-neutron-cyan/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-neutron-cyan/10 border border-neutron-cyan/20 mb-6">
            <BarChart3 className="w-5 h-5 text-neutron-cyan" />
            <span className="text-neutron-cyan font-medium text-sm uppercase tracking-wider">Araştırma & Analiz</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            {research.title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neutron-cyan to-safety-yellow mx-auto rounded-full mb-8" />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 text-xl lg:text-2xl leading-relaxed max-w-5xl mx-auto font-light"
          >
            {research.description}
          </motion.p>
        </motion.div>

        {/* Project Scope - Hero tarzında görsel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <div className="mb-12">
            {/* Modern Project Scope Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-6 p-6 rounded-3xl bg-gradient-to-br from-neutron-cyan/10 to-safety-yellow/10 border border-neutron-cyan/25 mb-8"
            >
              <div className="p-3 rounded-2xl bg-gradient-to-br from-neutron-cyan/20 to-neutron-cyan/10 border border-neutron-cyan/30">
                <Target className="w-8 h-8 text-neutron-cyan" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl lg:text-2xl font-display font-bold text-white mb-2">
                  {research.projectScope.title}
                </h3>
                <p className="text-gray-300 text-base">{research.projectScope.description}</p>
              </div>
            </motion.div>
            
            {/* Modern Highlights Grid */}
            <div className="flex justify-center">
              <div className="max-w-4xl">
                {/* Top Row - 3 boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {research.projectScope.highlights.slice(0, 3).map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      className="group"
                    >
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-gradient-to-br from-safety-yellow/20 to-safety-yellow/10 border border-safety-yellow/30">
                            <CheckCircle className="w-5 h-5 text-safety-yellow" />
                          </div>
                          <span className="text-white font-semibold text-base">{highlight}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Bottom Row - 2 boxes centered */}
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-2/3">
                    {research.projectScope.highlights.slice(3, 5).map((highlight, index) => (
                      <motion.div
                        key={index + 3}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        className="group"
                      >
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-safety-yellow/20 to-safety-yellow/10 border border-safety-yellow/30">
                              <CheckCircle className="w-5 h-5 text-safety-yellow" />
                            </div>
                            <span className="text-white font-semibold text-base">{highlight}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Research Areas - 2x2 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          {research.areas.map((area, index) => {
            const IconComponent = iconMap[area.icon as keyof typeof iconMap] || Atom;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative">
                  {/* Floating background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neutron-cyan/15 to-safety-yellow/15 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-0 group-hover:opacity-100" />
                  
                  {/* Main content */}
                  <div className="relative p-6 rounded-3xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 backdrop-blur-sm transition-all duration-300 h-full">
                    
                    {/* Professional Header Design */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-neutron-cyan/15 rounded-2xl blur-lg" />
                        <div className="relative p-3 rounded-2xl bg-gradient-to-br from-neutron-cyan/20 to-neutron-cyan/10 border border-neutron-cyan/25">
                          <IconComponent className="w-8 h-8 text-neutron-cyan" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl lg:text-2xl font-display font-bold text-white mb-1">
                          {area.title}
                        </h3>
                        <p className="text-gray-300 text-sm">{area.description}</p>
                      </div>
                    </div>

                    {/* Content Layout - Always Visible */}
                    <div className="space-y-4">
                      {/* Top Row - Methodology & Software */}
                      <div className="grid grid-cols-1 gap-4">
                        {/* Methodology */}
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-neutron-cyan/10 to-neutron-cyan/5 border border-neutron-cyan/20">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-1.5 rounded-lg bg-neutron-cyan/20 border border-neutron-cyan/30">
                              <Code className="w-4 h-4 text-neutron-cyan" />
                            </div>
                            <h4 className="text-neutron-cyan font-semibold text-base">Metodoloji</h4>
                          </div>
                          <p className="text-gray-200 text-sm leading-relaxed">
                            {area.methodology}
                          </p>
                        </div>

                        {/* Software */}
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-safety-yellow/10 to-safety-yellow/5 border border-safety-yellow/20">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-1.5 rounded-lg bg-safety-yellow/20 border border-safety-yellow/30">
                              <Cpu className="w-4 h-4 text-safety-yellow" />
                            </div>
                            <h4 className="text-safety-yellow font-semibold text-base">Yazılımlar</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {area.software.map((software, softIndex) => (
                              <span
                                key={softIndex}
                                className="px-3 py-1.5 text-xs font-medium bg-safety-yellow/15 text-safety-yellow rounded-lg border border-safety-yellow/25"
                              >
                                {software}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row - Key Findings & Results */}
                      <div className="grid grid-cols-1 gap-4">
                        {/* Key Findings */}
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-1.5 rounded-lg bg-green-500/20 border border-green-500/30">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            </div>
                            <h4 className="text-green-400 font-semibold text-base">Temel Bulgular</h4>
                          </div>
                          <div className="space-y-2">
                            {area.keyFindings.slice(0, 2).map((finding, findingIndex) => (
                              <div
                                key={findingIndex}
                                className="flex items-start gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20"
                              >
                                <ChevronRight className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-200 text-xs leading-relaxed">{finding}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Results */}
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-neutron-cyan/10 to-safety-yellow/10 border border-neutron-cyan/20">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-1.5 rounded-lg bg-white/20 border border-white/30">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="text-white font-semibold text-base">Sonuç</h4>
                          </div>
                          <p className="text-gray-200 text-sm leading-relaxed">{area.results}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Conclusions - Hero tarzında görsel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="mb-12">
            {/* Modern Conclusions Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-6 p-6 rounded-3xl bg-gradient-to-br from-safety-yellow/10 to-neutron-cyan/10 border border-safety-yellow/25 mb-8"
            >
              <div className="p-3 rounded-2xl bg-gradient-to-br from-safety-yellow/20 to-safety-yellow/10 border border-safety-yellow/30">
                <CheckCircle className="w-8 h-8 text-safety-yellow" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl lg:text-2xl font-display font-bold text-white mb-2">
                  {research.conclusions.title}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-safety-yellow to-neutron-cyan rounded-full" />
              </div>
            </motion.div>
            
            {/* Modern Conclusions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {research.conclusions.items.map((conclusion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="group"
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-safety-yellow/20 to-safety-yellow/10 border border-safety-yellow/30">
                        <CheckCircle className="w-5 h-5 text-safety-yellow" />
                      </div>
                      <span className="text-gray-200 leading-relaxed font-semibold text-base">{conclusion}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchAnalysis;