/**
 * GDPR Cookie Consent Banner
 * Manages user consent for analytics and cookies
 */

class CookieConsent {
  constructor() {
    this.consentKey = 'analytics_consent';
    this.bannerShownKey = 'cookie_banner_shown';
    this.preferencesKey = 'cookie_preferences';
    this.banner = null;
    this.modal = null;
    
    this.init();
  }

  /**
   * Initialize cookie consent system
   */
  init() {
    // Check if user has already made a choice
    const consent = localStorage.getItem(this.consentKey);
    
    if (consent === null) {
      // First time visitor - show banner after short delay
      setTimeout(() => this.showBanner(), 1000);
    } else {
      // User has made a choice - apply it
      this.applyConsent(consent === 'true');
    }
    
    // Set up preferences modal if needed
    this.setupPreferencesModal();
  }

  /**
   * Create and show the cookie banner
   */
  showBanner() {
    // Don't show if already exists
    if (document.getElementById('cookieConsentBanner')) return;
    
    const banner = document.createElement('div');
    banner.id = 'cookieConsentBanner';
    banner.className = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.setAttribute('aria-describedby', 'cookieConsentMessage');
    
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-consent-icon">
          <span class="material-icons-round">cookie</span>
        </div>
        <div class="cookie-consent-text">
          <h3 class="cookie-consent-title">We Value Your Privacy</h3>
          <p id="cookieConsentMessage" class="cookie-consent-message">
            We use cookies and similar technologies to enhance your experience, analyze site traffic, 
            and understand where our visitors are coming from. By clicking "Accept All", you consent 
            to our use of cookies. You can manage your preferences or reject non-essential cookies.
            <a href="/privacy/" class="cookie-consent-link">Learn more</a>
          </p>
        </div>
        <div class="cookie-consent-actions">
          <button 
            id="cookieConsentReject" 
            class="cookie-btn cookie-btn-secondary"
            aria-label="Reject non-essential cookies">
            Reject All
          </button>
          <button 
            id="cookieConsentPreferences" 
            class="cookie-btn cookie-btn-text"
            aria-label="Manage cookie preferences">
            Preferences
          </button>
          <button 
            id="cookieConsentAccept" 
            class="cookie-btn cookie-btn-primary"
            aria-label="Accept all cookies">
            Accept All
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(banner);
    this.banner = banner;
    
    // Add event listeners
    document.getElementById('cookieConsentAccept').addEventListener('click', () => {
      this.acceptAll();
    });
    
    document.getElementById('cookieConsentReject').addEventListener('click', () => {
      this.rejectAll();
    });
    
    document.getElementById('cookieConsentPreferences').addEventListener('click', () => {
      this.showPreferences();
    });
    
    // Animate in
    setTimeout(() => {
      banner.classList.add('show');
    }, 100);
  }

  /**
   * Accept all cookies
   */
  acceptAll() {
    this.setConsent(true, {
      necessary: true,
      analytics: true,
      marketing: false // Not used yet
    });
    this.hideBanner();
  }

  /**
   * Reject non-essential cookies
   */
  rejectAll() {
    this.setConsent(false, {
      necessary: true,
      analytics: false,
      marketing: false
    });
    this.hideBanner();
  }

  /**
   * Set consent and update analytics
   */
  setConsent(analyticsEnabled, preferences = {}) {
    // Store consent
    localStorage.setItem(this.consentKey, analyticsEnabled.toString());
    localStorage.setItem(this.preferencesKey, JSON.stringify(preferences));
    localStorage.setItem(this.bannerShownKey, 'true');
    
    // Update Google Analytics consent
    this.applyConsent(analyticsEnabled);
    
    // Reinitialize analytics if accepted
    if (analyticsEnabled && window.analytics) {
      window.analytics.init();
    }
  }

  /**
   * Apply consent to Google Analytics
   */
  applyConsent(analyticsEnabled) {
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': analyticsEnabled ? 'granted' : 'denied',
        'ad_storage': 'denied' // Always denied for now
      });
    }
  }

  /**
   * Hide banner with animation
   */
  hideBanner() {
    if (this.banner) {
      this.banner.classList.remove('show');
      setTimeout(() => {
        this.banner.remove();
        this.banner = null;
      }, 300);
    }
  }

  /**
   * Show preferences modal
   */
  showPreferences() {
    // Hide banner first
    if (this.banner) {
      this.banner.style.display = 'none';
    }
    
    // Create modal if doesn't exist
    if (!this.modal) {
      this.createPreferencesModal();
    }
    
    this.modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Create preferences modal
   */
  createPreferencesModal() {
    const modal = document.createElement('div');
    modal.id = 'cookiePreferencesModal';
    modal.className = 'cookie-preferences-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'cookiePreferencesTitle');
    modal.setAttribute('aria-modal', 'true');
    
    const currentPreferences = this.getPreferences();
    
    modal.innerHTML = `
      <div class="cookie-preferences-backdrop"></div>
      <div class="cookie-preferences-content">
        <div class="cookie-preferences-header">
          <h2 id="cookiePreferencesTitle">Cookie Preferences</h2>
          <button 
            class="cookie-preferences-close" 
            aria-label="Close preferences">
            <span class="material-icons-round">close</span>
          </button>
        </div>
        
        <div class="cookie-preferences-body">
          <p class="cookie-preferences-intro">
            We use cookies to provide you with the best experience. You can review and control 
            specific types of cookies being used below.
          </p>
          
          <div class="cookie-preference-item">
            <div class="cookie-preference-header">
              <div class="cookie-preference-info">
                <h3>Necessary Cookies</h3>
                <span class="cookie-preference-badge">Always Active</span>
              </div>
            </div>
            <p class="cookie-preference-description">
              Essential for the website to function properly. These cannot be disabled.
            </p>
          </div>
          
          <div class="cookie-preference-item">
            <div class="cookie-preference-header">
              <div class="cookie-preference-info">
                <h3>Analytics Cookies</h3>
                <label class="cookie-toggle">
                  <input 
                    type="checkbox" 
                    id="analyticsToggle" 
                    ${currentPreferences.analytics ? 'checked' : ''}>
                  <span class="cookie-toggle-slider"></span>
                </label>
              </div>
            </div>
            <p class="cookie-preference-description">
              Help us understand how visitors interact with our website by collecting and 
              reporting information anonymously. Includes Google Analytics.
            </p>
          </div>
          
          <div class="cookie-preference-item">
            <div class="cookie-preference-header">
              <div class="cookie-preference-info">
                <h3>Marketing Cookies</h3>
                <label class="cookie-toggle">
                  <input 
                    type="checkbox" 
                    id="marketingToggle" 
                    disabled>
                  <span class="cookie-toggle-slider"></span>
                </label>
              </div>
            </div>
            <p class="cookie-preference-description">
              Not currently used. Reserved for future advertising and marketing features.
            </p>
          </div>
        </div>
        
        <div class="cookie-preferences-footer">
          <button 
            id="savePreferences" 
            class="cookie-btn cookie-btn-primary cookie-btn-large">
            Save Preferences
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    this.modal = modal;
    
    // Add event listeners
    modal.querySelector('.cookie-preferences-close').addEventListener('click', () => {
      this.hidePreferences();
    });
    
    modal.querySelector('.cookie-preferences-backdrop').addEventListener('click', () => {
      this.hidePreferences();
    });
    
    modal.querySelector('#savePreferences').addEventListener('click', () => {
      this.savePreferences();
    });
    
    // Keyboard navigation
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hidePreferences();
      }
    });
  }

  /**
   * Hide preferences modal
   */
  hidePreferences() {
    if (this.modal) {
      this.modal.classList.remove('show');
      document.body.style.overflow = '';
      
      // Show banner again if consent not set
      if (localStorage.getItem(this.consentKey) === null) {
        if (this.banner) {
          this.banner.style.display = 'flex';
        }
      }
    }
  }

  /**
   * Save user preferences
   */
  savePreferences() {
    const analyticsEnabled = document.getElementById('analyticsToggle').checked;
    const marketingEnabled = document.getElementById('marketingToggle').checked;
    
    this.setConsent(analyticsEnabled, {
      necessary: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled
    });
    
    this.hidePreferences();
    this.hideBanner();
    
    // Show confirmation
    this.showConfirmation('Your preferences have been saved.');
  }

  /**
   * Get current preferences
   */
  getPreferences() {
    const stored = localStorage.getItem(this.preferencesKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // Fallback
      }
    }
    
    return {
      necessary: true,
      analytics: false,
      marketing: false
    };
  }

  /**
   * Setup preferences modal access
   */
  setupPreferencesModal() {
    // Allow accessing preferences from footer or settings
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-cookie-preferences]')) {
        e.preventDefault();
        this.showPreferences();
      }
    });
  }

  /**
   * Show confirmation message
   */
  showConfirmation(message) {
    const toast = document.createElement('div');
    toast.className = 'cookie-toast';
    toast.textContent = message;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
  });
} else {
  new CookieConsent();
}
