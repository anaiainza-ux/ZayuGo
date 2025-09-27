import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMatchSchema, insertTicketSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Match routes
  app.get("/api/matches", async (req, res) => {
    try {
      const matches = await storage.getMatches();
      res.json({ success: true, data: matches });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch matches" });
    }
  });

  app.get("/api/matches/:id", async (req, res) => {
    try {
      const match = await storage.getMatch(req.params.id);
      if (!match) {
        return res.status(404).json({ success: false, error: "Match not found" });
      }
      res.json({ success: true, data: match });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch match" });
    }
  });

  app.post("/api/matches", async (req, res) => {
    try {
      const validatedData = insertMatchSchema.parse(req.body);
      const match = await storage.createMatch(validatedData);
      res.status(201).json({ success: true, data: match });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: "Invalid match data", details: error.errors });
      }
      res.status(500).json({ success: false, error: "Failed to create match" });
    }
  });

  // Ticket routes
  app.get("/api/users/:userId/tickets", async (req, res) => {
    try {
      const tickets = await storage.getUserTickets(req.params.userId);
      res.json({ success: true, data: tickets });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch tickets" });
    }
  });

  app.get("/api/tickets/:id", async (req, res) => {
    try {
      const ticket = await storage.getTicket(req.params.id);
      if (!ticket) {
        return res.status(404).json({ success: false, error: "Ticket not found" });
      }
      res.json({ success: true, data: ticket });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch ticket" });
    }
  });

  app.post("/api/tickets", async (req, res) => {
    try {
      const validatedData = insertTicketSchema.parse(req.body);
      const ticket = await storage.createTicket(validatedData);
      res.status(201).json({ success: true, data: ticket });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: "Invalid ticket data", details: error.errors });
      }
      res.status(500).json({ success: false, error: "Failed to create ticket" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }
      // Don't return password
      const { password, ...userWithoutPassword } = user;
      res.json({ success: true, data: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      // Don't return password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({ success: true, data: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: "Invalid user data", details: error.errors });
      }
      res.status(500).json({ success: false, error: "Failed to create user" });
    }
  });

  // ServiceNow routes endpoint
  app.get("/api/routes", async (req, res) => {
    try {
      const instanceURL = process.env.SN_INSTANCE_URL;
      const user = process.env.SN_USER;
      const password = process.env.SN_PASSWORD;

      console.log("Raw environment variables:", {
        instanceURL: JSON.stringify(instanceURL),
        user: JSON.stringify(user),
        hasPassword: !!password
      });

      if (!instanceURL || !user || !password) {
        console.error("Missing ServiceNow credentials:", {
          instanceURL: !!instanceURL,
          user: !!user, 
          password: !!password
        });
        return res.status(500).json({ 
          success: false, 
          error: "ServiceNow credentials not configured" 
        });
      }

      // Clean the instance URL to remove any protocol prefix and trim whitespace
      const cleanInstanceURL = instanceURL.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
      const endpoint = `https://${cleanInstanceURL}/api/now/table/x_snc_zayugo_4000x_data?sysparm_limit=10`;
      
      console.log("Cleaned instanceURL:", JSON.stringify(cleanInstanceURL));
      console.log("Final endpoint:", JSON.stringify(endpoint));

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(`${user}:${password}`).toString('base64'),
        }
      });

      console.log("ServiceNow API response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("ServiceNow API error response:", errorText);
        throw new Error(`ServiceNow API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("ServiceNow API success, records found:", data.result?.length || 0);
      res.json({ success: true, data: data.result || [] });
    } catch (error) {
      console.error("ServiceNow API error details:", {
        message: error instanceof Error ? error.message : String(error),
        cause: error instanceof Error && 'cause' in error ? error.cause : 'no cause',
        stack: error instanceof Error ? error.stack : 'no stack'
      });
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch routes from ServiceNow",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // ServiceNow integration endpoint (for future use)
  app.post("/api/servicenow/sync", async (req, res) => {
    try {
      // todo: implement ServiceNow API integration
      console.log("ServiceNow sync requested:", req.body);
      res.json({ success: true, message: "ServiceNow integration placeholder" });
    } catch (error) {
      res.status(500).json({ success: false, error: "ServiceNow sync failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
