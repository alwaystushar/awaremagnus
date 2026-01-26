/**
 * ================================================
 * COMPLETION NOTIFICATION MODAL
 * ================================================
 * Shows a beautiful notification when all setup is complete
 */

function showCompletionModal() {
  const html = `
    <div id="completionModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" style="display: flex; align-items: center; justify-content: center;">
      <div class="bg-white rounded-xl shadow-2xl max-w-md mx-4 overflow-hidden transform transition-all animation-bounce">
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-8 h-8 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-white">All Done! ✨</h2>
          <p class="text-white/80 text-sm mt-1">Your campaign wizard is ready</p>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-4">
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm">Contents Section</h4>
                <p class="text-gray-600 text-xs">Restored with proper layout & organization</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm">Modern Calendar Component</h4>
                <p class="text-gray-600 text-xs">Beautiful Flatpickr with custom styling</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm">Reusable Component</h4>
                <p class="text-gray-600 text-xs">js/flatpickr-calendar-component.js created</p>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <h5 class="text-xs font-semibold text-blue-900 mb-2">✨ Features Included:</h5>
            <ul class="space-y-1 text-xs text-blue-800">
              <li class="flex gap-2"><span>•</span> <span>Date range linkage (start/end)</span></li>
              <li class="flex gap-2"><span>•</span> <span>Min/max date validation</span></li>
              <li class="flex gap-2"><span>•</span> <span>Smooth animations</span></li>
              <li class="flex gap-2"><span>•</span> <span>Dropdown month selector</span></li>
              <li class="flex gap-2"><span>•</span> <span>Mobile-friendly layout</span></li>
            </ul>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 bg-gray-50 border-t border-gray-100">
          <button onclick="closeCompletionModal()" class="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all">
            Got It! Let's Start Testing 🚀
          </button>
        </div>
      </div>
    </div>

    <style>
      @keyframes bounce-in {
        0% {
          opacity: 0;
          transform: scale(0.8);
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: scale(1);
        }
      }

      #completionModal .animation-bounce {
        animation: bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
    </style>
  `;

  // Create temporary container
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container.firstElementChild);

  // Make closeCompletionModal available globally
  window.closeCompletionModal = function() {
    const modal = document.getElementById('completionModal');
    if (modal) {
      modal.style.opacity = '0';
      modal.style.transform = 'scale(0.9)';
      modal.style.transition = 'all 0.3s ease';
      setTimeout(() => modal.remove(), 300);
    }
  };

  // Auto-close after 8 seconds
  setTimeout(() => {
    const modal = document.getElementById('completionModal');
    if (modal) window.closeCompletionModal();
  }, 8000);
}

// Show on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showCompletionModal);
} else {
  showCompletionModal();
}
