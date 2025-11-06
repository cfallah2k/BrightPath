# BrightPath Project Structure

## Overview

```
BrightPath/
├── frontend/                 # React + TypeScript + Vite Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── store/            # Zustand state management
│   │   ├── lib/              # Library configurations
│   │   │   └── supabase.ts   # Supabase client
│   │   ├── types/            # TypeScript type definitions
│   │   │   └── database.types.ts
│   │   ├── utils/            # Utility functions
│   │   ├── App.tsx           # Main App component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html            # HTML template
│   ├── package.json          # Dependencies
│   ├── vite.config.ts        # Vite configuration
│   ├── tsconfig.json         # TypeScript config
│   └── .env.example          # Environment variables template
│
├── backend/                  # Supabase Backend
│   ├── supabase/
│   │   ├── migrations/       # Database migrations
│   │   │   ├── 20240101000000_initial_schema.sql
│   │   │   ├── 20240101000001_row_level_security.sql
│   │   │   └── 20240101000002_functions_and_triggers.sql
│   │   ├── config.toml       # Supabase CLI config
│   │   └── seed.sql          # Seed data
│   ├── README.md
│   └── .gitignore
│
├── netlify.toml              # Netlify deployment config
├── README.md                 # Main documentation
├── SETUP.md                  # Detailed setup guide
├── SOLUTION_DESIGN.md        # Solution design document
└── .gitignore                # Git ignore rules
```

## Database Schema

### Core Tables

1. **children** - Child records with demographics, location, enrollment status
2. **schools** - School registry
3. **field_workers** - User management (linked to Supabase Auth)
4. **enrollments** - Enrollment history tracking
5. **attendance** - Daily attendance records
6. **assessments** - Learning assessments (literacy/numeracy)

### Key Features

- **Row Level Security (RLS)** - Role-based data access
- **Automatic Triggers** - Update enrollment status, check attendance risk
- **Database Functions** - Statistics and analytics
- **Indexes** - Optimized queries for performance

## User Roles

1. **field_worker** - Community data collectors
2. **school_admin** - School administrators
3. **education_officer** - District/regional officers
4. **coordinator** - System coordinators

## Next Development Steps

1. ✅ Project structure created
2. ✅ Database schema defined
3. ✅ Frontend setup complete
4. ⏭️ Build authentication pages
5. ⏭️ Create child registration form
6. ⏭️ Build dashboard with analytics
7. ⏭️ Implement offline functionality
8. ⏭️ Add attendance tracking
9. ⏭️ Create assessment forms
10. ⏭️ Build reporting features

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Chakra UI, React Query, Zustand
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **PWA**: Workbox for offline support
- **Hosting**: Netlify (frontend), Supabase Cloud (backend)
- **Deployment**: Git-based CI/CD

