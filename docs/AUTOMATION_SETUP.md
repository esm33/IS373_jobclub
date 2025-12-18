# Job Club Automation Setup Guide

## Overview

This guide walks you through setting up the two required automations for Job Club:

1. **Onboarding Form → CRM + Personalized Email**
2. **Discord Integration** for #jobclub-intros

---

## Part 1: Zapier Setup (Email Automation)

### Step 1: Create a Zapier Account

1. Go to [zapier.com](https://zapier.com) and sign up for a free account
2. Verify your email

### Step 2: Create the Webhook Trigger

1. Click **Create** → **New Zap**
2. Search for and select **Webhooks by Zapier**
3. Select **Catch Raw Hook** as the trigger
4. Click **Continue**
5. You'll get a unique webhook URL like: `https://hooks.zapier.com/hooks/catch/1234567/abc123/`
6. **Copy this URL** - you'll need it for `.env.local`

### Step 3: Test the Webhook

1. Click **Test trigger**
2. Go back to your Job Club app at `/onboarding/` (running locally)
3. Fill out the form and submit
4. The webhook should receive the data
5. Click **OK, I found it**

### Step 4: Create Email Action (Gmail Example)

1. Click **Continue** to set up the action
2. Search for **Gmail** and select it
3. Choose **Send Email**
4. Click **Sign in with Google** and authorize
5. Set up the email template:

```
To: {email}
Subject: 🎉 Welcome to Job Club - Your Next Steps

Body:
Hi {name},

Welcome to Job Club! 🚀

We're excited to have you join our AI career accelerator program. Here's what you need to do next:

**Your Profile:**
- Major: {major}
- Graduation Year: {graduationYear}
- Career Goal: {careerGoal}

**Missing Items to Complete:**
{missingItems}

**Next Steps:**
1. Complete any missing professional assets above
2. Join our Discord community: [Discord Link]
3. Check out our resource library for guides
4. Schedule a mentor session: {calendlyUrl}

**Resources:**
- LinkedIn Optimization Guide: [Link]
- Portfolio Building Checklist: [Link]
- GitHub Profile Guide: [Link]

Questions? Join us in Discord or reach out to the Job Club team.

Let's build your AI career! 💪

Best,
Job Club Team
```

6. Click **Continue**
7. Click **Publish**

### Step 5: Update Your .env.local

Copy your webhook URL from Step 2 and paste it:

```
EMAIL_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ACCOUNT_ID/YOUR_HOOK_ID/
```

---

## Part 2: Discord Integration

### Step 1: Create Discord Server Channels (if not already done)

1. In your Discord server, create three channels:
   - `#jobclub-intros` - New member introductions
   - `#events` - Job Club events
   - `#resources` - Learning resources

### Step 2: Create Discord Webhook

1. Right-click on **#jobclub-intros** channel
2. Select **Edit Channel**
3. Go to **Integrations** → **Webhooks**
4. Click **New Webhook**
5. Give it a name: "Job Club Bot"
6. Click **Copy Webhook URL**

### Step 3: Update Your .env.local

Paste the webhook URL:

```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
```

### Step 4: Test Discord Integration

1. Run your dev server: `npm run dev`
2. Fill out the onboarding form
3. Submit and check #jobclub-intros channel
4. You should see a message like:

```
🎉 New Member Joined Job Club!

Name: John Doe
Email: john@njit.edu
Major: Computer Science
Graduation Year: 2026
Career Goal: AI Consultant

LinkedIn: [Link]
GitHub: [Link]
Portfolio: [Link]
Calendly: [Link]
```

---

## Part 3: CRM Integration (Optional - Airtable Example)

### Step 1: Set Up Airtable Base

1. Go to [airtable.com](https://airtable.com)
2. Create a new base named "Job Club"
3. Create a table named "Members" with these fields:
   - Name (Text)
   - Email (Email)
   - Major (Text)
   - Graduation Year (Number)
   - LinkedIn URL (URL)
   - GitHub URL (URL)
   - Website URL (URL)
   - Calendly URL (URL)
   - Career Goal (Long text)
   - Status (Single select: New, In Progress, Completed)
   - Date Joined (Created time)

### Step 2: Get Airtable Credentials

1. Click your profile icon → **Account**
2. Go to **API** tab
3. Generate an API key
4. Copy it to `.env.local`:

```
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=your_base_id_here
```

### Step 3: Create Zapier Integration (Alternative)

Or use Zapier to connect:

1. In your onboarding Zap, add another action
2. Search for **Airtable**
3. Select **Create Record**
4. Sign in with your Airtable account
5. Map the form fields to Airtable columns
6. Test and publish

---

## Part 4: Testing Everything

### Test the Full Flow:

1. **Start dev server:**

   ```bash
   npm run dev
   ```

2. **Visit the onboarding form:**

   ```
   http://localhost:8080/onboarding/
   ```

3. **Fill in all fields:**
   - Name: Test User
   - Email: test@njit.edu
   - Major: Computer Science
   - Graduation Year: 2026
   - LinkedIn: https://linkedin.com/in/testuser
   - GitHub: https://github.com/testuser
   - Website: https://testuser.com
   - Calendly: https://calendly.com/testuser
   - Career Goal: I want to become an AI consultant...

4. **Submit the form**

5. **Verify:**
   - ✅ Form shows success message
   - ✅ Discord #jobclub-intros shows new member intro
   - ✅ Email received in your inbox
   - ✅ Data appears in Sanity Studio
   - ✅ (Optional) Data appears in Airtable

---

## Troubleshooting

### Form doesn't submit?

- Check browser console for errors (F12)
- Verify EMAIL_WEBHOOK_URL is set in `.env.local`
- Make sure it's a valid Zapier webhook URL

### Discord message not posting?

- Check DISCORD_WEBHOOK_URL is correct
- Verify the webhook still exists in Discord settings
- Check the bot has permission to post in #jobclub-intros

### Email not being sent?

- Check Zapier Zap is turned ON
- Look at Zapier task history for errors
- Verify Gmail is authorized in Zapier
- Check email wasn't filtered to spam

### Data not appearing in Sanity?

- Verify SANITY_PROJECT_ID and SANITY_WRITE_TOKEN
- Check Sanity API token has write access
- Look at browser network tab for API errors

---

## Additional Automations to Consider

### 2nd Automation Options:

**Option A: Event Registration → CRM**

- Trigger: New event registration
- Action: Add to Airtable/HubSpot
- Add to Google Calendar

**Option B: New Event → Discord Announcement**

- Trigger: New event published in Sanity
- Action: Post to #events channel

**Option C: New Resource → Discord**

- Trigger: New resource published
- Action: Post to #resources channel

**Option D: Member Update → Mentor Notification**

- Trigger: Member profile updated
- Action: Notify mentors in Slack/Discord

---

## Environment Variables Reference

```env
# Required for onboarding form
SANITY_PROJECT_ID=xxx
SANITY_DATASET=production
SANITY_WRITE_TOKEN=xxx
EMAIL_WEBHOOK_URL=https://hooks.zapier.com/...
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Optional for CRM
AIRTABLE_API_KEY=xxx
AIRTABLE_BASE_ID=xxx
HUBSPOT_API_KEY=xxx

# Optional for analytics
NEXT_PUBLIC_GA_ID=xxx
```

---

## Next Steps

1. ✅ Set up Zapier webhook and email automation
2. ✅ Create Discord webhook and test message
3. ✅ (Optional) Set up Airtable CRM
4. ✅ Test full workflow end-to-end
5. ✅ Move on to Events System

Good luck! 🚀
