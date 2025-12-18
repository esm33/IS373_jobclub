export default {
  name: "resource",
  title: "Resource Guide",
  type: "document",
  fields: [
    // Basic Information
    {
      name: "title",
      title: "Guide Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "E.g., 'LinkedIn Optimization Guide'",
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
      description: "Brief description for resource cards (100-200 characters)",
      validation: (Rule) => Rule.required().min(50).max(300),
    },

    // Category
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "LinkedIn Optimization", value: "linkedin" },
          { title: "GitHub Portfolio", value: "github" },
          { title: "Personal Website", value: "website" },
          { title: "AI Skills", value: "ai-skills" },
          { title: "Career Path", value: "career" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },

    // Content
    {
      name: "content",
      title: "Guide Content",
      type: "array",
      description: "Main content of the guide (markdown blocks, headings, etc.)",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },

    // Metadata
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      description: "Who created this guide",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "E.g., 'LinkedIn', 'Profile', 'Optimization', 'AI'",
    },

    // Status
    {
      name: "status",
      title: "Publication Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "draft",
    },

    // SEO
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "SEO title for search results (50-60 characters)",
      validation: (Rule) => Rule.max(60),
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description: "SEO description (120-160 characters)",
      validation: (Rule) => Rule.max(160),
    },

    // Timestamps
    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
    },
    {
      name: "updatedAt",
      title: "Last Updated",
      type: "datetime",
    },
  ],

  preview: {
    select: {
      title: "title",
      category: "category",
      status: "status",
    },
    prepare(selection) {
      const { title, category, status } = selection;
      const categoryEmoji = {
        linkedin: "🔗",
        github: "🐙",
        website: "💼",
        "ai-skills": "🤖",
        career: "🎯",
        other: "📚",
      };
      return {
        title: title,
        subtitle: `${categoryEmoji[category] || "📄"} ${category} • ${status}`,
      };
    },
  },
};
