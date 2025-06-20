import { useTranslation } from '../lib/i18n';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown } from 'lucide-react';
import maintea from '@assets/maintea_1750421477300.jpg';

export function HeroSection() {
  const { t } = useTranslation();

  const scrollToDiagnosis = () => {
    const element = document.getElementById('diagnosis');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={maintea} 
          alt="Cozy tea setting with warm lighting" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          {t('hero.title')}<br />
          <span className="text-amber-200">{t('hero.subtitle')}</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-light animate-fade-in">
          {t('hero.description')}
        </p>
        <Button 
          onClick={scrollToDiagnosis}
          className="bg-amber-800 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg animate-slide-up"
        >
          <Search className="mr-2 w-5 h-5" />
          {t('hero.cta')}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white text-2xl" />
      </div>
    </section>
  );
}
