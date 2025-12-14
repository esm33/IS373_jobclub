# Job Club Onboarding System

Complete onboarding workflow with Sanity CMS storage, automated email follow-ups, and Discord integration.

## Features

### ✅ Onboarding Form
- Collects: Name, Email, Major, Graduation Year, LinkedIn, GitHub, Portfolio, Calendly, Career Goal
- Real-time URL validation with domain checking
- Beautiful Material Design UI with smooth animations
- Loading states and comprehensive error handling

### ✅ Sanity CMS Storage
- Stores all member profiles with complete data
- Automatic prerequisite detection (missing LinkedIn/GitHub/Portfolio/Calendly)
- Status tracking (new/in-progress/completed)
- Timestamps and admin notes
- Custom Studio views for filtering members

### ✅ Automated Email System
- Triggers personalized email via Zapier/Make webhook
- Includes list of missing prerequisites
- Sends relevant guides and templates
- Customizable email templates

### ✅ Discord Integration
- Posts welcome message to #jobclub-intros channel
- Rich embed with member details
- Automatic role assignment (optional)

## Setup Instructions

### 1. Sanity CMS Setup

```bash
cd sanity
npm install
```

Create a Sanity project at [sanity.io/manage](https://sanity.io/manage), then:

```bash
# Configure environment
cp .env.example .env.local
# Add your SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET

# Start Studio
npm run dev
# Visit http://localhost:3333
```

Get a write token:
1. Go to https://sanity.io/manage
2. Select your project → API → Tokens
3. Create new token with "Write" permissions
4. Copy the token

### 2. Environment Configuration

In your root project directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:

```env
# Sanity
SANITY_PROJECT_ID=abc123xyz
SANITY_DATASET=production
SANITY_WRITE_TOKEN=skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Email webhook (see step 3)
EMAIL_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/123456/abcdef/

# Discord webhook (see step 4)
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/123456789/abcdefghijk
```

### 3. Email Automation Setup

#### Option A: Zapier

1. Create a new Zap
2. **Trigger**: Webhooks by Zapier → Catch Hook
3. Copy the webhook URL to `EMAIL_WEBHOOK_URL`
4. **Action**: Email (Gmail/Outlook/etc.) → Send Email
5. Configure email template with:
   ```
   Subject: Welcome to Job Club - Next Steps
   
   Hi {{name}},
   
   Welcome to NJIT Job Club! We received your profile.
   
   {% if missingItems %}
   To complete your onboarding, please address these items:
   {{missingItems}}
   {% endif %}
   
   Next Steps:
   1. Complete missing prerequisites
   2. Join our Discord community
   3. Attend the next Town Hall
   
   Best regards,
   Job Club Team
   ```

#### Option B: Make.com

1. Create a new Scenario
2. Add Webhook module → Custom Webhook
3. Copy webhook URL to `EMAIL_WEBHOOK_URL`
4. Add Email module → Send an Email
5. Map fields: name, email, missingItems
6. Customize template similar to above

### 4. Discord Integration Setup

1. Go to your Discord server
2. Go to Server Settings → Integrations → Webhooks
3. Click "New Webhook"
4. Name: "Job Club Bot"
5. Channel: #jobclub-intros (or create this channel)
6. Copy Webhook URL
7. Paste into `DISCORD_WEBHOOK_URL` in `.env.local`

### 5. Deploy Serverless Function

#### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add SANITY_PROJECT_ID
vercel env add SANITY_DATASET
vercel env add SANITY_WRITE_TOKEN
vercel env add EMAIL_WEBHOOK_URL
vercel env add DISCORD_WEBHOOK_URL
```

Your API will be available at: `https://your-project.vercel.app/api/submit-onboarding`

#### Netlify Deployment

Create `netlify.toml`:

```toml
[build]
  functions = "api"

[build.environment]
  NODE_VERSION = "18"
```

Deploy:
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Add environment variables in Netlify dashboard
# Site settings → Environment variables
```

### 6. Update Frontend Configuration

In [src/js/onboarding.js](src/js/onboarding.js), update the `getApiEndpoint()` method with your production URL:

```javascript
getApiEndpoint() {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:3000/api/submit-onboarding';
  }
  // Update with your production URL
  return 'https://your-project.vercel.app/api/submit-onboarding';
}
```

### 7. Build and Test

```bash
# Build the site
npm run build

# Test locally
npm run dev

# Visit http://localhost:8080/onboarding/
```

## Testing the Workflow

1. Fill out the onboarding form
2. Submit the form
3. Check Sanity Studio for the new member profile
4. Verify email was sent (check spam folder)
5. Check Discord #jobclub-intros for the welcome message

## Sanity Studio Views

Access at `http://localhost:3333`:

- **All Members** - Complete list with sorting
- **New Members** - Recently submitted, needs review
- **In Progress** - Currently being onboarded
- **Completed** - Finished onboarding
- **Missing Prerequisites** - Members with incomplete profiles

## Email Template Customization

Edit the webhook in Zapier/Make to customize:

### For Complete Profiles:
```
Subject: 🎉 Welcome to Job Club!

Hi {{name}},

Congratulations! Your profile is complete. You're all set!

What's Next:
✅ Join our weekly Town Hall
✅ Connect with mentors
✅ Explore job opportunities
✅ Join project teams

See you at the next meeting!
```

### For Incomplete Profiles:
```
Subject: ⚠️ Action Required: Complete Your Job Club Profile

Hi {{name}},

Thanks for joining! To finish your onboarding, please complete:

{{#each missingItems}}
- {{field}}: {{issue}}
  📘 Guide: {{guide}}
  {{#if template}}🎨 Template: {{template}}{{/if}}
{{/each}}

Once complete, reply to this email and we'll update your status!
```

## Troubleshooting

### API not receiving data
- Check environment variables are set correctly
- Verify CORS headers in the API function
- Check browser console for errors

### Email not sending
- Verify webhook URL is correct
- Check Zapier/Make task history for errors
- Test webhook with a manual trigger

### Discord message not posting
- Verify webhook URL format
- Check Discord server permissions
- Test webhook with curl:
  ```bash
  curl -X POST $DISCORD_WEBHOOK_URL \
    -H "Content-Type: application/json" \
    -d '{"content": "Test message"}'
  ```

### Sanity write errors
- Verify write token has correct permissions
- Check project ID and dataset name
- Ensure schema is deployed to Studio

## Architecture

```
┌─────────────────┐
│  Onboarding     │
│  Form (Njk)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  onboarding.js  │
│  (Frontend)     │
└────────┬────────┘
         │ POST
         ▼
┌─────────────────────────────────────┐
│  /api/submit-onboarding.js          │
│  ├─ Validate data                   │
│  ├─ Detect missing prerequisites    │
│  ├─ Save to Sanity CMS              │
│  ├─ Trigger email webhook           │
│  └─ Send Discord notification       │
└────────┬────────────────────────────┘
         │
         ├──────────────┬─────────────┐
         ▼              ▼             ▼
   ┌──────────┐  ┌──────────┐  ┌──────────┐
   │  Sanity  │  │  Zapier/ │  │ Discord  │
   │   CMS    │  │   Make   │  │ Webhook  │
   └──────────┘  └──────────┘  └──────────┘
```

## Next Steps

1. **Customize email templates** in Zapier/Make
2. **Add Discord role assignment** using Discord bot
3. **Create admin dashboard** to manage members
4. **Add analytics** to track onboarding completion rates
5. **Implement reminder emails** for incomplete profiles

## Support

For issues or questions:
- Check Sanity Studio logs
- Review Zapier/Make task history
- Check Discord webhook deliveries
- Review browser console errors
