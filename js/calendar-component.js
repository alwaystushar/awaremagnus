/**
 * ================================================
 * MODERN CUSTOM CALENDAR COMPONENT
 * ================================================
 * Fully custom calendar picker with beautiful UI
 */

class ModernCalendar {
    constructor() {
      this.currentDate = new Date();
      this.selectedDate = null;
      this.activeInput = null;
      this.init();
    }
  
    init() {
      this.addStyles();
      this.enhanceCalendars();
    }
  
    addStyles() {
      if (document.getElementById('modern-calendar-styles')) return;
  
      const style = document.createElement('style');
      style.id = 'modern-calendar-styles';
      style.textContent = `
        /* Calendar Input */
        .modern-calendar-wrapper {
          position: relative;
          width: 100%;
        }
  
        .modern-calendar {
          width: 100%;
          padding: 0.5rem 2.5rem 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          color: #374151;
          background: white;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          cursor: pointer;
          font-family: inherit;
        }
  
        .modern-calendar:hover {
          border-color: #9ca3af;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
  
        .modern-calendar:focus,
        .modern-calendar.active {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
  
        .modern-calendar::placeholder {
          color: #9ca3af;
        }
  
        /* Calendar Icon */
        .modern-calendar-icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1rem;
          height: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }
  
        .modern-calendar-icon svg {
          width: 100%;
          height: 100%;
          color: #6b7280;
        }
  
        .modern-calendar:hover ~ .modern-calendar-icon svg,
        .modern-calendar-icon:hover svg {
          color: #3b82f6;
        }
  
        /* Size variants */
        .modern-calendar.small {
          padding: 0.375rem 2rem 0.375rem 0.625rem;
          font-size: 0.75rem;
        }
  
        .modern-calendar-wrapper.small .modern-calendar-icon {
          right: 0.5rem;
          width: 0.875rem;
          height: 0.875rem;
        }
  
        /* Current indicator */
        .modern-calendar.current::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #3b82f6, #60a5fa);
          border-radius: 0.5rem 0 0 0.5rem;
        }
  
        /* Calendar Popup */
        .modern-calendar-popup {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          z-index: 1000;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 280px;
          padding: 1rem;
        }
  
        .modern-calendar-popup.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
  
        /* Calendar Header */
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #f3f4f6;
        }
  
        .calendar-header-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #111827;
        }
  
        .calendar-nav-btn {
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
          border: none;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.15s;
        }
  
        .calendar-nav-btn:hover {
          background: #f3f4f6;
          color: #111827;
        }
  
        .calendar-nav-btn svg {
          width: 1.25rem;
          height: 1.25rem;
        }
  
        /* Weekday Headers */
        .calendar-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.25rem;
          margin-bottom: 0.5rem;
        }
  
        .calendar-weekday {
          text-align: center;
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
          padding: 0.5rem 0;
        }
  
        /* Calendar Days Grid */
        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.25rem;
        }
  
        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          color: #374151;
          cursor: pointer;
          transition: all 0.15s;
          border: none;
          background: transparent;
          font-weight: 500;
        }
  
        .calendar-day:hover:not(.disabled):not(.selected) {
          background: #f3f4f6;
        }
  
        .calendar-day.today {
          border: 2px solid #3b82f6;
          color: #3b82f6;
        }
  
        .calendar-day.selected {
          background: #3b82f6;
          color: white;
          font-weight: 600;
        }
  
        .calendar-day.disabled {
          color: #d1d5db;
          cursor: not-allowed;
          opacity: 0.5;
        }
  
        .calendar-day.other-month {
          color: #d1d5db;
        }
  
        /* Today Button */
        .calendar-footer {
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid #f3f4f6;
          display: flex;
          gap: 0.5rem;
        }
  
        .calendar-today-btn,
        .calendar-clear-btn {
          flex: 1;
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          background: white;
          color: #374151;
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }
  
        .calendar-today-btn:hover {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
  
        .calendar-clear-btn:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }
  
        /* Animation */
        @keyframes calendarSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
  
        .modern-calendar-popup.active {
          animation: calendarSlideIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `;
      document.head.appendChild(style);
    }
  
    enhanceCalendars() {
      document.querySelectorAll('input[type="date"].modern-calendar').forEach(input => {
        this.createModernCalendar(input);
      });
    }
  
    createModernCalendar(input) {
      if (input.dataset.enhanced) return;
      input.dataset.enhanced = 'true';
  
      // Hide native date input
      input.type = 'text';
      input.readOnly = true;
      input.placeholder = 'Select date';
  
      // Create wrapper
      let wrapper = input.parentElement;
      if (!wrapper.classList.contains('modern-calendar-wrapper')) {
        wrapper = document.createElement('div');
        wrapper.className = 'modern-calendar-wrapper';
        
        if (input.classList.contains('small')) wrapper.classList.add('small');
        if (input.classList.contains('large')) wrapper.classList.add('large');
  
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
      }
  
      // Add icon
      const icon = document.createElement('div');
      icon.className = 'modern-calendar-icon';
      icon.innerHTML = `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      `;
      wrapper.appendChild(icon);
  
      // Create calendar popup
      const popup = this.createCalendarPopup(input);
      wrapper.appendChild(popup);
  
      // Event listeners
      input.addEventListener('click', () => this.openCalendar(input, popup));
      icon.addEventListener('click', () => this.openCalendar(input, popup));
    }
  
    createCalendarPopup(input) {
      const popup = document.createElement('div');
      popup.className = 'modern-calendar-popup';
      
      popup.innerHTML = `
        <div class="calendar-header">
          <button class="calendar-nav-btn prev-month" type="button">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div class="calendar-header-title"></div>
          <button class="calendar-nav-btn next-month" type="button">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        <div class="calendar-weekdays">
          <div class="calendar-weekday">Su</div>
          <div class="calendar-weekday">Mo</div>
          <div class="calendar-weekday">Tu</div>
          <div class="calendar-weekday">We</div>
          <div class="calendar-weekday">Th</div>
          <div class="calendar-weekday">Fr</div>
          <div class="calendar-weekday">Sa</div>
        </div>
        <div class="calendar-days"></div>
        <div class="calendar-footer">
          <button class="calendar-today-btn" type="button">Today</button>
          <button class="calendar-clear-btn" type="button">Clear</button>
        </div>
      `;
  
      // Navigation events
      popup.querySelector('.prev-month').addEventListener('click', () => {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar(input, popup);
      });
  
      popup.querySelector('.next-month').addEventListener('click', () => {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar(input, popup);
      });
  
      popup.querySelector('.calendar-today-btn').addEventListener('click', () => {
        this.selectDate(input, popup, new Date());
      });
  
      popup.querySelector('.calendar-clear-btn').addEventListener('click', () => {
        this.clearDate(input, popup);
      });
  
      return popup;
    }
  
    openCalendar(input, popup) {
      // Close other calendars
      document.querySelectorAll('.modern-calendar-popup.active').forEach(p => {
        if (p !== popup) p.classList.remove('active');
      });
  
      document.querySelectorAll('.modern-calendar.active').forEach(i => {
        if (i !== input) i.classList.remove('active');
      });
  
      // Open this calendar
      input.classList.add('active');
      popup.classList.add('active');
      this.activeInput = input;
  
      // Set current date from input or today
      if (input.dataset.date) {
        this.currentDate = new Date(input.dataset.date);
      } else {
        this.currentDate = new Date();
      }
  
      this.renderCalendar(input, popup);
  
      // Close on outside click
      setTimeout(() => {
        document.addEventListener('click', this.handleOutsideClick);
      }, 0);
    }
  
    handleOutsideClick = (e) => {
      if (!e.target.closest('.modern-calendar-wrapper')) {
        this.closeAllCalendars();
      }
    }
  
    closeAllCalendars() {
      document.querySelectorAll('.modern-calendar-popup.active').forEach(p => {
        p.classList.remove('active');
      });
      document.querySelectorAll('.modern-calendar.active').forEach(i => {
        i.classList.remove('active');
      });
      document.removeEventListener('click', this.handleOutsideClick);
    }
  
    renderCalendar(input, popup) {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
  
      // Update header
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                         'July', 'August', 'September', 'October', 'November', 'December'];
      popup.querySelector('.calendar-header-title').textContent = `${monthNames[month]} ${year}`;
  
      // Get days
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInPrevMonth = new Date(year, month, 0).getDate();
  
      const daysContainer = popup.querySelector('.calendar-days');
      daysContainer.innerHTML = '';
  
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const disablePast = input.classList.contains('current');
      const selectedDateStr = input.dataset.date;
  
      // Previous month days
      for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const btn = this.createDayButton(day, true, false, false, false);
        daysContainer.appendChild(btn);
      }
  
      // Current month days
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);
        
        const isToday = date.getTime() === today.getTime();
        const isSelected = selectedDateStr === this.formatDate(date);
        const isDisabled = disablePast && date < today;
  
        const btn = this.createDayButton(day, false, isToday, isSelected, isDisabled);
        
        if (!isDisabled) {
          btn.addEventListener('click', () => this.selectDate(input, popup, date));
        }
  
        daysContainer.appendChild(btn);
      }
  
      // Next month days
      const totalCells = daysContainer.children.length;
      const remainingCells = 42 - totalCells; // 6 rows * 7 days
      for (let day = 1; day <= remainingCells; day++) {
        const btn = this.createDayButton(day, true, false, false, false);
        daysContainer.appendChild(btn);
      }
    }
  
    createDayButton(day, otherMonth, isToday, isSelected, isDisabled) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'calendar-day';
      btn.textContent = day;
      
      if (otherMonth) btn.classList.add('other-month');
      if (isToday) btn.classList.add('today');
      if (isSelected) btn.classList.add('selected');
      if (isDisabled) btn.classList.add('disabled');
  
      return btn;
    }
  
    selectDate(input, popup, date) {
      const formatted = this.formatDate(date);
      input.value = this.formatDisplayDate(date);
      input.dataset.date = formatted;
      
      input.dispatchEvent(new Event('change', { bubbles: true }));
      
      this.closeAllCalendars();
    }
  
    clearDate(input, popup) {
      input.value = '';
      delete input.dataset.date;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      this.closeAllCalendars();
    }
  
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
    formatDisplayDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  
    // Public API
    static setValue(selector, dateString) {
      const input = document.querySelector(selector);
      if (input) {
        const date = new Date(dateString);
        input.value = window.modernCalendar.formatDisplayDate(date);
        input.dataset.date = dateString;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  
    static getValue(selector) {
      const input = document.querySelector(selector);
      return input?.dataset.date || null;
    }
  
    static setToday(selector) {
      const today = new Date();
      ModernCalendar.setValue(selector, window.modernCalendar.formatDate(today));
    }
  
    static clear(selector) {
      const input = document.querySelector(selector);
      if (input) {
        input.value = '';
        delete input.dataset.date;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }
  
  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.modernCalendar = new ModernCalendar();
    });
  } else {
    window.modernCalendar = new ModernCalendar();
  }
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernCalendar;
  }
  