/**
 * Minimal Flatpickr Calendar Component
 * Simple, clean calendar without fancy styling
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
    const style = document.createElement('style');
    style.textContent = `
      .flatpickr-calendar {
        background: white;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        font-size: 12px;
        z-index: 99999;
        padding: 8px;
      }

      .flatpickr-input {
        height: 36px;
        padding: 6px 10px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 13px;
        font-family: inherit;
      }

      .flatpickr-input:focus {
        outline: none;
        border-color: #3b82f6;
      }

      .flatpickr-day {
        height: 28px;
        line-height: 28px;
        font-size: 12px;
      }

      .flatpickr-day.selected {
        background: #3b82f6;
        color: white;
      }

      .flatpickr-day.today {
        border: 1px solid #3b82f6;
      }

      .flatpickr-day:hover {
        background: #f3f4f6;
      }

      .flatpickr-current-month select {
        padding: 4px 6px;
        border: 1px solid #d1d5db;
        border-radius: 3px;
        font-size: 12px;
      }
    `;
    document.head.appendChild(style);
  }

  initializeCalendars() {
    const today = new Date().toISOString().split('T')[0];
    
    const startDateInput = document.getElementById('startDate');
    if (startDateInput) {
      const startPicker = flatpickr(startDateInput, {
        dateFormat: 'Y-m-d',
        minDate: today,
        mode: 'single',
        enableTime: false,
        monthSelectorType: 'dropdown',
        onChange: (selectedDates, dateStr) => {
          if (dateStr) {
            const endPicker = this.pickers.get('endDate');
            if (endPicker) {
              endPicker.set('minDate', dateStr);
            }
          }
        }
      });
      this.pickers.set('startDate', startPicker);
    }

    const endDateInput = document.getElementById('endDate');
    if (endDateInput) {
      const endPicker = flatpickr(endDateInput, {
        dateFormat: 'Y-m-d',
        minDate: today,
        mode: 'single',
        enableTime: false,
        monthSelectorType: 'dropdown',
        onChange: (selectedDates, dateStr) => {
          if (dateStr) {
            const startPicker = this.pickers.get('startDate');
            if (startPicker) {
              startPicker.set('maxDate', dateStr);
            }
          }
        }
      });
      this.pickers.set('endDate', endPicker);
    }
  }

  getPickers() {
    return this.pickers;
  }

  getPicker(inputId) {
    return this.pickers.get(inputId);
  }

  setDate(inputId, dateStr) {
    const picker = this.pickers.get(inputId);
    if (picker) picker.setDate(dateStr);
  }

  clearDate(inputId) {
    const picker = this.pickers.get(inputId);
    if (picker) picker.clear();
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.flatpickrCalendarComponent) {
      window.flatpickrCalendarComponent = new FlatpickrCalendarComponent();
    }
  });
} else {
  if (!window.flatpickrCalendarComponent) {
    window.flatpickrCalendarComponent = new FlatpickrCalendarComponent();
  }
}
