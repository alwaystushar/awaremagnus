/**
 * ================================================
 * MODERN RADIO BUTTON COMPONENT
 * ================================================
 * Clean radio buttons with dot appearing only on selection
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
        /* Modern Radio Button Styles */
        .quiz-pill {
          transition: all 0.2s ease;
          cursor: pointer;
          user-select: none;
        }
  
        .quiz-pill:hover {
          background: rgba(63, 189, 255, 0.05);
          border-color: #3FBDFF;
        }
  
        /* Radio dot - EMPTY by default */
        .pill-dot {
          border: 1.5px solid #d1d5db;
          background: white;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
  
        .quiz-pill:hover .pill-dot {
          border-color: #3FBDFF;
          box-shadow: 0 0 0 3px rgba(63, 189, 255, 0.1);
          border-width: 2px;
        }
  
        /* Inner dot - Hidden by default, shows only when checked */
        .pill-dot::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3FBDFF;
          opacity: 0;
          transform: scale(0);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
  
        /* Show inner dot ONLY when checked */
        input[type="radio"]:checked ~ .pill-dot::after {
          opacity: 1;
          transform: scale(1);
          border-color: #3FBDFF;
        }
  
        /* Checked pill background */
        .quiz-pill:has(input[type="radio"]:checked) {
          background: rgba(63, 189, 255, 0.1);
          border-color: #3FBDFF;
        }
  
        /* Pop animation on check */
        @keyframes radioPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
  
        input[type="radio"]:checked ~ .pill-dot {
          animation: radioPop 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border-color: #3FBDFF;
        }
  
        /* Focus state for accessibility */
        input[type="radio"]:focus-visible ~ .pill-dot {
          border-color: #3FBDFF;
          box-shadow: 0 0 0 3px rgba(63, 189, 255, 0.2);
        }
  
        /* Disabled state */
        input[type="radio"]:disabled ~ .pill-dot {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: #f3f4f6;
        }
  
        .quiz-pill:has(input[type="radio"]:disabled) {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Answer pill radio styles */
        .answer-pill {
          transition: all 0.2s ease;
          cursor: pointer;
          user-select: none;
        }

        .answer-pill:hover {
          background: rgba(63, 189, 255, 0.05);
          border-color: #3FBDFF;
        }

        .answer-pill .radio-btn {
          border: 1.5px solid #d1d5db;
          background: white;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .answer-pill:hover .radio-btn {
          border-color: #3FBDFF;
          box-shadow: 0 0 0 2px rgba(63, 189, 255, 0.1);
        }

        /* Checked state */
        .answer-pill .correctCheck:checked ~ .radio-btn {
          background: white;
          border-color: #3FBDFF;
        }

        /* Inner dot */
        .answer-pill .radio-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3FBDFF;
          opacity: 0;
          transform: scale(0);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .answer-pill .correctCheck:checked ~ .radio-btn .radio-dot {
          opacity: 1;
          transform: scale(1);
          border-color: #3FBDFF;
        }

        /* Checked pill background */
        .answer-pill:has(.correctCheck:checked) {
          background: #EAF6FF;
          border-color: #3FBDFF;
        }

        /* Pop animation */
        .answer-pill .correctCheck:checked ~ .radio-btn {
          animation: radioPop 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ========== CHECKBOX STYLES (Multiple Choice) ========== */
        /* Square shape for checkboxes */
        .answer-pill:has(.correctCheck[type="checkbox"]) .radio-btn {
          border-radius: 100% !important;
        }

        /* Hide the dot for checkboxes */
        .answer-pill:has(.correctCheck[type="checkbox"]) .radio-dot {
          display: none !important;
        }

        /* Checkbox checked - blue background */
        .answer-pill .correctCheck[type="checkbox"]:checked ~ .radio-btn {
          background: #3FBDFF !important;
          border-color: #3FBDFF !important;
        }

        /* Checkmark for checkbox - using ::after pseudo-element */
        .answer-pill .correctCheck[type="checkbox"] ~ .radio-btn::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 45%;
          width: 4px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: translate(-50%, -50%) rotate(45deg);
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        /* Show checkmark when checked */
        .answer-pill .correctCheck[type="checkbox"]:checked ~ .radio-btn::after {
          opacity: 1;
        }

        /* Pop animation for checkbox */
        @keyframes checkPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .answer-pill .correctCheck[type="checkbox"]:checked ~ .radio-btn {
          animation: checkPop 0.2s ease;
        }
      `;
      document.head.appendChild(style);
    }
  
    bindEvents() {
      // Handle quiz type radio buttons
      document.addEventListener('change', (e) => {
        if (e.target.matches('input[name="quizType"]')) {
          // Uncheck all other radio buttons in the same group
          const radios = document.querySelectorAll('input[name="quizType"]');
          radios.forEach(radio => {
            const pill = radio.closest('.quiz-pill');
            if (pill && radio !== e.target) {
              radio.checked = false;
            }
          });
        }
      });

      // Handle answer correctCheck radio/checkbox buttons
      document.addEventListener('change', (e) => {
        if (e.target.matches('.correctCheck')) {
          const card = e.target.closest('.language-card');
          if (card) {
            // Check actual input type to determine behavior
            const isRadio = e.target.type === 'radio';
            
            if (isRadio) {
              // Radio behavior - uncheck all others in this card
              const allChecks = card.querySelectorAll('.correctCheck');
              allChecks.forEach(check => {
                if (check !== e.target) {
                  check.checked = false;
                }
              });
            }
            // For checkbox type, allow multiple selections automatically
          }
        }
      });

      // Handle clicks on answer pills
      document.addEventListener('click', (e) => {
        const pill = e.target.closest('.answer-pill');
        if (pill && !e.target.matches('.remove-ans, .remove-ans *')) {
          e.stopImmediatePropagation();
          
          const input = pill.querySelector('.correctCheck');
          if (input && !input.disabled) {
            const card = pill.closest('.language-card');
            
            // Check actual input type (radio vs checkbox)
            const isRadio = input.type === 'radio';
            
            if (isRadio) {
              // Radio button behavior - uncheck others first, then check this one
              if (!input.checked) {
                const allChecks = card.querySelectorAll('.correctCheck');
                allChecks.forEach(check => check.checked = false);
                input.checked = true;
              }
            } else {
              // Checkbox behavior - toggle on/off, allow multiple
              input.checked = !input.checked;
            }
            
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      });

      // Handle clicks on quiz type pills
      document.addEventListener('click', (e) => {
        const pill = e.target.closest('.quiz-pill');
        if (pill) {
          const radio = pill.querySelector('input[type="radio"]');
          if (radio && !radio.disabled && !e.target.matches('input[type="radio"]')) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      });
    }
  }
  
  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new ModernRadio();
    });
  } else {
    new ModernRadio();
  }
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernRadio;
  }
  