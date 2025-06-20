import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translation resources
import enTranslations from './locales/en.json';
import itTranslations from './locales/it.json';
import arTranslations from './locales/ar.json';
import syTranslations from './locales/sy.json';

// Translation resources
const resources = {
  en: {
    translation: enTranslations
  },
  it: {
    translation: itTranslations
  },
  ar: {
    translation: arTranslations
  },
  sy: {
    translation: syTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;