# Zenorizon Deployment Guide

This guide covers deploying Zenorizon to various platforms and environments.

## 🚀 Quick Deploy Options

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kartikver15gr8/Zenorizon)

### Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/zenorizon)

## 📋 Prerequisites

### Required Services
- **Database**: PostgreSQL (Supabase, Railway, PlanetScale, or self-hosted)
- **Redis**: Upstash Redis for rate limiting
- **Email**: Resend account for transactional emails
- **OAuth**: GitHub and Google OAuth applications

### Environment Variables
```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth.js
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers
GITHUB_ID="your-github-oauth-app-id"
GITHUB_SECRET="your-github-oauth-app-secret"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# Redis (Rate Limiting)
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"
UPSTASH_REDIS_REST_URL="your-upstash-url"

# Email (Optional)
RESEND_API_KEY="your-resend-api-key"
```

## 🌐 Vercel Deployment (Recommended)

### Step 1: Prepare Repository
```bash
# Ensure your code is pushed to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Create Vercel Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next` (default)
   - **Install Command**: `pnpm install`

### Step 3: Configure Environment Variables
In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add all required environment variables
3. Set appropriate environments (Production, Preview, Development)

### Step 4: Configure Database
```bash
# Run database migrations
pnpm prisma db push

# Or use Prisma migrate in production
pnpm prisma migrate deploy
```

### Step 5: Deploy
```bash
# Automatic deployment on git push
git push origin main

# Or manual deployment
vercel --prod
```

## 🚂 Railway Deployment

### Step 1: Create Railway Project
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create new project
railway new
```

### Step 2: Set Environment Variables
```bash
# Set environment variables
railway variables set NEXTAUTH_URL=https://your-app.railway.app
railway variables set DATABASE_URL=${{Postgres.DATABASE_URL}}
# ... add other variables
```

### Step 3: Deploy
```bash
# Deploy to Railway
railway up
```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN corepack enable pnpm && pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Build and Run
```bash
# Build the image
docker build -t zenorizon .

# Run the container
docker run -p 3000:3000 zenorizon
```

## 🔧 Production Optimizations

### Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
```

### Database Optimizations
```sql
-- Add indexes for better performance
CREATE INDEX idx_projects_created_by ON "Project"("createdBy");
CREATE INDEX idx_issues_project_id ON "Issue"("projectId");
CREATE INDEX idx_issues_assigned_user ON "Issue"("assignedUserId");
```

## 📊 Monitoring & Analytics

### Health Check Endpoint
```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 503 }
    );
  }
}
```

## 🔒 Security Considerations

### Environment Security
- Use strong, unique secrets for `NEXTAUTH_SECRET`
- Rotate OAuth client secrets regularly
- Use environment-specific OAuth applications
- Enable database SSL in production

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

#### Database Connection Issues
```bash
# Test database connection
npx prisma db pull

# Reset database (development only)
npx prisma migrate reset
```

### Deployment Checklist
- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] OAuth applications configured for production URLs
- [ ] SSL certificates configured
- [ ] Health checks passing
- [ ] Error monitoring set up

This deployment guide should help you successfully deploy Zenorizon to production! 🚀
