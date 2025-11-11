# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nano Banana Clone is a **Next.js 16 modern web application** for AI-powered image editing, positioned as a competitor to Flux Kontext. This is a single-page marketing/landing application built with TypeScript, Tailwind CSS v4, and Shadcn/UI components.

## Development Commands

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Building
npm run build       # Build production application
npm run start       # Start production server

# Code Quality
npm run lint        # Run ESLint for code quality checks

# Installation (use legacy peer deps for dependency conflicts)
npm install --legacy-peer-deps
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with custom gold/neutral color theme
- **UI Components**: Shadcn/UI with Radix UI primitives
- **Package Manager**: pnpm
- **Form Handling**: React Hook Form with Zod validation

### Key Directories
- **`app/`**: Next.js App Router pages and layouts
- **`components/`**: Feature-based React components
- **`components/ui/`**: Complete Shadcn/UI component library (45+ components)
- **`hooks/`**: Custom React hooks (mobile detection, toast notifications)
- **`public/`**: Static assets and placeholder images
- **`styles/`**: Global CSS with custom animations

### Component Architecture
- **Layout Components**: Header, Footer
- **Page Sections**: Hero, Features, Editor, Examples, Testimonials, FAQ
- **Main Page Structure**: Single-page application with all sections in `app/page.tsx`
- **Client Components**: Marked with `"use client"` directive
- **Type Safety**: Full TypeScript interfaces for all props
- **UI Library**: Complete Shadcn/UI component library (45+ components) in `components/ui/`

### Design System
- **Color Palette**: Gold-themed neutral colors with dark mode support
- **Typography**: Geist font family
- **CSS Variables**: Comprehensive design token system for theming
- **Responsive Design**: Mobile-first Tailwind breakpoints

## Key Patterns

### State Management
- React hooks for local component state (`useState`, `useRef`)
- No global state management (simple application architecture)

### Form Handling
- React Hook Form for efficient form management
- Zod schemas for validation
- Ready for backend integration

### Styling Approach
- Utility-first Tailwind CSS with custom theme
- Styled-jsx for component-specific animations
- CSS variables for consistent theming
- **cn() utility**: Combines clsx and tailwind-merge for className optimization

## Configuration Details

### Next.js Configuration (next.config.mjs)
- TypeScript build errors are ignored (`typescript: { ignoreBuildErrors: true }`)
- Image optimization disabled (`images: { unoptimized: true }`)
- Vercel Analytics integrated in root layout

### Tailwind CSS v4 Setup
- Uses `@import "tailwindcss"` with new v4 syntax in `app/globals.css`
- Custom CSS variables for design tokens (gold/neutral color theme)
- `@theme inline` directive for theme configuration
- Dark mode support with custom variant

### Component Patterns
- **Class Variance Authority (CVA)**: For component variants (buttons, etc.)
- **Radix UI Primitives**: For accessible component foundations
- **Lucide React**: Consistent icon system
- **React Hook Form + Zod**: Form handling and validation infrastructure

## Development Notes

- **Package Manager**: pnpm recommended (package-lock.json also present)
- **Installation**: Use `npm install --legacy-peer-deps` for dependency conflicts
- **ESLint**: Configured for code quality
- **Testing**: No testing framework currently configured
- **Git Repository**: Initialized and ready for development