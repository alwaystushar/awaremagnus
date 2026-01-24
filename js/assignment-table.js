 // Sample Data (44 campaigns)
 const allCampaigns = [
    { id: 1, name: "Phishing Awareness Q1", start: "2026-01-15", end: "2026-02-15", status: "active" },
    { id: 2, name: "Password Security Training", start: "2026-01-10", end: "2026-02-10", status: "active" },
    { id: 3, name: "Compliance Training 2026", start: "2026-01-20", end: "2026-03-20", status: "active" },
    { id: 4, name: "Social Engineering Defense", start: "2026-01-05", end: "2026-02-05", status: "active" },
    { id: 5, name: "Data Privacy Essentials", start: "2025-12-01", end: "2026-01-01", status: "completed" },
    { id: 6, name: "Device Safety Campaign", start: "2025-11-15", end: "2025-12-15", status: "completed" },
    { id: 7, name: "Cloud Security Basics", start: "2025-11-01", end: "2025-12-01", status: "completed" },
    { id: 8, name: "Email Security Training", start: "2025-10-20", end: "2025-11-20", status: "completed" },
    { id: 9, name: "Network Security Fundamentals", start: "2026-02-01", end: "2026-03-01", status: "pending" },
    { id: 10, name: "Ransomware Protection", start: "2026-02-10", end: "2026-03-10", status: "pending" },
    { id: 11, name: "Mobile Security Awareness", start: "2026-02-15", end: "2026-03-15", status: "pending" },
    { id: 12, name: "VPN Best Practices", start: "2026-02-20", end: "2026-03-20", status: "pending" },
    { id: 13, name: "Zero Trust Security", start: "2025-10-01", end: "2025-11-01", status: "completed" },
    { id: 14, name: "Incident Response Training", start: "2025-09-15", end: "2025-10-15", status: "completed" },
    { id: 15, name: "Security Audit Preparation", start: "2025-09-01", end: "2025-10-01", status: "completed" },
    { id: 16, name: "GDPR Compliance Module", start: "2026-01-12", end: "2026-02-12", status: "active" },
    { id: 17, name: "ISO 27001 Training", start: "2026-01-18", end: "2026-02-18", status: "active" },
    { id: 18, name: "PCI DSS Awareness", start: "2026-01-22", end: "2026-02-22", status: "active" },
    { id: 19, name: "HIPAA Security Rules", start: "2026-02-05", end: "2026-03-05", status: "pending" },
    { id: 20, name: "SOC 2 Compliance", start: "2026-02-12", end: "2026-03-12", status: "pending" },
    { id: 21, name: "Cryptocurrency Security", start: "2025-08-20", end: "2025-09-20", status: "completed" },
    { id: 22, name: "API Security Essentials", start: "2025-08-01", end: "2025-09-01", status: "completed" },
    { id: 23, name: "Container Security", start: "2025-07-15", end: "2025-08-15", status: "completed" },
    { id: 24, name: "Kubernetes Security", start: "2025-07-01", end: "2025-08-01", status: "completed" },
    { id: 25, name: "DevSecOps Fundamentals", start: "2026-01-25", end: "2026-02-25", status: "active" },
    { id: 26, name: "Secure Coding Practices", start: "2026-01-28", end: "2026-02-28", status: "active" },
    { id: 27, name: "Web Application Security", start: "2026-02-18", end: "2026-03-18", status: "pending" },
    { id: 28, name: "SQL Injection Prevention", start: "2026-02-22", end: "2026-03-22", status: "pending" },
    { id: 29, name: "XSS Attack Prevention", start: "2026-02-25", end: "2026-03-25", status: "pending" },
    { id: 30, name: "CSRF Protection", start: "2025-06-20", end: "2025-07-20", status: "completed" },
    { id: 31, name: "Authentication Best Practices", start: "2025-06-01", end: "2025-07-01", status: "completed" },
    { id: 32, name: "Multi-Factor Authentication", start: "2026-01-30", end: "2026-02-28", status: "active" },
    { id: 33, name: "Single Sign-On Security", start: "2026-02-28", end: "2026-03-28", status: "pending" },
    { id: 34, name: "OAuth 2.0 Security", start: "2025-05-15", end: "2025-06-15", status: "completed" },
    { id: 35, name: "JWT Security", start: "2025-05-01", end: "2025-06-01", status: "completed" },
    { id: 36, name: "Session Management", start: "2026-01-08", end: "2026-02-08", status: "active" },
    { id: 37, name: "Access Control Basics", start: "2026-02-08", end: "2026-03-08", status: "pending" },
    { id: 38, name: "Role-Based Access Control", start: "2026-02-14", end: "2026-03-14", status: "pending" },
    { id: 39, name: "Attribute-Based Access", start: "2025-04-20", end: "2025-05-20", status: "completed" },
    { id: 40, name: "Privilege Escalation", start: "2025-04-01", end: "2025-05-01", status: "completed" },
    { id: 41, name: "Least Privilege Principle", start: "2026-01-16", end: "2026-02-16", status: "active" },
    { id: 42, name: "Security Monitoring", start: "2026-02-26", end: "2026-03-26", status: "pending" },
    { id: 43, name: "SIEM Implementation", start: "2026-03-01", end: "2026-04-01", status: "pending" },
    { id: 44, name: "Threat Intelligence", start: "2025-03-15", end: "2025-04-15", status: "completed" }
  ];

  // Pagination & Filter State
  let currentPage = 1;
  const rowsPerPage = 8;
  let currentStatus = 'all';
  let currentSearch = '';
  let currentDateFilter = 'all';

  // DOM Elements
  const tableBody = document.getElementById('tableBody');
  const searchInput = document.getElementById('searchInput');
  const dateFilter = document.getElementById('dateFilter');
  const paginationInfo = document.getElementById('paginationInfo');
  const paginationButtons = document.getElementById('paginationButtons');
  const emptyState = document.getElementById('emptyState');
  const tabButtons = document.querySelectorAll('.tab-btn');

  // Format Date Function
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Get Status Badge with Lucide Icon
  function getStatusBadge(status) {
    const badges = {
      active: { 
        class: 'bg-green-100 text-green-700 border border-green-200', 
        icon: 'play-circle', 
        text: 'Active' 
      },
      pending: { 
        class: 'bg-amber-100 text-amber-700 border border-amber-200', 
        icon: 'clock', 
        text: 'Pending' 
      },
      completed: { 
        class: 'bg-gray-100 text-gray-700 border border-gray-200', 
        icon: 'check-circle', 
        text: 'Completed' 
      }
    };
    
    const badge = badges[status];
    return `
      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${badge.class} text-[10px] font-semibold min-w-[100px] justify-center">
       
        <span>${badge.text}</span>
      </span>
    `;
  }

  // Get Action Button with Lucide Icon
  function getActionButton(status) {
    if (status === 'active') {
      return `
        <button class="inline-flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all min-w-[120px] shadow-sm hover:shadow-md hover:-translate-y-0.5">
          <i data-lucide="rocket" class="w-3.5 h-3.5"></i>
          <span>Launch</span>
        </button>
      `;
    } else if (status === 'pending') {
      return `
        <button class="inline-flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all min-w-[120px] shadow-sm hover:shadow-md hover:-translate-y-0.5">
          <i data-lucide="calendar-clock" class="w-3.5 h-3.5"></i>
          <span>Schedule</span>
        </button>
      `;
    } else {
      return `
        <button class="inline-flex items-center justify-center gap-1.5 bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all min-w-[120px] shadow-sm hover:shadow-md hover:-translate-y-0.5">
          <i data-lucide="bar-chart-3" class="w-3.5 h-3.5"></i>
          <span>View Report</span>
        </button>
      `;
    }
  }

  // Filter by Date Range
  function filterByDateRange(campaigns) {
    if (currentDateFilter === 'all') return campaigns;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const daysAgo = parseInt(currentDateFilter);
    const filterDate = new Date(today);
    filterDate.setDate(today.getDate() - daysAgo);
    
    return campaigns.filter(campaign => {
      const startDate = new Date(campaign.start);
      return startDate >= filterDate;
    });
  }

  // Get Filtered Data
  function getFilteredData() {
    let filtered = [...allCampaigns];
    
    if (currentStatus !== 'all') {
      filtered = filtered.filter(c => c.status === currentStatus);
    }
    
    if (currentSearch) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(currentSearch.toLowerCase())
      );
    }
    
    filtered = filterByDateRange(filtered);
    
    return filtered;
  }

  // Render Table
  function renderTable() {
    const filteredData = getFilteredData();
    const totalRows = filteredData.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    
    if (currentPage > totalPages && totalPages > 0) {
      currentPage = totalPages;
    }
    
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    // Show/hide empty state
    if (totalRows === 0) {
      tableBody.innerHTML = '';
      emptyState.classList.remove('hidden');
      paginationInfo.innerHTML = `
        <i data-lucide="file-text" class="w-4 h-4"></i>
        <span>No entries found</span>
      `;
      paginationButtons.innerHTML = '';
      
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
      return;
    } else {
      emptyState.classList.add('hidden');
    }
    
    // Render rows
    tableBody.innerHTML = paginatedData.map(campaign => `
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-4 py-3.5">
          <div class="flex items-center gap-2">
           
            <span class="font-medium text-gray-700">${campaign.name}</span>
          </div>
        </td>
        <td class="px-4 py-3.5 text-gray-600">
          <div class="flex items-center gap-1.5">
           
            <span>${formatDate(campaign.start)}</span>
          </div>
        </td>
        <td class="px-4 py-3.5 text-gray-600">
          <div class="flex items-center gap-1.5">
         
            <span>${formatDate(campaign.end)}</span>
          </div>
        </td>
        <td class="px-4 py-3.5">${getStatusBadge(campaign.status)}</td>
        <td class="px-4 py-3.5 ">${getActionButton(campaign.status)}</td>
      </tr>
    `).join('');
    
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    // Update pagination info
    paginationInfo.innerHTML = `
      <i data-lucide="file-text" class="w-4 h-4"></i>
      <span>Showing ${startIndex + 1}–${endIndex} out of ${totalRows} Entries</span>
    `;
    
    renderPagination(totalPages);
    updateTabCounts();
    
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

// Render Pagination
function renderPagination(totalPages) {
    if (totalPages <= 1) {
      paginationButtons.innerHTML = '';
      return;
    }
    
    let buttons = '';
    
    // Previous button
    buttons += `
      <button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" 
        onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
        <i data-lucide="chevron-left" class="w-4 h-4"></i>
      </button>
    `;
    
    // Page numbers
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    // First page + ellipsis
    if (startPage > 1) {
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changePage(1)">1</button>`;
      if (startPage > 2) {
        buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
      }
    }
    
    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border rounded-full text-xs transition-all ${i === currentPage ? 'bg-blue-50 text-blue-600 border-blue-500 font-semibold' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}" 
        onclick="changePage(${i})">${i}</button>`;
    }
    
    // Last page + ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons += `<span class="px-2 text-gray-400 flex items-center"><i data-lucide="more-horizontal" class="w-4 h-4"></i></span>`;
      }
      buttons += `<button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all" onclick="changePage(${totalPages})">${totalPages}</button>`;
    }
    
    // Next button
    buttons += `
      <button class="page-btn min-w-[32px] h-8 px-2 border border-gray-300 rounded-full text-xs bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" 
        onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
        <i data-lucide="chevron-right" class="w-4 h-4"></i>
      </button>
    `;
    
    paginationButtons.innerHTML = buttons;
    
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
  

  // Change Page Function
// Change Page Function - FIXED
function changePage(page) {
    const totalPages = Math.ceil(getFilteredData().length / rowsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderTable();
    
    // Scroll the table container to top instead of the whole page
    const tableContainer = document.querySelector('.overflow-y-auto');
    if (tableContainer) {
      tableContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Update Tab Counts
  function updateTabCounts() {
    const allCount = allCampaigns.length;
    const activeCount = allCampaigns.filter(c => c.status === 'active').length;
    const pendingCount = allCampaigns.filter(c => c.status === 'pending').length;
    const completedCount = allCampaigns.filter(c => c.status === 'completed').length;
    
    tabButtons.forEach(btn => {
      const status = btn.dataset.status;
      const span = btn.querySelector('span');
      
      if (span) {
        if (status === 'all') span.textContent = `All (${allCount})`;
        else if (status === 'active') span.textContent = `Active (${activeCount})`;
        else if (status === 'pending') span.textContent = `Pending (${pendingCount})`;
        else if (status === 'completed') span.textContent = `Completed (${completedCount})`;
      }
    });
  }

  // Event Listeners
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active', 'bg-slate-900', 'text-white');
        b.classList.add('bg-gray-100', 'text-gray-600');
      });
      btn.classList.remove('bg-gray-100', 'text-gray-600');
      btn.classList.add('active', 'bg-slate-900', 'text-white');
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

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    renderTable();
    
    console.log('✅ Campaign Management Table initialized');
  });

  // Make changePage globally accessible
  window.changePage = changePage;

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const totalPages = Math.ceil(getFilteredData().length / rowsPerPage);
    
    if (e.key === 'ArrowLeft' && currentPage > 1) {
      changePage(currentPage - 1);
    }
    
    if (e.key === 'ArrowRight' && currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  });