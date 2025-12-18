export default {
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    // Basic Information
    {
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      description:
        "Brief description for event cards and meta tags (150-200 characters)",
      validation: (Rule) => Rule.required().min(50).max(500),
    },
    {
      name: "fullDescription",
      title: "Full Description",
      type: "text",
      description: "Detailed description for event detail page",
      validation: (Rule) => Rule.required().min(100).max(2000),
    },

    // Event Type
    {
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "🛠️ Workshop", value: "workshop" },
          { title: "💼 Office Hours", value: "office-hours" },
          { title: "🤝 Meetup", value: "meetup" },
          { title: "🎤 Guest Speaker", value: "guest-speaker" },
          { title: "💻 Hack Night", value: "hack-night" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },

    // Date & Time
    {
      name: "date",
      title: "Start Date & Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "endDate",
      title: "End Date & Time",
      type: "datetime",
      validation: (Rule) => Rule.required().min(Rule.valueOfField("date")),
    },

    // Location
    {
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        {
          name: "isVirtual",
          title: "Virtual Event",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "venue",
          title: "Venue Name",
          type: "string",
          description: 'e.g., "NJIT Campus" or "Zoom"',
        },
        {
          name: "room",
          title: "Room/Space",
          type: "string",
          description: 'e.g., "GITC 3700"',
        },
        {
          name: "address",
          title: "Full Address",
          type: "text",
          description: "Complete address for physical events",
        },
        {
          name: "virtualLink",
          title: "Virtual Meeting Link",
          type: "url",
          description: "Zoom/Google Meet link for virtual events",
          hidden: ({ parent }) => !parent?.isVirtual,
        },
      ],
      validation: (Rule) => Rule.required(),
    },

    // Registration
    {
      name: "capacity",
      title: "Capacity",
      type: "number",
      description: "Maximum number of attendees (leave blank for unlimited)",
      validation: (Rule) => Rule.min(1).max(500),
    },
    {
      name: "registrationRequired",
      title: "Registration Required",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "registrationLink",
      title: "Registration Link",
      type: "url",
      description: "External form link (Google Forms, Eventbrite, etc.)",
      hidden: ({ document }) => !document?.registrationRequired,
    },
    {
      name: "registrationDeadline",
      title: "Registration Deadline",
      type: "datetime",
      description: "Last date to register (optional)",
      hidden: ({ document }) => !document?.registrationRequired,
    },

    // Speakers/Hosts
    {
      name: "speakers",
      title: "Speakers/Hosts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Full Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              title: "Job Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "company",
              title: "Company/Organization",
              type: "string",
            },
            {
              name: "bio",
              title: "Short Bio",
              type: "text",
              validation: (Rule) => Rule.max(500),
            },
            {
              name: "photoUrl",
              title: "Photo URL",
              type: "url",
              description: "LinkedIn photo or professional headshot",
            },
            {
              name: "linkedinUrl",
              title: "LinkedIn Profile",
              type: "url",
            },
          ],
        },
      ],
    },

    // Tags & Categories
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Topics covered (e.g., React, AI, Career, Networking)",
    },
    {
      name: "targetAudience",
      title: "Target Audience",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        list: [
          { title: "All Students", value: "all" },
          { title: "Beginners", value: "beginners" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "Freshmen", value: "freshmen" },
          { title: "Sophomores", value: "sophomores" },
          { title: "Juniors", value: "juniors" },
          { title: "Seniors", value: "seniors" },
          { title: "Graduate Students", value: "graduate" },
        ],
      },
    },

    // Additional Details
    {
      name: "prerequisites",
      title: "Prerequisites",
      type: "text",
      description: "Any required skills or items to bring",
    },
    {
      name: "materialsProvided",
      title: "Materials Provided",
      type: "text",
      description: "What attendees will receive (slides, code, food, etc.)",
    },
    {
      name: "featured",
      title: "Featured Event",
      type: "boolean",
      description: "Show prominently on events page",
      initialValue: false,
    },

    // Status & Tracking
    {
      name: "status",
      title: "Event Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Registration Closed", value: "registration-closed" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      description: "When to make this event visible on the website",
    },

    // SEO
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "SEO title (leave blank to use event title)",
      validation: (Rule) => Rule.max(60),
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description: "SEO description (leave blank to use short description)",
      validation: (Rule) => Rule.max(160),
    },
  ],

  preview: {
    select: {
      title: "title",
      eventType: "eventType",
      date: "date",
      status: "status",
    },
    prepare({ title, eventType, date, status }) {
      const eventTypeEmojis = {
        workshop: "🛠️",
        "office-hours": "💼",
        meetup: "🤝",
        "guest-speaker": "🎤",
        "hack-night": "💻",
      };

      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
        : "No date";

      return {
        title: `${eventTypeEmojis[eventType] || "📅"} ${title}`,
        subtitle: `${formattedDate} • ${status || "draft"}`,
      };
    },
  },

  orderings: [
    {
      title: "Date (Newest First)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Date (Oldest First)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Event Type",
      name: "eventType",
      by: [{ field: "eventType", direction: "asc" }],
    },
  ],
};
