# Airtable Setup for Job Club Onboarding

## Airtable Base Structure

### Table: Member Profiles

Create a new base called "Job Club NJIT" with a table "Member Profiles" containing these fields:

| Field Name                | Field Type         | Options/Notes                                      |
| ------------------------- | ------------------ | -------------------------------------------------- |
| **Name**                  | Single line text   | Primary field                                      |
| **Email**                 | Email              | Unique identifier                                  |
| **Major**                 | Single line text   |                                                    |
| **Graduation Year**       | Single select      | Options: 2025, 2026, 2027, 2028, 2029              |
| **Career Goal**           | Long text          | Allow rich text formatting                         |
| **LinkedIn URL**          | URL                |                                                    |
| **GitHub URL**            | URL                |                                                    |
| **Website URL**           | URL                |                                                    |
| **Calendly URL**          | URL                |                                                    |
| **Onboarding Status**     | Single select      | Options: New, In Progress, Completed               |
| **Missing LinkedIn**      | Checkbox           |                                                    |
| **Missing GitHub**        | Checkbox           |                                                    |
| **Missing Website**       | Checkbox           |                                                    |
| **Missing Calendly**      | Checkbox           |                                                    |
| **Has All Prerequisites** | Checkbox           | Auto-checked if all URLs valid                     |
| **Missing Items Count**   | Number             | Count of missing items                             |
| **Submitted At**          | Date & Time        |                                                    |
| **Last Updated**          | Last modified time | Auto-generated                                     |
| **Notes**                 | Long text          | For admin use                                      |
| **Tags**                  | Multiple select    | Options: Needs Help, Contacted, Office Hours, etc. |

## Zapier Field Mapping

In your Zapier "Create Record" action for Airtable:

### Basic Information

- **Name** → `1. Name` (from webhook)
- **Email** → `1. Email`
- **Major** → `1. Major`
- **Graduation Year** → `1. Graduation Year`
- **Career Goal** → `1. Career Goal`

### URLs

- **LinkedIn URL** → `1. Linkedin Url` (check the exact field name from webhook)
- **GitHub URL** → `1. Github Url`
- **Website URL** → `1. Website Url`
- **Calendly URL** → `1. Calendly Url`

### Status & Tracking

- **Onboarding Status** → Set to "New" (static value)
- **Submitted At** → `1. Submitted At`

### Missing Prerequisites (Use Zapier Formatter)

You'll need to check if missingItems exists and what it contains:

**Option 1: Simple Check (Recommended)**

1. Add a "Formatter by Zapier" step before Airtable
2. Choose "Utilities" → "Line Item to Text"
3. Input: `1. Missing Items Field` (from webhook)
4. Map the result to determine which checkboxes to set

**Option 2: Using Paths**

1. After webhook, add "Paths by Zapier"
2. Create paths for each missing item combination
3. Each path creates Airtable record with appropriate checkboxes

## Simplified Zapier Setup

### Step 1: Webhook Trigger ✅

Already configured: `https://hooks.zapier.com/hooks/catch/25364210/ufk1n3z/`

### Step 2: Create Airtable Record

**Base**: Job Club NJIT  
**Table**: Member Profiles

**Field Mappings:**

```
Name: {{1. Name}}
Email: {{1. Email}}
Major: {{1. Major}}
Graduation Year: {{1. Graduation Year}}
Career Goal: {{1. Career Goal}}
LinkedIn URL: {{1. Linkedin Url}}
GitHub URL: {{1. Github Url}}
Website URL: {{1. Website Url}}
Calendly URL: {{1. Calendly Url}}
Onboarding Status: New
Submitted At: {{1. Submitted At}}
```

**For Missing Items** (if missingItems array exists):

```
Missing Items Count: {{1. Missing Items__count}}
Has All Prerequisites: (leave unchecked if Missing Items exists)
```

### Step 3: Send Email (Optional)

You can add an email step after Airtable to send the welcome/incomplete email.

## Alternative: Use Airtable Automation

Instead of sending email from Zapier, you can use Airtable's built-in automation:

1. **Trigger**: When record created
2. **Condition**: Check "Missing Items Count" > 0
3. **Action**: Send email with personalized checklist

## Airtable Views

Create these views for easy management:

### 1. All Members

- Sort by: Submitted At (newest first)
- Group by: Onboarding Status

### 2. New This Week

- Filter: Submitted At is within "this week"
- Sort: Submitted At (newest first)

### 3. Missing Prerequisites

- Filter: Has All Prerequisites is not checked
- Group by: Missing Items Count

### 4. Complete Profiles

- Filter: Has All Prerequisites is checked
- Sort: Submitted At (newest first)

### 5. Needs Follow-up

- Filter: Onboarding Status is "In Progress"
- Sort: Last Updated (oldest first)

## Extracting Missing Items in Zapier

To properly set the missing checkboxes, add a **Code by Zapier** step:

**Language**: JavaScript

**Input Data:**

- `missingItems`: `1. Missing Items` (from webhook)

**Code:**

```javascript
const missingItems = inputData.missingItems || [];

// Initialize all as false
let output = {
  missingLinkedIn: false,
  missingGitHub: false,
  missingWebsite: false,
  missingCalendly: false,
  missingCount: 0,
  hasAllPrerequisites: true,
};

// Check if missingItems is an array
if (Array.isArray(missingItems) && missingItems.length > 0) {
  output.missingCount = missingItems.length;
  output.hasAllPrerequisites = false;

  missingItems.forEach((item) => {
    const field = item.field || "";

    if (field.includes("LinkedIn")) {
      output.missingLinkedIn = true;
    } else if (field.includes("GitHub")) {
      output.missingGitHub = true;
    } else if (field.includes("Website")) {
      output.missingWebsite = true;
    } else if (field.includes("Calendly")) {
      output.missingCalendly = true;
    }
  });
}

// Return as individual values for Zapier
return output;
```

**Output:**

- `missingLinkedIn` → Map to **Missing LinkedIn** checkbox
- `missingGitHub` → Map to **Missing GitHub** checkbox
- `missingWebsite` → Map to **Missing Website** checkbox
- `missingCalendly` → Map to **Missing Calendly** checkbox
- `missingCount` → Map to **Missing Items Count**
- `hasAllPrerequisites` → Map to **Has All Prerequisites**

## Testing Your Zap

1. **Test webhook** with the curl command (already done ✅)
2. **Check Zapier history** to see if data was received
3. **Check Airtable** to see if record was created
4. **Verify all fields** are mapped correctly
5. **Test with different scenarios**:
   - Complete profile (no missing items)
   - Incomplete profile (with missing items)

## Airtable Formulas (Optional Enhancements)

### Formula: Profile Completion Percentage

```
IF(
  {Missing Items Count} = 0,
  "100%",
  ROUND((4 - {Missing Items Count}) / 4 * 100) & "%"
)
```

### Formula: Days Since Submission

```
DATETIME_DIFF(NOW(), {Submitted At}, 'days')
```

### Formula: Follow-up Status

```
IF(
  AND({Onboarding Status} = "In Progress", DATETIME_DIFF(NOW(), {Last Updated}, 'days') > 7),
  "⚠️ Needs Follow-up",
  "✅ On Track"
)
```

## Integration with Discord

After Airtable step, add Discord webhook:

**Webhook URL**: (Add to `.env.local`)

**Message Body** (JSON):

```json
{
  "content": "📢 **New member joined Job Club!**",
  "embeds": [
    {
      "title": "🎉 New Member: {{Name}}",
      "color": 6770852,
      "fields": [
        {
          "name": "👤 Name",
          "value": "{{Name}}",
          "inline": true
        },
        {
          "name": "📧 Email",
          "value": "{{Email}}",
          "inline": true
        },
        {
          "name": "🎓 Major",
          "value": "{{Major}}",
          "inline": true
        },
        {
          "name": "📅 Graduation",
          "value": "{{Graduation Year}}",
          "inline": true
        },
        {
          "name": "🎯 Career Goal",
          "value": "{{Career Goal}}"
        }
      ],
      "timestamp": "{{Submitted At}}",
      "footer": {
        "text": "Job Club NJIT"
      }
    }
  ]
}
```

## Quick Checklist

- [ ] Create Airtable base "Job Club NJIT"
- [ ] Add all fields to "Member Profiles" table
- [ ] Configure Zapier webhook trigger ✅
- [ ] Add "Code by Zapier" step for missing items
- [ ] Configure Airtable "Create Record" action
- [ ] Map all fields correctly
- [ ] Add Discord webhook (optional)
- [ ] Test with sample data
- [ ] Turn on Zap
- [ ] Monitor first submissions

## Advantages of Airtable over Sanity

✅ **No coding required** - Visual interface  
✅ **Built-in automation** - Email directly from Airtable  
✅ **Easy collaboration** - Share with team  
✅ **Powerful views & filters** - Track member progress  
✅ **Forms integration** - Can create forms directly in Airtable  
✅ **Mobile app** - Manage on the go

You can still use Sanity CMS if you want more control over the data structure, or use both together!
