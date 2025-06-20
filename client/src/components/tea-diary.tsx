import { useState, useEffect } from 'react';
import { useTranslation } from '../lib/i18n';
import { getSessionId } from '../lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Star } from 'lucide-react';
import { teas } from '../data/teas';
import type { TeaDiaryEntry } from '../types/tea';

export function TeaDiary() {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTea, setSelectedTea] = useState('');
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');

  const sessionId = getSessionId();

  // Fetch diary entries
  const { data: diaryEntries = [], isLoading } = useQuery({
    queryKey: ['/api/diary', sessionId],
    enabled: !!sessionId
  });

  // Create diary entry mutation
  const createEntryMutation = useMutation({
    mutationFn: async (entryData: any) => {
      const response = await apiRequest('POST', '/api/diary', entryData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "기록 완료!",
        description: "차 다이어리에 기록되었습니다.",
      });
      setSelectedTea('');
      setRating(0);
      setNotes('');
      queryClient.invalidateQueries({ queryKey: ['/api/diary', sessionId] });
    },
    onError: () => {
      toast({
        title: "기록 실패",
        description: "기록 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = () => {
    if (!selectedTea || rating === 0) {
      toast({
        title: "정보를 입력해주세요",
        description: "차 종류와 만족도를 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const entryData = {
      sessionId,
      teaName: selectedTea,
      rating,
      notes: notes.trim() || undefined,
      dateConsumed: new Date().toISOString()
    };

    createEntryMutation.mutate(entryData);
  };

  const StarRating = ({ rating, onChange }: { rating: number; onChange: (rating: number) => void }) => {
    return (
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="text-2xl transition-colors hover:scale-110 transform"
          >
            <Star 
              className={`w-6 h-6 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <section id="diary" className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-800 mb-4">{t('diary.title')}</h2>
          <p className="text-lg text-gray-600">{t('diary.subtitle')}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Diary Entry Form */}
            <Card className="bg-white rounded-3xl shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-amber-800 mb-6">{t('diary.addEntry')}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('diary.teaName')}
                    </label>
                    <Select value={selectedTea} onValueChange={setSelectedTea}>
                      <SelectTrigger className="w-full px-4 py-3 rounded-xl border border-gray-200">
                        <SelectValue placeholder="차 종류를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {teas.map((tea) => (
                          <SelectItem key={tea.id} value={tea.name.ko}>
                            {tea.name[language]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('diary.rating')}
                    </label>
                    <StarRating rating={rating} onChange={setRating} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('diary.notes')}
                    </label>
                    <Textarea
                      rows={3}
                      placeholder={t('diary.notesPlaceholder')}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 resize-none"
                    />
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    disabled={createEntryMutation.isPending}
                    className="w-full bg-amber-800 hover:bg-amber-700 text-white py-3 rounded-xl font-medium transition-all duration-300"
                  >
                    {createEntryMutation.isPending ? '기록 중...' : t('diary.submit')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <Card className="bg-white rounded-3xl shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-amber-800 mb-6">{t('diary.recentEntries')}</h3>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : diaryEntries.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {diaryEntries.map((entry: any) => (
                      <div key={entry.id} className="border-l-4 border-emerald-600 pl-4 py-2">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-amber-800">{entry.teaName}</h4>
                          <span className="text-sm text-gray-500">
                            {formatDate(entry.dateConsumed)}
                          </span>
                        </div>
                        <div className="flex items-center mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-4 h-4 ${star <= entry.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        {entry.notes && (
                          <p className="text-sm text-gray-600">{entry.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">아직 기록이 없습니다.</p>
                    <p className="text-sm text-gray-400 mt-1">첫 번째 차 기록을 남겨보세요!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
