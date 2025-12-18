export default {
  name: "memberProfile",
  title: "Member Profile",
  type: "document",
  fields: [
    // Personal Information
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: "major",
      title: "Major",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "graduationYear",
      title: "Expected Graduation Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    },

    // Professional URLs
    {
      name: "linkedinUrl",
      title: "LinkedIn Profile",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "githubUrl",
      title: "GitHub Profile",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "websiteUrl",
      title: "Personal Website",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "calendlyUrl",
      title: "Calendly Link",
      type: "url",
      validation: (Rule) => Rule.required(),
    },

    // Career Information
    {
      name: "careerGoal",
      title: "Career Goal",
      type: "text",
      validation: (Rule) => Rule.required().min(50).max(1000),
    },

    // Status & Tracking
    {
      name: "onboardingStatus",
      title: "Onboarding Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In Progress", value: "in-progress" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "new",
      validation: (Rule) => Rule.required(),
    },

    // Missing Prerequisites Flags
    {
      name: "missingLinkedIn",
      title: "Missing LinkedIn",
      type: "boolean",
      description: "Flag if LinkedIn URL is missing or invalid",
      initialValue: false,
    },
    {
      name: "missingGitHub",
      title: "Missing GitHub",
      type: "boolean",
      description: "Flag if GitHub URL is missing or invalid",
      initialValue: false,
    },
    {
      name: "missingWebsite",
      title: "Missing Website",
      type: "boolean",
      description: "Flag if personal website is missing or invalid",
      initialValue: false,
    },
    {
      name: "missingCalendly",
      title: "Missing Calendly",
      type: "boolean",
      description: "Flag if Calendly link is missing or invalid",
      initialValue: false,
    },

    // Timestamps
    {
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "updatedAt",
      title: "Last Updated",
      type: "datetime",
    },

    // Additional Metadata
    {
      name: "notes",
      title: "Admin Notes",
      type: "text",
      description: "Internal notes about this member",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "email",
      status: "onboardingStatus",
      submittedAt: "submittedAt",
    },
    prepare(selection) {
      const { title, subtitle, status, submittedAt } = selection;
      const statusEmoji = {
        new: "🆕",
        "in-progress": "⏳",
        completed: "✅",
      };
      return {
        title: `${statusEmoji[status] || "📋"} ${title}`,
        subtitle: `${subtitle} • Submitted: ${new Date(submittedAt).toLocaleDateString()}`,
      };
    },
  },

  orderings: [
    {
      title: "Submission Date, Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Submission Date, Oldest First",
      name: "submittedAtAsc",
      by: [{ field: "submittedAt", direction: "asc" }],
    },
    {
      title: "Status",
      name: "status",
      by: [{ field: "onboardingStatus", direction: "asc" }],
    },
    {
      title: "Name",
      name: "name",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
};
