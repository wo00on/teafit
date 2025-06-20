import { useState, useEffect } from 'react';
import { translations } from '../data/translations';

type Language = 'ko' | 'en';
type TranslationKeys = typeof translations.ko;

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('ko');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('teafit-language') as Language;
    if (savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'ko' ? 'en' : 'ko';
    setLanguage(newLanguage);
    localStorage.setItem('teafit-language', newLanguage);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return {
    language,
    toggleLanguage,
    t
  };
};

export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('teafit-session-id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('teafit-session-id', sessionId);
  }
  return sessionId;
};
