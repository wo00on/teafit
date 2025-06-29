import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTeaDiagnosisSchema, insertTeaDiaryEntrySchema } from "@shared/schema";
import { z } from "zod";
import { teas } from "../client/src/data/teas";

export async function registerRoutes(app: Express): Promise<Server> {
  // Tea diagnosis endpoint
  app.post("/api/diagnosis", async (req, res) => {
    try {
      const validatedData = insertTeaDiagnosisSchema.parse(req.body);
      const result = await storage.createTeaDiagnosisResult(validatedData);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid diagnosis data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to save diagnosis result" });
      }
    }
  });

  // Get diagnosis results by session
  app.get("/api/diagnosis/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const results = await storage.getTeaDiagnosisResultsBySession(sessionId);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch diagnosis results" });
    }
  });

  // Tea diary endpoints
  app.post("/api/diary", async (req, res) => {
    try {
      const validatedData = insertTeaDiaryEntrySchema.parse(req.body);
      const entry = await storage.createTeaDiaryEntry(validatedData);
      res.json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid diary entry data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to save diary entry" });
      }
    }
  });

  // Get diary entries by session
  app.get("/api/diary/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const entries = await storage.getTeaDiaryEntriesBySession(sessionId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch diary entries" });
    }
  });

  // Update diary entry
  app.patch("/api/diary/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updated = await storage.updateTeaDiaryEntry(parseInt(id), updateData);
      if (!updated) {
        res.status(404).json({ error: "Diary entry not found" });
        return;
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update diary entry" });
    }
  });

  // Delete diary entry
  app.delete("/api/diary/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteTeaDiaryEntry(parseInt(id));
      if (!deleted) {
        res.status(404).json({ error: "Diary entry not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete diary entry" });
    }
  });

  // Tea recommendation algorithm endpoint
  app.post("/api/recommend", async (req, res) => {
    try {
      const { answers, language } = req.body;

      // Enhanced tea recommendation algorithm with more variety
      let recommendedTea = "녹차"; // Default

      if (answers.temperature === "cold") {
        if (answers.desiredEffect === "energy") {
          recommendedTea = "생강차";
        } else if (answers.desiredEffect === "calm") {
          recommendedTea = "차이 스파이스";
        } else if (answers.desiredEffect === "digestion") {
          recommendedTea = "계피차";
        } else {
          recommendedTea = "생강차";
        }
      } else if (answers.digestion === "poor") {
        if (answers.caffeine === "sensitive") {
          recommendedTea = "페퍼민트";
        } else if (answers.desiredEffect === "focus") {
          recommendedTea = "보이차";
        } else {
          recommendedTea = "현미차";
        }
      } else if (answers.sleep === "poor" || answers.desiredEffect === "sleep") {
        if (answers.stress === "high") {
          recommendedTea = "캐모마일";
        } else if (answers.caffeine === "sensitive") {
          recommendedTea = "히비스커스";
        } else {
          recommendedTea = "국화차";
        }
      } else if (answers.stress === "high" || answers.desiredEffect === "calm") {
        if (answers.caffeine === "sensitive") {
          recommendedTea = "자스민 녹차";
        } else {
          recommendedTea = "루이보스";
        }
      } else if (answers.caffeine === "sensitive") {
        if (answers.desiredEffect === "energy") {
          recommendedTea = "검은콩차";
        } else if (answers.desiredEffect === "digestion") {
          recommendedTea = "옥수수수염차";
        } else {
          recommendedTea = "보리차";
        }
      } else if (answers.morning === "tired" || answers.desiredEffect === "energy") {
        if (answers.energyTime === "morning") {
          recommendedTea = "마테차";
        } else if (answers.energyTime === "afternoon") {
          recommendedTea = "얼그레이";
        } else {
          recommendedTea = "우롱차";
        }
      } else if (answers.desiredEffect === "focus") {
        if (answers.caffeine === "sensitive") {
          recommendedTea = "백차";
        } else {
          recommendedTea = "녹차";
        }
      } else if (answers.desiredEffect === "digestion") {
        recommendedTea = "보이차";
      }

      // Find the tea data to get proper translation
      const teaData = teas.find(tea => tea.name.ko === recommendedTea);

      res.json({
        recommendedTea: teaData ? teaData.name[language] : recommendedTea,
        teaData: teaData || null,
        explanation: getTeaExplanation(recommendedTea, language),
        brewingInstructions: getBrewingInstructions(recommendedTea, language)
      });
    } catch (error) {
      console.error('Error in recommend endpoint:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function getTeaExplanation(teaName: string, language: string = 'ko'): string {
  const explanations: Record<string, { ko: string; en: string }> = {
    "생강차": {
      ko: "몸을 따뜻하게 해주고 혈액순환을 도와줍니다.",
      en: "Warms the body and improves blood circulation."
    },
    "캐모마일": {
      ko: "마음을 진정시키고 숙면에 도움을 줍니다.",
      en: "Calms the mind and promotes better sleep."
    },
    "유자차": {
      ko: "비타민C가 풍부하고 상큼한 향으로 기분전환에 좋습니다.",
      en: "Rich in vitamin C with refreshing citrus aroma for mood enhancement."
    },
    "녹차": {
      ko: "집중력 향상과 항산화 작용에 도움을 줍니다.",
      en: "Improves focus and provides powerful antioxidant benefits."
    },
    "국화차": {
      ko: "눈의 피로를 풀어주고 마음을 차분하게 해줍니다.",
      en: "Relieves eye fatigue and brings mental tranquility."
    },
    "마테차": {
      ko: "카페인이 함유되어 에너지 증진에 도움을 줍니다.",
      en: "Contains caffeine to boost energy and enhance alertness."
    },
    "보리차": {
      ko: "무카페인으로 갈증해소와 소화에 좋습니다.",
      en: "Caffeine-free tea that quenches thirst and aids digestion."
    },
    "페퍼민트": {
      ko: "소화불량 완화와 속을 시원하게 해줍니다.",
      en: "Relieves digestive discomfort and provides cooling sensation."
    },
    "매실차": {
      ko: "소화촉진과 피로회복에 도움을 줍니다.",
      en: "Promotes digestion and helps with fatigue recovery."
    },
    "홍차": {
      ko: "기력회복과 아침 활력에 좋습니다.",
      en: "Restores energy and provides morning vitality."
    },
    "루이보스": {
      ko: "무카페인이면서 미네랄이 풍부합니다.",
      en: "Caffeine-free and rich in essential minerals."
    },
    "계피차": {
      ko: "혈액순환 개선과 몸을 따뜻하게 해줍니다.",
      en: "Improves blood circulation and warms the body."
    },
    "얼그레이": {
      ko: "베르가못 향으로 기분을 전환하고 집중력을 높여줍니다.",
      en: "Bergamot aroma enhances mood and improves concentration."
    },
    "자스민 녹차": {
      ko: "은은한 꽃향과 함께 스트레스를 완화해줍니다.",
      en: "Delicate floral aroma helps reduce stress and anxiety."
    },
    "차이 스파이스": {
      ko: "향신료로 혈액순환을 돕고 면역력을 강화합니다.",
      en: "Spices help circulation and strengthen immunity."
    },
    "레몬 허니": {
      ko: "비타민C로 면역력을 높이고 감기를 예방합니다.",
      en: "Vitamin C boosts immunity and prevents colds."
    },
    "현미차": {
      ko: "혈당 안정과 체중 관리에 도움을 줍니다.",
      en: "Helps stabilize blood sugar and supports weight management."
    },
    "옥수수수염차": {
      ko: "이뇨작용으로 부종 완화와 신장 건강에 좋습니다.",
      en: "Diuretic properties help reduce swelling and support kidney health."
    },
    "검은콩차": {
      ko: "항산화 성분으로 노화 방지와 모발 건강에 효과적입니다.",
      en: "Antioxidants help prevent aging and promote hair health."
    },
    "히비스커스": {
      ko: "혈압 조절과 강력한 항산화 작용을 합니다.",
      en: "Helps control blood pressure with powerful antioxidant action."
    },
    "우롱차": {
      ko: "지방 분해와 신진대사 촉진에 도움을 줍니다.",
      en: "Promotes fat metabolism and boosts metabolic rate."
    },
    "백차": {
      ko: "강력한 항산화 작용으로 피부 미용과 항노화에 효과적입니다.",
      en: "Powerful antioxidants promote skin beauty and anti-aging."
    },
    "보이차": {
      ko: "소화 개선과 체중 감량에 도움을 주는 발효차입니다.",
      en: "Fermented tea that improves digestion and supports weight loss."
    }
  };

  const tea = explanations[teaName];
  if (!tea) {
    return language === 'ko' ? "건강한 차 생활을 위한 좋은 선택입니다." : "A wonderful choice for healthy tea lifestyle.";
  }

  return tea[language as 'ko' | 'en'] || tea.ko;
}

function getBrewingInstructions(teaName: string, language: string): string {
  const brewingData: Record<string, { time: string; temp: string; ko: string; en: string }> = {
    "생강차": {
      time: language === 'ko' ? "5-7분" : "5-7 minutes",
      temp: "95-100°C",
      ko: "끓는 물에 5-7분간 우려내세요. 꿀이나 레몬을 추가하면 더욱 맛있습니다.",
      en: "Steep in boiling water for 5-7 minutes. Add honey or lemon for enhanced flavor."
    },
    "캐모마일": {
      time: language === 'ko' ? "5-7분" : "5-7 minutes",
      temp: "85-95°C",
      ko: "따뜻한 물에 5-7분간 우려내세요. 잠들기 전에 마시면 좋습니다.",
      en: "Steep in warm water for 5-7 minutes. Best enjoyed before bedtime."
    },
    "유자차": {
      time: language === 'ko' ? "3-5분" : "3-5 minutes",
      temp: "80-90°C",
      ko: "따뜻한 물에 3-5분간 우려내세요. 겨울철 감기 예방에 좋습니다.",
      en: "Steep in warm water for 3-5 minutes. Great for cold prevention in winter."
    },
    "녹차": {
      time: language === 'ko' ? "2-3분" : "2-3 minutes",
      temp: "70-80°C",
      ko: "따뜻한 물에 2-3분간 우려내세요. 너무 오래 우리지 마세요.",
      en: "Steep in warm water for 2-3 minutes. Don't over-steep."
    },
    "매실차": {
      time: language === 'ko' ? "5-7분" : "5-7 minutes",
      temp: "85-95°C",
      ko: "따뜻한 물에 5-7분간 우려내세요. 식후에 마시면 소화에 좋습니다.",
      en: "Steep in warm water for 5-7 minutes. Great for digestion after meals."
    },
    "홍차": {
      time: language === 'ko' ? "3-5분" : "3-5 minutes",
      temp: "95-100°C",
      ko: "끓는 물에 3-5분간 우려내세요. 우유나 설탕을 추가할 수 있습니다.",
      en: "Steep in boiling water for 3-5 minutes. Can add milk or sugar."
    },
    "계피차": {
      time: language === 'ko' ? "7-10분" : "7-10 minutes",
      temp: "95-100°C",
      ko: "끓는 물에 7-10분간 우려내세요. 꿀을 추가하면 더욱 맛있습니다.",
      en: "Steep in boiling water for 7-10 minutes. Add honey for enhanced taste."
    },
    "마테차": {
      time: language === 'ko' ? "3-5분" : "3-5 minutes",
      temp: "70-80°C",
      ko: "따뜻한 물에 3-5분간 우려내세요. 아침에 마시면 좋습니다.",
      en: "Steep in warm water for 3-5 minutes. Best enjoyed in the morning."
    },
    "국화차": {
      time: language === 'ko' ? "5-8분" : "5-8 minutes",
      temp: "85-95°C",
      ko: "따뜻한 물에 5-8분간 우려내세요. 눈이 피로할 때 좋습니다.",
      en: "Steep in warm water for 5-8 minutes. Great when eyes feel tired."
    },
    "얼그레이": {
      time: language === 'ko' ? "3-5분" : "3-5 minutes",
      temp: "95-100°C",
      ko: "끓는 물에 3-5분간 우려내세요. 오후 티타임에 완벽합니다.",
      en: "Steep in boiling water for 3-5 minutes. Perfect for afternoon tea time."
    },
    "자스민 녹차": {
      time: language === 'ko' ? "2-3분" : "2-3 minutes",
      temp: "75-85°C",
      ko: "따뜻한 물에 2-3분간 우려내세요. 은은한 꽃향이 매력적입니다.",
      en: "Steep in warm water for 2-3 minutes. Enjoy the delicate floral aroma."
    },
    "차이 스파이스": {
      time: language === 'ko' ? "5-7분" : "5-7 minutes",
      temp: "95-100°C",
      ko: "끓는 물에 5-7분간 우려내세요. 우유를 추가하면 전통적인 맛을 즐길 수 있습니다.",
      en: "Steep in boiling water for 5-7 minutes. Add milk for traditional taste."
    },
    "레몬 허니": {
      time: language === 'ko' ? "4-6분" : "4-6 minutes",
      temp: "85-95°C",
      ko: "따뜻한 물에 4-6분간 우려내세요. 감기 기운이 있을 때 좋습니다.",
      en: "Steep in warm water for 4-6 minutes. Great when feeling under the weather."
    },
    "보리차": {
      time: language === 'ko' ? "5-10분" : "5-10 minutes",
      temp: "95-100°C",
      ko: "끓는 물에 5-10분간 우려내세요. 차갑게 해서 마셔도 좋습니다.",
      en: "Steep in boiling water for 5-10 minutes. Can also be enjoyed cold."
    },
    "현미차": {
      time: language === 'ko' ? "7-10분" : "7-10 minutes",
      temp: "95-100°C",
      ko: "끓는 물에 7-10분간 우려내세요. 고소한 맛이 일품입니다.",
      en: "Steep in boiling water for 7-10 minutes. Enjoy the nutty flavor."
    },
    "옥수수수염차": {
      time: language === 'ko' ? "10-15분" : "10-15 minutes",
      temp: "95-100°C",
      ko: "끓는 물에 10-15분간 우려내세요. 부종 완화에 도움이 됩니다.",
      en: "Steep in boiling water for 10-15 minutes. Helps reduce swelling."
    },
    "검은콩차": {
      time: language === 'ko' ? "8-12분" : "8-12 minutes",
      temp: "95-100°C",
      ko: "끓는 물에 8-12분간 우려내세요. 항산화 효과가 뛰어납니다.",
      en: "Steep in boiling water for 8-12 minutes. Excellent antioxidant properties."
    },
    "루이보스": {
      time: language === 'ko' ? "5-7분" : "5-7 minutes",
      temp: "95-100°C",
      ko: "끓는 물에 5-7분간 우려내세요. 무카페인으로 언제든 드실 수 있습니다.",
      en: "Steep in boiling water for 5-7 minutes. Caffeine-free, enjoy anytime."
    },
    "페퍼민트": {
      time: language === 'ko' ? "5-7분" : "5-7 minutes",
      temp: "95-100°C",
      ko: "끓는 물에 5-7분간 우려내세요. 소화가 안 될 때 좋습니다.",
      en: "Steep in boiling water for 5-7 minutes. Great for digestive issues."
    },
    "히비스커스": {
      time: language === 'ko' ? "5-7분" : "5-7 minutes",
      temp: "95-100°C",
      ko: "끓는 물에 5-7분간 우려내세요. 붉은 색상이 아름다운 차입니다.",
      en: "Steep in boiling water for 5-7 minutes. Beautiful ruby-red colored tea."
    },
    "우롱차": {
      time: language === 'ko' ? "3-5분" : "3-5 minutes",
      temp: "85-95°C",
      ko: "따뜻한 물에 3-5분간 우려내세요. 여러 번 우려 마실 수 있습니다.",
      en: "Steep in warm water for 3-5 minutes. Can be steeped multiple times."
    },
    "백차": {
      time: language === 'ko' ? "4-6분" : "4-6 minutes",
      temp: "75-85°C",
      ko: "따뜻한 물에 4-6분간 우려내세요. 섬세한 맛을 즐겨보세요.",
      en: "Steep in warm water for 4-6 minutes. Enjoy the delicate flavor."
    },
    "보이차": {
      time: language === 'ko' ? "3-5분" : "3-5 minutes",
      temp: "95-100°C",
      ko: "끓는 물에 3-5분간 우려내세요. 깊고 진한 맛이 특징입니다.",
      en: "Steep in boiling water for 3-5 minutes. Features deep, rich flavor."
    }
  };

  const brewing = brewingData[teaName];
  if (!brewing) {
    return language === 'ko' 
      ? "따뜻한 물에 5분간 우려내세요."
      : "Steep in warm water for 5 minutes.";
  }

  return brewing[language as keyof typeof brewing] || brewing.ko;
}