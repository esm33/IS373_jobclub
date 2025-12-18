export default {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          {
            name: "email",
            invert: false,
          }
        ),
    },
    {
      name: "bio",
      title: "Bio",
      type: "text",
      description: "Short biography",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
  },
};
