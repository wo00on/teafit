import { useState } from 'react';
import { useTranslation } from '../lib/i18n';
import { getSessionId } from '../lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Sparkles, Clock, Thermometer, Star } from 'lucide-react';
import type { DiagnosisAnswer } from '../types/tea';
import { teas } from '../data/teas';

export function DiagnosisSection() {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Partial<DiagnosisAnswer>>({});
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [recommendedTea, setRecommendedTea] = useState<any>(null);

  const diagnosisMutation = useMutation({
    mutationFn: async (diagnosisData: any) => {
      const response = await apiRequest('POST', '/api/diagnosis', diagnosisData);
      return response.json();
    },
    onSuccess: () => {
      // Success handled in handleSubmit
    },
    onError: () => {
      toast({
        title: language === 'ko' ? "진단 실패" : "Diagnosis Failed",
        description: language === 'ko' ? "진단 중 오류가 발생했습니다. 다시 시도해주세요." : "An error occurred during diagnosis. Please try again.",
        variant: "destructive",
      });
    }
  });

  const recommendationMutation = useMutation({
    mutationFn: async (answers: Partial<DiagnosisAnswer>) => {
      const response = await apiRequest('POST', '/api/recommend', { answers, language });
      return response.json();
    },
    onSuccess: (data) => {
      // Find the tea details from our tea data
      const teaDetails = teas.find(tea => 
        tea.name.ko === data.recommendedTea || tea.name.en === data.recommendedTea
      );
      
      setRecommendedTea({
        ...data,
        teaDetails
      });
      setShowResultDialog(true);
    },
    onError: () => {
      toast({
        title: language === 'ko' ? "추천 실패" : "Recommendation Failed",
        description: language === 'ko' ? "추천 중 오류가 발생했습니다. 다시 시도해주세요." : "An error occurred during recommendation. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleAnswerChange = (question: keyof DiagnosisAnswer, value: string) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < 8) {
      toast({
        title: language === 'ko' ? "모든 질문에 답해주세요" : "Please answer all questions",
        description: language === 'ko' ? "진단을 위해 8개 질문에 모두 답해주세요." : "Please answer all 8 questions for diagnosis.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get recommendation first
      const recommendation = await recommendationMutation.mutateAsync(answers as DiagnosisAnswer);
      
      // Save diagnosis result
      const diagnosisData = {
        sessionId: getSessionId(),
        ...answers,
        recommendedTea: recommendation.recommendedTea
      };
      
      await diagnosisMutation.mutateAsync(diagnosisData);
    } catch (error) {
      console.error('Diagnosis error:', error);
    }
  };

  const questions = [
    'temperature', 'digestion', 'sleep', 'stress', 
    'caffeine', 'morning', 'energyTime', 'desiredEffect'
  ] as const;

  return (
    <section id="diagnosis" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-800 mb-4">{t('diagnosis.title')}</h2>
          <p className="text-xl text-gray-600">{t('diagnosis.subtitle')}</p>
        </div>

        <div className="bg-orange-50/30 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="space-y-8">
            {questions.map((question, index) => {
              const questionKey = `diagnosis.questions.${question}`;
              const questionText = t(`${questionKey}.question`);
              const answerOptions = t(`${questionKey}.answers`);
              
              return (
                <Card key={question} className="bg-white rounded-2xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-amber-800 mb-4">
                      {index + 1}. {questionText}
                    </h3>
                    <RadioGroup
                      value={answers[question] || ''}
                      onValueChange={(value) => handleAnswerChange(question, value)}
                    >
                      {typeof answerOptions === 'object' && Object.entries(answerOptions).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-3 cursor-pointer hover:bg-orange-50/20 p-3 rounded-lg transition-colors">
                          <RadioGroupItem value={key} id={`${question}-${key}`} />
                          <Label htmlFor={`${question}-${key}`} className="cursor-pointer flex-1">
                            {value as string}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              );
            })}

            <div className="text-center pt-8">
              <Button 
                onClick={handleSubmit}
                disabled={diagnosisMutation.isPending || recommendationMutation.isPending}
                className="bg-amber-800 hover:bg-amber-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                {diagnosisMutation.isPending || recommendationMutation.isPending ? 
                  (language === 'ko' ? '진단 중...' : 'Analyzing...') : 
                  t('diagnosis.submit')
                }
              </Button>
            </div>
          </div>
        </div>

        {/* Recommendation Result Dialog */}
        <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl font-elegant font-medium text-amber-800 text-center">
                {language === 'ko' ? '당신을 위한 완벽한 차' : 'Your Perfect Tea'}
              </DialogTitle>
            </DialogHeader>
            
            {recommendedTea && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                    {recommendedTea.teaDetails ? (
                      <img 
                        src={recommendedTea.teaDetails.image} 
                        alt={recommendedTea.teaDetails.name[language]} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
                        <span className="text-4xl">🍃</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-amber-800 mb-2">
                    {recommendedTea.recommendedTea}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    {recommendedTea.explanation}
                  </p>
                </div>

                {recommendedTea.teaDetails && (
                  <div className="space-y-6">
                    <div className="bg-orange-50 rounded-xl p-6">
                      <h4 className="font-semibold text-amber-800 mb-4">
                        {language === 'ko' ? '차 정보' : 'Tea Information'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="mr-2 w-4 h-4 text-emerald-600" />
                          <span>{language === 'ko' ? '우리는 시간' : 'Brewing Time'}: {recommendedTea.teaDetails.brewingTime}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Thermometer className="mr-2 w-4 h-4 text-emerald-600" />
                          <span>{language === 'ko' ? '적정 온도' : 'Temperature'}: {recommendedTea.teaDetails.temperature}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="mr-2 w-4 h-4 text-emerald-600" />
                          <span>{language === 'ko' ? '카페인' : 'Caffeine'}: {recommendedTea.teaDetails.caffeine === 'none' ? (language === 'ko' ? '무카페인' : 'None') : recommendedTea.teaDetails.caffeine}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {recommendedTea.teaDetails.description[language]}
                      </p>
                    </div>

                    <div className="bg-emerald-50 rounded-xl p-6">
                      <h4 className="font-semibold text-emerald-800 mb-4">
                        {language === 'ko' ? '주요 효능' : 'Key Benefits'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {recommendedTea.teaDetails.benefits[language].map((benefit: string, index: number) => (
                          <div key={index} className="flex items-center text-sm text-emerald-700">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-6">
                      <h4 className="font-semibold text-amber-800 mb-3">
                        {language === 'ko' ? '추천 이유' : 'Why This Tea?'}
                      </h4>
                      <p className="text-sm text-amber-700 leading-relaxed">
                        {recommendedTea.explanation}
                      </p>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <Button 
                    onClick={() => setShowResultDialog(false)}
                    className="bg-amber-800 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium"
                  >
                    {language === 'ko' ? '확인' : 'Got it'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
