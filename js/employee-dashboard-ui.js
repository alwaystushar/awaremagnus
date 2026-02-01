/**
 * Employee Dashboard UI Module
 * Enterprise-grade SaaS dashboard with filters, validation, and state management
 * 
 * Dependencies:
 * - calendar-component.js (ModernCalendar)
 * - checkbox-component.js (ModernCheckbox)
 * - multiselect-dropdown.js (MultiSelectDropdown)
 * - Lucide Icons
 * - Tailwind CSS
 */

(function () {
  'use strict';

  // =====================================================
  // STATE MANAGEMENT
  // =====================================================
  const state = {
    filters: {
      startDate: null,
      endDate: null,
      statuses: [],
      countries: []
    },
    data: [],
    filteredData: [],
    isLoading: false,
    errors: {
      dateRange: null,
      status: null,
      country: null
    }
  };

  // =====================================================
  // MOCK DATA - Simulated employee records
  // =====================================================
  const mockEmployeeData = [
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', country: 'US', status: 'active', department: 'Engineering', joinDate: '2024-03-15' },
    { id: 2, name: 'Emma Wilson', email: 'emma.wilson@company.com', country: 'GB', status: 'active', department: 'Marketing', joinDate: '2024-05-22' },
    { id: 3, name: 'Hans Mueller', email: 'hans.mueller@company.com', country: 'DE', status: 'inactive', department: 'Sales', joinDate: '2023-11-08' },
    { id: 4, name: 'Marie Dubois', email: 'marie.dubois@company.com', country: 'FR', status: 'pending', department: 'HR', joinDate: '2025-01-10' },
    { id: 5, name: 'Carlos Garcia', email: 'carlos.garcia@company.com', country: 'ES', status: 'active', department: 'Engineering', joinDate: '2024-08-30' },
    { id: 6, name: 'Yuki Tanaka', email: 'yuki.tanaka@company.com', country: 'JP', status: 'active', department: 'Design', joinDate: '2024-02-14' },
    { id: 7, name: 'Sofia Rossi', email: 'sofia.rossi@company.com', country: 'IT', status: 'inactive', department: 'Finance', joinDate: '2023-09-05' },
    { id: 8, name: 'Alex Chen', email: 'alex.chen@company.com', country: 'CN', status: 'pending', department: 'Engineering', joinDate: '2025-01-20' },
    { id: 9, name: 'Anna Kowalski', email: 'anna.kowalski@company.com', country: 'PL', status: 'active', department: 'Support', joinDate: '2024-06-18' },
    { id: 10, name: 'Mohammed Ali', email: 'mohammed.ali@company.com', country: 'AE', status: 'active', department: 'Operations', joinDate: '2024-04-25' },
    { id: 11, name: 'Lisa Anderson', email: 'lisa.anderson@company.com', country: 'US', status: 'inactive', department: 'Marketing', joinDate: '2023-12-01' },
    { id: 12, name: 'David Brown', email: 'david.brown@company.com', country: 'CA', status: 'active', department: 'Engineering', joinDate: '2024-07-12' }
  ];

  // Country data with flag codes
  const countryData = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱' },
    { code: 'AE', name: 'UAE', flag: '🇦🇪' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'IN', name: 'India', flag: '🇮🇳' }
  ];

  // Status options
  const statusOptions = [
    { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
    { value: 'inactive', label: 'Inactive', color: 'bg-red-100 text-red-800' },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' }
  ];

  // =====================================================
  // DOM CACHE - Cached DOM references
  // =====================================================
  const DOM = {
    container: null,
    startDateInput: null,
    endDateInput: null,
    statusContainer: null,
    countrySelect: null,
    dataTable: null,
    tableBody: null,
    applyFiltersBtn: null,
    resetFiltersBtn: null,
    exportBtn: null,
    refreshBtn: null,
    // Error containers
    dateRangeError: null,
    statusError: null,
    countryError: null,
    // Stats
    totalCount: null,
    activeCount: null,
    // Loading overlay
    loadingOverlay: null
  };

  // Component instances
  let startCalendar = null;
  let endCalendar = null;
  let countryDropdown = null;
  const statusCheckboxes = [];

  // =====================================================
  // INITIALIZATION
  // =====================================================
  
  /**
   * Initialize the Employee Dashboard
   * @param {string} containerSelector - CSS selector for the container element
   */
  function init(containerSelector = '#employee-dashboard') {
    DOM.container = document.querySelector(containerSelector);
    
    if (!DOM.container) {
      console.error('Employee Dashboard: Container not found');
      return;
    }

    // Load mock data into state
    state.data = [...mockEmployeeData];
    state.filteredData = [...mockEmployeeData];

    // Render the dashboard structure
    renderDashboard();

    // Cache DOM elements after rendering
    cacheDOMElements();

    // Initialize components
    initializeComponents();

    // Setup event listeners using delegation
    setupEventListeners();

    // Initial render of data
    renderDataTable();

    // Update stats
    updateStats();

    console.log('Employee Dashboard initialized successfully');
  }

  // =====================================================
  // RENDER FUNCTIONS
  // =====================================================

  /**
   * Render the complete dashboard structure
   */
  function renderDashboard() {
    DOM.container.innerHTML = `
      <!-- Dashboard Container -->
      <div class="employee-dashboard bg-[#F1F5F8] min-h-screen p-6">
        
        <!-- Header Section -->
        <header class="dashboard-header flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div class="header-left">
            <h1 class="text-xl font-semibold text-[#051226]">Employee Directory</h1>
            <p class="text-sm text-gray-500 mt-1">Manage and filter employee records</p>
          </div>
          <div class="header-right flex flex-wrap gap-2">
            <button id="refreshBtn" class="action-btn flex items-center gap-2 px-4 py-2 bg-white   rounded-lg text-sm font-medium text-[#051226] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00CCC4] focus:ring-offset-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <i data-lucide="refresh-cw" class="w-4 h-4"></i>
              <span>Refresh</span>
            </button>
            <button id="exportBtn" class="action-btn flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-lg text-sm font-medium hover:bg-[#002244] focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-offset-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <i data-lucide="download" class="w-4 h-4"></i>
              <span>Export</span>
            </button>
          </div>
        </header>

        <!-- Stats Cards -->
        <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="stat-card bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Total Employees</p>
                <p id="totalCount" class="text-2xl font-semibold text-[#051226] mt-1">0</p>
              </div>
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <i data-lucide="users" class="w-5 h-5 text-blue-600"></i>
              </div>
            </div>
          </div>
          <div class="stat-card bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Active</p>
                <p id="activeCount" class="text-2xl font-semibold text-green-600 mt-1">0</p>
              </div>
              <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <i data-lucide="user-check" class="w-5 h-5 text-green-600"></i>
              </div>
            </div>
          </div>
          <div class="stat-card bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Inactive</p>
                <p id="inactiveCount" class="text-2xl font-semibold text-red-600 mt-1">0</p>
              </div>
              <div class="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <i data-lucide="user-x" class="w-5 h-5 text-red-600"></i>
              </div>
            </div>
          </div>
          <div class="stat-card bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Pending</p>
                <p id="pendingCount" class="text-2xl font-semibold text-yellow-600 mt-1">0</p>
              </div>
              <div class="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <i data-lucide="user-plus" class="w-5 h-5 text-yellow-600"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter Panel -->
        <div class="filter-panel bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-6">
          <div class="flex items-center gap-2 mb-4">
            <i data-lucide="filter" class="w-4 h-4 text-[#003366]"></i>
            <h2 class="text-base font-semibold text-[#051226]">Filters</h2>
          </div>
          
          <div class="filter-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <!-- Date Range Filter -->
            <div class="filter-group">
              <label class="input-label block text-xs font-medium text-gray-600 mb-1.5">
                Start Date <span class="text-red-500">*</span>
              </label>
              <div class="input-group">
                <input type="text" 
                       id="startDateInput" 
                       class="input-field modern-calendar w-full px-3 py-2 text-sm   rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CCC4] focus:border-transparent"
                       placeholder="Select start date"
                       readonly>
              </div>
              <div id="startDateError" class="error-message text-xs text-red-500 mt-1 hidden"></div>
            </div>

            <div class="filter-group">
              <label class="input-label block text-xs font-medium text-gray-600 mb-1.5">
                End Date <span class="text-red-500">*</span>
              </label>
              <div class="input-group">
                <input type="text" 
                       id="endDateInput" 
                       class="input-field modern-calendar w-full px-3 py-2 text-sm   rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CCC4] focus:border-transparent"
                       placeholder="Select end date"
                       readonly>
              </div>
              <div id="endDateError" class="error-message text-xs text-red-500 mt-1 hidden"></div>
            </div>

            <!-- Status Filter -->
            <div class="filter-group">
              <label class="input-label block text-xs font-medium text-gray-600 mb-1.5">
                Status <span class="text-red-500">*</span>
              </label>
              <div id="statusContainer" class="flex flex-wrap gap-3 mt-2">
                ${statusOptions.map(status => `
                  <label class="lang-item flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" 
                           class="real-checkbox status-checkbox sr-only" 
                           value="${status.value}"
                           data-label="${status.label}">
                    <span class="visual-tick w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center transition-all group-hover:border-[#00CCC4]">
                      <i data-lucide="check" class="w-3 h-3 text-white opacity-0 transition-opacity"></i>
                    </span>
                    <span class="text-sm text-gray-700">${status.label}</span>
                  </label>
                `).join('')}
              </div>
              <div id="statusError" class="error-message text-xs text-red-500 mt-1 hidden"></div>
            </div>

            <!-- Country Filter -->
            <div class="filter-group">
              <label class="input-label block text-xs font-medium text-gray-600 mb-1.5">
                Country <span class="text-red-500">*</span>
              </label>
              <select id="countrySelect" class="input-field w-full" multiple>
                ${countryData.map(country => `
                  <option value="${country.code}" data-flag="${country.flag}">${country.flag} ${country.name}</option>
                `).join('')}
              </select>
              <div id="countryError" class="error-message text-xs text-red-500 mt-1 hidden"></div>
            </div>
          </div>

          <!-- Filter Actions -->
          <div class="filter-actions flex flex-wrap gap-3 mt-5 pt-4 border-t border-gray-100">
            <button id="applyFiltersBtn" class="flex items-center gap-2 px-5 py-2 bg-[#00CCC4] text-white rounded-lg text-sm font-medium hover:bg-[#00b3ac] focus:outline-none focus:ring-2 focus:ring-[#00CCC4] focus:ring-offset-1 transition-all">
              <i data-lucide="search" class="w-4 h-4"></i>
              <span>Apply Filters</span>
            </button>
            <button id="resetFiltersBtn" class="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 transition-all">
              <i data-lucide="x" class="w-4 h-4"></i>
              <span>Reset</span>
            </button>
          </div>
        </div>

        <!-- Data Table Section -->
        <div class="data-section bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <!-- Table Header -->
          <div class="table-header flex items-center justify-between p-4 border-b border-gray-100">
            <div class="flex items-center gap-2">
              <i data-lucide="list" class="w-4 h-4 text-[#003366]"></i>
              <h2 class="text-base font-semibold text-[#051226]">Employee Records</h2>
              <span id="recordCount" class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">0 records</span>
            </div>
          </div>

          <!-- Loading Overlay -->
          <div id="loadingOverlay" class="loading-overlay hidden absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <div class="flex flex-col items-center gap-3">
              <div class="w-8 h-8 border-3 border-[#00CCC4] border-t-transparent rounded-full animate-spin"></div>
              <span class="text-sm text-gray-600">Loading...</span>
            </div>
          </div>

          <!-- Table Container -->
          <div class="table-container relative overflow-x-auto">
            <table id="dataTable" class="w-full text-sm">
              <thead class="bg-gray-50 text-left">
                <tr>
                  <th class="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee</th>
                  <th class="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                  <th class="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Country</th>
                  <th class="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th class="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Join Date</th>
                  <th class="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody id="tableBody" class="divide-y divide-gray-100">
                <!-- Data rows will be rendered here -->
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div id="emptyState" class="empty-state hidden py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i data-lucide="inbox" class="w-8 h-8 text-gray-400"></i>
            </div>
            <h3 class="text-base font-medium text-gray-700 mb-1">No records found</h3>
            <p class="text-sm text-gray-500">Try adjusting your filter criteria</p>
          </div>

          <!-- Validation Error State -->
          <div id="validationErrorState" class="validation-error-state hidden py-12 text-center">
            <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i data-lucide="alert-triangle" class="w-8 h-8 text-red-400"></i>
            </div>
            <h3 class="text-base font-medium text-gray-700 mb-1">Please fix filter errors</h3>
            <p class="text-sm text-gray-500">Complete all required fields to view results</p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Cache DOM elements for performance
   */
  function cacheDOMElements() {
    DOM.startDateInput = document.getElementById('startDateInput');
    DOM.endDateInput = document.getElementById('endDateInput');
    DOM.statusContainer = document.getElementById('statusContainer');
    DOM.countrySelect = document.getElementById('countrySelect');
    DOM.dataTable = document.getElementById('dataTable');
    DOM.tableBody = document.getElementById('tableBody');
    DOM.applyFiltersBtn = document.getElementById('applyFiltersBtn');
    DOM.resetFiltersBtn = document.getElementById('resetFiltersBtn');
    DOM.exportBtn = document.getElementById('exportBtn');
    DOM.refreshBtn = document.getElementById('refreshBtn');
    DOM.loadingOverlay = document.getElementById('loadingOverlay');
    
    // Error containers
    DOM.startDateError = document.getElementById('startDateError');
    DOM.endDateError = document.getElementById('endDateError');
    DOM.statusError = document.getElementById('statusError');
    DOM.countryError = document.getElementById('countryError');
    
    // Stats
    DOM.totalCount = document.getElementById('totalCount');
    DOM.activeCount = document.getElementById('activeCount');
    DOM.inactiveCount = document.getElementById('inactiveCount');
    DOM.pendingCount = document.getElementById('pendingCount');
    DOM.recordCount = document.getElementById('recordCount');
    
    // States
    DOM.emptyState = document.getElementById('emptyState');
    DOM.validationErrorState = document.getElementById('validationErrorState');
  }

  // =====================================================
  // COMPONENT INITIALIZATION
  // =====================================================

  /**
   * Initialize all UI components
   */
  function initializeComponents() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Initialize Calendar Components
    initCalendars();

    // Initialize Checkbox Components
    initCheckboxes();

    // Initialize Country MultiSelect Dropdown
    initCountryDropdown();
  }

  /**
   * Initialize calendar components for date selection
   * ModernCalendar auto-enhances inputs with .modern-calendar class
   * Dates are stored in input.dataset.date
   */
  function initCalendars() {
    // ModernCalendar auto-initializes via window.modernCalendar
    // We just need to set up change listeners
    
    // If modernCalendar doesn't exist yet, wait for it
    if (typeof window.modernCalendar === 'undefined') {
      // Fallback: use native date inputs
      DOM.startDateInput.type = 'date';
      DOM.endDateInput.type = 'date';
      console.warn('ModernCalendar not initialized. Using native date inputs.');
      return;
    }

    // Calendar component will auto-enhance inputs with .modern-calendar class
    // The date value is stored in dataset.date and fires 'change' event
    
    // Set up change listener for start date
    DOM.startDateInput.addEventListener('change', () => {
      const date = DOM.startDateInput.dataset.date || DOM.startDateInput.value;
      state.filters.startDate = date;
      clearError('startDate');
    });

    // Set up change listener for end date
    DOM.endDateInput.addEventListener('change', () => {
      const date = DOM.endDateInput.dataset.date || DOM.endDateInput.value;
      state.filters.endDate = date;
      clearError('endDate');
    });
  }

  /**
   * Initialize checkbox components for status selection
   */
  function initCheckboxes() {
    const checkboxItems = DOM.statusContainer.querySelectorAll('.lang-item');
    
    checkboxItems.forEach((item) => {
      const checkbox = item.querySelector('.real-checkbox');
      const visualTick = item.querySelector('.visual-tick');
      
      // Check if ModernCheckbox exists
      if (typeof ModernCheckbox !== 'undefined') {
        const modernCheckbox = new ModernCheckbox(item);
        statusCheckboxes.push(modernCheckbox);
      }
      
      // Add click handler for checkbox toggle
      item.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT') {
          checkbox.checked = !checkbox.checked;
        }
        
        // Update visual state
        updateCheckboxVisual(checkbox, visualTick);
        
        // Update state
        updateStatusState();
        clearError('status');
      });

      // Handle keyboard navigation
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'checkbox');
      item.setAttribute('aria-checked', checkbox.checked);
      
      item.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          checkbox.checked = !checkbox.checked;
          updateCheckboxVisual(checkbox, visualTick);
          updateStatusState();
          clearError('status');
          item.setAttribute('aria-checked', checkbox.checked);
        }
      });
    });
  }

  /**
   * Update checkbox visual state
   */
  function updateCheckboxVisual(checkbox, visualTick) {
    if (checkbox.checked) {
      visualTick.classList.add('bg-[#003366]', 'border-[#003366]');
      visualTick.classList.remove('border-gray-300');
      visualTick.querySelector('i').classList.remove('opacity-0');
      visualTick.querySelector('i').classList.add('opacity-100');
    } else {
      visualTick.classList.remove('bg-[#003366]', 'border-[#003366]');
      visualTick.classList.add('border-gray-300');
      visualTick.querySelector('i').classList.add('opacity-0');
      visualTick.querySelector('i').classList.remove('opacity-100');
    }
    
    // Re-render icons if needed
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  /**
   * Update status state from checkboxes
   */
  function updateStatusState() {
    const checkedBoxes = DOM.statusContainer.querySelectorAll('.real-checkbox:checked');
    state.filters.statuses = Array.from(checkedBoxes).map(cb => cb.value);
  }

  /**
   * Initialize country multi-select dropdown
   */
  function initCountryDropdown() {
    // Check if MultiSelectDropdown exists
    if (typeof MultiSelectDropdown === 'undefined') {
      console.warn('MultiSelectDropdown not found. Using native select.');
      return;
    }

    countryDropdown = new MultiSelectDropdown(DOM.countrySelect, {
      placeholder: 'Select countries',
      searchPlaceholder: 'Search countries...',
      noResultsText: 'No countries found',
      selectAllText: 'Select All',
      onChange: (values) => {
        state.filters.countries = values;
        clearError('country');
      }
    });
  }

  // =====================================================
  // EVENT HANDLING
  // =====================================================

  /**
   * Setup event listeners using event delegation
   */
  function setupEventListeners() {
    // Apply filters button
    DOM.applyFiltersBtn.addEventListener('click', handleApplyFilters);

    // Reset filters button
    DOM.resetFiltersBtn.addEventListener('click', handleResetFilters);

    // Export button
    DOM.exportBtn.addEventListener('click', handleExport);

    // Refresh button
    DOM.refreshBtn.addEventListener('click', handleRefresh);

    // Table action delegation
    DOM.tableBody.addEventListener('click', handleTableActions);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Enter to apply filters
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleApplyFilters();
      }
      // Escape to reset filters
      if (e.key === 'Escape') {
        handleResetFilters();
      }
    });
  }

  /**
   * Handle apply filters action
   */
  function handleApplyFilters() {
    // Clear previous errors
    clearAllErrors();

    // Validate filters
    const isValid = validateFilters();

    if (!isValid) {
      showValidationErrorState();
      return;
    }

    // Show loading state
    showLoading();

    // Simulate API delay
    setTimeout(() => {
      // Apply filters to data
      applyFilters();

      // Hide loading
      hideLoading();

      // Render filtered data
      renderDataTable();

      // Update stats
      updateStats();

      // Show success toast
      showToast('Filters applied successfully', 'success');
    }, 500);
  }

  /**
   * Handle reset filters action
   */
  function handleResetFilters() {
    // Clear state
    state.filters = {
      startDate: null,
      endDate: null,
      statuses: [],
      countries: []
    };
    state.filteredData = [...state.data];

    // Clear calendar inputs using ModernCalendar static methods
    if (typeof ModernCalendar !== 'undefined' && ModernCalendar.clear) {
      ModernCalendar.clear('#startDateInput');
      ModernCalendar.clear('#endDateInput');
    } else {
      // Fallback for native inputs
      DOM.startDateInput.value = '';
      DOM.startDateInput.dataset.date = '';
      DOM.endDateInput.value = '';
      DOM.endDateInput.dataset.date = '';
    }

    // Uncheck all status checkboxes
    const checkboxes = DOM.statusContainer.querySelectorAll('.real-checkbox');
    checkboxes.forEach(cb => {
      cb.checked = false;
      const item = cb.closest('.lang-item');
      const visualTick = item.querySelector('.visual-tick');
      updateCheckboxVisual(cb, visualTick);
      item.setAttribute('aria-checked', 'false');
    });

    // Clear country dropdown
    if (countryDropdown && typeof countryDropdown.clear === 'function') {
      countryDropdown.clear();
    } else {
      // Fallback for native select
      Array.from(DOM.countrySelect.options).forEach(opt => opt.selected = false);
    }

    // Clear all errors
    clearAllErrors();

    // Re-render
    renderDataTable();
    updateStats();

    showToast('Filters reset', 'info');
  }

  /**
   * Handle export action
   */
  function handleExport() {
    if (state.filteredData.length === 0) {
      showToast('No data to export', 'warning');
      return;
    }

    // Generate CSV
    const headers = ['Name', 'Email', 'Department', 'Country', 'Status', 'Join Date'];
    const rows = state.filteredData.map(emp => [
      emp.name,
      emp.email,
      emp.department,
      emp.country,
      emp.status,
      emp.joinDate
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employee-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    showToast('Export downloaded', 'success');
  }

  /**
   * Handle refresh action
   */
  function handleRefresh() {
    showLoading();

    setTimeout(() => {
      // Simulate data refresh
      state.data = [...mockEmployeeData];
      state.filteredData = [...mockEmployeeData];
      
      hideLoading();
      renderDataTable();
      updateStats();
      
      showToast('Data refreshed', 'success');
    }, 800);
  }

  /**
   * Handle table row actions using delegation
   */
  function handleTableActions(e) {
    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    const employeeId = parseInt(actionBtn.dataset.id);
    const employee = state.data.find(emp => emp.id === employeeId);

    if (!employee) return;

    switch (action) {
      case 'view':
        showToast(`Viewing ${employee.name}`, 'info');
        break;
      case 'edit':
        showToast(`Editing ${employee.name}`, 'info');
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
          state.data = state.data.filter(emp => emp.id !== employeeId);
          state.filteredData = state.filteredData.filter(emp => emp.id !== employeeId);
          renderDataTable();
          updateStats();
          showToast(`${employee.name} deleted`, 'success');
        }
        break;
    }
  }

  // =====================================================
  // VALIDATION
  // =====================================================

  /**
   * Validate all filter inputs
   * @returns {boolean} - Whether validation passed
   */
  function validateFilters() {
    let isValid = true;

    // Get current values
    const startDate = DOM.startDateInput.value || DOM.startDateInput.dataset.date;
    const endDate = DOM.endDateInput.value || DOM.endDateInput.dataset.date;
    
    // Update state from inputs
    state.filters.startDate = startDate;
    state.filters.endDate = endDate;
    
    // Get countries from dropdown
    if (countryDropdown && typeof countryDropdown.getValues === 'function') {
      state.filters.countries = countryDropdown.getValues();
    } else {
      state.filters.countries = Array.from(DOM.countrySelect.selectedOptions).map(opt => opt.value);
    }
    
    // Update statuses
    updateStatusState();

    // Validate start date
    if (!state.filters.startDate) {
      showError('startDate', 'Start date is required');
      isValid = false;
    }

    // Validate end date
    if (!state.filters.endDate) {
      showError('endDate', 'End date is required');
      isValid = false;
    }

    // Validate date range
    if (state.filters.startDate && state.filters.endDate) {
      const start = new Date(state.filters.startDate);
      const end = new Date(state.filters.endDate);
      
      if (start > end) {
        showError('endDate', 'End date must be after start date');
        isValid = false;
      }
    }

    // Validate status selection
    if (state.filters.statuses.length === 0) {
      showError('status', 'Select at least one status');
      isValid = false;
    }

    // Validate country selection
    if (state.filters.countries.length === 0) {
      showError('country', 'Select at least one country');
      isValid = false;
    }

    return isValid;
  }

  /**
   * Show error message for a field
   */
  function showError(field, message) {
    state.errors[field] = message;

    let errorEl;
    let inputEl;

    switch (field) {
      case 'startDate':
        errorEl = DOM.startDateError;
        inputEl = DOM.startDateInput;
        break;
      case 'endDate':
        errorEl = DOM.endDateError;
        inputEl = DOM.endDateInput;
        break;
      case 'status':
        errorEl = DOM.statusError;
        break;
      case 'country':
        errorEl = DOM.countryError;
        break;
    }

    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }

    if (inputEl) {
      inputEl.classList.add('border-red-500', 'focus:ring-red-500');
      inputEl.classList.remove('border-gray-200', 'focus:ring-[#00CCC4]');
    }
  }

  /**
   * Clear error for a specific field
   */
  function clearError(field) {
    state.errors[field] = null;

    let errorEl;
    let inputEl;

    switch (field) {
      case 'startDate':
        errorEl = DOM.startDateError;
        inputEl = DOM.startDateInput;
        break;
      case 'endDate':
        errorEl = DOM.endDateError;
        inputEl = DOM.endDateInput;
        break;
      case 'status':
        errorEl = DOM.statusError;
        break;
      case 'country':
        errorEl = DOM.countryError;
        break;
    }

    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
    }

    if (inputEl) {
      inputEl.classList.remove('border-red-500', 'focus:ring-red-500');
      inputEl.classList.add('border-gray-200', 'focus:ring-[#00CCC4]');
    }
  }

  /**
   * Clear all error messages
   */
  function clearAllErrors() {
    ['startDate', 'endDate', 'status', 'country'].forEach(clearError);
    hideValidationErrorState();
  }

  // =====================================================
  // DATA FILTERING
  // =====================================================

  /**
   * Apply current filters to data
   */
  function applyFilters() {
    const { startDate, endDate, statuses, countries } = state.filters;

    state.filteredData = state.data.filter(employee => {
      // Filter by date range
      if (startDate && endDate) {
        const joinDate = new Date(employee.joinDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (joinDate < start || joinDate > end) {
          return false;
        }
      }

      // Filter by status
      if (statuses.length > 0 && !statuses.includes(employee.status)) {
        return false;
      }

      // Filter by country
      if (countries.length > 0 && !countries.includes(employee.country)) {
        return false;
      }

      return true;
    });
  }

  // =====================================================
  // RENDERING
  // =====================================================

  /**
   * Render the data table with filtered results
   */
  function renderDataTable() {
    // Hide states initially
    DOM.emptyState.classList.add('hidden');
    DOM.validationErrorState.classList.add('hidden');
    DOM.dataTable.classList.remove('hidden');

    // Check for empty state
    if (state.filteredData.length === 0) {
      DOM.tableBody.innerHTML = '';
      DOM.emptyState.classList.remove('hidden');
      DOM.dataTable.classList.add('hidden');
      DOM.recordCount.textContent = '0 records';
      return;
    }

    // Get country info helper
    const getCountryInfo = (code) => countryData.find(c => c.code === code) || { name: code, flag: '' };
    
    // Get status info helper
    const getStatusInfo = (status) => statusOptions.find(s => s.value === status) || { label: status, color: 'bg-gray-100 text-gray-800' };

    // Render rows
    DOM.tableBody.innerHTML = state.filteredData.map(employee => {
      const country = getCountryInfo(employee.country);
      const status = getStatusInfo(employee.status);
      
      return `
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-4 py-3">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 bg-[#003366] rounded-full flex items-center justify-center text-white text-sm font-medium">
                ${employee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p class="font-medium text-[#051226]">${employee.name}</p>
                <p class="text-xs text-gray-500">${employee.email}</p>
              </div>
            </div>
          </td>
          <td class="px-4 py-3 text-gray-600">${employee.department}</td>
          <td class="px-4 py-3">
            <span class="inline-flex items-center gap-1.5">
              <span class="text-base">${country.flag}</span>
              <span class="text-gray-600">${country.name}</span>
            </span>
          </td>
          <td class="px-4 py-3">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}">
              ${status.label}
            </span>
          </td>
          <td class="px-4 py-3 text-gray-600">${formatDate(employee.joinDate)}</td>
          <td class="px-4 py-3">
            <div class="flex items-center justify-end gap-1">
              <button data-action="view" data-id="${employee.id}" 
                      class="p-1.5 text-gray-400 hover:text-[#003366] hover:bg-gray-100 rounded-lg transition-colors"
                      title="View details"
                      aria-label="View ${employee.name}">
                <i data-lucide="eye" class="w-4 h-4 pointer-events-none"></i>
              </button>
              <button data-action="edit" data-id="${employee.id}" 
                      class="p-1.5 text-gray-400 hover:text-[#00CCC4] hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                      aria-label="Edit ${employee.name}">
                <i data-lucide="pencil" class="w-4 h-4 pointer-events-none"></i>
              </button>
              <button data-action="delete" data-id="${employee.id}" 
                      class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                      aria-label="Delete ${employee.name}">
                <i data-lucide="trash-2" class="w-4 h-4 pointer-events-none"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Update record count
    DOM.recordCount.textContent = `${state.filteredData.length} record${state.filteredData.length !== 1 ? 's' : ''}`;

    // Re-initialize Lucide icons for new elements
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  /**
   * Update statistics cards
   */
  function updateStats() {
    const total = state.filteredData.length;
    const active = state.filteredData.filter(e => e.status === 'active').length;
    const inactive = state.filteredData.filter(e => e.status === 'inactive').length;
    const pending = state.filteredData.filter(e => e.status === 'pending').length;

    // Animate count updates
    animateNumber(DOM.totalCount, total);
    animateNumber(DOM.activeCount, active);
    animateNumber(DOM.inactiveCount, inactive);
    animateNumber(DOM.pendingCount, pending);
  }

  /**
   * Animate number change
   */
  function animateNumber(element, target) {
    const current = parseInt(element.textContent) || 0;
    const diff = target - current;
    const duration = 300;
    const steps = 10;
    const increment = diff / steps;
    let step = 0;

    const animate = () => {
      step++;
      const value = Math.round(current + increment * step);
      element.textContent = value;
      
      if (step < steps) {
        setTimeout(animate, duration / steps);
      } else {
        element.textContent = target;
      }
    };

    if (diff !== 0) {
      animate();
    }
  }

  // =====================================================
  // UI STATE HELPERS
  // =====================================================

  /**
   * Show loading overlay
   */
  function showLoading() {
    state.isLoading = true;
    DOM.loadingOverlay.classList.remove('hidden');
    DOM.applyFiltersBtn.disabled = true;
    DOM.resetFiltersBtn.disabled = true;
  }

  /**
   * Hide loading overlay
   */
  function hideLoading() {
    state.isLoading = false;
    DOM.loadingOverlay.classList.add('hidden');
    DOM.applyFiltersBtn.disabled = false;
    DOM.resetFiltersBtn.disabled = false;
  }

  /**
   * Show validation error state
   */
  function showValidationErrorState() {
    DOM.validationErrorState.classList.remove('hidden');
    DOM.emptyState.classList.add('hidden');
  }

  /**
   * Hide validation error state
   */
  function hideValidationErrorState() {
    DOM.validationErrorState.classList.add('hidden');
  }

  /**
   * Show toast notification
   */
  function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.dashboard-toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `dashboard-toast fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 transform translate-y-0 opacity-100 transition-all duration-300`;
    
    // Set colors based on type
    const colors = {
      success: 'bg-green-600 text-white',
      error: 'bg-red-600 text-white',
      warning: 'bg-yellow-500 text-white',
      info: 'bg-[#003366] text-white'
    };
    toast.classList.add(...(colors[type] || colors.info).split(' '));

    // Set icon based on type
    const icons = {
      success: 'check-circle',
      error: 'x-circle',
      warning: 'alert-triangle',
      info: 'info'
    };

    toast.innerHTML = `
      <i data-lucide="${icons[type] || 'info'}" class="w-5 h-5"></i>
      <span class="text-sm font-medium">${message}</span>
    `;

    document.body.appendChild(toast);

    // Initialize icon
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Auto-remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('translate-y-2', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // =====================================================
  // UTILITY FUNCTIONS
  // =====================================================

  /**
   * Format date string
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // =====================================================
  // PUBLIC API
  // =====================================================

  // Expose init function globally
  window.EmployeeDashboard = {
    init,
    getState: () => ({ ...state }),
    applyFilters: handleApplyFilters,
    resetFilters: handleResetFilters,
    refresh: handleRefresh
  };

  // Auto-initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('employee-dashboard');
    if (container) {
      init('#employee-dashboard');
    }
  });

})();
