/**
 * Events Page - Fetch and Display Events from Sanity CMS
 */

class EventsManager {
  constructor() {
    this.apiEndpoint = this.getApiEndpoint();
    this.eventsGrid = document.getElementById("eventsGrid");
    this.loadingEl = document.getElementById("eventsLoading");
    this.noEventsEl = document.getElementById("noEvents");
    this.filterButtons = document.querySelectorAll(".event-filter");
    this.currentFilter = "all";
    this.events = [];

    this.init();
  }

  /**
   * Get API endpoint for Sanity CMS
   */
  getApiEndpoint() {
    // Use environment variable or default to demo mode
    const projectId = "YOUR_SANITY_PROJECT_ID"; // Replace with actual project ID
    const dataset = "production";

    if (projectId === "YOUR_SANITY_PROJECT_ID") {
      // Demo mode - return null to use mock data
      return null;
    }

    return `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`;
  }

  /**
   * Initialize events manager
   */
  init() {
    this.setupFilters();
    this.loadEvents();
  }

  /**
   * Setup filter buttons
   */
  setupFilters() {
    this.filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        this.currentFilter = button.dataset.filter;
        this.renderEvents();
      });
    });
  }

  /**
   * Load events from Sanity or use mock data
   */
  async loadEvents() {
    try {
      if (!this.apiEndpoint) {
        // Use mock data in demo mode
        this.events = this.getMockEvents();
        this.showEvents();
        return;
      }

      // Fetch from Sanity CMS
      const query = encodeURIComponent(`
        *[_type == "event" && status == "published" && date >= now()] | order(date asc) {
          _id,
          title,
          slug,
          eventType,
          description,
          fullDescription,
          date,
          endDate,
          location,
          capacity,
          registrationRequired,
          registrationLink,
          speakers,
          tags,
          featured,
          imageUrl
        }
      `);

      const response = await fetch(`${this.apiEndpoint}?query=${query}`);
      const data = await response.json();

      this.events = data.result || [];
      this.showEvents();
    } catch (error) {
      console.error("Error loading events:", error);
      // Fallback to mock data
      this.events = this.getMockEvents();
      this.showEvents();
    }
  }

  /**
   * Show events (hide loading, show grid)
   */
  showEvents() {
    setTimeout(() => {
      this.loadingEl.classList.add("hidden");
      this.renderEvents();
    }, 500);
  }

  /**
   * Render events based on current filter
   */
  renderEvents() {
    const filteredEvents =
      this.currentFilter === "all"
        ? this.events
        : this.events.filter((e) => e.eventType === this.currentFilter);

    if (filteredEvents.length === 0) {
      this.eventsGrid.innerHTML = "";
      this.eventsGrid.classList.add("hidden");
      this.noEventsEl.classList.remove("hidden");
      return;
    }

    this.eventsGrid.classList.remove("hidden");
    this.noEventsEl.classList.add("hidden");
    this.eventsGrid.innerHTML = filteredEvents
      .map((event) => this.createEventCard(event))
      .join("");
  }

  /**
   * Create event card HTML
   */
  createEventCard(event) {
    const typeInfo = this.getEventTypeInfo(event.eventType);
    const locationText = this.formatLocation(event.location);
    const dateText = this.formatDate(event.date);

    return `
      <article class="event-card" data-event-type="${event.eventType}">
        <div style="padding: 2rem;">
          <div class="flex items-center justify-between mb-4">
            <span class="event-type-badge event-type-${event.eventType}">
              ${typeInfo.emoji} ${typeInfo.label}
            </span>
            ${event.registrationRequired ? '<span class="text-sm font-medium" style="color: var(--primary);">Registration Required</span>' : ""}
          </div>
          
          <h3 class="text-2xl font-bold mb-3" style="font-family: 'Google Sans', sans-serif; color: var(--text); line-height: 1.2;">
            ${event.title}
          </h3>
          
          <p class="mb-4" style="color: var(--text); opacity: 0.7; line-height: 1.6;">
            ${event.description}
          </p>
          
          <div class="space-y-2 mb-4" style="font-size: 0.95rem; color: var(--text); opacity: 0.8;">
            <div class="flex items-center gap-2">
              <span class="material-icons-round" style="font-size: 1.125rem; color: var(--primary);">schedule</span>
              <span>${dateText}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="material-icons-round" style="font-size: 1.125rem; color: var(--primary);">place</span>
              <span>${locationText}</span>
            </div>
            ${
  event.capacity
    ? `
              <div class="flex items-center gap-2">
                <span class="material-icons-round" style="font-size: 1.125rem; color: var(--primary);">people</span>
                <span>Capacity: ${event.capacity} attendees</span>
              </div>
            `
    : ""
}
            ${
  event.speakers && event.speakers.length > 0
    ? `
              <div class="flex items-center gap-2">
                <span class="material-icons-round" style="font-size: 1.125rem; color: var(--primary);">person</span>
                <span>${event.speakers[0].name}${event.speakers[0].company ? " - " + event.speakers[0].company : ""}</span>
              </div>
            `
    : ""
}
          </div>
          
          ${this.renderCTA(event)}
        </div>
      </article>
    `;
  }

  /**
   * Render CTA button based on event requirements
   */
  renderCTA(event) {
    if (event.registrationRequired && event.registrationLink) {
      return `
        <a href="${event.registrationLink}" target="_blank" class="btn btn-primary w-full inline-flex items-center justify-center gap-2" style="padding: 0.875rem 1.5rem; border-radius: 100px;">
          <span>Register Now</span>
          <span class="material-icons-round" style="font-size: 1.125rem;">arrow_forward</span>
        </a>
      `;
    }

    return `
      <a href="mailto:kwilliams@njit.edu?subject=Event: ${encodeURIComponent(event.title)}" class="btn btn-outlined w-full inline-flex items-center justify-center gap-2" style="padding: 0.875rem 1.5rem; border-radius: 100px;">
        <span>Learn More</span>
        <span class="material-icons-round" style="font-size: 1.125rem;">info</span>
      </a>
    `;
  }

  /**
   * Get event type info (emoji and label)
   */
  getEventTypeInfo(type) {
    const types = {
      workshop: { emoji: "🛠️", label: "Workshop" },
      "office-hours": { emoji: "🕐", label: "Office Hours" },
      meetup: { emoji: "🤝", label: "Meetup" },
      "guest-speaker": { emoji: "🎤", label: "Guest Speaker" },
      "hack-night": { emoji: "💻", label: "Hack Night" },
      "town-hall": { emoji: "🏛️", label: "Town Hall" },
    };
    return types[type] || { emoji: "📅", label: "Event" };
  }

  /**
   * Format location
   */
  formatLocation(location) {
    if (!location) {
      return "Location TBA";
    }

    if (location.isVirtual) {
      return "🌐 Virtual Event";
    }

    const parts = [];
    if (location.room) {
      parts.push(location.room);
    }
    if (location.venue) {
      parts.push(location.venue);
    }

    return parts.length > 0 ? `📍 ${parts.join(", ")}` : "Location TBA";
  }

  /**
   * Format date
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }

  /**
   * Get mock events for demo mode
   */
  getMockEvents() {
    return [
      {
        _id: "1",
        title: "React Fundamentals Workshop",
        eventType: "workshop",
        description:
          "Learn React basics, hooks, and state management. Perfect for beginners wanting to build modern web apps.",
        date: "2026-01-15T18:00:00Z",
        location: {
          venue: "NJIT Campus",
          room: "GITC 3700",
          isVirtual: false,
        },
        registrationRequired: true,
        registrationLink: "https://forms.gle/example",
        capacity: 30,
        speakers: [
          {
            name: "Sarah Chen",
            title: "Senior Frontend Developer",
            company: "Google",
          },
        ],
      },
      {
        _id: "2",
        title: "Career Q&A Office Hours",
        eventType: "office-hours",
        description:
          "Drop in for resume reviews, interview prep, and career advice. No appointment needed!",
        date: "2026-01-16T15:00:00Z",
        location: {
          venue: "NJIT Campus",
          room: "GITC 4301",
          isVirtual: true,
          virtualLink: "https://zoom.us/example",
        },
        registrationRequired: false,
      },
      {
        _id: "3",
        title: "AI in Healthcare: Industry Panel",
        eventType: "guest-speaker",
        description:
          "Leading experts discuss how AI is transforming healthcare and creating new career opportunities.",
        date: "2026-01-18T18:30:00Z",
        location: {
          venue: "NJIT Campus",
          room: "Campus Center Ballroom",
          isVirtual: true,
          virtualLink: "https://linkedin.com/live",
        },
        registrationRequired: true,
        registrationLink: "https://eventbrite.com/example",
        speakers: [
          {
            name: "Dr. Maria Rodriguez",
            title: "Chief Data Scientist",
            company: "Mount Sinai Health",
          },
          {
            name: "James Park",
            title: "VP of AI",
            company: "Pfizer",
          },
        ],
      },
      {
        _id: "4",
        title: "January Tech Meetup",
        eventType: "meetup",
        description:
          "Monthly networking event with local tech professionals, students, and employers. Pizza provided!",
        date: "2026-01-20T17:00:00Z",
        location: {
          venue: "NJIT Campus",
          room: "Campus Center Atrium",
          isVirtual: false,
        },
        registrationRequired: false,
        capacity: 100,
      },
      {
        _id: "5",
        title: "Hack Night: Build Your Portfolio",
        eventType: "hack-night",
        description:
          "Work on your portfolio website with help from mentors. Bring your laptop and ideas!",
        date: "2026-01-22T18:00:00Z",
        location: {
          venue: "NJIT Campus",
          room: "GITC 3700",
          isVirtual: false,
        },
        registrationRequired: false,
      },
    ];
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new EventsManager();
  });
} else {
  new EventsManager();
}
