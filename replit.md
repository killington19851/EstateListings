# Chalet Stay - Luxury Mountain Chalet Rental Platform

## Overview

Chalet Stay is a luxury mountain chalet rental platform built with a modern full-stack architecture. The application enables users to browse, filter, and view detailed information about premium mountain chalets available for rent. The platform focuses on showcasing high-end vacation properties with an elegant, image-first user interface inspired by hospitality-focused platforms like Airbnb.

The application follows a monorepo structure with a React-based frontend, Express backend, and shared TypeScript schemas using Drizzle ORM for type-safe database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React 18** with TypeScript for the UI layer
- **Wouter** for lightweight client-side routing
- **TanStack Query** (React Query) for server state management and data fetching
- **Vite** as the build tool and development server
- **Tailwind CSS** with custom design system for styling

**Design System:**
- Uses **shadcn/ui** component library with Radix UI primitives
- Custom theme based on the "new-york" style with neutral base colors
- Typography system using Google Fonts: Manrope (headings) and Inter (body text)
- Consistent spacing primitives using Tailwind's spacing scale
- Design guidelines emphasize image-first presentation, generous whitespace, and warm aesthetics

**Component Structure:**
- Organized with separate pages (`home`, `chalet-detail`, `not-found`)
- Reusable UI components in `components/ui/` directory
- Layout components (`header`, `footer`) for consistent navigation
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)

**State Management:**
- React Query handles all server state with configured query client
- Local state managed with React hooks (useState, useEffect)
- No global state management library - relies on React Query cache

### Backend Architecture

**Technology Stack:**
- **Express.js** with TypeScript for the REST API server
- **Node.js** runtime with ES modules
- Development and production server configurations separated

**API Design:**
- RESTful endpoints under `/api` namespace
- GET `/api/chalets` - List chalets with optional filtering
- GET `/api/chalets/:id` - Get single chalet details
- Query parameter-based filtering (price, bedrooms, bathrooms, amenities)

**Data Layer:**
- **In-memory storage** currently implemented via `MemStorage` class
- Interface-based storage abstraction (`IStorage`) allows swapping implementations
- Sample data initialized on server startup
- Designed to support database integration (Drizzle ORM configured for PostgreSQL)

**Server Configuration:**
- Separate entry points for development (`index-dev.ts`) and production (`index-prod.ts`)
- Development mode uses Vite middleware for HMR and SSR
- Production mode serves static build files
- Request logging with duration tracking for API endpoints

### Data Model

**Chalet Schema:**
- Core properties: title, location, description, price
- Physical attributes: bedrooms, bathrooms, square footage, max guests
- Media: image array for property photos
- Amenities: array of available features
- Boolean flags: fireplace, hot tub, ski access, mountain view

**User Schema:**
- Basic authentication fields: username, password
- UUID-based primary keys
- Currently not integrated into the application flow

### Build and Deployment

**Build Process:**
- Frontend: Vite builds React application to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Single `npm run build` command handles both
- TypeScript type checking via `npm run check`

**Development Workflow:**
- Hot module replacement for frontend changes
- TSX-based server restart for backend changes
- Vite dev server proxies API requests to Express
- Template reloading with cache-busting for HTML

**Environment Configuration:**
- `NODE_ENV` determines development vs production mode
- Database URL expected in `DATABASE_URL` environment variable
- Replit-specific plugins enabled for development environment

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless** - PostgreSQL driver for Neon database (serverless-ready)
- **drizzle-orm** - Type-safe ORM for database operations
- **drizzle-zod** - Zod schema generation from Drizzle schemas
- **express** - Web server framework

### UI Component Libraries
- **@radix-ui/react-*** - Comprehensive set of accessible, unstyled UI primitives (accordion, dialog, dropdown, select, etc.)
- **shadcn/ui** configuration for pre-styled component variants
- **lucide-react** - Icon library for UI elements
- **embla-carousel-react** - Carousel/slider functionality
- **cmdk** - Command palette component

### Styling and Design
- **tailwindcss** - Utility-first CSS framework
- **class-variance-authority** - Type-safe variant management for components
- **clsx** & **tailwind-merge** - Conditional class name utilities
- **Google Fonts** (Manrope, Inter) - Typography via CDN

### Form and Validation
- **react-hook-form** - Form state management
- **@hookform/resolvers** - Validation resolver integration
- **zod** - Schema validation library

### Data Fetching and State
- **@tanstack/react-query** - Server state management and caching
- **wouter** - Lightweight routing library (alternative to React Router)

### Development Tools
- **Vite** - Frontend build tool and dev server
- **esbuild** - Fast JavaScript bundler for server code
- **tsx** - TypeScript execution for Node.js
- **drizzle-kit** - Database migration and schema management CLI
- **@replit/vite-plugin-*** - Replit-specific development plugins

### Database (Configured but Not Active)
- PostgreSQL via Neon serverless driver
- Drizzle ORM configured with migrations directory
- Schema defined but currently using in-memory storage
- Session management library (`connect-pg-simple`) included for future authentication

### Date and Time
- **date-fns** - Date manipulation and formatting utilities