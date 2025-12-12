/**
 * Onboarding Form Handler
 * Handles form submission to Sanity CMS with validation and user feedback
 */

class OnboardingForm {
  constructor() {
    this.form = document.getElementById('onboardingForm');
    this.errorMessage = document.getElementById('errorMessage');
    this.successMessage = document.getElementById('successMessage');
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.originalButtonText = this.submitButton.innerHTML;
    
    this.init();
  }
  
  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.setupRealtimeValidation();
  }
  
  /**
   * Setup real-time URL validation
   */
  setupRealtimeValidation() {
    const urlInputs = ['linkedin', 'github', 'website', 'calendly'];
    
    urlInputs.forEach(inputId => {
      const input = document.getElementById(inputId);
      
      input.addEventListener('blur', () => {
        this.validateUrlField(input);
      });
      
      // Clear validation on focus
      input.addEventListener('focus', () => {
        input.style.borderColor = '';
      });
    });
  }
  
  /**
   * Validate individual URL field
   */
  validateUrlField(input) {
    const value = input.value.trim();
    
    if (value === '') {
      return false;
    }
    
    try {
      new URL(value);
      
      // Check domain-specific requirements
      const domainChecks = {
        linkedin: 'linkedin.com',
        github: 'github.com',
        calendly: 'calendly.com'
      };
      
      const expectedDomain = domainChecks[input.id];
      if (expectedDomain) {
        const url = new URL(value);
        if (!url.hostname.includes(expectedDomain)) {
          input.style.borderColor = '#EF5350';
          return false;
        }
      }
      
      input.style.borderColor = '#66BB6A';
      return true;
    } catch {
      input.style.borderColor = '#EF5350';
      return false;
    }
  }
  
  /**
   * Show loading state
   */
  setLoading(loading) {
    if (loading) {
      this.submitButton.disabled = true;
      this.submitButton.innerHTML = `
        <span class="flex items-center justify-center gap-2">
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Submitting...
        </span>
      `;
    } else {
      this.submitButton.disabled = false;
      this.submitButton.innerHTML = this.originalButtonText;
    }
  }
  
  /**
   * Show error message
   */
  showError(message) {
    this.hideMessages();
    this.errorMessage.querySelector('p').textContent = message;
    this.errorMessage.classList.remove('hidden');
    this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  /**
   * Show success message
   */
  showSuccess(message, hasWarnings = false) {
    this.hideMessages();
    
    let iconColor = hasWarnings ? '#FB8C00' : '#66BB6A';
    let bgColor = hasWarnings ? '#FFF3E0' : '#E8F5E9';
    let borderColor = hasWarnings ? '#FB8C00' : '#66BB6A';
    let textColor = hasWarnings ? '#E65100' : '#2E7D32';
    let icon = hasWarnings ? 'warning' : 'check_circle';
    
    this.successMessage.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="material-icons-round" style="color: ${iconColor}">${icon}</span>
        <p class="font-medium">${message}</p>
      </div>
    `;
    this.successMessage.style.backgroundColor = bgColor;
    this.successMessage.style.borderColor = borderColor;
    this.successMessage.style.color = textColor;
    this.successMessage.classList.remove('hidden');
    this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  /**
   * Hide all messages
   */
  hideMessages() {
    this.errorMessage.classList.add('hidden');
    this.successMessage.classList.add('hidden');
  }
  
  /**
   * Get API endpoint URL
   */
  getApiEndpoint() {
    // Use environment variable for webhook URL
    // In production, this should be set via build environment variables
    return process.env.EMAIL_WEBHOOK_URL || '/api/submit-onboarding';
  }
  
  /**
   * Handle form submission
   */
  async handleSubmit(e) {
    e.preventDefault();
    
    this.hideMessages();
    this.setLoading(true);
    
    try {
      // Collect form data
      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        major: document.getElementById('major').value.trim(),
        graduationYear: document.getElementById('gradYear').value,
        linkedinUrl: document.getElementById('linkedin').value.trim(),
        githubUrl: document.getElementById('github').value.trim(),
        websiteUrl: document.getElementById('website').value.trim(),
        calendlyUrl: document.getElementById('calendly').value.trim(),
        careerGoal: document.getElementById('careerGoal').value.trim()
      };
      
      // Client-side validation
      const requiredFields = ['name', 'email', 'major', 'graduationYear', 'careerGoal'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          this.setLoading(false);
          this.showError(`Please fill in all required fields.`);
          return;
        }
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        this.setLoading(false);
        this.showError('Please enter a valid email address.');
        return;
      }
      
      // Submit to Zapier webhook
      const response = await fetch(this.getApiEndpoint(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // Zapier returns 200 OK with different response format
      if (!response.ok) {
        throw new Error('Failed to submit profile');
      }
      
      // Store basic info in localStorage for quick access
      localStorage.setItem('jobClubMemberName', formData.name);
      localStorage.setItem('jobClubMemberEmail', formData.email);
      
      // Show success message
      this.showSuccess('🎉 Profile submitted successfully! Welcome to Job Club. Check your email for next steps!');
      
      // Log for debugging
      console.log('Submission successful');
      
      // Redirect after delay
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
      this.showError(`Failed to submit profile: ${error.message}`);
    } finally {
      this.setLoading(false);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new OnboardingForm();
  });
} else {
  new OnboardingForm();
}
