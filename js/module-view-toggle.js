// Module View Toggle Functionality
// Handles switching between Grid and Table views with sliding indicator

document.addEventListener('DOMContentLoaded', () => {
  const gridViewBtn = document.getElementById('gridViewBtn');
  const tableViewBtn = document.getElementById('tableViewBtn');
  const gridView = document.getElementById('gridView');
  const tableView = document.getElementById('tableView');
  const viewIndicator = document.getElementById('viewIndicator');

  if (!gridViewBtn || !tableViewBtn || !gridView || !tableView) {
    console.error('View toggle elements not found');
    return;
  }

  // Move view indicator
  function moveViewIndicator(activeBtn) {
    if (!viewIndicator || !activeBtn) return;
    viewIndicator.style.left = `${activeBtn.offsetLeft}px`;
    viewIndicator.style.width = `${activeBtn.offsetWidth}px`;
  }

  // Initialize view indicator position
  function initViewIndicator() {
    const activeBtn = gridViewBtn;
    if (activeBtn && viewIndicator) {
      viewIndicator.style.transition = 'none';
      moveViewIndicator(activeBtn);
      viewIndicator.offsetHeight; // Force reflow
      viewIndicator.style.transition = 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  }

  // Switch to Grid View
  function showGridView() {
    gridViewBtn.classList.add('text-white');
    gridViewBtn.classList.remove('text-gray-700');
    tableViewBtn.classList.remove('text-white');
    tableViewBtn.classList.add('text-gray-700');
    moveViewIndicator(gridViewBtn);
    
    gridView.classList.remove('hidden');
    tableView.classList.add('hidden');
    
    // Refresh Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    // Store preference in localStorage
    localStorage.setItem('moduleView', 'grid');
  }

  // Switch to Table View
  function showTableView() {
    tableViewBtn.classList.add('text-white');
    tableViewBtn.classList.remove('text-gray-700');
    gridViewBtn.classList.remove('text-white');
    gridViewBtn.classList.add('text-gray-700');
    moveViewIndicator(tableViewBtn);
    
    tableView.classList.remove('hidden');
    gridView.classList.add('hidden');
    
    // Refresh Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    // Store preference in localStorage
    localStorage.setItem('moduleView', 'table');
  }

  // Event Listeners
  gridViewBtn.addEventListener('click', showGridView);
  tableViewBtn.addEventListener('click', showTableView);

  // Restore saved view preference
  const savedView = localStorage.getItem('moduleView');
  if (savedView === 'table') {
    showTableView();
  } else {
    // Initialize Grid View as default
    gridViewBtn.classList.add('text-white');
    gridViewBtn.classList.remove('text-gray-700');
    tableViewBtn.classList.remove('text-white');
    tableViewBtn.classList.add('text-gray-700');
    
    gridView.classList.remove('hidden');
    tableView.classList.add('hidden');
  }

  // Initialize indicator position
  initViewIndicator();

  // Handle window resize
  window.addEventListener('resize', () => {
    const activeBtn = gridViewBtn.classList.contains('text-white') ? gridViewBtn : tableViewBtn;
    if (activeBtn) moveViewIndicator(activeBtn);
  });

  console.log('✅ Module View Toggle initialized');
});
