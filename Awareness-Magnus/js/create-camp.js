document.addEventListener('DOMContentLoaded', () => {
  // ===== Helper functions for modals =====
  function hideOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    if (overlay) overlay.classList.add('hidden');
  }

  function showOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    if (overlay) overlay.classList.remove('hidden');
  }

  // ===== Open Modal =====
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const target = trigger.getAttribute('data-modal-target'); // e.g., "mail" or "nfc"
      const overlayId = `${target}-overlay`;
      showOverlay(overlayId);
    });
  });

  // ===== Close Modal =====
  document.querySelectorAll('[id$="-closeModalBtn"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.id.replace('-closeModalBtn', '-overlay');
      hideOverlay(id);
    });
  });

  // ===== Close on overlay click =====
  document.querySelectorAll('[id$="-modalOverlay"]').forEach(innerOverlay => {
    innerOverlay.addEventListener('click', (e) => {
      if (e.target === innerOverlay) {
        const id = innerOverlay.id.replace('-modalOverlay', '-overlay');
        hideOverlay(id);
      }
    });
  });

  // ===== Close on ESC key =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[id$="-overlay"]').forEach(overlay => {
        if (!overlay.classList.contains('hidden')) {
          overlay.classList.add('hidden');
        }
      });
    }
  });

  // ===== Stepper Logic for All Modals =====
  document.querySelectorAll('[data-steps]').forEach(stepsContainer => {
    const steps = stepsContainer.querySelectorAll('[data-step]');
    const stepper = stepsContainer.closest('.relative').querySelector('[data-steppers]');
    const stepCircles = stepper ? stepper.querySelectorAll('.step-circle') : [];
    const stepLabels = stepper ? stepper.querySelectorAll('.step-label') : [];
    const nextBtn = stepsContainer.closest('.relative').querySelector('[data-next]');
    const backBtn = stepsContainer.closest('.relative').querySelector('[data-back]');
    let currentStep = 0;

    // Update steps & breadcrumbs
    function updateUI(index) {
      // Show current step
      steps.forEach((step, i) => step.classList.toggle('hidden', i !== index));

      // Update stepper circles & labels if present
      if (stepCircles.length) {
        stepCircles.forEach((circle, i) => {
          if (i === index) {
            circle.classList.remove('bg-white', 'border-2', 'border-teal-300', 'text-teal-400');
            circle.classList.add('bg-teal-500', 'text-white');
          } else {
            circle.classList.add('bg-white', 'border-2', 'border-teal-300', 'text-teal-400');
            circle.classList.remove('bg-teal-500', 'text-white');
          }
        });
      }

      if (stepLabels.length) {
        stepLabels.forEach((label, i) => {
          label.classList.toggle('text-teal-700', i === index);
          label.classList.toggle('text-gray-400', i !== index);
        });
      }

      // Update button states
      if (backBtn) backBtn.disabled = index === 0;
      if (nextBtn) nextBtn.textContent = index === steps.length - 1 ? 'Finish' : 'Next';
    }

    // Next button
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentStep < steps.length - 1) {
          currentStep++;
          updateUI(currentStep);
        } else {
          console.log('Form Completed for this modal!');
        }
      });
    }

    // Back button
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentStep > 0) {
          currentStep--;
          updateUI(currentStep);
        }
      });
    }

    // Initialize
    updateUI(currentStep);
  });
});





function initTagSelector(container) {
  const select = container.querySelector(".groupSelect");
  const selectedTags = container.querySelector(".selectedTags");
  let selectedValues = [];

  select.addEventListener("change", function () {
    const value = this.value;
    if (value && !selectedValues.includes(value)) {
      selectedValues.push(value);
      renderTags();
      hideOption(value);
    }
    this.value = ""; // reset dropdown
  });

  function renderTags() {
    selectedTags.innerHTML = "";
    selectedValues.forEach(val => {
      const tag = document.createElement("div");
      tag.className = "flex items-center gap-2 bg-teal-50 text-gray-700 px-3 py-1 rounded-lg";
      tag.innerHTML = `
        <span>${val}</span>
        <button class="text-gray-500 hover:text-red-500" data-value="${val}">✕</button>
      `;
      selectedTags.appendChild(tag);
    });

    selectedTags.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => removeTag(btn.dataset.value));
    });
  }

  function hideOption(value) {
    const option = [...select.options].find(opt => opt.value === value);
    if (option) option.style.display = "none";
  }

  function showOption(value) {
    const option = [...select.options].find(opt => opt.value === value);
    if (option) option.style.display = "block";
  }

  function removeTag(value) {
    selectedValues = selectedValues.filter(v => v !== value);
    showOption(value);
    renderTags();
  }
}

// Initialize all selectors
document.querySelectorAll(".tag-selector").forEach(container => initTagSelector(container));







document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('[data-department-block]').forEach(section => {
    const radios = section.querySelectorAll('input[type="radio"]');
    const selectBlock = section.querySelector('.tag-selector');
    const groupSelect = section.querySelector('.groupSelect');
    const tagsContainer = section.querySelector('.selectedTags');

    if (!radios.length || !selectBlock) return;

    // Toggle visibility based on selected radio
    function toggleSelectBlock() {
      const selected = section.querySelector('input[type="radio"]:checked')?.value;
      selectBlock.closest('div').style.display = selected === "custom" ? "block" : "none";
    }

    // Initial check
    toggleSelectBlock();

    // Listen for radio change
    radios.forEach(radio => {
      radio.addEventListener("change", toggleSelectBlock);
    });

    // Tag logic
    let selectedTags = [];

    function renderTags() {
      tagsContainer.innerHTML = "";
      selectedTags.forEach(tag => {
        const tagEl = document.createElement('div');
        tagEl.className = 'inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm';
        tagEl.innerHTML = `
          <span>${tag}</span>
          <button type="button" class="ml-2 text-gray-600 font-medium">×</button>
        `;
        tagEl.querySelector('button').addEventListener('click', () => {
          selectedTags = selectedTags.filter(t => t !== tag);
          renderTags();
        });
        tagsContainer.appendChild(tagEl);
      });
    }

    if (groupSelect) {
      groupSelect.addEventListener('change', () => {
        const value = groupSelect.value.trim();
        if (value && !selectedTags.includes(value)) {
          selectedTags.push(value);
          renderTags();
        }
        groupSelect.selectedIndex = 0; // Reset dropdown
      });
    }
  });
});
