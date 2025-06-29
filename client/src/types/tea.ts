export interface Tea {
  id: string;
  name: {
    ko: string;
    en: string;
  };
  category: 'herbal' | 'blended' | 'grain' | 'premium';
  description: {
    ko: string;
    en: string;
  };
  benefits: {
    ko: string[];
    en: string[];
  };
  brewingTime: {
    ko: string;
    en: string;
  }; // in minutes
  temperature: string; // in Celsius
  caffeine: 'none' | 'low' | 'medium' | 'high';
  image: string;
  tags: string[];
}

export interface DiagnosisAnswer {
  temperature: 'cold' | 'normal';
  digestion: 'poor' | 'sometimes' | 'good';
  sleep: 'good' | 'sometimes' | 'poor';
  stress: 'high' | 'sometimes' | 'low';
  caffeine: 'sensitive' | 'normal';
  morning: 'tired' | 'normal' | 'fresh';
  energyTime: 'morning' | 'afternoon' | 'evening';
  desiredEffect: 'energy' | 'sleep' | 'digestion' | 'focus' | 'calm';
}

export interface DiaryEntry {
  id: number;
  teaName: string;
  rating: number;
  notes?: string;
  dateConsumed: Date;
  createdAt: Date;
}
