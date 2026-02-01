/**
 * Campaign Wizard - Complete Implementation
 * Synced with awareness_campaign-wizard.html
 */

let currentStep = 1;
const totalSteps = 7;

// Store manually added users
let manuallyAddedUsers = [];

const showStep = (step) => {
  document.querySelectorAll('.wizard-step').forEach((el, i) => {
    el.classList.toggle('active', i === step - 1);
  });
  document.getElementById("prevBtn").disabled = step === 1;
  document.getElementById("nextBtn").textContent = step === totalSteps ? "Finish" : "Next";
  document.querySelectorAll('.wizard-progress .step').forEach((el, i) => {
    el.classList.remove("active", "done");
    const circle = el.querySelector('.circle');
    
    if (i + 1 < step) {
      // Completed step - show checkmark
      el.classList.add("done");
      if (circle) {
        circle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      }
    } else {
      // Current or future step - show number
      if (circle) {
        circle.textContent = i + 1;
      }
      if (i + 1 === step) {
        el.classList.add("active");
      }
    }
  });
  
  // When entering Step 5 (Contents), update weight visibility
  if (step === 5) {
    calculateWeightTotal();
    updateProgressFormula();
  }
  
  // When entering Step 4 (Quiz & Certificate), initialize quiz config
  if (step === 4) {
    const enableQuiz = document.getElementById('enableQuiz');
    const quizConfigSection = document.getElementById('quizConfigSection');
    
    if (quizConfigSection) {
      const isQuizEnabled = enableQuiz && enableQuiz.checked;
      quizConfigSection.style.display = isQuizEnabled ? 'block' : 'none';
      document.querySelectorAll('#quizConfigSection input, #quizConfigSection select').forEach(input => {
        input.disabled = !isQuizEnabled;
      });
    }
  }
};

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentStep < totalSteps) {
    if (!validateCurrentStep()) {
      return;
    }
    
    if (currentStep === 6) {
      const campaignData = collectCampaignData();
      console.log("Campaign Data JSON:", JSON.stringify(campaignData, null, 2));
    }
    
    currentStep++;
    if (currentStep === totalSteps) {
      fillSummary();
      setTimeout(() => {
        showCampaignCompletionModal();
      }, 300);
    }
    showStep(currentStep);
  } else {
    Toast.success("Campaign created successfully!");
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentStep > 1) { 
    currentStep--; 
    showStep(currentStep); 
  }
});

// ============================================
// USER MODAL - Dual List with Drag & Drop
// ============================================

const availableUsersList = document.getElementById("availableUsersList");
const selectedUsersList = document.getElementById("selectedUsersList");
const userModal = document.getElementById("userModal");
const addUserBtn = document.getElementById("addUser");
const addAllUsersBtn = document.getElementById("addAllUsers");
const removeUserBtn = document.getElementById("removeUser");
const removeAllUsersBtn = document.getElementById("removeAllUsers");
const saveUsersBtn = document.getElementById("saveUsers");
const cancelModalBtn = document.getElementById("cancelModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const addUsersManuallyBtn = document.getElementById("addUsersManuallyBtn");
const userSearchInput = document.getElementById("userSearchInput");

// Open modal
if (addUsersManuallyBtn) {
  addUsersManuallyBtn.addEventListener("click", () => {
    userModal.classList.remove("hidden");
    updateUserCounts();
    lucide.createIcons();
  });
}

// Close modal functions
function closeUserModal() {
  userModal.classList.add("hidden");
}

if (closeModalBtn) closeModalBtn.addEventListener("click", closeUserModal);
if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeUserModal);

// Update counts
function updateUserCounts() {
  const availableCount = document.getElementById("availableCount");
  const selectedCount = document.getElementById("selectedCount");
  const selectedUserCount = document.getElementById("selectedUserCount");
  
  const availableItems = availableUsersList.querySelectorAll(".user-item").length;
  const selectedItems = selectedUsersList.querySelectorAll(".user-item").length;
  
  if (availableCount) availableCount.textContent = availableItems;
  if (selectedCount) selectedCount.textContent = selectedItems;
  if (selectedUserCount) selectedUserCount.textContent = selectedItems;
  
  // Toggle placeholder visibility
  const placeholder = document.getElementById("dropPlaceholder");
  if (placeholder) {
    placeholder.style.display = selectedItems > 0 ? "none" : "flex";
  }
}

// Toggle selection on user items
function setupUserItemClick(item) {
  item.addEventListener("click", (e) => {
    if (e.target.closest(".remove-user-btn")) return;
    
    if (e.ctrlKey || e.metaKey) {
      item.classList.toggle("selected");
    } else {
      const container = item.closest(".user-list-container");
      container.querySelectorAll(".user-item").forEach(i => i.classList.remove("selected"));
      item.classList.add("selected");
    }
  });
}

// Create user item element
function createUserItem(userId, userName, initials, color) {
  const div = document.createElement("div");
  div.className = "user-item";
  div.setAttribute("data-user-id", userId);
  div.setAttribute("data-user-name", userName);
  div.setAttribute("draggable", "true");
  
  div.innerHTML = `
    <div class="flex items-center gap-2 p-2 bg-white rounded-md border border-gray-100 cursor-grab hover:border-blue-300 hover:shadow-sm transition-all">
      <div class="w-7 h-7 rounded-full ${color} flex items-center justify-center text-[10px] font-semibold">${initials}</div>
      <span class="text-xs text-gray-700 flex-1">${userName}</span>
      <button type="button" class="remove-user-btn text-gray-400 hover:text-red-500" title="Remove">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `;
  
  setupUserItemClick(div);
  setupDragAndDrop(div);
  
  // Remove button handler
  div.querySelector(".remove-user-btn").addEventListener("click", () => {
    moveUserToAvailable(div);
  });
  
  return div;
}

// Move user from available to selected
function moveUserToSelected(item) {
  const userId = item.getAttribute("data-user-id");
  const userName = item.getAttribute("data-user-name") || item.querySelector("span").textContent;
  const avatarDiv = item.querySelector(".w-7");
  const initials = avatarDiv ? avatarDiv.textContent.trim() : userName.split(" ").map(n => n[0]).join("");
  const colorClass = avatarDiv ? avatarDiv.className.match(/bg-\w+-100/)?.[0] || "bg-blue-100" : "bg-blue-100";
  const textColorClass = avatarDiv ? avatarDiv.className.match(/text-\w+-600/)?.[0] || "text-blue-600" : "text-blue-600";
  
  item.remove();
  
  const newItem = createUserItem(userId, userName, initials, `${colorClass} ${textColorClass}`);
  selectedUsersList.appendChild(newItem);
  
  updateUserCounts();
}

// Move user from selected to available
function moveUserToAvailable(item) {
  const userId = item.getAttribute("data-user-id");
  const userName = item.getAttribute("data-user-name") || item.querySelector("span").textContent;
  const avatarDiv = item.querySelector(".w-7");
  const initials = avatarDiv ? avatarDiv.textContent.trim() : userName.split(" ").map(n => n[0]).join("");
  const colorClass = avatarDiv ? avatarDiv.className.match(/bg-\w+-100/)?.[0] || "bg-blue-100" : "bg-blue-100";
  const textColorClass = avatarDiv ? avatarDiv.className.match(/text-\w+-600/)?.[0] || "text-blue-600" : "text-blue-600";
  
  item.remove();
  
  const newItem = createUserItem(userId, userName, initials, `${colorClass} ${textColorClass}`);
  availableUsersList.appendChild(newItem);
  
  updateUserCounts();
}

// Add selected users
if (addUserBtn) {
  addUserBtn.addEventListener("click", () => {
    const selectedItems = availableUsersList.querySelectorAll(".user-item.selected");
    selectedItems.forEach(item => moveUserToSelected(item));
  });
}

// Add all users
if (addAllUsersBtn) {
  addAllUsersBtn.addEventListener("click", () => {
    const allItems = [...availableUsersList.querySelectorAll(".user-item")];
    allItems.forEach(item => moveUserToSelected(item));
  });
}

// Remove selected users
if (removeUserBtn) {
  removeUserBtn.addEventListener("click", () => {
    const selectedItems = selectedUsersList.querySelectorAll(".user-item.selected");
    selectedItems.forEach(item => moveUserToAvailable(item));
  });
}

// Remove all users
if (removeAllUsersBtn) {
  removeAllUsersBtn.addEventListener("click", () => {
    const allItems = [...selectedUsersList.querySelectorAll(".user-item")];
    allItems.forEach(item => moveUserToAvailable(item));
  });
}

// Drag and Drop Setup
function setupDragAndDrop(item) {
  item.addEventListener("dragstart", (e) => {
    item.classList.add("dragging");
    e.dataTransfer.setData("text/plain", item.getAttribute("data-user-id"));
    e.dataTransfer.effectAllowed = "move";
  });
  
  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
    document.querySelectorAll(".user-list-container").forEach(container => {
      container.classList.remove("drag-over");
    });
  });
}

// Setup drop zones
function setupDropZone(container, isSelectedList) {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    container.classList.add("drag-over");
  });
  
  container.addEventListener("dragleave", (e) => {
    if (!container.contains(e.relatedTarget)) {
      container.classList.remove("drag-over");
    }
  });
  
  container.addEventListener("drop", (e) => {
    e.preventDefault();
    container.classList.remove("drag-over");
    
    const userId = e.dataTransfer.getData("text/plain");
    const draggedItem = document.querySelector(`.user-item[data-user-id="${userId}"]`);
    
    if (!draggedItem) return;
    
    const isFromSelected = selectedUsersList.contains(draggedItem);
    const isFromAvailable = availableUsersList.contains(draggedItem);
    
    if (isSelectedList && isFromAvailable) {
      moveUserToSelected(draggedItem);
    } else if (!isSelectedList && isFromSelected) {
      moveUserToAvailable(draggedItem);
    }
  });
}

// Initialize existing user items
document.querySelectorAll("#availableUsersList .user-item, #selectedUsersList .user-item").forEach(item => {
  const userName = item.querySelector("span")?.textContent || "";
  item.setAttribute("data-user-name", userName);
  setupUserItemClick(item);
  setupDragAndDrop(item);
  
  // Add remove button handler for items already in selected list
  const removeBtn = item.querySelector(".remove-user-btn");
  if (removeBtn) {
    removeBtn.addEventListener("click", () => moveUserToAvailable(item));
  }
});

// Setup drop zones
if (availableUsersList) setupDropZone(availableUsersList, false);
if (selectedUsersList) setupDropZone(selectedUsersList, true);

// Search functionality
if (userSearchInput) {
  userSearchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    document.querySelectorAll("#availableUsersList .user-item").forEach(item => {
      const userName = item.getAttribute("data-user-name")?.toLowerCase() || "";
      item.style.display = userName.includes(searchTerm) ? "" : "none";
    });
  });
}

// Save users to campaign
if (saveUsersBtn) {
  saveUsersBtn.addEventListener("click", () => {
    const ul = document.getElementById("manualUsersUl");
    const manualUsersList = document.getElementById("manualUsersList");
    
    if (ul) {
      ul.innerHTML = "";
      manuallyAddedUsers = [];
      
      selectedUsersList.querySelectorAll(".user-item").forEach(item => {
        const userId = item.getAttribute("data-user-id");
        const userName = item.getAttribute("data-user-name") || item.querySelector("span")?.textContent || "";
        
        manuallyAddedUsers.push({ id: userId, name: userName });
        
        const li = document.createElement("li");
        li.className = "flex items-center justify-between p-2 bg-gray-50 rounded-md text-xs";
        li.setAttribute("data-user-id", userId);
        li.innerHTML = `
          <span>${userName}</span>
          <button type="button" class="remove-target-user text-gray-400 hover:text-red-500" title="Remove">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        `;
        
        // Remove from target users handler
        li.querySelector(".remove-target-user").addEventListener("click", () => {
          const idx = manuallyAddedUsers.findIndex(u => u.id === userId);
          if (idx > -1) manuallyAddedUsers.splice(idx, 1);
          li.remove();
          
          // Move back to available in modal
          const existingInSelected = selectedUsersList.querySelector(`.user-item[data-user-id="${userId}"]`);
          if (existingInSelected) {
            moveUserToAvailable(existingInSelected);
          }
          
          if (manualUsersList && ul.children.length === 0) {
            manualUsersList.style.display = "none";
          }
        });
        
        ul.appendChild(li);
      });
      
      if (manualUsersList) {
        manualUsersList.style.display = manuallyAddedUsers.length > 0 ? "block" : "none";
      }
    }
    
    closeUserModal();
  });
}

// Modules listbox select all logic
const modulesList = document.getElementById("modulesList");
modulesList.addEventListener("change", () => {
  if ([...modulesList.selectedOptions].some(opt => opt.value === "all")) {
    [...modulesList.options].forEach(opt => opt.selected = true);
  }
});

// Content type toggle - Enable Documents, Enable Games, Enable Misc Items
document.querySelectorAll('.content-type-toggle').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const checkboxId = this.id;
    
    if (checkboxId === 'enableDocuments') {
      // Toggle Documents weight section
      const documentsSection = document.getElementById('documentsWeightSection');
      if (documentsSection) {
        documentsSection.classList.toggle('hidden', !this.checked);
      }
      const documentWeightInput = document.getElementById('documentWeight');
      if (documentWeightInput && !this.checked) {
        documentWeightInput.value = 0;
      }
    } else if (checkboxId === 'enableGames') {
      // Toggle Games weight section
      const gamesSection = document.getElementById('gamesWeightSection');
      if (gamesSection) {
        gamesSection.classList.toggle('hidden', !this.checked);
      }
      const gameWeightInput = document.getElementById('gameWeight');
      if (gameWeightInput && !this.checked) {
        gameWeightInput.value = 0;
      }
    } else if (checkboxId === 'enableMiscItems') {
      // Toggle Miscellaneous Items weight sections
      const miscSections = [
        'miscWeightSection', 
        'brochureWeightSection', 
        'posterWeightSection', 
        'screensaverWeightSection', 
        'vrGameWeightSection'
      ];
      
      miscSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.classList.toggle('hidden', !this.checked);
        }
      });
      
      // Reset values if unchecked
      if (!this.checked) {
        ['miscWeight', 'brochureWeight', 'posterWeight', 'screensaverWeight', 'vrGameWeight'].forEach(inputId => {
          const input = document.getElementById(inputId);
          if (input) input.value = 0;
        });
      }
    }
    
    calculateWeightTotal();
    updateProgressFormula();
  });
});

// Quiz toggle - Show/hide quiz configuration when Quiz checkbox is checked
const enableQuizCheckbox = document.getElementById('enableQuiz');
const quizConfigSection = document.getElementById('quizConfigSection');

function toggleQuizConfig() {
  if (!quizConfigSection || !enableQuizCheckbox) return;
  
  if (enableQuizCheckbox.checked) {
    // Show the quiz config section
    quizConfigSection.classList.remove('hidden');
    quizConfigSection.style.display = 'block';
    quizConfigSection.style.visibility = 'visible';
    quizConfigSection.style.opacity = '1';
    quizConfigSection.style.pointerEvents = 'auto';
    
    // Ensure all inputs inside are enabled and editable
    const inputs = quizConfigSection.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.disabled = false;
      input.removeAttribute('disabled');
      input.style.pointerEvents = 'auto';
    });
  } else {
    // Hide the quiz config section
    quizConfigSection.classList.add('hidden');
    quizConfigSection.style.display = 'none';
  }
  
  calculateWeightTotal();
  updateProgressFormula();
}

if (enableQuizCheckbox) {
  // Listen for change event on the checkbox
  enableQuizCheckbox.addEventListener('change', toggleQuizConfig);
  
  // Also listen for click on the parent label to ensure it works with sr-only checkbox
  const quizLabel = enableQuizCheckbox.closest('.lang-item');
  if (quizLabel) {
    quizLabel.addEventListener('click', function(e) {
      // Small delay to let the checkbox state update first
      setTimeout(toggleQuizConfig, 10);
    });
  }
  
  // Initialize on page load - check if already checked
  toggleQuizConfig();
}

// Quiz Dependency Radio Buttons - Update Per Module limits based on selection
const quizDependencyRadios = document.querySelectorAll('input[name="quizDependency"]');
const perModuleInput = document.getElementById('totalQuizzesPerModule');
const perModuleHelperText = document.getElementById('perModuleHelperText');

function updatePerModuleLimits() {
  const selectedDependency = document.querySelector('input[name="quizDependency"]:checked');
  if (!selectedDependency || !perModuleInput || !perModuleHelperText) return;
  
  const value = selectedDependency.value;
  let max = 5;
  let helperText = 'Number of quiz questions (1-5)';
  
  switch (value) {
    case 'short_videos':
      max = 5;
      helperText = 'Number of quiz questions (1-5)';
      break;
    case 'interactive_videos':
      max = 40;
      helperText = 'Number of quiz questions (1-40)';
      break;
    case 'custom':
      max = 80;
      helperText = 'Number of quiz questions (1-80)';
      break;
  }
  
  perModuleInput.max = max;
  perModuleHelperText.textContent = helperText;
  
  // Adjust current value if it exceeds new max
  if (parseInt(perModuleInput.value) > max) {
    perModuleInput.value = max;
  }
}

// Add event listeners to quiz dependency radios
quizDependencyRadios.forEach(radio => {
  radio.addEventListener('change', updatePerModuleLimits);
});

// Initialize on page load
updatePerModuleLimits();

// Weight input handler
document.querySelectorAll('.weight-input').forEach(input => {
  input.addEventListener('input', function() {
    calculateWeightTotal();
    updateProgressFormula();
  });
});

// Content type names
const contentTypeNames = {
  'motionVideoWeight': 'Short Videos',
  'interactiveContentWeight': 'Highly Interactive Content',
  'documentWeight': 'Documents',
  'gameWeight': 'Games',
  'miscWeight': 'Miscellaneous Items',
  'brochureWeight': 'Brochures',
  'posterWeight': 'Posters',
  'screensaverWeight': 'Screen Savers',
  'vrGameWeight': 'VR Games',
  'quizProgressWeight': 'Quiz'
};

function updateProgressFormula() {
  const formulaDiv = document.getElementById('progressFormula');
  if (!formulaDiv) return;

  const weightInputs = document.querySelectorAll('.weight-input');
  const examples = [];

  weightInputs.forEach(input => {
    const parentSection = input.closest('[id$="Section"]');
    const isVisible = !parentSection || (!parentSection.classList.contains('hidden') && parentSection.style.display !== 'none');
    const isEnabled = !input.disabled;
    
    if (isVisible && isEnabled) {
      const weight = parseInt(input.value) || 0;
      if (weight > 0) {
        const contentTypeName = contentTypeNames[input.id] || input.id;
        examples.push(`If user completes <strong>${contentTypeName}</strong> (weight: ${weight}), then <strong>${weight}%</strong> of module is complete`);
      }
    }
  });

  if (examples.length === 0) {
    formulaDiv.innerHTML = '<em>Enable content types and assign weights to see progress calculation examples.</em>';
  } else {
    formulaDiv.innerHTML = examples.join('<br>');
  }
}

function calculateWeightTotal() {
  const weightInputs = document.querySelectorAll('.weight-input');
  let total = 0;
  weightInputs.forEach(input => {
    const parentSection = input.closest('[id$="Section"]');
    const isVisible = !parentSection || (!parentSection.classList.contains('hidden') && parentSection.style.display !== 'none');
    const isEnabled = !input.disabled;
    
    if (isVisible && isEnabled) {
      const value = parseInt(input.value) || 0;
      total += value;
    }
  });
  
  const totalSpan = document.getElementById('weightTotal');
  const weightError = document.getElementById('weightError');
  
  if (totalSpan) {
    totalSpan.textContent = total;
    
    if (total === 100) {
      totalSpan.classList.remove('error');
      totalSpan.style.color = '#198754';
      if (weightError) weightError.classList.add('hidden');
    } else {
      totalSpan.classList.add('error');
      totalSpan.style.color = '#dc3545';
      if (weightError) weightError.classList.remove('hidden');
    }
  }
  
  return total;
}

// Flatpickr Calendar - Styled to match screenshot with Today/Clear buttons
const today = new Date().toISOString().split('T')[0];

const calendarConfig = {
  dateFormat: "Y-m-d",
  altInput: true,
  altFormat: "F j, Y",
  minDate: today,
  disableMobile: true,
  static: false,
  animate: true,
  monthSelectorType: "static",
  prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
  nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
  onReady: function(selectedDates, dateStr, instance) {
    // Add custom class to alt input for styling
    if (instance.altInput) {
      instance.altInput.classList.add('input-field', 'modern-calendar');
    }
    
    // Add Today and Clear buttons at the bottom (matching screenshot)
    const calendarContainer = instance.calendarContainer;
    
    // Check if buttons already exist
    if (!calendarContainer.querySelector('.flatpickr-footer-buttons')) {
      const footerDiv = document.createElement('div');
      footerDiv.className = 'flatpickr-footer-buttons';
      footerDiv.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 16px;
        padding: 16px 8px 4px;
        border-top: 1px solid #f3f4f6;
        margin-top: 12px;
      `;
      
      const todayBtn = document.createElement('button');
      todayBtn.type = 'button';
      todayBtn.className = 'flatpickr-today-button';
      todayBtn.textContent = 'Today';
      todayBtn.style.cssText = `
        padding: 10px 32px;
        border-radius: 24px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        border: 1px solid #e5e7eb;
        background: #fafafa;
        color: #374151;
        transition: all 0.15s ease;
        min-width: 100px;
      `;
      todayBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        instance.setDate(new Date(), true);
      });
      todayBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f3f4f6';
        this.style.borderColor = '#d1d5db';
      });
      todayBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#fafafa';
        this.style.borderColor = '#e5e7eb';
      });
      
      const clearBtn = document.createElement('button');
      clearBtn.type = 'button';
      clearBtn.className = 'flatpickr-clear-button';
      clearBtn.textContent = 'Clear';
      clearBtn.style.cssText = `
        padding: 10px 32px;
        border-radius: 24px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        border: 1px solid #e5e7eb;
        background: #fafafa;
        color: #374151;
        transition: all 0.15s ease;
        min-width: 100px;
      `;
      clearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        instance.clear();
      });
      clearBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f3f4f6';
        this.style.borderColor = '#d1d5db';
      });
      clearBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#fafafa';
        this.style.borderColor = '#e5e7eb';
      });
      
      footerDiv.appendChild(todayBtn);
      footerDiv.appendChild(clearBtn);
      calendarContainer.appendChild(footerDiv);
    }
  }
};

const startDatePicker = flatpickr("#startDate", { 
  ...calendarConfig,
  onChange: function(selectedDates, dateStr, instance) {
    if (dateStr) {
      endDatePicker.set('minDate', dateStr);
    }
  }
});

const endDatePicker = flatpickr("#endDate", { 
  ...calendarConfig,
  onChange: function(selectedDates, dateStr, instance) {
    if (dateStr) {
      startDatePicker.set('maxDate', dateStr);
    }
  }
});

// Schedule Button
document.getElementById("scheduleTopicsBtn").addEventListener("click", () => {
  generateSchedule();
});

function generateSchedule() {
  const startValue = document.getElementById("startDate").value;
  const endValue = document.getElementById("endDate").value;

  if (!startValue || !endValue) {
    Toast.error("Please set campaign dates in Step 1 before scheduling modules.");
    return;
  }

  const startDate = new Date(startValue);
  const endDate = new Date(endValue);
  const modules = [...modulesList.selectedOptions].map(o => o.value).filter(v => v !== "all");

  if (isNaN(startDate) || isNaN(endDate) || modules.length === 0) {
    Toast.error("Please make sure dates are set in Step 1 and modules are selected in Step 3.");
    return;
  }

  const daysDiff = Math.max(1, Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1);
  const interval = Math.floor(daysDiff / modules.length);

  const ul = document.getElementById("scheduleTopics");
  ul.innerHTML = "";

  modules.forEach((moduleId, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i * interval);
    const moduleOption = modulesList.querySelector(`option[value="${moduleId}"]`);
    const moduleName = moduleOption ? moduleOption.textContent : `Module ${moduleId}`;
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <span>${moduleName}</span>
      </div>
      <span class="badge editable-date" title="Double-click to edit">${date.toLocaleDateString("en-CA")}</span>
    `;
    li.setAttribute('data-module-id', moduleId);
    li.setAttribute('data-date', date.toLocaleDateString("en-CA"));
    
    const dateBadge = li.querySelector('.badge');
    dateBadge.addEventListener('dblclick', function() {
      editTopicDate(li, dateBadge);
    });
    
    ul.appendChild(li);
  });

  document.getElementById("scheduleContainer").style.display = "block";
  
  if (window.Sortable) {
    Sortable.create(ul, { 
      animation: 150,
      onEnd: function(evt) {
        updateScheduleDates();
      }
    });
  }
}

function updateScheduleDates() {
  const topicItems = document.querySelectorAll("#scheduleTopics li");
  const currentDates = [];
  topicItems.forEach(li => {
    const badge = li.querySelector('.badge');
    if (badge) {
      currentDates.push(badge.textContent);
    }
  });
  
  currentDates.sort();
  
  topicItems.forEach((li, i) => {
    const badge = li.querySelector('.badge');
    if (badge && currentDates[i]) {
      badge.textContent = currentDates[i];
      li.setAttribute('data-date', currentDates[i]);
      li.removeAttribute('data-custom-date');
      
      const newBadge = badge.cloneNode(true);
      newBadge.addEventListener('dblclick', function() {
        editTopicDate(li, newBadge);
      });
      badge.parentNode.replaceChild(newBadge, badge);
    }
  });
}

function editTopicDate(listItem, dateBadge) {
  if (listItem.querySelector('input[type="date"]')) {
    return;
  }
  
  const currentDate = dateBadge.textContent;
  const startValue = document.getElementById("startDate").value;
  const endValue = document.getElementById("endDate").value;
  const today = new Date().toISOString().split('T')[0];
  const minDate = startValue && startValue > today ? startValue : today;
  
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.value = currentDate;
  dateInput.min = minDate;
  dateInput.max = endValue;
  dateInput.className = 'input-field text-xs px-2 py-1   rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';
  dateInput.style.width = '130px';
  
  const parent = dateBadge.parentNode;
  if (parent) {
    parent.replaceChild(dateInput, dateBadge);
    dateInput.focus();
  }
  
  const saveDate = () => {
    const newDate = dateInput.value;
    
    if (newDate && newDate >= dateInput.min && newDate <= dateInput.max) {
      const newBadge = document.createElement('span');
      newBadge.className = 'badge editable-date';
      newBadge.textContent = newDate;
      newBadge.title = 'Double-click to edit';
      newBadge.addEventListener('dblclick', function() {
        editTopicDate(listItem, newBadge);
      });
      
      listItem.setAttribute('data-date', newDate);
      listItem.setAttribute('data-custom-date', 'true');
      
      if (dateInput.parentNode) {
        dateInput.parentNode.replaceChild(newBadge, dateInput);
      }
    } else {
      revertToOriginal();
    }
  };
  
  const revertToOriginal = () => {
    const revertBadge = document.createElement('span');
    revertBadge.className = 'badge editable-date';
    revertBadge.textContent = currentDate;
    revertBadge.title = 'Double-click to edit';
    revertBadge.addEventListener('dblclick', function() {
      editTopicDate(listItem, revertBadge);
    });
    if (dateInput.parentNode) {
      dateInput.parentNode.replaceChild(revertBadge, dateInput);
    }
  };
  
  dateInput.addEventListener('blur', function() {
    setTimeout(saveDate, 10);
  });
  
  dateInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveDate();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      revertToOriginal();
    }
  });
}

function fillSummary() {
  document.getElementById("summaryName").textContent = document.querySelector("[name='campaignName']").value;
  document.getElementById("summaryDesc").textContent = document.querySelector("[name='description']").value;
  document.getElementById("summaryGamified").textContent = document.querySelector("#gamified").checked ? "Yes" : "No";
  document.getElementById("summaryDepartments").textContent = [...document.querySelector("[name='departments[]']").selectedOptions].map(o => `${o.textContent} (ID: ${o.value})`).join(", ");
  document.getElementById("summaryGroups").textContent = [...document.querySelector("[name='groups[]']").selectedOptions].map(o => `${o.textContent} (ID: ${o.value})`).join(", ");
  
  // Get manually added users from the stored array
  const usersText = manuallyAddedUsers.map(u => `${u.name} (ID: ${u.id})`).join(", ");
  document.getElementById("summaryUsers").textContent = usersText || "None";
  
  // Extract only module names from schedule items (the span inside the flex div)
  const topicsText = [...document.querySelectorAll("#scheduleTopics li")].map(li => {
    const nameSpan = li.querySelector('.flex span');
    return nameSpan ? nameSpan.textContent.trim() : '';
  }).filter(t => t).join(", ");
  document.getElementById("summaryTopics").textContent = topicsText || "Not scheduled";
  document.getElementById("summaryStart").textContent = document.getElementById("startDate").value;
  document.getElementById("summaryEnd").textContent = document.getElementById("endDate").value;
}

function collectCampaignData() {
  const campaignName = document.querySelector("[name='campaignName']").value;
  const description = document.querySelector("[name='description']").value;
  const gamified = document.querySelector("#gamified").checked;
  
  const departments = [...document.querySelector("[name='departments[]']").selectedOptions].map(o => parseInt(o.value));
  const groups = [...document.querySelector("[name='groups[]']").selectedOptions].map(o => parseInt(o.value));
  
  // Get manually added users from the stored array
  const manualUsers = manuallyAddedUsers.map(u => parseInt(u.id) || u.id);
  
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  
  const modulesSchedule = [...document.querySelectorAll("#scheduleTopics li")].map(li => {
    const moduleText = li.querySelector('span').textContent;
    const moduleIdMatch = moduleText.match(/ID:\s*(\d+)/);
    const moduleId = moduleIdMatch ? parseInt(moduleIdMatch[1]) : null;
    const scheduledDate = li.querySelector('.badge').textContent;
    return {
      module_id: moduleId,
      start_date: scheduledDate
    };
  }).filter(s => s.module_id !== null);
  
  const selectedModules = [...modulesList.selectedOptions]
    .map(o => parseInt(o.value))
    .filter(v => !isNaN(v));

  const visualShortVideos = document.getElementById('visualShortVideos')?.checked || false;
  const visualInteractive = document.getElementById('visualInteractiveContent')?.checked || false;
  const visualOthers = document.getElementById('visualOthers')?.checked || false;
  
  const enableFlags = {
    enable_gamification: gamified,
    enable_quiz: document.querySelector("#enableQuiz")?.checked || false,
    enable_certificate: document.querySelector("#enableCertificate")?.checked || false,
    enable_games: document.querySelector("#enableGames")?.checked || false,
    enable_misc_items: document.querySelector("#enableMiscItems")?.checked || false,
    enable_motion_videos: visualShortVideos,
    enable_interactive_ispring: visualInteractive,
    enable_documents: document.querySelector("#enableDocuments")?.checked || false
  };

  const weights = {
    motion_video_weight: parseInt(document.getElementById("motionVideoWeight")?.value) || 0,
    interactive_content_weight: parseInt(document.getElementById("interactiveContentWeight")?.value) || 0,
    document_weight: parseInt(document.getElementById("documentWeight")?.value) || 0,
    game_weight: parseInt(document.getElementById("gameWeight")?.value) || 0,
    misc_weight: parseInt(document.getElementById("miscWeight")?.value) || 0,
    brochure_weight: parseInt(document.getElementById("brochureWeight")?.value) || 0,
    poster_weight: parseInt(document.getElementById("posterWeight")?.value) || 0,
    screensaver_weight: parseInt(document.getElementById("screensaverWeight")?.value) || 0,
    vr_game_weight: parseInt(document.getElementById("vrGameWeight")?.value) || 0,
    quiz_progress_weight: parseInt(document.getElementById("quizProgressWeight")?.value) || 0
  };

  const quizConfig = enableFlags.enable_quiz ? {
    quiz_passing_threhold_percentage: parseInt(document.getElementById("quizPassingThreshold")?.value) || 70,
    quiz_retry_threshold: parseInt(document.getElementById("quizRetryThreshold")?.value) || 3,
    total_number_of_quizzes_per_module: parseInt(document.getElementById("totalQuizzesPerModule")?.value) || 5
  } : {};
  
  const campaignData = {
    campaign: {
      name: campaignName,
      description: description,
      start_date: startDate,
      end_date: endDate,
      ...enableFlags,
      ...weights,
      ...quizConfig
    },
    modules: selectedModules,
    groups: groups,
    departments: departments,
    invitees: manualUsers,
    schedules: modulesSchedule.length > 0 ? modulesSchedule : undefined
  };
  
  return campaignData;
}

function validateCurrentStep() {
  document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  document.querySelectorAll('.invalid-feedback').forEach(el => el.style.display = 'none');

  switch(currentStep) {
    case 1:
      const campaignName = document.querySelector("[name='campaignName']").value.trim();
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
      
      if (!campaignName) {
        document.querySelector("[name='campaignName']").classList.add('is-invalid');
        return false;
      }
      
      if (!startDate || !endDate) {
        return false;
      }
      
      if (new Date(endDate) < new Date(startDate)) {
        Toast.error("End date must be after start date.");
        return false;
      }
      break;

    case 2:
      const departments = [...document.querySelector("[name='departments[]']").selectedOptions];
      const groups = [...document.querySelector("[name='groups[]']").selectedOptions];
      
      // Use the stored manuallyAddedUsers array
      if (departments.length === 0 && groups.length === 0 && manuallyAddedUsers.length === 0) {
        Toast.error("Please select at least one department, group, or add users manually.");
        return false;
      }
      break;

    case 3:
      const selectedModules = [...modulesList.selectedOptions].filter(opt => opt.value !== "all");
      if (selectedModules.length === 0) {
        Toast.error("Please select at least one module.");
        return false;
      }
      
      const visualLearningOptions = document.querySelectorAll('.visual-learning-option:checked');
      if (visualLearningOptions.length === 0) {
        Toast.error("Please select at least one visual learning option.");
        return false;
      }
      break;

    case 5:
      const weightTotal = calculateWeightTotal();
      if (weightTotal !== 100) {
        Toast.error(`Total weights must equal 100. Current total: ${weightTotal}`);
        return false;
      }
      break;
  }
  
  return true;
}

// Initialize on page load
updateProgressFormula();
