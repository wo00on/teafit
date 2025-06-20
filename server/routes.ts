import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTeaDiagnosisSchema, insertTeaDiaryEntrySchema } from "@shared/schema";
import { z } from "zod";

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
      const { answers } = req.body;
      
      // Tea recommendation algorithm based on answers
      let recommendedTea = "녹차"; // Default
      
      if (answers.temperature === "cold") {
        if (answers.desiredEffect === "energy") {
          recommendedTea = "생강차";
        } else if (answers.desiredEffect === "calm") {
          recommendedTea = "유자차";
        } else {
          recommendedTea = "계피차";
        }
      } else if (answers.digestion === "poor") {
        if (answers.caffeine === "sensitive") {
          recommendedTea = "페퍼민트";
        } else {
          recommendedTea = "매실차";
        }
      } else if (answers.sleep === "poor" || answers.desiredEffect === "sleep") {
        if (answers.stress === "high") {
          recommendedTea = "라벤더차";
        } else {
          recommendedTea = "캐모마일";
        }
      } else if (answers.stress === "high" || answers.desiredEffect === "calm") {
        recommendedTea = "국화차";
      } else if (answers.caffeine === "sensitive") {
        if (answers.desiredEffect === "energy") {
          recommendedTea = "루이보스";
        } else {
          recommendedTea = "보리차";
        }
      } else if (answers.morning === "tired" || answers.desiredEffect === "energy") {
        if (answers.energyTime === "morning") {
          recommendedTea = "마테차";
        } else {
          recommendedTea = "홍차";
        }
      } else if (answers.desiredEffect === "focus") {
        recommendedTea = "녹차";
      }

      res.json({ recommendedTea, explanation: getTeaExplanation(recommendedTea) });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate recommendation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function getTeaExplanation(teaName: string): string {
  const explanations: Record<string, string> = {
    "생강차": "몸을 따뜻하게 해주고 혈액순환을 도와줍니다.",
    "캐모마일": "마음을 진정시키고 숙면에 도움을 줍니다.",
    "유자차": "비타민C가 풍부하고 상큼한 향으로 기분전환에 좋습니다.",
    "녹차": "집중력 향상과 항산화 작용에 도움을 줍니다.",
    "국화차": "눈의 피로를 풀어주고 마음을 차분하게 해줍니다.",
    "마테차": "카페인이 함유되어 에너지 증진에 도움을 줍니다.",
    "보리차": "무카페인으로 갈증해소와 소화에 좋습니다.",
    "라벤더차": "스트레스 완화와 심신 이완에 효과적입니다.",
    "페퍼민트": "소화불량 완화와 속을 시원하게 해줍니다.",
    "매실차": "소화촉진과 피로회복에 도움을 줍니다.",
    "홍차": "기력회복과 아침 활력에 좋습니다.",
    "루이보스": "무카페인이면서 미네랄이 풍부합니다.",
    "계피차": "혈액순환 개선과 몸을 따뜻하게 해줍니다."
  };
  
  return explanations[teaName] || "건강한 차 생활을 위한 좋은 선택입니다.";
}
