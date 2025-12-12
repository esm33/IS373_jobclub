# Sanity Studio - Job Club NJIT

This directory contains the Sanity Studio configuration for managing Job Club member onboarding data.

## Setup

1. **Install dependencies:**
   ```bash
   cd sanity
   npm install
   ```

2. **Create a Sanity project:**
   ```bash
   npm create sanity@latest -- --project job-club-njit --dataset production --output-path .
   ```
   
   Or if you already have a project:
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Create a new project or use an existing one
   - Copy the Project ID

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your:
   - `SANITY_STUDIO_PROJECT_ID` (from sanity.io/manage)
   - `SANITY_STUDIO_DATASET` (usually "production")

4. **Start the Studio:**
   ```bash
   npm run dev
   ```
   
   Studio will be available at `http://localhost:3333`

5. **Deploy the Studio (optional):**
   ```bash
   npm run deploy
   ```

## Schema

### Member Profile (`memberProfile`)

Stores onboarding submissions with:

**Personal Information:**
- Full Name (required)
- Email (required, validated)
- Major (required)
- Expected Graduation Year (required)

**Professional URLs:**
- LinkedIn Profile (required)
- GitHub Profile (required)
- Personal Website (required)
- Calendly Link (required)

**Career Information:**
- Career Goal (required, 50-1000 characters)

**Status & Tracking:**
- Onboarding Status (new/in-progress/completed)
- Missing Prerequisites Flags (LinkedIn, GitHub, Website, Calendly)
- Submission Timestamp
- Last Updated Timestamp

**Metadata:**
- Admin Notes
- Tags

## Studio Features

The Studio includes custom views for:
- **All Members** - Complete list with sorting options
- **New Members** - Recently submitted, needs review
- **In Progress** - Currently being onboarded
- **Completed** - Finished onboarding
- **Missing Prerequisites** - Members with incomplete profiles

## API Integration

To submit data from the onboarding form:

```javascript
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'your-write-token' // Get from sanity.io/manage
})

// Create a member profile
await client.create({
  _type: 'memberProfile',
  name: formData.name,
  email: formData.email,
  major: formData.major,
  graduationYear: formData.graduationYear,
  linkedinUrl: formData.linkedinUrl,
  githubUrl: formData.githubUrl,
  websiteUrl: formData.websiteUrl,
  calendlyUrl: formData.calendlyUrl,
  careerGoal: formData.careerGoal,
  onboardingStatus: 'new',
  missingLinkedIn: !formData.linkedinUrl,
  missingGitHub: !formData.githubUrl,
  missingWebsite: !formData.websiteUrl,
  missingCalendly: !formData.calendlyUrl,
  submittedAt: new Date().toISOString()
})
```

## Security

**Important:** Never commit `.env.local` to git. It contains sensitive credentials.

For production:
- Use environment variables in your hosting platform
- Create a separate write token for the frontend
- Restrict token permissions to only create `memberProfile` documents
- Consider using CORS origins restriction

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Schema Types](https://www.sanity.io/docs/schema-types)
- [Studio Customization](https://www.sanity.io/docs/create-a-schema-and-configure-sanity-studio)
- [Content Lake API](https://www.sanity.io/docs/http-api)
