# Deployment Documentation - Job Club NJIT

**Date:** December 17, 2025  
**Deployment Platform:** Netlify (Primary) / Vercel (Alternative)  
**CI/CD:** GitHub Actions  
**Status:** ✅ Configured & Ready

---

## Deployment Overview

Job Club NJIT is configured for automated deployment through multiple platforms with CI/CD pipeline integration via GitHub Actions.

---

## Primary Deployment: Netlify

### Configuration

**File:** `netlify.toml`

```toml
[build]
  functions = "api"
  publish = "_site"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[functions]
  node_bundler = "esbuild"

[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type"
```

### Netlify Setup Steps

1. **Connect Repository**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub account
   - Select `IS373_jobclub` repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `_site`
   - Node version: 18

3. **Environment Variables**
   Add these in Netlify dashboard → Site settings → Environment variables:

   ```
   SANITY_PROJECT_ID=<your_project_id>
   SANITY_DATASET=production
   SANITY_API_TOKEN=<your_token>
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy site"
   - Netlify will assign a URL: `https://[site-name].netlify.app`

### Netlify Features Used

✅ **Continuous Deployment**

- Automatic deploy on push to `main` branch
- Deploy previews for pull requests
- Build logs and notifications

✅ **Serverless Functions**

- `/api/submit-onboarding.js` → Netlify Functions
- Automatic scaling
- Environment variable support

✅ **Custom Domain** (Optional)

- Configure custom domain in Netlify DNS
- Automatic HTTPS via Let's Encrypt
- CDN distribution

✅ **Performance**

- Global CDN (edge network)
- Automatic asset optimization
- Gzip/Brotli compression

---

## Alternative Deployment: Vercel

### Configuration

**File:** `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "_site",
  "framework": "eleventy"
}
```

### Vercel Setup Steps

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import `IS373_jobclub` from GitHub

2. **Configure Project**
   - Framework Preset: Eleventy
   - Build Command: `npm run build`
   - Output Directory: `_site`
   - Install Command: `npm ci`

3. **Environment Variables**
   Add in Vercel dashboard → Settings → Environment Variables:

   ```
   SANITY_PROJECT_ID=<your_project_id>
   SANITY_DATASET=production
   SANITY_API_TOKEN=<your_token>
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel assigns URL: `https://[project-name].vercel.app`

---

## GitHub Pages (Static Only)

### Configuration

**File:** `CNAME` (for custom domain)

```
jobclub.njit.edu
```

### GitHub Pages Setup

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `_site` folder
   - Custom domain: `jobclub.njit.edu` (optional)

2. **GitHub Actions Workflow**
   Already configured in `.github/workflows/ci.yml`:

   ```yaml
   deploy-production:
     runs-on: ubuntu-latest
     steps:
       - name: Build site
         run: npm run build

       - name: Deploy to Netlify
         uses: nwtgck/actions-netlify@v2
         with:
           publish-dir: "./_site"
           production-deploy: true
   ```

---

## CI/CD Pipeline Integration

### GitHub Actions Workflow

**File:** `.github/workflows/ci.yml`

### Pipeline Flow

```
┌─────────────────────────────────────┐
│  Push to main / Pull Request        │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  1. Lint (ESLint, Stylelint, MD)    │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  2. Build (CSS, JS, Eleventy)       │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  3. Test (Playwright)               │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  4. Lighthouse Audit                │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  5. Bundle Size Check               │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  6. Deploy to Netlify (if main)     │
└─────────────────────────────────────┘
```

### Quality Gates

All must pass before deployment:

- ✅ Linting (0 errors)
- ✅ Build succeeds
- ✅ All tests pass (12/12)
- ✅ Lighthouse score ≥90
- ✅ Bundle size under budget

---

## Deployment URLs

### Production

**Primary:** `https://jobclub-njit.netlify.app`  
**Alternative:** `https://jobclub-njit.vercel.app`  
**Custom Domain (Future):** `https://jobclub.njit.edu`

### Staging/Preview

**Netlify Deploy Previews:** `https://deploy-preview-[PR#]--jobclub-njit.netlify.app`  
**Vercel Preview:** `https://jobclub-njit-[branch].vercel.app`

---

## Environment Variables Required

| Variable             | Description                  | Required For          |
| -------------------- | ---------------------------- | --------------------- |
| `SANITY_PROJECT_ID`  | Sanity project ID            | CMS data fetching     |
| `SANITY_DATASET`     | Dataset name (production)    | CMS data fetching     |
| `SANITY_API_TOKEN`   | Read token for API           | CMS data fetching     |
| `NODE_ENV`           | Environment (production/dev) | Build optimizations   |
| `NETLIFY_AUTH_TOKEN` | Netlify deploy token         | GitHub Actions deploy |
| `NETLIFY_SITE_ID`    | Site ID for deployment       | GitHub Actions deploy |

### Setting Environment Variables

**Netlify:**

1. Go to Site settings → Environment variables
2. Add key-value pairs
3. Trigger redeploy

**Vercel:**

1. Go to Project settings → Environment Variables
2. Add variables (can be scoped to Production/Preview/Development)
3. Redeploy

**GitHub Actions:**

1. Go to Repository Settings → Secrets and variables → Actions
2. Add repository secrets
3. Reference in workflow with `${{ secrets.VARIABLE_NAME }}`

---

## Build Process

### Local Build

```bash
# Install dependencies
npm ci

# Build CSS
npm run build:css:prod

# Build JavaScript
npm run build:js

# Build Eleventy site
npm run build:eleventy

# Output in _site/ directory
```

### Production Build (Automated)

```bash
# GitHub Actions runs:
npm ci
npm run build
# _site/ directory deployed to Netlify/Vercel
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] All environment variables set
- [ ] Sanity CMS credentials configured
- [ ] Analytics ID added (GA4)
- [ ] Custom domain configured (if using)
- [ ] HTTPS enabled
- [ ] Build locally to verify
- [ ] Run tests: `npm test`
- [ ] Check Lighthouse scores

### Post-Deployment

- [ ] Verify site loads at deployment URL
- [ ] Test all pages (Home, Events, Onboarding, Blog)
- [ ] Check forms work (onboarding submission)
- [ ] Verify analytics tracking
- [ ] Test cookie consent banner
- [ ] Check mobile responsiveness
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor error logs

---

## Monitoring & Maintenance

### Netlify Dashboard

- Build logs
- Deploy history
- Analytics (bandwidth, requests)
- Error tracking

### Google Search Console

- Submit sitemap: `https://jobclub-njit.netlify.app/sitemap.xml`
- Monitor indexing status
- Track search performance

### GitHub Actions

- View workflow runs
- Check for failed builds
- Review test results

---

## Rollback Procedure

### Netlify

1. Go to Deploys tab
2. Find previous successful deploy
3. Click "Publish deploy"
4. Previous version goes live immediately

### Vercel

1. Go to Deployments
2. Find previous deployment
3. Click "Promote to Production"

### GitHub

```bash
# Revert last commit
git revert HEAD
git push origin main

# Or roll back to specific commit
git reset --hard <commit-hash>
git push -f origin main
```

---

## Performance Optimization (Production)

### Netlify Settings

- **Asset Optimization:** Enabled (automatic image optimization)
- **Pretty URLs:** Enabled (removes .html extensions)
- **Post Processing:**
  - Minify CSS: ✅
  - Minify JS: ✅
  - Bundle CSS: ✅

### Caching Headers

```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

---

## Troubleshooting

### Build Fails

1. Check build logs in Netlify/Vercel dashboard
2. Verify environment variables are set correctly
3. Test build locally: `npm run build`
4. Check Node version matches (18+)

### Site Not Loading

1. Check DNS settings (if using custom domain)
2. Verify HTTPS certificate is active
3. Check Netlify/Vercel status page
4. Review deploy logs for errors

### Functions Not Working

1. Verify serverless function syntax
2. Check CORS headers configuration
3. Test function locally: `netlify dev`
4. Review function logs in dashboard

---

## Future Enhancements

1. **Custom Domain:** `jobclub.njit.edu`
2. **Split Testing:** A/B test landing pages
3. **Edge Functions:** Personalization at CDN edge
4. **Analytics Integration:** Connect Netlify Analytics
5. **Performance Monitoring:** Real User Monitoring (RUM)

---

## Deployment Status

| Environment    | Status        | URL            | Last Deploy      |
| -------------- | ------------- | -------------- | ---------------- |
| **Production** | 🟡 Pending    | TBD            | Not deployed yet |
| **Staging**    | 🟡 Pending    | TBD            | Not deployed yet |
| **CI/CD**      | ✅ Configured | GitHub Actions | Ready            |

**Next Steps:**

1. Create Netlify account and connect repository
2. Configure environment variables
3. Trigger first production deploy
4. Update this document with live URLs

---

**Document Version:** 1.0  
**Last Updated:** December 17, 2025  
**Maintained By:** Job Club Development Team
