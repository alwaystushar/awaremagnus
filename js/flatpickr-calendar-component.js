/**
 * ================================================
 * MODERN FLATPICKR CALENDAR COMPONENT
 * ================================================
 * Enhanced calendar component using Flatpickr with modern styling
 * Matches calendar-component.js design language
 */

class FlatpickrCalendarComponent {
  constructor() {
    this.pickers = new Map();
    this.init();
  }

  init() {
    this.addStyles();
    this.initializeCalendars();
  }

  addStyles() {
    if (document.getElementById('flatpickr-calendar-styles')) return;

    const style = document.createElement('style');
    style.id = 'flatpickr-calendar-styles';
    style.textContent = `
      /* Modern Calendar Input Wrapper */
      .flatpickr-wrapper {
        position: relative;
        width: 100%;
      }

      /* Calendar Input Styling */
      .flatpickr-input {
        width: 100% !important;
        height: 42px !important;
        padding: 0.625rem 2.5rem 0.625rem 0.75rem !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 0.5rem !important;
        font-size: 0.875rem !important;
        outline: none !important;
        transition: all 0.2s ease !important;
        color: #374151 !important;
        background: white !important;
        cursor: pointer !important;
        font-family: 'Nunito Sans', sans-serif !important;
        line-height: 1.5 !important;
        box-sizing: border-box !important;
      }

      .flatpickr-input:hover {
        border-color: #d1d5db !important;
      }

      .flatpickr-input:focus,
      .flatpickr-input.active {
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
      }

      .flatpickr-input::placeholder {
        color: #9ca3af !important;
      }

      .flatpickr-input:disabled {
        background-color: #f3f4f6 !important;
        cursor: not-allowed !important;
        opacity: 0.6 !important;
      }

      /* Calendar Popup Styling */
      .flatpickr-calendar {
        z-index: 100000 !important;
        background: white !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 0.75rem !important;
        box-shadow: 
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        padding: 1rem !important;
        width: auto !important;
        max-width: 320px !important;
      }

      .flatpickr-months {
        padding: 0 !important;
      }

      .flatpickr-month {
        padding: 0.5rem 0 1rem 0 !important;
      }

      .flatpickr-monthDropdown-months {
        height: 36px !important;
        background-color: transparent !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 0.375rem !important;
      }

      .flatpickr-monthDropdown-months:hover {
        background-color: #f3f4f6 !important;
      }

      /* Calendar Navigation */
      .flatpickr-prev-month,
      .flatpickr-next-month {
        height: 32px !important;
        width: 32px !important;
        padding: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 0.375rem !important;
        transition: all 0.2s ease !important;
        color: #374151 !important;
      }

      .flatpickr-prev-month:hover,
      .flatpickr-next-month:hover {
        background-color: #f3f4f6 !important;
        color: #3b82f6 !important;
      }

      .flatpickr-prev-month svg,
      .flatpickr-next-month svg {
        height: 16px !important;
        width: 16px !important;
      }

      /* Weekday Container */
      .flatpickr-weekdaycontainer {
        padding: 0 0 0.75rem 0 !important;
      }

      .flatpickr-weekday {
        color: #6b7280 !important;
        font-weight: 600 !important;
        font-size: 0.75rem !important;
      }

      /* Day Styling */
      .flatpickr-day {
        height: 36px !important;
        width: 36px !important;
        line-height: 36px !important;
        border-radius: 0.375rem !important;
        transition: all 0.2s ease !important;
        color: #374151 !important;
        margin-bottom: 4px !important;
      }

      .flatpickr-day:hover:not(.disabled):not(.prevMonthDay):not(.nextMonthDay) {
        background-color: #f3f4f6 !important;
        color: #3b82f6 !important;
      }

      /* Selected Day */
      .flatpickr-day.selected {
        background-color: #3b82f6 !important;
        color: white !important;
        border-color: #3b82f6 !important;
        font-weight: 600 !important;
      }

      .flatpickr-day.selected:hover {
        background-color: #1d4ed8 !important;
        border-color: #1d4ed8 !important;
      }

      /* Today Indicator */
      .flatpickr-day.today {
        border-color: #3b82f6 !important;
        color: #3b82f6 !important;
        font-weight: 700 !important;
      }

      .flatpickr-day.today.selected {
        background-color: #3b82f6 !important;
        color: white !important;
      }

      /* Range Styling */
      .flatpickr-day.inRange {
        background-color: #dbeafe !important;
        color: #3b82f6 !important;
        box-shadow: none !important;
        border-color: #dbeafe !important;
      }

      /* Disabled/Other Month Days */
      .flatpickr-day.disabled,
      .flatpickr-day.prevMonthDay,
      .flatpickr-day.nextMonthDay {
        color: #d1d5db !important;
        background-color: transparent !important;
        cursor: not-allowed !important;
      }

      .flatpickr-day.disabled:hover,
      .flatpickr-day.prevMonthDay:hover,
      .flatpickr-day.nextMonthDay:hover {
        background-color: transparent !important;
        color: #d1d5db !important;
      }

      /* Alt Input Display Styling */
      .flatpickr-input.input-alt {
        background: transparent !important;
        border: none !important;
        cursor: pointer !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        font-weight: 500 !important;
        color: #374151 !important;
      }

      /* Calendar Icon Overlay */
      .flatpickr-calendar.open {
        animation: slideDown 0.2s ease !important;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Time Picker (if enabled) */
      .flatpickr-time {
        border-top: 1px solid #e5e7eb !important;
        padding-top: 0.75rem !important;
      }

      .flatpickr-time input {
        background-color: #f3f4f6 !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 0.375rem !important;
        color: #374151 !important;
      }

      .flatpickr-time input:focus {
        outline: none !important;
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
      }

      /* Action Buttons */
      .flatpickr-action button {
        background-color: #3b82f6 !important;
        color: white !important;
        border: none !important;
        border-radius: 0.375rem !important;
        padding: 0.5rem 1rem !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
      }

      .flatpickr-action button:hover {
        background-color: #1d4ed8 !important;
      }

      .flatpickr-action button:nth-child(2) {
        background-color: #ef4444 !important;
      }

      .flatpickr-action button:nth-child(2):hover {
        background-color: #dc2626 !important;
      }
    `;

    document.head.appendChild(style);
  }

  initializeCalendars() {
    if (!window.flatpickr) return;

    // Initialize all date inputs with class 'flatpickr-date'
    const dateInputs = document.querySelectorAll('.flatpickr-date, #startDate, #endDate');
    
    dateInputs.forEach(input => {
      if (this.pickers.has(input.id)) return; // Skip already initialized

      const isSingleDate = input.id === 'startDate' || input.id === 'endDate';
      
      const config = {
        altInput: true,
        altFormat: 'M j, Y',
        dateFormat: 'Y-m-d',
        enableTime: false,
        enableSeconds: false,
        static: false,
        monthSelectorType: 'dropdown',
        showMonths: 1,
        disableMobile: true,
        mode: 'single',
        allowInput: true,
        onOpen: [this.handleCalendarOpen.bind(this)],
        onClose: [this.handleCalendarClose.bind(this)]
      };

      const picker = flatpickr(input, config);
      this.pickers.set(input.id, picker);

      // Add min date (today)
      const today = new Date();
      picker.set('minDate', today);
    });

    // Handle date range linkage
    this.setupDateRangeLinkage();
  }

  setupDateRangeLinkage() {
    const startInput = document.getElementById('startDate');
    const endInput = document.getElementById('endDate');

    if (!startInput || !endInput) return;

    const startPicker = this.pickers.get('startDate');
    const endPicker = this.pickers.get('endDate');

    if (!startPicker || !endPicker) return;

    // When start date changes, update end date min
    startPicker.config.onChange.push((selectedDates, dateStr) => {
      if (dateStr) {
        endPicker.set('minDate', dateStr);
        // If end date is before new start date, clear it
        if (endInput.value && endInput.value < dateStr) {
          endPicker.clear();
          showToast('End date was reset. It must be after start date.', 'warning');
        }
      }
    });

    // When end date changes, update start date max
    endPicker.config.onChange.push((selectedDates, dateStr) => {
      if (dateStr) {
        startPicker.set('maxDate', dateStr);
        // If start date is after new end date, clear it
        if (startInput.value && startInput.value > dateStr) {
          startPicker.clear();
          showToast('Start date was reset. It must be before end date.', 'error');
        }
      }
    });
  }

  handleCalendarOpen(selectedDates, dateStr, instance) {
    // Add smooth animation
    const calendar = instance.calendarContainer;
    if (calendar) {
      calendar.classList.add('open');
    }
  }

  handleCalendarClose(selectedDates, dateStr, instance) {
    // Cleanup if needed
  }

  /**
   * Get all calendar instances
   */
  getPickers() {
    return this.pickers;
  }

  /**
   * Get a specific picker by input ID
   */
  getPicker(inputId) {
    return this.pickers.get(inputId);
  }

  /**
   * Set date on a specific input
   */
  setDate(inputId, dateStr) {
    const picker = this.pickers.get(inputId);
    if (picker) {
      picker.setDate(dateStr);
    }
  }

  /**
   * Clear a specific date input
   */
  clearDate(inputId) {
    const picker = this.pickers.get(inputId);
    if (picker) {
      picker.clear();
    }
  }

  /**
   * Disable specific dates
   */
  disableDates(inputId, dates) {
    const picker = this.pickers.get(inputId);
    if (picker) {
      picker.set('disable', dates);
    }
  }

  /**
   * Enable specific dates
   */
  enableDates(inputId) {
    const picker = this.pickers.get(inputId);
    if (picker) {
      picker.set('disable', []);
    }
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.FlatpickrCalendarComponent = new FlatpickrCalendarComponent();
  });
} else {
  window.FlatpickrCalendarComponent = new FlatpickrCalendarComponent();
}
