import express from "express";
import { registerRoutes } from "../server/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

registerRoutes(app).then(() => {
  console.log("Routes registered successfully");
}).catch((error) => {
  console.error("Failed to register routes:", error);
});

export default app;
