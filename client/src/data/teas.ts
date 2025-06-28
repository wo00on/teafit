import { Tea } from '../types/tea';

export const teas: Tea[] = [
  {
    id: 'ginger-tea',
    name: { ko: '생강차', en: 'Ginger Tea' },
    category: 'herbal',
    description: {
      ko: '따뜻하고 매콤한 생강의 향으로 몸을 따뜻하게 해주는 건강차입니다.',
      en: 'Warm and spicy ginger tea that heats the body and promotes wellness.'
    },
    benefits: {
      ko: ['혈액순환 개선', '면역력 강화', '소화 촉진'],
      en: ['Improved circulation', 'Immune boost', 'Digestive aid']
    },
    brewingTime: '5-7분',
    temperature: '95-100°C',
    caffeine: 'none',
    image: '/images/tea-1.png',
    tags: ['warming', 'spicy', 'immune-boost']
  },
  {
    id: 'chamomile',
    name: { ko: '캐모마일', en: 'Chamomile' },
    category: 'herbal',
    description: {
      ko: '부드럽고 달콤한 향으로 마음을 평온하게 해주는 허브차입니다.',
      en: 'Gentle and sweet herbal tea that brings peace and tranquility to the mind.'
    },
    benefits: {
      ko: ['숙면 유도', '스트레스 완화', '소화 개선'],
      en: ['Sleep promotion', 'Stress relief', 'Digestive support']
    },
    brewingTime: '5-7분',
    temperature: '85-95°C',
    caffeine: 'none',
    image: '/images/tea-1.png',
    tags: ['calming', 'floral', 'bedtime']
  },
  {
    id: 'yuzu-tea',
    name: { ko: '유자차', en: 'Yuzu Tea' },
    category: 'herbal',
    description: {
      ko: '상큼한 유자의 향과 달콤함이 어우러진 전통 한국차입니다.',
      en: 'Traditional Korean tea with refreshing yuzu citrus aroma and natural sweetness.'
    },
    benefits: {
      ko: ['비타민C 풍부', '면역력 증진', '피로 회복'],
      en: ['Rich in Vitamin C', 'Immune boost', 'Fatigue relief']
    },
    brewingTime: '3-5분',
    temperature: '80-90°C',
    caffeine: 'none',
    image: '/images/tea-3.png',
    tags: ['citrus', 'vitamin-c', 'korean-traditional']
  },
  {
    id: 'green-tea',
    name: { ko: '녹차', en: 'Green Tea' },
    category: 'premium',
    description: {
      ko: '신선한 찻잎의 깔끔하고 상쾌한 맛이 일품인 전통 녹차입니다.',
      en: 'Traditional green tea with fresh, clean taste from premium tea leaves.'
    },
    benefits: {
      ko: ['항산화 작용', '집중력 향상', '신진대사 촉진'],
      en: ['Antioxidant power', 'Enhanced focus', 'Metabolism boost']
    },
    brewingTime: '2-3분',
    temperature: '70-80°C',
    caffeine: 'medium',
    image: '/images/tea-1.png',
    tags: ['antioxidant', 'focus', 'traditional']
  },
  {
    id: 'plum-tea',
    name: { ko: '매실차', en: 'Plum Tea' },
    category: 'herbal',
    description: {
      ko: '새콤달콤한 매실의 맛으로 입맛을 돋우는 건강차입니다.',
      en: 'Sweet and sour plum tea that stimulates appetite and promotes health.'
    },
    benefits: {
      ko: ['소화 촉진', '피로 회복', '해독 작용'],
      en: ['Digestive aid', 'Fatigue recovery', 'Detoxification']
    },
    brewingTime: '5-7분',
    temperature: '85-95°C',
    caffeine: 'none',
    image: '/images/tea-1.png',
    tags: ['digestive', 'sweet-sour', 'detox']
  },
  {
    id: 'black-tea',
    name: { ko: '홍차', en: 'Black Tea' },
    category: 'premium',
    description: {
      ko: '진한 향과 깊은 맛이 특징인 클래식한 홍차입니다.',
      en: 'Classic black tea with rich aroma and deep, robust flavor.'
    },
    benefits: {
      ko: ['에너지 증진', '집중력 향상', '심장 건강'],
      en: ['Energy boost', 'Mental alertness', 'Heart health']
    },
    brewingTime: '3-5분',
    temperature: '95-100°C',
    caffeine: 'high',
    image: '/images/tea-1.png',
    tags: ['energy', 'focus', 'traditional']
  },
  {
    id: 'cinnamon-tea',
    name: { ko: '계피차', en: 'Cinnamon Tea' },
    category: 'herbal',
    description: {
      ko: '달콤하고 따뜻한 계피 향이 몸과 마음을 따뜻하게 해주는 차입니다.',
      en: 'Sweet and warming cinnamon tea that comforts both body and soul.'
    },
    benefits: {
      ko: ['혈액순환 개선', '혈당 조절', '항염 작용'],
      en: ['Circulation improvement', 'Blood sugar control', 'Anti-inflammatory']
    },
    brewingTime: '7-10분',
    temperature: '95-100°C',
    caffeine: 'none',
    image: '/images/tea-1.png',
    tags: ['warming', 'circulation', 'spicy']
  },
  {
    id: 'mate-tea',
    name: { ko: '마테차', en: 'Mate Tea' },
    category: 'premium',
    description: {
      ko: '남미 원산의 에너지 넘치는 전통차로 자연 카페인이 풍부합니다.',
      en: 'Energizing South American traditional tea rich in natural caffeine.'
    },
    benefits: {
      ko: ['에너지 증진', '지구력 향상', '항산화'],
      en: ['Energy enhancement', 'Endurance boost', 'Antioxidant']
    },
    brewingTime: '3-5분',
    temperature: '70-80°C',
    caffeine: 'high',
    image: '/images/tea-1.png',
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
    image: '/images/tea-1.png',
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
    image: '/images/tea-10.png',
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
    image: '/images/tea-1.png',
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
    image: '/images/tea-1.png',
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
    image: '/images/tea-1.png',
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
    image: '/images/tea-1.png',
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
    image: '/images/tea-1.png',
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
    image: '/images/tea-1.png',
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
    image: '/images/tea-1.png',
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
    image: '/images/tea-1.png',
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
    image: '/images/tea-1.png',
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
    image: '/images/tea-8.png',
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
    image: '/images/tea-1.png',
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
    image: '/images/tea-10.png',
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
    image: '/images/tea-11.png',
    tags: ['fermented', 'digestive', 'weight-loss']
  }
];

export const getTodayRecommendation = (): Tea => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % teas.length;
  return teas[index];
};

export const searchTeas = (query: string, category?: string): Tea[] => {
  return teas.filter(tea => {
    const matchesQuery = !query || 
      tea.name.ko.toLowerCase().includes(query.toLowerCase()) ||
      tea.name.en.toLowerCase().includes(query.toLowerCase()) ||
      tea.description.ko.toLowerCase().includes(query.toLowerCase()) ||
      tea.description.en.toLowerCase().includes(query.toLowerCase()) ||
      tea.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

    const matchesCategory = !category || tea.category === category;

    return matchesQuery && matchesCategory;
  });
};