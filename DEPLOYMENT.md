# Deploying Bloom AI Demo to Vercel

This guide will help you deploy your Next.js app to Vercel with proper environment variable configuration.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a public GitHub repository
3. **Database**: You'll need a PostgreSQL database (SQLite doesn't work on Vercel)

## Step 1: Set up PostgreSQL Database

Since Vercel doesn't support SQLite, you'll need PostgreSQL. Choose one of these options:

### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel dashboard
2. Click "Storage" → "Create Database" → "Postgres"
3. Follow the setup process
4. Copy the `DATABASE_URL` connection string

### Option B: External PostgreSQL Providers
- **Supabase**: Free tier available at [supabase.com](https://supabase.com)
- **PlanetScale**: MySQL-compatible at [planetscale.com](https://planetscale.com)
- **Railway**: PostgreSQL hosting at [railway.app](https://railway.app)
- **Neon**: Serverless PostgreSQL at [neon.tech](https://neon.tech)

## Step 2: Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your OAuth 2.0 Client ID
3. Add your Vercel domain to "Authorized redirect URIs":
   ```
   https://your-app-name.vercel.app/api/auth/callback/google
   ```
   Replace `your-app-name` with your actual Vercel app name

## Step 3: Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended for first deployment)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Next.js project

### Method 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Step 4: Configure Environment Variables

In your Vercel project dashboard, go to Settings → Environment Variables and add:

### Required Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_ENV` | `production` | Production environment |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Your Vercel app URL |
| `NEXTAUTH_SECRET` | `your-secret-here` | Generate with `openssl rand -base64 32` |
| `AUTH_SECRET` | `your-secret-here` | Same as NEXTAUTH_SECRET |
| `GOOGLE_CLIENT_ID` | `your-google-client-id` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | `your-google-client-secret` | From Google Cloud Console |
| `DATABASE_URL` | `postgresql://...` | Your PostgreSQL connection string |

### Environment Variable Security Tips

1. **Never commit `.env.local`** to version control (it's already in `.gitignore`)
2. **Generate a new NEXTAUTH_SECRET** for production:
   ```bash
   openssl rand -base64 32
   ```
3. **Use different Google OAuth credentials** for production than development
4. **Set environment variables** for different environments (Production, Preview, Development)

## Step 5: Database Migration

After deploying, your database needs to be set up:

1. The build process will automatically run `prisma migrate deploy`
2. If you need to seed data, you can run:
   ```bash
   vercel env pull .env.local
   npx prisma db seed
   ```

## Step 6: Update Prisma Schema for Production

The Prisma schema has been updated to:
- Use environment variables for database URL
- Support both SQLite (development) and PostgreSQL (production)

## Step 7: Verify Deployment

1. Visit your Vercel app URL
2. Test Google OAuth login
3. Check that products display correctly
4. Test cart functionality

## Common Issues & Solutions

### Build Errors
- **Prisma generate fails**: Ensure `DATABASE_URL` is set correctly
- **Missing environment variables**: Double-check all required vars are set in Vercel

### OAuth Issues
- **Redirect URI mismatch**: Ensure Google OAuth settings include your Vercel domain
- **Invalid client**: Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

### Database Issues
- **Connection timeout**: Verify `DATABASE_URL` format and credentials
- **Migration fails**: Ensure database exists and user has proper permissions

## File Changes Made

1. **`.env.example`**: Template for environment variables
2. **`vercel.json`**: Vercel configuration for proper build process
3. **`prisma/schema.prisma`**: Updated to use environment variable for database URL
4. **`.env.local`**: Updated to include `DATABASE_URL`

## Environment Variable Reference

Use the `.env.example` file as a template for setting up your production environment variables in Vercel.

## Next Steps

1. Set up your PostgreSQL database
2. Configure environment variables in Vercel
3. Update Google OAuth settings
4. Deploy and test!

Your app will be available at `https://your-app-name.vercel.app`