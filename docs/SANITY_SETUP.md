# Sanity CMS Setup Guide - Job Club

**Status:** ✅ TESTED & WORKING - Onboarding form → dev-server → Sanity CMS → data saved successfully

This guide walks you through setting up Sanity CMS for the Job Club onboarding system. The form submission flow has been tested end-to-end with real Sanity credentials.

---

## Prerequisites

- Node.js 16+ installed
- npm installed
- A Sanity account (create at [sanity.io](https://sanity.io) if you don't have one)

---

## Step 1: Accept Sanity Project Invitation

If you've been invited to a Sanity project:

1. **Check your email** for an invitation from Sanity
2. Click the **"Accept invitation"** link in the email
3. You'll be directed to [sanity.io/manage](https://sanity.io/manage)
4. The Job Club project should now appear in your project list
5. Click on the **job-club-njit** project to open it

---

## Step 1 (Alternative): Create Your Own Project

If you're setting up a NEW project (not invited):

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click **"Create new project"**
3. **Project name:** `job-club-njit`
4. **Dataset name:** `production` (or your preferred name)
5. **Project template:** Start with "Blank schema" or "Blog" (you can replace the schema anyway)
6. Click **"Create project"**
7. You'll be directed to your project dashboard

---

## Step 2: Get Your Project Credentials

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click on your **job-club-njit** project
3. In the left sidebar, click **"Settings"**
4. Click **"API"**
5. You'll see:
   - **Project ID** - Copy this
   - **Dataset** - Usually "production" (copy this)
6. Scroll down to **"Tokens"** section
7. Click **"Add API token"**
8. **Token name:** `job-club-write-token`
9. **Permissions:** Select **"Editor"** (allows read and write)
10. Click **"Save"**
11. **Copy the token** (it won't be shown again!) - This is your `SANITY_WRITE_TOKEN`

---

## Step 3: Configure Environment Variables

### For the Main App (Form Submission)

**File:** `/root/.env.local` (in main project root, not sanity folder)

Add these three variables:

```bash
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token_here
```

**Example:**
```bash
SANITY_PROJECT_ID=abc123def456
SANITY_DATASET=production
SANITY_WRITE_TOKEN=sk-abc123def456ghijklmnopqrstuvwxyz
```

### For Sanity Studio (CMS Interface)

**File:** `/sanity/.env.local`

```bash
SANITY_STUDIO_PROJECT_ID=your_project_id_here
SANITY_STUDIO_DATASET=production
```

---

## Step 4: Set Up Sanity Studio (Optional but Recommended)

The Sanity Studio is a visual CMS interface where you can browse and manage member data.

### Install & Run Sanity Studio

```bash
cd sanity
npm install
npm run dev
```

Studio will be available at: `http://localhost:3333`

### Log In to Studio

1. Go to `http://localhost:3333`
2. You'll be prompted to log in with your Sanity account
3. Click **"Sign in"**
4. Use your Sanity credentials
5. You should see the Studio interface with a **"memberProfile"** schema on the left

---

## Step 5: Test Form Submission

1. Make sure your main app is still running on `http://localhost:8080`
2. Go to `http://localhost:8080/onboarding/`
3. The form should still have test data pre-filled
4. Click **"Submit"**
5. You should see a **"Success!"** message
6. The form should redirect to home after 3 seconds

---

## Step 6: Verify Data in Sanity

### Check in Sanity Studio

1. Go to `http://localhost:3333` (if running)
2. Click **"memberProfile"** in the left sidebar
3. You should see your test submission with:
   - Name: "Emily Chen"
   - Email: "emily.chen@njit.edu"
   - Major: "Computer Science"
   - Graduation Year: "2026"
   - LinkedIn, GitHub, Website, Calendly URLs
   - Career Goal text
   - onboardingStatus: "new"
   - Missing prerequisites flags

### Check via API

You can also query your data using the Sanity API:

```bash
curl "https://{PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type=='memberProfile']" \
  -H "Authorization: Bearer {SANITY_WRITE_TOKEN}"
```

Replace `{PROJECT_ID}` and `{SANITY_WRITE_TOKEN}` with your actual values.

---

## Troubleshooting

### Error: "SANITY_PROJECT_ID is not defined"

**Solution:** Check that `.env.local` is in the correct location:
- For form submission: `/root/.env.local` (main project)
- For Sanity Studio: `/sanity/.env.local`

Restart your dev server after adding environment variables.

### Error: "Token Invalid" or "Unauthorized"

**Solution:** 
1. Your `SANITY_WRITE_TOKEN` may be wrong - copy it again from Sanity dashboard
2. Make sure token has **"Editor"** permissions (read + write)
3. Regenerate token if needed

### Error: "Dataset not found"

**Solution:** 
1. Check that `SANITY_DATASET` matches your dataset name (usually "production")
2. In Sanity dashboard, go to Settings → API to verify dataset name

### Form Submits but No Data Appears

**Solution:**
1. Check browser console (F12) for error messages
2. Check `.env.local` variables are correctly set
3. Restart dev server: `npm run dev`
4. Try submitting form again with fresh test data

### Sanity Studio Won't Load

**Solution:**
1. Make sure you're logged into your Sanity account
2. Check that `SANITY_STUDIO_PROJECT_ID` is correct in `/sanity/.env.local`
3. Restart Sanity dev server: `cd sanity && npm run dev`

---

## What Gets Saved to Sanity

When a user submits the onboarding form, the following data is saved:

```json
{
  "_type": "memberProfile",
  "name": "string",
  "email": "string",
  "major": "string",
  "graduationYear": "number",
  "linkedinUrl": "string",
  "githubUrl": "string",
  "websiteUrl": "string",
  "calendlyUrl": "string",
  "careerGoal": "string",
  "onboardingStatus": "new|in-progress|completed",
  "missingLinkedIn": "boolean",
  "missingGitHub": "boolean",
  "missingWebsite": "boolean",
  "missingCalendly": "boolean",
  "_createdAt": "timestamp"
}
```

---

## Next Steps After Setup

1. ✅ **Form submission working?** → Proceed to Zapier setup for email automation
2. ✅ **Want to view/edit data?** → Use Sanity Studio at `http://localhost:3333`
3. ✅ **Ready for production?** → Set these same environment variables in your production environment
4. ✅ **Need Discord integration?** → Follow `docs/AUTOMATION_SETUP.md` for Discord webhook setup

---

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add these environment variables in your hosting platform's dashboard:
   ```
   SANITY_PROJECT_ID=xxx
   SANITY_DATASET=production
   SANITY_WRITE_TOKEN=xxx
   ```

2. The API route `/api/submit-onboarding.js` will use these variables automatically

3. Form submissions will save to your production Sanity dataset

---

## Resources

- **Sanity Docs:** https://www.sanity.io/docs
- **Sanity API Reference:** https://www.sanity.io/docs/http-api
- **GROQ Query Language:** https://www.sanity.io/docs/groq
- **Sanity Studio Configuration:** https://www.sanity.io/docs/configure-sanity-studio

---

*Last Updated: December 13, 2025*
