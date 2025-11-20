


    function toggleMenu(id, button) {
      const menu = document.getElementById(id);
      menu.classList.toggle('hidden');
      button.classList.toggle('open');
    }


    document.querySelectorAll('tbody tr').forEach(row => {
  const bar = row.querySelector('.bg-blue-500'); // Adjust selector per channel
  if(bar){
    bar.style.width = '0%';
    setTimeout(() => bar.style.width = '60%', 100); // 60% for example row
  }
});

document.querySelector('button').addEventListener('click', () => {
  document.querySelector('input[type="date"]').focus();
});



// SVG Icons for error and success toasts
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

  // Append the toast
  container.appendChild(toast);

  // Auto-remove toast after 3 seconds with a fade out
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













function toggleMenus() {
  const primaryMenu = document.getElementById('primaryMenu');
  const subMenu = document.getElementById('subMenu');
  const icon = document.getElementById('flip');

  const primaryText = primaryMenu.querySelectorAll('.menu-text');
  const subText = subMenu.querySelectorAll('.menu-text');

  const isPrimaryCollapsed = primaryMenu.classList.contains('w-12');

  if (isPrimaryCollapsed) {
    // Expand primary, collapse sub
    primaryMenu.classList.replace('w-12', 'w-44');
    subMenu.classList.replace('w-44', 'w-12');

    primaryText.forEach(el => el.classList.remove('hidden'));
    subText.forEach(el => el.classList.add('hidden'));

    icon.classList.add('scale-x-[-1]'); // reset icon direction
  } else {
    // Collapse primary, expand sub
    primaryMenu.classList.replace('w-44', 'w-12');
    subMenu.classList.replace('w-12', 'w-44');

    primaryText.forEach(el => el.classList.add('hidden'));
    subText.forEach(el => el.classList.remove('hidden'));

    icon.classList.remove('scale-x-[-1]'); // flip icon horizontally
  }
}

// Run on page load to collapse primary menu by default
document.addEventListener('DOMContentLoaded', () => {
  const primaryMenu = document.getElementById('primaryMenu');
  const subMenu = document.getElementById('subMenu');
  const icon = document.getElementById('flip');

  const primaryText = primaryMenu.querySelectorAll('.menu-text');
  const subText = subMenu.querySelectorAll('.menu-text');

  // Force initial state: primary collapsed, sub expanded
  primaryMenu.classList.remove('w-44');
  primaryMenu.classList.add('w-12');
  subMenu.classList.remove('w-12');
  subMenu.classList.add('w-44');

  primaryText.forEach(el => el.classList.add('hidden'));
  subText.forEach(el => el.classList.remove('hidden'));

  icon.classList.remove('scale-x-[-1]');
});





  function toggleMainMenu() {
    const menu = document.getElementById('mainMenu');
    const menuTextElements = menu.querySelectorAll('.menu-text');
    const flipIcon = document.getElementById('flip');

    menu.classList.toggle('w-44');
    menu.classList.toggle('w-12');

    menuTextElements.forEach(el => {
      el.classList.toggle('hidden');
    });

    flipIcon.classList.toggle('scale-x-[-1]');
    flipIcon.classList.toggle('scale-x-[1]');
  }

  function toggleMenu(menuId, btn) {
    const menu = document.getElementById(menuId);
    const isOpen = menu.classList.contains('flex');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
    btn.classList.toggle('open');
  }















    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (button.classList.contains('bg-gray-900')) return;

        buttons.forEach(btn => {
          btn.classList.remove('bg-gray-900', 'text-white');
          btn.classList.add('text-gray-600', 'hover:text-black');

          const span = btn.querySelector('.number');
          span.classList.remove('bg-gray-700', 'text-white');
          span.classList.add('bg-green-500/15', 'text-green-500');
        });

        button.classList.add('bg-gray-900', 'text-white');
        button.classList.remove('text-gray-600', 'hover:text-black');

        const span = button.querySelector('.number');
        span.classList.remove('bg-green-500/15', 'text-green-500');
        span.classList.add('bg-gray-700', 'text-white');
      });
    });


const btns = document.querySelectorAll('.filter-btn');

btns.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('bg-gray-900')) return;

    // Reset all buttons
    btns.forEach(btn => {
      btn.classList.remove('bg-gray-900', 'text-white');
      btn.classList.add('text-gray-600', 'hover:text-black');

      const icon = btn.querySelector('.icon');
      icon.classList.remove('text-white');
      icon.classList.add('text-gray-600'); // inactive icon color
    });

    // Activate clicked button
    button.classList.add('bg-gray-900', 'text-white');
    button.classList.remove('text-gray-600', 'hover:text-black');

    const icon = button.querySelector('.icon');
    icon.classList.remove('text-gray-600');
    icon.classList.add('text-white'); // active icon color (white)
  });
});


























document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('servicesModal');
  const openBtn = document.getElementById('openServicesModal');
  const closeBtn = document.getElementById('closeServicesModal');

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });

    // Close on clicking overlay
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }
});



  const modal = document.getElementById("invoiceModal");
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const closeBottomBtn = document.getElementById("closeBottomBtn");

  // Open Modal
  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });

  // Close Modal (top button & bottom button)
  [closeBtn, closeBottomBtn].forEach(btn =>
    btn.addEventListener("click", () => {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    })
  );