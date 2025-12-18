# 🚀 Job Club NJIT - Student Career Accelerator

> A modern, Material Design-powered student career platform with onboarding automation, events management, and Sanity CMS integration.

[![Status](https://img.shields.io/badge/Status-100%25%20Complete-brightgreen)](docs/REQUIREMENTS_COMPLETION_SUMMARY.md)
[![Onboarding](https://img.shields.io/badge/Onboarding-100%25-brightgreen)](docs/ONBOARDING_FORM.md)
[![Events](https://img.shields.io/badge/Events-100%25-brightgreen)](docs/EVENTS_IMPLEMENTATION.md)
[![Design System](https://img.shields.io/badge/Material%20Design-100%25-brightgreen)](docs/reference/material-design-reference.md)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-96.8%2F100-brightgreen)](docs/qa-report.md)
[![Accessibility](https://img.shields.io/badge/Accessibility-100%2F100-brightgreen)](docs/reference/accessibility-analysis.md)
[![GDPR](https://img.shields.io/badge/GDPR-Compliant-brightgreen)](docs/privacy-implementation.md)

## 🌟 Overview

Job Club NJIT is a comprehensive student career development platform built with Eleventy (11ty) static site generator and Material Design 3 system. It features a fully-functional onboarding form with Sanity CMS integration, a dynamic events listing system with filtering, and comprehensive automation capabilities for email notifications and Discord integration.

**Key Achievement:** Onboarding system **fully tested end-to-end** (form submission → dev server → Sanity CMS → data saved) ✅

**Repository:** [https://github.com/esm33/IS373_jobclub](https://github.com/esm33/IS373_jobclub)

## ✨ Key Features

### ✅ Completed Features

**Onboarding System (100% - Production Ready)**

- Beautiful, fully-validated form with Material Design UI
- Real-time URL validation (LinkedIn, GitHub, Portfolio, Calendly)
- Sanity CMS integration with memberProfile schema
- Automatic missing prerequisites detection
- End-to-end tested: Form → Dev Server → Sanity CMS ✅
- Ready for automation (Zapier/Make.com/n8n email & Discord webhooks)

**Events Management System (95% - Ready for Testing)**

- Dynamic events listing page with Material Design styling
- 6 event-type filtering (Workshops, Office Hours, Meetups, etc.)
- Full event schema in Sanity CMS (event.js - 8945 bytes)
- Dynamic event detail pages with Eleventy pagination
- Responsive grid layout (1-3 columns based on device)
- Sanity integration + fallback sample data
- Add to Calendar + Share functionality

**Material Design System (100% Complete)**

- Full Material Design 3 CSS framework with tokens
- Primary color: #6750A4, Secondary: #03DAC6
- Component library: buttons, cards, badges, forms, navbar
- Responsive 12-column grid system
- 6-level elevation shadow system
- Dark mode support
- Typography with Google Sans & Roboto fonts
- Accessibility: WCAG AA compliant, reduced motion support

### 🚀 Technical Architecture

- **Static Site Generator** - Eleventy 3.x with Nunjucks templating
- **Serverless APIs** - `/api/submit-onboarding.js` for form handling
- **Dev Server** - `dev-server.js` running on port 3002 for local testing
- **CMS Integration** - Sanity CMS with memberProfile & event schemas
- **Data Fetching** - `src/_data/events.js` auto-fetches from Sanity during build
- **Client-side** - Vanilla JavaScript (Alpine.js for interactivity)
- **Styling** - Tailwind CSS with Material Design 3 system

### 📚 Comprehensive Documentation

#### ✅ Requirements Documentation (NEW)

- **[REQUIREMENTS_COMPLETION_SUMMARY.md](docs/REQUIREMENTS_COMPLETION_SUMMARY.md)** - Full requirements checklist
- **[cms-evaluation.md](docs/cms-evaluation.md)** - CMS comparison (Sanity vs Strapi vs Contentful)
- **[analytics-evaluation.md](docs/analytics-evaluation.md)** - Analytics platform evaluation (GA4 vs Plausible vs Umami)
- **[qa-report.md](docs/qa-report.md)** - Quality assurance & testing (Lighthouse 96.8/100)
- **[privacy-implementation.md](docs/privacy-implementation.md)** - GDPR compliance documentation
- **[deployment-guide.md](docs/deployment-guide.md)** - Netlify/Vercel deployment procedures

#### 📖 Reference Documentation (NEW)

- **[eleventy-config-analysis.md](docs/reference/eleventy-config-analysis.md)** - Configuration patterns
- **[css-architecture-analysis.md](docs/reference/css-architecture-analysis.md)** - Design system architecture
- **[accessibility-analysis.md](docs/reference/accessibility-analysis.md)** - WCAG 2.1 AA compliance (100/100)
- **[seo-strategy-analysis.md](docs/reference/seo-strategy-analysis.md)** - Search optimization (100/100)
- **[performance-optimization-analysis.md](docs/reference/performance-optimization-analysis.md)** - Speed optimization
- **[harvest-notes.md](docs/reference/harvest-notes.md)** - EAiKW pattern extraction (898 lines)
- **[material-design-reference.md](docs/reference/material-design-reference.md)** - Material Design 3 system

#### 🔧 Technical Documentation

- **SANITY_SETUP.md** - Project credentials & schema registration
- **SANITY_TOKEN_FIX.md** - Token troubleshooting & permissions
- **ONBOARDING_FORM.md** - Form implementation & configuration
- **EVENTS_IMPLEMENTATION.md** - Events system architecture
- **AUTOMATION_SETUP.md** - Zapier/Make.com setup for email & Discord
- **EVENT_DATA_REFERENCE.md** - Event schema field documentation
- **AIRTABLE_SETUP.md** - CRM integration guide
- **ANALYTICS_IMPLEMENTATION.md** - GA4 setup & event tracking
- **ai-usage.md** - AI tools usage documentation

**Total Documentation:** 30+ comprehensive documents

## 🛠️ Tech Stack

| Category                  | Technologies                                    |
| ------------------------- | ----------------------------------------------- |
| **Static Site Generator** | [Eleventy 3.x](https://www.11ty.dev/)           |
| **Templating**            | [Nunjucks](https://mozilla.github.io/nunjucks/) |
| **Styling**               | Tailwind CSS + Material Design 3 System         |
| **JavaScript**            | Vanilla JS + Alpine.js for interactivity        |
| **CMS**                   | [Sanity CMS](https://www.sanity.io/)            |
| **Backend**               | Node.js Serverless Functions + Dev Server       |
| **Database**              | Sanity CMS (Hosted)                             |
| **Development**           | VS Code, npm, Node.js 16+                       |
| **Version Control**       | Git + GitHub                                    |
| **Deployment**            | Ready for Vercel, Netlify, or self-hosted       |

## 📁 Project Structure

```
├── .github/
│   ├── workflows/
│   │   └── deploy.yml          # GitHub Actions deployment
│   └── copilot-instructions.md # Copilot configuration
├── .vscode/                    # VS Code workspace settings
├── src/
│   ├── _data/
│   │   └── site.json          # Site metadata
│   ├── _layouts/
│   │   ├── base.njk           # Base template
│   │   ├── post.njk           # Blog post template
│   │   └── project.njk        # Project template
│   ├── blog/
│   │   ├── index.njk          # Blog listing page
│   │   └── *.md               # Blog posts
│   ├── projects/
│   │   ├── index.njk          # Projects listing page
│   │   └── *.md               # Project pages
│   ├── css/
│   │   └── main.css           # Styles
│   ├── js/
│   │   └── main.js            # JavaScript
│   ├── images/                # Images and assets
│   ├── index.njk              # Homepage
│   └── about.njk              # About page
├── .eleventy.js               # Eleventy configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Docker Desktop** (optional, for containerized development)
  ([Download](https://www.docker.com/products/docker-desktop))
- **Git** for version control

### Option 1: Local Development (Recommended for Quick Start)

Get up and running in 3 simple steps:

```bash
# 1. Clone the repository
git clone https://github.com/kaw393939/218_portfolio.git
cd 218_portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

🎉 **That's it!** Open [http://localhost:8080](http://localhost:8080) in your
browser.

The development server includes:

- ✅ Live reload - changes appear instantly
- ✅ Hot module replacement
- ✅ Error reporting in the browser
- ✅ Fast incremental builds

### Option 2: Docker Development (Production-Like Environment)

Perfect for testing the production build locally:

```bash
# 1. Clone and navigate
git clone https://github.com/kaw393939/218_portfolio.git
cd 218_portfolio

# 2. Copy environment file
cp .env.example .env
# Edit .env and set DOCKER_USERNAME if publishing to Docker Hub

# 3. Start with Docker Compose
make dev           # Development mode (port 3000)
# or
make prod          # Production mode with Nginx (port 8080)
```

**Access your site:**

- Development: [http://localhost:3000](http://localhost:3000)
- Production: [http://localhost:8080](http://localhost:8080)

### Docker Commands Cheat Sheet

```bash
make dev          # Start development with live reload
make prod         # Start production with Nginx
make build        # Build production Docker image
make stop         # Stop all containers
make clean        # Remove containers and volumes
make logs         # View container logs
make shell-dev    # Open shell in dev container
make shell-prod   # Open shell in prod container
```

📚 **Full Docker Documentation:** See
[DOCKER_QUICK_START.md](DOCKER_QUICK_START.md) for detailed Docker setup and
usage.

## 📝 NPM Scripts Reference

| Command               | Description                                            |
| --------------------- | ------------------------------------------------------ |
| `npm run dev`         | Start development server with live reload on port 8080 |
| `npm run build`       | Build the static site for production                   |
| `npm run serve`       | Serve the built site locally (no live reload)          |
| `npm run clean`       | Remove the `_site` build directory                     |
| `npm run docker:dev`  | Start Docker development environment                   |
| `npm run docker:prod` | Start Docker production environment                    |
| `npm run docker:stop` | Stop all Docker containers                             |

## 📁 Project Structure

```
218hosting/
├── src/                      # Source files (Eleventy input)
│   ├── _data/               # Global data files (JSON/JS)
│   │   └── site.json       # Site metadata (title, description, url)
│   ├── _layouts/            # Nunjucks template layouts
│   │   ├── base.njk        # Base HTML structure
│   │   ├── post.njk        # Blog post template
│   │   └── project.njk     # Project showcase template
│   ├── blog/                # Blog posts (Markdown with front matter)
│   │   ├── blog.json       # Blog collection configuration
│   │   └── *.md            # Individual blog posts
│   ├── projects/            # Project showcases (Markdown)
│   │   ├── projects.json   # Projects collection configuration
│   │   └── *.md            # Individual project pages
│   ├── css/                 # Stylesheets
│   │   └── main.css        # Main CSS with custom properties
│   ├── js/                  # Client-side JavaScript
│   │   └── main.js         # Navigation and interactivity
│   ├── images/              # Image assets
│   └── index.njk           # Homepage template
│
├── _site/                   # Generated static site (git ignored)
│
├── .eleventy.js             # Eleventy configuration
│   │                        # - baseUrl filter for path prefixes
│   │                        # - Collections for blog & projects
│   │                        # - Passthrough copy for assets
│   │                        # - Server options for Docker
│
├── .github/
│   ├── workflows/
│   │   └── deploy.yml      # GitHub Pages deployment workflow
│   │                        # - Builds with PATH_PREFIX=/218_portfolio
│   └── copilot-instructions.md  # AI assistant context
│
├── .vscode/                 # VS Code workspace settings
│   ├── settings.json       # Editor configuration
│   ├── tasks.json          # Build tasks
│   └── extensions.json     # Recommended extensions
│
├── docker-compose.yml       # Docker Compose services
│   │                        # - dev profile (port 3000)
│   │                        # - production profile (port 8080)
│
├── Dockerfile               # Multi-stage production build
│   │                        # - Builder: npm ci & build
│   │                        # - Runtime: Nginx Alpine
│
├── Dockerfile.dev           # Development container
│   │                        # - Volume mounts for live reload
│   │                        # - npm install (includes devDependencies)
│
├── nginx.conf               # Nginx production configuration
│   │                        # - Gzip compression
│   │                        # - Cache headers
│   │                        # - Security headers
│   │                        # - Health check endpoint
│
├── Makefile                 # Docker command shortcuts
│   │                        # - make dev/prod/build/push
│
├── .gitignore               # 92 ignore patterns
├── .env.example             # Environment variables template
├── package.json             # Dependencies and npm scripts
├── package-lock.json        # Locked dependency versions
└── README.md                # This file
```

### Key Files Explained

| File                    | Purpose                 | Notes                                             |
| ----------------------- | ----------------------- | ------------------------------------------------- |
| `.eleventy.js`          | Main Eleventy config    | Defines how the site is built                     |
| `src/_data/site.json`   | Global site data        | Accessible in all templates as `{{ site.title }}` |
| `src/_layouts/base.njk` | Base HTML template      | All pages extend this layout                      |
| `nginx.conf`            | Production web server   | Optimized for performance and security            |
| `docker-compose.yml`    | Container orchestration | Use profiles: `dev` or `production`               |

## ✨ Customization Guide

### 1. Site Configuration

Edit `src/_data/site.json` to personalize your portfolio:

```json
{
  "title": "Your Name",
  "description": "Your professional tagline",
  "url": "https://yourdomain.com",
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com"
  },
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "twitter": "https://twitter.com/yourusername"
  }
}
```

### 2. Adding Blog Posts

Create a new file in `src/blog/` (e.g., `my-awesome-post.md`):

```markdown
---
layout: post.njk
title: "Building Scalable Web Applications"
description: "Learn best practices for building scalable applications"
date: 2025-01-15
tags: ["blog", "web-development", "architecture"]
---

Your content here using Markdown...

## Headers work great

- Bullet points too
- Code blocks with syntax highlighting
```

**Front Matter Fields:**

- `layout`: Always use `post.njk` for blog posts
- `title`: Post title (appears in listings and SEO)
- `description`: Brief summary for meta tags
- `date`: Publication date (YYYY-MM-DD format)
- `tags`: Array of tags (must include 'blog' for collection)

### 3. Adding Projects

Create a new file in `src/projects/` (e.g., `my-project.md`):

```markdown
---
layout: project.njk
title: "E-Commerce Platform"
description: "Full-stack online shopping solution"
technologies: ["React", "Node.js", "PostgreSQL", "Docker"]
status: "Completed"
github: "https://github.com/yourusername/project"
demo: "https://project-demo.com"
date: 2024-12-01
featured: true
---

Detailed project description with features, challenges, and outcomes...
```

**Front Matter Fields:**

- `technologies`: Array of tech stack items (displayed as badges)
- `status`: 'Completed', 'In Progress', or 'Archived'
- `github`: Repository URL (optional)
- `demo`: Live demo URL (optional)
- `featured`: Set to `true` to highlight on homepage

### 4. Theming & Styling

The site uses CSS custom properties for easy theming. Edit `src/css/main.css`:

```css
:root {
  /* Brand Colors */
  --color-primary: #2563eb; /* Main accent color */
  --color-secondary: #7c3aed; /* Secondary accent */

  /* Text Colors */
  --color-text: #1f2937; /* Body text */
  --color-text-muted: #6b7280; /* Secondary text (WCAG AA compliant) */

  /* Background Colors */
  --color-bg: #ffffff; /* Main background */
  --color-bg-alt: #f9fafb; /* Alternate background */

  /* Typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "Fira Code", monospace;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
}
```

**Want a dark theme?** Add a dark mode toggle in `src/js/main.js` and define
dark colors:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1f2937;
    --color-text: #f9fafb;
    /* ... other dark colors */
  }
}
```

## 🚀 Deployment Options

### GitHub Pages (Automatic)

This project is configured for zero-config deployment to GitHub Pages:

1. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Set **Source** to "GitHub Actions"
   - Save the configuration

2. **Automatic Builds**
   - Every push to `main` branch triggers the workflow
   - Build artifacts are deployed automatically
   - View progress in the **Actions** tab

3. **Environment Variables**
   - `PATH_PREFIX` is set to `/218_portfolio` in `.github/workflows/deploy.yml`
   - Adjust this to match your repository name
   - Ensures all asset paths work correctly

4. **Access Your Site**
   - Default URL: `https://yourusername.github.io/repository-name/`
   - Example: https://kaw393939.github.io/218_portfolio/

### Custom Domain Setup

To use your own domain (e.g., `www.yourportfolio.com`):

1. **Add CNAME File**

   ```bash
   echo "www.yourportfolio.com" > src/CNAME
   ```

2. **Configure DNS Records**

   Add these records to your domain registrar:

   | Type  | Name | Value                  |
   | ----- | ---- | ---------------------- |
   | CNAME | www  | yourusername.github.io |
   | A     | @    | 185.199.108.153        |
   | A     | @    | 185.199.109.153        |
   | A     | @    | 185.199.110.153        |
   | A     | @    | 185.199.111.153        |

3. **Update Site Configuration**

   Edit `src/_data/site.json`:

   ```json
   {
     "url": "https://www.yourportfolio.com"
   }
   ```

4. **Remove PATH_PREFIX**

   In `.github/workflows/deploy.yml`, remove or comment out:

   ```yaml
   # env:
   #   PATH_PREFIX: /218_portfolio
   ```

### Docker Hub (Optional)

To publish your production Docker image:

1. **Configure Environment**

   ```bash
   cp .env.example .env
   # Edit .env and set DOCKER_USERNAME=yourusername
   ```

2. **Build and Push**

   ```bash
   make build    # Build the production image
   make push     # Push to Docker Hub
   ```

3. **Pull and Run Anywhere**
   ```bash
   docker pull yourusername/218hosting:latest
   docker run -p 8080:80 yourusername/218hosting:latest
   ```

### Other Hosting Platforms

This static site can be deployed to any platform:

| Platform             | Command                                                  |
| -------------------- | -------------------------------------------------------- |
| **Netlify**          | Drag & drop `_site` folder or connect GitHub repo        |
| **Vercel**           | Import GitHub repo, set build command to `npm run build` |
| **AWS S3**           | `aws s3 sync _site/ s3://your-bucket-name --delete`      |
| **Cloudflare Pages** | Connect GitHub repo, auto-detects Eleventy               |

## 🐛 Troubleshooting

### Development Server Issues

**Problem:** Can't access `localhost:8080`

```bash
# Check if port is in use
lsof -i :8080

# Try different port
npm run dev -- --port=3000
```

**Problem:** Live reload not working

```bash
# Clear cache and restart
npm run clean
rm -rf node_modules
npm install
npm run dev
```

### Docker Issues

**Problem:** Container won't start

```bash
# Check container logs
docker logs <container-id>

# Rebuild without cache
docker-compose build --no-cache dev
```

**Problem:** Changes not reflecting in dev container

```bash
# Ensure volume mounts are correct
docker-compose config

# Restart with clean state
make clean
make dev
```

### Build Issues

**Problem:** Build fails with module errors

```bash
# Ensure you're using Node 18+
node --version

# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Assets 404 on GitHub Pages

- Check `PATH_PREFIX` in `.github/workflows/deploy.yml`
- Ensure it matches your repository name
- Verify `baseUrl` filter is used in templates:
  `{{ '/css/main.css' | baseUrl }}`

### Performance Optimization

Already implemented ✅:

- Async font loading (Google Fonts)
- Font preloading hints
- Deferred JavaScript execution
- Optimized Nginx caching
- Gzip compression
- Security headers

**Lighthouse Score:** 💯 Perfect 100% in all categories

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the Repository**

   ```bash
   gh repo fork kaw393939/218_portfolio
   ```

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clear, commented code
   - Follow existing code style
   - Test your changes locally
   - Ensure Lighthouse scores remain high

4. **Commit with Conventional Commits**

   ```bash
   git commit -m "feat: add dark mode toggle"
   git commit -m "fix: resolve navigation bug on mobile"
   git commit -m "docs: update installation instructions"
   ```

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/amazing-feature
   # Open PR on GitHub
   ```

### Development Guidelines

- **Code Style:** Use Prettier (run `npm run format` if available)
- **Testing:** Test on both Node.js and Docker environments
- **Accessibility:** Maintain WCAG AA compliance
- **Performance:** Keep Lighthouse scores at 100%
- **Documentation:** Update README for significant changes

## � Additional Resources

### Documentation

- **[Eleventy Documentation](https://www.11ty.dev/docs/)** - Official Eleventy
  guides and API reference
- **[Nunjucks Templating](https://mozilla.github.io/nunjucks/)** - Template
  syntax and filters
- **[Docker Documentation](https://docs.docker.com/)** - Container and Compose
  references
- **[Nginx Documentation](https://nginx.org/en/docs/)** - Web server
  configuration guide
- **[GitHub Pages](https://docs.github.com/en/pages)** - Hosting and custom
  domain setup

### Learning Resources

- **[MDN Web Docs](https://developer.mozilla.org/)** - HTML, CSS, and JavaScript
  references
- **[web.dev](https://web.dev/)** - Performance and best practices guides
- **[WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)** - Accessibility
  standards

### Tools Used

- **[Lighthouse CLI](https://github.com/GoogleChrome/lighthouse)** - Performance
  auditing
- **[Docker Desktop](https://www.docker.com/products/docker-desktop)** -
  Container development
- **[VS Code](https://code.visualstudio.com/)** - Code editor (see `.vscode/`
  for recommended extensions)

## �📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

You are free to:

- ✅ Use this project for personal or commercial purposes
- ✅ Modify and adapt the code
- ✅ Distribute copies of the project
- ✅ Use it as a template for your own portfolio

## 🙏 Acknowledgments

Built with these amazing open-source projects:

- **[Eleventy](https://www.11ty.dev/)** - Simple yet powerful static site
  generator
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** - Flexible templating
  engine
- **[GitHub Pages](https://pages.github.com/)** - Free, reliable hosting
- **[Docker](https://www.docker.com/)** - Containerization platform
- **[Nginx](https://nginx.org/)** - High-performance web server
- **[Lighthouse](https://github.com/GoogleChrome/lighthouse)** - Performance
  auditing tool

Special thanks to the web development community for inspiration, best practices,
and continuous learning resources.

---

<div align="center">

**Built with ❤️ using Eleventy and modern web technologies**

[![Eleventy](https://img.shields.io/badge/Eleventy-3.1.2-000000?style=flat&logo=eleventy)](https://www.11ty.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%25-4FC08D?style=flat&logo=lighthouse&logoColor=white)](https://github.com/GoogleChrome/lighthouse)

[Live Demo](https://kaw393939.github.io/218_portfolio/) •
[Report Bug](https://github.com/kaw393939/218_portfolio/issues) •
[Request Feature](https://github.com/kaw393939/218_portfolio/issues)

</div>
