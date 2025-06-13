# Modern POS System

A completely revamped Point of Sale (POS) system built with the latest technologies:

- Next.js 14+
- TypeScript
- Tailwind CSS
- Shadcn UI
- Tanstack React Query
- Zustand
- PWA Support

## Features

- Modern and responsive UI design
- Role-based authentication
- Product management
- Sales transaction processing
- Cart management
- Reports and analytics
- User settings

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies
```bash
npm install
# or
yarn
```

2. Create an `.env` file based on `.env.example`
```bash
cp .env.example .env
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
/app                # Next.js 14 App Router
  /(auth)           # Authentication routes
  /(dashboard)      # Protected dashboard routes
  /(marketing)      # Public marketing pages
/components         # Reusable UI components
  /ui               # Shadcn UI components
  /forms            # Form components
  /layouts          # Layout components
/lib                # Utility functions and hooks
  /api              # API client and endpoints
  /hooks            # Custom React hooks
  /store            # Zustand stores
  /types            # TypeScript types
/public             # Static assets
```

## Deployment

This application is designed for easy deployment to various platforms:

- Vercel
- Netlify
- Docker
- Standard Node.js hosting

## PWA Support

The application includes Progressive Web App (PWA) support for installation on mobile devices and offline capabilities.
