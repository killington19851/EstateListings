import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const chalets = pgTable("chalets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  sqft: integer("sqft").notNull(),
  images: text("images").array().notNull(),
  amenities: text("amenities").array().notNull(),
  hasFireplace: boolean("has_fireplace").notNull().default(false),
  hasHotTub: boolean("has_hot_tub").notNull().default(false),
  hasSkiAccess: boolean("has_ski_access").notNull().default(false),
  hasMountainView: boolean("has_mountain_view").notNull().default(false),
  maxGuests: integer("max_guests").notNull(),
});

export const insertChaletSchema = createInsertSchema(chalets).omit({
  id: true,
});

export type InsertChalet = z.infer<typeof insertChaletSchema>;
export type Chalet = typeof chalets.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
