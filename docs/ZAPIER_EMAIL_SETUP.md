# Zapier Email Automation Configuration

## Webhook Payload Structure

When a member submits the onboarding form, the API sends this JSON payload to your Zapier webhook:

```json
{
  "name": "John Doe",
  "email": "john.doe@njit.edu",
  "major": "Computer Science",
  "graduationYear": "2026",
  "careerGoal": "I want to become a software engineer at a top tech company...",
  "missingItems": [
    {
      "field": "LinkedIn",
      "issue": "URL should be from linkedin.com",
      "guide": "https://www.linkedin.com/help/linkedin/answer/a542685"
    },
    {
      "field": "Personal Website",
      "issue": "Invalid URL format",
      "guide": "https://pages.github.com/",
      "template": "https://kaw393939.github.io/117_final_fall_2025/portfolio/"
    }
  ],
  "submittedAt": "2025-12-11T10:30:00.000Z"
}
```

## Zapier Zap Configuration

### Step 1: Trigger - Catch Webhook

1. **Trigger App**: Webhooks by Zapier
2. **Trigger Event**: Catch Hook
3. **Webhook URL**: Copy this URL and add it to your `.env.local` as `EMAIL_WEBHOOK_URL`

**Test Data for Webhook** (Use this to test in Zapier):

```json
{
  "name": "Test Student",
  "email": "test@njit.edu",
  "major": "Information Systems",
  "graduationYear": "2026",
  "careerGoal": "I want to transition from traditional IT to cloud architecture and DevOps, eventually leading infrastructure teams at enterprise companies.",
  "missingItems": [
    {
      "field": "GitHub",
      "issue": "URL should be from github.com",
      "guide": "https://docs.github.com/en/get-started"
    }
  ],
  "submittedAt": "2025-12-11T15:00:00.000Z"
}
```

### Step 2: Filter (Optional but Recommended)

Add a **Filter by Zapier** step to handle two different email templates:

**Filter 1: Complete Profile**

- Condition: `missingItems` → `Does not exist`
- This catches members with complete profiles

**Filter 2: Incomplete Profile**

- Condition: `missingItems` → `Exists`
- This catches members who need to complete tasks

### Step 3: Send Email

Choose your email service:

- **Gmail** (recommended for testing)
- **Outlook**
- **SendGrid** (for production)
- **Mailgun** (for production)

## Email Template for Complete Profiles

**Subject:**

```
🎉 Welcome to NJIT Job Club, {{name}}!
```

**Body (HTML):**

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background: linear-gradient(135deg, #6750a4 0%, #9575cd 100%);
        color: white;
        padding: 30px 20px;
        border-radius: 10px 10px 0 0;
        text-align: center;
      }
      .content {
        background: #fff;
        padding: 30px;
        border: 1px solid #e0e0e0;
        border-top: none;
      }
      .cta-button {
        display: inline-block;
        background: #6750a4;
        color: white;
        padding: 12px 30px;
        text-decoration: none;
        border-radius: 25px;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        padding: 20px;
        color: #666;
        font-size: 14px;
      }
      .checklist {
        background: #f5f5f5;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
      }
      .checklist-item {
        padding: 10px 0;
        border-bottom: 1px solid #e0e0e0;
      }
      .emoji {
        font-size: 1.2em;
        margin-right: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🎉 Welcome to Job Club!</h1>
      </div>
      <div class="content">
        <p>Hi <strong>{{name}}</strong>,</p>

        <p>
          Congratulations! Your profile is complete and you're officially part
          of the NJIT Job Club community! 🚀
        </p>

        <p><strong>Your Profile Summary:</strong></p>
        <ul>
          <li><strong>Major:</strong> {{major}}</li>
          <li><strong>Graduation Year:</strong> {{graduationYear}}</li>
          <li><strong>Career Goal:</strong> {{careerGoal}}</li>
        </ul>

        <div class="checklist">
          <h3>🎯 What's Next?</h3>
          <div class="checklist-item">
            <span class="emoji">📅</span> <strong>Join Weekly Town Hall</strong
            ><br />
            Every Thursday at 6 PM - Meet employers, share updates, learn from
            peers
          </div>
          <div class="checklist-item">
            <span class="emoji">💬</span> <strong>Join Discord Community</strong
            ><br />
            Connect with 100+ students, alumni, and industry professionals
          </div>
          <div class="checklist-item">
            <span class="emoji">🤝</span> <strong>Explore Mentorship</strong
            ><br />
            Get paired with professionals in your target industry
          </div>
          <div class="checklist-item">
            <span class="emoji">💼</span> <strong>Browse Opportunities</strong
            ><br />
            Access exclusive internships and job postings
          </div>
        </div>

        <center>
          <a href="https://www.eaikw.com/townhall/" class="cta-button"
            >View Town Hall Schedule</a
          >
        </center>

        <p>We're excited to have you in the community!</p>

        <p>
          Best regards,<br />
          <strong>Keith Williams</strong><br />
          Director of Enterprise AI, NJIT<br />
          Job Club Founder
        </p>
      </div>
      <div class="footer">
        <p>NJIT Job Club | Building Your Future, Together</p>
        <p>Need help? Reply to this email or visit our website.</p>
      </div>
    </div>
  </body>
</html>
```

## Email Template for Incomplete Profiles

**Subject:**

```
⚠️ Action Required: Complete Your Job Club Profile
```

**Body (HTML):**

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background: linear-gradient(135deg, #ff6f00 0%, #ffb74d 100%);
        color: white;
        padding: 30px 20px;
        border-radius: 10px 10px 0 0;
        text-align: center;
      }
      .content {
        background: #fff;
        padding: 30px;
        border: 1px solid #e0e0e0;
        border-top: none;
      }
      .alert-box {
        background: #fff3e0;
        border-left: 4px solid #ff6f00;
        padding: 15px;
        margin: 20px 0;
        border-radius: 4px;
      }
      .task-box {
        background: #f9f9f9;
        border: 2px solid #ff6f00;
        padding: 20px;
        border-radius: 8px;
        margin: 15px 0;
      }
      .task-title {
        color: #ff6f00;
        font-weight: bold;
        font-size: 1.1em;
        margin-bottom: 10px;
      }
      .guide-link {
        display: inline-block;
        background: #ff6f00;
        color: white;
        padding: 8px 20px;
        text-decoration: none;
        border-radius: 20px;
        margin: 10px 5px 0 0;
        font-size: 0.9em;
      }
      .cta-button {
        display: inline-block;
        background: #6750a4;
        color: white;
        padding: 12px 30px;
        text-decoration: none;
        border-radius: 25px;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        padding: 20px;
        color: #666;
        font-size: 14px;
      }
      .emoji {
        font-size: 1.2em;
        margin-right: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>⚠️ Profile Incomplete</h1>
      </div>
      <div class="content">
        <p>Hi <strong>{{name}}</strong>,</p>

        <p>
          Thanks for starting your Job Club registration! We noticed some
          professional assets are missing from your profile. Don't worry - we're
          here to help! 🙌
        </p>

        <div class="alert-box">
          <strong>⏰ Your Profile Status:</strong> Incomplete<br />
          <strong>📧 We'll keep this email for reference</strong>
        </div>

        <h3>📋 Tasks to Complete:</h3>

        <!-- This section will repeat for each missing item -->
        {{#each missingItems}}
        <div class="task-box">
          <div class="task-title">❌ {{field}}</div>
          <p><strong>Issue:</strong> {{issue}}</p>
          <div>
            <a href="{{guide}}" class="guide-link" target="_blank"
              >📘 Setup Guide</a
            >
            {{#if template}}
            <a href="{{template}}" class="guide-link" target="_blank"
              >🎨 View Template</a
            >
            {{/if}}
          </div>
        </div>
        {{/each}}

        <h3>💡 Why These Matter:</h3>
        <ul>
          <li>
            <strong>LinkedIn:</strong> Employers check this first - make sure
            it's professional
          </li>
          <li>
            <strong>GitHub:</strong> Shows your technical work and coding skills
          </li>
          <li>
            <strong>Portfolio Website:</strong> Your personal brand - showcase
            projects!
          </li>
          <li>
            <strong>Calendly:</strong> Makes scheduling meetings with employers
            super easy
          </li>
        </ul>

        <div class="alert-box">
          <strong>🚀 Quick Tip:</strong> Don't have time to complete everything
          now? Start with LinkedIn and GitHub - they're the most important for
          employers!
        </div>

        <h3>✅ Once You're Done:</h3>
        <p>
          Simply reply to this email with your updated links, and we'll verify
          your profile within 24 hours!
        </p>

        <center>
          <a href="https://www.eaikw.com/onboarding/" class="cta-button"
            >Update My Profile</a
          >
        </center>

        <p>
          Need help? We offer office hours every Tuesday and Thursday, 3-5 PM.
          Just reply to schedule!
        </p>

        <p>Looking forward to seeing your complete profile!</p>

        <p>
          Best regards,<br />
          <strong>Keith Williams</strong><br />
          Director of Enterprise AI, NJIT<br />
          Job Club Founder
        </p>
      </div>
      <div class="footer">
        <p>NJIT Job Club | Building Your Future, Together</p>
        <p>Questions? Reply to this email - we're here to help!</p>
      </div>
    </div>
  </body>
</html>
```

## Zapier Field Mapping

When configuring your email step, map these fields:

| Field in Email | Zapier Field Path                     |
| -------------- | ------------------------------------- |
| To Email       | `1. Email` (from webhook)             |
| Subject        | (Use template above)                  |
| Body           | (Use HTML template above)             |
| name           | `1. Name`                             |
| email          | `1. Email`                            |
| major          | `1. Major`                            |
| graduationYear | `1. Graduation Year`                  |
| careerGoal     | `1. Career Goal`                      |
| missingItems   | `1. Missing Items` (will be an array) |

## Testing Your Zap

1. **Turn off Zap** while testing
2. **Send Test Data** from Step 1 (webhook)
3. **Check each step** for data mapping
4. **Test both paths**:
   - Test with `missingItems` (incomplete profile)
   - Test without `missingItems` (complete profile)
5. **Turn on Zap** when ready

## Advanced: Using Looping for Missing Items

If using Gmail/Outlook, you may need to use **Looping by Zapier** to iterate through missing items:

1. Add **Looping by Zapier** after Filter
2. Set **Values**: `1. Missing Items`
3. Each loop will have:
   - `field` → Missing item name
   - `issue` → What's wrong
   - `guide` → Help link
   - `template` → Example link (if exists)

## Monitoring Your Zap

1. Go to Zapier Dashboard
2. Check **Task History** to see:
   - Successful emails sent
   - Failed attempts
   - Data received from webhook
3. Set up **Email Notifications** for:
   - Task errors
   - Daily summaries

## Common Issues

**Issue**: Zap not triggering

- **Solution**: Check webhook URL is correctly set in `.env.local`
- **Solution**: Test the API endpoint first

**Issue**: Missing items not displaying

- **Solution**: Ensure you're using HTML email format
- **Solution**: Check if `missingItems` array exists in test data

**Issue**: Links not clickable

- **Solution**: Use HTML email format, not plain text
- **Solution**: Ensure links start with `https://`

## Production Checklist

- [ ] Test both email templates (complete & incomplete profiles)
- [ ] Verify all links work in emails
- [ ] Check email displays correctly on mobile
- [ ] Test spam score (use [mail-tester.com](https://www.mail-tester.com))
- [ ] Set up error notifications
- [ ] Monitor first 10 submissions closely
- [ ] Have fallback email ready if Zap fails
