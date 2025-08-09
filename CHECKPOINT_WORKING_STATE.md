# MyUniverse Casino - Working State Checkpoint

## Project Overview
This is a React + TypeScript casino website with Supabase backend, deployed on Netlify with serverless functions.

**✅ CURRENT STATUS**: Fully working - account creation, login, and all features functional on Netlify

## Critical Architecture Components

### 1. Database Schema (PostgreSQL via Supabase)
```sql
-- Users table with RLS DISABLED for service role access
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS is DISABLED to allow service role operations
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Service role policy (exists but not enforced due to disabled RLS)
CREATE POLICY "Service role can manage users" ON users FOR ALL USING (true);
```

### 2. Environment Variables (CRITICAL - Set in Netlify)
```bash
# Supabase Configuration
SUPABASE_URL=https://umldvhhqilcjrmrwmknx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtbGR2aGhxaWxjanJtcndta254Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDY3NjkxOSwiZXhwIjoyMDcwMjUyOTE5fQ.4w2vkPJUPqoMhTtI48pdrvX0YqbkAB816WMlv0c_4bA
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtbGR2aGhxaWxjanJtcndta254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NzY5MTksImV4cCI6MjA3MDI1MjkxOX0.WUi7kSS0gFNBHsqSmdXvS9oixj8OgwVpNY8B-w_s-Ew
```

### 3. Netlify Configuration

#### netlify.toml
```toml
[build]
  publish = "dist"
  command = "npm run build:all"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### public/_redirects (CRITICAL FIX)
```
/api/*  /.netlify/functions/api/:splat  200
/*      /index.html   200
```

## Major Issues Fixed

### 1. API Routing Issue (CRITICAL)
**Problem**: Frontend calls to `/api/auth/signup` returned 404 on Netlify
**Root Cause**: Missing redirect rules in `public/_redirects`
**Solution**: Added `/api/*  /.netlify/functions/api/:splat  200` to redirect API calls to Netlify function

### 2. Environment Variables
**Problem**: Supabase client not initialized due to missing environment variables
**Solution**: Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Netlify environment

### 3. Database Permissions
**Problem**: Row Level Security blocking user creation
**Solution**: Disabled RLS on users table (`ALTER TABLE users DISABLE ROW LEVEL SECURITY;`)

### 4. Service Role vs Anon Key
**Problem**: Code was sometimes using anon key instead of service role key
**Solution**: Updated `server/lib/database.ts` to prioritize service role key:
```typescript
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
```

### 5. React 18 createRoot Warning
**Problem**: HMR causing multiple React root creation
**Solution**: Implemented HMR-safe root creation in `client/App.tsx`

### 6. Merge Conflicts
**Problem**: Git merge conflict markers in server files
**Solution**: Cleaned up conflict markers and chose correct code versions

## Key File Structure

### Frontend (React + TypeScript + Vite)
```
client/
├── App.tsx                 # Main app with HMR-safe React root
├── contexts/AuthContext.tsx # Authentication context with API calls
├── pages/
│   ├── Auth.tsx           # Login/signup form
│   ├── Index.tsx          # Homepage (cleaned of inbox features)
│   ├── Deposit.tsx        # Deposit page
│   └── Withdraw.tsx       # Withdraw page
└── components/ui/         # Shadcn UI components
```

### Backend (Netlify Functions + Supabase)
```
netlify/functions/
└── api.ts                 # Main serverless function with Express routing

server/
├── lib/database.ts        # Supabase client setup (prioritizes service role)
└── routes/
    └── auth.ts            # Auth routes (used by local dev)
```

### Critical Files
- `public/_redirects` - Routes API calls to Netlify functions
- `netlify/functions/api.ts` - Main serverless function with both `/auth/*` and `/api/auth/*` routes
- `client/contexts/AuthContext.tsx` - Makes API calls to `/api/auth/signup`

## Dependencies

### Production Dependencies
```json
{
  "@supabase/supabase-js": "^2.39.0",
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "serverless-http": "^3.2.0",
  "zod": "^3.22.4",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.1"
}
```

### Build Configuration
- Vite for frontend bundling
- TypeScript for type safety
- Tailwind CSS for styling
- Shadcn/ui for UI components

## Deployment Process

1. **Code Changes**: Make changes to code
2. **Environment Check**: Ensure Netlify has correct environment variables
3. **Build**: `npm run build:all` builds both client and server
4. **Deploy**: Netlify automatically deploys from main branch
5. **Verify**: Test at `https://myuniverse-casino.netlify.app/`

## Testing Checklist

### Account Creation Flow
1. ✅ Go to `https://myuniverse-casino.netlify.app/auth`
2. ✅ Fill out signup form (username, email, password)
3. ✅ Click "Create Account"
4. ✅ Account should be created successfully
5. ✅ User should be logged in automatically

### Login Flow
1. ✅ Go to signup page and use "Already have an account? Sign in"
2. ✅ Enter valid credentials
3. ✅ Should log in successfully

## Removed Features
- **Inbox/Messaging System**: Completely removed (files deleted, routes cleaned up)
- **Admin Panel**: Removed as part of inbox cleanup

## URLs
- **Development**: `https://b3be2688079e4ddcbdf57fbf872e61a3-f223bdd2ccb44b7eb8d82653e.fly.dev/`
- **Production**: `https://myuniverse-casino.netlify.app/`
- **Repository**: GitHub repo connected for direct commits to main branch

## Future Maintenance Notes

1. **Environment Variables**: Always verify Supabase environment variables are set in Netlify
2. **API Routing**: The `public/_redirects` file is CRITICAL - do not modify without understanding
3. **Database Schema**: RLS is disabled - re-enabling requires careful policy setup
4. **Netlify Functions**: All API endpoints are in `netlify/functions/api.ts` with Express routing
5. **Testing**: Always test on actual Netlify deployment, not just local dev server

## Emergency Restoration
If you encounter issues:
1. Check Netlify environment variables are set
2. Verify `public/_redirects` has the API routing rule
3. Ensure `netlify/functions/api.ts` has both `/auth/*` and `/api/auth/*` routes
4. Test database connection with service role key
5. Check RLS is disabled on users table

**Last Updated**: January 2025
**Working Checkpoint ID**: cgen-7644c
