import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Play, Image as ImageIcon } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import Card from '../ui/Card';


const Gallery: React.FC = () => {
  const { gallery } = siteConfig;
  const [selectedItem, setSelectedItem] = useState<typeof gallery.items[0] | null>(null);

  const openLightbox = (item: typeof gallery.items[0]) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="gallery" className="section-padding bg-gradient-to-br from-dark-navy to-graphite relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise opacity-5" />
      <div className="absolute top-1/4 right-20 w-64 h-64 bg-neutron-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-10 w-48 h-48 bg-safety-yellow/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6">{gallery.title}</h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-neutron-cyan to-safety-yellow mx-auto rounded-full" />
          {gallery.description && (
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 max-w-3xl mx-auto">
              {gallery.description}
            </p>
          )}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {gallery.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className="group cursor-pointer overflow-hidden"
                hoverable
                onClick={() => openLightbox(item)}
              >
                {/* Image Container */}
                <div className="relative aspect-video mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-steel-blue/20 to-graphite/20">
                  {/* Placeholder Image */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutron-cyan/10 to-steel-blue/10 border border-steel-blue/20">
                    <div className="text-center">
                      {item.type === 'video' ? (
                        <Play className="w-12 h-12 text-neutron-cyan mx-auto mb-2" />
                      ) : (
                        <ImageIcon className="w-12 h-12 text-neutron-cyan mx-auto mb-2" />
                      )}
                      <p className="text-steel-blue text-sm">
                        {item.type === 'video' ? 'Video İçeriği' : 'Görsel İçerik'}
                      </p>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-3 rounded-full bg-neutron-cyan/20 backdrop-blur-sm border border-neutron-cyan/30">
                        <ZoomIn className="w-6 h-6 text-neutron-cyan" />
                      </div>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="px-2 py-1 rounded-lg bg-dark-navy/80 backdrop-blur-sm border border-steel-blue/30 text-xs text-neutron-cyan font-medium">
                      {item.type === 'video' ? 'Video' : 'Görsel'}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-neutron-cyan transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>


      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-dark-navy/80 border border-steel-blue/30 text-white hover:text-neutron-cyan hover:border-neutron-cyan/50 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="p-6">
                {/* Media Container */}
                <div className="relative aspect-video mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-steel-blue/20 to-graphite/20">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutron-cyan/10 to-steel-blue/10 border border-steel-blue/20">
                    <div className="text-center">
                      {selectedItem.type === 'video' ? (
                        <Play className="w-16 h-16 text-neutron-cyan mx-auto mb-4" />
                      ) : (
                        <ImageIcon className="w-16 h-16 text-neutron-cyan mx-auto mb-4" />
                      )}
                      <p className="text-white text-lg font-medium mb-2">
                        {selectedItem.title}
                      </p>
                      <p className="text-steel-blue">
                        {selectedItem.type === 'video' ? 'Video İçeriği' : 'Yüksek Çözünürlük Görsel'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold text-white mb-4">
                    {selectedItem.title}
                  </h3>
                  <p className="text-steel-blue leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
