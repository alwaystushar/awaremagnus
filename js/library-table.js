// Library table with grid view, modeled after certificate-table.js
// Provides filtering by language, search, sorting, pagination, and view toggle.

const libraryItems = [
  {
    id: 1,
    title: "Screen Saver 1",
    description: "A simple clean screen saver",
    languageCode: "en",
    language: "English",
    updated: "2026-01-18",
    thumbnail: "images/img-frame.svg"
  },
  {
    id: 2,
    title: "Promo Intro Video",
    description: "Short promotional intro",
    languageCode: "en",
    language: "English",
    updated: "2026-02-04",
    thumbnail: "images/img-frame.svg"
  },
  {
    id: 3,
    title: "HR Announcement",
    description: "Company-wide HR update",
    languageCode: "ar",
    language: "Arabic",
    updated: "2025-12-20",
    thumbnail: "images/img-frame.svg"
  },
  {
    id: 4,
    title: "Daily Tips",
    description: "Short daily motivational message",
    languageCode: "fr",
    language: "French",
    updated: "2026-01-27",
    thumbnail: "images/img-frame.svg"
  },
  {
    id: 5,
    title: "Safety Guidelines",
    description: "Mandatory workplace safety rules",
    languageCode: "en",
    language: "English",
    updated: "2025-11-02",
    thumbnail: "images/img-frame.svg"
  },
  {
    id: 6,
    title: "Zero Trust Primer",
    description: "Foundational zero-trust walkthrough",
    languageCode: "en",
    language: "English",
    updated: "2026-02-10",
    thumbnail: "images/img-frame.svg"
  },
  {
    id: 7,
    title: "Phishing 101",
    description: "Spot and report basic phishing attempts",
    languageCode: "ar",
    language: "Arabic",
    updated: "2026-01-08",
    thumbnail: "images/img-frame.svg"
  },
  {
    id: 8,
    title: "Cloud Hygiene",
    description: "Baseline cloud security posture tips",
    languageCode: "fr",
    language: "French",
    updated: "2025-10-18",
    thumbnail: "images/img-frame.svg"
  },
  {
    id: 9,
    title: "Password Pro",
    description: "Create and manage strong passwords",
    languageCode: "en",
    language: "English",
    updated: "2026-01-12",
    thumbnail: "images/img-frame.svg"
  },
  {
    id: 10,
    title: "Mobile Safety",
    description: "Secure mobile work practices",
    languageCode: "ar",
    language: "Arabic",
    updated: "2026-02-01",
    thumbnail: "images/img-frame.svg"
  }
];

let libCurrentPage = 1;
const libRowsPerPage = 8;
let libCurrentSearch = '';
let libCurrentLanguage = 'all';
let libCurrentSortColumn = null;
let libCurrentSortDirection = 'asc';
let libViewMode = 'table';

const libTableBody = document.getElementById('tableBody');
const libSearchInput = document.getElementById('searchInput');
const libLanguageFilter = document.getElementById('languageFilter');
const libPaginationInfo = document.getElementById('paginationInfo');
const libPaginationButtons = document.getElementById('paginationButtons');
const libEmptyState = document.getElementById('emptyState');
const libGridWrapper = document.getElementById('gridWrapper');
const libTableWrapper = document.getElementById('libraryTable');
const libTableViewBtn = document.getElementById('tableViewBtn');
const libGridViewBtn = document.getElementById('gridViewBtn');

function libFormatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function libActionButtons() {
  return `
    <div class="inline-flex items-center">
      <button data-action="view" class="flex items-center gap-1 px-2 py-1.5  text-gray-700 text-[11px] ">
        <i data-lucide="eye" class="w-4 h-4"></i>
        
      </button>
      <button data-action="edit" class="flex items-center gap-1 px-2 py-1.5  text-gray-700 text-[11px] ">
        <i data-lucide="pencil" class="w-4 h-4"></i>
        
      </button>
    </div>
  `;
}

function libFlag(languageCode) {
  const flagClassMap = {
    en: 'fi-us',
    ar: 'fi-sa',
    fr: 'fi-fr'
  };
  const flagClass = flagClassMap[languageCode] || flagClassMap.en;
  return `<span class="w-4 h-4 rounded-full overflow-hidden   bg-white flex items-center justify-center"><span class="fi rounded-full w-8 h-8 ${flagClass}"></span></span>`;
}

function libLanguageChip(item) {
  return `<span class="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-gray-700 bg-white text-xs">${libFlag(item.languageCode)}<span>${item.language}</span></span>`;
}

function libFilteredData() {
  let filtered = [...libraryItems];

  if (libCurrentLanguage !== 'all') {
    filtered = filtered.filter(item => item.languageCode === libCurrentLanguage);
  }

  if (libCurrentSearch) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(libCurrentSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(libCurrentSearch.toLowerCase())
    );
  }

  if (libCurrentSortColumn) {
    filtered.sort((a, b) => {
      let valA;
      let valB;
      if (libCurrentSortColumn === 'title') {
        valA = a.title.toLowerCase();
        valB = b.title.toLowerCase();
      } else if (libCurrentSortColumn === 'language') {
        valA = a.language.toLowerCase();
        valB = b.language.toLowerCase();
      } else if (libCurrentSortColumn === 'updated') {
        valA = new Date(a.updated);
        valB = new Date(b.updated);
      }
      if (valA < valB) return libCurrentSortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return libCurrentSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filtered;
}

function sortLibrary(column) {
  if (libCurrentSortColumn === column) {
    libCurrentSortDirection = libCurrentSortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    libCurrentSortColumn = column;
    libCurrentSortDirection = 'asc';
  }
  libUpdateSortIcons();
  libCurrentPage = 1;
  libRender();
}

function libUpdateSortIcons() {
  document.querySelectorAll('th[data-sort]').forEach(th => {
    const icon = th.querySelector('.sort-icon');
    const column = th.dataset.sort;
    if (column === libCurrentSortColumn) {
      icon.innerHTML = libCurrentSortDirection === 'asc'
        ? '<i data-lucide="chevron-up" class="w-3.5 h-3.5"></i>'
        : '<i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>';
      icon.classList.remove('text-gray-400');
      icon.classList.add('text-blue-600');
    } else {
      icon.innerHTML = '<i data-lucide="chevrons-up-down" class="w-3.5 h-3.5"></i>';
      icon.classList.remove('text-blue-600');
      icon.classList.add('text-gray-400');
    }
  });
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function libRenderTable(pageData) {
  libTableBody.innerHTML = pageData.map(item => `
    <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-4 py-3.5 font-medium text-gray-700">${item.title}</td>
      <td class="px-4 py-3.5 text-gray-600">${item.description}</td>
      <td class="px-4 py-3.5 text-gray-700">
        ${libLanguageChip(item)}
      </td>
      <td class="px-4 py-3.5">
        <img src="images/card.png" alt="thumbnail" class="w-10 h-10 rounded-lg  object-cover">
      </td>
      <td class="px-4 py-3.5">${libActionButtons()}</td>
    </tr>
  `).join('');
}

function libRenderGrid(pageData) {
  libGridWrapper.innerHTML = pageData.map(item => `
    <div class="bg-white rounded-2xl p-3 border border-gray-100 hover:border-blue-400 transition duration-300 cursor-pointer">
      <div class="bg-gradient-to-b from-sky-200 to-sky-400 rounded-xl h-40 flex items-center justify-center mb-3 overflow-hidden">
        <img src="images/card.png" alt="${item.title}" class="w-full h-full object-cover" />
      </div>
      <h3 class="text-sm font-semibold text-gray-900 mb-1">
        ${item.title}
      </h3>
      <p class="text-[11px] text-gray-400 leading-relaxed mb-3">
        ${item.description}
      </p>
      
      <div class="flex items-center gap-2 mb-3">
        ${libLanguageChip(item)}
      </div>

      <div class="flex items-center gap-2">
        <button class="flex items-center gap-1.5 border border-sky-500 text-sky-500 rounded-full text-xs px-4 py-1 hover:bg-sky-50 transition-colors">
          <i data-lucide="eye" class="w-3.5 h-3.5"></i>
          View
        </button>
        <button class="flex items-center gap-1.5 border border-gray-500 rounded-full text-xs px-4 py-1 hover:bg-gray-100 transition-colors">
          <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
          Edit
        </button>
      </div>
    </div>
  `).join('');
}

function libRenderPagination(totalPages, total, start, end) {
  if (totalPages <= 1) {
    libPaginationButtons.innerHTML = '';
  } else {
    let buttons = '';
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changeLibraryPage(${libCurrentPage - 1})" ${libCurrentPage === 1 ? 'disabled' : ''}><i data-lucide="chevron-left" class="w-4 h-4"></i></button>`;

    const maxVisible = 5;
    let startPage = Math.max(1, libCurrentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

    if (startPage > 1) {
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changeLibraryPage(1)">1</button>`;
      if (startPage > 2) buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border rounded-full text-xs transition-all ${i === libCurrentPage ? 'bg-blue-50 text-blue-600 border-blue-500 font-semibold' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}" onclick="changeLibraryPage(${i})">${i}</button>`;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changeLibraryPage(${totalPages})">${totalPages}</button>`;
    }

    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changeLibraryPage(${libCurrentPage + 1})" ${libCurrentPage === totalPages ? 'disabled' : ''}><i data-lucide="chevron-right" class="w-4 h-4"></i></button>`;
    libPaginationButtons.innerHTML = buttons;
  }

  libPaginationInfo.innerHTML = `<span>Showing ${start + 1}–${end} out of ${total} Entries</span>`;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function libAttachActions() {
  document.querySelectorAll('[data-action="view"]').forEach(btn => {
    btn.onclick = () => window.location.href = 'physical-security.html';
  });
  document.querySelectorAll('[data-action="edit"]').forEach(btn => {
    btn.onclick = () => window.location.href = 'add-new-module-content.html';
  });
}

function libRender() {
  const filtered = libFilteredData();
  const total = filtered.length;
  const totalPages = Math.ceil(total / libRowsPerPage) || 1;
  if (libCurrentPage > totalPages) libCurrentPage = totalPages;
  const start = (libCurrentPage - 1) * libRowsPerPage;
  const end = Math.min(start + libRowsPerPage, total);
  const pageData = filtered.slice(start, end);

  if (total === 0) {
    libTableBody.innerHTML = '';
    libGridWrapper.innerHTML = '';
    libEmptyState.classList.remove('hidden');
    libPaginationButtons.innerHTML = '';
    libPaginationInfo.innerHTML = '<span>No entries found</span>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  libEmptyState.classList.add('hidden');

  if (libViewMode === 'table') {
    libTableWrapper.classList.remove('hidden');
    libGridWrapper.classList.add('hidden');
    libRenderTable(pageData);
  } else {
    libTableWrapper.classList.add('hidden');
    libGridWrapper.classList.remove('hidden');
    libRenderGrid(pageData);
  }

  libRenderPagination(totalPages, total, start, end);
  libAttachActions();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function changeLibraryPage(page) {
  const totalPages = Math.ceil(libFilteredData().length / libRowsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  libCurrentPage = page;
  libRender();
  const container = document.querySelector('.overflow-y-auto');
  if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
}

if (libSearchInput) {
  libSearchInput.addEventListener('input', e => {
    libCurrentSearch = e.target.value;
    libCurrentPage = 1;
    libRender();
  });
}

if (libLanguageFilter) {
  libLanguageFilter.addEventListener('change', e => {
    libCurrentLanguage = e.target.value;
    libCurrentPage = 1;
    libRender();
  });
}

function libMoveViewIndicator(activeBtn) {
  const indicator = document.getElementById('viewIndicator');
  if (!indicator || !activeBtn) return;
  indicator.style.left = `${activeBtn.offsetLeft}px`;
  indicator.style.width = `${activeBtn.offsetWidth}px`;
}

function libInitViewIndicator() {
  const activeBtn = libTableViewBtn;
  if (activeBtn) {
    const indicator = document.getElementById('viewIndicator');
    if (indicator) {
      indicator.style.transition = 'none';
      libMoveViewIndicator(activeBtn);
      indicator.offsetHeight;
      indicator.style.transition = 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  }
}

if (libTableViewBtn && libGridViewBtn) {
  libTableViewBtn.addEventListener('click', () => {
    libViewMode = 'table';
    libTableViewBtn.classList.add('text-white');
    libTableViewBtn.classList.remove('text-gray-700');
    libGridViewBtn.classList.remove('text-white');
    libGridViewBtn.classList.add('text-gray-700');
    libMoveViewIndicator(libTableViewBtn);
    libRender();
  });

  libGridViewBtn.addEventListener('click', () => {
    libViewMode = 'grid';
    libGridViewBtn.classList.add('text-white');
    libGridViewBtn.classList.remove('text-gray-700');
    libTableViewBtn.classList.remove('text-white');
    libTableViewBtn.classList.add('text-gray-700');
    libMoveViewIndicator(libGridViewBtn);
    libRender();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  libInitViewIndicator();
  libRender();
  window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.view-btn.active') || libTableViewBtn;
    if (activeBtn) libMoveViewIndicator(activeBtn);
  });
  console.log('✅ Library table with grid initialized');
});

window.sortLibrary = sortLibrary;
window.changeLibraryPage = changeLibraryPage;
