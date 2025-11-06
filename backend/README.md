# BrightPath Backend

This folder contains Supabase backend configuration, database migrations, and related backend code.

## Structure

```
backend/
├── supabase/
│   ├── migrations/          # Database migration files
│   ├── config.toml          # Supabase configuration
│   └── seed.sql            # Seed data (optional)
├── .env.example            # Environment variables template
└── README.md              # This file
```

## Setup

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Run migrations:
   ```bash
   supabase db push
   ```

## Database Schema

The database includes the following main tables:

- `children` - Child records and demographics
- `enrollments` - Enrollment history
- `attendance` - Daily attendance records
- `assessments` - Learning assessments
- `schools` - School registry
- `field_workers` - User management and roles

See `migrations/` folder for detailed schema definitions.

