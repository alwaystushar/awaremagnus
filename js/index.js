/**
 * ================================================
 * INDEX.JS - GLOBAL FUNCTIONS
 * ================================================
 * Safe initialization with null checks
 */

/* ==============================================
   UTILITY FUNCTIONS
============================================== */
function toggleMenu(id, button) {
  const menu = document.getElementById(id);
  if (menu) {
    menu.classList.toggle('hidden');
  }
  if (button) {
    button.classList.toggle('open');
  }
}

/* ==============================================
   ANIMATIONS
============================================== */
// Animate progress bars
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('tbody tr').forEach(row => {
    const bar = row.querySelector('.bg-blue-500');
    if (bar) {
      bar.style.width = '0%';
      setTimeout(() => bar.style.width = '60%', 100);
    }
  });
});

/* ==============================================
   TOAST NOTIFICATIONS
============================================== */
const errorIcon = `
<svg class="w-8 h-8 text-white flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
  <circle cx="12" cy="12" r="10" fill="#fff2" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 4h.01M12 6.5A1.5 1.5 0 1 1 12 9.5A1.5 1.5 0 0 1 12 6.5z" />
</svg>`;

const successIcon = `
<svg class="w-8 h-8 text-white flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
  <circle cx="12" cy="12" r="10" fill="#fff2" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" />
</svg>`;

/**
 * Displays a custom toast notification.
 * @param {'error'|'success'} type - Type of toast to display.
 */
function showCustomToast(type) {
  const container = document.getElementById('toast-container');
  if (!container) {
    console.error('Toast container element not found');
    return;
  }

  const toast = document.createElement('div');
  toast.className =
    'flex items-start p-6 rounded-2xl shadow-xl max-w-md w-full ' +
    (type === 'error' ? 'bg-red-500/90' : 'bg-green-500/90') +
    ' text-white gap-4 animate-fade-in';

  toast.innerHTML = `
    <span class="mt-1" aria-hidden="true">${type === 'error' ? errorIcon : successIcon}</span>
    <div>
      <div class="text-[18px] font-bold">
        ${type === 'error' ? 'This is an error message' : 'Success!'}
      </div>
      <div class="text-[12px] font-normal mt-1">
        ${type === 'error'
          ? 'This is the sub heading of the error message<br>with explanation'
          : 'Your operation was completed successfully.'}
      </div>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Inject fade-in animation CSS dynamically
(function addFadeInStyle() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.4s ease forwards;
    }
  `;
  document.head.appendChild(style);
})();

/* ==============================================
   MENU TOGGLE FUNCTIONS
============================================== */
function toggleMenus() {
  const primaryMenu = document.getElementById('primaryMenu');
  const subMenu = document.getElementById('subMenu');
  const icon = document.getElementById('flip');

  if (!primaryMenu || !subMenu || !icon) return;

  const primaryText = primaryMenu.querySelectorAll('.menu-text');
  const subText = subMenu.querySelectorAll('.menu-text');

  const isPrimaryCollapsed = primaryMenu.classList.contains('w-9');

  if (isPrimaryCollapsed) {
    primaryMenu.classList.replace('w-9', 'w-[152px]');
    subMenu.classList.replace('w-[152px]', 'w-9');

    primaryText.forEach(el => el.classList.remove('hidden'));
    subText.forEach(el => el.classList.add('hidden'));

    icon.classList.add('scale-x-[-1]');
  } else {
    primaryMenu.classList.replace('w-[152px]', 'w-9');
    subMenu.classList.replace('w-9', 'w-[152px]');

    primaryText.forEach(el => el.classList.add('hidden'));
    subText.forEach(el => el.classList.remove('hidden'));

    icon.classList.remove('scale-x-[-1]');
  }
}

function toggleMainMenu() {
  const menu = document.getElementById('mainMenu');
  const flipIcon = document.getElementById('flip');

  if (!menu || !flipIcon) return;

  const menuTextElements = menu.querySelectorAll('.menu-text');

  menu.classList.toggle('w-[152px]');
  menu.classList.toggle('w-9');

  menuTextElements.forEach(el => {
    el.classList.toggle('hidden');
  });

  flipIcon.classList.toggle('scale-x-[-1]');
  flipIcon.classList.toggle('scale-x-[1]');
}

/* ==============================================
   INITIALIZE ON DOM LOAD
============================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize primary/sub menu state
  const primaryMenu = document.getElementById('primaryMenu');
  const subMenu = document.getElementById('subMenu');
  const icon = document.getElementById('flip');

  if (primaryMenu && subMenu && icon) {
    const primaryText = primaryMenu.querySelectorAll('.menu-text');
    const subText = subMenu.querySelectorAll('.menu-text');

    primaryMenu.classList.remove('w-[152px]');
    primaryMenu.classList.add('w-9');
    subMenu.classList.remove('w-9');
    subMenu.classList.add('w-[152px]');

    primaryText.forEach(el => el.classList.add('hidden'));
    subText.forEach(el => el.classList.remove('hidden'));

    icon.classList.remove('scale-x-[-1]');
  }

  // Initialize filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('bg-gray-900')) return;

      filterButtons.forEach(btn => {
        btn.classList.remove('bg-gray-900', 'text-white');
        btn.classList.add('text-gray-600', 'hover:text-black');

        const span = btn.querySelector('.number');
        if (span) {
          span.classList.remove('bg-gray-700', 'text-white');
          span.classList.add('bg-green-500/15', 'text-green-500');
        }

        const icon = btn.querySelector('.icon');
        if (icon) {
          icon.classList.remove('text-white');
          icon.classList.add('text-gray-600');
        }
      });

      button.classList.add('bg-gray-900', 'text-white');
      button.classList.remove('text-gray-600', 'hover:text-black');

      const span = button.querySelector('.number');
      if (span) {
        span.classList.remove('bg-green-500/15', 'text-green-500');
        span.classList.add('bg-gray-700', 'text-white');
      }

      const icon = button.querySelector('.icon');
      if (icon) {
        icon.classList.remove('text-gray-600');
        icon.classList.add('text-white');
      }
    });
  });

  // Initialize Services Modal
  const servicesModal = document.getElementById('servicesModal');
  const openServicesBtn = document.getElementById('openServicesModal');
  const closeServicesBtn = document.getElementById('closeServicesModal');

  if (openServicesBtn && servicesModal && closeServicesBtn) {
    openServicesBtn.addEventListener('click', () => {
      servicesModal.classList.remove('hidden');
      servicesModal.classList.add('flex');
    });

    closeServicesBtn.addEventListener('click', () => {
      servicesModal.classList.add('hidden');
      servicesModal.classList.remove('flex');
    });

    servicesModal.addEventListener('click', (e) => {
      if (e.target === servicesModal) {
        servicesModal.classList.add('hidden');
        servicesModal.classList.remove('flex');
      }
    });
  }

  // Initialize Invoice Modal
  const invoiceModal = document.getElementById('invoiceModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeBottomBtn = document.getElementById('closeBottomBtn');

  if (openModalBtn && invoiceModal) {
    openModalBtn.addEventListener('click', () => {
      invoiceModal.classList.remove('hidden');
      invoiceModal.classList.add('flex');
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        invoiceModal.classList.remove('flex');
        invoiceModal.classList.add('hidden');
      });
    }

    if (closeBottomBtn) {
      closeBottomBtn.addEventListener('click', () => {
        invoiceModal.classList.remove('flex');
        invoiceModal.classList.add('hidden');
      });
    }

    invoiceModal.addEventListener('click', (e) => {
      if (e.target === invoiceModal) {
        invoiceModal.classList.remove('flex');
        invoiceModal.classList.add('hidden');
      }
    });
  }

  // Date input focus (if exists)
  const dateButton = document.querySelector('button[data-date-trigger]');
  const dateInput = document.querySelector('input[type="date"]');
  
  if (dateButton && dateInput) {
    dateButton.addEventListener('click', () => {
      dateInput.focus();
    });
  }
});

// =============================
// Language Dropdown Functionality
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById('lang-dropdown-btn');
  const langMenu = document.getElementById('lang-dropdown-menu');
  const selectedLang = document.getElementById('selected-lang');

  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('hidden');
    });

    langMenu.querySelectorAll('button[data-lang]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        if (selectedLang) selectedLang.textContent = lang;
        langMenu.classList.add('hidden');
        // Optionally: trigger language change logic here
      });
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!langMenu.classList.contains('hidden')) {
        langMenu.classList.add('hidden');
      }
    });
  }
});

console.log('✅ Index.js loaded successfully');
