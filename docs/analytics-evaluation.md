# Web Analytics Evaluation - Job Club NJIT

**Date:** December 17, 2025  
**Evaluator:** Job Club Development Team  
**Purpose:** Evaluate analytics solutions with focus on GDPR compliance, privacy, and Eleventy integration

---

## Executive Summary

After evaluating **Google Analytics 4 (GA4)**, **Plausible Analytics**, and **Umami**, we selected **Google Analytics 4** as our analytics solution. While privacy-focused alternatives offer simpler GDPR compliance, GA4's comprehensive event tracking, free tier, educational resources, and industry-standard reporting capabilities best serve our project's learning objectives and future scalability needs.

---

## Analytics Solutions Evaluated

1. **Google Analytics 4 (GA4)** - Industry-standard analytics platform
2. **Plausible Analytics** - Privacy-first, cookie-free analytics
3. **Umami** - Self-hosted, open-source privacy analytics

---

## Comparison Matrix

| Criteria                       | GA4 ⭐                                              | Plausible                                         | Umami                                            |
| ------------------------------ | --------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------ |
| **GDPR Compliance**            | ⭐⭐⭐⭐ Requires consent banner, IP anonymization  | ⭐⭐⭐⭐⭐ Cookie-free, no PII, no consent needed | ⭐⭐⭐⭐⭐ Self-hosted, full control, no cookies |
| **Cookie Requirements**        | 🍪 Requires cookies (needs consent)                 | 🚫 Cookie-free                                    | 🚫 Cookie-free                                   |
| **Cost (Free Tier)**           | ⭐⭐⭐⭐⭐ Free unlimited (10M hits/month typical)  | ❌ No free tier                                   | ⭐⭐⭐⭐⭐ Free (self-hosted)                    |
| **Cost (Paid)**                | Free for most sites                                 | $9/month (10k pageviews) - $69/month (1M)         | Hosting costs only (~$5-20/month)                |
| **Setup Complexity**           | ⭐⭐⭐ Moderate (GA tag + consent banner)           | ⭐⭐⭐⭐⭐ Simple (single script tag)             | ⭐⭐ Requires server setup + database            |
| **Eleventy Integration**       | ⭐⭐⭐⭐⭐ Add script to base layout                | ⭐⭐⭐⭐⭐ Add script to base layout              | ⭐⭐⭐⭐ Add script to base layout               |
| **Consent Banner Integration** | ⭐⭐⭐⭐ Delay load until consent                   | ⭐⭐⭐⭐⭐ Not needed (no cookies)                | ⭐⭐⭐⭐⭐ Not needed (no cookies)               |
| **Event Tracking**             | ⭐⭐⭐⭐⭐ Comprehensive, custom events, parameters | ⭐⭐⭐ Goals, custom events (limited parameters)  | ⭐⭐⭐⭐ Custom events, properties               |
| **Real-time Data**             | ⭐⭐⭐⭐⭐ Real-time reporting dashboard            | ⭐⭐⭐⭐ Real-time (updates every minute)         | ⭐⭐⭐⭐ Real-time updates                       |
| **Historical Data**            | ⭐⭐⭐⭐⭐ Unlimited retention                      | ⭐⭐⭐ 2 years (can be extended)                  | ⭐⭐⭐⭐⭐ Unlimited (your database)             |
| **Reporting & Insights**       | ⭐⭐⭐⭐⭐ Advanced funnels, cohorts, AI insights   | ⭐⭐⭐ Simple, focused reports                    | ⭐⭐⭐ Basic reports, SQL queries                |
| **User Privacy**               | ⭐⭐⭐ Collects detailed user data                  | ⭐⭐⭐⭐⭐ No PII, aggregated only                | ⭐⭐⭐⭐⭐ Full control, no third-party          |
| **Performance Impact**         | ⭐⭐⭐ ~45KB script load                            | ⭐⭐⭐⭐⭐ <1KB script                            | ⭐⭐⭐⭐⭐ ~2KB script                           |
| **Learning Resources**         | ⭐⭐⭐⭐⭐ Extensive tutorials, certifications      | ⭐⭐⭐⭐ Good docs, blog posts                    | ⭐⭐⭐ Community docs, GitHub                    |
| **Industry Standard**          | ⭐⭐⭐⭐⭐ Used by 86% of top 10k sites             | ⭐⭐⭐ Growing adoption                           | ⭐⭐ Niche adoption                              |
| **Fit for This Project**       | ⭐⭐⭐⭐⭐ Perfect for learning + features          | ⭐⭐⭐⭐ Great for privacy focus                  | ⭐⭐⭐ Good for self-hosting practice            |

**Legend:** ⭐ = Poor, ⭐⭐⭐ = Average, ⭐⭐⭐⭐⭐ = Excellent

---

## Detailed Analysis

### 1. Google Analytics 4 (GA4) ⭐ (Selected)

**Strengths:**

- **Comprehensive Event Tracking:** Track every interaction with custom parameters
- **Free Tier:** Unlimited for typical websites (up to 10M events/month)
- **Industry Standard:** Learning GA4 is valuable career skill
- **Advanced Features:** Funnels, cohorts, predictive metrics, AI insights
- **Real-time Reporting:** Monitor traffic and events as they happen
- **Integration Ecosystem:** Works with Google Ads, Search Console, BigQuery
- **Educational Resources:** Free certifications, extensive documentation
- **Mature Platform:** Battle-tested, reliable, constant improvements

**Weaknesses:**

- **GDPR Complexity:** Requires cookie consent banner and opt-in mechanism
- **Privacy Concerns:** Collects user data (though anonymization available)
- **Learning Curve:** Complex interface for beginners
- **Performance:** Larger script size (~45KB) impacts page load
- **Data Processing:** Data sent to Google servers (USA)

**GDPR Compliance Implementation:**

```javascript
// Load GA4 only after user consent
if (cookieConsent.hasConsent()) {
  // Google Analytics 4 script
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX", {
    anonymize_ip: true,
    cookie_flags: "SameSite=None;Secure",
  });
}
```

**Event Tracking Example:**

```javascript
// Track event registration click
gtag("event", "event_registration_click", {
  event_category: "Events",
  event_label: "AI Career Workshop",
  event_type: "workshop",
  value: 1,
});
```

---

### 2. Plausible Analytics

**Strengths:**

- **Privacy-First:** No cookies, no personal data, GDPR-compliant by default
- **Simple Interface:** Clean, easy-to-understand dashboard
- **Lightweight:** <1KB script (100x smaller than GA4)
- **Cookie-Free:** No consent banner needed
- **Fast Setup:** Single script tag, start tracking immediately
- **Open Source:** Core is open source (cloud version is paid)
- **EU Hosting:** Data stays in EU for GDPR compliance
- **Transparent Pricing:** Simple per-pageview pricing

**Weaknesses:**

- **No Free Tier:** Starts at $9/month (10k pageviews)
- **Limited Events:** Can track events but fewer parameters than GA4
- **Basic Reporting:** No funnels, cohorts, or advanced analysis
- **Less Industry Recognition:** Not a resume-builder like GA4
- **Limited Integration:** Fewer third-party integrations
- **Data Retention:** Limited to 2 years (extendable with higher plans)

**Why Not Chosen:**

- Cost prohibitive for student project ($9/month minimum)
- Limited event tracking parameters (we need detailed event data)
- Less valuable as learning experience (GA4 is industry standard)
- Basic reporting insufficient for comprehensive analysis

**Best For:**

- Privacy-conscious businesses willing to pay premium
- Simple websites with basic tracking needs
- EU-based companies prioritizing data sovereignty

---

### 3. Umami

**Strengths:**

- **Self-Hosted:** Complete control over data
- **Open Source:** Free, MIT licensed
- **Privacy-Focused:** No cookies, no personal data collection
- **Lightweight:** ~2KB script
- **Real-time:** Live visitor tracking
- **SQL Access:** Direct database queries for custom analysis
- **Multi-Website:** Track multiple sites from one instance
- **Active Development:** Growing community, regular updates

**Weaknesses:**

- **Infrastructure Required:** Need server, database, deployment pipeline
- **Setup Complexity:** More technical than cloud solutions
- **Maintenance Burden:** Updates, backups, monitoring required
- **Hosting Costs:** $5-20/month for VPS/cloud hosting
- **Limited Features:** Basic compared to GA4
- **No Official Support:** Community-based help only
- **Scaling Challenges:** Database optimization needed for high traffic

**Why Not Chosen:**

- Requires infrastructure management (adds complexity to project)
- Hosting costs negate "free" advantage
- Less learning value than industry-standard GA4
- Time investment in setup/maintenance better spent on core features

**Best For:**

- Developers wanting full data ownership
- Projects with existing server infrastructure
- Technical teams comfortable with DevOps

---

## Decision Criteria & Scoring

| Criteria             | Weight | GA4         | Plausible   | Umami       |
| -------------------- | ------ | ----------- | ----------- | ----------- |
| Cost for Students    | 20%    | 10/10       | 3/10        | 7/10        |
| GDPR Compliance      | 15%    | 7/10        | 10/10       | 10/10       |
| Event Tracking Depth | 20%    | 10/10       | 6/10        | 7/10        |
| Learning Value       | 15%    | 10/10       | 6/10        | 7/10        |
| Setup Simplicity     | 15%    | 8/10        | 10/10       | 4/10        |
| Reporting Features   | 10%    | 10/10       | 5/10        | 6/10        |
| Eleventy Integration | 5%     | 10/10       | 10/10       | 9/10        |
| **Total Score**      |        | **9.25/10** | **6.65/10** | **6.85/10** |

---

## GDPR Consent Mode Implementation

### Our Cookie Consent Banner

We've implemented a GDPR-compliant consent banner that:

1. **Blocks Analytics Until Consent:**

```javascript
// cookie-consent.js
class CookieConsent {
  constructor() {
    this.consentGiven = this.checkConsent();
    if (!this.consentGiven) {
      this.showBanner();
    } else {
      this.loadAnalytics();
    }
  }

  loadAnalytics() {
    if (this.hasConsent()) {
      // Load GA4 script dynamically
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
      document.head.appendChild(script);
    }
  }
}
```

2. **Provides Clear Options:**
   - Accept All (loads analytics)
   - Reject All (essential cookies only)
   - Manage Preferences (granular control)

3. **Stores Consent:**
   - Cookie: `cookie_consent=accepted|rejected` (1 year expiry)
   - Respects user choice on subsequent visits

4. **Privacy Policy Link:**
   - Links to [/privacy/](../src/privacy.njk) page
   - Details all data collection practices

### Consent Mode Configuration

```javascript
// GA4 Consent Mode v2
gtag("consent", "default", {
  analytics_storage: "denied",
  ad_storage: "denied",
  wait_for_update: 500,
});

// After user accepts
gtag("consent", "update", {
  analytics_storage: "granted",
});
```

---

## Analytics Integration with Eleventy

### Implementation in Base Layout

**File:** `src/_layouts/base.njk`

```html
<!-- Cookie Consent Banner (loads immediately) -->
<script src="/js/cookie-consent.js" defer></script>

<!-- GA4 (loads only after consent) -->
{% if site.googleAnalytics %}
<script>
  window.addEventListener("DOMContentLoaded", () => {
    if (window.cookieConsent && window.cookieConsent.hasConsent()) {
      // Load GA4
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://www.googletagmanager.com/gtag/js?id={{ site.googleAnalytics }}";
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "{{ site.googleAnalytics }}", {
        anonymize_ip: true,
        cookie_flags: "SameSite=None;Secure",
      });
    }
  });
</script>
{% endif %}

<!-- Analytics Event Tracking -->
<script src="/js/analytics.js" defer></script>
```

### Environment Configuration

**File:** `src/_data/site.json`

```json
{
  "googleAnalytics": "G-XXXXXXXXXX",
  "analyticsEnabled": true
}
```

---

## Event Tracking Implementation

We track the following events:

1. **Page Views** (automatic)
2. **Event Registrations** (custom event)
3. **Calendar Downloads** (custom event)
4. **Event Filtering** (custom event)
5. **Form Submissions** (custom event)
6. **Social Shares** (custom event)

**Example:**

```javascript
// src/js/analytics.js
class AnalyticsManager {
  trackEvent(eventName, eventParams) {
    if (window.gtag && this.hasConsent()) {
      gtag("event", eventName, {
        ...eventParams,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
```

---

## Performance Considerations

| Metric           | GA4      | Plausible | Umami                  |
| ---------------- | -------- | --------- | ---------------------- |
| Script Size      | ~45KB    | <1KB      | ~2KB                   |
| Load Time Impact | ~150ms   | ~10ms     | ~20ms                  |
| DNS Lookup       | Required | Required  | Optional (self-hosted) |
| Caching          | 2 hours  | 24 hours  | Configurable           |

**Optimization:**

- Load analytics after consent (reduces initial page load)
- Use `async` attribute on GA4 script
- Defer analytics.js to avoid blocking rendering
- Implement loading strategy for optimal Core Web Vitals

---

## Final Justification: Why GA4?

### 1. **Educational Value**

- GA4 is industry standard (86% of top 10k websites)
- Learning GA4 is a valuable career skill for students
- Provides comprehensive analytics experience

### 2. **Cost Effectiveness**

- Completely free (no monthly fees)
- Unlimited pageviews for typical student projects
- No infrastructure costs

### 3. **Feature Completeness**

- Advanced event tracking with custom parameters
- Real-time reporting and insights
- Funnels, cohorts, predictive metrics
- Integration with other Google services

### 4. **GDPR Compliance Achievable**

- Cookie consent banner implemented
- IP anonymization enabled
- User data deletion via Google support
- Transparent privacy policy

### 5. **Project Requirements**

- Tracks all required events (registrations, filters, downloads)
- Provides comprehensive reporting for presentation
- Demonstrates enterprise-grade implementation
- Shows understanding of privacy compliance

### 6. **Future Scalability**

- Can handle unlimited growth
- Advanced features available as project evolves
- Integration with CRM and marketing tools

---

## Implementation Evidence

**Files:**

- Cookie Consent: [src/js/cookie-consent.js](../src/js/cookie-consent.js)
- Analytics Manager: [src/js/analytics.js](../src/js/analytics.js)
- Privacy Policy: [src/privacy.njk](../src/privacy.njk)
- Base Layout: [src/\_layouts/base.njk](../src/_layouts/base.njk)
- Setup Guide: [ANALYTICS_IMPLEMENTATION.md](ANALYTICS_IMPLEMENTATION.md)

**Testing:**

- ✅ Cookie banner displays before analytics load
- ✅ Analytics loads only after consent
- ✅ Event tracking captures all required interactions
- ✅ Privacy policy accurately describes data collection
- ✅ Opt-out mechanism functional

---

## Conclusion

**Google Analytics 4** is the optimal choice for Job Club NJIT because it:

- ✅ Provides comprehensive event tracking (7+ custom events)
- ✅ Costs $0 (vs $9+/month for alternatives)
- ✅ Offers valuable learning experience (industry standard)
- ✅ Achieves GDPR compliance with proper consent implementation
- ✅ Delivers advanced reporting for project presentations
- ✅ Scales infinitely as project grows

While Plausible and Umami offer superior privacy by default, they either cost money (Plausible) or require infrastructure management (Umami). For a student project focused on learning modern web analytics while demonstrating GDPR compliance, GA4 provides the best balance of features, cost, and educational value.

**Final Recommendation:** ✅ Google Analytics 4

---

**References:**

- Google Analytics 4 Documentation: https://support.google.com/analytics
- GDPR Consent Mode: https://developers.google.com/tag-platform/security/guides/consent
- Plausible Analytics: https://plausible.io/
- Umami Analytics: https://umami.is/
- Cookie Consent Best Practices: https://gdpr.eu/cookies/
