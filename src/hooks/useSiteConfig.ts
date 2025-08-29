import { useState, useEffect } from 'react';
import { siteConfig as defaultConfig } from '../config/siteConfig';
import type { SiteConfig } from '../config/siteConfig';

export const useSiteConfig = () => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  useEffect(() => {
    const savedConfig = localStorage.getItem('siteConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error('Saved config parse error:', error);
        setConfig(defaultConfig);
      }
    } else {
      // Eğer localStorage'da config yoksa, default config'i kullan
      setConfig(defaultConfig);
    }
  }, []);

  return config;
};
