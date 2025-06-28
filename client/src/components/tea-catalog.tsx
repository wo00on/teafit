import { useState } from 'react';
import { useTranslation } from '../lib/i18n';
import { searchTeas, teas } from '../data/teas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import type { Tea } from '../types/tea';

export function TeaCatalog() {
  const { t, language } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredTeas, setFilteredTeas] = useState<Tea[]>(teas);

  const categories = [
    { key: 'all', label: language === 'ko' ? '전체' : 'All' },
    { key: 'herbal', label: t('catalog.categories.herbal') },
    { key: 'blended', label: t('catalog.categories.blended') },
    { key: 'grain', label: t('catalog.categories.grain') },
    { key: 'premium', label: t('catalog.categories.premium') }
  ];

  const handleSearch = () => {
    const results = searchTeas(searchQuery, selectedCategory === 'all' ? undefined : selectedCategory);
    setFilteredTeas(results);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const results = searchTeas(searchQuery, category === 'all' ? undefined : category);
    setFilteredTeas(results);
  };

  const getCategoryCount = (category: string) => {
    if (category === 'all') return teas.length;
    return teas.filter(tea => tea.category === category).length;
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      herbal: '🌿',
      blended: '🫖',
      grain: '🌾',
      premium: '👑'
    };
    return emojis[category] || '🍃';
  };

  return (
    <section id="catalog" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-800 mb-4">{t('catalog.title')}</h2>
          <p className="text-lg text-gray-600">{t('catalog.subtitle')}</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {categories.slice(1).map((category) => (
            <Card 
              key={category.key}
              className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                selectedCategory === category.key ? 'ring-2 ring-amber-500' : ''
              }`}
              onClick={() => handleCategoryChange(category.key)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{getCategoryEmoji(category.key)}</div>
                <h3 className="text-xl font-bold text-amber-800 mb-2">{category.label}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {language === 'ko' ? '자연의 치유력이 담긴 무카페인 차' : 'Natural healing power in caffeine-free tea'}
                </p>
                <Badge variant="secondary" className="text-emerald-600">
                  {getCategoryCount(category.key)}가지 종류
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="mb-16 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={t('catalog.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-amber-800 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300"
            >
              <Search className="mr-2 w-4 h-4" />
              {t('catalog.searchButton')}
            </Button>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category.key)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Tea Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeas.map((tea) => (
            <Card key={tea.id} className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={tea.image} 
                    alt={tea.name[language]} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-amber-800">
                      {tea.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-800 mb-2">{typeof tea.name === 'string' ? tea.name : tea.name[language]}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tea.description[language]}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{tea.brewingTime}</span>
                    <span>{tea.temperature}</span>
                    <Badge variant={tea.caffeine === 'none' ? 'secondary' : 'outline'}>
                      {tea.caffeine === 'none' ? '무카페인' : '카페인'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTeas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}