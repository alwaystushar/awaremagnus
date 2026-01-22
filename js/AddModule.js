/**
 * ================================================
 * MODULE CREATION FORM - COMPLETE VERSION
 * ================================================
 * Handles form validation, submission, translations, and preview
 */

/* ==============================================
   TOAST NOTIFICATION SYSTEM
============================================== */
let toastContainer;

function showToast(message, type = 'info') {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'fixed top-6 right-6 z-50 flex flex-col gap-2';
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
   CONFIGURATION
============================================== */
const priorityOrder = ["English", "Arabic", "Urdu", "Chinese", "Russian"];
const translationContainer = document.getElementById("translationContainer");

/* ==============================================
   TRANSLATION BLOCK TEMPLATE
============================================== */
function createTranslationBlock(lang, moduleCode) {
  return `
    <div class="border border-gray-200 rounded-xl p-4 translation-block" id="translation-${lang}">
      <h3 class="font-semibold text-base mb-3 flex items-center justify-between">
        <span class="flex items-center gap-1.5">
          <img src="images/lang-icon.svg" class="w-4 h-4 opacity-60" alt="Language icon" />
          Translation - ${lang}
        </span>
        <button type="button" 
                class="remove-translation-btn text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
                data-lang="${lang}">
          Remove
        </button>
      </h3>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <input type="hidden" name="translations[${lang}][module_code]" value="${moduleCode}">
          
          <div>
            <label class="block text-gray-700 mb-1 font-medium text-sm">
              Name <span class="text-red-500">*</span>
            </label>
            <input type="text" 
                   name="translations[${lang}][name]" 
                   data-lang="${lang}-name"
                   placeholder="Enter Template Name"
                   class="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring focus:ring-blue-100 transition-all hover:border-gray-300" 
                   required />
          </div>

          <div>
            <label class="block text-gray-700 mb-1 font-medium text-sm">
              Description <span class="text-red-500">*</span>
            </label>
            <textarea name="translations[${lang}][description]" 
                      data-lang="${lang}-desc"
                      placeholder="Write your module description"
                      class="w-full min-h-24 p-3 border border-gray-200 rounded-lg text-sm resize-y focus:ring focus:ring-blue-100 transition-all hover:border-gray-300" 
                      required></textarea>
          </div>
        </div>

        <div>
          <p class="font-medium text-gray-700 mb-1 text-sm">
            Upload Your Logo <span class="text-red-500">*</span>
            <span class="text-[10px] text-gray-500">(PNG, JPEG, max 5MB)</span>
          </p>

          <div class="border-2 border-dashed border-gray-300 rounded-xl p-4 h-36 flex items-center justify-center bg-gray-50 overflow-hidden transition-colors hover:border-blue-300" 
               id="preview-${lang}">
            <img src="images/placeholder-img.svg" class="w-10 opacity-40" data-preview="${lang}" alt="Upload placeholder">
          </div>

          <button type="button"
            class="uploadBtn flex items-center justify-center gap-1 mt-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-gray-700 hover:bg-gray-50 text-sm w-full transition-colors"
            data-input="${lang}">
            <img src="images/upload.svg" class="w-4 opacity-70" alt="Upload icon" />
            Upload
          </button>

          <input type="file" 
                 class="hidden logoInput" 
                 name="translations[${lang}][logo]" 
                 data-logo="${lang}" 
                 accept=".png,.jpg,.jpeg,image/png,image/jpeg" 
                 required />
        </div>
      </div>
    </div>
  `;
}

/* ==============================================
   PREVIEW MODAL STYLES
============================================== */
function addPreviewModalStyles() {
  if (document.getElementById('preview-modal-styles')) return;

  const style = document.createElement('style');
  style.id = 'preview-modal-styles';
  style.textContent = `
    /* Modal Overlay */
    .preview-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .preview-modal-overlay.active {
      opacity: 1;
    }

    /* Modal Container */
    .preview-modal {
      background: white;
      border-radius: 1rem;
      max-width: 900px;
      width: 100%;
      max-height: 90vh;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      transform: scale(0.9) translateY(20px);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .preview-modal-overlay.active .preview-modal {
      transform: scale(1) translateY(0);
    }

    /* Modal Header */
    .preview-modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(to right, #eff6ff, #f0f9ff);
    }

    .preview-modal-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #111827;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .preview-modal-close {
      width: 2rem;
      height: 2rem;
      border-radius: 0.5rem;
      border: none;
      background: transparent;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.15s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .preview-modal-close:hover {
      background: #f3f4f6;
      color: #111827;
    }

    /* Modal Body */
    .preview-modal-body {
      padding: 1.5rem;
      overflow-y: auto;
      max-height: calc(90vh - 180px);
    }

    /* Module Info Section */
    .preview-section {
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: #f9fafb;
      border-radius: 0.75rem;
      border: 1px solid #e5e7eb;
    }

    .preview-section-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: #3b82f6;
      margin-bottom: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .preview-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .preview-info-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .preview-info-label {
      font-size: 0.75rem;
      font-weight: 500;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .preview-info-value {
      font-size: 0.9375rem;
      font-weight: 600;
      color: #111827;
    }

    /* Translation Cards */
    .preview-translation-card {
      margin-bottom: 1rem;
      padding: 1rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      transition: all 0.2s;
    }

    .preview-translation-card:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border-color: #3b82f6;
    }

    .preview-translation-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #f3f4f6;
    }

    .preview-translation-lang {
      font-size: 1rem;
      font-weight: 600;
      color: #111827;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .preview-translation-badge {
      padding: 0.25rem 0.625rem;
      background: #eff6ff;
      color: #3b82f6;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .preview-translation-content {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 1rem;
      align-items: start;
    }

    .preview-translation-text {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .preview-translation-name {
      font-size: 0.9375rem;
      font-weight: 600;
      color: #374151;
    }

    .preview-translation-desc {
      font-size: 0.875rem;
      color: #6b7280;
      line-height: 1.5;
    }

    .preview-translation-logo {
      width: 80px;
      height: 80px;
      border-radius: 0.5rem;
      object-fit: contain;
      border: 1px solid #e5e7eb;
      background: #f9fafb;
      padding: 0.5rem;
    }

    /* Modal Footer */
    .preview-modal-footer {
      padding: 1.5rem;
      border-top: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f9fafb;
    }

    .preview-modal-footer-text {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .preview-modal-actions {
      display: flex;
      gap: 0.75rem;
    }

    .preview-btn {
      padding: 0.625rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      border: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .preview-btn-cancel {
      background: white;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .preview-btn-cancel:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    .preview-btn-confirm {
      background: #3b82f6;
      color: white;
    }

    .preview-btn-confirm:hover {
      background: #2563eb;
    }

    /* Scrollbar */
    .preview-modal-body::-webkit-scrollbar {
      width: 8px;
    }

    .preview-modal-body::-webkit-scrollbar-track {
      background: #f3f4f6;
      border-radius: 0.5rem;
    }

    .preview-modal-body::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 0.5rem;
    }

    .preview-modal-body::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }
  `;
  document.head.appendChild(style);
}

/* ==============================================
   SUCCESS MODAL STYLES
============================================== */
function addSuccessModalStyles() {
  if (document.getElementById('success-modal-styles')) return;

  const style = document.createElement('style');
  style.id = 'success-modal-styles';
  style.textContent = `
    /* Success Modal Overlay */
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

    /* Success Modal Container */
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

    /* Success Modal Content */
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

    /* Success Modal Actions */
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
  `;
  document.head.appendChild(style);
}

/* ==============================================
   HELPER FUNCTIONS
============================================== */
function formatDisplayDate(dateString) {
  if (!dateString) return 'Not set';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function getCategoryName(categoryValue) {
  const categories = {
    'network': 'Network Security',
    'application': 'Application Security',
    'cloud': 'Cloud Security',
    'crypto': 'Cryptography'
  };
  return categories[categoryValue] || categoryValue;
}

function generateTranslationCards(translations) {
  return Object.entries(translations).map(([lang, data]) => `
    <div class="preview-translation-card">
      <div class="preview-translation-header">
        <div class="preview-translation-lang">
          <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
          ${lang}
        </div>
        <span class="preview-translation-badge">${data.logo || 'No logo'}</span>
      </div>
      <div class="preview-translation-content">
        <div class="preview-translation-text">
          <div>
            <div class="preview-info-label">Name</div>
            <div class="preview-translation-name">${data.name}</div>
          </div>
          <div>
            <div class="preview-info-label">Description</div>
            <div class="preview-translation-desc">${data.description}</div>
          </div>
        </div>
        ${data.logoFile ? `
          <img src="${URL.createObjectURL(data.logoFile)}" 
               alt="${lang} logo" 
               class="preview-translation-logo" />
        ` : ''}
      </div>
    </div>
  `).join('');
}

function closePreviewModal(overlay) {
  overlay.classList.remove('active');
  setTimeout(() => overlay.remove(), 300);
}

function closeSuccessModal(overlay) {
  overlay.classList.remove('active');
  setTimeout(() => overlay.remove(), 300);
}

/* ==============================================
   CREATE SUCCESS MODAL
============================================== */
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
        
        <h2 class="success-modal-title">Module Created Successfully! 🎉</h2>
        <p class="success-modal-message">
          Your module has been submitted and saved successfully. Would you like to create another module?
        </p>

        <div class="success-modal-actions">
          <button class="success-modal-btn success-modal-btn-primary" id="createAnotherBtn">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create Another Module
          </button>
          <button class="success-modal-btn success-modal-btn-secondary" id="stayOnPageBtn">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Stay on This Page
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Animate in
  setTimeout(() => overlay.classList.add('active'), 10);

  // Event listeners
  document.getElementById('createAnotherBtn').onclick = () => {
    closeSuccessModal(overlay);
    setTimeout(() => window.location.reload(), 300);
  };

  document.getElementById('stayOnPageBtn').onclick = () => {
    closeSuccessModal(overlay);
  };
}

/* ==============================================
   CONFIRM SUBMISSION FUNCTION
============================================== */
function confirmSubmission(overlay, data) {
  closePreviewModal(overlay);
  
  // Log to console with better formatting
  console.log('%c✅ MODULE SUBMITTED SUCCESSFULLY', 'color: #10b981; font-size: 16px; font-weight: bold;');
  console.log('%c📋 Module Data:', 'color: #3b82f6; font-weight: bold;');
  console.table(data.module);
  console.log('%c🌐 Translations:', 'color: #3b82f6; font-weight: bold;');
  Object.entries(data.translations).forEach(([lang, transData]) => {
    console.group(`%c${lang}`, 'color: #8b5cf6; font-weight: bold;');
    console.log('Name:', transData.name);
    console.log('Description:', transData.description);
    console.log('Logo:', transData.logo);
    if (transData.logoFile) {
      console.log('Logo File:', transData.logoFile);
    }
    console.groupEnd();
  });
  console.log('%c📦 Complete Data Object:', 'color: #3b82f6; font-weight: bold;');
  console.log(data);

  // Show toast
  showToast("Module created successfully! 🎉", 'success');

  // Show success modal
  setTimeout(() => {
    createSuccessModal();
  }, 500);
}

/* ==============================================
   CREATE PREVIEW MODAL
============================================== */
function createPreviewModal(data) {
  addPreviewModalStyles();

  const overlay = document.createElement('div');
  overlay.className = 'preview-modal-overlay';
  
  overlay.innerHTML = `
    <div class="preview-modal">
      <!-- Header -->
      <div class="preview-modal-header">
        <h2 class="preview-modal-title">
          <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Preview Module
        </h2>
        <button class="preview-modal-close" id="closePreviewModal">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="preview-modal-body">
        <!-- Module Information -->
        <div class="preview-section">
          <div class="preview-section-title">Module Information</div>
          <div class="preview-info-grid">
            <div class="preview-info-item">
              <span class="preview-info-label">Module Name</span>
              <span class="preview-info-value">${data.module.name}</span>
            </div>
            <div class="preview-info-item">
              <span class="preview-info-label">Creation Day</span>
              <span class="preview-info-value">${formatDisplayDate(data.module.creation_day)}</span>
            </div>
            <div class="preview-info-item">
              <span class="preview-info-label">Category</span>
              <span class="preview-info-value">${getCategoryName(data.module.category)}</span>
            </div>
          </div>
        </div>

        <!-- Translations -->
        <div class="preview-section">
          <div class="preview-section-title">Translations (${Object.keys(data.translations).length})</div>
          ${generateTranslationCards(data.translations)}
        </div>
      </div>

      <!-- Footer -->
      <div class="preview-modal-footer">
        <p class="preview-modal-footer-text">
          Review your module details before submitting
        </p>
        <div class="preview-modal-actions">
          <button class="preview-btn preview-btn-cancel" id="cancelPreviewModal">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Cancel
          </button>
          <button class="preview-btn preview-btn-confirm" id="confirmPreviewModal">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Animate in
  setTimeout(() => overlay.classList.add('active'), 10);

  // Event listeners
  document.getElementById('closePreviewModal').onclick = () => closePreviewModal(overlay);
  document.getElementById('cancelPreviewModal').onclick = () => closePreviewModal(overlay);
  document.getElementById('confirmPreviewModal').onclick = () => confirmSubmission(overlay, data);

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePreviewModal(overlay);
  });

  // Close on Escape key
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closePreviewModal(overlay);
      document.removeEventListener('keydown', escHandler);
    }
  });
}

/* ==============================================
   INITIALIZE
============================================== */
document.addEventListener('DOMContentLoaded', function() {
  // Only English is checked by default
  const englishCheckbox = document.querySelector('.real-checkbox[value="English"]');
  if (englishCheckbox) englishCheckbox.checked = true;
});

/* ==============================================
   ADD TRANSLATION FIELDS
============================================== */
document.getElementById("addTranslationBtn").addEventListener('click', function(e) {
  e.preventDefault();
  
  const moduleCode = document.getElementById("moduleName").value.trim();
  
  if (!moduleCode) {
    showToast("Please enter Module Name before adding translations", 'error');
    document.getElementById("moduleName").focus();
    return;
  }

  const selectedLangs = document.querySelectorAll('.real-checkbox:checked');
  
  if (selectedLangs.length === 0) {
    showToast("Select at least one language", 'warning');
    return;
  }

  const langsArray = Array.from(selectedLangs);

  // Sort by priority order
  langsArray.sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a.value);
    const bIndex = priorityOrder.indexOf(b.value);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  let addedCount = 0;
  langsArray.forEach(lang => {
    const langValue = lang.value;
    
    if (document.getElementById(`translation-${langValue}`)) return;

    translationContainer.insertAdjacentHTML("beforeend", createTranslationBlock(langValue, moduleCode));
    addedCount++;
  });

  if (addedCount > 0) {
    showToast(`${addedCount} translation field(s) added successfully`, 'success');
  } else {
    showToast("All selected languages already added", 'info');
  }
});

/* ==============================================
   HANDLE UPLOAD BUTTONS
============================================== */
document.addEventListener("click", function (e) {
  // Upload button
  if (e.target.closest(".uploadBtn")) {
    e.preventDefault();
    const lang = e.target.closest(".uploadBtn").dataset.input;
    const fileInput = document.querySelector(`input[data-logo="${lang}"]`);
    if (fileInput) fileInput.click();
  }

  // Remove translation button
  if (e.target.closest(".remove-translation-btn")) {
    e.preventDefault();
    const lang = e.target.closest(".remove-translation-btn").dataset.lang;
    removeTranslation(lang);
  }
});

/* ==============================================
   PREVIEW LOGO WITH VALIDATION
============================================== */
function previewLogo(event, langCode) {
  const file = event.target.files[0];
  const previewContainer = document.getElementById(`preview-${langCode}`);
  
  if (!file) {
    previewContainer.innerHTML = `<img src="images/placeholder-img.svg" class="w-10 opacity-40" data-preview="${langCode}" alt="Upload placeholder">`;
    return;
  }

  // Validate file type
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    showToast('Please upload only PNG or JPEG images', 'error');
    event.target.value = '';
    return;
  }

  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    showToast('Image size must be less than 5MB', 'error');
    event.target.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    previewContainer.innerHTML = `<img src="${e.target.result}" class="max-w-full max-h-full object-contain" data-preview="${langCode}" alt="Logo preview">`;
    showToast(`Logo uploaded successfully for ${langCode}`, 'success');
  };
  reader.onerror = function() {
    showToast('Error reading file. Please try again', 'error');
  };
  reader.readAsDataURL(file);
}

document.addEventListener("change", function (e) {
  if (e.target.classList.contains("logoInput")) {
    const lang = e.target.dataset.logo;
    previewLogo(e, lang);
  }
});

/* ==============================================
   REMOVE TRANSLATION FUNCTION
============================================== */
function removeTranslation(langCode) {
  const block = document.getElementById(`translation-${langCode}`);
  if (block) {
    // Add fade out animation
    block.style.opacity = '0';
    block.style.transform = 'scale(0.95)';
    block.style.transition = 'all 0.2s ease-out';
    
    setTimeout(() => {
      block.remove();
      showToast(`${langCode} translation removed`, 'info');
    }, 200);
  }
  
  const checkbox = document.querySelector(`.real-checkbox[value="${langCode}"]`);
  if (checkbox) checkbox.checked = false;
}

/* ==============================================
   FORM VALIDATION HELPERS
============================================== */
function validateInput(input, fieldName) {
  const value = input.value ? input.value.trim() : '';
  
  if (!value) {
    input.classList.add('border-red-300', 'bg-red-50');
    input.classList.remove('border-gray-200');
    showToast(`${fieldName} is required`, 'error');
    input.focus();
    return false;
  }
  
  input.classList.remove('border-red-300', 'bg-red-50');
  input.classList.add('border-gray-200');
  return true;
}

/* ==============================================
   FORM SUBMISSION WITH VALIDATION
============================================== */
document.getElementById("submitBtn").addEventListener('click', function(e) {
  e.preventDefault();

  // Validate main module fields
  const moduleName = document.getElementById("moduleName");
  const creationDay = document.getElementById("creationDay");
  const category = document.getElementById("category");

  if (!validateInput(moduleName, "Module Name")) return;
  
  // For calendar, check dataset.date if using custom calendar
  const creationDayValue = creationDay.dataset.date || creationDay.value;
  if (!creationDayValue) {
    creationDay.classList.add('border-red-300', 'bg-red-50');
    showToast("Creation Day is required", 'error');
    creationDay.focus();
    return;
  }
  
  if (!validateInput(category, "Module Category")) return;

  // Check if translations exist
  const translationBlocks = document.querySelectorAll('[id^="translation-"]');
  if (translationBlocks.length === 0) {
    showToast("Please add at least one translation field", 'error');
    return;
  }

  // Prepare data structure
  const data = {
    module: {
      name: moduleName.value.trim(),
      creation_day: creationDayValue,
      category: category.value
    },
    translations: {}
  };

  // Validate and collect translation data
  let isValid = true;
  
  for (const block of translationBlocks) {
    const lang = block.id.replace('translation-', '');
    const nameInput = block.querySelector(`[name="translations[${lang}][name]"]`);
    const descInput = block.querySelector(`[name="translations[${lang}][description]"]`);
    const logoInput = block.querySelector(`[name="translations[${lang}][logo]"]`);
    const previewImg = block.querySelector(`[data-preview="${lang}"]`);

    // Validate name
    if (!nameInput.value.trim()) {
      nameInput.classList.add('border-red-300', 'bg-red-50');
      showToast(`${lang} translation name is required`, 'error');
      nameInput.focus();
      isValid = false;
      break;
    } else {
      nameInput.classList.remove('border-red-300', 'bg-red-50');
    }

    // Validate description
    if (!descInput.value.trim()) {
      descInput.classList.add('border-red-300', 'bg-red-50');
      showToast(`${lang} translation description is required`, 'error');
      descInput.focus();
      isValid = false;
      break;
    } else {
      descInput.classList.remove('border-red-300', 'bg-red-50');
    }

    // Validate logo upload
    const hasLogo = previewImg && !previewImg.src.includes('placeholder-img.svg');
    if (!hasLogo) {
      showToast(`${lang} logo is required`, 'error');
      isValid = false;
      break;
    }

    // Collect translation data
    data.translations[lang] = {
      module_code: moduleName.value.trim(),
      name: nameInput.value.trim(),
      description: descInput.value.trim(),
      logo: logoInput.files[0] ? logoInput.files[0].name : null,
      logoFile: logoInput.files[0] || null
    };
  }

  if (!isValid) return;

  // Show preview modal
  createPreviewModal(data);
});

/* ==============================================
   CANCEL BUTTON
============================================== */
document.getElementById("cancelBtn").addEventListener('click', function(e) {
  e.preventDefault();
  
  const hasData = document.getElementById("moduleName").value.trim() || 
                  document.getElementById("creationDay").value ||
                  document.querySelectorAll('[id^="translation-"]').length > 0;

  if (hasData) {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      window.location.reload();
    }
  } else {
    window.location.reload();
  }
});

/* ==============================================
   REAL-TIME INPUT VALIDATION
============================================== */
document.addEventListener('input', function(e) {
  // Remove error styling on input
  if (e.target.matches('input, textarea, select')) {
    if (e.target.value.trim()) {
      e.target.classList.remove('border-red-300', 'bg-red-50');
      e.target.classList.add('border-gray-200');
    }
  }
});

/* ==============================================
   PREVENT FORM SUBMISSION ON ENTER
============================================== */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
  }
});

console.log('✅ Module Form initialized successfully');
