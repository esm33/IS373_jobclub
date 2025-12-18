# Eleventy Configuration Analysis - Job Club NJIT

**Date:** December 17, 2025  
**Source:** Analysis of EAiKW Eleventy setup  
**Purpose:** Document Eleventy configuration patterns and implementation details

---

## Overview

This document analyzes the Eleventy (11ty) static site generator configuration for Job Club NJIT, extracting patterns and best practices from the EAiKW reference site.

---

## Core Configuration

### File Structure

```
eleventy.config.js          # Main configuration file
src/
├── _data/                  # Global data files
│   ├── site.json          # Site metadata
│   ├── events.js          # Dynamic events from Sanity
│   └── navigation.json     # Navigation structure
├── _includes/
│   ├── layouts/           # Page layouts
│   │   ├── base.njk       # Base template
│   │   ├── post.njk       # Blog post layout
│   │   └── event.njk      # Event detail layout
│   └── components/        # Reusable components
├── _layouts/              # Alias for _includes/layouts
└── [content files]        # .md and .njk files
```

---

## Configuration File Analysis

### 1. Directory Configuration

```javascript
export default function (eleventyConfig) {
  // Set custom layouts directory
  eleventyConfig.setLayoutsDirectory("_includes/layouts");

  // Return directory configuration
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
  };
}
```

**Key Decisions:**

- **Input:** `src/` - All source files in one directory
- **Output:** `_site/` - Clean build output (gitignored)
- **Layouts:** Nested in `_includes/layouts/` for better organization
- **Data:** Global data in `_data/` directory

---

### 2. Passthrough Copy (Static Assets)

```javascript
// Copy files without processing
eleventyConfig.addPassthroughCopy("src/css");
eleventyConfig.addPassthroughCopy("src/js");
eleventyConfig.addPassthroughCopy("src/images");
eleventyConfig.addPassthroughCopy("src/favicon.svg");
eleventyConfig.addPassthroughCopy("src/CNAME");
```

**Purpose:**

- CSS/JS files are built externally (Tailwind, esbuild)
- Images copied directly (optimization happens via `@11ty/eleventy-img` when needed)
- Static files (favicon, CNAME) copied as-is

**Performance Note:**

- Avoids unnecessary processing
- Faster builds by bypassing Eleventy's template engine for static assets

---

### 3. Markdown Configuration

```javascript
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

// Configure markdown-it
const md = markdownIt({
  html: true, // Allow HTML in markdown
  breaks: true, // Convert \n to <br>
  linkify: true, // Auto-link URLs
}).use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.headerLink(),
  level: [1, 2, 3, 4], // Add anchors to h1-h4
});

eleventyConfig.setLibrary("md", md);
```

**Features:**

- **HTML Support:** Embed HTML components in markdown
- **Auto-linking:** URLs become clickable links automatically
- **Anchor Links:** Headings get ID attributes for deep linking
- **Table of Contents:** Can be generated from heading anchors

**Use Cases:**

- Blog posts with rich formatting
- Documentation with anchor navigation
- Embedding custom components in markdown

---

### 4. Template Filters

#### Date Filters

```javascript
// Human-readable date: "December 17, 2025"
eleventyConfig.addFilter("readableDate", (dateObj) => {
  return new Date(dateObj).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// HTML date attribute: "2025-12-17"
eleventyConfig.addFilter("htmlDateString", (dateObj) => {
  return new Date(dateObj).toISOString().split("T")[0];
});

// RFC 3339 for RSS: "2025-12-17T10:30:00.000Z"
eleventyConfig.addFilter("dateToRfc3339", (dateObj) => {
  return new Date(dateObj).toISOString();
});

// Time only: "2:30 PM"
eleventyConfig.addFilter("time", (dateObj) => {
  return new Date(dateObj).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
});
```

**Usage in Templates:**

```njk
<!-- Blog post date -->
<time datetime="{{ post.date | htmlDateString }}">
  {{ post.date | readableDate }}
</time>

<!-- Event time -->
<p>{{ event.date | time }} EST</p>

<!-- RSS feed -->
<pubDate>{{ post.date | dateToRfc3339 }}</pubDate>
```

#### Array Filters

```javascript
// Get first n items
eleventyConfig.addFilter("head", (array, n) => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }
  if (n < 0) {
    return array.slice(n); // Last n items
  }
  return array.slice(0, n);
});

// Get minimum value
eleventyConfig.addFilter("min", (...numbers) => {
  return Math.min.apply(null, numbers);
});
```

**Usage:**

```njk
<!-- Show latest 3 blog posts -->
{% for post in collections.blog | head(3) %}
  <article>{{ post.data.title }}</article>
{% endfor %}

<!-- Pagination: show min of 10 or remaining -->
{% set itemsToShow = min(10, remainingItems) %}
```

#### Tag Filters

```javascript
// Get all unique tags from collection
eleventyConfig.addFilter("getAllTags", (collection) => {
  let tagSet = new Set();
  collection.forEach((item) => {
    (item.data.tags || []).forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet);
});

// Remove system tags
eleventyConfig.addFilter("filterTagList", (tags) => {
  return (tags || []).filter(
    (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1,
  );
});
```

**Usage:**

```njk
<!-- Tag cloud -->
{% set allTags = collections.blog | getAllTags | filterTagList %}
{% for tag in allTags %}
  <a href="/tags/{{ tag }}/">{{ tag }}</a>
{% endfor %}
```

#### String Filters

```javascript
// Truncate text with ellipsis
eleventyConfig.addFilter("truncate", (str, length = 150) => {
  if (!str || str.length <= length) return str;
  return str.substring(0, length).trim() + "...";
});
```

**Usage:**

```njk
<!-- Excerpt for blog listing -->
<p>{{ post.templateContent | truncate(200) }}</p>
```

---

### 5. Collections

```javascript
// Blog posts sorted by date (newest first)
eleventyConfig.addCollection("blog", function (collectionApi) {
  return collectionApi
    .getFilteredByGlob("src/blog/**/*.md")
    .sort((a, b) => b.date - a.date);
});

// Projects sorted by order field
eleventyConfig.addCollection("projects", function (collectionApi) {
  return collectionApi
    .getFilteredByGlob("src/projects/**/*.md")
    .sort((a, b) => (b.data.order || 0) - (a.data.order || 0));
});

// Events (future only)
eleventyConfig.addCollection("upcomingEvents", function (collectionApi) {
  const now = new Date();
  return collectionApi
    .getAll()
    .filter((item) => item.data.tags && item.data.tags.includes("event"))
    .filter((item) => new Date(item.data.date) >= now)
    .sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
});
```

**Best Practices:**

- Use glob patterns for clear file organization
- Sort collections at build time (more efficient)
- Filter by tags or custom criteria
- Create multiple views of same data (all events vs upcoming events)

---

### 6. Plugins

```javascript
import eleventyPluginRss from "@11ty/eleventy-plugin-rss";

eleventyConfig.addPlugin(eleventyPluginRss);
```

**RSS Plugin Features:**

- Adds `absoluteUrl` filter
- Adds `dateToRfc3339` filter (if not custom defined)
- Provides `getNewestCollectionItemDate` filter
- Simplifies RSS feed generation

**Other Common Plugins:**

- `@11ty/eleventy-img` - Image optimization
- `@11ty/eleventy-plugin-syntaxhighlight` - Code highlighting
- `@11ty/eleventy-navigation` - Navigation building

---

## Data Files

### Global Data (`_data/`)

#### site.json

```json
{
  "title": "Job Club NJIT",
  "description": "AI Career Accelerator for NJIT Students",
  "url": "https://jobclub-njit.netlify.app",
  "author": "Job Club Team",
  "email": "contact@jobclub-njit.edu",
  "googleAnalytics": "G-XXXXXXXXXX",
  "sanity": {
    "projectId": "abc123",
    "dataset": "production"
  },
  "social": {
    "github": "https://github.com/jobclub-njit",
    "linkedin": "https://linkedin.com/company/jobclub-njit"
  }
}
```

**Access in Templates:**

```njk
<title>{{ title }} - {{ site.title }}</title>
<meta name="description" content="{{ site.description }}">
```

#### events.js (Dynamic Data)

```javascript
const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

module.exports = async function () {
  const query = `*[_type == "event" && datetime(date) > datetime(now())] 
    | order(date asc) {
      title,
      slug,
      date,
      type,
      location,
      description,
      registrationUrl
    }`;

  try {
    const events = await client.fetch(query);
    return events;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return [];
  }
};
```

**Features:**

- Fetches data at build time
- Can use environment variables
- Falls back gracefully on error
- Returns JavaScript objects/arrays

**Access in Templates:**

```njk
{% for event in events %}
  <article>{{ event.title }}</article>
{% endfor %}
```

---

## Template Formats

### Supported Formats

- `.njk` - Nunjucks (primary template language)
- `.md` - Markdown (for content)
- `.html` - HTML (for components)
- `.11ty.js` - JavaScript templates (advanced)

### Nunjucks Templates

**Inheritance:**

```njk
{# Layout: _layouts/base.njk #}
<!DOCTYPE html>
<html>
<head>
  <title>{{ title }}</title>
</head>
<body>
  {% block content %}{% endblock %}
</body>
</html>

{# Page: index.njk #}
---
layout: layouts/base.njk
title: Home
---
{% block content %}
  <h1>Welcome</h1>
{% endblock %}
```

**Includes:**

```njk
{# Include component #}
{% include "components/header.njk" %}

{# Include with variables #}
{% include "components/card.njk", {
  title: "Card Title",
  description: "Card description"
} %}
```

**Loops & Conditionals:**

```njk
{# Loop with index #}
{% for item in items %}
  <div class="item-{{ loop.index }}">{{ item.title }}</div>
{% endfor %}

{# Conditional #}
{% if user.isAdmin %}
  <button>Admin Panel</button>
{% endif %}
```

---

## Performance Optimizations

### 1. Incremental Builds

```javascript
// Watch specific directories only
eleventyConfig.setWatchThrottleWaitTime(100);
eleventyConfig.addWatchTarget("src/css/");
eleventyConfig.addWatchTarget("src/js/");
```

### 2. Ignore Unnecessary Files

```javascript
eleventyConfig.ignores.add("src/_drafts/**");
eleventyConfig.ignores.add("README.md");
```

### 3. Cache Busting

```njk
{# In layout #}
<link rel="stylesheet" href="/css/main.css?v={{ site.buildTime }}">
```

---

## Build Process Integration

### npm Scripts

```json
{
  "scripts": {
    "build:css": "tailwindcss -i ./src/css/tailwind.css -o ./_site/css/main.css --minify",
    "build:js": "node build-alpine.js",
    "build:eleventy": "eleventy",
    "build": "npm-run-all --parallel build:css build:js && npm run build:eleventy",
    "dev": "npm run build:eleventy && npm-run-all --parallel watch:css watch:js dev:eleventy",
    "dev:eleventy": "eleventy --serve --watch --port=8080"
  }
}
```

**Build Order:**

1. Build CSS (Tailwind)
2. Build JS (Alpine bundle)
3. Build Eleventy (HTML generation)

**Watch Mode:**

- CSS watch (Tailwind)
- JS watch (esbuild)
- Eleventy watch (--serve)

---

## Best Practices Learned

### 1. ✅ Separate Build Tools

- Use Eleventy for HTML/templating only
- Use Tailwind for CSS compilation
- Use esbuild for JavaScript bundling
- **Benefit:** Each tool does what it's best at

### 2. ✅ Data Fetching at Build Time

- Fetch from APIs in `_data/*.js` files
- Cache results during build
- **Benefit:** No client-side API calls, faster page loads

### 3. ✅ Template Filters for Reusability

- Create custom filters for common operations
- Keep templates clean and readable
- **Benefit:** DRY principle, easier maintenance

### 4. ✅ Collections for Organization

- Group content by type (blog, projects, events)
- Sort at build time, not runtime
- **Benefit:** Better performance, cleaner templates

### 5. ✅ Environment-Based Configuration

```javascript
const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  // Minify HTML in production
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      return require("html-minifier").minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }
    return content;
  });
}
```

---

## Debugging Tips

### Enable Verbose Logging

```bash
DEBUG=Eleventy* npx @11ty/eleventy
```

### Check Build Performance

```bash
npx @11ty/eleventy --debug
```

### Dry Run (No File Writing)

```bash
npx @11ty/eleventy --dryrun
```

---

## Summary

**Key Takeaways:**

1. **Flexible Architecture** - Eleventy is unopinionated, allowing custom build pipelines
2. **Data-Driven** - Use `_data/` for global data and API integrations
3. **Template Filters** - Custom filters keep templates clean
4. **Collections** - Organize and sort content at build time
5. **Passthrough Copy** - Avoid processing static assets unnecessarily
6. **Plugin Ecosystem** - Extend functionality with official and community plugins
7. **Performance First** - Static output = fast load times

**Files Referenced:**

- Configuration: [eleventy.config.js](../../eleventy.config.js)
- Site Data: [src/\_data/site.json](../../src/_data/site.json)
- Events Data: [src/\_data/events.js](../../src/_data/events.js)

---

**Document Version:** 1.0  
**Last Updated:** December 17, 2025  
**Next Review:** As Eleventy updates (currently v3.0.0)
