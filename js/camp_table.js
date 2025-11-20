
// ===============================
// Sample table data (replace with dynamic data if needed)
// ===============================
const data = [
  { name: "Jane Smith", purchase_Date: "2024-09-25", start_Date: "2024-09-20", expiry_date: "2024-09-27", user_License: "Basic", available: "120",  service: "Premium", status: "Completed", order_status: "active",    },
  { name: "Sam Wilson", purchase_Date: "2024-09-24", start_Date: "2024-09-21", expiry_date: "2024-09-28", user_License: "Basic", available: "30", service: "Basic",   status: "Pending",   order_status: "inactive",  },
  { name: "Lucy Gray", purchase_Date: "2024-09-23", start_Date: "2024-09-22", expiry_date: "2024-09-29", user_License: "Basic", available: "120",  service: "Premium", status: "Active",    order_status: "active",    },
  { name: "Mark Twain", purchase_Date: "2024-09-22", start_Date: "2024-09-19", expiry_date: "2024-09-30", user_License: "Basic", available: "30", service: "Basic",   status: "Completed", order_status: "inactive",  },
  { name: "Emma Stone", purchase_Date: "2024-09-21", start_Date: "2024-09-18", expiry_date: "2024-09-29", user_License: "Basic", available: "120",  service: "Premium", status: "Pending",   order_status: "active",    },
  { name: "Robert Downey", purchase_Date: "2024-09-20", start_Date: "2024-09-17", expiry_date: "2024-09-28", user_License: "Basic", available: "30", service: "Basic",   status: "Active",    order_status: "inactive",  },
  { name: "Natalie Portman", purchase_Date: "2024-09-19", start_Date: "2024-09-16", expiry_date: "2024-09-27", user_License: "Basic", available: "120",  service: "Premium", status: "Completed", order_status: "active",    },
  { name: "Chris Hemsworth", purchase_Date: "2024-09-18", start_Date: "2024-09-15", expiry_date: "2024-09-26", user_License: "Basic", available: "30", service: "Basic",   status: "Pending",   order_status: "inactive",  },
  { name: "Scarlett Johansson", purchase_Date: "2024-09-17", start_Date: "2024-09-14", expiry_date: "2024-09-25", user_License: "Basic", available: "120",  service: "Premium", status: "Active",    order_status: "active",    },
  { name: "Bruce Wayne", purchase_Date: "2024-09-16", start_Date: "2024-09-13", expiry_date: "2024-09-24", user_License: "Basic", available: "30", service: "Basic",   status: "Completed", order_status: "inactive",  },
  { name: "Clark Kent", purchase_Date: "2024-09-15", start_Date: "2024-09-12", expiry_date: "2024-09-23", user_License: "Basic", available: "120",  service: "Premium", status: "Pending",   order_status: "active",    },
  { name: "Diana Prince", purchase_Date: "2024-09-14", start_Date: "2024-09-11", expiry_date: "2024-09-22", user_License: "Basic", available: "30", service: "Basic",   status: "Active",    order_status: "inactive",  },
  { name: "Barry Allen", purchase_Date: "2024-09-13", start_Date: "2024-09-10", expiry_date: "2024-09-21", user_License: "Basic", available: "120",  service: "Premium", status: "Completed", order_status: "active",    },
  { name: "Hal Jordan", purchase_Date: "2024-09-12", start_Date: "2024-09-09", expiry_date: "2024-09-20", user_License: "Basic", available: "30", service: "Basic",   status: "Pending",   order_status: "inactive",  },
  { name: "Peter Parker", purchase_Date: "2024-09-11", start_Date: "2024-09-08", expiry_date: "2024-09-19", user_License: "Basic", available: "120",  service: "Premium", status: "Active",    order_status: "active",    },
  { name: "Tony Stark", purchase_Date: "2024-09-10", start_Date: "2024-09-07", expiry_date: "2024-09-18", user_License: "Basic", available: "30", service: "Basic",   status: "Completed", order_status: "inactive",  },
  { name: "Steve Rogers", purchase_Date: "2024-09-09", start_Date: "2024-09-06", expiry_date: "2024-09-17", user_License: "Basic", available: "120",  service: "Premium", status: "Pending",   order_status: "active",    },
  { name: "Natasha Romanoff", purchase_Date: "2024-09-08", start_Date: "2024-09-05", expiry_date: "2024-09-16", user_License: "Basic", available: "30", service: "Basic",   status: "Active",    order_status: "inactive",  },
  { name: "Wanda Maximoff", purchase_Date: "2024-09-07", start_Date: "2024-09-04", expiry_date: "2024-09-15", user_License: "Basic", available: "120",  service: "Premium", status: "Completed", order_status: "active",    },
  { name: "Mike Brown", purchase_Date: "2024-09-06", start_Date: "2024-09-03", expiry_date: "2024-09-14", user_License: "Basic", available: "30", service: "Basic",   status: "Pending",   order_status: "inactive",  },
  { name: "Anna Lee", purchase_Date: "2024-09-05", start_Date: "2024-09-02", expiry_date: "2024-09-13", user_License: "Basic", available: "120",  service: "Premium", status: "Active",    order_status: "active",    },
  { name: "Chris Evans", purchase_Date: "2024-09-04", start_Date: "2024-09-01", expiry_date: "2024-09-12", user_License: "Basic", available: "30", service: "Basic",   status: "Completed", order_status: "inactive",  },
  { name: "Sophie Turner", purchase_Date: "2024-09-03", start_Date: "2024-08-31", expiry_date: "2024-09-11", user_License: "Basic", available: "120",  service: "Premium", status: "Active",    order_status: "active",    },
  { name: "Tom Hardy", purchase_Date: "2024-09-02", start_Date: "2024-08-30", expiry_date: "2024-09-10", user_License: "Basic", available: "30", service: "Basic",   status: "Pending",   order_status: "inactive",  }
];

// ===============================
// State variables
// ===============================
let currentTab = "All";          // Current tab filter (All, Active, Pending, Completed)
let currentPage = 1;             // Current page for pagination
let rowsPerPage = 10;            // Rows per page (user can change)
let currentSort = { key: "", asc: true }; // Current sorting state

// ===============================
// DOM elements
// ===============================
const tableBody   = document.getElementById("tableBody");
const statusTabs  = document.getElementById("statusTabs");
const pagination  = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");
const filterType  = document.getElementById("filterType");
const rowsSelect  = document.getElementById("rowsPerPage");

// ===============================
// Render status tabs (with counts)
// ===============================
function renderTabs() {
  // Count how many items are in each status
  const counts = { All: data.length };
  ["Active", "Pending", "Completed"].forEach(st => {
    counts[st] = data.filter(d => d.status === st).length;
  });

  // Generate buttons dynamically
  statusTabs.innerHTML = Object.entries(counts)
    .map(([status, count]) => {
      const isActive = currentTab === status;

      // If active
      if (isActive) {
        return `
          <button class="flex items-center gap-1 px-4 py-2 text-white transition-all duration-300 bg-gray-900 rounded-full filter-btn"
                  onclick="setTab('${status}')">
            ${status}
            <span class="number bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full transition-all duration-300">
              ${count}
            </span>
          </button>`;
      }

      // If not active
      return `
        <button class="flex items-center gap-1 px-4 py-2 text-gray-600 transition-all duration-300 rounded-full filter-btn hover:text-black"
                onclick="setTab('${status}')">
          ${status}
          <span class="number text-green-500 bg-green-500/15 text-xs px-2 py-0.5 rounded-full transition-all duration-300">
            ${count}
          </span>
        </button>`;
    }).join("");
}

// ===============================
// Apply filters (tabs, search, dropdown)
// ===============================
function getFilteredData() {
  let filtered = data;

  // 1. Tab filter (Active, Pending, Completed, All)
  if (currentTab !== "All") {
    filtered = filtered.filter(d => d.status === currentTab);
  }

  // 2. Search filter (searches in name and type)
const query = searchInput.value.toLowerCase();
if (query) {
  filtered = filtered.filter(d =>
    d.name.toLowerCase().includes(query) ||
    d.service.toLowerCase().includes(query) ||
    d.status.toLowerCase().includes(query) ||
    d.order_status.toLowerCase().includes(query)
  );
}

  // 3. Dropdown filter (filter by type: email, qr, nfc)
  if (filterType.value) {
    filtered = filtered.filter(d => d.type === filterType.value);
  }

  return filtered;
}

// ===============================
// Render table rows
// ===============================
function renderTable() {
  const filtered = getFilteredData();

  // Pagination: calculate visible rows
  const start = (currentPage - 1) * rowsPerPage;
  const end   = start + rowsPerPage;
  let pageData = filtered.slice(start, end);

  // ✅ Sort only the visible rows (not full dataset)
  if (currentSort.key) {
    pageData = pageData.sort((a, b) => {
      let valA = a[currentSort.key].toString().toLowerCase();
      let valB = b[currentSort.key].toString().toLowerCase();
      if (valA < valB) return currentSort.asc ? -1 : 1;
      if (valA > valB) return currentSort.asc ? 1 : -1;
      return 0;
    });
  }

  // Render rows into table body
// Render rows into table body
// Render rows into table body
tableBody.innerHTML = pageData.map(row => {
  let statusClass = "";
  if (row.status === "Active") statusClass = "px-4 py-1 text-sm text-green-700 bg-green-100 rounded-full";
  if (row.status === "Pending") statusClass = "px-4 py-1 text-sm text-yellow-700 bg-yellow-100 rounded-full";
  if (row.status === "Completed") statusClass = "px-4 py-1 text-sm text-blue-700 bg-blue-100 rounded-full";

  // Pencil icon (edit)
  const actionIcon = `
    <button class="p-2 rounded-full hover:bg-teal-50" title="Edit">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600 hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 4.487l1.651-1.651a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 7.5L16.5 4.5" />
      </svg>
    </button>
  `;

  return `
<tr class="transition-colors border-t hover:bg-blue-50">
  <td class="px-6 py-6 whitespace-nowrap">${row.name}</td>
  <td class="px-6 py-6 whitespace-nowrap">${row.purchase_Date}</td>
  <td class="px-6 py-6 whitespace-nowrap">${row.start_Date}</td>
  <td class="px-6 py-6 whitespace-nowrap">${row.expiry_date}</td>
  <td class="px-6 py-6 whitespace-nowrap">${row.user_License}</td>
  <td class="px-6 py-6 whitespace-nowrap">${row.available}</td>
  <td class="px-6 py-6 whitespace-nowrap">${row.service}</td>
  <td class="px-6 py-6 whitespace-nowrap">
    <span class="${statusClass}">${row.status}</span>
  </td>
  <td class="px-6 py-6 whitespace-nowrap">${row.order_status}</td>
  <td class="px-6 py-6 whitespace-nowrap">${actionIcon}</td>
</tr>`;
}).join("");


  // Update pagination
  renderPagination(filtered.length);
}

// ===============================
// Render pagination buttons
// ===============================
function renderPagination(total) {
  const pages = Math.ceil(total / rowsPerPage);
  let buttons = "";
  for (let i = 1; i <= pages; i++) {
    buttons += `<button class="px-3 py-1 rounded-full ${i===currentPage ? 'bg-teal-50 text-[var(--teal)] border border-[var(--teal)]' : 'border text-gray-600 hover:bg-teal-50 hover:text-[var(--teal)] hover:border hover:border-[var(--teal)] duration-300'}"
                         onclick="setPage(${i})">${i}</button>`;
  }
  pagination.innerHTML = buttons;
}

// ===============================
// Handlers (change tab, change page)
// ===============================
function setTab(tab) { 
  currentTab = tab; 
  currentPage = 1; 
  renderTabs(); 
  renderTable(); 
}
function setPage(p) { 
  currentPage = p; 
  renderTable(); 
}

// ===============================
// Event listeners
// ===============================
// Search input
searchInput.addEventListener("input", renderTable);

// Dropdown filter
filterType.addEventListener("change", renderTable);

// Rows per page selector
rowsSelect.addEventListener("change", e => { 
  rowsPerPage = parseInt(e.target.value); 
  currentPage = 1; 
  renderTable(); 
});

// Sorting (click table headers with data-sort attribute)
document.querySelectorAll("th[data-sort]").forEach(th => {
  th.addEventListener("click", () => {
    const key = th.dataset.sort;

    // If clicking same column → toggle ASC/DESC
    // If new column → default to ASC
    currentSort.asc = currentSort.key === key ? !currentSort.asc : true;
    currentSort.key = key;

    renderTable();
  });
});

// ===============================
// Initialize table + tabs
// ===============================
renderTabs();
renderTable();
