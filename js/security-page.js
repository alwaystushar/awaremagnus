// Security page logic: tabs, pagination, dropdown, and dummy data
const securityData = [
  { title: "Interactive Lesson", status: "completed", date: "28 Oct, 2025", chapters: "10 Chapter", lessons: "6 interactive lessons", languages: ["en", "ar"] },
  { title: "Quizzes", status: "completed", date: "28 Oct, 2025", chapters: "10 Quizzes", lessons: "106 questions", languages: ["en", "ar"] },
  { title: "Posters", status: "pending", date: "28 Oct, 2025", chapters: "10 Chapter", lessons: "6 interactive lessons", languages: ["en", "ar"] },
  { title: "Survey", status: "pending", date: "28 Oct, 2025", chapters: "5 Survey", lessons: "3 surveys", languages: ["en", "ar"] },
  { title: "Interactive Lesson", status: "pending", date: "12 Nov, 2025", chapters: "8 Chapter", lessons: "4 interactive lessons", languages: ["en"] },
  { title: "Quizzes", status: "completed", date: "03 Dec, 2025", chapters: "7 Quizzes", lessons: "55 questions", languages: ["ar"] }
];

let securityCurrentPage = 1;
const securityRowsPerPage = 5;
let securityCurrentStatus = "all";
let securityCurrentSearch = "";

const securityItemsEl = document.getElementById("items");
const securityPaginationInfo = document.getElementById("paginationInfo");
const securityPaginationButtons = document.getElementById("paginationButtons");
const securityTabButtons = document.querySelectorAll(".tab-btn");
const securitySearchInput = document.getElementById("searchInput");

const securityIconMap = {
  "Interactive Lesson": "📘",
  "Quizzes": "💡",
  "Posters": "🖼",
  "Survey": "📊"
};

const securityColorMap = {
  "Interactive Lesson": "bg-cyan-100 text-cyan-600",
  "Quizzes": "bg-blue-100 text-blue-600",
  "Posters": "bg-orange-100 text-orange-600",
  "Survey": "bg-purple-100 text-purple-600"
};

const securityLangMap = {
  en: { label: "English", flag: "us" },
  ar: { label: "Arabic", flag: "sa" }
};

function securityFilteredData() {
  let data = [...securityData];
  if (securityCurrentStatus !== "all") {
    data = data.filter(item => item.status === securityCurrentStatus);
  }
  if (securityCurrentSearch) {
    const term = securityCurrentSearch.toLowerCase();
    data = data.filter(item => item.title.toLowerCase().includes(term));
  }
  return data;
}

function securityRenderItems() {
  const data = securityFilteredData();
  const total = data.length;
  const totalPages = Math.ceil(total / securityRowsPerPage) || 1;
  if (securityCurrentPage > totalPages) securityCurrentPage = totalPages;

  const start = (securityCurrentPage - 1) * securityRowsPerPage;
  const end = Math.min(start + securityRowsPerPage, total);
  const pageData = data.slice(start, end);

  if (!securityItemsEl) return;

  securityItemsEl.innerHTML = pageData.map(item => {
    const icon = securityIconMap[item.title] || "📘";
    const color = securityColorMap[item.title] || "bg-cyan-100 text-cyan-600";
    const langChips = (item.languages || []).map(code => {
      const cfg = securityLangMap[code];
      if (!cfg) return "";
      return `<span class="inline-flex items-center gap-1 text-[11px] border border-gray-200 rounded-full px-2 py-1 bg-white">
        <span class="fi fi-${cfg.flag} rounded-full"></span>
        <span class="text-gray-600">${cfg.label}</span>
      </span>`;
    }).join("");

    const statusBadge = item.status === "completed"
      ? `<span class="text-[11px] text-green-600 bg-green-100 px-3 py-1 rounded-full">Completed</span>`
      : `<span class="text-[11px] text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Pending</span>`;

    return `
      <div class="item bg-white rounded-2xl p-4 flex justify-between items-center border border-gray-100 hover:border-blue-200 transition-all hover:shadow-sm">
        <div class="flex gap-4 flex-1">
          <div class="w-12 h-12 ${color} rounded-lg flex items-center justify-center flex-shrink-0 text-lg">
            ${icon}
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-base font-semibold text-gray-900">${item.title}</h3>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-[10px] text-gray-500 mb-3">
              <span>Created ${item.date} &nbsp; &nbsp;·</span>
              ${langChips}
            </div>
            <p class="text-xs text-gray-600">${item.chapters} · ${item.lessons}</p>
          </div>
        </div>
        <div class="ml-4 flex flex-col items-end gap-4">
          ${statusBadge}
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-12 py-2 rounded-full text-xs font-semibold flex-shrink-0 transition-colors">
            Start
          </button>
        </div>
      </div>
    `;
  }).join("");

  if (securityPaginationInfo) {
    securityPaginationInfo.innerHTML = `Showing ${start + 1}–${Math.min(end, total)} of ${total} Entries`;
  }
  securityRenderPagination(totalPages);
}

function securityRenderPagination(totalPages) {
  if (!securityPaginationButtons) return;
  if (totalPages <= 1) {
    securityPaginationButtons.innerHTML = "";
    return;
  }

  let html = "";
  html += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed" onclick="changeSecurityPage(${securityCurrentPage - 1})" ${securityCurrentPage === 1 ? "disabled" : ""}>‹</button>`;

  const maxVisible = 5;
  let startPage = Math.max(1, securityCurrentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

  if (startPage > 1) {
    html += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changeSecurityPage(1)">1</button>`;
    if (startPage > 2) html += `<span class="px-2 text-gray-400">...</span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="page-btn min-w-[32px] h-8 px-2 border rounded-full text-xs transition-all ${i === securityCurrentPage ? "bg-blue-50 text-blue-600 border-blue-500 font-semibold" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}" onclick="changeSecurityPage(${i})">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) html += `<span class="px-2 text-gray-400">...</span>`;
    html += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changeSecurityPage(${totalPages})">${totalPages}</button>`;
  }

  html += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed" onclick="changeSecurityPage(${securityCurrentPage + 1})" ${securityCurrentPage === totalPages ? "disabled" : ""}>›</button>`;
  securityPaginationButtons.innerHTML = html;
}

function changeSecurityPage(page) {
  const totalPages = Math.ceil(securityFilteredData().length / securityRowsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  securityCurrentPage = page;
  securityRenderItems();
}

function securityUpdateTabCounts() {
  const all = securityData.length;
  const pending = securityData.filter(i => i.status === "pending").length;
  const completed = securityData.filter(i => i.status === "completed").length;
  securityTabButtons.forEach(btn => {
    const status = btn.dataset.status;
    const countEl = btn.querySelector(".tab-count");
    if (!countEl) return;
    if (status === "all") countEl.textContent = all;
    if (status === "pending") countEl.textContent = pending;
    if (status === "completed") countEl.textContent = completed;
  });
}

function securityMoveTabIndicator(activeBtn) {
  const indicator = document.getElementById("tabIndicator");
  if (!indicator || !activeBtn) return;
  indicator.style.left = `${activeBtn.offsetLeft}px`;
  indicator.style.width = `${activeBtn.offsetWidth}px`;
}

function securityInitTabIndicator() {
  const activeBtn = document.querySelector(".tab-btn.active");
  if (!activeBtn) return;
  const indicator = document.getElementById("tabIndicator");
  if (indicator) {
    indicator.style.transition = "none";
    securityMoveTabIndicator(activeBtn);
    indicator.offsetHeight;
    indicator.style.transition = "left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  }
}

securityTabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    securityTabButtons.forEach(b => {
      b.classList.remove("text-white", "active");
      b.classList.add("text-gray-700", "bg-transparent");
      const countSpan = b.querySelector(".tab-count");
      if (countSpan) {
        countSpan.classList.remove("bg-white/30", "text-white");
        countSpan.classList.add("bg-green-100", "text-green-400");
      }
    });
    btn.classList.remove("text-gray-700", "bg-transparent");
    btn.classList.add("text-white", "active");
    const activeCount = btn.querySelector(".tab-count");
    if (activeCount) {
      activeCount.classList.remove("bg-green-100", "text-green-400");
      activeCount.classList.add("bg-white/30", "text-white");
    }
    securityMoveTabIndicator(btn);
    securityCurrentStatus = btn.dataset.status;
    securityCurrentPage = 1;
    securityRenderItems();
  });
});

if (securitySearchInput) {
  securitySearchInput.addEventListener("input", e => {
    securityCurrentSearch = e.target.value;
    securityCurrentPage = 1;
    securityRenderItems();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof ModernDropdown !== "undefined") new ModernDropdown();
  securityUpdateTabCounts();
  securityInitTabIndicator();
  securityRenderItems();
  window.addEventListener("resize", () => {
    const activeBtn = document.querySelector(".tab-btn.active");
    if (activeBtn) securityMoveTabIndicator(activeBtn);
  });
});

window.filterStatus = (status) => {
  const target = document.querySelector(`.tab-btn[data-status="${status}"]`);
  if (target) target.click();
};
window.changeSecurityPage = changeSecurityPage;
