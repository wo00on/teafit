import { useTranslation } from '../lib/i18n';
import { motion } from 'framer-motion';
import { teas } from '../data/teas';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useRef } from 'react';
import Autoplay from "embla-carousel-autoplay";

export function FloatingTeaCarousel() {
  const { language } = useTranslation();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-amber-800 mb-4">
          {language === 'ko' ? '다양한 차의 세계' : 'World of Various Teas'}
        </h2>
        <p className="text-center text-gray-600 mb-16">
          {language === 'ko' ? '자연이 선사하는 건강한 한 잔을 만나보세요' : 'Discover healthy cups nature provides'}
        </p>
        
        <div className="relative max-w-5xl mx-auto">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {teas.map((tea, index) => (
                <CarouselItem key={tea.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.2 }
                    }}
                    className="text-center group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-lg group-hover:shadow-2xl transition-all duration-300 bg-white">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={tea.image} 
                          alt={tea.name[language]} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-amber-800 mb-2 text-sm md:text-base">
                          {tea.name[language]}
                        </h3>
                        <div className="flex justify-center">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            tea.category === 'premium' ? 'bg-purple-100 text-purple-700' :
                            tea.category === 'blended' ? 'bg-blue-100 text-blue-700' :
                            tea.category === 'grain' ? 'bg-orange-100 text-orange-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {tea.category === 'premium' ? (language === 'ko' ? '프리미엄' : 'Premium') :
                             tea.category === 'blended' ? (language === 'ko' ? '블렌딩' : 'Blended') :
                             tea.category === 'grain' ? (language === 'ko' ? '곡물차' : 'Grain') :
                             (language === 'ko' ? '허브차' : 'Herbal')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white/90 border-amber-200 hover:bg-amber-50 text-amber-700 -left-4 md:-left-8" />
            <CarouselNext className="bg-white/90 border-amber-200 hover:bg-amber-50 text-amber-700 -right-4 md:-right-8" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
