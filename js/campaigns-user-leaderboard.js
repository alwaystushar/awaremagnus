// Get Action Button with Lucide Icon
function getActionButton(status) {
  if (status === 'active') {
    return `
      <button class="inline-flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1.5 rounded-full text-[11px] font-semibold transition-all min-w-[120px] shadow-sm hover:shadow-md hover:-translate-y-0.5">
        <i data-lucide="rocket" class="w-3.5 h-3.5"></i>
        <span>Launch</span>
      </button>
    `;
  } else if (status === 'pending') {
    return `
      <button class="inline-flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-2 py-1.5 rounded-full text-[11px] font-semibold transition-all min-w-[120px] shadow-sm hover:shadow-md hover:-translate-y-0.5">
        <i data-lucide="calendar-clock" class="w-3.5 h-3.5"></i>
        <span>Schedule</span>
      </button>
    `;
  } else {
    return `
      <button class="inline-flex items-center justify-center gap-1.5 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1.5 rounded-full text-[11px] font-semibold transition-all min-w-[120px] shadow-sm hover:shadow-md hover:-translate-y-0.5">
        <i data-lucide="bar-chart-3" class="w-3.5 h-3.5"></i>
        <span>View Report</span>
      </button>
    `;
  }
}

// Sample Data - User data for campaigns leaderboard (44 users)
const allCampaigns = [
  { id: 1, firstName: "John", lastName: "Smith", lastLogin: "2026-01-31 14:35", riskLevel: 15, complianceScore: 92, completedModules: 8, progress: 85, completedCertificates: 5, unlockedAchievements: 12, avatarImage: "images/avatars/1.png", xpTokens: 1250, status: "active" },
  { id: 2, firstName: "Sarah", lastName: "Johnson", lastLogin: "2026-01-30 09:20", riskLevel: 8, complianceScore: 98, completedModules: 10, progress: 95, completedCertificates: 7, unlockedAchievements: 18, avatarImage: "images/avatars/2.png", xpTokens: 1890, status: "active" },
  { id: 3, firstName: "Michael", lastName: "Brown", lastLogin: "2026-01-29 16:45", riskLevel: 25, complianceScore: 78, completedModules: 6, progress: 65, completedCertificates: 3, unlockedAchievements: 8, avatarImage: "images/avatars/3.png", xpTokens: 890, status: "active" },
  { id: 4, firstName: "Emily", lastName: "Davis", lastLogin: "2026-01-28 11:10", riskLevel: 12, complianceScore: 95, completedModules: 9, progress: 90, completedCertificates: 6, unlockedAchievements: 15, avatarImage: "images/avatars/4.png", xpTokens: 1650, status: "active" },
  { id: 5, firstName: "David", lastName: "Wilson", lastLogin: "2026-01-27 13:25", riskLevel: 35, complianceScore: 68, completedModules: 4, progress: 45, completedCertificates: 2, unlockedAchievements: 5, avatarImage: "images/avatars/5.png", xpTokens: 520, status: "active" },
  { id: 6, firstName: "Jessica", lastName: "Martinez", lastLogin: "2026-01-26 10:50", riskLevel: 20, complianceScore: 85, completedModules: 7, progress: 75, completedCertificates: 4, unlockedAchievements: 10, avatarImage: "images/avatars/6.png", xpTokens: 1120, status: "active" },
  { id: 7, firstName: "Christopher", lastName: "Garcia", lastLogin: "2026-01-25 15:30", riskLevel: 18, complianceScore: 88, completedModules: 8, progress: 82, completedCertificates: 5, unlockedAchievements: 12, avatarImage: "images/avatars/7.png", xpTokens: 1340, status: "active" },
  { id: 8, firstName: "Amanda", lastName: "Rodriguez", lastLogin: "2026-01-24 12:15", riskLevel: 10, complianceScore: 97, completedModules: 10, progress: 100, completedCertificates: 8, unlockedAchievements: 20, avatarImage: "images/avatars/8.png", xpTokens: 2100, status: "active" },
  { id: 9, firstName: "James", lastName: "Lee", lastLogin: "2026-02-01 08:00", riskLevel: 0, complianceScore: 100, completedModules: 10, progress: 100, completedCertificates: 10, unlockedAchievements: 25, avatarImage: "images/avatars/9.png", xpTokens: 2500, status: "completed" },
  { id: 10, firstName: "Lisa", lastName: "Taylor", lastLogin: "2026-01-31 14:00", riskLevel: 22, complianceScore: 81, completedModules: 6, progress: 70, completedCertificates: 3, unlockedAchievements: 9, avatarImage: "images/avatars/1.png", xpTokens: 980, status: "active" },
  { id: 11, firstName: "Robert", lastName: "Anderson", lastLogin: "2026-02-01 09:30", riskLevel: 5, complianceScore: 99, completedModules: 10, progress: 98, completedCertificates: 9, unlockedAchievements: 22, avatarImage: "images/avatars/2.png", xpTokens: 2250, status: "completed" },
  { id: 12, firstName: "Jennifer", lastName: "Thomas", lastLogin: "2026-01-23 11:45", riskLevel: 28, complianceScore: 75, completedModules: 5, progress: 60, completedCertificates: 2, unlockedAchievements: 6, avatarImage: "images/avatars/3.png", xpTokens: 720, status: "active" },
  { id: 13, firstName: "Daniel", lastName: "Jackson", lastLogin: "2026-01-30 16:20", riskLevel: 16, complianceScore: 90, completedModules: 8, progress: 88, completedCertificates: 5, unlockedAchievements: 14, avatarImage: "images/avatars/4.png", xpTokens: 1480, status: "active" },
  { id: 14, firstName: "Patricia", lastName: "White", lastLogin: "2026-01-22 13:10", riskLevel: 32, complianceScore: 70, completedModules: 4, progress: 50, completedCertificates: 2, unlockedAchievements: 7, avatarImage: "images/avatars/5.png", xpTokens: 650, status: "active" },
  { id: 15, firstName: "Matthew", lastName: "Harris", lastLogin: "2026-01-31 10:25", riskLevel: 11, complianceScore: 96, completedModules: 9, progress: 92, completedCertificates: 7, unlockedAchievements: 17, avatarImage: "images/avatars/6.png", xpTokens: 1780, status: "active" },
  { id: 16, firstName: "Barbara", lastName: "Clark", lastLogin: "2026-01-21 14:40", riskLevel: 38, complianceScore: 65, completedModules: 3, progress: 40, completedCertificates: 1, unlockedAchievements: 4, avatarImage: "images/avatars/7.png", xpTokens: 480, status: "pending" },
  { id: 17, firstName: "Anthony", lastName: "Lewis", lastLogin: "2026-01-29 09:15", riskLevel: 19, complianceScore: 86, completedModules: 7, progress: 80, completedCertificates: 4, unlockedAchievements: 11, avatarImage: "images/avatars/8.png", xpTokens: 1210, status: "active" },
  { id: 18, firstName: "Susan", lastName: "Walker", lastLogin: "2026-01-20 12:50", riskLevel: 40, complianceScore: 62, completedModules: 2, progress: 35, completedCertificates: 1, unlockedAchievements: 3, avatarImage: "images/avatars/9.png", xpTokens: 390, status: "pending" },
  { id: 19, firstName: "Steven", lastName: "Hall", lastLogin: "2026-01-28 15:35", riskLevel: 23, complianceScore: 82, completedModules: 6, progress: 72, completedCertificates: 3, unlockedAchievements: 8, avatarImage: "images/avatars/1.png", xpTokens: 850, status: "active" },
  { id: 20, firstName: "Karen", lastName: "Young", lastLogin: "2026-01-19 11:20", riskLevel: 42, complianceScore: 58, completedModules: 2, progress: 30, completedCertificates: 0, unlockedAchievements: 2, avatarImage: "images/avatars/2.png", xpTokens: 310, status: "pending" },
  { id: 21, firstName: "Paul", lastName: "Hernandez", lastLogin: "2026-01-27 14:45", riskLevel: 14, complianceScore: 93, completedModules: 9, progress: 89, completedCertificates: 6, unlockedAchievements: 13, avatarImage: "images/avatars/3.png", xpTokens: 1560, status: "active" },
  { id: 22, firstName: "Nancy", lastName: "King", lastLogin: "2026-01-18 10:30", riskLevel: 45, complianceScore: 55, completedModules: 1, progress: 25, completedCertificates: 0, unlockedAchievements: 1, avatarImage: "images/avatars/4.png", xpTokens: 250, status: "pending" },
  { id: 23, firstName: "Mark", lastName: "Wright", lastLogin: "2026-01-26 16:10", riskLevel: 21, complianceScore: 84, completedModules: 7, progress: 78, completedCertificates: 4, unlockedAchievements: 9, avatarImage: "images/avatars/5.png", xpTokens: 1050, status: "active" },
  { id: 24, firstName: "Linda", lastName: "Lopez", lastLogin: "2026-01-17 13:15", riskLevel: 48, complianceScore: 50, completedModules: 1, progress: 20, completedCertificates: 0, unlockedAchievements: 0, avatarImage: "images/avatars/6.png", xpTokens: 180, status: "pending" },
  { id: 25, firstName: "Donald", lastName: "Hill", lastLogin: "2026-01-25 11:55", riskLevel: 13, complianceScore: 94, completedModules: 9, progress: 91, completedCertificates: 7, unlockedAchievements: 16, avatarImage: "images/avatars/7.png", xpTokens: 1690, status: "active" },
  { id: 26, firstName: "Maria", lastName: "Scott", lastLogin: "2026-01-16 09:40", riskLevel: 50, complianceScore: 45, completedModules: 0, progress: 15, completedCertificates: 0, unlockedAchievements: 0, avatarImage: "images/avatars/8.png", xpTokens: 100, status: "pending" },
  { id: 27, firstName: "George", lastName: "Green", lastLogin: "2026-01-24 14:25", riskLevel: 17, complianceScore: 89, completedModules: 8, progress: 84, completedCertificates: 5, unlockedAchievements: 11, avatarImage: "images/avatars/9.png", xpTokens: 1420, status: "active" },
  { id: 28, firstName: "Betty", lastName: "Adams", lastLogin: "2026-02-01 12:00", riskLevel: 6, complianceScore: 99, completedModules: 10, progress: 99, completedCertificates: 9, unlockedAchievements: 24, avatarImage: "images/avatars/1.png", xpTokens: 2380, status: "completed" },
  { id: 29, firstName: "Charles", lastName: "Nelson", lastLogin: "2026-01-23 10:35", riskLevel: 26, complianceScore: 77, completedModules: 5, progress: 62, completedCertificates: 2, unlockedAchievements: 7, avatarImage: "images/avatars/2.png", xpTokens: 770, status: "active" },
  { id: 30, firstName: "Dorothy", lastName: "Carter", lastLogin: "2026-01-15 15:50", riskLevel: 52, complianceScore: 40, completedModules: 0, progress: 10, completedCertificates: 0, unlockedAchievements: 0, avatarImage: "images/avatars/3.png", xpTokens: 50, status: "pending" },
  { id: 31, firstName: "Kevin", lastName: "Mitchell", lastLogin: "2026-01-22 13:20", riskLevel: 24, complianceScore: 80, completedModules: 6, progress: 68, completedCertificates: 3, unlockedAchievements: 8, avatarImage: "images/avatars/4.png", xpTokens: 910, status: "active" },
  { id: 32, firstName: "Carol", lastName: "Perez", lastLogin: "2026-01-14 11:05", riskLevel: 55, complianceScore: 35, completedModules: 0, progress: 5, completedCertificates: 0, unlockedAchievements: 0, avatarImage: "images/avatars/5.png", xpTokens: 25, status: "pending" },
  { id: 33, firstName: "Edward", lastName: "Roberts", lastLogin: "2026-01-21 09:50", riskLevel: 9, complianceScore: 97, completedModules: 10, progress: 96, completedCertificates: 8, unlockedAchievements: 19, avatarImage: "images/avatars/6.png", xpTokens: 2040, status: "completed" },
  { id: 34, firstName: "Janet", lastName: "Phillips", lastLogin: "2026-01-13 14:30", riskLevel: 58, complianceScore: 30, completedModules: 0, progress: 0, completedCertificates: 0, unlockedAchievements: 0, avatarImage: "images/avatars/7.png", xpTokens: 0, status: "pending" },
  { id: 35, firstName: "Ronald", lastName: "Campbell", lastLogin: "2026-01-20 12:40", riskLevel: 7, complianceScore: 98, completedModules: 10, progress: 97, completedCertificates: 8, unlockedAchievements: 21, avatarImage: "images/avatars/8.png", xpTokens: 2180, status: "completed" },
  { id: 36, firstName: "Joyce", lastName: "Parker", lastLogin: "2026-01-12 10:15", riskLevel: 60, complianceScore: 25, completedModules: 0, progress: 0, completedCertificates: 0, unlockedAchievements: 0, avatarImage: "images/avatars/9.png", xpTokens: 0, status: "pending" },
  { id: 37, firstName: "Jeffrey", lastName: "Evans", lastLogin: "2026-01-19 15:25", riskLevel: 27, complianceScore: 76, completedModules: 5, progress: 58, completedCertificates: 2, unlockedAchievements: 6, avatarImage: "images/avatars/1.png", xpTokens: 640, status: "active" },
  { id: 38, firstName: "Diane", lastName: "Edwards", lastLogin: "2026-01-11 13:50", riskLevel: 62, complianceScore: 20, completedModules: 0, progress: 0, completedCertificates: 0, unlockedAchievements: 0, avatarImage: "images/avatars/2.png", xpTokens: 0, status: "pending" },
  { id: 39, firstName: "Ryan", lastName: "Collins", lastLogin: "2026-01-18 11:30", riskLevel: 20, complianceScore: 87, completedModules: 8, progress: 86, completedCertificates: 5, unlockedAchievements: 12, avatarImage: "images/avatars/3.png", xpTokens: 1380, status: "active" },
  { id: 40, firstName: "Catherine", lastName: "Reeves", lastLogin: "2026-01-10 09:10", riskLevel: 65, complianceScore: 15, completedModules: 0, progress: 0, completedCertificates: 0, unlockedAchievements: 0, avatarImage: "images/avatars/4.png", xpTokens: 0, status: "pending" },
  { id: 41, firstName: "Jacob", lastName: "Morris", lastLogin: "2026-01-17 14:45", riskLevel: 30, complianceScore: 72, completedModules: 4, progress: 55, completedCertificates: 2, unlockedAchievements: 5, avatarImage: "images/avatars/5.png", xpTokens: 560, status: "active" },
  { id: 42, firstName: "Kathleen", lastName: "Murphy", lastLogin: "2026-01-09 12:20", riskLevel: 68, complianceScore: 10, completedModules: 0, progress: 0, completedCertificates: 0, unlockedAchievements: 0, avatarImage: "images/avatars/6.png", xpTokens: 0, status: "pending" },
  { id: 43, firstName: "Gary", lastName: "Rogers", lastLogin: "2026-01-16 10:50", riskLevel: 29, complianceScore: 74, completedModules: 5, progress: 56, completedCertificates: 2, unlockedAchievements: 5, avatarImage: "images/avatars/7.png", xpTokens: 600, status: "active" },
  { id: 44, firstName: "Lisa", lastName: "Morgan", lastLogin: "2026-01-08 14:00", riskLevel: 70, complianceScore: 5, completedModules: 0, progress: 0, completedCertificates: 0, unlockedAchievements: 0, avatarImage: "images/avatars/8.png", xpTokens: 0, status: "pending" }
];

let currentPage = 1;
const rowsPerPage = 8;
let currentStatus = 'all';
let currentSearch = '';
let currentDateFilter = 'all';
let currentSortColumn = null;
let currentSortDirection = 'asc';

const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
const dateFilter = document.getElementById('dateFilter');
const paginationInfo = document.getElementById('paginationInfo');
const paginationButtons = document.getElementById('paginationButtons');
const emptyState = document.getElementById('emptyState');
const tabButtons = document.querySelectorAll('.tab-btn');

function formatDateTime(dateTimeStr) {
  const [dateStr, timeStr] = dateTimeStr.split(' ');
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year} ${timeStr}`;
}

function getRiskLevelColor(riskLevel) {
  if (riskLevel <= 10) return 'bg-green-100';
  if (riskLevel <= 25) return 'bg-yellow-100';
  if (riskLevel <= 50) return 'bg-orange-100';
  return 'bg-red-100';
}

function getRiskLevelTextColor(riskLevel) {
  if (riskLevel <= 10) return 'text-green-700';
  if (riskLevel <= 25) return 'text-yellow-700';
  if (riskLevel <= 50) return 'text-orange-700';
  return 'text-red-700';
}

function getProgressBarColor(progress) {
  if (progress >= 90) return 'bg-green-500';
  if (progress >= 70) return 'bg-blue-500';
  if (progress >= 50) return 'bg-yellow-500';
  return 'bg-orange-500';
}

function getStatusBadge(status) {
  const badges = {
    active: { class: 'bg-green-100 text-green-700 border border-green-200', text: 'Active' },
    pending: { class: 'bg-amber-100 text-amber-700 border border-amber-200', text: 'Pending' },
    completed: { class: 'bg-gray-100 text-gray-700', text: 'Completed' }
  };
  const badge = badges[status];
  return `<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${badge.class} text-[10px] font-semibold min-w-[100px] justify-center"><span>${badge.text}</span></span>`;
}

function getFilteredData() {
  let filtered = [...allCampaigns];
  
  if (currentStatus !== 'all') {
    filtered = filtered.filter(u => u.status === currentStatus);
  }
  
  if (currentSearch) {
    filtered = filtered.filter(u => 
      u.firstName.toLowerCase().includes(currentSearch.toLowerCase()) ||
      u.lastName.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }
  
  if (currentSortColumn) {
    filtered.sort((a, b) => {
      let valA, valB;
      if (currentSortColumn === 'name') {
        valA = a.firstName.toLowerCase();
        valB = b.firstName.toLowerCase();
      } else if (currentSortColumn === 'start') {
        valA = a.lastLogin.toLowerCase();
        valB = b.lastLogin.toLowerCase();
      } else if (currentSortColumn === 'status') {
        valA = a.status;
        valB = b.status;
      }
      if (valA < valB) return currentSortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return currentSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  return filtered;
}

function sortTable(column) {
  if (currentSortColumn === column) {
    currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    currentSortColumn = column;
    currentSortDirection = 'asc';
  }
  updateSortIcons();
  currentPage = 1;
  renderTable();
}
window.sortTable = sortTable;

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
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderTable() {
  const filteredData = getFilteredData();
  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
  
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  if (totalRows === 0) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('hidden');
    paginationInfo.innerHTML = '<span>No entries found</span>';
    paginationButtons.innerHTML = '';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  } else {
    emptyState.classList.add('hidden');
  }
  
  tableBody.innerHTML = paginatedData.map(user => `
    <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-4 py-3.5 whitespace-nowrap"><span class="font-medium text-gray-700">${user.firstName}</span></td>
      <td class="px-4 py-3.5 text-gray-600 whitespace-nowrap"><span>${user.lastName}</span></td>
      <td class="px-4 py-3.5 text-gray-600 whitespace-nowrap text-xs"><span>${formatDateTime(user.lastLogin)}</span></td>
      <td class="px-4 py-3.5 whitespace-nowrap">
        <div class="flex items-center gap-2">
          <div class="w-20 h-2 rounded-full bg-gray-200"><div class="${getProgressBarColor(100 - user.riskLevel)} h-full rounded-full" style="width: ${100 - user.riskLevel}%"></div></div>
          <span class="text-xs font-semibold ${getRiskLevelTextColor(user.riskLevel)}">${user.riskLevel}%</span>
        </div>
      </td>
      <td class="px-4 py-3.5 text-center whitespace-nowrap"><span class="font-semibold text-gray-700">${user.complianceScore}</span></td>
      <td class="px-4 py-3.5 text-center whitespace-nowrap"><span class="text-gray-600">${user.completedModules}</span></td>
      <td class="px-4 py-3.5 whitespace-nowrap">
        <div class="flex items-center gap-2">
          <div class="w-20 h-2 rounded-full bg-gray-200"><div class="${getProgressBarColor(user.progress)} h-full rounded-full" style="width: ${user.progress}%"></div></div>
          <span class="text-xs font-semibold text-gray-700">${user.progress}%</span>
        </div>
      </td>
      <td class="px-4 py-3.5 text-center whitespace-nowrap"><span class="font-semibold text-gray-700">${user.completedCertificates}</span></td>
      <td class="px-4 py-3.5 text-center whitespace-nowrap"><span class="inline-flex items-center justify-center w-6 h-6 rounded-full ${getRiskLevelColor(user.riskLevel)} ${getRiskLevelTextColor(user.riskLevel)} text-xs font-bold">${user.unlockedAchievements}</span></td>
      <td class="px-4 py-3.5 whitespace-nowrap">
        <div class="w-8 h-8 rounded-lg overflow-hidden  flex items-center justify-center">
          <img src="${user.avatarImage}" alt="${user.firstName}" class="w-full h-full object-cover" >
        </div>
      </td>
      <td class="px-4 py-3.5 text-center whitespace-nowrap"><span class="text-xs font-semibold text-gray-700">${user.xpTokens} tokens</span></td>
      <td class="px-4 py-3.5 whitespace-nowrap">${getStatusBadge(user.status)}</td>      <td class="px-4 py-3.5 whitespace-nowrap">${getActionButton(user.status)}</td>    </tr>
  `).join('');
  
  if (typeof lucide !== 'undefined') lucide.createIcons();
  paginationInfo.innerHTML = `<span>Showing ${startIndex + 1}–${endIndex} out of ${totalRows} Entries</span>`;
  renderPagination(totalPages);
  updateTabCounts();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderPagination(totalPages) {
  if (totalPages <= 1) {
    paginationButtons.innerHTML = '';
    return;
  }
  
  let buttons = `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}><i data-lucide="chevron-left" class="w-4 h-4"></i></button>`;
  
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);
  
  if (startPage > 1) {
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changePage(1)">1</button>`;
    if (startPage > 2) buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
  }
  
  for (let i = startPage; i <= endPage; i++) {
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border rounded-full text-xs transition-all ${i === currentPage ? 'bg-blue-50 text-blue-600 border-blue-500 font-semibold' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}" onclick="changePage(${i})">${i}</button>`;
  }
  
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changePage(${totalPages})">${totalPages}</button>`;
  }
  
  buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}><i data-lucide="chevron-right" class="w-4 h-4"></i></button>`;
  
  paginationButtons.innerHTML = buttons;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function changePage(page) {
  const totalPages = Math.ceil(getFilteredData().length / rowsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderTable();
  const tableContainer = document.querySelector('.overflow-y-auto');
  if (tableContainer) tableContainer.scrollTo({ top: 0, behavior: 'smooth' });
}
window.changePage = changePage;

function updateTabCounts() {
  const allCount = allCampaigns.length;
  const activeCount = allCampaigns.filter(u => u.status === 'active').length;
  const pendingCount = allCampaigns.filter(u => u.status === 'pending').length;
  const completedCount = allCampaigns.filter(u => u.status === 'completed').length;
  
  tabButtons.forEach(btn => {
    const status = btn.dataset.status;
    const countSpan = btn.querySelector('.tab-count');
    if (countSpan) {
      if (status === 'all') countSpan.textContent = allCount;
      else if (status === 'active') countSpan.textContent = activeCount;
      else if (status === 'pending') countSpan.textContent = pendingCount;
      else if (status === 'completed') countSpan.textContent = completedCount;
    }
  });
}

function moveTabIndicator(activeBtn) {
  const indicator = document.getElementById('tabIndicator');
  if (!indicator || !activeBtn) return;
  indicator.style.left = `${activeBtn.offsetLeft}px`;
  indicator.style.width = `${activeBtn.offsetWidth}px`;
}

function initTabIndicator() {
  const activeBtn = document.querySelector('.tab-btn.active');
  if (activeBtn) {
    const indicator = document.getElementById('tabIndicator');
    if (indicator) {
      indicator.style.transition = 'none';
      moveTabIndicator(activeBtn);
      indicator.offsetHeight;
      indicator.style.transition = 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  }
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => {
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
    const activeCountSpan = btn.querySelector('.tab-count');
    if (activeCountSpan) {
      activeCountSpan.classList.remove('bg-green-100', 'text-green-400');
      activeCountSpan.classList.add('bg-white/30', 'text-white');
    }
    moveTabIndicator(btn);
    currentStatus = btn.dataset.status;
    currentPage = 1;
    renderTable();
  });
});

searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  currentPage = 1;
  renderTable();
});

dateFilter.addEventListener('change', (e) => {
  currentDateFilter = e.target.value;
  currentPage = 1;
  renderTable();
});

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  initTabIndicator();
  renderTable();
  window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn) moveTabIndicator(activeBtn);
  });
  console.log('✅ Campaign Leaderboard Table initialized');
});

document.addEventListener('keydown', (e) => {
  const totalPages = Math.ceil(getFilteredData().length / rowsPerPage);
  if (e.key === 'ArrowLeft' && currentPage > 1) changePage(currentPage - 1);
  if (e.key === 'ArrowRight' && currentPage < totalPages) changePage(currentPage + 1);
});
