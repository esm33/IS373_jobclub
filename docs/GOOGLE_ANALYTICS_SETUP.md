# Google Analytics 4 Setup Guide

## Quick Start (5 minutes)

### Step 1: Create Google Analytics Account

1. Go to [https://analytics.google.com/](https://analytics.google.com/)
2. Click **"Start measuring"** or **"Admin"** (if you already have an account)
3. Click **"Create Account"**
4. Enter account name: `Job Club NJIT` (or your preference)
5. Configure data sharing settings (optional)
6. Click **"Next"**

### Step 2: Create Property

1. Property name: `Job Club Website`
2. Reporting time zone: `(GMT-05:00) Eastern Time`
3. Currency: `United States Dollar (USD)`
4. Click **"Next"**

### Step 3: Configure Business Information

1. Industry category: `Jobs & Education` or `Technology`
2. Business size: `Small` (or appropriate size)
3. Select how you'll use Google Analytics:
   - ✅ Measure advertising ROI
   - ✅ Examine user behavior
   - ✅ Get baseline reports
4. Click **"Create"**
5. Accept Terms of Service

### Step 4: Set Up Data Stream

1. Select platform: **Web**
2. Website URL: `https://yourdomain.com` (or your actual domain)
3. Stream name: `Job Club Main Site`
4. Click **"Create stream"**

### Step 5: Get Measurement ID

1. You'll see your **Measurement ID** at the top right
2. Format: `G-XXXXXXXXXX` (10 characters after G-)
3. **Copy this ID** - you'll need it next

Example: `G-1A2B3C4D5E`

### Step 6: Add to Your Site

Edit `src/_data/site.json`:

```json
{
  "googleAnalytics": "G-1A2B3C4D5E"
}
```

Replace `G-1A2B3C4D5E` with your actual Measurement ID from Step 5.

### Step 7: Rebuild and Deploy

```bash
npm run build
# Deploy to your hosting platform
```

### Step 8: Verify Tracking

1. Visit your deployed website
2. Go back to Google Analytics
3. Navigate to: **Reports** → **Realtime** → **Overview**
4. You should see yourself as an active user!
5. Perform actions (click events, filters, etc.) and watch them appear

---

## Important Settings to Configure

### Enhanced Measurement (Auto-tracking)

1. In GA4, go to: **Admin** → **Data Streams** → Your stream
2. Click **"Enhanced measurement"**
3. Enable these (most are on by default):
   - ✅ Page views
   - ✅ Scrolls
   - ✅ Outbound clicks
   - ✅ Site search
   - ✅ Video engagement
   - ✅ File downloads

### Data Retention

1. Go to: **Admin** → **Data Settings** → **Data Retention**
2. Set to: **14 months** (maximum for free tier)
3. Turn ON: **"Include advertising identifiers"** (optional)

### Google Signals

1. Go to: **Admin** → **Data Settings** → **Data Collection**
2. Enable **"Google signals data collection"**
3. This enables cross-device tracking and demographic reports

---

## Custom Events Setup (Optional)

Our custom events are automatically tracked, but you can create custom dimensions in GA4 for better reporting.

### Create Custom Dimensions

1. Go to: **Admin** → **Custom Definitions** → **Custom Dimensions**
2. Click **"Create custom dimension"**
3. Add these dimensions:

| Dimension Name | Scope | Event Parameter | Description                            |
| -------------- | ----- | --------------- | -------------------------------------- |
| Event Slug     | Event | `event_slug`    | URL slug of the event                  |
| Event Type     | Event | `event_type`    | Type of event (workshop, meetup, etc.) |
| Filter Type    | Event | `filter_type`   | Filter selected by user                |
| Share Method   | Event | `method`        | How event was shared                   |
| Link Type      | Event | `link_type`     | Type of link clicked                   |

### Create Custom Metrics

1. Go to: **Admin** → **Custom Definitions** → **Custom Metrics**
2. Click **"Create custom metric"**

| Metric Name  | Scope | Event Parameter | Unit     |
| ------------ | ----- | --------------- | -------- |
| Result Count | Event | `result_count`  | Standard |

---

## Recommended Reports

### 1. Events Overview Report

**Path:** Reports → Engagement → Events

**What to look for:**

- Total event counts
- Most popular custom events
- Event conversion funnels

### 2. Custom Event Performance

**Create a new report:**

1. Go to **Explore**
2. Choose **"Blank"** template
3. Add dimensions:
   - Event name
   - Event slug (custom dimension)
   - Event type (custom dimension)
4. Add metrics:
   - Event count
   - Total users
   - Engaged sessions
5. Apply filters for your custom events

### 3. Real-time Events

**Path:** Reports → Realtime → Overview

**Perfect for:**

- Testing your tracking setup
- Watching live user activity
- Debugging issues

---

## Troubleshooting

### Events not showing up?

1. **Check Measurement ID**
   - Verify ID in `site.json` matches GA4
   - Format should be `G-XXXXXXXXXX`

2. **Check Browser Console**
   - Open DevTools → Console
   - Look for `[Analytics]` logs (localhost only)
   - Check for JavaScript errors

3. **Check gtag.js Loading**
   - Open DevTools → Network tab
   - Filter for `gtag`
   - Verify script loads successfully

4. **Wait for Processing**
   - Real-time: Shows immediately
   - Standard reports: Can take 24-48 hours

### No data in reports?

1. **Check date range** in reports (top right)
2. Ensure you're looking at the correct property
3. Verify your site is live and receiving traffic
4. Check Data Retention settings

### Consent issues?

1. Open DevTools → Console
2. Check `localStorage.getItem('analytics_consent')`
3. Should be `'true'` or `null` (default allow)
4. If `'false'`, clear and reload

---

## Privacy Compliance

### Current Setup:

✅ IP anonymization enabled  
✅ Consent mode configured  
✅ No tracking until consent (default: denied)  
✅ SameSite cookies configured

### Still Need:

❌ Cookie consent banner  
❌ Privacy policy update  
❌ Terms of service

### Recommended Cookie Banner Libraries:

- [Cookie Consent](https://www.cookieconsent.com/)
- [Osano Cookie Consent](https://github.com/osano/cookieconsent)
- [CookieYes](https://www.cookieyes.com/)

---

## Testing Checklist

- [ ] Measurement ID added to `site.json`
- [ ] Site rebuilt and deployed
- [ ] Visit site in incognito window
- [ ] Check Real-time reports - see yourself as active user
- [ ] Click event "Learn More" - verify event tracked
- [ ] Click "Register" - verify event tracked
- [ ] Download calendar - verify event tracked
- [ ] Use filters - verify event tracked
- [ ] Share event - verify event tracked
- [ ] Check events show in GA4 after 5-10 minutes
- [ ] Create custom dimensions for better reporting
- [ ] Set up custom dashboard for events metrics

---

## Next Steps

1. **Set up email reports**
   - Admin → Property → Email Reports
   - Get weekly/monthly summaries

2. **Connect Google Search Console**
   - Admin → Product Links → Search Console Links
   - See which searches bring users

3. **Set up conversion goals**
   - Admin → Conversions
   - Mark important events as conversions

4. **Create audience segments**
   - Admin → Audiences
   - Target engaged event visitors

5. **Enable BigQuery export** (optional)
   - For advanced analysis
   - Free tier: up to 1M events/day

---

## Support Resources

- [GA4 Help Center](https://support.google.com/analytics)
- [GA4 Academy](https://analytics.google.com/analytics/academy/)
- [GA4 Dimensions & Metrics](https://support.google.com/analytics/answer/9143382)
- [Event Tracking Best Practices](https://support.google.com/analytics/answer/9322688)

---

**Estimated Setup Time:** 5-10 minutes  
**Cost:** Free (up to 10M events/month)  
**Difficulty:** Easy ⭐

Ready to track your events! 🎉
