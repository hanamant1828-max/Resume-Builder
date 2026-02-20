# Interactive Resume

## Overview
An interactive resume/portfolio web application built with a full-stack JavaScript architecture. The app displays a professional resume with print and PDF download capabilities.

## Recent Changes
- 2026-02-20: Initial import and environment setup completed. Database provisioned, schema synced, workflow configured.

## User Preferences
- No specific preferences recorded yet.

## Project Architecture

### Tech Stack
- **Frontend**: React 18, Vite, TailwindCSS, shadcn/ui components
- **Backend**: Express 5 (TypeScript), Node.js 20
- **Database**: PostgreSQL (Neon-backed via Replit), Drizzle ORM
- **Routing**: wouter (frontend), Express (backend API)
- **State Management**: TanStack React Query v5

### Directory Structure
```
client/src/          - React frontend source
  pages/             - Page components (resume.tsx, not-found.tsx)
  components/        - UI components
  hooks/             - Custom React hooks
  lib/               - Utility libraries
server/              - Express backend
  index.ts           - Server entry point
  routes.ts          - API route definitions
  storage.ts         - Data storage interface
  db.ts              - Database connection (Drizzle + pg)
  vite.ts            - Vite dev server integration
shared/              - Shared types and schemas
  schema.ts          - Drizzle schema + Zod validation
  routes.ts          - Shared route definitions
```

### Key Commands
- `npm run dev` - Start development server (port 5000)
- `npm run build` - Build for production
- `npm run db:push` - Push schema changes to database
