# Deployment Guide - Vital Ice

## Overview

This guide covers the deployment process for the Vital Ice website, including environment setup, build processes, and production deployment.

## 🚀 Deployment Platforms

### **Primary: Vercel (Recommended)**

The project is configured for automatic deployment on Vercel.

#### **Setup Process**

1. **Connect Repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy from project root
   vercel
   ```

2. **Environment Variables**

   ```bash
   # Set production environment variables
   vercel env add MINDBODY_API_KEY
   vercel env add MINDBODY_SITE_ID
   ```

3. **Automatic Deployment**
   - Push to `main` branch triggers automatic deployment
   - Preview deployments for pull requests
   - Automatic rollback on failed deployments

#### **Vercel Configuration**

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### **Alternative: Netlify**

```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables
# Set in Netlify dashboard
```

### **Alternative: AWS Amplify**

```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## 🔧 Build Process

### **Local Build Testing**

```bash
# Clean previous builds
npm run clean

# Install dependencies
npm install

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Test production build locally
npm run start
```

### **Build Optimization**

```bash
# Analyze bundle size
npm run analyze

# Export static files (if needed)
npm run export
```

## 🌍 Environment Configuration

### **Required Environment Variables**

```bash
# Mindbody Integration
MINDBODY_API_KEY=your-mindbody-api-key
MINDBODY_SITE_ID=your-site-id

# Analytics (Optional)
PLAUSIBLE_DOMAIN=your-domain.com
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# CDN Configuration
CDN_BASE_URL=https://your-cdn-domain.com
```

### **Environment-Specific Configs**

#### **Development**

```bash
# .env.local
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

#### **Staging**

```bash
# .env.staging
NODE_ENV=staging
NEXT_PUBLIC_API_URL=https://staging.vitalice.com/api
```

#### **Production**

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://vitalice.com/api
```

## 📊 Performance Monitoring

### **Lighthouse Scores**

Target performance metrics:

- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: > 90

### **Core Web Vitals**

Monitor these metrics:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### **Monitoring Tools**

1. **Vercel Analytics**

   ```bash
   # Enable in Vercel dashboard
   # Automatic Core Web Vitals tracking
   ```

2. **Google PageSpeed Insights**

   ```bash
   # Regular testing
   https://pagespeed.web.dev/
   ```

3. **WebPageTest**
   ```bash
   # Detailed performance analysis
   https://www.webpagetest.org/
   ```

## 🔒 Security Considerations

### **Security Headers**

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];
```

### **Environment Variable Security**

- Never commit `.env` files to version control
- Use platform-specific secret management
- Rotate API keys regularly
- Use least-privilege access for services

## 🚨 Rollback Procedures

### **Vercel Rollback**

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback <deployment-id>

# Or rollback to specific commit
vercel rollback <commit-hash>
```

### **Emergency Rollback**

1. **Identify the issue**
2. **Revert to last known good commit**
   ```bash
   git revert <bad-commit>
   git push origin main
   ```
3. **Monitor deployment**
4. **Verify fix**

## 📈 Post-Deployment Checklist

### **Immediate Checks**

- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Forms submit correctly
- [ ] Images and videos load
- [ ] Mobile responsiveness
- [ ] Performance metrics acceptable

### **Functional Testing**

- [ ] Contact form works
- [ ] Mindbody integration functional
- [ ] Analytics tracking active
- [ ] SEO meta tags present

### **Performance Verification**

- [ ] Lighthouse score > 90
- [ ] Core Web Vitals pass
- [ ] Bundle size acceptable
- [ ] Loading times < 3s

## 🔄 Continuous Deployment

### **GitHub Actions Workflow**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### **Deployment Triggers**

- **Automatic**: Push to `main` branch
- **Preview**: Pull requests
- **Manual**: Vercel dashboard or CLI

## 📞 Support & Troubleshooting

### **Common Deployment Issues**

1. **Build Failures**

   - Check TypeScript errors
   - Verify all dependencies installed
   - Review build logs

2. **Environment Variables**

   - Ensure all required vars set
   - Check variable naming
   - Verify platform-specific syntax

3. **Performance Issues**
   - Run Lighthouse audit
   - Check bundle analyzer
   - Review image optimization

### **Getting Help**

- **Vercel Support**: https://vercel.com/support
- **Next.js Documentation**: https://nextjs.org/docs
- **Project Issues**: Check GitHub issues
- **Team Contact**: Internal team communication

## 📋 Deployment Checklist

### **Pre-Deployment**

- [ ] All tests pass
- [ ] Code review completed
- [ ] Environment variables configured
- [ ] Performance benchmarks met
- [ ] Security scan passed

### **Deployment**

- [ ] Build successful
- [ ] Deployment completed
- [ ] DNS propagated
- [ ] SSL certificate active

### **Post-Deployment**

- [ ] Site functional
- [ ] Performance acceptable
- [ ] Monitoring active
- [ ] Team notified
- [ ] Documentation updated
