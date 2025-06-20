import { 
  users, 
  teaDiagnosisResults, 
  teaDiaryEntries,
  type User, 
  type InsertUser,
  type TeaDiagnosisResult,
  type InsertTeaDiagnosisResult,
  type TeaDiaryEntry,
  type InsertTeaDiaryEntry
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tea diagnosis methods
  createTeaDiagnosisResult(result: InsertTeaDiagnosisResult): Promise<TeaDiagnosisResult>;
  getTeaDiagnosisResultsBySession(sessionId: string): Promise<TeaDiagnosisResult[]>;
  
  // Tea diary methods
  createTeaDiaryEntry(entry: InsertTeaDiaryEntry): Promise<TeaDiaryEntry>;
  getTeaDiaryEntriesBySession(sessionId: string): Promise<TeaDiaryEntry[]>;
  updateTeaDiaryEntry(id: number, entry: Partial<InsertTeaDiaryEntry>): Promise<TeaDiaryEntry | undefined>;
  deleteTeaDiaryEntry(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private teaDiagnosisResults: Map<number, TeaDiagnosisResult>;
  private teaDiaryEntries: Map<number, TeaDiaryEntry>;
  private currentUserId: number;
  private currentDiagnosisId: number;
  private currentDiaryId: number;

  constructor() {
    this.users = new Map();
    this.teaDiagnosisResults = new Map();
    this.teaDiaryEntries = new Map();
    this.currentUserId = 1;
    this.currentDiagnosisId = 1;
    this.currentDiaryId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createTeaDiagnosisResult(result: InsertTeaDiagnosisResult): Promise<TeaDiagnosisResult> {
    const id = this.currentDiagnosisId++;
    const diagnosisResult: TeaDiagnosisResult = { 
      ...result, 
      id,
      createdAt: new Date()
    };
    this.teaDiagnosisResults.set(id, diagnosisResult);
    return diagnosisResult;
  }

  async getTeaDiagnosisResultsBySession(sessionId: string): Promise<TeaDiagnosisResult[]> {
    return Array.from(this.teaDiagnosisResults.values()).filter(
      (result) => result.sessionId === sessionId
    );
  }

  async createTeaDiaryEntry(entry: InsertTeaDiaryEntry): Promise<TeaDiaryEntry> {
    const id = this.currentDiaryId++;
    const diaryEntry: TeaDiaryEntry = {
      ...entry,
      id,
      createdAt: new Date()
    };
    this.teaDiaryEntries.set(id, diaryEntry);
    return diaryEntry;
  }

  async getTeaDiaryEntriesBySession(sessionId: string): Promise<TeaDiaryEntry[]> {
    return Array.from(this.teaDiaryEntries.values()).filter(
      (entry) => entry.sessionId === sessionId
    ).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async updateTeaDiaryEntry(id: number, updateData: Partial<InsertTeaDiaryEntry>): Promise<TeaDiaryEntry | undefined> {
    const existing = this.teaDiaryEntries.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updateData };
    this.teaDiaryEntries.set(id, updated);
    return updated;
  }

  async deleteTeaDiaryEntry(id: number): Promise<boolean> {
    return this.teaDiaryEntries.delete(id);
  }
}

export const storage = new MemStorage();
