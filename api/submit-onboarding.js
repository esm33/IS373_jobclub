/**
 * Serverless function to handle onboarding form submissions
 * This can be deployed to Vercel, Netlify, or similar platforms
 */

import { createClient } from '@sanity/client';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
});

/**
 * Validate URL and check if it exists
 */
function validateUrl(url, expectedDomain = null) {
  if (!url || url.trim() === '') {
    return { valid: false, message: 'URL is required' };
  }
  
  try {
    const urlObj = new URL(url);
    
    // Check for expected domain if provided
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

/**
 * Detect missing prerequisites
 */
function detectMissingPrerequisites(data) {
  const flags = {
    missingLinkedIn: false,
    missingGitHub: false,
    missingWebsite: false,
    missingCalendly: false,
  };
  
  const missingItems = [];
  
  // Validate LinkedIn
  const linkedinCheck = validateUrl(data.linkedinUrl, 'linkedin.com');
  if (!linkedinCheck.valid) {
    flags.missingLinkedIn = true;
    missingItems.push({
      field: 'LinkedIn',
      issue: linkedinCheck.message,
      guide: 'https://www.linkedin.com/help/linkedin/answer/a542685',
    });
  }
  
  // Validate GitHub
  const githubCheck = validateUrl(data.githubUrl, 'github.com');
  if (!githubCheck.valid) {
    flags.missingGitHub = true;
    missingItems.push({
      field: 'GitHub',
      issue: githubCheck.message,
      guide: 'https://docs.github.com/en/get-started',
    });
  }
  
  // Validate Personal Website
  const websiteCheck = validateUrl(data.websiteUrl);
  if (!websiteCheck.valid) {
    flags.missingWebsite = true;
    missingItems.push({
      field: 'Personal Website',
      issue: websiteCheck.message,
      guide: 'https://pages.github.com/',
      template: 'https://kaw393939.github.io/117_final_fall_2025/portfolio/',
    });
  }
  
  // Validate Calendly
  const calendlyCheck = validateUrl(data.calendlyUrl, 'calendly.com');
  if (!calendlyCheck.valid) {
    flags.missingCalendly = true;
    missingItems.push({
      field: 'Calendly',
      issue: calendlyCheck.message,
      guide: 'https://calendly.com/signup',
    });
  }
  
  return { flags, missingItems };
}

/**
 * Send webhook to Zapier/Make for email automation
 */
async function triggerEmailAutomation(memberData, missingItems) {
  const webhookUrl = process.env.EMAIL_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('EMAIL_WEBHOOK_URL not configured');
    return { success: false, message: 'Email automation not configured' };
  }
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: memberData.name,
        email: memberData.email,
        major: memberData.major,
        graduationYear: memberData.graduationYear,
        careerGoal: memberData.careerGoal,
        linkedinUrl: memberData.linkedinUrl,
        githubUrl: memberData.githubUrl,
        websiteUrl: memberData.websiteUrl,
        calendlyUrl: memberData.calendlyUrl,
        missingItems: missingItems,
        submittedAt: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Email webhook error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Send Discord webhook notification
 */
async function sendDiscordNotification(memberData) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('DISCORD_WEBHOOK_URL not configured');
    return { success: false, message: 'Discord webhook not configured' };
  }
  
  try {
    // Format links for Discord
    const links = [
      memberData.linkedinUrl && `[LinkedIn](${memberData.linkedinUrl})`,
      memberData.githubUrl && `[GitHub](${memberData.githubUrl})`,
      memberData.websiteUrl && `[Portfolio](${memberData.websiteUrl})`,
      memberData.calendlyUrl && `[Calendly](${memberData.calendlyUrl})`,
    ].filter(Boolean).join(' • ');
    
    const embed = {
      title: `🎉 New Member: ${memberData.name}`,
      description: `Welcome to Job Club!`,
      color: 0x6750A4, // Material Design primary color
      fields: [
        {
          name: '👤 Name',
          value: memberData.name,
          inline: true,
        },
        {
          name: '📧 Email',
          value: memberData.email,
          inline: true,
        },
        {
          name: '🎓 Major',
          value: memberData.major,
          inline: true,
        },
        {
          name: '📅 Graduation',
          value: memberData.graduationYear,
          inline: true,
        },
        {
          name: '🎯 Career Goal',
          value: memberData.careerGoal.substring(0, 200) + (memberData.careerGoal.length > 200 ? '...' : ''),
          inline: false,
        },
        {
          name: '🔗 Links',
          value: links || 'No links provided',
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Job Club NJIT',
      },
    };
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: '📢 **New member joined Job Club!** Please welcome them to the community! 👋',
        embeds: [embed],
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Discord webhook returned ${response.status}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Discord webhook error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Main handler function
 */
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }
  
  try {
    const data = req.body;
    
    // Validate required fields
    const requiredFields = [
      'name', 
      'email', 
      'major', 
      'graduationYear', 
      'careerGoal'
    ];
    
    for (const field of requiredFields) {
      if (!data[field] || data[field].trim() === '') {
        return res.status(400).json({
          success: false,
          error: `${field} is required`,
        });
      }
    }
    
    // Detect missing prerequisites
    const { flags, missingItems } = detectMissingPrerequisites(data);
    
    // Prepare member profile document for Sanity
    const memberProfile = {
      _type: 'memberProfile',
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      major: data.major.trim(),
      graduationYear: data.graduationYear,
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
    const result = await client.create(memberProfile);
    
    // Trigger email automation (don't wait for it)
    triggerEmailAutomation(memberProfile, missingItems).catch(err => 
      console.error('Email automation failed:', err)
    );
    
    // Send Discord notification (don't wait for it)
    sendDiscordNotification(memberProfile).catch(err => 
      console.error('Discord notification failed:', err)
    );
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Profile submitted successfully',
      memberId: result._id,
      missingItems: missingItems.length > 0 ? missingItems : null,
      hasAllPrerequisites: missingItems.length === 0,
    });
    
  } catch (error) {
    console.error('Submission error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to submit profile',
      details: error.message,
    });
  }
}
