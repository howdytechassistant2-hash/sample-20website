# MyUniverse Casino

A modern casino platform with user authentication, payment processing, and messaging system.

## Features

- ✅ User authentication and account management
- ✅ Deposit and withdrawal functionality
- ✅ Admin messaging system with inbox
- ✅ Multiple casino platform integrations
- ✅ Responsive design with modern UI

## Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS
- **Backend**: Express.js, Supabase PostgreSQL
- **Deployment**: Netlify (Functions + Static)
- **Authentication**: Custom JWT-based system

## Environment Variables

Required environment variables for Netlify deployment:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Dependencies Fixed

- ✅ Added missing `dotenv` dependency
- ✅ Added missing `cors` dependency
- ✅ Added TypeScript types for cors
- ✅ Optimized Netlify function bundle size

## Ready for Deployment

This version includes all necessary dependency fixes for successful Netlify deployment.
