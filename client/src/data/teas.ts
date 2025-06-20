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
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
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
    image: 'https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
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
  },

  // Blended Teas
  {
    id: 'earl-grey',
    name: { ko: '얼그레이', en: 'Earl Grey' },
    category: 'blended',
    description: {
      ko: '베르가못 향이 첨가된 고급스러운 블렌딩 홍차입니다.',
      en: 'Premium blended black tea with bergamot oil for a sophisticated flavor.'
    },
    benefits: {
      ko: ['기분 전환', '소화 촉진', '집중력 향상'],
      en: ['Mood enhancement', 'Digestive aid', 'Improved focus']
    },
    brewingTime: '3-5분',
    temperature: '95-100°C',
    caffeine: 'high',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['citrus', 'premium', 'afternoon']
  },
  {
    id: 'jasmine-green',
    name: { ko: '자스민 녹차', en: 'Jasmine Green Tea' },
    category: 'blended',
    description: {
      ko: '은은한 자스민 꽃향과 녹차의 조화로운 블렌딩 차입니다.',
      en: 'Harmonious blend of green tea with delicate jasmine flower fragrance.'
    },
    benefits: {
      ko: ['스트레스 완화', '항산화', '향기 치유'],
      en: ['Stress relief', 'Antioxidant', 'Aromatic healing']
    },
    brewingTime: '2-3분',
    temperature: '75-85°C',
    caffeine: 'medium',
    image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['floral', 'relaxation', 'fragrant']
  },
  {
    id: 'chai-spice',
    name: { ko: '차이 스파이스', en: 'Chai Spice Tea' },
    category: 'blended',
    description: {
      ko: '계피, 카다몬, 정향 등의 향신료가 어우러진 인도 전통 블렌딩 차입니다.',
      en: 'Traditional Indian spiced tea blend with cinnamon, cardamom, and cloves.'
    },
    benefits: {
      ko: ['혈액순환', '소화촉진', '면역력 강화'],
      en: ['Circulation boost', 'Digestive aid', 'Immunity support']
    },
    brewingTime: '5-7분',
    temperature: '95-100°C',
    caffeine: 'medium',
    image: 'https://images.unsplash.com/photo-1571934811086-9dd9d2b525b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['spicy', 'warming', 'traditional']
  },
  {
    id: 'lemon-honey',
    name: { ko: '레몬 허니', en: 'Lemon Honey Tea' },
    category: 'blended',
    description: {
      ko: '상큼한 레몬과 달콤한 꿀이 조화를 이룬 건강한 블렌딩 차입니다.',
      en: 'Refreshing blend of zesty lemon and sweet honey for wellness.'
    },
    benefits: {
      ko: ['비타민C 보충', '면역력 향상', '감기 예방'],
      en: ['Vitamin C boost', 'Immune support', 'Cold prevention']
    },
    brewingTime: '4-6분',
    temperature: '85-95°C',
    caffeine: 'none',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['citrus', 'sweet', 'vitamin']
  },

  // Grain Teas
  {
    id: 'barley-tea',
    name: { ko: '보리차', en: 'Barley Tea' },
    category: 'grain',
    description: {
      ko: '구수한 맛과 향이 일품인 한국 전통 곡물차입니다.',
      en: 'Traditional Korean grain tea with a nutty, toasted flavor.'
    },
    benefits: {
      ko: ['갈증 해소', '혈당 조절', '소화 개선'],
      en: ['Thirst quenching', 'Blood sugar control', 'Digestive health']
    },
    brewingTime: '5-10분',
    temperature: '95-100°C',
    caffeine: 'none',
    image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['nutty', 'traditional', 'cooling']
  },
  {
    id: 'brown-rice-tea',
    name: { ko: '현미차', en: 'Brown Rice Tea' },
    category: 'grain',
    description: {
      ko: '고소한 현미의 깊은 맛이 느껴지는 건강한 곡물차입니다.',
      en: 'Healthy grain tea with deep, nutty flavor of roasted brown rice.'
    },
    benefits: {
      ko: ['혈당 안정', '체중 관리', '식이섬유 공급'],
      en: ['Blood sugar stability', 'Weight management', 'Fiber source']
    },
    brewingTime: '7-10분',
    temperature: '95-100°C',
    caffeine: 'none',
    image: 'https://images.unsplash.com/photo-1571934811086-9dd9d2b525b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['nutty', 'healthy', 'filling']
  },
  {
    id: 'corn-silk-tea',
    name: { ko: '옥수수수염차', en: 'Corn Silk Tea' },
    category: 'grain',
    description: {
      ko: '이뇨 작용과 부종 완화에 효과적인 옥수수수염으로 만든 차입니다.',
      en: 'Tea made from corn silk, effective for diuretic action and reducing swelling.'
    },
    benefits: {
      ko: ['이뇨 작용', '부종 완화', '신장 건강'],
      en: ['Diuretic effect', 'Swelling reduction', 'Kidney health']
    },
    brewingTime: '10-15분',
    temperature: '95-100°C',
    caffeine: 'none',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['detox', 'medicinal', 'cleansing']
  },
  {
    id: 'black-bean-tea',
    name: { ko: '검은콩차', en: 'Black Bean Tea' },
    category: 'grain',
    description: {
      ko: '항산화 성분이 풍부한 검은콩으로 만든 건강 곡물차입니다.',
      en: 'Healthy grain tea made from antioxidant-rich black beans.'
    },
    benefits: {
      ko: ['항산화', '단백질 공급', '모발 건강'],
      en: ['Antioxidant', 'Protein source', 'Hair health']
    },
    brewingTime: '8-12분',
    temperature: '95-100°C',
    caffeine: 'none',
    image: 'https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['protein', 'antioxidant', 'beauty']
  },

  // Additional Herbal Teas
  {
    id: 'rooibos',
    name: { ko: '루이보스', en: 'Rooibos' },
    category: 'herbal',
    description: {
      ko: '남아프리카 원산의 무카페인 허브차로 달콤하고 부드러운 맛입니다.',
      en: 'Caffeine-free herbal tea from South Africa with sweet, smooth taste.'
    },
    benefits: {
      ko: ['무카페인', '미네랄 풍부', '피부 건강'],
      en: ['Caffeine-free', 'Mineral rich', 'Skin health']
    },
    brewingTime: '5-7분',
    temperature: '95-100°C',
    caffeine: 'none',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['sweet', 'mineral', 'caffeine-free']
  },
  {
    id: 'peppermint',
    name: { ko: '페퍼민트', en: 'Peppermint Tea' },
    category: 'herbal',
    description: {
      ko: '상쾌한 민트 향으로 소화를 돕고 기분을 전환시켜주는 허브차입니다.',
      en: 'Refreshing mint tea that aids digestion and uplifts mood.'
    },
    benefits: {
      ko: ['소화 촉진', '구취 제거', '기분 전환'],
      en: ['Digestive aid', 'Breath freshening', 'Mood lift']
    },
    brewingTime: '5-7분',
    temperature: '95-100°C',
    caffeine: 'none',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['mint', 'digestive', 'cooling']
  },
  {
    id: 'hibiscus',
    name: { ko: '히비스커스', en: 'Hibiscus Tea' },
    category: 'herbal',
    description: {
      ko: '루비빛 붉은 색상과 상큼한 신맛이 특징인 꽃차입니다.',
      en: 'Ruby-red floral tea with a tart, cranberry-like flavor.'
    },
    benefits: {
      ko: ['혈압 조절', '항산화', '비타민C'],
      en: ['Blood pressure control', 'Antioxidant', 'Vitamin C']
    },
    brewingTime: '5-7분',
    temperature: '95-100°C',
    caffeine: 'none',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['tart', 'colorful', 'vitamin']
  },

  // Premium Teas
  {
    id: 'oolong-tea',
    name: { ko: '우롱차', en: 'Oolong Tea' },
    category: 'premium',
    description: {
      ko: '반발효 차로 녹차와 홍차의 중간 특성을 가진 고급 차입니다.',
      en: 'Semi-fermented premium tea with characteristics between green and black tea.'
    },
    benefits: {
      ko: ['지방 분해', '콜레스테롤 조절', '신진대사 촉진'],
      en: ['Fat metabolism', 'Cholesterol control', 'Metabolism boost']
    },
    brewingTime: '3-5분',
    temperature: '85-95°C',
    caffeine: 'medium',
    image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['premium', 'metabolism', 'traditional']
  },
  {
    id: 'white-tea',
    name: { ko: '백차', en: 'White Tea' },
    category: 'premium',
    description: {
      ko: '가장 순수한 형태의 차로 섬세하고 우아한 맛이 특징인 최고급 차입니다.',
      en: 'The purest form of tea with delicate, elegant flavor - the ultimate premium tea.'
    },
    benefits: {
      ko: ['항노화', '피부 미용', '강력한 항산화'],
      en: ['Anti-aging', 'Skin beauty', 'Powerful antioxidant']
    },
    brewingTime: '4-6분',
    temperature: '75-85°C',
    caffeine: 'low',
    image: 'https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['delicate', 'premium', 'anti-aging']
  },
  {
    id: 'pu-erh',
    name: { ko: '보이차', en: 'Pu-erh Tea' },
    category: 'premium',
    description: {
      ko: '중국 운남성 특산의 발효차로 깊고 진한 맛이 일품인 프리미엄 차입니다.',
      en: 'Fermented tea from Yunnan, China with deep, rich flavor - a true premium experience.'
    },
    benefits: {
      ko: ['소화 개선', '체중 감량', '콜레스테롤 감소'],
      en: ['Digestive improvement', 'Weight loss', 'Cholesterol reduction']
    },
    brewingTime: '3-5분',
    temperature: '95-100°C',
    caffeine: 'medium',
    image: 'https://images.unsplash.com/photo-1571934811086-9dd9d2b525b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    tags: ['fermented', 'digestive', 'weight-loss']
  }
];

export const getTodayRecommendation = (): Tea => {
  const now = new Date();
  const hour = now.getHours();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Use day of year to cycle through different teas each day
  const teaIndex = dayOfYear % teas.length;
  
  // Still consider time of day for appropriate recommendations
  if (hour >= 6 && hour < 12) {
    // Morning: Energy boosting teas (green tea, mate tea)
    const morningTeas = teas.filter(tea => tea.caffeine === 'medium' || tea.caffeine === 'high');
    return morningTeas[dayOfYear % morningTeas.length] || teas[teaIndex];
  } else if (hour >= 12 && hour < 18) {
    // Afternoon: Focus enhancing teas
    const afternoonTeas = teas.filter(tea => tea.tags.includes('focus') || tea.tags.includes('concentration'));
    return afternoonTeas[dayOfYear % afternoonTeas.length] || teas[teaIndex];
  } else {
    // Evening: Relaxing teas
    const eveningTeas = teas.filter(tea => tea.caffeine === 'none' && (tea.tags.includes('relaxation') || tea.tags.includes('sleep')));
    return eveningTeas[dayOfYear % eveningTeas.length] || teas[teaIndex];
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
