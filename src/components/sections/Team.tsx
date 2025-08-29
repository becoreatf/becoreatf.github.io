import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Linkedin, ExternalLink } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import Card from '../ui/Card';

interface TeamProps {
  siteConfig: any;
}

const Team: React.FC<TeamProps> = ({ siteConfig }) => {
  const { team } = siteConfig;

  return (
    <section id="team" className="section-padding bg-gradient-to-br from-dark-navy to-graphite relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise opacity-5" />
      <div className="absolute top-1/3 left-20 w-64 h-64 bg-neutron-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-20 w-48 h-48 bg-safety-yellow/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6">{team.title}</h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-neutron-cyan to-safety-yellow mx-auto rounded-full mb-6 sm:mb-8" />
          
          {/* Team Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-4">
              <span className="text-safety-yellow font-semibold">Şubat 2025</span>'te oluşturulan BeCore ekibimiz, 
              danışman hocamız dahil <span className="text-neutron-cyan font-semibold">8 kişiden oluşan</span> 
              multidisipliner bir yapıda, <span className="text-white font-medium">kazaya dayanımlı nükleer yakıtlar</span> 
              üzerine çalışmaktadır.
            </p>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
              Disiplinler arası yaklaşımla mühendislik analizleri gerçekleştiren ekibimiz, 
              <span className="text-neutron-cyan font-medium"> hem teorik hesaplamalar hem de gelişmiş simülasyon yöntemleri </span> 
              kullanarak güvenilir ve yenilikçi çözümler üretmeyi hedeflemektedir.
            </p>
            
            {/* Software Tools */}
            <div className="mt-6 p-4 rounded-xl bg-dark-navy/30 border border-neutron-cyan/20">
              <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Kullanılan Başlıca Yazılım ve Simülasyon Araçları:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neutron-cyan rounded-full"></div>
                  <span className="text-gray-300"><span className="text-neutron-cyan font-medium">Tripoli-4 & Serpent:</span> Monte Carlo nötronik</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neutron-cyan rounded-full"></div>
                  <span className="text-gray-300"><span className="text-neutron-cyan font-medium">COBRA-IV, COBRA-TF & ZEBRA:</span> Termohidrolik</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neutron-cyan rounded-full"></div>
                  <span className="text-gray-300"><span className="text-neutron-cyan font-medium">FINIX:</span> Yakıt performansı</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neutron-cyan rounded-full"></div>
                  <span className="text-gray-300"><span className="text-neutron-cyan font-medium">KORIGEN & JRODOS:</span> Radyolojik etki</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neutron-cyan rounded-full"></div>
                  <span className="text-gray-300"><span className="text-neutron-cyan font-medium">ImageJ & Novisim:</span> Görüntü analizi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neutron-cyan rounded-full"></div>
                  <span className="text-gray-300"><span className="text-neutron-cyan font-medium">Python & MATLAB:</span> Hesaplamalı analiz</span>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mt-4">
              Disiplinler arası iş birliğiyle BeCore, yalnızca teorik bilgiye dayalı değil, aynı zamanda 
              <span className="text-white font-medium"> güçlü yazılım ve simülasyon altyapısıyla desteklenen</span> 
              çalışmalarıyla Teknofest'te iddiasını ortaya koymaktadır.
            </p>
          </motion.div>
        </motion.div>

        {/* Team Members Grid */}
        <div className="space-y-8 sm:space-y-12">
          {/* First Row - 4 members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.members
              .slice(0, 4) // First 4 members
              .map((member, index) => {
                // Danışman için özel tema, diğerleri için standart tema
                const isDansman = member.role.includes('Danışman');
                const themeColors = isDansman ? {
                  bg: 'from-safety-yellow/20 to-warning-orange/10',
                  border: 'border-safety-yellow/30',
                  hoverBorder: 'group-hover:border-safety-yellow/60',
                  badge: 'bg-safety-yellow/10 border-safety-yellow/20 text-safety-yellow',
                  hoverEffect: 'from-safety-yellow/5 to-warning-orange/5',
                  socialHover: 'hover:bg-safety-yellow/20 hover:text-safety-yellow',
                  specialtyBg: 'bg-safety-yellow/5'
                } : {
                  bg: 'from-neutron-cyan/20 to-neutron-cyan/10',
                  border: 'border-neutron-cyan/30',
                  hoverBorder: 'group-hover:border-neutron-cyan/60',
                  badge: 'bg-neutron-cyan/10 border-neutron-cyan/20 text-neutron-cyan',
                  hoverEffect: 'from-neutron-cyan/5 to-neutron-cyan/5',
                  socialHover: 'hover:bg-neutron-cyan/20 hover:text-neutron-cyan',
                  specialtyBg: 'bg-neutron-cyan/5'
                };

                return (
                  <motion.div
                    key={`member-${index}`}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.6 + index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="group"
                  >
                    <Card className="relative overflow-hidden h-full p-6 bg-gradient-to-br from-dark-navy/50 to-graphite/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-neutron-cyan/10">
                      {/* Professional Header */}
                      <div className="relative mb-6">
                        {/* Square Professional Photo */}
                        <div className="relative mb-4">
                          <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-xl bg-gradient-to-br ${themeColors.bg} border-2 ${themeColors.border} ${themeColors.hoverBorder} overflow-hidden transition-all duration-500 group-hover:shadow-lg`}>
                            {member.avatar ? (
                              <img 
                                src={member.avatar} 
                                alt={member.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <User className="w-8 h-8 sm:w-10 sm:h-10 text-white/60" />
                              </div>
                            )}
                          </div>
                          {/* Glow effect */}
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${themeColors.hoverEffect} opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`} />
                        </div>

                        {/* Name & Role */}
                        <div className="text-center space-y-2">
                          <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-white transition-colors duration-300">
                            {member.name}
                          </h3>
                          
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${themeColors.badge} text-xs sm:text-sm font-medium border transition-all duration-300`}>
                            <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                            {member.role}
                          </div>
                        </div>
                      </div>

                      {/* Expertise */}
                      <div className="mb-4">
                        <p className="text-gray-300 text-sm leading-relaxed text-center">
                          {member.expertise}
                        </p>
                      </div>

                      {/* Specialties */}
                      {member.specialties && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-1.5 justify-center">
                            {member.specialties.map((specialty, idx) => (
                              <span
                                key={idx}
                                className={`px-2 py-1 ${themeColors.specialtyBg} text-xs text-gray-300 rounded-md border border-white/10`}
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Social Links */}
                      <div className="flex justify-center gap-3 mt-auto">
                        {member.linkedin && (
                          <motion.a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-2.5 rounded-lg bg-white/5 border border-white/10 ${themeColors.socialHover} transition-all duration-300 group/social`}
                          >
                            <Linkedin className="w-4 h-4 text-gray-400 group-hover/social:text-current" />
                          </motion.a>
                        )}
                        {member.website && (
                          <motion.a
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-2.5 rounded-lg bg-white/5 border border-white/10 ${themeColors.socialHover} transition-all duration-300 group/social`}
                          >
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover/social:text-current" />
                          </motion.a>
                        )}
                      </div>

                      {/* Hover Overlay Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${themeColors.hoverEffect} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />
                    </Card>
                  </motion.div>
                );
              })}
          </div>

          {/* Second Row - Last 4 members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.members
              .slice(4) // Last 4 members
              .map((member, index) => {
                const themeColors = {
                  bg: 'from-neutron-cyan/20 to-neutron-cyan/10',
                  border: 'border-neutron-cyan/30',
                  hoverBorder: 'group-hover:border-neutron-cyan/60',
                  badge: 'bg-neutron-cyan/10 border-neutron-cyan/20 text-neutron-cyan',
                  hoverEffect: 'from-neutron-cyan/5 to-neutron-cyan/5',
                  socialHover: 'hover:bg-neutron-cyan/20 hover:text-neutron-cyan',
                  specialtyBg: 'bg-neutron-cyan/5'
                };

                return (
                  <motion.div
                    key={`bottom-member-${index}`}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 1.2 + index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="group"
                  >
                    <Card className="relative overflow-hidden h-full p-6 bg-gradient-to-br from-dark-navy/50 to-graphite/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-neutron-cyan/10">
                      {/* Professional Header */}
                      <div className="relative mb-6">
                        {/* Square Professional Photo */}
                        <div className="relative mb-4">
                          <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-xl bg-gradient-to-br ${themeColors.bg} border-2 ${themeColors.border} ${themeColors.hoverBorder} overflow-hidden transition-all duration-500 group-hover:shadow-lg`}>
                            {member.avatar ? (
                              <img 
                                src={member.avatar} 
                                alt={member.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <User className="w-8 h-8 sm:w-10 sm:h-10 text-white/60" />
                              </div>
                            )}
                          </div>
                          {/* Glow effect */}
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${themeColors.hoverEffect} opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`} />
                        </div>

                        {/* Name & Role */}
                        <div className="text-center space-y-2">
                          <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-white transition-colors duration-300">
                            {member.name}
                          </h3>
                          
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${themeColors.badge} text-xs sm:text-sm font-medium border transition-all duration-300`}>
                            <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                            {member.role}
                          </div>
                        </div>
                      </div>

                      {/* Expertise */}
                      <div className="mb-4">
                        <p className="text-gray-300 text-sm leading-relaxed text-center">
                          {member.expertise}
                        </p>
                      </div>

                      {/* Specialties */}
                      {member.specialties && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-1.5 justify-center">
                            {member.specialties.map((specialty, idx) => (
                              <span
                                key={idx}
                                className={`px-2 py-1 ${themeColors.specialtyBg} text-xs text-gray-300 rounded-md border border-white/10`}
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Social Links */}
                      <div className="flex justify-center gap-3 mt-auto">
                        {member.linkedin && (
                          <motion.a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-2.5 rounded-lg bg-white/5 border border-white/10 ${themeColors.socialHover} transition-all duration-300 group/social`}
                          >
                            <Linkedin className="w-4 h-4 text-gray-400 group-hover/social:text-current" />
                          </motion.a>
                        )}
                        {member.website && (
                          <motion.a
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-2.5 rounded-lg bg-white/5 border border-white/10 ${themeColors.socialHover} transition-all duration-300 group/social`}
                          >
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover/social:text-current" />
                          </motion.a>
                        )}
                      </div>

                      {/* Hover Overlay Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${themeColors.hoverEffect} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />
                    </Card>
                  </motion.div>
                );
              })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Team;
