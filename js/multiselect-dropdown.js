/**
 * ================================================
 * MODERN MULTI-SELECT DROPDOWN COMPONENT
 * ================================================
 * Beautiful multi-select with chips and search
 */

class MultiSelectDropdown {
    constructor(selectElement, options = {}) {
      this.select = selectElement;
      
      // Validate select element
      if (!this.select || this.select.tagName !== 'SELECT') {
        console.error('MultiSelectDropdown requires a valid <select> element');
        return;
      }
  
      this.options = {
        placeholder: options.placeholder || 'Select options...',
        searchPlaceholder: options.searchPlaceholder || 'Search...',
        maxHeight: options.maxHeight || '200px',
        ...options
      };
      this.selectedValues = [];
      this.isOpen = false;
      this.init();
    }
  
    init() {
      this.addStyles();
      this.createDropdown();
      this.bindEvents();
    }
  
    addStyles() {
      if (document.getElementById('multiselect-dropdown-styles')) return;
  
      const style = document.createElement('style');
      style.id = 'multiselect-dropdown-styles';
      style.textContent = `
        /* Multi-Select Container */
        .multiselect-container {
          position: relative;
          width: 100%;
        }
  
        /* Main Select Box */
        .multiselect-select-box {
          min-height: 38px;
          padding: 6px 32px 6px 8px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          align-items: center;
        }
  
        .multiselect-select-box:hover {
          border-color: #3b82f6;
        }
  
        .multiselect-select-box.open {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
  
        /* Placeholder */
        .multiselect-placeholder {
          color: #9ca3af;
          font-size: 0.75rem;
          user-select: none;
        }
  
        /* Selected Chips */
        .multiselect-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 6px;
          background: #eff6ff;
          color: #3b82f6;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 500;
          transition: all 0.15s ease;
        }
  
        .multiselect-chip:hover {
          background: #dbeafe;
        }
  
        .multiselect-chip-remove {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: transparent;
          color: #3b82f6;
          cursor: pointer;
          transition: all 0.15s ease;
        }
  
        .multiselect-chip-remove:hover {
          background: #3b82f6;
          color: white;
        }
  
        /* Arrow Icon */
        .multiselect-arrow {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          transition: transform 0.2s ease;
          color: #6b7280;
        }
  
        .multiselect-arrow.open {
          transform: translateY(-50%) rotate(180deg);
        }
  
        /* Dropdown Menu (portal, fixed positioning) */
        .multiselect-dropdown {
          position: fixed;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          z-index: 9999;
          display: none;
          flex-direction: column;
          max-height: 300px;
          overflow: hidden;
        }
  
        .multiselect-dropdown.open {
          display: flex;
          animation: dropdownFadeIn 0.2s ease-out;
        }
  
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
  
        /* Search Box */
        .multiselect-search {
          padding: 8px;
          border-bottom: 1px solid #f3f4f6;
        }
  
        .multiselect-search input {
          width: 100%;
          padding: 6px 10px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 0.75rem;
          outline: none;
          transition: all 0.2s ease;
        }
  
        .multiselect-search input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
  
        /* Options List */
        .multiselect-options {
          overflow-y: auto;
          max-height: 240px;
        }
  
        /* Custom Scrollbar */
        .multiselect-options::-webkit-scrollbar {
          width: 6px;
        }
  
        .multiselect-options::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
  
        .multiselect-options::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
  
        .multiselect-options::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
  
        /* Option Item */
        .multiselect-option {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          cursor: pointer;
          transition: all 0.15s ease;
          font-size: 0.75rem;
          color: #374151;
          user-select: none;
        }
  
        .multiselect-option:hover {
          background: #f9fafb;
        }
  
        .multiselect-option.selected {
          background: #eff6ff;
          color: #3b82f6;
        }
  
        /* Checkbox in option */
        .multiselect-option-checkbox {
          width: 14px;
          height: 14px;
          border: 2px solid #d1d5db;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }
  
        .multiselect-option.selected .multiselect-option-checkbox {
          background: #3b82f6;
          border-color: #3b82f6;
        }
  
        .multiselect-option-checkbox svg {
          width: 10px;
          height: 10px;
          color: white;
          opacity: 0;
          transition: opacity 0.15s ease;
        }
  
        .multiselect-option.selected .multiselect-option-checkbox svg {
          opacity: 1;
        }
  
        /* No results message */
        .multiselect-no-results {
          padding: 16px;
          text-align: center;
          color: #9ca3af;
          font-size: 0.75rem;
        }
  
        /* Disabled State */
        .multiselect-select-box.disabled {
          background: #f3f4f6;
          cursor: not-allowed;
          opacity: 0.6;
        }
  
        .multiselect-select-box.disabled:hover {
          border-color: #d1d5db;
        }
      `;
      document.head.appendChild(style);
    }
  
    createDropdown() {
      // Hide original select
      this.select.style.display = 'none';
  
      // Create container
      this.container = document.createElement('div');
      this.container.className = 'multiselect-container';
  
      // Create select box
      this.selectBox = document.createElement('div');
      this.selectBox.className = 'multiselect-select-box';
      
      this.placeholder = document.createElement('span');
      this.placeholder.className = 'multiselect-placeholder';
      this.placeholder.textContent = this.options.placeholder;
      this.selectBox.appendChild(this.placeholder);
  
      // Create arrow
      this.arrow = document.createElement('div');
      this.arrow.className = 'multiselect-arrow';
      this.arrow.innerHTML = `
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      `;
  
      // Create dropdown (rendered as a portal under <body>)
      this.dropdown = document.createElement('div');
      this.dropdown.className = 'multiselect-dropdown';
  
      // Create search
      this.searchContainer = document.createElement('div');
      this.searchContainer.className = 'multiselect-search';
      this.searchInput = document.createElement('input');
      this.searchInput.type = 'text';
      this.searchInput.placeholder = this.options.searchPlaceholder;
      this.searchContainer.appendChild(this.searchInput);
  
      // Create options list
      this.optionsList = document.createElement('div');
      this.optionsList.className = 'multiselect-options';
  
      // Populate options
      this.populateOptions();
  
      // Assemble dropdown
      this.dropdown.appendChild(this.searchContainer);
      this.dropdown.appendChild(this.optionsList);
  
      // Assemble container (dropdown will be appended to body as portal)
      this.container.appendChild(this.selectBox);
      this.container.appendChild(this.arrow);
  
      // Insert after original select
      this.select.parentNode.insertBefore(this.container, this.select.nextSibling);
      // Append dropdown to body to avoid affecting parent scroll/overflow
      document.body.appendChild(this.dropdown);
    }
  
    populateOptions() {
      this.optionsList.innerHTML = '';
      
      // Check if select has options
      if (!this.select.options || this.select.options.length === 0) {
        this.optionsList.innerHTML = '<div class="multiselect-no-results">No options available</div>';
        return;
      }
  
      // Convert HTMLCollection to Array properly
      const options = [];
      for (let i = 0; i < this.select.options.length; i++) {
        options.push(this.select.options[i]);
      }
  
      options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'multiselect-option';
        optionDiv.dataset.value = option.value;
  
        if (this.selectedValues.includes(option.value)) {
          optionDiv.classList.add('selected');
        }
  
        optionDiv.innerHTML = `
          <div class="multiselect-option-checkbox">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <span>${option.textContent}</span>
        `;
  
        this.optionsList.appendChild(optionDiv);
      });
    }
  
    bindEvents() {
      // Toggle dropdown
      this.selectBox.addEventListener('click', (e) => {
        if (!e.target.closest('.multiselect-chip-remove')) {
          this.toggle();
        }
      });
  
      // Option click
      this.optionsList.addEventListener('click', (e) => {
        const option = e.target.closest('.multiselect-option');
        if (option) {
          const value = option.dataset.value;
          this.toggleOption(value);
        }
      });
  
      // Search
      this.searchInput.addEventListener('input', (e) => {
        this.filterOptions(e.target.value);
      });
  
      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!this.container.contains(e.target) && !this.dropdown.contains(e.target)) {
          this.close();
        }
      });
  
      // Prevent dropdown close when clicking inside
      this.dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  
    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  
    open() {
      this.isOpen = true;
      this.selectBox.classList.add('open');
      this.arrow.classList.add('open');
      this.dropdown.classList.add('open');
      // Position dropdown as fixed overlay aligned with select box
      this.positionDropdown();
      this.searchInput.focus();
      // Reposition on resize/scroll while open
      this._onWinResize = () => { if (this.isOpen) this.positionDropdown(); };
      this._onWinScroll = () => { if (this.isOpen) this.positionDropdown(); };
      window.addEventListener('resize', this._onWinResize, { passive: true });
      window.addEventListener('scroll', this._onWinScroll, { passive: true });
    }
  
    close() {
      this.isOpen = false;
      this.selectBox.classList.remove('open');
      this.arrow.classList.remove('open');
      this.dropdown.classList.remove('open');
      this.searchInput.value = '';
      this.filterOptions('');
      if (this._onWinResize) window.removeEventListener('resize', this._onWinResize);
      if (this._onWinScroll) window.removeEventListener('scroll', this._onWinScroll);
    }

    positionDropdown() {
      const rect = this.selectBox.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const spaceBelow = viewportH - rect.bottom - 8;
      const spaceAbove = rect.top - 8;
      // Set width to match select box
      this.dropdown.style.position = 'fixed';
      this.dropdown.style.left = `${Math.round(rect.left)}px`;
      this.dropdown.style.width = `${Math.round(rect.width)}px`;
      this.dropdown.style.zIndex = '9999';
      // Estimate needed height (options + search). Default max 300 from CSS. We'll cap to available space.
      const desiredMax = 300;
      // Place below if enough space, else place above
      if (spaceBelow >= Math.min(desiredMax, 200)) {
        this.dropdown.style.top = `${Math.round(rect.bottom + 4)}px`;
        const maxH = Math.max(160, Math.min(desiredMax, spaceBelow));
        this.dropdown.style.maxHeight = `${maxH}px`;
      } else {
        const maxH = Math.max(160, Math.min(desiredMax, spaceAbove));
        this.dropdown.style.top = `${Math.round(rect.top - maxH - 4)}px`;
        this.dropdown.style.maxHeight = `${maxH}px`;
      }
    }
  
    toggleOption(value) {
      const index = this.selectedValues.indexOf(value);
      
      if (index > -1) {
        this.selectedValues.splice(index, 1);
      } else {
        this.selectedValues.push(value);
      }
  
      this.updateUI();
      this.updateOriginalSelect();
      this.triggerChange();
    }
  
    updateUI() {
      // Update chips
      this.selectBox.innerHTML = '';
  
      if (this.selectedValues.length === 0) {
        this.selectBox.appendChild(this.placeholder);
      } else {
        this.selectedValues.forEach(value => {
          const option = this.select.querySelector(`option[value="${value}"]`);
          if (option) {
            const chip = document.createElement('div');
            chip.className = 'multiselect-chip';
            chip.innerHTML = `
              <span>${option.textContent}</span>
              <div class="multiselect-chip-remove" data-value="${value}">
                <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            `;
  
            // Remove chip on click
            chip.querySelector('.multiselect-chip-remove').addEventListener('click', (e) => {
              e.stopPropagation();
              this.toggleOption(value);
            });
  
            this.selectBox.appendChild(chip);
          }
        });
      }
  
      // Update option states
      this.optionsList.querySelectorAll('.multiselect-option').forEach(opt => {
        if (this.selectedValues.includes(opt.dataset.value)) {
          opt.classList.add('selected');
        } else {
          opt.classList.remove('selected');
        }
      });
    }
  
    updateOriginalSelect() {
      for (let i = 0; i < this.select.options.length; i++) {
        this.select.options[i].selected = this.selectedValues.includes(this.select.options[i].value);
      }
    }
  
    filterOptions(searchTerm) {
      const options = this.optionsList.querySelectorAll('.multiselect-option');
      let visibleCount = 0;
  
      options.forEach(option => {
        const text = option.textContent.toLowerCase();
        const matches = text.includes(searchTerm.toLowerCase());
        
        option.style.display = matches ? 'flex' : 'none';
        if (matches) visibleCount++;
      });
  
      // Show no results message
      const noResults = this.optionsList.querySelector('.multiselect-no-results');
      if (noResults) noResults.remove();
  
      if (visibleCount === 0) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'multiselect-no-results';
        noResultsDiv.textContent = 'No results found';
        this.optionsList.appendChild(noResultsDiv);
      }
    }
  
    triggerChange() {
      const event = new Event('change', { bubbles: true });
      this.select.dispatchEvent(event);
    }
  
    // Public API
    getValues() {
      return this.selectedValues;
    }
  
    setValues(values) {
      this.selectedValues = values;
      this.updateUI();
      this.updateOriginalSelect();
    }
  
    clear() {
      this.selectedValues = [];
      this.updateUI();
      this.updateOriginalSelect();
    }
  
    destroy() {
      this.container.remove();
      this.select.style.display = '';
    }
  }
  
  // Auto-initialize
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.multiselect-dropdown').forEach(select => {
      new MultiSelectDropdown(select);
    });
  });
  
  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MultiSelectDropdown;
  }
  