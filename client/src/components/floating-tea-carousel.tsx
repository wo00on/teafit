import { useTranslation } from '../lib/i18n';
import { motion } from 'framer-motion';
import { teas } from '../data/teas';

export function FloatingTeaCarousel() {
  const { t, language } = useTranslation();

  const floatingAnimation = {
    y: [0, -20, 0],
    rotate: [0, 2, -1, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-amber-800 mb-4">
          {language === 'ko' ? '다양한 차의 세계' : 'World of Various Teas'}
        </h2>
        <p className="text-center text-gray-600 mb-16">
          {language === 'ko' ? '자연이 선사하는 건강한 한 잔을 만나보세요' : 'Discover healthy cups nature provides'}
        </p>
        
        <div className="relative">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {teas.slice(0, 6).map((tea, index) => (
              <motion.div
                key={tea.id}
                className="floating-tea"
                animate={floatingAnimation}
                style={{
                  animationDelay: `${index * -1}s`
                }}
              >
                <div className="text-center group cursor-pointer">
                  <div className="relative overflow-hidden rounded-full border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src={tea.image} 
                      alt={tea.name[language]} 
                      className="w-32 h-32 md:w-40 md:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-center mt-4 font-medium text-amber-800">
                    {tea.name[language]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
