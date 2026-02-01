// Certificate table logic modeled after assignment-table.js
// Includes filtering, search, sorting, pagination, status badges, and dropdown filter integration.

const certificateData = [
  { id: 1, name: "Cyber Hygiene Completion", content: "Wifi Security", date: "2026-01-12", status: "active" },
  { id: 2, name: "Secure Email Basics", content: "Email Security", date: "2026-01-05", status: "active" },
  { id: 3, name: "Phishing Defense", content: "Phishing 101", date: "2025-12-22", status: "completed" },
  { id: 4, name: "Zero Trust Primer", content: "Zero Trust", date: "2025-12-15", status: "completed" },
  { id: 5, name: "Device Safety", content: "Endpoint Security", date: "2026-02-02", status: "pending" },
  { id: 6, name: "Cloud Ready", content: "Cloud Security", date: "2026-02-18", status: "pending" },
  { id: 7, name: "Password Pro", content: "Password Hygiene", date: "2025-11-10", status: "completed" },
  { id: 8, name: "API Shield", content: "API Security", date: "2026-01-28", status: "active" },
  { id: 9, name: "Ransomware Ready", content: "Ransomware", date: "2026-02-25", status: "pending" },
  { id: 10, name: "Data Privacy 101", content: "Privacy", date: "2025-10-30", status: "completed" },
  { id: 11, name: "Mobile Safe", content: "Mobile Security", date: "2026-01-30", status: "active" },
  { id: 12, name: "VPN Essentials", content: "Remote Work", date: "2026-01-18", status: "active" },
  { id: 13, name: "Secure Coding", content: "AppSec", date: "2025-09-18", status: "completed" },
  { id: 14, name: "Incident Basics", content: "IR Basics", date: "2026-02-10", status: "pending" },
  { id: 15, name: "Awareness Bronze", content: "General Awareness", date: "2025-08-12", status: "completed" },
  { id: 16, name: "Awareness Silver", content: "General Awareness", date: "2025-12-05", status: "completed" },
  { id: 17, name: "Awareness Gold", content: "General Awareness", date: "2026-02-20", status: "pending" },
  { id: 18, name: "Secure Collaboration", content: "Collaboration Tools", date: "2026-01-08", status: "active" },
  { id: 19, name: "Kubernetes Ready", content: "Kubernetes", date: "2025-11-22", status: "completed" },
  { id: 20, name: "SIEM Insights", content: "SIEM", date: "2026-03-01", status: "pending" }
];

// State
let certCurrentPage = 1;
const certRowsPerPage = 8;
let certCurrentStatus = 'all';
let certCurrentSearch = '';
let certCurrentDateFilter = 'all';
let certCurrentSortColumn = null;
let certCurrentSortDirection = 'asc';

// Elements
const certTableBody = document.getElementById('tableBody');
const certSearchInput = document.getElementById('searchInput');
const certDateFilter = document.getElementById('dateFilter');
const certPaginationInfo = document.getElementById('paginationInfo');
const certPaginationButtons = document.getElementById('paginationButtons');
const certEmptyState = document.getElementById('emptyState');
const certTabButtons = document.querySelectorAll('.tab-btn');

// Helpers
function certFormatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function certStatusBadge(status) {
  const badges = {
    active: { class: 'bg-green-50 text-green-700 border border-green-200', text: 'Active' },
    pending: { class: 'bg-amber-50 text-amber-700 border border-amber-200', text: 'Pending' },
    completed: { class: 'bg-gray-50 text-gray-700  ', text: 'Completed' }
  };
  const badge = badges[status] || badges.completed;
  return `<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${badge.class} text-[10px] font-semibold min-w-[96px] justify-center">${badge.text}</span>`;
}

function certActionButton(status) {
  return `<button class="flex items-center gap-2 border border-sky-500 text-sky-500 px-2 py-1.5 rounded-full text-[11px] text-xs hover:bg-sky-50">
    <i data-lucide="download" class="w-4 h-4"></i>
    <span>Download</span>
  </button>`;
}

function certFilterByDateRange(data) {
  if (certCurrentDateFilter === 'all') return data;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = parseInt(certCurrentDateFilter, 10);
  const cutoff = new Date(today);
  cutoff.setDate(today.getDate() - days);
  return data.filter(item => new Date(item.date) >= cutoff);
}

function certFilteredData() {
  let filtered = [...certificateData];
  if (certCurrentStatus !== 'all') {
    filtered = filtered.filter(c => c.status === certCurrentStatus);
  }
  if (certCurrentSearch) {
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(certCurrentSearch.toLowerCase()) ||
      c.content.toLowerCase().includes(certCurrentSearch.toLowerCase())
    );
  }
  filtered = certFilterByDateRange(filtered);

  if (certCurrentSortColumn) {
    filtered.sort((a, b) => {
      let valA;
      let valB;
      if (certCurrentSortColumn === 'name') {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else if (certCurrentSortColumn === 'content') {
        valA = a.content.toLowerCase();
        valB = b.content.toLowerCase();
      } else if (certCurrentSortColumn === 'date') {
        valA = new Date(a.date);
        valB = new Date(b.date);
      } else if (certCurrentSortColumn === 'status') {
        valA = a.status;
        valB = b.status;
      }
      if (valA < valB) return certCurrentSortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return certCurrentSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return filtered;
}

function sortCertificate(column) {
  if (certCurrentSortColumn === column) {
    certCurrentSortDirection = certCurrentSortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    certCurrentSortColumn = column;
    certCurrentSortDirection = 'asc';
  }
  certUpdateSortIcons();
  certCurrentPage = 1;
  certRenderTable();
}

function certUpdateSortIcons() {
  document.querySelectorAll('th[data-sort]').forEach(th => {
    const icon = th.querySelector('.sort-icon');
    const column = th.dataset.sort;
    if (column === certCurrentSortColumn) {
      icon.innerHTML = certCurrentSortDirection === 'asc'
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

function certRenderTable() {
  const data = certFilteredData();
  const total = data.length;
  const totalPages = Math.ceil(total / certRowsPerPage) || 1;
  if (certCurrentPage > totalPages) certCurrentPage = totalPages;
  const start = (certCurrentPage - 1) * certRowsPerPage;
  const end = Math.min(start + certRowsPerPage, total);
  const pageData = data.slice(start, end);

  if (total === 0) {
    certTableBody.innerHTML = '';
    certEmptyState.classList.remove('hidden');
    certPaginationInfo.innerHTML = '<span>No entries found</span>';
    certPaginationButtons.innerHTML = '';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }
  certEmptyState.classList.add('hidden');

  certTableBody.innerHTML = pageData.map(item => `
    <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-4 py-3.5 font-medium text-gray-700">${item.name}</td>
      <td class="px-4 py-3.5 text-gray-600">${item.content}</td>
      <td class="px-4 py-3.5 text-gray-600">${certFormatDate(item.date)}</td>
      <td class="px-4 py-3.5">${certStatusBadge(item.status)}</td>
      <td class="px-4 py-3.5">${certActionButton(item.status)}</td>
    </tr>
  `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();

  certPaginationInfo.innerHTML = `<span>Showing ${start + 1}–${end} out of ${total} Entries</span>`;
  certRenderPagination(totalPages);
  certUpdateTabCounts();
}

function certRenderPagination(totalPages) {
  if (totalPages <= 1) {
    certPaginationButtons.innerHTML = '';
    return;
  }
  let buttons = '';
  buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changeCertPage(${certCurrentPage - 1})" ${certCurrentPage === 1 ? 'disabled' : ''}><i data-lucide="chevron-left" class="w-4 h-4"></i></button>`;

  const maxVisible = 5;
  let startPage = Math.max(1, certCurrentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

  if (startPage > 1) {
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changeCertPage(1)">1</button>`;
    if (startPage > 2) buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border rounded-full text-xs transition-all ${i === certCurrentPage ? 'bg-blue-50 text-blue-600 border-blue-500 font-semibold' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}" onclick="changeCertPage(${i})">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
    }
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changeCertPage(${totalPages})">${totalPages}</button>`;
  }

  buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changeCertPage(${certCurrentPage + 1})" ${certCurrentPage === totalPages ? 'disabled' : ''}><i data-lucide="chevron-right" class="w-4 h-4"></i></button>`;
  certPaginationButtons.innerHTML = buttons;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function changeCertPage(page) {
  const totalPages = Math.ceil(certFilteredData().length / certRowsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  certCurrentPage = page;
  certRenderTable();
  const tableContainer = document.querySelector('.overflow-y-auto');
  if (tableContainer) tableContainer.scrollTo({ top: 0, behavior: 'smooth' });
}

function certUpdateTabCounts() {
  const all = certificateData.length;
  const active = certificateData.filter(c => c.status === 'active').length;
  const pending = certificateData.filter(c => c.status === 'pending').length;
  const completed = certificateData.filter(c => c.status === 'completed').length;
  certTabButtons.forEach(btn => {
    const status = btn.dataset.status;
    const count = btn.querySelector('.tab-count');
    if (!count) return;
    if (status === 'all') count.textContent = all;
    if (status === 'active') count.textContent = active;
    if (status === 'pending') count.textContent = pending;
    if (status === 'completed') count.textContent = completed;
  });
}

function certMoveTabIndicator(activeBtn) {
  const indicator = document.getElementById('tabIndicator');
  if (!indicator || !activeBtn) return;
  const left = activeBtn.offsetLeft;
  const width = activeBtn.offsetWidth;
  indicator.style.left = `${left}px`;
  indicator.style.width = `${width}px`;
}

function certInitTabIndicator() {
  const activeBtn = document.querySelector('.tab-btn.active');
  if (!activeBtn) return;
  const indicator = document.getElementById('tabIndicator');
  if (indicator) {
    indicator.style.transition = 'none';
    certMoveTabIndicator(activeBtn);
    indicator.offsetHeight; // force reflow
    indicator.style.transition = 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  }
}

certTabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    certTabButtons.forEach(b => {
      b.classList.remove('text-white', 'active');
      b.classList.add('text-gray-700', 'bg-transparent');
      const countSpan = b.querySelector('.tab-count');
      if (countSpan) {
        countSpan.classList.remove('bg-white/30', 'text-white');
        countSpan.classList.add('bg-green-100', 'text-green-400');
      }
    });
    btn.classList.remove('text-gray-700', 'bg-transparent');
    btn.classList.add('text-white', 'active');
    const activeCount = btn.querySelector('.tab-count');
    if (activeCount) {
      activeCount.classList.remove('bg-green-100', 'text-green-400');
      activeCount.classList.add('bg-white/30', 'text-white');
    }
    certMoveTabIndicator(btn);
    certCurrentStatus = btn.dataset.status;
    certCurrentPage = 1;
    certRenderTable();
  });
});

if (certSearchInput) {
  certSearchInput.addEventListener('input', e => {
    certCurrentSearch = e.target.value;
    certCurrentPage = 1;
    certRenderTable();
  });
}

if (certDateFilter) {
  certDateFilter.addEventListener('change', e => {
    certCurrentDateFilter = e.target.value;
    certCurrentPage = 1;
    certRenderTable();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  certInitTabIndicator();
  certRenderTable();
  window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn) certMoveTabIndicator(activeBtn);
  });
  console.log('✅ Certificate table initialized');
});

window.changeCertPage = changeCertPage;
window.sortCertificate = sortCertificate;
window.sortTable = sortCertificate; // alias for backward compatibility
