import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, User, MessageCircle, CheckCircle, Github, Linkedin } from 'lucide-react';
import type { SiteConfig } from '../../config/siteConfig';
import { useMessages } from '../../contexts/MessageContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactProps {
  siteConfig: SiteConfig;
}

const Contact: React.FC<ContactProps> = ({ siteConfig }) => {
  const { contact } = siteConfig;
  const { addMessage } = useMessages();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Mesajı context'e ekle
      addMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Mesaj gönderilirken hata oluştu:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      icon: Github,
      href: contact.socialLinks.github,
      label: 'GitHub',
      color: 'hover:text-white',
    },
    {
      icon: Linkedin,
      href: contact.socialLinks.linkedin,
      label: 'LinkedIn',
      color: 'hover:text-blue-400',
    },
    {
      icon: Mail,
      href: `mailto:${contact.email}`,
      label: 'E-posta',
      color: 'hover:text-neutron-cyan',
    },
  ].filter(link => link.href);

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-graphite via-dark-navy to-graphite" />
      <div className="absolute inset-0 bg-noise opacity-5" />
      
      {/* Background Effects */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-neutron-cyan/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-safety-yellow/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6">{contact.title}</h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-neutron-cyan to-safety-yellow mx-auto rounded-full" />
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 max-w-3xl mx-auto">
            {contact.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4 sm:mb-6">
                {contact.form.title}
              </h3>
              <p className="text-gray-300 text-sm mb-6">
                {contact.form.subtitle}
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      {contact.form.fields.name.label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-steel-blue/10 border border-steel-blue/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutron-cyan/50 focus:border-neutron-cyan/50 transition-all duration-300"
                        placeholder={contact.form.fields.name.placeholder}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      {contact.form.fields.email.label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-steel-blue/10 border border-steel-blue/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutron-cyan/50 focus:border-neutron-cyan/50 transition-all duration-300"
                        placeholder={contact.form.fields.email.placeholder}
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                      {contact.form.fields.subject.label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MessageCircle className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-steel-blue/10 border border-steel-blue/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutron-cyan/50 focus:border-neutron-cyan/50 transition-all duration-300"
                        placeholder={contact.form.fields.subject.placeholder}
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      {contact.form.fields.message.label}
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <MessageCircle className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-steel-blue/10 border border-steel-blue/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutron-cyan/50 focus:border-neutron-cyan/50 transition-all duration-300 resize-none"
                        placeholder={contact.form.fields.message.placeholder}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    icon={Send}
                    iconPosition="right"
                    className="w-full"
                  >
                    {isSubmitting ? 'Gönderiliyor...' : contact.form.submitButton}
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col justify-center items-center text-center"
                  style={{ minHeight: '400px' }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neutron-cyan/20 border border-neutron-cyan/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-neutron-cyan" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white mb-4">
                    Mesajınız Gönderildi!
                  </h4>
                  <p className="text-steel-blue leading-relaxed">
                    {contact.form.successMessage}
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <Card className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4 sm:mb-6">
                İletişim Bilgileri
              </h3>

              <div className="space-y-4 sm:space-y-6">
                {/* Email */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-neutron-cyan/10 border border-neutron-cyan/20">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-neutron-cyan" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">E-posta</p>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-white hover:text-neutron-cyan transition-colors font-medium text-sm sm:text-base"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-neutron-cyan/10 border border-neutron-cyan/20">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-neutron-cyan" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Konum</p>
                    <p className="text-white font-medium text-sm sm:text-base">{contact.location}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{contact.institution}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-4 sm:mb-6">
                Sosyal Medya
              </h3>

              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-xl bg-steel-blue/10 border border-steel-blue/20 text-steel-blue ${social.color} hover:border-current transition-all duration-300 group`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </Card>

            {/* Quick Response */}
            <Card className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-neutron-cyan/10 to-safety-yellow/10 border-neutron-cyan/30">
              <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-3 sm:mb-4">
                Hızlı Yanıt Garantisi
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Teknofest jüri üyelerimizden gelen tüm sorular ve işbirliği tekliflerine 
                <span className="text-neutron-cyan font-semibold"> 24 saat içinde </span>
                yanıt vermeyi garanti ediyoruz.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
