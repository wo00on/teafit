import { Tea } from '../types/tea';

export const teas: Tea[] = [
  {
    id: 'green-tea',
    name: { ko: '녹차', en: 'Green Tea' },
    category: 'premium',
    description: {
      ko: '항산화 성분이 풍부한 전통 녹차로 집중력 향상에 도움을 줍니다.',
      en: 'Traditional green tea rich in antioxidants that helps improve concentration.'
    },
    benefits: {
      ko: ['집중력 향상', '항산화 작용', '신진대사 촉진'],
      en: ['Improved concentration', 'Antioxidant properties', 'Metabolism boost']
    },
    brewingTime: '2-3분',
    temperature: '70-80°C',
    caffeine: 'medium',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['concentration', 'antioxidant', 'traditional']
  },
  {
    id: 'chamomile',
    name: { ko: '캐모마일', en: 'Chamomile' },
    category: 'herbal',
    description: {
      ko: '마음을 진정시키고 편안한 잠자리를 도와주는 허브차입니다.',
      en: 'Herbal tea that calms the mind and promotes restful sleep.'
    },
    benefits: {
      ko: ['수면 유도', '스트레스 완화', '소화 개선'],
      en: ['Sleep promotion', 'Stress relief', 'Digestive support']
    },
    brewingTime: '5-7분',
    temperature: '90-95°C',
    caffeine: 'none',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['relaxation', 'sleep', 'herbal']
  },
  {
    id: 'ginger-tea',
    name: { ko: '생강차', en: 'Ginger Tea' },
    category: 'herbal',
    description: {
      ko: '몸을 따뜻하게 해주고 혈액순환을 개선하는 매콤한 차입니다.',
      en: 'Warming spicy tea that improves circulation and heats the body.'
    },
    benefits: {
      ko: ['체온 상승', '혈액순환 개선', '소화 촉진'],
      en: ['Body warming', 'Circulation improvement', 'Digestive aid']
    },
    brewingTime: '5-10분',
    temperature: '95-100°C',
    caffeine: 'none',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['warming', 'circulation', 'spicy']
  },
  {
    id: 'lavender',
    name: { ko: '라벤더차', en: 'Lavender Tea' },
    category: 'herbal',
    description: {
      ko: '향긋한 라벤더 향으로 마음을 편안하게 해주는 차입니다.',
      en: 'Fragrant lavender tea that brings peace and relaxation to the mind.'
    },
    benefits: {
      ko: ['심신 이완', '불안 완화', '향기 테라피'],
      en: ['Mind-body relaxation', 'Anxiety relief', 'Aromatherapy']
    },
    brewingTime: '4-6분',
    temperature: '85-90°C',
    caffeine: 'none',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['relaxation', 'aromatherapy', 'floral']
  },
  {
    id: 'mate-tea',
    name: { ko: '마테차', en: 'Mate Tea' },
    category: 'premium',
    description: {
      ko: '남미 전통 차로 자연스러운 에너지와 집중력을 제공합니다.',
      en: 'Traditional South American tea providing natural energy and focus.'
    },
    benefits: {
      ko: ['에너지 증가', '집중력 향상', '항산화 작용'],
      en: ['Energy boost', 'Enhanced focus', 'Antioxidant properties']
    },
    brewingTime: '3-5분',
    temperature: '70-80°C',
    caffeine: 'high',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['energy', 'focus', 'traditional']
  },
  {
    id: 'chrysanthemum',
    name: { ko: '국화차', en: 'Chrysanthemum Tea' },
    category: 'herbal',
    description: {
      ko: '은은한 꽃 향이 매력적인 전통 한방차로 눈 피로에 좋습니다.',
      en: 'Traditional herbal tea with delicate floral aroma, great for eye fatigue.'
    },
    benefits: {
      ko: ['눈 피로 완화', '열 내림', '간 건강'],
      en: ['Eye fatigue relief', 'Heat clearing', 'Liver health']
    },
    brewingTime: '5-8분',
    temperature: '85-95°C',
    caffeine: 'none',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['traditional', 'eye-care', 'floral']
  }
];

export const getTodayRecommendation = (): Tea => {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 12) {
    // Morning: Energy boosting teas
    return teas.find(tea => tea.id === 'green-tea') || teas[0];
  } else if (hour >= 12 && hour < 18) {
    // Afternoon: Focus enhancing teas
    return teas.find(tea => tea.id === 'mate-tea') || teas[0];
  } else {
    // Evening: Relaxing teas
    return teas.find(tea => tea.id === 'chamomile') || teas[0];
  }
};

export const searchTeas = (query: string, category?: string): Tea[] => {
  let filtered = teas;
  
  if (category && category !== 'all') {
    filtered = filtered.filter(tea => tea.category === category);
  }
  
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filtered = filtered.filter(tea => 
      tea.name.ko.toLowerCase().includes(lowercaseQuery) ||
      tea.name.en.toLowerCase().includes(lowercaseQuery) ||
      tea.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
  
  return filtered;
};
