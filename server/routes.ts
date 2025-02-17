import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertWordSchema, insertGroupSchema, insertStudyActivitySchema, insertStudySessionSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Words
  app.get("/api/words", async (_req, res) => {
    const words = await storage.getWords();
    res.json(words);
  });

  app.get("/api/words/:id", async (req, res) => {
    const word = await storage.getWord(parseInt(req.params.id));
    if (!word) return res.status(404).json({ message: "Word not found" });
    res.json(word);
  });

  app.post("/api/words", async (req, res) => {
    const result = insertWordSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid word data" });
    }
    const word = await storage.createWord(result.data);
    res.status(201).json(word);
  });

  // Groups
  app.get("/api/groups", async (_req, res) => {
    const groups = await storage.getGroups();
    res.json(groups);
  });

  app.get("/api/groups/:id", async (req, res) => {
    const group = await storage.getGroup(parseInt(req.params.id));
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  });

  app.post("/api/groups", async (req, res) => {
    const result = insertGroupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid group data" });
    }
    const group = await storage.createGroup(result.data);
    res.status(201).json(group);
  });

  // Study Activities
  app.get("/api/study-activities", async (_req, res) => {
    const activities = await storage.getStudyActivities();
    res.json(activities);
  });

  app.get("/api/study-activities/:id", async (req, res) => {
    const activity = await storage.getStudyActivity(parseInt(req.params.id));
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    res.json(activity);
  });

  app.post("/api/study-activities", async (req, res) => {
    const result = insertStudyActivitySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid activity data" });
    }
    const activity = await storage.createStudyActivity(result.data);
    res.status(201).json(activity);
  });

  // Study Sessions
  app.get("/api/study-sessions", async (_req, res) => {
    const sessions = await storage.getStudySessions();
    res.json(sessions);
  });

  app.post("/api/study-sessions", async (req, res) => {
    const result = insertStudySessionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid session data" });
    }
    const session = await storage.createStudySession(result.data);
    res.status(201).json(session);
  });

  const httpServer = createServer(app);
  return httpServer;
}
