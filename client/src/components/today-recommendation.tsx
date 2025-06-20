import { useTranslation } from '../lib/i18n';
import { getTodayRecommendation } from '../data/teas';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Thermometer, Star } from 'lucide-react';

export function TodayRecommendation() {
  const { t, language } = useTranslation();
  const todayTea = getTodayRecommendation();

  return (
    <section id="today" className="py-20 bg-gradient-to-br from-orange-100 to-orange-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-800 mb-4">{t('today.title')}</h2>
          <p className="text-lg text-gray-600">{t('today.subtitle')}</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={todayTea.image} 
                alt={todayTea.name[language]} 
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="mb-4">
                <Badge className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {t('today.badge')}
                </Badge>
              </div>
              <h3 className="text-3xl font-bold text-amber-800 mb-4">
                🍃 {todayTea.name[language]}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {todayTea.description[language]}
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2 w-4 h-4 text-emerald-600" />
                  <span>{language === 'ko' ? '우리는 시간' : 'Brewing Time'}: {todayTea.brewingTime}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Thermometer className="mr-2 w-4 h-4 text-emerald-600" />
                  <span>{language === 'ko' ? '적정 온도' : 'Temperature'}: {todayTea.temperature}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="mr-2 w-4 h-4 text-emerald-600" />
                  <span>{language === 'ko' ? '효능' : 'Benefits'}: {todayTea.benefits[language].join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
