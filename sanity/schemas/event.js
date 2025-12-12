export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Workshop', value: 'workshop' },
          { title: 'Office Hours', value: 'office-hours' },
          { title: 'Meetup', value: 'meetup' },
          { title: 'Guest Speaker', value: 'guest-speaker' },
          { title: 'Hack Night', value: 'hack-night' },
          { title: 'Town Hall', value: 'town-hall' }
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required().min(50).max(500)
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      description: 'Detailed description for the event page'
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'endDate',
      title: 'End Date/Time',
      type: 'datetime',
      description: 'Optional - if event has a specific end time'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'venue',
          title: 'Venue Name',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Address',
          type: 'string'
        },
        {
          name: 'room',
          title: 'Room/Building',
          type: 'string'
        },
        {
          name: 'isVirtual',
          title: 'Virtual Event',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'virtualLink',
          title: 'Virtual Event Link',
          type: 'url',
          description: 'Zoom, Google Meet, etc.'
        }
      ]
    },
    {
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      description: 'Maximum number of attendees (optional)'
    },
    {
      name: 'registrationRequired',
      title: 'Registration Required',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: 'External registration link (Google Forms, Eventbrite, etc.)'
    },
    {
      name: 'speakers',
      title: 'Speakers/Hosts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string'
            },
            {
              name: 'title',
              title: 'Title/Role',
              type: 'string'
            },
            {
              name: 'company',
              title: 'Company/Organization',
              type: 'string'
            },
            {
              name: 'bio',
              title: 'Short Bio',
              type: 'text'
            }
          ]
        }
      ]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      description: 'Show this event prominently on the homepage',
      initialValue: false
    },
    {
      name: 'status',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Completed', value: 'completed' }
        ],
        layout: 'radio'
      },
      initialValue: 'draft',
      validation: Rule => Rule.required()
    },
    {
      name: 'imageUrl',
      title: 'Event Image URL',
      type: 'url',
      description: 'Featured image for the event'
    }
  ],
  preview: {
    select: {
      title: 'title',
      eventType: 'eventType',
      date: 'date',
      status: 'status'
    },
    prepare(selection) {
      const { title, eventType, date, status } = selection;
      const typeEmoji = {
        'workshop': '🛠️',
        'office-hours': '🕐',
        'meetup': '🤝',
        'guest-speaker': '🎤',
        'hack-night': '💻',
        'town-hall': '🏛️'
      };
      const statusEmoji = {
        'draft': '📝',
        'published': '✅',
        'cancelled': '❌',
        'completed': '✔️'
      };
      return {
        title: `${typeEmoji[eventType] || '📅'} ${title}`,
        subtitle: `${new Date(date).toLocaleDateString()} • ${statusEmoji[status] || ''} ${status}`
      };
    }
  },
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    },
    {
      title: 'Date, Oldest First',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }]
    },
    {
      title: 'Event Type',
      name: 'eventType',
      by: [{ field: 'eventType', direction: 'asc' }]
    }
  ]
}
