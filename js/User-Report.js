// User Report table logic
// Provides filtering, search, sorting, and pagination for user performance reports
// with avatars, progress bars, risk levels, and action buttons

const userData = [
  {
    id: 1,
    name: "Velosiic Admin",
    role: "Developer",
    avatar: "images/img/profile.png",
    lastLogin: "01.01.2025",
    completion: 70,
    riskLevel: 3,
    experience: "Experienced",
    certifications: 4,
    score: 32,
    badge: "⭐",
    level: 3,
    group: "Group A",
    department: "Development"
  },
  {
    id: 2,
    name: "Velosiic Admin",
    role: "Developer",
    avatar: "images/img/profile.png",
    lastLogin: "01.01.2025",
    completion: 70,
    riskLevel: 3,
    experience: "Experienced",
    certifications: 4,
    score: 32,
    badge: "⭐",
    level: 3,
    group: "Group A",
    department: "Development"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Designer",
    avatar: "images/img/profile.png",
    lastLogin: "28.12.2024",
    completion: 85,
    riskLevel: 2,
    experience: "Experienced",
    certifications: 6,
    score: 45,
    badge: "⭐⭐",
    level: 4,
    group: "Group B",
    department: "Design"
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Manager",
    avatar: "images/img/profile.png",
    lastLogin: "25.12.2024",
    completion: 95,
    riskLevel: 1,
    experience: "Experienced",
    certifications: 8,
    score: 58,
    badge: "⭐⭐⭐",
    level: 5,
    group: "Group A",
    department: "Development"
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    role: "Analyst",
    avatar: "images/img/profile.png",
    lastLogin: "20.12.2024",
    completion: 60,
    riskLevel: 4,
    experience: "Intermediate",
    certifications: 2,
    score: 28,
    badge: "⭐",
    level: 2,
    group: "Group C",
    department: "HR"
  },
  {
    id: 6,
    name: "David Kim",
    role: "Developer",
    avatar: "images/img/profile.png",
    lastLogin: "18.12.2024",
    completion: 75,
    riskLevel: 2,
    experience: "Experienced",
    certifications: 5,
    score: 38,
    badge: "⭐⭐",
    level: 3,
    group: "Group A",
    department: "Development"
  },
  {
    id: 7,
    name: "Lisa Wang",
    role: "Coordinator",
    avatar: "images/img/profile.png",
    lastLogin: "15.12.2024",
    completion: 50,
    riskLevel: 5,
    experience: "Beginner",
    certifications: 1,
    score: 20,
    badge: "○",
    level: 1,
    group: "Group B",
    department: "HR"
  },
  {
    id: 8,
    name: "James Smith",
    role: "Senior Developer",
    avatar: "images/img/profile.png",
    lastLogin: "12.12.2024",
    completion: 90,
    riskLevel: 1,
    experience: "Experienced",
    certifications: 7,
    score: 52,
    badge: "⭐⭐⭐",
    level: 5,
    group: "Group A",
    department: "Development"
  },
  {
    id: 9,
    name: "Amanda Lee",
    role: "Designer",
    avatar: "images/img/profile.png",
    lastLogin: "10.12.2024",
    completion: 80,
    riskLevel: 2,
    experience: "Experienced",
    certifications: 4,
    score: 42,
    badge: "⭐⭐",
    level: 4,
    group: "Group C",
    department: "Design"
  },
  {
    id: 10,
    name: "Robert Brown",
    role: "Manager",
    avatar: "images/img/profile.png",
    lastLogin: "08.12.2024",
    completion: 88,
    riskLevel: 1,
    experience: "Experienced",
    certifications: 6,
    score: 48,
    badge: "⭐⭐⭐",
    level: 4,
    group: "Group B",
    department: "Development"
  }
];

let reportCurrentPage = 1;
const reportRowsPerPage = 8;
let reportCurrentSearch = '';
let reportCurrentDepartment = 'all';
let reportCurrentGroup = 'all';
let reportCurrentUser = 'all';
let reportCurrentLanguage = 'en';
let reportCurrentSortColumn = null;
let reportCurrentSortDirection = 'asc';

const reportTableBody = document.getElementById('tableBody');
const reportSearchInput = document.getElementById('searchInput');
const reportDepartmentFilter = document.getElementById('departmentFilter');
const reportGroupFilter = document.getElementById('groupFilter');
const reportUserFilter = document.getElementById('userFilter');
const reportLanguageFilter = document.getElementById('languageFilter');
const reportPaginationInfo = document.getElementById('paginationInfo');
const reportPaginationButtons = document.getElementById('paginationButtons');
const reportEmptyState = document.getElementById('emptyState');
let quizCurrentSortColumn = null;
let quizCurrentSortDirection = 'asc';

// Report helper functions
function reportRiskBadge(level) {
  const riskLevels = {
    1: { class: 'bg-green-100 text-green-700 border border-green-200', text: '1' },
    2: { class: 'bg-blue-100 text-blue-700 border border-blue-200', text: '2' },
    3: { class: 'bg-yellow-100 text-yellow-700 border border-yellow-200', text: '3' },
    4: { class: 'bg-orange-100 text-orange-700 border border-orange-200', text: '4' },
    5: { class: 'bg-red-100 text-red-700 border border-red-200', text: '5' }
  };
  const risk = riskLevels[level] || riskLevels[3];
  return `<span class="inline-flex items-center px-3 py-1 rounded-full ${risk.class} text-xs font-semibold">${risk.text}</span>`;
}

function reportProgressBar(percentage) {
  const color = percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-blue-500' : 'bg-orange-500';
  return `
    <div class="flex items-center gap-2">
      <div class="w-20 bg-gray-200 rounded-full h-1.5">
        <div class="${color} h-1.5 rounded-full" style="width: ${percentage}%"></div>
      </div>
      <span class="text-xs font-medium text-gray-700">${percentage}%</span>
    </div>
  `;
}

function reportActionButtons() {
  return `
    <div class="inline-flex items-center gap-2">
      <button class="inline-flex items-center gap-1 px-2 py-1.5 text-gray-700 border border-gray-300 rounded-full text-xs hover:bg-gray-50 transition">
        <i data-lucide="eye" class="w-3.5 h-3.5"></i>
        View Report
      </button>
      <button class="inline-flex items-center gap-1 px-2 py-1.5 text-gray-700 border border-gray-300 rounded-full text-xs hover:bg-gray-50 transition">
        <i data-lucide="send" class="w-3.5 h-3.5"></i>
        Resend
      </button>
    </div>
  `;
}

function reportFilteredData() {
  let filtered = [...userData];

  if (reportCurrentDepartment !== 'all') {
    const deptMap = { dev: 'Development', design: 'Design', hr: 'HR' };
    filtered = filtered.filter(item => item.department === deptMap[reportCurrentDepartment]);
  }

  if (reportCurrentGroup !== 'all') {
    const groupMap = { a: 'Group A', b: 'Group B', c: 'Group C' };
    filtered = filtered.filter(item => item.group === groupMap[reportCurrentGroup]);
  }

  if (reportCurrentSearch) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(reportCurrentSearch.toLowerCase()) ||
      item.department.toLowerCase().includes(reportCurrentSearch.toLowerCase())
    );
  }

  if (reportCurrentSortColumn) {
    filtered.sort((a, b) => {
      let valA, valB;
      if (reportCurrentSortColumn === 'name') {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else if (reportCurrentSortColumn === 'lastLogin') {
        valA = new Date(a.lastLogin.split('.').reverse().join('-'));
        valB = new Date(b.lastLogin.split('.').reverse().join('-'));
      }
      if (valA < valB) return reportCurrentSortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return reportCurrentSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filtered;
}

function sortUserReport(column) {
  if (reportCurrentSortColumn === column) {
    reportCurrentSortDirection = reportCurrentSortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    reportCurrentSortColumn = column;
    reportCurrentSortDirection = 'asc';
  }
  reportUpdateSortIcons();
  reportCurrentPage = 1;
  reportRender();
}

function reportUpdateSortIcons() {
  document.querySelectorAll('th[data-sort]').forEach(th => {
    const icon = th.querySelector('.sort-icon');
    const column = th.dataset.sort;
    if (column === reportCurrentSortColumn) {
      icon.innerHTML = reportCurrentSortDirection === 'asc'
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

function reportRenderTable(pageData) {
  reportTableBody.innerHTML = pageData.map(item => `
    <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-6 py-3.5">
        <div class="flex items-center gap-2">
          <img src="${item.avatar}" alt="${item.name}" class="w-8 h-8 rounded-full object-cover" onerror="this.src='https://via.placeholder.com/32'">
          <div>
            <div class="text-xs font-medium text-gray-700">${item.name}</div>
            <div class="text-xs text-gray-500">${item.role}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-3.5 text-xs text-gray-600">${item.lastLogin}</td>
      <td class="px-6 py-3.5">${reportProgressBar(item.completion)}</td>
      <td class="px-6 py-3.5">${reportRiskBadge(item.riskLevel)}</td>
      <td class="px-6 py-3.5 text-xs text-gray-700">
        <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">${item.experience}</span>
      </td>
      <td class="px-6 py-3.5 text-xs font-medium text-gray-700">${item.certifications}</td>
      <td class="px-6 py-3.5 text-xs font-medium text-gray-700">${item.score}</td>
      <td class="px-6 py-3.5 text-base">${item.badge}</td>
      <td class="px-6 py-3.5 text-xs text-gray-700">${item.level}</td>
      <td class="px-6 py-3.5 text-xs text-gray-700">${item.group}</td>
      <td class="px-6 py-3.5 text-xs text-gray-700">${item.department}</td>
      <td class="px-6 py-3.5">${reportActionButtons()}</td>
    </tr>
  `).join('');
}

function reportRenderPagination(totalPages, total, start, end) {
  if (totalPages <= 1) {
    reportPaginationButtons.innerHTML = '';
  } else {
    let buttons = '';
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changeReportPage(${reportCurrentPage - 1})" ${reportCurrentPage === 1 ? 'disabled' : ''}><i data-lucide="chevron-left" class="w-4 h-4"></i></button>`;

    const maxVisible = 5;
    let startPage = Math.max(1, reportCurrentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

    if (startPage > 1) {
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changeReportPage(1)">1</button>`;
      if (startPage > 2) buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border rounded-full text-xs transition-all ${i === reportCurrentPage ? 'bg-blue-50 text-blue-600 border-blue-500 font-semibold' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}" onclick="changeReportPage(${i})">${i}</button>`;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changeReportPage(${totalPages})">${totalPages}</button>`;
    }

    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changeReportPage(${reportCurrentPage + 1})" ${reportCurrentPage === totalPages ? 'disabled' : ''}><i data-lucide="chevron-right" class="w-4 h-4"></i></button>`;
    reportPaginationButtons.innerHTML = buttons;
  }

  reportPaginationInfo.innerHTML = `<span>Showing ${start + 1}–${end} out of ${total} Entries</span>`;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function reportRender() {
  const filtered = reportFilteredData();
  const total = filtered.length;
  const totalPages = Math.ceil(total / reportRowsPerPage) || 1;
  if (reportCurrentPage > totalPages) reportCurrentPage = totalPages;
  const start = (reportCurrentPage - 1) * reportRowsPerPage;
  const end = Math.min(start + reportRowsPerPage, total);
  const pageData = filtered.slice(start, end);

  if (total === 0) {
    reportTableBody.innerHTML = '';
    reportEmptyState.classList.remove('hidden');
    reportPaginationButtons.innerHTML = '';
    reportPaginationInfo.innerHTML = '<span>No entries found</span>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  reportEmptyState.classList.add('hidden');
  reportRenderTable(pageData);
  reportRenderPagination(totalPages, total, start, end);
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function changeReportPage(page) {
  const totalPages = Math.ceil(reportFilteredData().length / reportRowsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  reportCurrentPage = page;
  reportRender();
  const container = document.querySelector('.overflow-y-auto');
  if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
}

if (reportSearchInput) {
  reportSearchInput.addEventListener('input', e => {
    reportCurrentSearch = e.target.value;
    reportCurrentPage = 1;
    reportRender();
  });
}

if (reportDepartmentFilter) {
  reportDepartmentFilter.addEventListener('change', e => {
    reportCurrentDepartment = e.target.value;
    reportCurrentPage = 1;
    reportRender();
  });
}

if (reportGroupFilter) {
  reportGroupFilter.addEventListener('change', e => {
    reportCurrentGroup = e.target.value;
    reportCurrentPage = 1;
    reportRender();
  });
}

if (reportUserFilter) {
  reportUserFilter.addEventListener('change', e => {
    reportCurrentUser = e.target.value;
    reportCurrentPage = 1;
    reportRender();
  });
}

if (reportLanguageFilter) {
  reportLanguageFilter.addEventListener('change', e => {
    reportCurrentLanguage = e.target.value;
    reportCurrentPage = 1;
    reportRender();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  reportRender();
  console.log('✅ User Report table initialized');
});

window.sortUserReport = sortUserReport;
window.changeReportPage = changeReportPage;