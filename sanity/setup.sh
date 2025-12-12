#!/bin/bash

# Sanity Setup Script for Job Club NJIT
# This script guides you through setting up your Sanity Studio

echo "🚀 Sanity Studio Setup for Job Club NJIT"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "sanity.config.js" ]; then
    echo "❌ Error: Please run this script from the sanity/ directory"
    exit 1
fi

echo "📋 Setup Steps:"
echo ""
echo "1. Create a Sanity project:"
echo "   → Go to: https://www.sanity.io/manage"
echo "   → Sign in or create an account"
echo "   → Click 'Create project'"
echo "   → Name it: 'Job Club NJIT'"
echo "   → Choose a plan (Hobby is free)"
echo "   → Copy your Project ID"
echo ""
echo "2. Configure environment variables:"
echo "   → Copy .env.example to .env.local"
echo "   → Paste your Project ID"
echo ""

read -p "Have you created your Sanity project? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter your Sanity Project ID: " PROJECT_ID
    
    if [ -z "$PROJECT_ID" ]; then
        echo "❌ Project ID cannot be empty"
        exit 1
    fi
    
    # Create .env.local
    echo "SANITY_STUDIO_PROJECT_ID=$PROJECT_ID" > .env.local
    echo "SANITY_STUDIO_DATASET=production" >> .env.local
    
    echo ""
    echo "✅ Environment configured!"
    echo ""
    echo "3. Deploy your Studio:"
    echo "   Run: npm run deploy"
    echo ""
    echo "4. Start development:"
    echo "   Run: npm run dev"
    echo ""
    echo "Your Studio will be available at:"
    echo "→ Local: http://localhost:3333"
    echo "→ Hosted: https://your-studio-name.sanity.studio"
    echo ""
    
    read -p "Would you like to deploy the Studio now? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🚀 Deploying Studio..."
        npm run deploy
    else
        echo "👍 You can deploy later with: npm run deploy"
    fi
else
    echo ""
    echo "👉 Next steps:"
    echo "   1. Go to https://www.sanity.io/manage"
    echo "   2. Create your project"
    echo "   3. Run this script again"
fi
