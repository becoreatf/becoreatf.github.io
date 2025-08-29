import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, TrendingUp, Check } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import Card from '../ui/Card';

interface SummaryProps {
  siteConfig: any;
}

const Summary: React.FC<SummaryProps> = ({ siteConfig }) => {
  const { summary } = siteConfig;

  const summaryCards = [
    {
      ...summary.cards.problem,
      icon: AlertTriangle,
      color: 'from-red-500/20 to-red-600/10',
      borderColor: 'border-red-500/30',
    },
    {
      ...summary.cards.solution,
      icon: CheckCircle,
      color: 'from-neutron-cyan/20 to-neutron-cyan/10',
      borderColor: 'border-neutron-cyan/30',
    },
    {
      ...summary.cards.impact,
      icon: TrendingUp,
      color: 'from-safety-yellow/20 to-safety-yellow/10',
      borderColor: 'border-safety-yellow/30',
    },
  ];

  return (
    <section id="summary" className="section-padding bg-gradient-to-br from-dark-navy to-graphite relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise opacity-5" />
      <div className="absolute top-1/2 left-10 w-64 h-64 bg-neutron-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-safety-yellow/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6">{summary.title}</h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-neutron-cyan to-safety-yellow mx-auto rounded-full" />
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {summaryCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className={`h-full bg-gradient-to-br ${card.color} border ${card.borderColor} group p-4 sm:p-6`}
                hoverable
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br ${card.color} border ${card.borderColor}`}>
                    <card.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {card.content}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detailed Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="text-center p-4 sm:p-6 lg:p-8">
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">
              {summary.description}
            </p>
            
            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {summary.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-neutron-cyan/5 border border-neutron-cyan/20 hover:bg-neutron-cyan/10 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-neutron-cyan" />
                  </div>
                  <span className="text-white font-medium text-xs sm:text-sm">
                    {highlight}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Summary;
