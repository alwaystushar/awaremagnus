/**
 * ================================================
 * CAMPAIGN WIZARD - COMPLETE VERSION
 * ================================================
 * Full validation, multi-select dropdowns, drag-and-drop scheduling
 */

/* ==============================================
   TOAST NOTIFICATION SYSTEM
============================================== */
let toastContainer;

function showToast(message, type = 'info') {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'fixed top-6 right-6 z-[9999] flex flex-col gap-2';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const icons = {
    success: `<svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`,
    error: `<svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>`,
    warning: `<svg class="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`,
    info: `<svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>`
  };

  const borderColors = {
    success: 'border-green-200',
    error: 'border-red-200',
    warning: 'border-amber-200',
    info: 'border-blue-200'
  };

  toast.className = `bg-white rounded-xl shadow-lg border ${borderColors[type]} px-4 py-3 flex items-start gap-3 min-w-[320px] max-w-[400px] transform transition-all duration-300 translate-x-[400px] opacity-0`;
  toast.innerHTML = `
    ${icons[type]}
    <p class="text-sm text-gray-700 flex-1">${message}</p>
    <button class="toast-close text-gray-400 hover:text-gray-600 transition-colors">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
    </button>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.remove('translate-x-[400px]', 'opacity-0'), 10);

  const removeToast = () => {
    toast.classList.add('translate-x-[400px]', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector('.toast-close').onclick = removeToast;
  setTimeout(removeToast, 3500);
}

/* ==============================================
   CAMPAIGN DATA STORAGE
============================================== */
const campaignData = {
  campaignName: '',
  description: '',
  gamification: false,
  departments: [],
  groups: [],
  manualUsers: [],
  topics: [],
  enableQuiz: false,
  enableGames: false,
  enableCert: false,
  enableCyber: false,
  startDate: '',
  endDate: '',
  schedule: []
};

/* ==============================================
   STEPPER STATE
============================================== */
const steps = document.querySelectorAll(".step");
const circles = document.querySelectorAll(".step-circle");
const labels = document.querySelectorAll(".step-label");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

let currentStep = 0;
const activeColor = "#3FBDFF";

/* ==============================================
   COMPONENT INSTANCES
============================================== */
let departmentMultiSelect, groupMultiSelect, topicsMultiSelect;
let startCalendar, endCalendar;
let isInitialized = false;

/* ==============================================
   INITIALIZATION
============================================== */
document.addEventListener('DOMContentLoaded', () => {
  if (!isInitialized) {
    isInitialized = true;
    
    setTimeout(() => {
      initializeMultiSelects();
      initializeCalendars();
      initializeUserModal();
      initializeScheduling();
      console.log('✅ Campaign Wizard fully initialized');
    }, 100);
  }
});

/* ==============================================
   INITIALIZE MULTI-SELECT DROPDOWNS
============================================== */
function initializeMultiSelects() {
  const departmentSelect = document.getElementById('departmentSelect');
  const groupSelect = document.getElementById('groupSelect');
  const topicsSelect = document.getElementById('topicsSelect');

  if (departmentSelect && !departmentSelect.classList.contains('multiselect-initialized')) {
    departmentSelect.classList.add('multiselect-initialized');
    departmentMultiSelect = new MultiSelectDropdown(departmentSelect, { 
      placeholder: 'Select Department...', 
      searchPlaceholder: 'Search departments...' 
    });
  }

  if (groupSelect && !groupSelect.classList.contains('multiselect-initialized')) {
    groupSelect.classList.add('multiselect-initialized');
    groupMultiSelect = new MultiSelectDropdown(groupSelect, { 
      placeholder: 'Select Group...', 
      searchPlaceholder: 'Search groups...' 
    });
  }

  if (topicsSelect && !topicsSelect.classList.contains('multiselect-initialized')) {
    topicsSelect.classList.add('multiselect-initialized');
    topicsMultiSelect = new MultiSelectDropdown(topicsSelect, { 
      placeholder: 'Select Topics...', 
      searchPlaceholder: 'Search topics...' 
    });
  }

  console.log('✅ Multi-select dropdowns initialized');
}

/* ==============================================
   INITIALIZE CALENDARS
============================================== */
function initializeCalendars() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (typeof flatpickr !== 'undefined') {
    startCalendar = flatpickr("#startDate", {
      dateFormat: "Y-m-d",
      minDate: today,
      onChange: function(selectedDates, dateStr) {
        campaignData.startDate = dateStr;
        
        if (endCalendar) {
          endCalendar.set('minDate', dateStr || today);
          
          if (campaignData.endDate && campaignData.endDate < dateStr) {
            campaignData.endDate = '';
            endCalendar.clear();
            showToast('End date must be after start date', 'warning');
          }
        }
      }
    });

    endCalendar = flatpickr("#endDate", {
      dateFormat: "Y-m-d",
      minDate: today,
      onChange: function(selectedDates, dateStr) {
        if (campaignData.startDate && dateStr < campaignData.startDate) {
          showToast('End date cannot be before start date', 'error');
          endCalendar.clear();
          return;
        }
        campaignData.endDate = dateStr;
      }
    });

    document.getElementById('startIcon').addEventListener('click', () => startCalendar.open());
    document.getElementById('endIcon').addEventListener('click', () => endCalendar.open());
    document.getElementById('startDate').addEventListener('click', () => startCalendar.open());
    document.getElementById('endDate').addEventListener('click', () => endCalendar.open());

    console.log('✅ Calendars initialized');
  } else {
    console.warn('⚠️ Flatpickr not found. Please include Flatpickr library.');
  }
}

/* ==============================================
   VALIDATION FUNCTIONS
============================================== */
function validateStep1() {
  const campaignName = document.getElementById('campaignName').value.trim();
  
  if (!campaignName) {
    showToast('Please enter campaign name', 'error');
    document.getElementById('campaignName').focus();
    return false;
  }

  campaignData.campaignName = campaignName;
  campaignData.description = document.getElementById('campaignDesc').value.trim();
  campaignData.gamification = document.getElementById('gamification').checked;

  showToast('Campaign details saved', 'success');
  return true;
}

function validateStep2() {
  const departments = departmentMultiSelect ? departmentMultiSelect.getValues() : [];
  const groups = groupMultiSelect ? groupMultiSelect.getValues() : [];
  const manualUsers = campaignData.manualUsers;

  if (departments.length === 0 && groups.length === 0 && manualUsers.length === 0) {
    showToast('Please select at least one department, group, or add users manually', 'error');
    return false;
  }

  campaignData.departments = departments;
  campaignData.groups = groups;

  showToast('Target users saved', 'success');
  return true;
}

function validateStep3() {
  const topics = topicsMultiSelect ? topicsMultiSelect.getValues() : [];
  
  if (topics.length === 0) {
    showToast('Please select at least one topic', 'error');
    return false;
  }

  campaignData.topics = topics;
  campaignData.enableQuiz = document.getElementById('enableQuiz').checked;
  campaignData.enableGames = document.getElementById('enableGames').checked;
  campaignData.enableCert = document.getElementById('enableCert').checked;
  campaignData.enableCyber = document.getElementById('enableCyber').checked;

  showToast('Campaign contents saved', 'success');
  return true;
}

function validateStep4() {
  if (!campaignData.startDate) {
    showToast('Please select start date', 'error');
    document.getElementById('startDate').focus();
    return false;
  }

  if (!campaignData.endDate) {
    showToast('Please select end date', 'error');
    document.getElementById('endDate').focus();
    return false;
  }

  if (campaignData.schedule.length === 0) {
    showToast('Please click "Schedule My Topics" to create schedule', 'error');
    return false;
  }

  showToast('Schedule created successfully', 'success');
  return true;
}

/* ==============================================
   STEP NAVIGATION
============================================== */
function updateStep(newStep) {
  if (newStep > currentStep) {
    if (currentStep === 0 && !validateStep1()) return;
    if (currentStep === 1 && !validateStep2()) return;
    if (currentStep === 2 && !validateStep3()) return;
    if (currentStep === 3 && !validateStep4()) return;
  }

  steps[currentStep].classList.add("fade-exit-active");

  setTimeout(() => {
    steps[currentStep].classList.add("hidden");
    steps[currentStep].classList.remove("fade-exit-active");

    currentStep = newStep;
    
    if (currentStep === 4) {
      showSummary();
    }

    steps[currentStep].classList.remove("hidden");
    steps[currentStep].classList.add("fade-enter");

    setTimeout(() => {
      steps[currentStep].classList.add("fade-enter-active");
      steps[currentStep].classList.remove("fade-enter");
    }, 20);

    updateStepperUI();
  }, 300);
}

function updateStepperUI() {
  circles.forEach((circle, index) => {
    if (index <= currentStep) {
      circle.style.backgroundColor = activeColor;
      circle.style.color = "white";
      circle.style.border = "none";
    } else {
      circle.style.backgroundColor = "white";
      circle.style.color = activeColor;
      circle.style.border = `1px solid ${activeColor}`;
    }
  });

  labels.forEach((label, index) => {
    label.style.color = index === currentStep ? activeColor : "#9CA3AF";
  });

  backBtn.disabled = currentStep === 0;
  backBtn.style.cursor = currentStep === 0 ? "not-allowed" : "pointer";
  backBtn.style.opacity = currentStep === 0 ? "0.5" : "1";

  nextBtn.textContent = currentStep === steps.length - 1 ? "Finish" : "Next";
}

/* ==============================================
   BUTTON EVENTS
============================================== */
nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    updateStep(currentStep + 1);
  } else {
    console.log('='.repeat(60));
    console.log('CAMPAIGN DATA - COMPLETE');
    console.log('='.repeat(60));
    console.log(JSON.stringify(campaignData, null, 2));
    console.log('='.repeat(60));
    
    showToast('Campaign created successfully! Check console for data.', 'success');
    
    setTimeout(() => {
      createSuccessModal();
    }, 500);
  }
});

backBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    updateStep(currentStep - 1);
  }
});

/* ==============================================
   USER MODAL FUNCTIONS
============================================== */
function initializeUserModal() {
  const modal = document.getElementById('userModal');
  const addUserManuallyBtn = document.getElementById('addUserManuallyBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const confirmUsersBtn = document.getElementById('confirmUsersBtn');
  const addUserBtn = document.getElementById('addUserBtn');
  const removeUserBtn = document.getElementById('removeUserBtn');
  const availableUsers = document.getElementById('availableUsers');
  const modalSelectedUsers = document.getElementById('modalSelectedUsers');

  addUserManuallyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };

  closeModalBtn.addEventListener('click', closeModal);
  cancelModalBtn.addEventListener('click', closeModal);

  addUserBtn.addEventListener('click', () => {
    const selected = Array.from(availableUsers.selectedOptions);
    if (selected.length === 0) {
      showToast('Please select users to add', 'warning');
      return;
    }

    selected.forEach(option => {
      modalSelectedUsers.appendChild(option);
    });
  });

  removeUserBtn.addEventListener('click', () => {
    const selected = Array.from(modalSelectedUsers.selectedOptions);
    if (selected.length === 0) {
      showToast('Please select users to remove', 'warning');
      return;
    }

    selected.forEach(option => {
      availableUsers.appendChild(option);
    });
  });

  confirmUsersBtn.addEventListener('click', () => {
    const selectedUsers = Array.from(modalSelectedUsers.options).map(opt => opt.value);
    
    if (selectedUsers.length === 0) {
      showToast('No users selected', 'warning');
      return;
    }

    campaignData.manualUsers = selectedUsers;
    
    const display = document.getElementById('selectedUsersDisplay');
    const list = document.getElementById('selectedUsersList');
    
    list.innerHTML = '';
    selectedUsers.forEach(user => {
      const div = document.createElement('div');
      div.className = 'flex items-center justify-between bg-blue-50 px-2 py-1 rounded text-[10px] text-gray-700';
      div.innerHTML = `
        <span>${user}</span>
        <button class="text-red-500 hover:text-red-700 remove-user" data-user="${user}">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      `;
      list.appendChild(div);
    });

    display.classList.remove('hidden');
    
    showToast(`${selectedUsers.length} user(s) added`, 'success');
    closeModal();
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.remove-user')) {
      const btn = e.target.closest('.remove-user');
      const user = btn.dataset.user;
      
      campaignData.manualUsers = campaignData.manualUsers.filter(u => u !== user);
      btn.closest('div').remove();
      
      if (campaignData.manualUsers.length === 0) {
        document.getElementById('selectedUsersDisplay').classList.add('hidden');
      }
      
      const option = document.createElement('option');
      option.value = user;
      option.textContent = user;
      availableUsers.appendChild(option);
      
      showToast('User removed', 'info');
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  console.log('✅ User modal initialized');
}

/* ==============================================
   SCHEDULING FUNCTIONS
============================================== */
function initializeScheduling() {
  const scheduleBtn = document.getElementById('scheduleTopicsBtn');
  
  scheduleBtn.addEventListener('click', () => {
    if (!campaignData.startDate || !campaignData.endDate) {
      showToast('Please select start and end dates first', 'error');
      return;
    }

    if (campaignData.topics.length === 0) {
      showToast('Please select topics in step 3 first', 'error');
      return;
    }

    generateSchedule();
  });

  console.log('✅ Scheduling initialized');
}

function generateSchedule() {
  const startDate = new Date(campaignData.startDate);
  const endDate = new Date(campaignData.endDate);
  const topics = campaignData.topics;
  
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  const daysPerTopic = Math.floor(totalDays / topics.length);
  
  const schedule = [];
  const container = document.getElementById('topicList');
  container.innerHTML = '';
  
  topics.forEach((topic, index) => {
    const topicDate = new Date(startDate);
    topicDate.setDate(startDate.getDate() + (index * daysPerTopic));
    
    const dateStr = topicDate.toISOString().split('T')[0];
    
    schedule.push({
      topic: topic,
      date: dateStr,
      order: index
    });
    
    const item = document.createElement('div');
    item.className = 'flex items-center justify-between bg-white border border-gray-200 rounded-lg px-2 py-2 cursor-move hover:shadow-md transition';
    item.draggable = true;
    item.dataset.topic = topic;
    item.dataset.date = dateStr;
    item.dataset.order = index;
    
    item.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
        </svg>
        <span class="topic-name text-gray-700 text-xs">${topic}</span>
      </div>
      <span class="topic-date px-2 py-0.5 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-medium">${dateStr}</span>
    `;
    
    container.appendChild(item);
  });
  
  campaignData.schedule = schedule;
  
  document.getElementById('scheduleContainer').classList.remove('hidden');
  
  initializeDragAndDrop();
  
  showToast('Schedule generated successfully', 'success');
}

function initializeDragAndDrop() {
  const container = document.getElementById('topicList');
  let draggedElement = null;

  container.addEventListener('dragstart', (e) => {
    if (e.target.draggable) {
      draggedElement = e.target;
      e.target.style.opacity = '0.4';
    }
  });

  container.addEventListener('dragend', (e) => {
    if (e.target.draggable) {
      e.target.style.opacity = '1';
    }
  });

  container.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  container.addEventListener('drop', (e) => {
    e.preventDefault();
    
    let dropTarget = e.target;
    
    while (dropTarget && !dropTarget.draggable && dropTarget !== container) {
      dropTarget = dropTarget.parentElement;
    }
    
    if (dropTarget && dropTarget.draggable && draggedElement && draggedElement !== dropTarget) {
      const allItems = Array.from(container.children);
      const draggedIndex = allItems.indexOf(draggedElement);
      const dropIndex = allItems.indexOf(dropTarget);
      
      if (draggedIndex < dropIndex) {
        dropTarget.after(draggedElement);
      } else {
        dropTarget.before(draggedElement);
      }
      
      reassignDates();
    }
  });
}

function reassignDates() {
  const container = document.getElementById('topicList');
  const items = Array.from(container.children);
  
  const startDate = new Date(campaignData.startDate);
  const endDate = new Date(campaignData.endDate);
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  const daysPerTopic = Math.floor(totalDays / items.length);
  
  const newSchedule = [];
  
  items.forEach((item, index) => {
    const topicDate = new Date(startDate);
    topicDate.setDate(startDate.getDate() + (index * daysPerTopic));
    const dateStr = topicDate.toISOString().split('T')[0];
    
    const topicNameElement = item.querySelector('.topic-name');
    const topicName = topicNameElement ? topicNameElement.textContent : item.dataset.topic;
    
    const dateBadge = item.querySelector('.topic-date');
    if (dateBadge) {
      dateBadge.textContent = dateStr;
    }
    
    item.dataset.date = dateStr;
    item.dataset.order = index;
    
    newSchedule.push({
      topic: topicName,
      date: dateStr,
      order: index
    });
  });
  
  campaignData.schedule = newSchedule;
  
  showToast('Schedule updated', 'info');
}

/* ==============================================
   SUMMARY DISPLAY
============================================== */
function showSummary() {
  const container = document.getElementById('summaryContent');
  
  const summary = [
    { label: 'Campaign Name', value: campaignData.campaignName },
    { label: 'Description', value: campaignData.description || 'N/A' },
    { label: 'Gamification', value: campaignData.gamification ? 'Enabled' : 'Disabled' },
    { label: 'Departments', value: campaignData.departments.join(', ') || 'None' },
    { label: 'Groups', value: campaignData.groups.join(', ') || 'None' },
    { label: 'Manual Users', value: campaignData.manualUsers.join(', ') || 'None' },
    { label: 'Topics', value: campaignData.topics.join(', ') },
    { label: 'Enable Quiz', value: campaignData.enableQuiz ? 'Yes' : 'No' },
    { label: 'Enable Games', value: campaignData.enableGames ? 'Yes' : 'No' },
    { label: 'Enable Certification', value: campaignData.enableCert ? 'Yes' : 'No' },
    { label: 'Enable Cyber Items', value: campaignData.enableCyber ? 'Yes' : 'No' },
    { label: 'Start Date', value: campaignData.startDate },
    { label: 'End Date', value: campaignData.endDate },
    { label: 'Schedule', value: campaignData.schedule.map(s => `${s.topic}: ${s.date}`).join(' | ') }
  ];
  
  container.innerHTML = summary.map(item => `
    <div class="flex gap-1.5 text-[11px]">
      <span class="font-medium min-w-[120px]">${item.label}:</span>
      <span class="text-gray-500">${item.value}</span>
    </div>
  `).join('');
}

/* ==============================================
   SUCCESS MODAL STYLES & FUNCTIONS
============================================== */
function addSuccessModalStyles() {
  if (document.getElementById('success-modal-styles')) return;

  const style = document.createElement('style');
  style.id = 'success-modal-styles';
  style.textContent = `
    .success-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .success-modal-overlay.active {
      opacity: 1;
    }

    .success-modal {
      background: white;
      border-radius: 1rem;
      max-width: 450px;
      width: 100%;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      transform: scale(0.9) translateY(20px);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .success-modal-overlay.active .success-modal {
      transform: scale(1) translateY(0);
    }

    .success-modal-content {
      padding: 2rem;
      text-align: center;
    }

    .success-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, #10b981, #059669);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: successPulse 0.6s ease-out;
    }

    .success-icon svg {
      width: 48px;
      height: 48px;
      color: white;
      animation: successCheck 0.5s ease-out 0.2s both;
    }

    @keyframes successPulse {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes successCheck {
      0% {
        transform: scale(0) rotate(-45deg);
        opacity: 0;
      }
      100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
    }

    .success-modal-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 0.5rem;
    }

    .success-modal-message {
      font-size: 0.9375rem;
      color: #6b7280;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .success-modal-actions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .success-modal-btn {
      width: 100%;
      padding: 0.875rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .success-modal-btn-primary {
      background: #3b82f6;
      color: white;
    }

    .success-modal-btn-primary:hover {
      background: #2563eb;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
    }

    .success-modal-btn-secondary {
      background: white;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .success-modal-btn-secondary:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      background: #3b82f6;
      position: absolute;
      animation: confetti-fall 3s linear;
    }

    @keyframes confetti-fall {
      to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

function createSuccessModal() {
  addSuccessModalStyles();

  const overlay = document.createElement('div');
  overlay.className = 'success-modal-overlay';
  
  overlay.innerHTML = `
    <div class="success-modal">
      <div class="success-modal-content">
        <div class="success-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 class="success-modal-title">Campaign Created Successfully! 🎉</h2>
        <p class="success-modal-message">
          Your campaign has been submitted and saved successfully. Would you like to create another campaign?
        </p>

        <div class="success-modal-actions">
          <button class="success-modal-btn success-modal-btn-primary" id="createAnotherCampaignBtn">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create Another Campaign
          </button>
          <button class="success-modal-btn success-modal-btn-secondary" id="stayOnPageBtn">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Stay on This Page
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  setTimeout(() => overlay.classList.add('active'), 10);

  createConfetti(overlay);

  document.getElementById('createAnotherCampaignBtn').onclick = () => {
    closeSuccessModal(overlay);
    setTimeout(() => window.location.reload(), 300);
  };

  document.getElementById('stayOnPageBtn').onclick = () => {
    closeSuccessModal(overlay);
  };
}

function closeSuccessModal(overlay) {
  overlay.classList.remove('active');
  setTimeout(() => overlay.remove(), 300);
}

function createConfetti(container) {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      container.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }, i * 30);
  }
}

/* ==============================================
   CSS ANIMATIONS
============================================== */
const styleAnimations = document.createElement('style');
styleAnimations.textContent = `
  .fade-enter {
    opacity: 0;
    transform: translateY(10px);
  }
  
  .fade-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.3s ease-out;
  }
  
  .fade-exit-active {
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease-in;
  }
`;
document.head.appendChild(styleAnimations);

console.log('✅ Campaign Wizard script loaded');
