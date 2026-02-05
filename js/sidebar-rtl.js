/**
 * ================================================
 * SIDEBAR-RTL.JS - RTL SIDEBAR SUPPORT
 * ================================================
 * Enhanced sidebar functionality with RTL language support
 * Handles menu toggling, animations, and right-to-left layouts
 */

/* ==============================================
   RTL SIDEBAR CONFIGURATION
============================================== */
const RTL_CONFIG = {
  // Animation durations in milliseconds
  animationDuration: 300,
  
  // Sidebar widths
  expandedWidth: '152px',
  collapsedWidth: '36px', // w-9 in Tailwind
  
  // Direction settings
  isRTL: document.documentElement.dir === 'rtl' || document.documentElement.getAttribute('lang') === 'ar',
  
  // Menu IDs
  primaryMenuId: 'primaryMenu',
  subMenuId: 'subMenu',
  flipIconId: 'flip',
  backdropId: 'sidebar-backdrop'
};

/* ==============================================
   UTILITY FUNCTIONS
============================================== */

/**
 * Safely get an element by ID with error handling
 * @param {string} id - Element ID
 * @returns {HTMLElement|null}
 */
function getElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID "${id}" not found`);
  }
  return element;
}

/**
 * Toggle element visibility with animation
 * @param {HTMLElement} element - Element to toggle
 * @param {boolean} show - Whether to show or hide
 */
function toggleVisibility(element, show) {
  if (!element) return;
  
  if (show) {
    element.classList.remove('hidden');
    element.classList.add('flex');
  } else {
    element.classList.remove('flex');
    element.classList.add('hidden');
  }
}

/**
 * Apply RTL-specific styles to an element
 * @param {HTMLElement} element - Target element
 */
function applyRTLStyles(element) {
  if (!element || !RTL_CONFIG.isRTL) return;
  
  // Ensure proper RTL direction
  element.style.direction = 'rtl';
  
  // Adjust border radius for RTL
  const borderRadius = element.style.borderRadius;
  if (borderRadius) {
    // Swap left/right border radius values
    element.style.borderRadius = borderRadius
      .replace(/(\d+)px\s+(\d+)px\s+(\d+)px\s+(\d+)px/, '$2px $1px $4px $3px');
  }
}

/* ==============================================
   MENU TOGGLE FUNCTIONS
============================================== */

/**
 * Toggle individual submenu (nested menus)
 * @param {string} menuId - Menu element ID
 * @param {HTMLElement} button - Button that triggered the toggle
 */
function toggleMenu(menuId, button) {
  const menu = getElement(menuId);
  
  if (menu) {
    const isHidden = menu.classList.contains('hidden');
    toggleVisibility(menu, isHidden);
    
    // Add smooth transition
    menu.style.transition = `all ${RTL_CONFIG.animationDuration}ms ease-in-out`;
  }
  
  if (button) {
    button.classList.toggle('open');
    
    // Rotate chevron icon for RTL
    const chevron = button.querySelector('span:last-child');
    if (chevron && RTL_CONFIG.isRTL) {
      // For RTL, rotate in opposite direction
      if (button.classList.contains('open')) {
        chevron.style.transform = 'rotate(-90deg)';
      } else {
        chevron.style.transform = 'rotate(0deg)';
      }
    }
  }
}

/**
 * Toggle between primary and sub menus (main sidebar toggle)
 */
function toggleMenus() {
  const primaryMenu = getElement(RTL_CONFIG.primaryMenuId);
  const subMenu = getElement(RTL_CONFIG.subMenuId);
  const icon = getElement(RTL_CONFIG.flipIconId);

  if (!primaryMenu || !subMenu) {
    console.error('Required menu elements not found');
    return;
  }

  const primaryText = primaryMenu.querySelectorAll('.menu-text');
  const subText = subMenu.querySelectorAll('.menu-text');

  // Check current state
  const isPrimaryCollapsed = primaryMenu.classList.contains('w-9');

  // Add transition for smooth animation
  primaryMenu.style.transition = `all ${RTL_CONFIG.animationDuration}ms ease-in-out`;
  subMenu.style.transition = `all ${RTL_CONFIG.animationDuration}ms ease-in-out`;

  if (isPrimaryCollapsed) {
    // Expand primary menu, collapse sub menu
    primaryMenu.classList.remove('w-9');
    primaryMenu.classList.add('w-[152px]');
    
    subMenu.classList.remove('w-[152px]');
    subMenu.classList.add('w-9');

    // Show/hide text with delay for smooth transition
    setTimeout(() => {
      primaryText.forEach(el => el.classList.remove('hidden'));
      subText.forEach(el => el.classList.add('hidden'));
    }, RTL_CONFIG.animationDuration / 2);

    // Flip icon for RTL
    if (icon) {
      if (RTL_CONFIG.isRTL) {
        icon.classList.remove('scale-x-[-1]');
      } else {
        icon.classList.add('scale-x-[-1]');
      }
    }
  } else {
    // Collapse primary menu, expand sub menu
    primaryMenu.classList.remove('w-[152px]');
    primaryMenu.classList.add('w-9');
    
    subMenu.classList.remove('w-9');
    subMenu.classList.add('w-[152px]');

    // Show/hide text immediately for collapse
    primaryText.forEach(el => el.classList.add('hidden'));
    
    setTimeout(() => {
      subText.forEach(el => el.classList.remove('hidden'));
    }, RTL_CONFIG.animationDuration / 2);

    // Flip icon for RTL
    if (icon) {
      if (RTL_CONFIG.isRTL) {
        icon.classList.add('scale-x-[-1]');
      } else {
        icon.classList.remove('scale-x-[-1]');
      }
    }
  }
}

/**
 * Toggle main menu (alternative toggle function)
 */
function toggleMainMenu() {
  const menu = getElement('mainMenu');
  const flipIcon = getElement(RTL_CONFIG.flipIconId);

  if (!menu) return;

  const menuTextElements = menu.querySelectorAll('.menu-text');

  // Toggle width classes
  menu.classList.toggle('w-[152px]');
  menu.classList.toggle('w-9');

  // Toggle text visibility
  menuTextElements.forEach(el => {
    el.classList.toggle('hidden');
  });

  // Toggle flip icon with RTL awareness
  if (flipIcon) {
    if (RTL_CONFIG.isRTL) {
      flipIcon.classList.toggle('scale-x-[1]');
      flipIcon.classList.toggle('scale-x-[-1]');
    } else {
      flipIcon.classList.toggle('scale-x-[-1]');
      flipIcon.classList.toggle('scale-x-[1]');
    }
  }
}

/* ==============================================
   MOBILE SIDEBAR FUNCTIONS
============================================== */

/**
 * Open mobile sidebar with backdrop
 */
function openMobileSidebar() {
  const primaryMenu = getElement(RTL_CONFIG.primaryMenuId);
  const backdrop = getElement(RTL_CONFIG.backdropId);
  
  if (primaryMenu) {
    primaryMenu.classList.add('mobile-open');
    
    // For RTL, slide from right instead of left
    if (RTL_CONFIG.isRTL) {
      primaryMenu.style.right = '0';
    } else {
      primaryMenu.style.left = '0';
    }
  }
  
  if (backdrop) {
    backdrop.classList.remove('hidden');
    backdrop.style.opacity = '0';
    setTimeout(() => {
      backdrop.style.transition = 'opacity 300ms ease-in-out';
      backdrop.style.opacity = '1';
    }, 10);
  }
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

/**
 * Close mobile sidebar
 */
function closeMobileSidebar() {
  const primaryMenu = getElement(RTL_CONFIG.primaryMenuId);
  const backdrop = getElement(RTL_CONFIG.backdropId);
  
  if (primaryMenu) {
    primaryMenu.classList.remove('mobile-open');
    
    // Reset position
    if (RTL_CONFIG.isRTL) {
      primaryMenu.style.right = '';
    } else {
      primaryMenu.style.left = '';
    }
  }
  
  if (backdrop) {
    backdrop.style.opacity = '0';
    setTimeout(() => {
      backdrop.classList.add('hidden');
    }, 300);
  }
  
  // Restore body scroll
  document.body.style.overflow = '';
}

/**
 * Toggle mobile sidebar
 */
function toggleMobileSidebar() {
  const primaryMenu = getElement(RTL_CONFIG.primaryMenuId);
  
  if (primaryMenu && primaryMenu.classList.contains('mobile-open')) {
    closeMobileSidebar();
  } else {
    openMobileSidebar();
  }
}

/* ==============================================
   RESPONSIVE BEHAVIOR
============================================== */

/**
 * Handle responsive sidebar behavior
 */
function handleResponsiveSidebar() {
  const primaryMenu = getElement(RTL_CONFIG.primaryMenuId);
  const subMenu = getElement(RTL_CONFIG.subMenuId);
  
  if (!primaryMenu || !subMenu) return;
  
  const isMobile = window.innerWidth < 1024; // lg breakpoint
  
  if (isMobile) {
    // On mobile, ensure sidebar is hidden by default
    closeMobileSidebar();
  } else {
    // On desktop, ensure proper state
    const primaryText = primaryMenu.querySelectorAll('.menu-text');
    const subText = subMenu.querySelectorAll('.menu-text');
    
    // Default: primary collapsed, sub expanded
    primaryMenu.classList.remove('mobile-open');
    primaryMenu.classList.remove('w-[152px]');
    primaryMenu.classList.add('w-9');
    
    subMenu.classList.remove('w-9');
    subMenu.classList.add('w-[152px]');
    
    primaryText.forEach(el => el.classList.add('hidden'));
    subText.forEach(el => el.classList.remove('hidden'));
    
    // Reset body scroll
    document.body.style.overflow = '';
  }
}

/* ==============================================
   ACTIVE MENU HIGHLIGHTING
============================================== */

/**
 * Highlight active menu item based on current page
 */
function highlightActiveMenu() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  // Find all menu links
  const menuLinks = document.querySelectorAll('#primaryMenu a, #subMenu a');
  
  menuLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    if (href && href.includes(currentPage)) {
      // Add active state
      link.classList.add('bg-white/10');
      
      // Add active indicator
      const indicator = document.createElement('div');
      indicator.className = 'absolute top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-[var(--teal)]';
      
      // Position based on RTL
      if (RTL_CONFIG.isRTL) {
        indicator.className += ' right-0 rounded-r-full';
        indicator.style.borderTopRightRadius = '9999px';
        indicator.style.borderBottomRightRadius = '9999px';
      } else {
        indicator.className += ' left-0 rounded-l-full';
        indicator.style.borderTopLeftRadius = '9999px';
        indicator.style.borderBottomLeftRadius = '9999px';
      }
      
      link.style.position = 'relative';
      link.insertBefore(indicator, link.firstChild);
    }
  });
}

/* ==============================================
   KEYBOARD NAVIGATION
============================================== */

/**
 * Handle keyboard navigation for accessibility
 */
function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Escape key to close mobile sidebar
    if (e.key === 'Escape') {
      closeMobileSidebar();
    }
    
    // Alt + M to toggle menu (desktop)
    if (e.altKey && e.key.toLowerCase() === 'm') {
      e.preventDefault();
      toggleMenus();
    }
  });
}

/* ==============================================
   SMOOTH SCROLL FOR MENU LINKS
============================================== */

/**
 * Add smooth scroll behavior to anchor links
 */
function initSmoothScroll() {
  const menuLinks = document.querySelectorAll('#primaryMenu a[href^="#"], #subMenu a[href^="#"]');
  
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Close mobile sidebar after navigation
          if (window.innerWidth < 1024) {
            closeMobileSidebar();
          }
        }
      }
    });
  });
}

/* ==============================================
   INITIALIZATION
============================================== */

/**
 * Initialize sidebar on DOM load
 */
function initSidebar() {
  console.log('Initializing RTL Sidebar...');
  console.log('RTL Mode:', RTL_CONFIG.isRTL ? 'Enabled' : 'Disabled');
  
  // Apply RTL styles to sidebar elements
  const primaryMenu = getElement(RTL_CONFIG.primaryMenuId);
  const subMenu = getElement(RTL_CONFIG.subMenuId);
  
  if (primaryMenu) applyRTLStyles(primaryMenu);
  if (subMenu) applyRTLStyles(subMenu);
  
  // Set initial state
  handleResponsiveSidebar();
  
  // Highlight active menu
  highlightActiveMenu();
  
  // Initialize keyboard navigation
  initKeyboardNavigation();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Handle backdrop clicks
  const backdrop = getElement(RTL_CONFIG.backdropId);
  if (backdrop) {
    backdrop.addEventListener('click', closeMobileSidebar);
  }
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResponsiveSidebar, 250);
  });
  
  console.log('RTL Sidebar initialized successfully');
}

/* ==============================================
   DOM READY
============================================== */

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebar);
} else {
  initSidebar();
}

/* ==============================================
   EXPOSE GLOBAL FUNCTIONS
============================================== */

// Make functions available globally for inline onclick handlers
window.toggleMenu = toggleMenu;
window.toggleMenus = toggleMenus;
window.toggleMainMenu = toggleMainMenu;
window.toggleMobileSidebar = toggleMobileSidebar;
window.openMobileSidebar = openMobileSidebar;
window.closeMobileSidebar = closeMobileSidebar;
