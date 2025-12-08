# AI Usage Log - IS373 Job Club Project

**Project:** IS373_jobclub  
**Team:** Group Project  
**Created:** December 7, 2025

---

## Overview

This document tracks all AI assistance used throughout the project development, including wireframes, code generation, schemas, QA, forms, content, and checklists.

---

## AI-Generated Wireframes

### [Date] - [Wireframe Name]
- **Tool Used:** [e.g., ChatGPT, Claude, Midjourney, etc.]
- **Purpose:** [What the wireframe was for]
- **Prompt Used:**
  ```
  [Paste the exact prompt used]
  ```
- **Output:** [Link to wireframe file or description]
- **Modifications Made:** [Any manual changes]

---

## Prompts Used for Code Generation

### December 7, 2025 - Initial Repository Setup
- **Tool Used:** GitHub Copilot (Claude Sonnet 4.5)
- **Purpose:** Clone repository and analyze project structure
- **Prompts Used:**
  ```
  1. "this is the link to the repo. pull"
  2. "ok go through the files and read everything, make sure you know what the files are"
  3. "ok now, keep a log of everything that you work on so it can stay organized"
  4. "i also want you to to create docs/ai-usage.md [requirements provided]"
  ```
- **Output:** 
  - Repository cloned successfully
  - Complete project analysis performed
  - WORK_LOG.md created
  - docs/ai-usage.md created
- **Files Created:**
  - `/WORK_LOG.md`
  - `/docs/ai-usage.md`

### December 7, 2025 - Project Scope Definition
- **Tool Used:** GitHub Copilot (Claude Sonnet 4.5)
- **Purpose:** Document new Job Club website requirements
- **Prompt Used:**
  ```
  "this new project will be a job club website that will bring students together 
  to get a job. it must follow these rules Job Club is a student-focused AI career 
  accelerator designed to help NJIT students become: AI consultants, AI startup 
  founders, AI-savvy developers, Portfolio-ready job candidates..."
  [Full requirements provided]
  ```
- **Output:**
  - Project scope documented in WORK_LOG.md
  - Requirements captured in ai-usage.md
  - Understanding established before coding begins
- **Files Modified:**
  - `/WORK_LOG.md` - Updated with new project direction
  - `/docs/ai-usage.md` - Logged this session

### December 7, 2025 - Pattern Library Extraction (Complete)
- **Tool Used:** GitHub Copilot (Claude Sonnet 4.5)
- **Purpose:** Extract all reusable design patterns, code snippets, and best practices from existing portfolio site for Job Club development
- **Prompts Used:**
  ```
  1. "do you have a reference folder that can show us info we can reuse"
  2. "ok create a reference folder. go through the css and extract all reusable ideas 
     and name them what they are. we need this so we can use the best parts of this 
     site for the job club"
  3. "we will likely not use exactly swiss style so i want it to be as generalizeable 
     as possible. also audit once more and extract all good features"
  4. "do it again. extract all the good features"
  5. "Try Again"
  ```
- **Iterations:** 3 versions created, progressively more comprehensive and framework-agnostic
- **Output:** 
  - Complete pattern library with 18 production-ready patterns
  - Framework-agnostic and style-agnostic implementations
  - Copy-paste ready code with Job Club examples
  - Performance data from production site (Lighthouse 100/100)
  - 4-week implementation checklist
- **Files Created:**
  - `/docs/reference/harvest-notes-complete.md` (1100+ lines)
  - `/docs/reference/harvest-notes-v2-backup.md` (backup of iteration 2)
- **Files Modified:**
  - `/WORK_LOG.md` - Added session details
  - `/docs/ai-usage.md` - Logged this session

#### Code Patterns Extracted:

**Accessibility (A1-A7):**
- Touch target system (44x44px minimum)
- Focus indicators (2px offset, high contrast)
- Screen reader utilities (sr-only class)
- ARIA attribute patterns
- Reduced motion support (@media prefers-reduced-motion)
- Focus trap implementation (complete JavaScript class)
- Keyboard navigation patterns

**Responsive Design (R1-R5):**
- Fluid typography system using clamp() - eliminates breakpoints
- Fluid spacing scale
- 12-column responsive grid (auto-collapse)
- Auto-fit card layouts (grid-template-columns: repeat(auto-fit))
- Mobile-first menu patterns

**Performance (P1-P5):**
- Content Visibility API implementation (40-60% faster rendering)
- Hardware acceleration patterns (transform: translateZ(0))
- Image optimization (lazy loading, skeleton screens, AVIF/WebP)
- Font loading strategy (font-display: swap)
- Smooth scrolling with event delegation

**JavaScript (J1-J3):**
- Intersection Observer manager (complete class with cleanup)
- Web Vitals monitoring (production code with rate limiting)
- Data attribute patterns (data-testid, data-scroll-to)

**Job Club Components (S1-S3):**
- Student progress tracker with animations
- Badge system (locked/unlocked/in-progress states)
- Avatar system with gradient fallbacks

#### Performance Data Captured:
- Lighthouse scores: 100/100 across all categories
- Content Visibility API: 40-60% rendering improvement
- Reduced layout shifts: CLS < 0.1
- Web Vitals thresholds documented
- Accessibility compliance: WCAG 2.1 AA

#### Testing Requirements Included:
- Accessibility testing (keyboard nav, screen reader, high contrast)
- Performance testing (Lighthouse, Web Vitals)
- Responsive testing (320px to 1440px+)
- Browser compatibility testing

---

## AI Assistance for Sanity Schemas

### [Date] - [Schema Name]
- **Tool Used:** [AI tool name]
- **Purpose:** [What the schema is for]
- **Prompt Used:**
  ```
  [Paste the exact prompt used]
  ```
- **Schema Generated:** [Link to schema file]
- **Validation:** [How it was tested]
- **Modifications Made:** [Any manual changes]

---

## AI-Assisted QA (Quality Assurance)

### [Date] - [QA Session]
- **Tool Used:** [AI tool name]
- **Purpose:** [What was being tested]
- **Prompt Used:**
  ```
  [Paste the exact prompt used]
  ```
- **Issues Found:** [List of issues]
- **Resolutions:** [How issues were fixed]
- **Test Results:** [Pass/Fail status]

---

## AI-Generated Forms

### [Date] - [Form Name]
- **Tool Used:** [AI tool name]
- **Purpose:** [What the form is for]
- **Prompt Used:**
  ```
  [Paste the exact prompt used]
  ```
- **Form Fields Generated:** [List of fields]
- **Validation Rules:** [Generated validation]
- **File Location:** [Path to form file]
- **Modifications Made:** [Any manual changes]

---

## AI-Generated Content

### [Date] - [Content Type]
- **Tool Used:** [AI tool name]
- **Purpose:** [What the content is for]
- **Prompt Used:**
  ```
  [Paste the exact prompt used]
  ```
- **Content Generated:** [Description or link]
- **Location:** [Where content was used]
- **Edits Made:** [Any manual editing]

---

## AI-Generated Checklists

### [Date] - [Checklist Name]
- **Tool Used:** [AI tool name]
- **Purpose:** [What the checklist is for]
- **Prompt Used:**
  ```
  [Paste the exact prompt used]
  ```
- **Checklist Items:**
  - [ ] Item 1
  - [ ] Item 2
  - [ ] Item 3
- **File Location:** [Path to checklist]

---

## Summary Statistics

### AI Usage by Category
- **Wireframes:** 0
- **Code Generation:** 1 session
- **Sanity Schemas:** 0
- **QA Sessions:** 0
- **Forms Generated:** 0
- **Content Generated:** 0
- **Checklists Generated:** 0

### AI Tools Used
- GitHub Copilot (Claude Sonnet 4.5): 1 session

### Total AI Interactions
- **Total Sessions:** 1
- **Total Prompts:** 3
- **Files Created with AI:** 2
- **Files Modified with AI:** 0

---

## Best Practices & Lessons Learned

### What Worked Well
- [Document successful AI interactions]

### What Didn't Work
- [Document unsuccessful attempts]

### Recommendations for Future Use
- [Document tips for the team]

---

## Team Members' AI Usage

### [Team Member Name]
- **Sessions:** 0
- **Primary Use Cases:** 
- **Notes:**

---

*Last Updated: December 7, 2025*
