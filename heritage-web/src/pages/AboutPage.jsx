import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Award, Mail, Github, Globe, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation();

  const teamMembers = [
    { name: t('about.team.name'), role: t('about.team.role'), icon: Users },
  ];

  const features = [
    {
      icon: BookOpen,
      title: t('about.features.heritage.title'),
      description: t('about.features.heritage.description'),
    },
    {
      icon: Target,
      title: t('about.features.aiSupport.title'),
      description: t('about.features.aiSupport.description'),
    },
    {
      icon: Award,
      title: t('about.features.multilingual.title'),
      description: t('about.features.multilingual.description'),
    },
    {
      icon: Globe,
      title: t('about.features.pwa.title'),
      description: t('about.features.pwa.description'),
    },
  ];
  return (
    <div className="min-h-screen bg-heritage-cream-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-heritage-red-700 via-heritage-red-800 to-heritage-red-900 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-30"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6">
              <Heart className="w-4 h-4 text-heritage-gold-400" />
              {t('about.badge')}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('about.title')}
              <span className="block text-heritage-gold-400">{t('about.region')}</span>
            </h1>

            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t('about.mission.title')} <span className="gradient-text">{t('about.mission.titleHighlight')}</span>
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  {t('about.mission.paragraph1')}
                </p>
                <p>
                  {t('about.mission.paragraph2')}
                </p>
                <p>
                  {t('about.mission.paragraph3')}
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-heritage-red-500 to-heritage-gold-500 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about.contact.title')} <span className="gradient-text">{t('about.contact.titleHighlight')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {t('about.contact.description')}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:contact@heritage-camau.vn"
                className="inline-flex items-center gap-2 px-6 py-3 bg-heritage-red-600 text-white rounded-xl hover:bg-heritage-red-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                {t('about.contact.email')}
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors"
              >
                <Github className="w-5 h-5" />
                {t('about.contact.github')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

