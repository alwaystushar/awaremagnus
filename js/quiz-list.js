// Quiz list table logic
// Provides filtering by type, search, sorting, and pagination.

const quizData = [
  {
    id: 1,
    type: "Single",
    languageCode: "en",
    language: "English",
    question: "What is phishing?"
  },
  {
    id: 2,
    type: "Single",
    languageCode: "en",
    language: "English",
    question: "What is phishing?"
  },
  {
    id: 3,
    type: "Multiple",
    languageCode: "en",
    language: "English",
    question: "Which of the following are security best practices?"
  },
  {
    id: 4,
    type: "True/False",
    languageCode: "ar",
    language: "Arabic",
    question: "Two-factor authentication adds extra security?"
  },
  {
    id: 5,
    type: "Single",
    languageCode: "en",
    language: "English",
    question: "What does VPN stand for?"
  },
  {
    id: 6,
    type: "Multiple",
    languageCode: "ar",
    language: "Arabic",
    question: "Select all types of malware:"
  },
  {
    id: 7,
    type: "Single",
    languageCode: "en",
    language: "English",
    question: "What is ransomware?"
  },
  {
    id: 8,
    type: "True/False",
    languageCode: "en",
    language: "English",
    question: "Passwords should be changed regularly?"
  },
  {
    id: 9,
    type: "Single",
    languageCode: "ar",
    language: "Arabic",
    question: "What is the purpose of a firewall?"
  },
  {
    id: 10,
    type: "Multiple",
    languageCode: "en",
    language: "English",
    question: "Which are strong password characteristics?"
  },
  {
    id: 11,
    type: "Single",
    languageCode: "en",
    language: "English",
    question: "What is social engineering?"
  },
  {
    id: 12,
    type: "True/False",
    languageCode: "ar",
    language: "Arabic",
    question: "Public Wi-Fi is always secure?"
  },
  {
    id: 13,
    type: "Multiple",
    languageCode: "en",
    language: "English",
    question: "Which protocols are secure?"
  },
  {
    id: 14,
    type: "Single",
    languageCode: "en",
    language: "English",
    question: "What is encryption?"
  },
  {
    id: 15,
    type: "Single",
    languageCode: "ar",
    language: "Arabic",
    question: "What is a botnet?"
  }
];

let quizCurrentPage = 1;
const quizRowsPerPage = 8;
let quizCurrentSearch = '';
let quizCurrentType = 'all';
let quizCurrentLanguage = 'all';
let quizCurrentSortColumn = null;
let quizCurrentSortDirection = 'asc';

const quizTableBody = document.getElementById('tableBody');
const quizSearchInput = document.getElementById('searchInput');
const quizTypeFilter = document.getElementById('typeFilter');
const quizLanguageFilter = document.getElementById('languageFilter');
const quizPaginationInfo = document.getElementById('paginationInfo');
const quizPaginationButtons = document.getElementById('paginationButtons');
const quizEmptyState = document.getElementById('emptyState');

function quizActionButton() {
  return `
    <button class="inline-flex items-center gap-2 px-3 py-1.5 text-gray-700 border border-gray-300 rounded-lg text-xs hover:bg-gray-50 transition">
      <i data-lucide="pencil" class="w-4 h-4"></i>
      Edit
    </button>
  `;
}

function quizFlag(languageCode) {
  const flagClassMap = {
    en: 'fi-us',
    ar: 'fi-sa'
  };
  const flagClass = flagClassMap[languageCode] || flagClassMap.en;
  return `<span class="fi ${flagClass} rounded-full"></span>`;
}

function quizLanguageDisplay(item) {
  return `
    <div class="inline-flex items-center gap-2 border border-gray-200 px-2 py-1 rounded-full text-xs bg-gray-50">
      ${quizFlag(item.languageCode)}
      <span class="rounded-full">${item.language}</span>
    </div>
  `;
}

function quizFilteredData() {
  let filtered = [...quizData];

  if (quizCurrentType !== 'all') {
    const typeMap = {
      'single': 'Single',
      'multiple': 'Multiple',
      'true-false': 'True/False'
    };
    filtered = filtered.filter(item => item.type === typeMap[quizCurrentType]);
  }

  if (quizCurrentLanguage !== 'all') {
    filtered = filtered.filter(item => item.languageCode === quizCurrentLanguage);
  }

  if (quizCurrentSearch) {
    filtered = filtered.filter(item =>
      item.question.toLowerCase().includes(quizCurrentSearch.toLowerCase()) ||
      item.type.toLowerCase().includes(quizCurrentSearch.toLowerCase())
    );
  }

  if (quizCurrentSortColumn) {
    filtered.sort((a, b) => {
      let valA, valB;
      if (quizCurrentSortColumn === 'type') {
        valA = a.type.toLowerCase();
        valB = b.type.toLowerCase();
      } else if (quizCurrentSortColumn === 'language') {
        valA = a.language.toLowerCase();
        valB = b.language.toLowerCase();
      } else if (quizCurrentSortColumn === 'question') {
        valA = a.question.toLowerCase();
        valB = b.question.toLowerCase();
      }
      if (valA < valB) return quizCurrentSortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return quizCurrentSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filtered;
}

function sortQuiz(column) {
  if (quizCurrentSortColumn === column) {
    quizCurrentSortDirection = quizCurrentSortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    quizCurrentSortColumn = column;
    quizCurrentSortDirection = 'asc';
  }
  quizUpdateSortIcons();
  quizCurrentPage = 1;
  quizRender();
}

function quizUpdateSortIcons() {
  document.querySelectorAll('th[data-sort]').forEach(th => {
    const icon = th.querySelector('.sort-icon');
    const column = th.dataset.sort;
    if (column === quizCurrentSortColumn) {
      icon.innerHTML = quizCurrentSortDirection === 'asc'
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

function quizRenderTable(pageData) {
  quizTableBody.innerHTML = pageData.map((item, index) => {
    const globalIndex = (quizCurrentPage - 1) * quizRowsPerPage + index + 1;
    return `
    <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-4 py-3.5 text-gray-600">${String(globalIndex).padStart(2, '0')}</td>
      <td class="px-4 py-3.5 text-gray-700">${item.type}</td>
      <td class="px-4 py-3.5 text-gray-700">
        ${quizLanguageDisplay(item)}
      </td>
      <td class="px-4 py-3.5 text-gray-600">${item.question}</td>
      <td class="px-4 py-3.5">${quizActionButton()}</td>
    </tr>
  `}).join('');
}

function quizRenderPagination(totalPages, total, start, end) {
  if (totalPages <= 1) {
    quizPaginationButtons.innerHTML = '';
  } else {
    let buttons = '';
    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changeQuizPage(${quizCurrentPage - 1})" ${quizCurrentPage === 1 ? 'disabled' : ''}><i data-lucide="chevron-left" class="w-4 h-4"></i></button>`;

    const maxVisible = 5;
    let startPage = Math.max(1, quizCurrentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

    if (startPage > 1) {
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changeQuizPage(1)">1</button>`;
      if (startPage > 2) buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border rounded-full text-xs transition-all ${i === quizCurrentPage ? 'bg-blue-50 text-blue-600 border-blue-500 font-semibold' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}" onclick="changeQuizPage(${i})">${i}</button>`;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changeQuizPage(${totalPages})">${totalPages}</button>`;
    }

    buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onclick="changeQuizPage(${quizCurrentPage + 1})" ${quizCurrentPage === totalPages ? 'disabled' : ''}><i data-lucide="chevron-right" class="w-4 h-4"></i></button>`;
    quizPaginationButtons.innerHTML = buttons;
  }

  quizPaginationInfo.innerHTML = `<span>Showing ${start + 1}–${end} out of ${total} Entries</span>`;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function quizRender() {
  const filtered = quizFilteredData();
  const total = filtered.length;
  const totalPages = Math.ceil(total / quizRowsPerPage) || 1;
  if (quizCurrentPage > totalPages) quizCurrentPage = totalPages;
  const start = (quizCurrentPage - 1) * quizRowsPerPage;
  const end = Math.min(start + quizRowsPerPage, total);
  const pageData = filtered.slice(start, end);

  if (total === 0) {
    quizTableBody.innerHTML = '';
    quizEmptyState.classList.remove('hidden');
    quizPaginationButtons.innerHTML = '';
    quizPaginationInfo.innerHTML = '<span>No entries found</span>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  quizEmptyState.classList.add('hidden');
  quizRenderTable(pageData);
  quizRenderPagination(totalPages, total, start, end);
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function changeQuizPage(page) {
  const totalPages = Math.ceil(quizFilteredData().length / quizRowsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  quizCurrentPage = page;
  quizRender();
  const container = document.querySelector('.overflow-y-auto');
  if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
}

if (quizSearchInput) {
  quizSearchInput.addEventListener('input', e => {
    quizCurrentSearch = e.target.value;
    quizCurrentPage = 1;
    quizRender();
  });
}

if (quizTypeFilter) {
  quizTypeFilter.addEventListener('change', e => {
    quizCurrentType = e.target.value;
    quizCurrentPage = 1;
    quizRender();
  });
}

if (quizLanguageFilter) {
  quizLanguageFilter.addEventListener('change', e => {
    quizCurrentLanguage = e.target.value;
    quizCurrentPage = 1;
    quizRender();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  quizRender();
  console.log('✅ Quiz table initialized');
});

window.sortQuiz = sortQuiz;
window.changeQuizPage = changeQuizPage;
