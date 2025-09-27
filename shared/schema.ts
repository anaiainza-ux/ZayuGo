import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  preferredLanguage: text("preferred_language").default("es"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const matches = pgTable("matches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  matchDate: timestamp("match_date").notNull(),
  stadium: text("stadium").notNull(),
  stadiumAddress: text("stadium_address").notNull(),
  isActive: boolean("is_active").default(true),
});

export const tickets = pgTable("tickets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  matchId: varchar("match_id").references(() => matches.id).notNull(),
  seatSection: text("seat_section").notNull(),
  seatRow: text("seat_row").notNull(),
  seatNumber: text("seat_number").notNull(),
  qrCode: text("qr_code").notNull(),
  isUsed: boolean("is_used").default(false),
  purchasedAt: timestamp("purchased_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  email: true,
  preferredLanguage: true,
});

export const insertMatchSchema = createInsertSchema(matches).omit({
  id: true,
  isActive: true,
});

export const insertTicketSchema = createInsertSchema(tickets).omit({
  id: true,
  isUsed: true,
  purchasedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type Match = typeof matches.$inferSelect;
export type InsertTicket = z.infer<typeof insertTicketSchema>;
export type Ticket = typeof tickets.$inferSelect;
