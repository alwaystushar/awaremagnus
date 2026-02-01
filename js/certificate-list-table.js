// Certificate list table with search, language filter, sorting, pagination
// Uses dropdown-component.js for the language select

const certListData = [
  { id: 1, name: "English Certificate", language: "English", languageCode: "en", topLogo: "images/img-frame.svg", watermark: "", border: "" },
  { id: 2, name: "Arabic Certificate", language: "Arabic", languageCode: "sa", topLogo: "", watermark: "images/img-frame.svg", border: "" },
  { id: 3, name: "French Certificate", language: "French", languageCode: "fr", topLogo: "", watermark: "", border: "images/img-frame.svg" },
  { id: 4, name: "Spanish Certificate", language: "Spanish", languageCode: "es", topLogo: "images/img-frame.svg", watermark: "", border: "images/img-frame.svg" },
  { id: 5, name: "Security Awareness", language: "English", languageCode: "en", topLogo: "", watermark: "", border: "" },
  { id: 6, name: "Cloud Safety", language: "English", languageCode: "en", topLogo: "images/img-frame.svg", watermark: "images/img-frame.svg", border: "" },
  { id: 7, name: "Network Defense", language: "French", languageCode: "fr", topLogo: "", watermark: "images/img-frame.svg", border: "images/img-frame.svg" },
  { id: 8, name: "Endpoint Shield", language: "Arabic", languageCode: "sa", topLogo: "", watermark: "", border: "" },
  { id: 9, name: "Data Privacy", language: "Spanish", languageCode: "es", topLogo: "images/img-frame.svg", watermark: "", border: "" },
  { id: 10, name: "Phishing Defense", language: "English", languageCode: "en", topLogo: "", watermark: "", border: "images/img-frame.svg" },
  { id: 11, name: "Password Hygiene", language: "French", languageCode: "fr", topLogo: "images/img-frame.svg", watermark: "", border: "" },
  { id: 12, name: "Remote Work", language: "Arabic", languageCode: "sa", topLogo: "", watermark: "images/img-frame.svg", border: "images/img-frame.svg" }
];

let certListCurrentPage = 1;
const certListRowsPerPage = 8;
let certListSearch = '';
let certListLanguage = 'all';
let certListSortColumn = null;
let certListSortDirection = 'asc';

const certListTableBody = document.getElementById('certificateTableBody');
const certListSearchInput = document.getElementById('certListSearch');
const certListLanguageSelect = document.getElementById('certListLanguage');
const certListPaginationInfo = document.getElementById('certPaginationInfo');
const certListPaginationButtons = document.getElementById('certPaginationButtons');
const certListEmptyState = document.getElementById('certificateEmptyState');

function certListFlag(languageCode) {
  const flags = {
    en: 'images/eng.png',
    sa: 'images/eng.png',
    fr: 'images/eng.png',
    es: 'images/eng.png'
  };
  const src = flags[languageCode] || 'images/eng.png';
  return `<img src="${src}" alt="flag" class="w-4 h-4 rounded-full">`;
}

function certListImageCell(src) {
  if (src) {
    return `<div class="w-10 h-10   rounded-md overflow-hidden bg-gray-50 flex items-center justify-center"><img src="${src}" alt="asset" class="w-full h-full object-cover"></div>`;
  }
  return `<div class="w-10 h-10 border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50 text-gray-400"><i data-lucide="image" class="w-4 h-4"></i></div>`;
}

function certListFilteredData() {
  let data = [...certListData];
  if (certListLanguage !== 'all') {
    data = data.filter(item => item.language === certListLanguage);
  }
  if (certListSearch) {
    const q = certListSearch.toLowerCase();
    data = data.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.language.toLowerCase().includes(q)
    );
  }
  if (certListSortColumn) {
    data.sort((a, b) => {
      let valA = a[certListSortColumn].toLowerCase();
      let valB = b[certListSortColumn].toLowerCase();
      if (valA < valB) return certListSortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return certListSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return data;
}

function sortCertificateList(column) {
  if (certListSortColumn === column) {
    certListSortDirection = certListSortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    certListSortColumn = column;
    certListSortDirection = 'asc';
  }
  certListUpdateSortIcons();
  certListCurrentPage = 1;
  certListRender();
}

function certListUpdateSortIcons() {
  document.querySelectorAll('th[data-sort]').forEach(th => {
    const icon = th.querySelector('.sort-icon');
    const column = th.dataset.sort;
    if (column === certListSortColumn) {
      icon.innerHTML = certListSortDirection === 'asc'
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

function certListRender() {
  const data = certListFilteredData();
  const total = data.length;
  const totalPages = Math.ceil(total / certListRowsPerPage) || 1;
  if (certListCurrentPage > totalPages) certListCurrentPage = totalPages;
  const start = (certListCurrentPage - 1) * certListRowsPerPage;
  const end = Math.min(start + certListRowsPerPage, total);
  const pageData = data.slice(start, end);

  if (total === 0) {
    certListTableBody.innerHTML = '';
    certListEmptyState.classList.remove('hidden');
    certListPaginationInfo.innerHTML = '<span>No entries found</span>';
    certListPaginationButtons.innerHTML = '';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }
  certListEmptyState.classList.add('hidden');

  certListTableBody.innerHTML = pageData.map(item => `
    <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-4 py-3.5 font-medium text-gray-700">${item.name}</td>
      <td class="px-4 py-3.5 text-gray-700">
        <div class="flex items-center gap-2 text-xs">
          ${certListFlag(item.languageCode)}
          <span class="font-medium">${item.language}</span>
        </div>
      </td>
      <td class="px-4 py-3.5">${certListImageCell(item.topLogo)}</td>
      <td class="px-4 py-3.5">${certListImageCell(item.watermark)}</td>
      <td class="px-4 py-3.5">${certListImageCell(item.border)}</td>
      <td class="px-4 py-3.5">
        <div class="flex items-center">
          <button class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 " title="View"><i data-lucide="eye" class="w-4 h-4"></i></button>
          <button class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 " title="Edit"><i data-lucide="pencil" class="w-4 h-4"></i></button>
          <button class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-rose-50 text-rose-600" title="Delete"><i data-lucide="trash" class="w-4 h-4"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();

  certListPaginationInfo.innerHTML = `<span>Showing ${start + 1}–${end} out of ${total} Entries</span>`;
  certListRenderPagination(totalPages);
}

function certListRenderPagination(totalPages) {
  if (totalPages <= 1) {
    certListPaginationButtons.innerHTML = '';
    return;
  }
  let buttons = '';
  buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changeCertListPage(${certListCurrentPage - 1})" ${certListCurrentPage === 1 ? 'disabled' : ''}><i data-lucide="chevron-left" class="w-4 h-4"></i></button>`;

  const maxVisible = 5;
  let startPage = Math.max(1, certListCurrentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

  if (startPage > 1) {
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changeCertListPage(1)">1</button>`;
    if (startPage > 2) buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide=\"more-horizontal\" class=\"w-4 h-4\"></i></span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border rounded-full text-xs transition-all ${i === certListCurrentPage ? 'bg-blue-50 text-blue-600 border-blue-500 font-semibold' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}" onclick="changeCertListPage(${i})">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide=\"more-horizontal\" class=\"w-4 h-4\"></i></span>`;
    }
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changeCertListPage(${totalPages})">${totalPages}</button>`;
  }

  buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changeCertListPage(${certListCurrentPage + 1})" ${certListCurrentPage === totalPages ? 'disabled' : ''}><i data-lucide="chevron-right" class="w-4 h-4"></i></button>`;
  certListPaginationButtons.innerHTML = buttons;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function changeCertListPage(page) {
  const totalPages = Math.ceil(certListFilteredData().length / certListRowsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  certListCurrentPage = page;
  certListRender();
  const tableContainer = document.querySelector('#certificateTableBody')?.closest('.overflow-y-auto');
  if (tableContainer) tableContainer.scrollTo({ top: 0, behavior: 'smooth' });
}

if (certListSearchInput) {
  certListSearchInput.addEventListener('input', e => {
    certListSearch = e.target.value;
    certListCurrentPage = 1;
    certListRender();
  });
}

if (certListLanguageSelect) {
  certListLanguageSelect.addEventListener('change', e => {
    certListLanguage = e.target.value;
    certListCurrentPage = 1;
    certListRender();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  certListRender();
  window.addEventListener('resize', () => {
    // keep layout responsive; no extra logic needed
  });
  console.log('✅ Certificate list table initialized');
});

window.changeCertListPage = changeCertListPage;
window.sortCertificateList = sortCertificateList;
