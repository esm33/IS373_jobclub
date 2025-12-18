# Sanity Token Permission Issue - Fix Guide

## Problem

When testing form submission, you see this error:

```
Failed to submit profile: Insufficient permissions; permission "create" required
```

## Root Cause

Your Sanity write token doesn't have the correct permissions to create documents. This usually happens when:

1. Token was created with **"Viewer"** permissions (read-only) instead of **"Editor"**
2. Token permissions were changed/restricted after creation
3. Token is valid but for a different operation (like webhook tokens)

## Solution

### Step 1: Check Current Token Permissions

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click on **job-club-njit** project
3. Go to Settings → **API**
4. Scroll to **"Tokens"** section
5. Find your token and check the **Permissions** column

The token should show: **"Editor"** (allows read + write + delete)

### Step 2: Regenerate Token with Correct Permissions

If the token has wrong permissions:

**Option A: Delete and Recreate**

1. In the Tokens section, click the **trash icon** to delete the old token
2. Click **"Add API token"**
3. **Token name:** `job-club-write-token`
4. **Permissions:** Select **"Editor"** from the dropdown
5. Click **"Save"**
6. **Copy the new token** (it won't be shown again!)

**Option B: Update Token Permissions**

1. If your token is still listed, click on it
2. Edit the **Permissions** field to **"Editor"**
3. Click **"Save"**

### Step 3: Update `.env.local`

Replace your old token with the new one:

```bash
SANITY_PROJECT_ID=2nqkaqwe
SANITY_DATASET=production
SANITY_WRITE_TOKEN=skE0h4f2TbWNSsAhUQ9rXnJDvVZKFJFi6Qv2...  # Replace with new token
```

### Step 4: Restart Dev Server

1. Stop the dev server (Ctrl+C)
2. Start it again:
   ```bash
   node dev-server.js
   ```

### Step 5: Test Again

1. Go to http://localhost:8080/onboarding/
2. Click **Submit**
3. You should see **"Success!"** message
4. Check Sanity project to see the saved data

---

## Sanity Token Permissions Explained

| Permission | Read | Write | Delete | Notes                              |
| ---------- | ---- | ----- | ------ | ---------------------------------- |
| **Viewer** | ✓    | ✗     | ✗      | Read-only, can't create documents  |
| **Editor** | ✓    | ✓     | ✓      | Can create, edit, delete documents |
| **Custom** | ✓    | ✓     | ✗      | Can create/edit but not delete     |

For Job Club, you need **"Editor"** permissions to save member profiles.

---

## Verification Checklist

- [ ] Sanity token shows "Editor" permissions in dashboard
- [ ] `.env.local` has the new token value
- [ ] Dev server restarted
- [ ] Form submits and shows success message
- [ ] New member appears in Sanity project

---

_Last Updated: December 13, 2025_
