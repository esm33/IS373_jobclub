/**
 * Local Development Server for Job Club
 * Handles API routes for local testing before deployment
 * This supplements Eleventy's static server with backend functionality
 */

import http from 'http';
import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Check for required environment variables
if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_WRITE_TOKEN) {
  console.error('❌ Missing required environment variables:');
  console.error('   - SANITY_PROJECT_ID: ' + (process.env.SANITY_PROJECT_ID ? '✓' : '✗'));
  console.error('   - SANITY_DATASET: ' + (process.env.SANITY_DATASET ? '✓' : '✗'));
  console.error('   - SANITY_WRITE_TOKEN: ' + (process.env.SANITY_WRITE_TOKEN ? '✓' : '✗'));
  console.error('\n📝 Please add these to .env.local file');
  process.exit(1);
}

// Initialize Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
});

const PORT = 3002;

// Helper function to parse request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch (e) {
        reject(e);
      }
    });
  });
}

// Validate URL
function validateUrl(url, expectedDomain = null) {
  if (!url || url.trim() === '') {
    return { valid: false, message: 'URL is required' };
  }
  
  try {
    const urlObj = new URL(url);
    
    if (expectedDomain && !urlObj.hostname.includes(expectedDomain)) {
      return { 
        valid: false, 
        message: `URL should be from ${expectedDomain}` 
      };
    }
    
    return { valid: true, url: url.trim() };
  } catch (error) {
    return { valid: false, message: 'Invalid URL format' };
  }
}

// Detect missing prerequisites
function detectMissingPrerequisites(data) {
  const flags = {
    missingLinkedIn: false,
    missingGitHub: false,
    missingWebsite: false,
    missingCalendly: false,
  };
  
  const missingItems = [];
  
  const linkedinCheck = validateUrl(data.linkedinUrl, 'linkedin.com');
  if (!linkedinCheck.valid) {
    flags.missingLinkedIn = true;
    missingItems.push({
      field: 'LinkedIn',
      issue: linkedinCheck.message,
    });
  }
  
  const githubCheck = validateUrl(data.githubUrl, 'github.com');
  if (!githubCheck.valid) {
    flags.missingGitHub = true;
    missingItems.push({
      field: 'GitHub',
      issue: githubCheck.message,
    });
  }
  
  const websiteCheck = validateUrl(data.websiteUrl);
  if (!websiteCheck.valid) {
    flags.missingWebsite = true;
    missingItems.push({
      field: 'Personal Website',
      issue: websiteCheck.message,
    });
  }
  
  const calendlyCheck = validateUrl(data.calendlyUrl, 'calendly.com');
  if (!calendlyCheck.valid) {
    flags.missingCalendly = true;
    missingItems.push({
      field: 'Calendly',
      issue: calendlyCheck.message,
    });
  }
  
  return { flags, missingItems };
}

// Handle onboarding submission
async function handleOnboarding(req, res, data) {
  try {
    // Validate required fields
    const requiredFields = ['name', 'email', 'major', 'graduationYear', 'careerGoal'];
    
    for (const field of requiredFields) {
      if (!data[field] || data[field].toString().trim() === '') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: `${field} is required`,
        }));
        return;
      }
    }
    
    console.log(`📝 Processing onboarding for: ${data.name}`);
    
    // Detect missing prerequisites
    const { flags, missingItems } = detectMissingPrerequisites(data);
    
    // Prepare member profile document for Sanity
    const memberProfile = {
      _type: 'memberProfile',
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      major: data.major.trim(),
      graduationYear: parseInt(data.graduationYear),
      linkedinUrl: data.linkedinUrl?.trim() || '',
      githubUrl: data.githubUrl?.trim() || '',
      websiteUrl: data.websiteUrl?.trim() || '',
      calendlyUrl: data.calendlyUrl?.trim() || '',
      careerGoal: data.careerGoal.trim(),
      onboardingStatus: 'new',
      ...flags,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Save to Sanity CMS
    console.log('💾 Saving to Sanity CMS...');
    const result = await client.create(memberProfile);
    console.log(`✅ Saved successfully! Document ID: ${result._id}`);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      message: 'Profile submitted successfully',
      memberId: result._id,
      missingItems: missingItems.length > 0 ? missingItems : null,
      hasAllPrerequisites: missingItems.length === 0,
    }));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: false,
      error: 'Failed to submit profile',
      details: error.message,
    }));
  }
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS for CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Route: POST /api/submit-onboarding
  if (req.method === 'POST' && req.url === '/api/submit-onboarding') {
    const data = await parseBody(req);
    await handleOnboarding(req, res, data);
    return;
  }
  
  // Route not found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    error: 'Not found',
    availableRoutes: ['/api/submit-onboarding']
  }));
});

// Start server
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  Job Club API Server                       ║
║  🚀 Running on http://localhost:${PORT}     ║
║                                            ║
║  Available routes:                         ║
║  POST /api/submit-onboarding               ║
║                                            ║
║  Using Sanity project:                     ║
║  ${process.env.SANITY_PROJECT_ID || 'NOT CONFIGURED'}  ║
╚════════════════════════════════════════════╝
  `);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    process.exit(1);
  } else {
    throw error;
  }
});
