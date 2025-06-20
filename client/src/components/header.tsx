import { useState } from 'react';
import { useTranslation } from '../lib/i18n';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Leaf, Globe } from 'lucide-react';

export function Header() {
  const { language, toggleLanguage, t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationItems = [
    { key: 'diagnosis', href: '#diagnosis' },
    { key: 'catalog', href: '#catalog' },
    { key: 'today', href: '#today' }
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Leaf className="text-emerald-600 text-2xl" />
            <h1 className="text-3xl font-elegant font-semibold text-amber-800 tracking-tight">TEAFIT</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className="text-gray-700 hover:text-amber-800 transition-colors duration-300 font-medium"
                >
                  {t(`navigation.${item.key}`)}
                </button>
              ))}
            </div>
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2 rounded-full border-amber-200 hover:bg-amber-50"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'ko' ? '🇰🇷 한국어' : '🇺🇸 English'}
              </span>
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => scrollToSection(item.key)}
                      className="text-left text-gray-700 hover:text-amber-800 transition-colors duration-300 font-medium py-2"
                    >
                      {t(`navigation.${item.key}`)}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
