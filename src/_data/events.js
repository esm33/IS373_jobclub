import { createClient } from '@sanity/client';
import 'dotenv/config';

/**
 * Fetch all published events from Sanity
 * Returns events sorted by date (upcoming first)
 */
export default async function() {
  try {
    // Check if Sanity is configured BEFORE creating client
    if (!process.env.SANITY_PROJECT_ID) {
      console.warn('⚠️  Sanity not configured. Using sample events data.');
      return getSampleEvents();
    }

    // Initialize Sanity client only if credentials are available
    const client = createClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET || 'production',
      token: process.env.SANITY_WRITE_TOKEN,
      apiVersion: '2024-12-13', // Changed to force fresh data fetch
      useCdn: false // Use fresh data for build
    });

    // Query for published events (temporarily removed date filter for debugging)
    const query = `*[_type == "event" && status == "published"] | order(date asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      fullDescription,
      eventType,
      date,
      endDate,
      location,
      capacity,
      registrationRequired,
      registrationLink,
      registrationDeadline,
      speakers,
      tags,
      targetAudience,
      prerequisites,
      materialsProvided,
      featured,
      status,
      metaTitle,
      metaDescription
    }`;

    const events = await client.fetch(query);
    
    // Clean up slugs (remove trailing spaces)
    const cleanedEvents = events.map(event => ({
      ...event,
      slug: event.slug ? event.slug.trim() : event.slug
    }));
    
    console.log(`✅ Fetched ${cleanedEvents.length} events from Sanity`);
    if (cleanedEvents.length > 0) {
      console.log('📋 First event:', JSON.stringify(cleanedEvents[0], null, 2));
    } else {
      console.log('🔍 Testing simpler query to debug...');
      const allEvents = await client.fetch(`*[_type == "event"]`);
      console.log(`📊 Total events in Sanity (no filters): ${allEvents.length}`);
      if (allEvents.length > 0) {
        console.log('📋 First event data:', JSON.stringify(allEvents[0], null, 2));
      }
    }
    
    return cleanedEvents;
  } catch (error) {
    console.error('❌ Error fetching events from Sanity:', error.message);
    console.warn('⚠️  Falling back to sample events data.');
    return getSampleEvents();
  }
}

/**
 * Sample events data for development/fallback
 * This allows the site to build even without Sanity configured
 */
function getSampleEvents() {
  return [
    {
      _id: 'sample-1',
      title: 'React Fundamentals Workshop',
      slug: 'react-fundamentals-workshop',
      description: 'Learn React basics, hooks, and state management. Perfect for beginners wanting to build modern web apps.',
      fullDescription: 'Join us for an intensive hands-on workshop covering React fundamentals. This beginner-friendly session will guide you through the core concepts of React including components, props, state, hooks, and basic state management patterns.\n\nWhat you\'ll learn:\n- React component architecture\n- Props and state management\n- React Hooks (useState, useEffect)\n- Event handling\n- Building your first React app\n\nPrerequisites:\n- Basic JavaScript knowledge\n- Laptop with Node.js installed\n- Code editor (VS Code recommended)\n\nMaterials will be provided, and there will be plenty of time for Q&A and hands-on practice.',
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
      registrationLink: 'https://forms.gle/example',
      speakers: [
        {
          name: 'Sarah Chen',
          title: 'Senior Frontend Developer',
          company: 'Google',
          bio: 'Sarah has been working with React for over 5 years and has built production applications serving millions of users.'
        }
      ],
      tags: ['React', 'JavaScript', 'Web Development', 'Beginner Friendly'],
      featured: true,
      status: 'published'
    },
    {
      _id: 'sample-2',
      title: 'AI Career Paths Office Hours',
      slug: 'ai-career-paths-office-hours',
      description: 'Drop-in session to discuss AI career opportunities, resume reviews, and industry insights.',
      fullDescription: 'Join our weekly office hours to get personalized career guidance, resume feedback, and insights into the AI industry. Whether you\'re exploring different paths, preparing for interviews, or building your professional network, this is your chance to get expert advice.\n\nWhat we cover:\n- Career path planning in AI/ML\n- Resume and LinkedIn reviews\n- Interview preparation\n- Networking strategies\n- Industry trends and opportunities',
      eventType: 'office-hours',
      date: '2026-01-20T16:00:00Z',
      endDate: '2026-01-20T17:30:00Z',
      location: {
        isVirtual: true,
        venue: 'Zoom',
        virtualLink: 'https://zoom.us/j/example'
      },
      registrationRequired: false,
      tags: ['Career', 'AI', 'Mentoring'],
      status: 'published'
    },
    {
      _id: 'sample-3',
      title: 'Tech Industry Networking Meetup',
      slug: 'tech-industry-networking-meetup',
      description: 'Connect with fellow students, alumni, and industry professionals in an informal setting.',
      fullDescription: 'Join us for an evening of networking, conversation, and community building. This casual meetup is designed to help you expand your professional network, share experiences, and learn from others in the tech industry.\n\nWho should attend:\n- Students exploring tech careers\n- Recent graduates\n- Industry professionals\n- Anyone interested in technology\n\nFood and refreshments will be provided!',
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
      registrationLink: 'https://forms.gle/example',
      tags: ['Networking', 'Community', 'Career'],
      status: 'published'
    }
  ];
}
