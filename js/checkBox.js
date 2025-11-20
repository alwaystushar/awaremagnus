 (function () {
    const CHECK_SVG = '<svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>';
    const EMPTY_SVG = '<svg class="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>';

    // init visuals based on the input checked state
    function initLanguageGrid() {
      document.querySelectorAll('#languageGrid .lang-item').forEach(label => {
        const input = label.querySelector('.real-checkbox');
        const tick = label.querySelector('.visual-tick');
        syncTickVisual(input, tick);
        // allow keyboard toggle (space/enter)
        label.setAttribute('tabindex', 0);
        label.addEventListener('keydown', (e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggleLabel(label);
          }
        });
        // click handler
        label.addEventListener('click', (ev) => {
          // avoid toggling if actual inner input clicked twice; still safe
          toggleLabel(label);
        });
      });
    }

    function syncTickVisual(input, tickEl) {
      if (input.checked) {
        tickEl.classList.remove('border-gray-300','bg-white');
        tickEl.classList.add('bg-green-400','border-green-400');
        tickEl.innerHTML = CHECK_SVG;
      } else {
        tickEl.classList.remove('bg-green-400','border-green-400');
        tickEl.classList.add('border-gray-300','bg-white');
        tickEl.innerHTML = EMPTY_SVG;
      }
    }

    function toggleLabel(label) {
      const input = label.querySelector('.real-checkbox');
      const tick = label.querySelector('.visual-tick');
      // toggle checked state
      input.checked = !input.checked;
      // dispatch change event (in case other code listens)
      input.dispatchEvent(new Event('change', { bubbles: true }));
      // sync visual
      syncTickVisual(input, tick);
    }

    // helper - get selected languages (values), useful for form submit
    window.getSelectedLanguages = function () {
      const vals = [];
      document.querySelectorAll('#languageGrid .real-checkbox').forEach(chk => {
        if (chk.checked && !vals.includes(chk.value)) vals.push(chk.value);
      });
      return vals;
    };

    // initialize on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initLanguageGrid);
    } else initLanguageGrid();
  })();