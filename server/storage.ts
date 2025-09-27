import { type User, type InsertUser, type Match, type InsertMatch, type Ticket, type InsertTicket } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Match methods
  getMatches(): Promise<Match[]>;
  getMatch(id: string): Promise<Match | undefined>;
  createMatch(match: InsertMatch): Promise<Match>;
  
  // Ticket methods
  getUserTickets(userId: string): Promise<Ticket[]>;
  getTicket(id: string): Promise<Ticket | undefined>;
  createTicket(ticket: InsertTicket): Promise<Ticket>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private matches: Map<string, Match>;
  private tickets: Map<string, Ticket>;

  constructor() {
    this.users = new Map();
    this.matches = new Map();
    this.tickets = new Map();
    
    // Initialize with some mock data
    this.initializeMockData();
  }

  private async initializeMockData() {
    // Create sample match
    const matchId = randomUUID();
    const sampleMatch: Match = {
      id: matchId,
      homeTeam: "México",
      awayTeam: "Alemania",
      matchDate: new Date("2026-06-15T19:00:00Z"),
      stadium: "Estadio BBVA",
      stadiumAddress: "Av. José Eleuterio González 2601, Del Paseo Residencial, 64920 Monterrey, N.L.",
      isActive: true
    };
    this.matches.set(matchId, sampleMatch);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
      preferredLanguage: insertUser.preferredLanguage || "es"
    };
    this.users.set(id, user);
    return user;
  }

  // Match methods
  async getMatches(): Promise<Match[]> {
    return Array.from(this.matches.values()).filter(match => match.isActive);
  }

  async getMatch(id: string): Promise<Match | undefined> {
    return this.matches.get(id);
  }

  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const id = randomUUID();
    const match: Match = {
      ...insertMatch,
      id,
      isActive: true
    };
    this.matches.set(id, match);
    return match;
  }

  // Ticket methods
  async getUserTickets(userId: string): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).filter(ticket => ticket.userId === userId);
  }

  async getTicket(id: string): Promise<Ticket | undefined> {
    return this.tickets.get(id);
  }

  async createTicket(insertTicket: InsertTicket): Promise<Ticket> {
    const id = randomUUID();
    const ticket: Ticket = {
      ...insertTicket,
      id,
      isUsed: false,
      purchasedAt: new Date()
    };
    this.tickets.set(id, ticket);
    return ticket;
  }
}

export const storage = new MemStorage();
