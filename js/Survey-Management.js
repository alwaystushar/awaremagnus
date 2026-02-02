// Survey Management table logic
// Provides filtering, search, and pagination for survey management

const surveyData = [
  {
    id: 1,
    moduleName: "Physical Security",
    submitted: 6,
    issued: "21/5/2025",
    deadline: "21/5/2025",
    completed: 70
  },
  {
    id: 2,
    moduleName: "Cyber Security",
    submitted: 8,
    issued: "15/5/2025",
    deadline: "28/5/2025",
    completed: 85
  },
  {
    id: 3,
    moduleName: "Data Privacy",
    submitted: 5,
    issued: "10/5/2025",
    deadline: "25/5/2025",
    completed: 65
  },
  {
    id: 4,
    moduleName: "Network Security",
    submitted: 9,
    issued: "1/5/2025",
    deadline: "20/5/2025",
    completed: 92
  },
  {
    id: 5,
    moduleName: "Cloud Security",
    submitted: 4,
    issued: "22/5/2025",
    deadline: "5/6/2025",
    completed: 45
  },
  {
    id: 6,
    moduleName: "GDPR Compliance",
    submitted: 7,
    issued: "12/5/2025",
    deadline: "30/5/2025",
    completed: 78
  },
  {
    id: 7,
    moduleName: "Password Management",
    submitted: 10,
    issued: "5/5/2025",
    deadline: "22/5/2025",
    completed: 88
  },
  {
    id: 8,
    moduleName: "Email Security",
    submitted: 6,
    issued: "18/5/2025",
    deadline: "2/6/2025",
    completed: 55
  },
  {
    id: 9,
    moduleName: "Social Engineering",
    submitted: 5,
    issued: "20/5/2025",
    deadline: "3/6/2025",
    completed: 50
  },
  {
    id: 10,
    moduleName: "ISO 27001",
    submitted: 8,
    issued: "8/5/2025",
    deadline: "25/5/2025",
    completed: 80
  }
];

let currentPage = 1;
const rowsPerPage = 8;
let currentSearch = '';
let currentLanguage = 'en';
let currentSortColumn = 'moduleName';
let currentSortDirection = 'asc';

const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
const languageFilter = document.getElementById('languageFilter');
const paginationInfo = document.getElementById('paginationInfo');
const paginationButtons = document.getElementById('paginationButtons');
const emptyState = document.getElementById('emptyState');

// Helper functions
function getCompletionColor(percentage) {
  if (percentage >= 80) return 'bg-green-400';
  if (percentage >= 60) return 'bg-blue-400';
  return 'bg-orange-400';
}

function renderProgressBar(percentage) {
  return `
    <div class="flex items-center gap-2">
      <div class="w-24 bg-gray-200 rounded-full h-2">
        <div class="${getCompletionColor(percentage)} h-2 rounded-full" style="width: ${percentage}%"></div>
      </div>
      <span class="text-xs font-medium text-gray-700">${percentage}%</span>
    </div>
  `;
}

function renderActionButton() {
  return `
    <button class="table-btn--primary table-btn">
      <i data-lucide="eye" class="w-3.5 h-3.5"></i>
      View
    </button>
  `;
}

function sortData(data) {
  const sorted = [...data].sort((a, b) => {
    let aVal = a[currentSortColumn];
    let bVal = b[currentSortColumn];

    // Handle numeric values
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return currentSortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // Handle string values
    aVal = String(aVal).toLowerCase();
    bVal = String(bVal).toLowerCase();
    if (currentSortDirection === 'asc') {
      return aVal.localeCompare(bVal);
    } else {
      return bVal.localeCompare(aVal);
    }
  });
  return sorted;
}

function sortTable(column) {
  if (currentSortColumn === column) {
    currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    currentSortColumn = column;
    currentSortDirection = 'asc';
  }
  
  updateSortIcons();
  render();
}

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

function getFilteredData() {
  let filtered = [...surveyData];

  if (currentSearch) {
    filtered = filtered.filter(item =>
      item.moduleName.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }

  return sortData(filtered);
}

function renderTable(pageData) {
  tableBody.innerHTML = pageData.map(item => `
    <tr class="hover:bg-gray-50 transition-colors border-b border-gray-100">
      <td class="px-6 py-3.5">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <i data-lucide="book-open" class="w-4 h-4 text-blue-600"></i>
          </div>
          <span class="text-xs font-medium text-gray-700">${item.moduleName}</span>
        </div>
      </td>
      <td class="px-6 py-3.5 text-xs text-gray-600">${item.submitted}</td>
      <td class="px-6 py-3.5 text-xs text-gray-600">${item.issued}</td>
      <td class="px-6 py-3.5 text-xs text-gray-600">${item.deadline}</td>
      <td class="px-6 py-3.5">${renderProgressBar(item.completed)}</td>
      <td class="px-6 py-3.5">${renderActionButton()}</td>
    </tr>
  `).join('');
}

function renderPagination(totalPages, total, start, end) {
  if (totalPages <= 1) {
    paginationButtons.innerHTML = '';
  } else {
    let buttons = '';
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}><i data-lucide="chevron-left" class="w-4 h-4"></i></button>`;

    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

    if (startPage > 1) {
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changePage(1)">1</button>`;
      if (startPage > 2) buttons += `<span class="px-2 text-gray-400"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border rounded-full text-xs transition-all ${i === currentPage ? 'bg-blue-50 text-blue-600 border-blue-500 font-semibold' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}" onclick="changePage(${i})">${i}</button>`;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons += `<span class="px-2 text-gray-400"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changePage(${totalPages})">${totalPages}</button>`;
    }

    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}><i data-lucide="chevron-right" class="w-4 h-4"></i></button>`;
    paginationButtons.innerHTML = buttons;
  }

  paginationInfo.innerHTML = `<span>Showing ${start + 1}–${end} out of ${total} Entries</span>`;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function render() {
  const filtered = getFilteredData();
  const total = filtered.length;
  const totalPages = Math.ceil(total / rowsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, total);
  const pageData = filtered.slice(start, end);

  if (total === 0) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('hidden');
    paginationButtons.innerHTML = '';
    paginationInfo.innerHTML = '<span>No surveys found</span>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  emptyState.classList.add('hidden');
  renderTable(pageData);
  renderPagination(totalPages, total, start, end);
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function changePage(page) {
  const totalPages = Math.ceil(getFilteredData().length / rowsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  render();
  const container = document.querySelector('.overflow-y-auto');
  if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
}

if (searchInput) {
  searchInput.addEventListener('input', e => {
    currentSearch = e.target.value;
    currentPage = 1;
    render();
  });
}

if (languageFilter) {
  languageFilter.addEventListener('change', e => {
    currentLanguage = e.target.value;
    currentPage = 1;
    render();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  
  // Add click handlers to sortable headers
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const column = th.getAttribute('data-sort');
      sortTable(column);
    });
    th.style.cursor = 'pointer';
    th.style.userSelect = 'none';
  });
  
  render();
  updateSortIcons();
  console.log('✅ Survey Management table initialized');
});

window.changePage = changePage;
window.sortTable = sortTable;