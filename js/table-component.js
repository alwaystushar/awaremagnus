class TableComponent extends HTMLElement {
    constructor() {
        super();
        this.data = [];
        this.filteredData = [];
        this.currentPage = 1;
        this.rowsPerPage = 5;
        this.viewMode = "table";
        this.language = "EN";
    }

    connectedCallback() {
        this.renderBase();
    }

    getTableName() {
        return this.getAttribute("tableName") || "Table";
    }

    getHeaders() {
        const headers = {};
        [...this.attributes].forEach(attr => {
            if (attr.name.startsWith("th")) headers[attr.name] = attr.value;
        });
        return headers;
    }

    getButtonColumns() {
        const btnCols = {};
        [...this.attributes].forEach(attr => {
            if (attr.name.startsWith("btnth")) {
                const key = attr.name.replace("btnth", "th");
                btnCols[key] = attr.value;
            }
        });
        return btnCols;
    }

    setData(dataArray) {
        this.data = dataArray;
        this.filteredData = dataArray;

        this.renderTable();
        this.renderGrid();
        this.renderPagination();
        this.renderViewMode();
    }

    renderBase() {
        const showSearch = this.getAttribute("search") !== "false";
        const showView = this.getAttribute("view") !== "false";

        this.innerHTML = `
            <div class="bg-white rounded-xl  ">

                <div class="flex items-center justify-between mb-2 flex-wrap gap-1 p-2">

                    <h2 class="font-semibold text-xs">${this.getTableName()}</h2>

                    <div class="flex items-center gap-1">

                        ${showSearch ? `
                        <div class="relative">
                            <input type="text" id="searchInput"
                                placeholder="Search..."
                                class="pl-7 pr-6 py-2 rounded-full bg-white text-[10px] border border-gray-300 focus:outline-none">
                            <img src="images/img/search.svg"
                                class="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 opacity-50">
                        </div>` : ""}

                        <button id="langBtn"
                            class="px-3 py-2 rounded-full border text-[10px] border-gray-300 hover:border-teal-500 hover:text-teal-500 transition">
                            عربي
                        </button>

                        ${showView ? `
                        <div class="flex items-center rounded-md border border-gray-300 overflow-hidden bg-gray-100">
                            
                            <button id="tableViewBtn"
                                class=" px-3 py-2 flex items-center justify-center transition-all">
                                <img src="images/icons/table.svg" class="w-3 opacity-100 transition-opacity">
                            </button>

                            <button id="gridViewBtn"
                                class=" px-3 py-2 flex items-center justify-center transition-all">
                                <img src="images/icons/grid.svg" class="w-3 opacity-40 transition-opacity">
                            </button>

                        </div>` : ""}

                    </div>
                </div>

                <div id="tableWrapper" class="overflow-x-auto"></div>
                <div id="gridWrapper" class="hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 p-2"></div>

                <div class="flex justify-between items-center mt-2 flex-wrap gap-1 p-2"
                    id="paginationWrapper"></div>

            </div>
        `;

        if (showSearch) {
            this.querySelector("#searchInput").addEventListener("input", (e) => {
                const val = e.target.value.toLowerCase();
                this.filteredData = this.data.filter(row =>
                    JSON.stringify(row).toLowerCase().includes(val)
                );

                this.currentPage = 1;
                this.renderTable();
                this.renderGrid();
                this.renderPagination();
            });
        }

        this.querySelector("#langBtn").addEventListener("click", () => {
            this.language = this.language === "EN" ? "AR" : "EN";
            this.querySelector("#langBtn").innerText =
                this.language === "EN" ? "عربي" : "English";
        });

        if (showView) {
            this.querySelector("#tableViewBtn").addEventListener("click", () => {
                this.viewMode = "table";
                this.renderViewMode();
            });

            this.querySelector("#gridViewBtn").addEventListener("click", () => {
                this.viewMode = "grid";
                this.renderViewMode();
            });
        }
    }

    renderViewMode() {
        const table = this.querySelector("#tableWrapper");
        const grid = this.querySelector("#gridWrapper");

        table.classList.toggle("hidden", this.viewMode === "grid");
        grid.classList.toggle("hidden", this.viewMode === "table");
    }

    addActionEvents() {
        this.querySelectorAll('[data-action="view"]')?.forEach(btn => {
            btn.addEventListener("click", () => {
                window.location.href = "physical-security.html";
            });
        });

        this.querySelectorAll('[data-action="edit"]')?.forEach(btn => {
            btn.addEventListener("click", () => {
                window.location.href = "add-new-module-content.html";
            });
        });
    }

    renderTable() {
        const wrapper = this.querySelector("#tableWrapper");
        const headers = this.getHeaders();
        const btnCols = this.getButtonColumns();
        const keys = Object.keys(headers);
        const rows = this.getPaginatedData();

        let headerHTML = `
            <thead>
                <tr class="bg-[#FAFBFC] text-[9px]">
                    ${keys.map(k =>
                        `<th class=" px-3 py-2 font-semibold text-gray-700 whitespace-nowrap">${headers[k]}</th>`
                    ).join("")}
                </tr>
            </thead>
        `;

        let rowsHTML = rows.map(row => `
            <tr class="border-b hover:bg-gray-50 text-[9px]">
                ${keys.map((key, idx) => {
                    const thKey = "th" + (idx + 1);
                    const val = row[headers[thKey]] || Object.values(row)[idx];

                    if (btnCols[thKey]) {
                        return `
                        <td class=" px-3 py-2">
                            <button class="${btnCols[thKey]} text-[8px]">
                                ${val}
                            </button>
                        </td>`;
                    }

                    return `<td class=" px-3 py-2">${val}</td>`;
                }).join("")}
            </tr>
        `).join("");

        wrapper.innerHTML = `
            <table class="min-w-full text-left text-[9px]">
                ${headerHTML}
                <tbody>${rowsHTML}</tbody>
            </table>
        `;

        this.addActionEvents();
    }

    renderGrid() {
        const wrapper = this.querySelector("#gridWrapper");
        const rows = this.getPaginatedData();

        wrapper.classList.add(
            "grid",
            "grid-cols-1",
            "sm:grid-cols-2",
            "lg:grid-cols-4",
            "gap-2",
            "p-2"
        );

        wrapper.innerHTML = rows.map(row => `
            <div class="rounded-xl bg-white border overflow-hidden cursor-pointer transition hover:shadow"
                 onclick="window.location.href='physical-security.html'">

                <div class="p-3 flex items-center justify-center bg-gray-100">
                    <img src="images/img-frame.svg" class="w-8 h-8 opacity-80">
                </div>

                <div class="p-2 text-[9px]">

                    <h3 class="text-[10px] font-semibold text-gray-900 mb-1">
                        ${row.Module}
                    </h3>

                    <p class="text-gray-500 mb-1 flex items-center gap-1">
                        <img src="images/eng.png" class="w-3 h-3">
                        ${row.Language.replace(/<[^>]+>/g, "")}
                    </p>

                    <p class="text-gray-500 text-[8px] mb-2">
                        ${row.Description}
                    </p>

                    <button class="flex items-center gap-1  px-3 py-2 rounded-md border text-[8px] font-medium bg-white hover:bg-gray-100 transition"
                            onclick="event.stopPropagation(); window.location.href='add-new-module-content.html'">
                        <img src="images/edit.svg" class="w-3 h-3"> Edit
                    </button>

                </div>

            </div>
        `).join("");

        this.addActionEvents();
    }

    getPaginatedData() {
        const start = (this.currentPage - 1) * this.rowsPerPage;
        return this.filteredData.slice(start, start + this.rowsPerPage);
    }

    renderPagination() {
        const wrap = this.querySelector("#paginationWrapper");
        const totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);

        const perPage = `
            <select id="rowsPerPage" class="border rounded-md px-1 py-[2px] text-[8px]">
                ${[5,10,15,20].map(n =>
                    `<option value="${n}" ${this.rowsPerPage === n ? "selected" : ""}>${n}</option>`
                ).join("")}
            </select>
        `;

        wrap.innerHTML = `
            <div class="text-gray-600 text-[8px]">
                Showing ${(this.currentPage - 1) * this.rowsPerPage + 1}–
                ${Math.min(this.currentPage * this.rowsPerPage, this.filteredData.length)}
                of ${this.filteredData.length}
            </div>

            <div>${perPage}</div>

            <div class="text-gray-600 text-[8px]">
                Page ${this.currentPage} / ${totalPages}
            </div>
        `;

        this.querySelector("#rowsPerPage").addEventListener("change", (e) => {
            this.rowsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderTable();
            this.renderGrid();
            this.renderPagination();
        });
    }
}

customElements.define("table-component", TableComponent);


// Sample Data Init

const table = document.getElementById("subscriptionTable");

if (table && typeof table.setData === "function") {
    table.setData([
        {
            "Module": "Screen Saver 1",
            "Description": "A simple clean screen saver",
            "Language": ` <img src="images/eng.png" class="inline-block w-3 h-3 ml-1"> English`,
            "Thumbnail": `<img src="images/img-frame.svg" class="w-6 h-6">`,
            "Action": `
                <button data-action="view" class="inline-flex items-center gap-1 px-2 py-1 rounded-full   text-[8px] text-gray-700 hover:bg-gray-100 mr-1">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    View
                </button>
                <button data-action="edit" class="inline-flex items-center gap-1 px-2 py-1 rounded-full   text-[8px] text-gray-700 hover:bg-gray-100">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    Edit
                </button>
            `
        },
        {
            "Module": "Promo Intro Video",
            "Description": "Short promotional intro",
            "Language": ` <img src="images/eng.png" class="inline-block w-3 h-3 ml-1"> English`,
            "Thumbnail": `<img src="images/img-frame.svg" class="w-6 h-6">`,
            "Action": `
                <button data-action="view" class="inline-flex items-center gap-1 px-2 py-1 rounded-full   text-[8px] text-gray-700 hover:bg-gray-100 mr-1">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    View
                </button>
                <button data-action="edit" class="inline-flex items-center gap-1 px-2 py-1 rounded-full   text-[8px] text-gray-700 hover:bg-gray-100">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    Edit
                </button>
            `
        },
        {
            "Module": "HR Announcement",
            "Description": "Company-wide HR update",
            "Language": ` <img src="images/eng.png" class="inline-block w-3 h-3 ml-1"> English`,
            "Thumbnail": `<img src="images/img-frame.svg" class="w-6 h-6">`,
            "Action": `
                <button data-action="view" class="inline-flex items-center gap-1 px-2 py-1 rounded-full   text-[8px] text-gray-700 hover:bg-gray-100 mr-1">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    View
                </button>
                <button data-action="edit" class="inline-flex items-center gap-1 px-2 py-1 rounded-full   text-[8px] text-gray-700 hover:bg-gray-100">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    Edit
                </button>
            `
        },
        {
            "Module": "Daily Tips",
            "Description": "Short daily motivational message",
            "Language": ` <img src="images/eng.png" class="inline-block w-3 h-3 ml-1"> English`,
            "Thumbnail": `<img src="images/img-frame.svg" class="w-6 h-6">`,
            "Action": `
                <button data-action="view" class="inline-flex items-center gap-1 px-2 py-1 rounded-full   text-[8px] text-gray-700 hover:bg-gray-100 mr-1">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    View
                </button>
                <button data-action="edit" class="inline-flex items-center gap-1 px-2 py-1 rounded-full   text-[8px] text-gray-700 hover:bg-gray-100">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    Edit
                </button>
            `
        },
        {
            "Module": "Safety Guidelines",
            "Description": "Mandatory workplace safety rules",
            "Language": ` <img src="images/eng.png" class="inline-block w-3 h-3 ml-1"> English`,
            "Thumbnail": `<img src="images/img-frame.svg" class="w-6 h-6">`,
            "Action": `
                <button data-action="view" class="inline-flex items-center gap-1 px-2 py-1 rounded-full   text-[8px] text-gray-700 hover:bg-gray-100 mr-1">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    View
                </button>
                <button data-action="edit" class="inline-flex items-center gap-1 px-2 py-1 rounded-full   text-[8px] text-gray-700 hover:bg-gray-100">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    Edit
                </button>
            `
        }
    ]);
}
