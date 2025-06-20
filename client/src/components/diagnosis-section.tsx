import { useState } from 'react';
import { useTranslation } from '../lib/i18n';
import { getSessionId } from '../lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Sparkles } from 'lucide-react';
import type { DiagnosisAnswer } from '../types/tea';

export function DiagnosisSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Partial<DiagnosisAnswer>>({});

  const diagnosisMutation = useMutation({
    mutationFn: async (diagnosisData: any) => {
      const response = await apiRequest('POST', '/api/diagnosis', diagnosisData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "진단 완료!",
        description: "당신만의 차 추천이 완료되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "진단 실패",
        description: "진단 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  });

  const recommendationMutation = useMutation({
    mutationFn: async (answers: Partial<DiagnosisAnswer>) => {
      const response = await apiRequest('POST', '/api/recommend', { answers });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: `추천차: ${data.recommendedTea}`,
        description: data.explanation,
      });
    }
  });

  const handleAnswerChange = (question: keyof DiagnosisAnswer, value: string) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < 8) {
      toast({
        title: "모든 질문에 답해주세요",
        description: "진단을 위해 8개 질문에 모두 답해주세요.",
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
                      ① {questionText}
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
                {diagnosisMutation.isPending || recommendationMutation.isPending ? '진단 중...' : t('diagnosis.submit')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
