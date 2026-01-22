/**
 * ================================================
 * MODERN CHECKBOX COMPONENT
 * ================================================
 * Empty checkboxes with tick appearing only on selection
 */

class ModernCheckbox {
    constructor() {
      this.init();
    }
  
    init() {
      this.addStyles();
      this.bindEvents();
    }
  
    addStyles() {
      if (document.getElementById('modern-checkbox-styles')) return;
  
      const style = document.createElement('style');
      style.id = 'modern-checkbox-styles';
      style.textContent = `
        /* Custom Checkbox Styles */
        .lang-item {
          transition: all 0.2s ease;
          padding: 0.25rem 0;
        }
  
        .lang-item:hover {
          opacity: 0.9;
        }
  
        /* Visual tick - EMPTY by default */
        .visual-tick {
          border: 2px solid #d1d5db;
          background: white;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
  
        .lang-item:hover .visual-tick {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
  
        /* Checked state - Blue background */
        .real-checkbox:checked ~ .visual-tick {
          background: #3b82f6;
          border-color: #3b82f6;
        }
  
        /* Disabled state */
        .real-checkbox:disabled ~ .visual-tick {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: #f3f4f6;
        }
  
        .real-checkbox:disabled ~ .lang-label {
          opacity: 0.5;
          cursor: not-allowed;
        }
  
        /* Checkmark - Hidden by default, shows only when checked */
        .visual-tick::after {
          content: '';
          position: absolute;
          display: none;
          left: 50%;
          top: 50%;
          width: 3px;
          height: 6px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: translate(-50%, -60%) rotate(45deg);
        }
  
        /* Show checkmark ONLY when checked */
        .real-checkbox:checked ~ .visual-tick::after {
          display: block;
        }
  
        /* Pop animation on check */
        @keyframes checkboxPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
  
        .real-checkbox:checked ~ .visual-tick {
          animation: checkboxPop 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
  
        /* Focus state for accessibility */
        .real-checkbox:focus-visible ~ .visual-tick {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
  
        /* Hover effect on label text */
        .lang-item:hover .lang-label {
          color: #1f2937;
        }
  
        /* Color variants */
        .lang-item.success .real-checkbox:checked ~ .visual-tick {
          background-color: #10b981;
          border-color: #10b981;
        }
  
        .lang-item.success:hover .visual-tick {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
  
        .lang-item.error .real-checkbox:checked ~ .visual-tick {
          background-color: #ef4444;
          border-color: #ef4444;
        }
  
        .lang-item.error:hover .visual-tick {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
  
        .lang-item.warning .real-checkbox:checked ~ .visual-tick {
          background-color: #f59e0b;
          border-color: #f59e0b;
        }
  
        .lang-item.warning:hover .visual-tick {
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }
  
        /* Disabled state */
        .lang-item.disabled {
          pointer-events: none;
          opacity: 0.5;
        }
      `;
      document.head.appendChild(style);
    }
  
    bindEvents() {
      // Handle checkbox change
      document.addEventListener('change', (e) => {
        if (e.target.classList.contains('real-checkbox')) {
          this.handleCheckboxChange(e.target);
        }
      });
  
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          const langItem = e.target.closest('.lang-item');
          if (langItem) {
            e.preventDefault();
            const checkbox = langItem.querySelector('.real-checkbox');
            if (checkbox && !checkbox.disabled) {
              checkbox.checked = !checkbox.checked;
              checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }
        }
      });
    }
  
    handleCheckboxChange(checkbox) {
      const langItem = checkbox.closest('.lang-item');
      const langLabel = langItem?.querySelector('.lang-label')?.textContent || '';
  
      const customEvent = new CustomEvent('modernCheckboxChange', {
        detail: {
          checked: checkbox.checked,
          value: checkbox.value,
          name: checkbox.name,
          label: langLabel
        },
        bubbles: true
      });
      checkbox.dispatchEvent(customEvent);
    }
  
    // Public API methods
    static check(selector) {
      const checkbox = document.querySelector(selector);
      if (checkbox && checkbox.type === 'checkbox') {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  
    static uncheck(selector) {
      const checkbox = document.querySelector(selector);
      if (checkbox && checkbox.type === 'checkbox') {
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  
    static toggle(selector) {
      const checkbox = document.querySelector(selector);
      if (checkbox && checkbox.type === 'checkbox') {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  
    static getChecked(containerSelector) {
      const container = containerSelector ? document.querySelector(containerSelector) : document;
      return Array.from(container.querySelectorAll('.real-checkbox:checked'))
        .map(cb => {
          const langItem = cb.closest('.lang-item');
          const langLabel = langItem?.querySelector('.lang-label')?.textContent || '';
          return {
            value: cb.value,
            name: cb.name,
            label: langLabel,
            element: cb
          };
        });
    }
  
    static getUnchecked(containerSelector) {
      const container = containerSelector ? document.querySelector(containerSelector) : document;
      return Array.from(container.querySelectorAll('.real-checkbox:not(:checked)'))
        .map(cb => {
          const langItem = cb.closest('.lang-item');
          const langLabel = langItem?.querySelector('.lang-label')?.textContent || '';
          return {
            value: cb.value,
            name: cb.name,
            label: langLabel,
            element: cb
          };
        });
    }
  
    static checkAll(containerSelector) {
      const container = containerSelector ? document.querySelector(containerSelector) : document;
      container.querySelectorAll('.real-checkbox').forEach(cb => {
        if (!cb.disabled) {
          cb.checked = true;
          cb.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    }
  
    static uncheckAll(containerSelector) {
      const container = containerSelector ? document.querySelector(containerSelector) : document;
      container.querySelectorAll('.real-checkbox').forEach(cb => {
        if (!cb.disabled) {
          cb.checked = false;
          cb.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    }
  
    static disable(selector) {
      const checkbox = document.querySelector(selector);
      if (checkbox && checkbox.type === 'checkbox') {
        checkbox.disabled = true;
        const langItem = checkbox.closest('.lang-item');
        if (langItem) langItem.classList.add('disabled');
      }
    }
  
    static enable(selector) {
      const checkbox = document.querySelector(selector);
      if (checkbox && checkbox.type === 'checkbox') {
        checkbox.disabled = false;
        const langItem = checkbox.closest('.lang-item');
        if (langItem) langItem.classList.remove('disabled');
      }
    }
  
    static setVariant(selector, variant) {
      const checkbox = document.querySelector(selector);
      if (checkbox) {
        const langItem = checkbox.closest('.lang-item');
        if (langItem) {
          langItem.classList.remove('success', 'error', 'warning');
          if (variant) langItem.classList.add(variant);
        }
      }
    }
  
    static getCount(containerSelector) {
      const container = containerSelector ? document.querySelector(containerSelector) : document;
      const total = container.querySelectorAll('.real-checkbox').length;
      const checked = container.querySelectorAll('.real-checkbox:checked').length;
      return {
        total,
        checked,
        unchecked: total - checked
      };
    }
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.modernCheckbox = new ModernCheckbox();
    });
  } else {
    window.modernCheckbox = new ModernCheckbox();
  }
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernCheckbox;
  }
  