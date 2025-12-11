/**
 * Job Club Onboarding System
 * Handles multi-step form progression, validation, and state management
 * Implements accessibility patterns (A6, A7) and performance optimizations (P5)
 */

class OnboardingManager {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 5;
    this.formData = {};
    this.init();
  }

  init() {
    this.cacheElements();
    this.attachEventListeners();
    this.loadSavedProgress();
    this.updateProgress();
  }

  cacheElements() {
    this.progressBar = document.getElementById('onboarding-progress');
    this.steps = document.querySelectorAll('.onboarding-step');
    this.progressSteps = document.querySelectorAll('.progress-step');
    this.actionButtons = document.querySelectorAll('[data-action]');
  }

  attachEventListeners() {
    // Navigation buttons
    this.actionButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleAction(e));
    });

    // Form inputs - save on change
    document.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('change', () => this.saveProgress());
      input.addEventListener('blur', (e) => this.validateField(e.target));
    });

    // Career goal dropdown - show/hide "other" field and info cards
    const careerGoalSelect = document.getElementById('careerGoal');
    if (careerGoalSelect) {
      careerGoalSelect.addEventListener('change', (e) => {
        this.handleCareerGoalChange(e);
      });
    }

    // Keyboard navigation (A7 pattern)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.showExitDialog();
      }
    });

    // Prevent accidental page exit
    window.addEventListener('beforeunload', (e) => {
      if (this.currentStep > 1 && this.currentStep < this.totalSteps) {
        e.preventDefault();
        e.returnValue = 'You have unsaved onboarding progress. Are you sure you want to leave?';
      }
    });
  }

  handleAction(e) {
    const action = e.target.dataset.action;
    
    switch(action) {
      case 'next':
        this.goToNextStep();
        break;
      case 'prev':
        this.goToPreviousStep();
        break;
      case 'complete':
        this.completeOnboarding();
        break;
    }
  }

  async goToNextStep() {
    // Validate current step before proceeding
    if (!await this.validateCurrentStep()) {
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.hideStep(this.currentStep);
      this.currentStep++;
      this.showStep(this.currentStep);
      this.updateProgress();
      this.saveProgress();
      this.scrollToTop();
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.hideStep(this.currentStep);
      this.currentStep--;
      this.showStep(this.currentStep);
      this.updateProgress();
      this.scrollToTop();
    }
  }

  showStep(stepNumber) {
    const step = document.querySelector(`[data-step="${stepNumber}"]`);
    if (step) {
      step.classList.add('active');
      // Focus first interactive element (A7 pattern)
      const firstInput = step.querySelector('input, select, button, textarea');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }

  hideStep(stepNumber) {
    const step = document.querySelector(`[data-step="${stepNumber}"]`);
    if (step) {
      step.classList.remove('active');
    }
  }

  updateProgress() {
    // Update progress bar (S1 pattern)
    if (this.progressBar) {
      this.progressBar.setAttribute('aria-valuenow', this.currentStep);
    }

    // Update visual progress steps
    this.progressSteps.forEach((step, index) => {
      const stepNumber = index + 1;
      
      if (stepNumber < this.currentStep) {
        step.classList.add('completed');
        step.classList.remove('active');
      } else if (stepNumber === this.currentStep) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else {
        step.classList.remove('active', 'completed');
      }
    });
  }

  async validateCurrentStep() {
    switch(this.currentStep) {
      case 1:
        return true; // Welcome screen, no validation needed
      
      case 2:
        return this.validateProfileForm();
      
      case 3:
        return this.validateCareerGoalForm();
      
      case 4:
        return this.validateLinksForm();
      
      case 5:
        return true; // Community is optional
      
      default:
        return true;
    }
  }

  validateProfileForm() {
    const form = document.getElementById('profile-form');
    if (!form) return true;

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateCareerGoalForm() {
    const careerGoal = document.getElementById('careerGoal');
    
    if (!careerGoal || !careerGoal.value) {
      this.showFieldError(careerGoal, 'Please select a career goal');
      return false;
    }

    // If "other" is selected, check if text is provided
    if (careerGoal.value === 'other') {
      const otherText = document.getElementById('otherCareerGoalText');
      if (!otherText || !otherText.value.trim()) {
        this.showFieldError(otherText, 'Please specify your career goal');
        return false;
      }
    }

    return true;
  }

  validateLinksForm() {
    const form = document.getElementById('links-form');
    if (!form) return true;

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const errorSpan = field.parentElement.querySelector('.form-error');
    
    // Clear previous error
    field.classList.remove('error');
    if (errorSpan) {
      errorSpan.textContent = '';
    }

    // Required validation
    if (field.hasAttribute('required') && !value) {
      this.showFieldError(field, 'This field is required');
      return false;
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showFieldError(field, 'Please enter a valid email address');
        return false;
      }
    }

    // URL validation with pattern
    if (field.type === 'url' && value) {
      const pattern = field.getAttribute('pattern');
      if (pattern) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
          let message = 'Please enter a valid URL';
          if (field.id === 'linkedinUrl') message = 'Please enter a valid LinkedIn URL';
          if (field.id === 'githubUrl') message = 'Please enter a valid GitHub URL';
          if (field.id === 'calendlyUrl') message = 'Please enter a valid Calendly URL';
          this.showFieldError(field, message);
          return false;
        }
      } else {
        // Basic URL validation
        try {
          new URL(value);
        } catch {
          this.showFieldError(field, 'Please enter a valid URL starting with http:// or https://');
          return false;
        }
      }
    }

    return true;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    const errorSpan = field.parentElement.querySelector('.form-error');
    if (errorSpan) {
      errorSpan.textContent = message;
    }
    
    // Announce error to screen readers (A4 pattern)
    this.announceToScreenReader(message);
  }

  validateCareerPath() {
    const selectedPath = document.querySelector('input[name="careerPath"]:checked');
    
    if (!selectedPath) {
      this.announceToScreenReader('Please select a career path to continue');
      return false;
    }

    return true;
  }

  handleCareerGoalChange(e) {
    const selectedValue = e.target.value;
    const otherField = document.getElementById('otherCareerGoal');
    const infoCards = document.querySelectorAll('.info-card');
    
    // Show/hide "other" text field
    if (otherField) {
      otherField.style.display = selectedValue === 'other' ? 'block' : 'none';
    }
    
    // Show relevant info card
    infoCards.forEach(card => {
      card.style.display = 'none';
    });
    
    const activeCard = document.querySelector(`[data-career="${selectedValue}"]`);
    if (activeCard) {
      activeCard.style.display = 'block';
    }
    
    this.saveProgress();
  }

  handleCareerPathSelection(e) {
    // Visual feedback for selected path
    document.querySelectorAll('.career-path-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    e.target.closest('.career-path-card').classList.add('selected');
  }

  enableNextButton() {
    const nextButton = document.querySelector(`#step-${this.currentStep} [data-action="next"]`);
    if (nextButton) {
      nextButton.disabled = false;
    }
  }

  saveProgress() {
    // Save form data to localStorage
    const formData = {
      step: this.currentStep,
      fullName: document.getElementById('fullName')?.value || '',
      email: document.getElementById('email')?.value || '',
      major: document.getElementById('major')?.value || '',
      graduationYear: document.getElementById('graduationYear')?.value || '',
      careerGoal: document.getElementById('careerGoal')?.value || '',
      otherCareerGoal: document.getElementById('otherCareerGoalText')?.value || '',
      linkedinUrl: document.getElementById('linkedinUrl')?.value || '',
      githubUrl: document.getElementById('githubUrl')?.value || '',
      portfolioUrl: document.getElementById('portfolioUrl')?.value || '',
      calendlyUrl: document.getElementById('calendlyUrl')?.value || '',
      notifications: {
        events: document.querySelector('input[name="notify-events"]')?.checked || false,
        workshops: document.querySelector('input[name="notify-workshops"]')?.checked || false,
        mentoring: document.querySelector('input[name="notify-mentoring"]')?.checked || false
      }
    };

    localStorage.setItem('jobclub-onboarding', JSON.stringify(formData));
    this.formData = formData;
  }

  loadSavedProgress() {
    const savedData = localStorage.getItem('jobclub-onboarding');
    
    if (!savedData) return;

    try {
      const data = JSON.parse(savedData);
      this.formData = data;

      // Ask user if they want to continue from where they left off
      if (data.step > 1) {
        const resume = confirm('You have incomplete onboarding progress. Would you like to continue where you left off?');
        
        if (resume) {
          this.restoreFormData(data);
          this.currentStep = data.step;
          this.hideStep(1);
          this.showStep(this.currentStep);
          this.updateProgress();
        } else {
          localStorage.removeItem('jobclub-onboarding');
        }
      } else {
        this.restoreFormData(data);
      }
    } catch (e) {
      console.error('Error loading saved progress:', e);
    }
  }

  restoreFormData(data) {
    // Restore profile fields
    if (data.fullName) document.getElementById('fullName').value = data.fullName;
    if (data.email) document.getElementById('email').value = data.email;
    if (data.major) document.getElementById('major').value = data.major;
    if (data.graduationYear) document.getElementById('graduationYear').value = data.graduationYear;

    // Restore career goal
    if (data.careerGoal) {
      const select = document.getElementById('careerGoal');
      if (select) {
        select.value = data.careerGoal;
        // Trigger change event to show info card
        select.dispatchEvent(new Event('change'));
      }
    }
    if (data.otherCareerGoal) {
      document.getElementById('otherCareerGoalText').value = data.otherCareerGoal;
    }

    // Restore professional links
    if (data.linkedinUrl) document.getElementById('linkedinUrl').value = data.linkedinUrl;
    if (data.githubUrl) document.getElementById('githubUrl').value = data.githubUrl;
    if (data.portfolioUrl) document.getElementById('portfolioUrl').value = data.portfolioUrl;
    if (data.calendlyUrl) document.getElementById('calendlyUrl').value = data.calendlyUrl;

    // Restore notifications
    if (data.notifications) {
      if (data.notifications.events !== undefined) {
        const cb = document.querySelector('input[name="notify-events"]');
        if (cb) cb.checked = data.notifications.events;
      }
      if (data.notifications.workshops !== undefined) {
        const cb = document.querySelector('input[name="notify-workshops"]');
        if (cb) cb.checked = data.notifications.workshops;
      }
      if (data.notifications.mentoring !== undefined) {
        const cb = document.querySelector('input[name="notify-mentoring"]');
        if (cb) cb.checked = data.notifications.mentoring;
      }
    }
  }

  async completeOnboarding() {
    this.saveProgress();
    
    // Show success animation
    this.showSuccessMessage();
    
    // Send data to backend (placeholder)
    await this.submitOnboardingData();
    
    // Clear saved progress
    localStorage.removeItem('jobclub-onboarding');
    
    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = '/dashboard/';
    }, 2000);
  }

  async submitOnboardingData() {
    // Placeholder for API call
    console.log('Submitting onboarding data:', this.formData);
    
    // In production, this would be:
    // const response = await fetch('/api/onboarding', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(this.formData)
    // });
    // return response.json();
    
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  showSuccessMessage() {
    const successHTML = `
      <div class="success-overlay" role="alert" aria-live="polite">
        <div class="success-content">
          <div class="success-icon">🎉</div>
          <h2>Welcome to Job Club!</h2>
          <p>Your profile has been created successfully.</p>
          <div class="loading-spinner"></div>
          <p class="text-sm">Redirecting to your dashboard...</p>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
  }

  showExitDialog() {
    if (this.currentStep > 1 && this.currentStep < this.totalSteps) {
      const exit = confirm('Your progress will be saved. Do you want to exit onboarding?');
      if (exit) {
        this.saveProgress();
        window.location.href = '/';
      }
    }
  }

  scrollToTop() {
    // Smooth scroll to top (P5 pattern)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  announceToScreenReader(message) {
    // Create live region for screen reader announcements (A3, A4 pattern)
    let liveRegion = document.getElementById('sr-live-region');
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'sr-live-region';
      liveRegion.className = 'sr-only';
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
  }
}

// Initialize onboarding when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new OnboardingManager());
} else {
  new OnboardingManager();
}
