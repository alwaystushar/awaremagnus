/**
 * ================================================
 * MODERN RADIO BUTTON COMPONENT
 * ================================================
 * Beautiful radio buttons with smooth animations
 */

class ModernRadio {
    constructor() {
      this.init();
    }
  
    init() {
      this.addStyles();
      this.bindEvents();
    }
  
    addStyles() {
      if (document.getElementById('modern-radio-styles')) return;
  
      const style = document.createElement('style');
      style.id = 'modern-radio-styles';
      style.textContent = `
        /* Modern Radio Styles */
        .radio-item {
          transition: all 0.2s ease;
          padding: 0.375rem 0;
        }
  
        .radio-item:hover {
          opacity: 0.9;
        }
  
        .visual-radio {
          border: 2px solid #d1d5db;
          background: white;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
  
        .radio-item:hover .visual-radio {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
  
        .real-radio:checked ~ .visual-radio {
          border-color: #3b82f6;
        }
  
        .real-radio:disabled ~ .visual-radio {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: #f3f4f6;
        }
  
        .real-radio:disabled ~ .radio-label {
          opacity: 0.5;
          cursor: not-allowed;
        }
  
        /* Radio dot - Hidden by default */
        .visual-radio::after {
          content: '';
          position: absolute;
          display: none;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3b82f6;
        }
  
        /* Show dot ONLY when checked */
        .real-radio:checked ~ .visual-radio::after {
          display: block;
        }
  
        /* Pop animation on check */
        @keyframes radioPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
  
        .real-radio:checked ~ .visual-radio {
          animation: radioPop 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
  
        /* Focus state for accessibility */
        .real-radio:focus-visible ~ .visual-radio {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
  
        /* Hover effect on label text */
        .radio-item:hover .radio-label {
          color: #1f2937;
        }
  
        /* Color variants */
        .radio-item.success .real-radio:checked ~ .visual-radio {
          border-color: #10b981;
        }
  
        .radio-item.success .real-radio:checked ~ .visual-radio::after {
          background-color: #10b981;
        }
  
        .radio-item.success:hover .visual-radio {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
  
        .radio-item.error .real-radio:checked ~ .visual-radio {
          border-color: #ef4444;
        }
  
        .radio-item.error .real-radio:checked ~ .visual-radio::after {
          background-color: #ef4444;
        }
  
        .radio-item.error:hover .visual-radio {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
  
        .radio-item.warning .real-radio:checked ~ .visual-radio {
          border-color: #f59e0b;
        }
  
        .radio-item.warning .real-radio:checked ~ .visual-radio::after {
          background-color: #f59e0b;
        }
  
        .radio-item.warning:hover .visual-radio {
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }
  
        /* Disabled state */
        .radio-item.disabled {
          pointer-events: none;
          opacity: 0.5;
        }
      `;
      document.head.appendChild(style);
    }
  
    bindEvents() {
      // Handle radio change
      document.addEventListener('change', (e) => {
        if (e.target.classList.contains('real-radio')) {
          this.handleRadioChange(e.target);
        }
      });
  
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          const radioItem = e.target.closest('.radio-item');
          if (radioItem) {
            e.preventDefault();
            const radio = radioItem.querySelector('.real-radio');
            if (radio && !radio.disabled) {
              radio.checked = true;
              radio.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }
        }
      });
    }
  
    handleRadioChange(radio) {
      const radioItem = radio.closest('.radio-item');
      const radioLabel = radioItem?.querySelector('.radio-label')?.textContent || '';
  
      // Emit custom event
      const customEvent = new CustomEvent('modernRadioChange', {
        detail: {
          checked: radio.checked,
          value: radio.value,
          name: radio.name,
          label: radioLabel
        },
        bubbles: true
      });
      radio.dispatchEvent(customEvent);
    }
  
    // Public API methods
    static check(selector) {
      const radio = document.querySelector(selector);
      if (radio && radio.type === 'radio') {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  
    static uncheck(selector) {
      const radio = document.querySelector(selector);
      if (radio && radio.type === 'radio') {
        radio.checked = false;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  
    static getChecked(groupName) {
      const checkedRadio = document.querySelector(`input[name="${groupName}"]:checked`);
      if (checkedRadio) {
        const radioItem = checkedRadio.closest('.radio-item');
        const radioLabel = radioItem?.querySelector('.radio-label')?.textContent || '';
        return {
          value: checkedRadio.value,
          name: checkedRadio.name,
          label: radioLabel,
          element: checkedRadio
        };
      }
      return null;
    }
  
    static disable(selector) {
      const radio = document.querySelector(selector);
      if (radio && radio.type === 'radio') {
        radio.disabled = true;
        const radioItem = radio.closest('.radio-item');
        if (radioItem) radioItem.classList.add('disabled');
      }
    }
  
    static enable(selector) {
      const radio = document.querySelector(selector);
      if (radio && radio.type === 'radio') {
        radio.disabled = false;
        const radioItem = radio.closest('.radio-item');
        if (radioItem) radioItem.classList.remove('disabled');
      }
    }
  
    static setVariant(selector, variant) {
      const radio = document.querySelector(selector);
      if (radio) {
        const radioItem = radio.closest('.radio-item');
        if (radioItem) {
          radioItem.classList.remove('success', 'error', 'warning');
          if (variant) radioItem.classList.add(variant);
        }
      }
    }
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.modernRadio = new ModernRadio();
    });
  } else {
    window.modernRadio = new ModernRadio();
  }
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernRadio;
  }
  