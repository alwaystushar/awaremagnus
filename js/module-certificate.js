// Sample Certificate Data
const allCertificates = [
  { 
    id: 1, 
    name: "Physical Security", 
    description: "Physical security involves using physical and procedural measures to protect people.",
    thumbnail: "images/card.png",
    category: "Security"
  },
  { 
    id: 2, 
    name: "Cyber Security Basics", 
    description: "Learn the fundamentals of cyber security and protect your digital assets.",
    thumbnail: "images/card.png",
    category: "Security"
  },
  { 
    id: 3, 
    name: "Data Privacy Training", 
    description: "Understanding data privacy regulations and best practices for data protection.",
    thumbnail: "images/card.png",
    category: "Compliance"
  },
  { 
    id: 4, 
    name: "Network Security", 
    description: "Comprehensive training on network security protocols and threat prevention.",
    thumbnail: "images/card.png",
    category: "Security"
  },
  { 
    id: 5, 
    name: "Cloud Security", 
    description: "Secure your cloud infrastructure with industry best practices and tools.",
    thumbnail: "images/card.png",
    category: "Security"
  },
  { 
    id: 6, 
    name: "GDPR Compliance", 
    description: "Complete guide to GDPR compliance and data protection regulations.",
    thumbnail: "images/card.png",
    category: "Compliance"
  },
  { 
    id: 7, 
    name: "Password Management", 
    description: "Best practices for creating and managing secure passwords.",
    thumbnail: "images/card.png",
    category: "Security"
  },
  { 
    id: 8, 
    name: "Email Security", 
    description: "Protect against phishing attacks and email-based threats.",
    thumbnail: "images/card.png",
    category: "Security"
  },
  { 
    id: 9, 
    name: "Social Engineering", 
    description: "Recognize and defend against social engineering tactics.",
    thumbnail: "images/card.png",
    category: "Security"
  },
  { 
    id: 10, 
    name: "ISO 27001 Training", 
    description: "Information security management systems according to ISO 27001.",
    thumbnail: "images/card.png",
    category: "Compliance"
  }
];

// State Management
let currentSearch = '';
let currentSortColumn = 'name';
let currentSortDirection = 'asc';
let currentPage = 1;
const itemsPerPage = 8;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const gridView = document.getElementById('gridView');
const tableBody = document.getElementById('tableBody');
const emptyState = document.getElementById('emptyState');
const paginationInfo = document.getElementById('paginationInfo');
const paginationButtons = document.getElementById('paginationButtons');

// Get Filtered & Sorted Data
function getFilteredData() {
  let filtered = [...allCertificates];
  
  // Apply search filter
  if (currentSearch) {
    filtered = filtered.filter(cert => 
      cert.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
      cert.description.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }
  
  // Apply sorting
  filtered.sort((a, b) => {
    let valA, valB;
    
    if (currentSortColumn === 'name') {
      valA = a.name.toLowerCase();
      valB = b.name.toLowerCase();
    } else if (currentSortColumn === 'description') {
      valA = a.description.toLowerCase();
      valB = b.description.toLowerCase();
    }
    
    if (valA < valB) return currentSortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return currentSortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  return filtered;
}

// Sort Table Function
function sortTable(column) {
  if (currentSortColumn === column) {
    // Toggle direction
    currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    currentSortColumn = column;
    currentSortDirection = 'asc';
  }
  
  updateSortIcons();
  renderViews();
}

// Update Sort Icons
function updateSortIcons() {
  document.querySelectorAll('th[data-sort]').forEach(th => {
    const sortIcon = th.querySelector('.sort-icon');
    const column = th.dataset.sort;
    
    if (column === currentSortColumn) {
      if (currentSortDirection === 'asc') {
        sortIcon.innerHTML = '<i data-lucide="chevron-up" class="w-3.5 h-3.5"></i>';
      } else {
        sortIcon.innerHTML = '<i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>';
      }
      sortIcon.classList.remove('text-gray-400');
      sortIcon.classList.add('text-blue-600');
    } else {
      sortIcon.innerHTML = '<i data-lucide="chevrons-up-down" class="w-3.5 h-3.5"></i>';
      sortIcon.classList.remove('text-blue-600');
      sortIcon.classList.add('text-gray-400');
    }
  });
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Make sortTable globally accessible
window.sortTable = sortTable;

// Pagination Functions
function changePage(page) {
  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderViews();
  const container = document.querySelector('.overflow-y-auto');
  if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPagination() {
  const filteredData = getFilteredData();
  const total = filteredData.length;
  const totalPages = Math.ceil(total / itemsPerPage) || 1;
  
  if (!paginationInfo || !paginationButtons) return;
  
  // Update info text
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, total);
  paginationInfo.innerHTML = `<span>Showing ${startIndex + 1}–${endIndex} out of ${total} Entries</span>`;
  
  // Generate pagination buttons
  if (totalPages <= 1) {
    paginationButtons.innerHTML = '';
  } else {
    let buttons = '';
    
    // Previous button
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}><i data-lucide="chevron-left" class="w-4 h-4"></i></button>`;
    
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);
    
    if (startPage > 1) {
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changePage(1)">1</button>`;
      if (startPage > 2) buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
    }
    
    for (let i = startPage; i <= endPage; i++) {
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border rounded-full text-xs transition-all ${
        i === currentPage
          ? 'bg-blue-50 text-blue-600 border-blue-500 font-semibold'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
      }" onclick="changePage(${i})">${i}</button>`;
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changePage(${totalPages})">${totalPages}</button>`;
    }
    
    // Next button
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}><i data-lucide="chevron-right" class="w-4 h-4"></i></button>`;
    
    paginationButtons.innerHTML = buttons;
  }
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Make changePage globally accessible
window.changePage = changePage;

// Render Grid View
function renderGridView(data) {
  if (data.length === 0) {
    gridView.innerHTML = '';
    if (!document.getElementById('gridView').classList.contains('hidden')) {
      showEmptyState();
    }
    return;
  }
  
  hideEmptyState();
  
  // Paginate data for grid view
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  
  gridView.innerHTML = paginatedData.map(cert => `
    <div class="bg-white rounded-2xl p-3 border border-gray-100 hover:border-blue-400 transition duration-300 cursor-pointer">
      <div class="bg-gradient-to-b from-sky-200 to-sky-400 rounded-xl h-40 flex items-center justify-center mb-3 overflow-hidden">
        <img src="${cert.thumbnail}" alt="${cert.name}" class="w-full h-full object-cover" />
      </div>
      <h3 class="text-sm font-semibold text-gray-900 mb-1">
        ${cert.name}
      </h3>
      <p class="text-[11px] text-gray-400 leading-relaxed">
        ${cert.description}
      </p>

      <button class="border border-gray-500 rounded-lg text-xs px-4 py-1 mt-4 flex items-center gap-1.5">
        <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
        Edit
      </button>
    </div>
  `).join('');
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Render Table View
function renderTableView(data) {
  if (data.length === 0) {
    tableBody.innerHTML = '';
    if (!document.getElementById('tableView').classList.contains('hidden')) {
      showEmptyState();
    }
    return;
  }
  
  hideEmptyState();
  
  // Paginate data for table view
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  
  tableBody.innerHTML = paginatedData.map(cert => `
    <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-4 py-3.5">
        <div class="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-b from-sky-200 to-sky-400 flex items-center justify-center">
          <img src="${cert.thumbnail}" alt="${cert.name}" class="w-full h-full object-cover" />
        </div>
      </td>
      <td class="px-4 py-3.5">
        <span class="font-semibold text-gray-900">${cert.name}</span>
      </td>
      <td class="px-4 py-3.5">
        <span class="text-gray-600">${cert.description}</span>
      </td>
      <td class="px-4 py-3.5 text-center">
        <button class="inline-flex items-center gap-1.5 border border-gray-500 rounded-lg text-xs px-4 py-1.5 hover:bg-gray-50 transition">
          <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
          Edit
        </button>
      </td>
    </tr>
  `).join('');
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Show Empty State
function showEmptyState() {
  if (emptyState) {
    emptyState.classList.remove('hidden');
  }
}

// Hide Empty State
function hideEmptyState() {
  if (emptyState) {
    emptyState.classList.add('hidden');
  }
}

// Render Both Views
function renderViews() {
  const filteredData = getFilteredData();
  renderGridView(filteredData);
  renderTableView(filteredData);
  renderPagination();
}

// Search Input Event Listener
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    currentPage = 1; // Reset to first page on search
    renderViews();
  });
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
  renderViews();
  updateSortIcons();
});
