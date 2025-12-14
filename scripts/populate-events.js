import { createClient } from '@sanity/client';
import 'dotenv/config';

const client = createClient({
  projectId: '2nqkaqwe',
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-12-12',
  useCdn: false
});

const sampleEvents = [
  {
    _type: 'event',
    title: 'React Fundamentals Workshop',
    slug: { _type: 'slug', current: 'react-fundamentals-workshop' },
    description: 'Learn React basics, hooks, and state management. Perfect for beginners wanting to build modern web apps.',
    fullDescription: `Join us for an intensive hands-on workshop covering React fundamentals. This beginner-friendly session will guide you through the core concepts of React including components, props, state, hooks, and basic state management patterns.

What you'll learn:
- React component architecture
- Props and state management
- React Hooks (useState, useEffect)
- Event handling
- Building your first React app

Prerequisites:
- Basic JavaScript knowledge
- Laptop with Node.js installed
- Code editor (VS Code recommended)

Materials will be provided, and there will be plenty of time for Q&A and hands-on practice.`,
    eventType: 'workshop',
    date: '2026-01-15T18:00:00Z',
    endDate: '2026-01-15T20:00:00Z',
    location: {
      isVirtual: false,
      venue: 'NJIT Campus',
      room: 'GITC 3700',
      address: 'University Heights, Newark, NJ 07102'
    },
    capacity: 30,
    registrationRequired: true,
    registrationLink: 'https://forms.gle/jobclub-react-workshop',
    speakers: [
      {
        name: 'Sarah Chen',
        title: 'Senior Frontend Developer',
        company: 'Google',
        bio: 'Sarah has been working with React for over 5 years and has built production applications serving millions of users. She\'s passionate about teaching and making web development accessible to everyone.'
      }
    ],
    tags: ['React', 'JavaScript', 'Web Development', 'Beginner Friendly'],
    targetAudience: ['all', 'beginners', 'intermediate'],
    featured: true,
    status: 'published',
    publishedAt: new Date().toISOString()
  },
  {
    _type: 'event',
    title: 'AI Career Paths Office Hours',
    slug: { _type: 'slug', current: 'ai-career-paths-office-hours' },
    description: 'Drop-in session to discuss AI career opportunities, resume reviews, and industry insights with experienced professionals.',
    fullDescription: `Join our weekly office hours to get personalized career guidance, resume feedback, and insights into the AI industry. Whether you're exploring different paths, preparing for interviews, or building your professional network, this is your chance to get expert advice.

What we cover:
- Career path planning in AI/ML
- Resume and LinkedIn reviews
- Interview preparation tips
- Networking strategies
- Industry trends and opportunities
- Portfolio building advice

This is an informal, drop-in session where you can ask any career-related questions. Bring your resume, LinkedIn profile, or portfolio for feedback!`,
    eventType: 'office-hours',
    date: '2026-01-20T16:00:00Z',
    endDate: '2026-01-20T17:30:00Z',
    location: {
      isVirtual: true,
      venue: 'Zoom',
      virtualLink: 'https://zoom.us/j/jobclub-office-hours'
    },
    registrationRequired: false,
    tags: ['Career', 'AI', 'Mentoring', 'Resume Review'],
    targetAudience: ['all', 'juniors', 'seniors', 'graduate'],
    status: 'published',
    publishedAt: new Date().toISOString()
  },
  {
    _type: 'event',
    title: 'Tech Industry Networking Night',
    slug: { _type: 'slug', current: 'tech-industry-networking-night' },
    description: 'Connect with fellow students, alumni, and industry professionals. Build relationships that can launch your career.',
    fullDescription: `Join us for an evening of networking, conversation, and community building. This casual meetup is designed to help you expand your professional network, share experiences, and learn from others in the tech industry.

Who should attend:
- Students exploring tech careers
- Recent graduates looking for opportunities
- Industry professionals wanting to give back
- Anyone interested in technology and innovation

What to expect:
- Structured networking activities
- Lightning talks from industry professionals
- Career advice and mentorship opportunities
- Food and refreshments provided
- Raffle prizes!

This is a great opportunity to practice your elevator pitch, exchange contact information, and build meaningful professional relationships.`,
    eventType: 'meetup',
    date: '2026-01-25T18:30:00Z',
    endDate: '2026-01-25T20:30:00Z',
    location: {
      isVirtual: false,
      venue: 'NJIT Campus Center',
      room: 'Multipurpose Room',
      address: 'University Heights, Newark, NJ 07102'
    },
    capacity: 50,
    registrationRequired: true,
    registrationLink: 'https://forms.gle/jobclub-networking-night',
    tags: ['Networking', 'Community', 'Career', 'Professional Development'],
    targetAudience: ['all'],
    materialsProvided: 'Food, drinks, name tags, networking activity guides',
    status: 'published',
    publishedAt: new Date().toISOString()
  },
  {
    _type: 'event',
    title: 'Building AI Products: Guest Speaker Series',
    slug: { _type: 'slug', current: 'building-ai-products-guest-speaker' },
    description: 'Learn from a startup founder about building and launching AI-powered products in today\'s market.',
    fullDescription: `We're excited to welcome Alex Rodriguez, founder of an AI startup that recently raised $5M in funding, to share their journey of building and launching AI products.

Alex will discuss:
- Identifying market opportunities for AI solutions
- Building MVP AI products with limited resources
- Navigating the funding landscape
- Common pitfalls and how to avoid them
- The future of AI entrepreneurship

This is a unique opportunity to learn from someone who's currently in the trenches of AI entrepreneurship. The talk will include a live demo of their product and plenty of time for Q&A.

Perfect for:
- Aspiring entrepreneurs
- Students interested in AI/ML
- Anyone curious about the startup world`,
    eventType: 'guest-speaker',
    date: '2026-02-05T17:00:00Z',
    endDate: '2026-02-05T18:30:00Z',
    location: {
      isVirtual: true,
      venue: 'Zoom',
      virtualLink: 'https://zoom.us/j/jobclub-guest-speaker'
    },
    capacity: 100,
    registrationRequired: true,
    registrationLink: 'https://forms.gle/jobclub-guest-speaker',
    speakers: [
      {
        name: 'Alex Rodriguez',
        title: 'Founder & CEO',
        company: 'AI Startup (Stealth)',
        bio: 'Alex is a serial entrepreneur who has built and sold two companies. Their latest venture is an AI-powered platform that helps businesses automate customer service.',
        linkedinUrl: 'https://linkedin.com/in/alexrodriguez'
      }
    ],
    tags: ['AI', 'Entrepreneurship', 'Startups', 'Product Development'],
    targetAudience: ['all', 'intermediate', 'advanced'],
    featured: true,
    status: 'published',
    publishedAt: new Date().toISOString()
  },
  {
    _type: 'event',
    title: 'Hack Night: Build Your Portfolio',
    slug: { _type: 'slug', current: 'hack-night-build-portfolio' },
    description: 'Collaborative coding session to build or improve your personal portfolio website. Bring your laptop and ideas!',
    fullDescription: `Join us for a productive evening of coding and collaboration. Whether you're starting from scratch or improving an existing portfolio, this hack night is designed to help you create a professional online presence.

What we'll work on:
- Personal portfolio websites
- GitHub profile optimization
- Project showcase pages
- Responsive design implementation
- Deployment to GitHub Pages/Netlify

Format:
- Brief intro and goal-setting (15 min)
- Independent/group coding (2 hours)
- Share progress and get feedback (30 min)
- Pizza and snacks throughout!

Mentors will be available to help with:
- HTML/CSS/JavaScript
- React/Vue/other frameworks
- Git and deployment
- Design and UX feedback

Requirements:
- Laptop with code editor installed
- Basic HTML/CSS knowledge helpful but not required
- Ideas for what you want to build

This is a supportive, beginner-friendly environment. All skill levels welcome!`,
    eventType: 'hack-night',
    date: '2026-02-10T18:00:00Z',
    endDate: '2026-02-10T21:00:00Z',
    location: {
      isVirtual: false,
      venue: 'NJIT GITC',
      room: 'Room 4400',
      address: 'University Heights, Newark, NJ 07102'
    },
    capacity: 40,
    registrationRequired: true,
    registrationLink: 'https://forms.gle/jobclub-hack-night',
    tags: ['Coding', 'Portfolio', 'Web Development', 'Networking'],
    targetAudience: ['all', 'beginners', 'intermediate'],
    prerequisites: 'Laptop with code editor (VS Code recommended), basic coding knowledge',
    materialsProvided: 'Pizza, drinks, portfolio templates, deployment guides, mentorship',
    status: 'published',
    publishedAt: new Date().toISOString()
  }
];

async function populateEvents() {
  console.log('🚀 Starting to populate Sanity with sample events...\n');
  
  for (const event of sampleEvents) {
    try {
      const result = await client.create(event);
      console.log(`✅ Created: ${event.title}`);
      console.log(`   ID: ${result._id}`);
      console.log(`   URL: /events/${event.slug.current}/\n`);
    } catch (error) {
      console.error(`❌ Error creating ${event.title}:`, error.message);
    }
  }
  
  console.log('\n🎉 Finished populating events!');
  console.log('\n📋 Next steps:');
  console.log('1. Visit http://localhost:3333/ to see events in Sanity Studio');
  console.log('2. Build the site: npm run build');
  console.log('3. View events at: http://localhost:8080/events/');
}

populateEvents();
