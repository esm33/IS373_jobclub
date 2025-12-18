/* global gtag */
/**
 * Analytics Tracking Module
 * Implements Google Analytics 4 event tracking with consent management
 */

class AnalyticsManager {
  constructor() {
    this.isInitialized = false;
    this.consentGiven = false;
    this.eventQueue = [];
    this.init();
  }

  /**
   * Initialize analytics
   */
  init() {
    // Check for consent (basic implementation - enhance with cookie banner)
    this.consentGiven = this.checkConsent();

    // Only initialize if consent given and gtag is available
    if (this.consentGiven && typeof gtag !== "undefined") {
      this.isInitialized = true;
      this.processQueue();
    }
  }

  /**
   * Check if user has given analytics consent
   * TODO: Integrate with cookie banner system
   */
  checkConsent() {
    // Check localStorage for consent
    const consent = localStorage.getItem("analytics_consent");
    return consent === "true" || consent === null; // Default to true for now
  }

  /**
   * Track custom event
   * @param {string} eventName - Event name
   * @param {object} params - Event parameters
   */
  trackEvent(eventName, params = {}) {
    const event = {
      name: eventName,
      params: {
        ...params,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        page_title: document.title,
      },
    };

    if (this.isInitialized && typeof gtag !== "undefined") {
      gtag("event", event.name, event.params);
      this.logEvent(event);
    } else {
      // Queue event for later if gtag not ready
      this.eventQueue.push(event);
    }
  }

  /**
   * Process queued events
   */
  processQueue() {
    if (this.eventQueue.length > 0 && typeof gtag !== "undefined") {
      this.eventQueue.forEach((event) => {
        gtag("event", event.name, event.params);
        this.logEvent(event);
      });
      this.eventQueue = [];
    }
  }

  /**
   * Log event to console in development
   */
  logEvent(event) {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.log("[Analytics]", event.name, event.params);
    }
  }

  /**
   * Track page view
   */
  trackPageView(pagePath = window.location.pathname) {
    this.trackEvent("page_view", {
      page_path: pagePath,
      page_location: window.location.href,
    });
  }

  /**
   * Track events page view
   */
  trackEventsPageView() {
    this.trackEvent("view_events_page", {
      event_category: "Events",
      event_label: "Events Page View",
    });
  }

  /**
   * Track event detail page view
   * @param {string} eventSlug - Event URL slug
   * @param {string} eventTitle - Event title
   * @param {string} eventType - Type of event
   */
  trackEventDetailView(eventSlug, eventTitle, eventType) {
    this.trackEvent("view_event_detail", {
      event_category: "Events",
      event_label: eventTitle,
      event_slug: eventSlug,
      event_type: eventType,
      content_type: "event_detail",
    });
  }

  /**
   * Track event "Learn More" click
   * @param {string} eventSlug - Event URL slug
   * @param {string} eventTitle - Event title
   * @param {string} eventType - Type of event
   */
  trackEventLearnMore(eventSlug, eventTitle, eventType) {
    this.trackEvent("event_learn_more_click", {
      event_category: "Events",
      event_label: eventTitle,
      event_slug: eventSlug,
      event_type: eventType,
      link_type: "learn_more",
    });
  }

  /**
   * Track event registration click
   * @param {string} eventSlug - Event URL slug
   * @param {string} eventTitle - Event title
   * @param {string} eventType - Type of event
   * @param {string} registrationLink - External registration URL
   */
  trackEventRegistrationClick(
    eventSlug,
    eventTitle,
    eventType,
    registrationLink,
  ) {
    this.trackEvent("event_registration_click", {
      event_category: "Events",
      event_label: eventTitle,
      event_slug: eventSlug,
      event_type: eventType,
      link_type: "register",
      link_url: registrationLink,
      outbound: true,
    });
  }

  /**
   * Track "Add to Calendar" click
   * @param {string} eventSlug - Event URL slug
   * @param {string} eventTitle - Event title
   * @param {string} eventType - Type of event
   */
  trackAddToCalendar(eventSlug, eventTitle, eventType) {
    this.trackEvent("event_add_to_calendar", {
      event_category: "Events",
      event_label: eventTitle,
      event_slug: eventSlug,
      event_type: eventType,
      action_type: "download",
    });
  }

  /**
   * Track event share
   * @param {string} eventSlug - Event URL slug
   * @param {string} eventTitle - Event title
   * @param {string} eventType - Type of event
   * @param {string} shareMethod - How the event was shared (native|clipboard)
   */
  trackEventShare(eventSlug, eventTitle, eventType, shareMethod) {
    this.trackEvent("event_share", {
      event_category: "Events",
      event_label: eventTitle,
      event_slug: eventSlug,
      event_type: eventType,
      method: shareMethod,
      content_type: "event",
    });
  }

  /**
   * Track event filter usage
   * @param {string} filterType - Filter selected (all, workshop, office-hours, etc.)
   * @param {number} resultCount - Number of events shown after filtering
   */
  trackEventFilter(filterType, resultCount) {
    this.trackEvent("event_filter_used", {
      event_category: "Events",
      event_label: filterType,
      filter_type: filterType,
      result_count: resultCount,
    });
  }

  /**
   * Track registration form submission (for future use)
   * @param {string} eventSlug - Event URL slug
   * @param {string} eventTitle - Event title
   */
  trackRegistrationComplete(eventSlug, eventTitle) {
    this.trackEvent("registration_complete", {
      event_category: "Conversion",
      event_label: eventTitle,
      event_slug: eventSlug,
      conversion_type: "event_registration",
    });
  }

  /**
   * Track error
   * @param {string} errorType - Type of error
   * @param {string} errorMessage - Error message
   * @param {string} errorLocation - Where error occurred
   */
  trackError(errorType, errorMessage, errorLocation) {
    this.trackEvent("error", {
      event_category: "Error",
      error_type: errorType,
      error_message: errorMessage,
      error_location: errorLocation,
    });
  }
}

// Create singleton instance
const analytics = new AnalyticsManager();

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = analytics;
}

// Make available globally
window.analytics = analytics;
