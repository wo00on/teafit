import { useTranslation } from '../lib/i18n';
import { Leaf, Instagram, Facebook, Globe } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-amber-800 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="text-amber-200 text-2xl" />
              <h3 className="text-2xl font-bold">TEAFIT</h3>
            </div>
            <p className="text-amber-200 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-amber-200/20 hover:bg-amber-200/30 p-3 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-amber-200/20 hover:bg-amber-200/30 p-3 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-amber-200/20 hover:bg-amber-200/30 p-3 rounded-full transition-colors"
                aria-label="Blog"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2 text-amber-200">
              <li>
                <button 
                  onClick={() => document.getElementById('diagnosis')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-white transition-colors"
                >
                  {t('navigation.diagnosis')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-white transition-colors"
                >
                  {t('navigation.catalog')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('today')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-white transition-colors"
                >
                  {t('navigation.today')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.information')}</h4>
            <ul className="space-y-2 text-amber-200">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.brandPhilosophy')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.team')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-200/30 mt-12 pt-8 text-center">
          <p className="text-amber-200 text-sm">
            © 2024 TEAFIT. All rights reserved. | {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
