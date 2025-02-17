import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const words = pgTable("words", {
  id: serial("id").primaryKey(),
  thai: text("thai").notNull(),
  phonetic: text("phonetic").notNull(),
  english: text("english").notNull(),
  difficulty: integer("difficulty").notNull().default(1),
});

export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

export const wordGroups = pgTable("word_groups", {
  wordId: integer("word_id").notNull().references(() => words.id),
  groupId: integer("group_id").notNull().references(() => groups.id),
});

export const studyActivities = pgTable("study_activities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(), // flashcards, quiz, etc.
});

export const studySessions = pgTable("study_sessions", {
  id: serial("id").primaryKey(),
  activityId: integer("activity_id").notNull().references(() => studyActivities.id),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  score: integer("score"),
});

export const insertWordSchema = createInsertSchema(words).omit({ id: true });
export const insertGroupSchema = createInsertSchema(groups).omit({ id: true });
export const insertStudyActivitySchema = createInsertSchema(studyActivities).omit({ id: true });
export const insertStudySessionSchema = createInsertSchema(studySessions).omit({ id: true });

export type Word = typeof words.$inferSelect;
export type InsertWord = z.infer<typeof insertWordSchema>;
export type Group = typeof groups.$inferSelect;
export type InsertGroup = z.infer<typeof insertGroupSchema>;
export type StudyActivity = typeof studyActivities.$inferSelect;
export type InsertStudyActivity = z.infer<typeof insertStudyActivitySchema>;
export type StudySession = typeof studySessions.$inferSelect;
export type InsertStudySession = z.infer<typeof insertStudySessionSchema>;
