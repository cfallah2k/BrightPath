# BrightPath Setup Guide

## Complete Setup Instructions

### Step 1: Supabase Project Setup

1. Go to https://supabase.com and create an account
2. Create a new project:
   - Name: `brightpath` (or your preferred name)
   - Database Password: Save this securely
   - Region: Choose closest to Ghana (or your deployment region)
3. Wait 2-3 minutes for the project to be provisioned

### Step 2: Get Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### Step 3: Install Supabase CLI

```bash
npm install -g supabase
```

### Step 4: Link Your Project

```bash
cd backend
supabase login
supabase link --project-ref your-project-ref
```

To find your project ref:
- Go to Supabase Dashboard > Settings > General
- Copy the "Reference ID"

### Step 5: Run Database Migrations

```bash
cd backend
supabase db push
```

This will:
- Create all database tables
- Set up Row Level Security
- Create database functions and triggers
- Set up indexes

### Step 6: Configure Frontend Environment

```bash
cd frontend
cp .env.example .env
```

Edit `.env` and add:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 7: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 8: Start Development

```bash
cd frontend
npm run dev
```

Visit http://localhost:5173

### Step 9: Create First User (Optional - for testing)

1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add User" > "Create new user"
3. Create a user with email and password
4. Then create a field worker record in the database:
   - Go to Table Editor > `field_workers`
   - Insert a new row:
     - `user_id`: Copy the UUID from the user you just created
     - `name`: Your name
     - `phone`: Your phone number
     - `role`: `field_worker` (or `education_officer`, `coordinator`, etc.)
     - `is_active`: `true`

## Troubleshooting

### Migration Errors

If migrations fail:
- Check that you're linked to the correct project: `supabase status`
- Verify your database password is correct
- Check Supabase dashboard for any errors

### Frontend Connection Issues

- Verify `.env` file has correct Supabase URL and key
- Check browser console for errors
- Ensure Supabase project is active (not paused)

### Authentication Issues

- Check Supabase Dashboard > Authentication > Settings
- Verify redirect URLs are configured
- Enable Email/Phone OTP in authentication settings

## Next Steps

After setup:
1. Create your first school record
2. Create field worker accounts
3. Start registering children
4. Test enrollment and attendance tracking

## Production Deployment

### Frontend (Netlify)

1. Connect your Git repository to Netlify
2. Set build command: `cd frontend && npm install && npm run build`
3. Set publish directory: `frontend/dist`
4. Add environment variables in Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

### Backend (Supabase)

- Already hosted on Supabase cloud
- No additional deployment needed
- Just ensure migrations are applied

