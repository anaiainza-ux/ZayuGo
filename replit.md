# Zayu Go App

## Overview

Zayu Go is a modern mobile-first sports event application designed for World Cup attendees. The app provides essential services including digital ticket management, stadium navigation, real-time translation, and match information. Built with React and TypeScript, it features a clean, sports-app-inspired design with vibrant brand colors (gold, green, lime) and rounded UI elements that reflect the sporting event atmosphere.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Components**: Radix UI primitives with custom styling via shadcn/ui component library
- **Styling**: Tailwind CSS with custom brand color palette and design tokens

### Component Structure
- **Pages**: Home dashboard, Tickets management, Route planning, Translator, Help, Profile
- **Shared Components**: Header with logo and profile access, MatchCard for displaying game info, ActionButton for quick navigation
- **Design System**: Consistent spacing (Tailwind units), Poppins font family, rounded corners (4xl borders), hover animations and transforms

### Backend Architecture
- **Runtime**: Node.js with Express server
- **API Design**: RESTful endpoints following `/api/{resource}` pattern
- **Data Layer**: Repository pattern with IStorage interface for data abstraction
- **Development Storage**: In-memory storage with mock data for development
- **Error Handling**: Centralized error middleware with structured JSON responses

### Data Models
- **Users**: Profile management with language preferences and authentication
- **Matches**: Game information including teams, venues, dates, and status
- **Tickets**: Digital ticket management with QR codes, seat assignments, and usage tracking

### Design System
- **Color Palette**: Gold (#EFAA04), Green (#016d3b), Lime (#5fc501), Off-white (#f1f2eb), Red (#de1a1a)
- **Typography**: Poppins font with semantic weight hierarchy (400/600/700)
- **Interactions**: Hover elevations, scale transforms, and rounded button designs
- **Layout**: Mobile-first responsive design with card-based content organization

## External Dependencies

### Core Runtime Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection for production
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **drizzle-zod**: Schema validation integration

### UI and Component Libraries
- **@radix-ui/react-***: Headless UI primitives for accessibility and behavior
- **@tanstack/react-query**: Server state management and data fetching
- **wouter**: Lightweight React routing library
- **date-fns**: Date manipulation and formatting utilities

### Development and Build Tools
- **vite**: Fast development server and build tool
- **typescript**: Static type checking
- **tailwindcss**: Utility-first CSS framework
- **esbuild**: Fast JavaScript bundler for server code

### Session and Form Management
- **connect-pg-simple**: PostgreSQL session store for Express
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Form validation resolvers

### Design and Styling
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx**: Conditional CSS class composition
- **tailwind-merge**: Tailwind class merging utility
- **lucide-react**: Icon library for consistent iconography

### Potential Integrations
- **Translation API**: For real-time language translation functionality
- **Maps/Navigation API**: For stadium route planning and directions
- **QR Code Libraries**: For ticket validation and scanning
- **Push Notifications**: For match updates and important announcements