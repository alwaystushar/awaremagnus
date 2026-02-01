// Quiz and Answer table logic
// Provides filtering, search, sorting, and pagination for quiz management

const quizData = [
  {
    id: 1,
    category: "WIFI",
    question: "Is security of WIFI is important",
    answer1: "No",
    answer2: "Yes",
    answer3: "Maybe",
    answer4: "Null",
    language: "English",
    correctAnswer: "1",
    quizType: "Single Select"
  },
  {
    id: 2,
    category: "Network",
    question: "What is a firewall",
    answer1: "Hardware device",
    answer2: "Software program",
    answer3: "Both",
    answer4: "None",
    language: "English",
    correctAnswer: "3",
    quizType: "Single Select"
  },
  {
    id: 3,
    category: "Password",
    question: "What makes a strong password",
    answer1: "Length",
    answer2: "Complexity",
    answer3: "Both",
    answer4: "Neither",
    language: "English",
    correctAnswer: "3",
    quizType: "Single Select"
  },
  {
    id: 4,
    category: "Phishing",
    question: "How to identify phishing emails",
    answer1: "Check sender",
    answer2: "Verify links",
    answer3: "Both",
    answer4: "Ignore",
    language: "English",
    correctAnswer: "3",
    quizType: "Single Select"
  },
  {
    id: 5,
    category: "Data Protection",
    question: "What is GDPR",
    answer1: "Data regulation",
    answer2: "Security standard",
    answer3: "Encryption method",
    answer4: "Authentication",
    language: "Arabic",
    correctAnswer: "1",
    quizType: "Single Select"
  },
  {
    id: 6,
    category: "Encryption",
    question: "What is end-to-end encryption",
    answer1: "Encrypts at start",
    answer2: "Encrypts at end",
    answer3: "Encrypts entire message",
    answer4: "No encryption",
    language: "English",
    correctAnswer: "3",
    quizType: "Single Select"
  },
  {
    id: 7,
    category: "Access Control",
    question: "What is multi-factor authentication",
    answer1: "Two passwords",
    answer2: "Multiple verification methods",
    answer3: "Only biometric",
    answer4: "No authentication",
    language: "Arabic",
    correctAnswer: "2",
    quizType: "Single Select"
  },
  {
    id: 8,
    category: "Compliance",
    question: "What is ISO 27001",
    answer1: "Security standard",
    answer2: "Quality standard",
    answer3: "Privacy law",
    answer4: "Encryption protocol",
    language: "English",
    correctAnswer: "1",
    quizType: "Single Select"
  },
  {
    id: 9,
    category: "Email Security",
    question: "What should you do with suspicious attachments",
    answer1: "Open immediately",
    answer2: "Never open without verification",
    answer3: "Open in browser",
    answer4: "Forward to others",
    language: "English",
    correctAnswer: "2",
    quizType: "Single Select"
  },
  {
    id: 10,
    category: "Social Engineering",
    question: "What is social engineering",
    answer1: "Building networks",
    answer2: "Manipulating people for information",
    answer3: "Social media marketing",
    answer4: "Engineering software",
    language: "Arabic",
    correctAnswer: "2",
    quizType: "Single Select"
  },
  {
    id: 11,
    category: "Backup",
    question: "How often should you backup data",
    answer1: "Never",
    answer2: "Once a year",
    answer3: "Regularly",
    answer4: "Only when needed",
    language: "English",
    correctAnswer: "3",
    quizType: "Single Select"
  },
  {
    id: 12,
    category: "USB Security",
    question: "Is it safe to use unknown USB devices",
    answer1: "Yes, always safe",
    answer2: "No, potential security risk",
    answer3: "Only on weekends",
    answer4: "Only in office",
    language: "Arabic",
    correctAnswer: "2",
    quizType: "Single Select"
  },
  {
    id: 13,
    category: "VPN",
    question: "What does VPN stand for",
    answer1: "Virtual Private Network",
    answer2: "Virtual Public Network",
    answer3: "Verified Private Network",
    answer4: "Virtual Protocol Network",
    language: "English",
    correctAnswer: "1",
    quizType: "Single Select"
  },
  {
    id: 14,
    category: "Two-Factor Auth",
    question: "What is an authenticator app",
    answer1: "Browser extension",
    answer2: "Generates time-based codes",
    answer3: "Password manager",
    answer4: "Email client",
    language: "English",
    correctAnswer: "2",
    quizType: "Single Select"
  },
  {
    id: 15,
    category: "Biometric",
    question: "Is biometric authentication secure",
    answer1: "No, not secure",
    answer2: "Yes, very secure",
    answer3: "Only sometimes",
    answer4: "Never use it",
    language: "Arabic",
    correctAnswer: "2",
    quizType: "Single Select"
  },
  {
    id: 16,
    category: "Browser Security",
    question: "Should you keep your browser updated",
    answer1: "No, not necessary",
    answer2: "Yes, always keep updated",
    answer3: "Only on Fridays",
    answer4: "Only for work",
    language: "English",
    correctAnswer: "2",
    quizType: "Single Select"
  },
  {
    id: 17,
    category: "Public WiFi",
    question: "Is it safe to work on public WiFi",
    answer1: "Yes, completely safe",
    answer2: "No, use VPN if needed",
    answer3: "Only in cafes",
    answer4: "Never use internet",
    language: "English",
    correctAnswer: "2",
    quizType: "Single Select"
  },
  {
    id: 18,
    category: "Zero Trust",
    question: "What is Zero Trust security",
    answer1: "Trust everyone",
    answer2: "Never trust anyone",
    answer3: "Verify every access request",
    answer4: "Trust based on location",
    language: "Arabic",
    correctAnswer: "3",
    quizType: "Single Select"
  },
  {
    id: 19,
    category: "Cloud Security",
    question: "What are cloud security risks",
    answer1: "No risks exist",
    answer2: "Data breaches, misconfiguration",
    answer3: "Only network issues",
    answer4: "Color scheme problems",
    language: "English",
    correctAnswer: "2",
    quizType: "Single Select"
  },
  {
    id: 20,
    category: "API Security",
    question: "What should be protected in APIs",
    answer1: "Nothing",
    answer2: "API keys and endpoints",
    answer3: "Only user names",
    answer4: "Design colors",
    language: "English",
    correctAnswer: "2",
    quizType: "Single Select"
  },
  {
    id: 21,
    category: "Malware",
    question: "How does malware spread",
    answer1: "Through air",
    answer2: "Downloads, emails, infected sites",
    answer3: "By phone calls",
    answer4: "Never spreads",
    language: "Arabic",
    correctAnswer: "2",
    quizType: "Single Select"
  },
  {
    id: 22,
    category: "Code Security",
    question: "What is code injection",
    answer1: "Injecting medicine",
    answer2: "Inserting malicious code",
    answer3: "Injecting nutrients",
    answer4: "Code review process",
    language: "English",
    correctAnswer: "2",
    quizType: "Single Select"
  }
];

let currentPage = 1;
const rowsPerPage = 8;
let currentSearch = '';
let currentLanguage = 'en';
let currentSortColumn = 'category';
let currentSortDirection = 'asc';

const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
const paginationInfo = document.getElementById('paginationInfo');
const paginationButtons = document.getElementById('paginationButtons');
const emptyState = document.getElementById('emptyState');

// Helper functions
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
  let filtered = [...quizData];

  if (currentSearch) {
    filtered = filtered.filter(item =>
      item.category.toLowerCase().includes(currentSearch.toLowerCase()) ||
      item.question.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }

  return sortData(filtered);
}

function renderActionButton() {
  return `
    <button class="inline-flex items-center gap-1 px-4 py-1.5 border border-gray-500 hover:border-blue-600 hover:text-blue-600 text-gray-600 rounded-full text-xs font-medium transition">
      <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
      Edit
    </button>
  `;
}

function renderLanguageCell(language) {
  const isEnglish = language === 'English';
  const flagImg = isEnglish ? 'images/eng.png' : 'images/ar.png';
  const text = isEnglish ? 'English' : 'Arabic';
  
  return `
    <div class="flex items-center gap-2">
      <img src="${flagImg}" alt="${text}" class="w-5 h-5 rounded">
      <span>${text}</span>
    </div>
  `;
}

function renderTable(pageData) {
  tableBody.innerHTML = pageData.map(item => `
    <tr class="hover:bg-gray-50 transition-colors border-b border-gray-100">
      <td class="px-6 py-3.5">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
            <i data-lucide="wifi" class="w-3.5 h-3.5 text-teal-600"></i>
          </div>
          <span class="text-xs font-medium text-gray-700">${item.category}</span>
        </div>
      </td>
      <td class="px-6 py-3.5 text-xs text-gray-600">${item.question}</td>
      <td class="px-6 py-3.5 text-xs text-gray-600">${item.answer1}</td>
      <td class="px-6 py-3.5 text-xs text-gray-600">${item.answer2}</td>
      <td class="px-6 py-3.5 text-xs text-gray-600">${item.answer3}</td>
      <td class="px-6 py-3.5 text-xs text-gray-600">${item.answer4}</td>
      <td class="px-6 py-3.5 text-xs text-gray-600">${renderLanguageCell(item.language)}</td>
      <td class="px-6 py-3.5 text-xs text-gray-600">${item.correctAnswer}</td>
      <td class="px-6 py-3.5 text-xs text-gray-600">${item.quizType}</td>
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
    paginationInfo.innerHTML = '<span>No quizzes found</span>';
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
  console.log('✅ Quiz and Answer table initialized');
});

window.changePage = changePage;
window.sortTable = sortTable;