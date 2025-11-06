# BrightPath - Out of School Children Tracking Solution

A community-driven platform to track enrollment, retention, and learning outcomes for out-of-school children in Liberia.

## Project Structure

```
BrightPath/
├── frontend/          # React frontend application
├── backend/           # Supabase backend configuration and migrations
└── docs/              # Documentation
```

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Hosting**: Netlify
- **PWA**: Offline-first Progressive Web App

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier available at https://supabase.com)
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd BrightPath
   ```

2. **Set up Supabase Backend**
   - Create a new project at https://supabase.com
   - Go to Project Settings > API
   - Copy your Project URL and anon/public key
   
3. **Configure Frontend**
   ```bash
   cd frontend
   cp .env.example .env
   ```
   - Edit `.env` and add your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_project_url
     VITE_SUPABASE_ANON_KEY=your_anon_key
     ```

4. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

5. **Run Database Migrations**
   ```bash
   # Install Supabase CLI globally
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Link your project (get project ref from Supabase dashboard)
   cd backend
   supabase link --project-ref your-project-ref
   
   # Push migrations to your Supabase project
   supabase db push
   ```

6. **Start Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The app will be available at http://localhost:5173

### Backend Setup (Detailed)

1. **Create Supabase Project**
   - Visit https://supabase.com
   - Create a new project
   - Wait for database to be provisioned

2. **Run Migrations**
   - The migrations in `backend/supabase/migrations/` will create:
     - All database tables (children, enrollments, attendance, etc.)
     - Row Level Security policies
     - Database functions and triggers
     - Indexes for performance

3. **Configure Authentication**
   - In Supabase Dashboard > Authentication > Settings
   - Enable Email/Phone OTP authentication
   - Configure redirect URLs for your app

## Development

- Frontend runs on: http://localhost:5173
- Supabase Studio: Access via Supabase dashboard

## Deployment

- Frontend: Deploy to Netlify (connected to Git)
- Backend: Supabase cloud (automatic)

## License

MIT

