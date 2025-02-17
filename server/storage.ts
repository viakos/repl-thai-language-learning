import {
  type Word,
  type InsertWord,
  type Group,
  type InsertGroup,
  type StudyActivity,
  type InsertStudyActivity,
  type StudySession,
  type InsertStudySession,
} from "@shared/schema";

export interface IStorage {
  // Words
  getWords(): Promise<Word[]>;
  getWord(id: number): Promise<Word | undefined>;
  createWord(word: InsertWord): Promise<Word>;
  
  // Groups
  getGroups(): Promise<Group[]>;
  getGroup(id: number): Promise<Group | undefined>;
  createGroup(group: InsertGroup): Promise<Group>;
  
  // Study Activities
  getStudyActivities(): Promise<StudyActivity[]>;
  getStudyActivity(id: number): Promise<StudyActivity | undefined>;
  createStudyActivity(activity: InsertStudyActivity): Promise<StudyActivity>;
  
  // Study Sessions
  getStudySessions(): Promise<StudySession[]>;
  createStudySession(session: InsertStudySession): Promise<StudySession>;
}

export class MemStorage implements IStorage {
  private words: Map<number, Word>;
  private groups: Map<number, Group>;
  private studyActivities: Map<number, StudyActivity>;
  private studySessions: Map<number, StudySession>;
  private currentId: { [key: string]: number };

  constructor() {
    this.words = new Map();
    this.groups = new Map();
    this.studyActivities = new Map();
    this.studySessions = new Map();
    this.currentId = {
      words: 1,
      groups: 1,
      studyActivities: 1,
      studySessions: 1,
    };
  }

  async getWords(): Promise<Word[]> {
    return Array.from(this.words.values());
  }

  async getWord(id: number): Promise<Word | undefined> {
    return this.words.get(id);
  }

  async createWord(insertWord: InsertWord): Promise<Word> {
    const id = this.currentId.words++;
    const word: Word = { ...insertWord, id };
    this.words.set(id, word);
    return word;
  }

  async getGroups(): Promise<Group[]> {
    return Array.from(this.groups.values());
  }

  async getGroup(id: number): Promise<Group | undefined> {
    return this.groups.get(id);
  }

  async createGroup(insertGroup: InsertGroup): Promise<Group> {
    const id = this.currentId.groups++;
    const group: Group = { ...insertGroup, id };
    this.groups.set(id, group);
    return group;
  }

  async getStudyActivities(): Promise<StudyActivity[]> {
    return Array.from(this.studyActivities.values());
  }

  async getStudyActivity(id: number): Promise<StudyActivity | undefined> {
    return this.studyActivities.get(id);
  }

  async createStudyActivity(insertActivity: InsertStudyActivity): Promise<StudyActivity> {
    const id = this.currentId.studyActivities++;
    const activity: StudyActivity = { ...insertActivity, id };
    this.studyActivities.set(id, activity);
    return activity;
  }

  async getStudySessions(): Promise<StudySession[]> {
    return Array.from(this.studySessions.values());
  }

  async createStudySession(insertSession: InsertStudySession): Promise<StudySession> {
    const id = this.currentId.studySessions++;
    const session: StudySession = { ...insertSession, id };
    this.studySessions.set(id, session);
    return session;
  }
}

export const storage = new MemStorage();
