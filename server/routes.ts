import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/chalets", async (req, res) => {
    try {
      const filters = {
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
        bedrooms: req.query.bedrooms ? parseInt(req.query.bedrooms as string) : undefined,
        bathrooms: req.query.bathrooms ? parseInt(req.query.bathrooms as string) : undefined,
        location: req.query.location as string | undefined,
        hasFireplace: req.query.hasFireplace === "true" ? true : undefined,
        hasHotTub: req.query.hasHotTub === "true" ? true : undefined,
        hasSkiAccess: req.query.hasSkiAccess === "true" ? true : undefined,
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

  const httpServer = createServer(app);

  return httpServer;
}
