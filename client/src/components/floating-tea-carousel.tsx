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
    <section className="pt-32 pb-20 bg-gradient-to-b from-orange-50 to-white overflow-visible relative z-20">
      <div className="container mx-auto px-6 relative z-30" style={{ overflow: 'visible', marginTop: '10rem' }}>
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
            <CarouselContent className="-ml-2 md:-ml-4 overflow-visible" style={{ overflow: 'visible' }}>
              {teas.map((tea, index) => (
                <CarouselItem key={tea.id} className="pl-2 md:pl-4 basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 overflow-visible" style={{ overflow: 'visible', zIndex: 2 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.04,
                      transition: { duration: 0.2 }
                    }}
                    className="relative group cursor-pointer rounded-3xl overflow-hidden shadow-xl bg-white transition-all duration-300"
                    style={{ zIndex: 10 }}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={tea.image} 
                        alt={(tea.name as any)[language]} 
                        className="w-full h-full object-cover group-hover:brightness-110 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-all duration-300" />
                      <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col items-center">
                        <span className="text-white text-lg font-bold drop-shadow-md mb-1">{(tea.name as any)[language]}</span>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold shadow-md ${
                          tea.category === 'premium' ? 'bg-purple-600/80 text-white' :
                          tea.category === 'blended' ? 'bg-blue-600/80 text-white' :
                          tea.category === 'grain' ? 'bg-orange-600/80 text-white' :
                          'bg-green-600/80 text-white'
                        }`}>
                          {tea.category === 'premium' ? (language === 'ko' ? '프리미엄' : 'Premium') :
                           tea.category === 'blended' ? (language === 'ko' ? '블렌딩' : 'Blended') :
                           tea.category === 'grain' ? (language === 'ko' ? '곡물차' : 'Grain') :
                           (language === 'ko' ? '허브차' : 'Herbal')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="!bg-white !border-2 !border-amber-300 !shadow-lg hover:!bg-amber-50 !text-amber-700 !w-12 !h-12 !rounded-full !left-2 md:!left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="!bg-white !border-2 !border-amber-300 !shadow-lg hover:!bg-amber-50 !text-amber-700 !w-12 !h-12 !rounded-full !right-2 md:!right-4 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}