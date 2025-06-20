import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const teaDiagnosisResults = pgTable("tea_diagnosis_results", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  temperature: text("temperature").notNull(), // cold, normal
  digestion: text("digestion").notNull(), // poor, sometimes, good
  sleep: text("sleep").notNull(), // good, sometimes, poor
  stress: text("stress").notNull(), // high, sometimes, low
  caffeine: text("caffeine").notNull(), // sensitive, normal
  morning: text("morning").notNull(), // tired, normal, fresh
  energyTime: text("energy_time").notNull(), // morning, afternoon, evening
  desiredEffect: text("desired_effect").notNull(), // energy, sleep, digestion, focus, calm
  recommendedTea: text("recommended_tea").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const teaDiaryEntries = pgTable("tea_diary_entries", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  teaName: text("tea_name").notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  notes: text("notes"),
  dateConsumed: timestamp("date_consumed").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTeaDiagnosisSchema = createInsertSchema(teaDiagnosisResults).omit({
  id: true,
  createdAt: true,
});

export const insertTeaDiaryEntrySchema = createInsertSchema(teaDiaryEntries).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type TeaDiagnosisResult = typeof teaDiagnosisResults.$inferSelect;
export type InsertTeaDiagnosisResult = z.infer<typeof insertTeaDiagnosisSchema>;
export type TeaDiaryEntry = typeof teaDiaryEntries.$inferSelect;
export type InsertTeaDiaryEntry = z.infer<typeof insertTeaDiaryEntrySchema>;
