/**
 * ================================================
 * MODERN CUSTOM DROPDOWN COMPONENT
 * ================================================
 * Beautiful custom dropdown to replace native select - 47px height
 * Now supports rounded-full option
 */

class ModernDropdown {
  constructor() {
    this.activeDropdown = null;
    this.init();
  }

  init() {
    this.addStyles();
    this.enhanceDropdowns();
    this.bindGlobalEvents();
  }

  addStyles() {
    if (document.getElementById('modern-dropdown-styles')) return;

    const style = document.createElement('style');
    style.id = 'modern-dropdown-styles';
    style.textContent = `
      /* Hide original select */
      .modern-dropdown-wrapper select {
        display: none;
      }

      /* Custom Dropdown Container */
      .modern-dropdown-wrapper {
        position: relative;
        width: 100%;
      }

      /* Dropdown Button - 47px height to match input-field */
      .modern-dropdown-button {
        width: 100%;
        height: 47px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 0 2.5rem 0 0.75rem;
        font-size: 0.75rem;
        color: #374151;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;
        user-select: none;
        outline: none;
        line-height: 1.5;
      }

      .modern-dropdown-button:hover {
        border-color: #d1d5db;
      }

      .modern-dropdown-button.active {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .modern-dropdown-button.error {
        border-color: #ef4444;
      }

      .modern-dropdown-button.error.active {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }

      .modern-dropdown-button.success {
        border-color: #10b981;
      }

      .modern-dropdown-button.success.active {
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
      }

      /* Placeholder text */
      .modern-dropdown-button .placeholder {
        color: #9ca3af;
      }

      /* Dropdown Arrow */
      .modern-dropdown-arrow {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        transition: transform 0.2s ease;
      }

      .modern-dropdown-arrow svg {
        width: 1rem;
        height: 1rem;
        color: #6b7280;
        transition: color 0.2s;
      }

      .modern-dropdown-button.active .modern-dropdown-arrow {
        transform: translateY(-50%) rotate(180deg);
      }

      .modern-dropdown-button.active .modern-dropdown-arrow svg {
        color: #3b82f6;
      }

      /* Dropdown Menu */
      .modern-dropdown-menu {
        position: absolute;
        top: calc(100% + 0.25rem);
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        max-height: 240px;
        overflow-y: auto;
        z-index: 50;
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
        transition: all 0.2s ease;
      }

      .modern-dropdown-menu.active {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }

      /* Dropdown Options */
      .modern-dropdown-option {
        padding: 0.625rem 0.75rem;
        cursor: pointer;
        transition: all 0.15s;
        color: #374151;
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .modern-dropdown-option:hover {
        background: #f3f4f6;
      }

      .modern-dropdown-option.selected {
        background: #eff6ff;
        color: #3b82f6;
        font-weight: 500;
      }

      .modern-dropdown-option.selected::after {
        content: '✓';
        font-weight: bold;
        color: #3b82f6;
      }

      .modern-dropdown-option:first-child {
        border-radius: 0.5rem 0.5rem 0 0;
      }

      .modern-dropdown-option:last-child {
        border-radius: 0 0 0.5rem 0.5rem;
      }

      /* Scrollbar styling */
      .modern-dropdown-menu::-webkit-scrollbar {
        width: 6px;
      }

      .modern-dropdown-menu::-webkit-scrollbar-track {
        background: #f3f4f6;
        border-radius: 0.5rem;
      }

      .modern-dropdown-menu::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 0.5rem;
      }

      .modern-dropdown-menu::-webkit-scrollbar-thumb:hover {
        background: #9ca3af;
      }

      /* ============================================
         ROUNDED-FULL VARIANT
      ============================================ */
      .modern-dropdown-wrapper.rounded-full .modern-dropdown-button {
        border-radius: 9999px;
        padding: 0 2.5rem 0 1rem;
      }

      .modern-dropdown-wrapper.rounded-full .modern-dropdown-menu {
        border-radius: 1rem;
        margin-top: 0.5rem;
      }

      .modern-dropdown-wrapper.rounded-full .modern-dropdown-option:first-child {
        border-radius: 1rem 1rem 0 0;
      }

      .modern-dropdown-wrapper.rounded-full .modern-dropdown-option:last-child {
        border-radius: 0 0 1rem 1rem;
      }

      /* ============================================
         SIZE VARIANTS
      ============================================ */
      
      /* Small Size */
      .modern-dropdown-wrapper.small .modern-dropdown-button {
        height: 39px;
        padding: 0 2rem 0 0.625rem;
        font-size: 0.75rem;
      }

      .modern-dropdown-wrapper.small .modern-dropdown-option {
        padding: 0.5rem 0.625rem;
        font-size: 0.75rem;
      }

      .modern-dropdown-wrapper.small.rounded-full .modern-dropdown-button {
        padding: 0 2rem 0 0.875rem;
      }

      /* Large Size */
      .modern-dropdown-wrapper.large .modern-dropdown-button {
        height: 55px;
        padding: 0 3rem 0 1rem;
        font-size: 0.875rem;
      }

      .modern-dropdown-wrapper.large .modern-dropdown-option {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
      }

      .modern-dropdown-wrapper.large.rounded-full .modern-dropdown-button {
        padding: 0 3rem 0 1.25rem;
      }

      /* ============================================
         DISABLED STATE
      ============================================ */
      .modern-dropdown-wrapper.disabled .modern-dropdown-button {
        background: #f3f4f6;
        color: #9ca3af;
        cursor: not-allowed;
        opacity: 0.6;
      }

      .modern-dropdown-wrapper.disabled .modern-dropdown-button:hover {
        border-color: #e5e7eb;
      }

      /* ============================================
         ANIMATION
      ============================================ */
      @keyframes dropdownFadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .modern-dropdown-menu.active {
        animation: dropdownFadeIn 0.2s ease;
      }
    `;
    document.head.appendChild(style);
  }

  enhanceDropdowns() {
    document.querySelectorAll('select.modern-select').forEach(select => {
      this.createCustomDropdown(select);
    });
  }

  createCustomDropdown(select) {
    if (select.dataset.enhanced) return;
    select.dataset.enhanced = 'true';

    const wrapper = document.createElement('div');
    wrapper.className = 'modern-dropdown-wrapper';
    
    // Transfer size class
    if (select.classList.contains('small')) wrapper.classList.add('small');
    if (select.classList.contains('large')) wrapper.classList.add('large');
    
    // Transfer rounded-full class
    if (select.classList.contains('rounded-full')) wrapper.classList.add('rounded-full');

    // Get current selected option
    const selectedOption = select.options[select.selectedIndex];
    const selectedText = selectedOption ? selectedOption.text : 'Select...';
    const isPlaceholder = !select.value;

    // Create button
    const button = document.createElement('div');
    button.className = 'modern-dropdown-button';
    button.innerHTML = `
      <span class="${isPlaceholder ? 'placeholder' : ''}">${selectedText}</span>
      <div class="modern-dropdown-arrow">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    `;

    // Create menu
    const menu = document.createElement('div');
    menu.className = 'modern-dropdown-menu';

    // Populate options
    Array.from(select.options).forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'modern-dropdown-option';
      optionDiv.textContent = option.text;
      optionDiv.dataset.value = option.value;
      
      if (option.selected) {
        optionDiv.classList.add('selected');
      }

      optionDiv.addEventListener('click', () => {
        this.selectOption(select, option.value, optionDiv.textContent);
      });

      menu.appendChild(optionDiv);
    });

    // Button click handler
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown(wrapper, button, menu);
    });

    // Insert after select
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);
    wrapper.appendChild(button);
    wrapper.appendChild(menu);
  }

  toggleDropdown(wrapper, button, menu) {
    const isActive = button.classList.contains('active');

    // Close all other dropdowns
    this.closeAllDropdowns();

    if (!isActive) {
      button.classList.add('active');
      menu.classList.add('active');
      this.activeDropdown = { wrapper, button, menu };
    }
  }

  closeAllDropdowns() {
    document.querySelectorAll('.modern-dropdown-button.active').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelectorAll('.modern-dropdown-menu.active').forEach(menu => {
      menu.classList.remove('active');
    });
    this.activeDropdown = null;
  }

  selectOption(select, value, text) {
    select.value = value;
    
    const wrapper = select.closest('.modern-dropdown-wrapper');
    const button = wrapper.querySelector('.modern-dropdown-button');
    const menu = wrapper.querySelector('.modern-dropdown-menu');

    // Update button text
    const span = button.querySelector('span');
    span.textContent = text;
    span.classList.toggle('placeholder', !value);

    // Update selected state
    menu.querySelectorAll('.modern-dropdown-option').forEach(opt => {
      opt.classList.toggle('selected', opt.dataset.value === value);
    });

    // Trigger change event
    select.dispatchEvent(new Event('change', { bubbles: true }));

    // Close dropdown
    this.closeAllDropdowns();
  }

  bindGlobalEvents() {
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.modern-dropdown-wrapper')) {
        this.closeAllDropdowns();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllDropdowns();
      }
    });
  }

  // Public API
  static setValue(selector, value) {
    const select = document.querySelector(selector);
    if (!select) return;

    const wrapper = select.closest('.modern-dropdown-wrapper');
    const option = Array.from(select.options).find(opt => opt.value === value);
    
    if (option) {
      window.modernDropdown.selectOption(select, value, option.text);
    }
  }

  static getValue(selector) {
    const select = document.querySelector(selector);
    return select?.value || null;
  }

  static setError(selector) {
    const select = document.querySelector(selector);
    if (select) {
      const button = select.closest('.modern-dropdown-wrapper')?.querySelector('.modern-dropdown-button');
      if (button) {
        button.classList.remove('success');
        button.classList.add('error');
      }
    }
  }

  static setSuccess(selector) {
    const select = document.querySelector(selector);
    if (select) {
      const button = select.closest('.modern-dropdown-wrapper')?.querySelector('.modern-dropdown-button');
      if (button) {
        button.classList.remove('error');
        button.classList.add('success');
      }
    }
  }

  static clearState(selector) {
    const select = document.querySelector(selector);
    if (select) {
      const button = select.closest('.modern-dropdown-wrapper')?.querySelector('.modern-dropdown-button');
      if (button) {
        button.classList.remove('error', 'success');
      }
    }
  }

  static disable(selector) {
    const select = document.querySelector(selector);
    if (select) {
      select.disabled = true;
      const wrapper = select.closest('.modern-dropdown-wrapper');
      if (wrapper) wrapper.classList.add('disabled');
    }
  }

  static enable(selector) {
    const select = document.querySelector(selector);
    if (select) {
      select.disabled = false;
      const wrapper = select.closest('.modern-dropdown-wrapper');
      if (wrapper) wrapper.classList.remove('disabled');
    }
  }
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.modernDropdown = new ModernDropdown();
  });
} else {
  window.modernDropdown = new ModernDropdown();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ModernDropdown;
}

console.log('✅ Modern Dropdown Component loaded with rounded-full support');
