import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

const Footer: React.FC = () => {

  const socialLinks = [
    {
      icon: Github,
      href: siteConfig.contact.socialLinks.github,
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: siteConfig.contact.socialLinks.linkedin,
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: `mailto:${siteConfig.contact.email}`,
      label: 'E-posta',
    },
  ].filter(link => link.href);



  return (
    <footer className="relative bg-gradient-to-t from-dark-navy via-graphite to-dark-navy border-t border-steel-blue/20">
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutron-cyan to-transparent" />
      
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-neutron-cyan/20 to-neutron-cyan/10 border border-neutron-cyan/30">
                <Atom className="w-6 h-6 text-neutron-cyan" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  {siteConfig.projectName}
                </h3>
                <p className="text-sm text-steel-blue">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              {siteConfig.footer.description}
            </p>
            
            {/* Location */}
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {siteConfig.contact.location} • {siteConfig.contact.institution}
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-display font-semibold text-white mb-4">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-2">
              {siteConfig.footer.links[0]?.items.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-neutron-cyan transition-colors duration-300 text-sm"
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-display font-semibold text-white mb-4">
              İletişim
            </h4>
            <div className="space-y-3 mb-6">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-gray-300 hover:text-neutron-cyan transition-colors duration-300 text-sm"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-steel-blue/10 border border-steel-blue/20 text-gray-300 hover:text-neutron-cyan hover:border-neutron-cyan/30 hover:bg-neutron-cyan/10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-steel-blue/20 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-300 text-sm">
            {siteConfig.footer.copyright}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>ATF Technology</span>
            <span>•</span>
            <span>Nuclear Safety</span>
            <span>•</span>
            <span>SiC/Cr Coating</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
