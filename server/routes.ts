import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { insertChaletSchema } from "../shared/schema";
import { storage } from "./storage";

export function registerRoutes(app: Express) {
  app.get("/api/chalets", async (req, res) => {
    try {
      const filters = {
        minPrice: req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined,
        minGuests: req.query.minGuests ? parseInt(req.query.minGuests as string) : undefined,
        location: req.query.location as string,
        hasWifi: req.query.hasWifi === "true" ? true : undefined,
        hasMountainView: req.query.hasMountainView === "true" ? true : undefined,
      };

      const chalets = await storage.getChalets(filters);
      res.json(chalets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chalets" });
    }
  });

  app.get("/api/chalets/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const chalet = await storage.getChalet(id);

      if (!chalet) {
        return res.status(404).json({ error: "Chalet not found" });
      }

      res.json(chalet);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chalet" });
    }
  });

  app.post("/api/chalets", async (req, res) => {
    try {
      const parsed = insertChaletSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid chalet data" });
      }
      const chalet = await storage.createChalet(parsed.data);
      res.status(201).json(chalet);
    } catch (error) {
      res.status(500).json({ error: "Failed to create chalet" });
    }
  });

  // Return the app instead of creating a server
  return app;
}
