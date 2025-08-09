# MyUniverse Casino - AWS Deployment Guide

## 🚀 AWS Deployment Options

This repository contains the same MyUniverse Casino code optimized for AWS deployment while keeping your Supabase backend intact.

### ✅ **Current Netlify Site (KEEP RUNNING)**
- Production URL: `https://myuniverse-casino.netlify.app/`
- Status: ✅ Working perfectly
- **DO NOT TOUCH** - This stays as your main production site

### 🔄 **New AWS Deployment (Testing)**
This repository is for testing AWS deployment options.

## 📋 **Quick Setup - Choose Your Option:**

### **Option 1: AWS Amplify (Recommended - Easiest)**

```bash
# 1. Install Amplify CLI
npm install -g @aws-amplify/cli

# 2. Configure AWS credentials
amplify configure
# Follow prompts to set up AWS profile

# 3. Initialize Amplify project
amplify init
# Project name: myuniverse-casino-aws
# Environment: prod
# Framework: React
# Source Directory: dist/spa
# Build Command: npm run build:all
# Start Command: npm start

# 4. Add hosting
amplify add hosting
# Choose: Amazon CloudFront and S3

# 5. Set environment variables
amplify env add prod
# Add these environment variables:
# SUPABASE_URL=https://umldvhhqilcjrmrwmknx.supabase.co
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
# SUPABASE_ANON_KEY=your_anon_key

# 6. Deploy
amplify publish
```

### **Option 2: EC2 with Docker**

```bash
# 1. Build and test locally
docker build -t myuniverse-casino .
docker-compose up

# 2. Deploy to EC2
# - Launch EC2 instance (Ubuntu 22.04 LTS)
# - Install Docker and Docker Compose
# - Copy project files
# - Run: docker-compose up -d
# - Configure security groups (ports 80, 443, 3000, 5000)
```

### **Option 3: Lambda + S3 (Serverless)**

```bash
# 1. Install Serverless Framework
npm install -g serverless

# 2. Install Lambda dependencies
cd aws-lambda
npm install express serverless-http @supabase/supabase-js cors zod

# 3. Deploy API
serverless deploy

# 4. Build and upload static files
npm run build:all
aws s3 sync dist/spa/ s3://myuniverse-casino-static-prod/

# 5. Update frontend API calls to use Lambda URLs
```

## 🔧 **Environment Variables (Same as Netlify)**

Your Supabase connection will work exactly the same:

```bash
SUPABASE_URL=https://umldvhhqilcjrmrwmknx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📊 **Comparison: Netlify vs AWS Options**

| Feature | Current Netlify | AWS Amplify | AWS EC2 | AWS Lambda |
|---------|----------------|-------------|---------|------------|
| **Setup Time** | ✅ Already Done | 🟡 ~30 min | 🔴 ~2 hours | 🟡 ~1 hour |
| **Auto Scaling** | ✅ Yes | ✅ Yes | 🔴 Manual | ✅ Yes |
| **Cost** | Free tier | Free tier | ~$10-50/month | Pay per use |
| **Custom Domain** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **SSL Certificate** | ✅ Auto | ✅ Auto | 🟡 Manual setup | ✅ Auto |
| **Maintenance** | ✅ None | ✅ Minimal | 🔴 Server updates | ✅ None |

## 🎯 **Recommendation**

1. **Keep Netlify running** - It's your stable production site
2. **Try AWS Amplify first** - Closest to Netlify experience
3. **Test thoroughly** before switching any production traffic

## 🔄 **Migration Strategy**

1. **Phase 1:** Deploy to AWS Amplify with test domain
2. **Phase 2:** Test all functionality (signup, login, deposits, withdrawals)
3. **Phase 3:** Compare performance and costs
4. **Phase 4:** Decide whether to migrate or keep both

## 📞 **Support**

- AWS Deployment: Use this repository and guide
- Netlify Production: Keep using your current setup
- Database: Same Supabase - works with both!

## 🚨 **Important Notes**

- **Never delete** your current Netlify deployment
- **Test everything** on AWS before considering migration
- **Supabase database** works perfectly with both Netlify and AWS
- **Keep environment variables secure** in both platforms

---

## 🏁 **Quick Start (5 minutes)**

```bash
# Copy this repository
git clone YOUR_NEW_AWS_REPO
cd myuniverse-casino-aws

# Install dependencies
npm install

# Test locally
npm run build:all
npm run dev

# Deploy to AWS Amplify (follow Option 1 above)
amplify init
amplify add hosting
amplify publish
```

Your Supabase database will work seamlessly with AWS! 🎉
