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

    // ========= READ TITLE =========
    getTableName() {
        return this.getAttribute("tableName") || "Table";
    }

    // ========= READ HEADERS (th1, th2...) =========
    getHeaders() {
        const headers = {};
        [...this.attributes].forEach(attr => {
            if (attr.name.startsWith("th")) headers[attr.name] = attr.value;
        });
        return headers;
    }

    // ========= READ BUTTON COLUMNS (btnth3 etc.) =========
    getButtonColumns() {
        const buttonColumns = {};
        [...this.attributes].forEach(attr => {
            if (attr.name.startsWith("btnth")) {
                const index = attr.name.replace("btnth", "th");
                buttonColumns[index] = attr.value;
            }
        });
        return buttonColumns;
    }

    // ========= SET DATA PUBLIC METHOD =========
    setData(dataArray) {
        this.data = dataArray;
        this.filteredData = dataArray;

        this.renderTable();
        this.renderGrid();
        this.renderPagination();
        this.renderViewMode();
    }

    // ========= MAIN UI STRUCTURE =========
    renderBase() {
        const showSearch = this.getAttribute("search") !== "false";
        const showView = this.getAttribute("view") !== "false";

        this.innerHTML = `
            <div class="bg-white rounded-3xl shadow-sm">

                <!-- TOP BAR -->
                <div class="flex items-center justify-between mb-4 flex-wrap gap-3 p-6">

                    <h2 class="font-semibold text-xl">${this.getTableName()}</h2>

                    <div class="flex items-center gap-3">

                        ${showSearch ? `
                        <!-- SEARCH -->
                        <div class="relative">
                            <input type="text" id="searchInput"
                                placeholder="Search..."
                                class="pl-12 pr-10 py-2.5 rounded-full bg-white text-sm border border-gray-300 focus:outline-none">
                            <img src="images/img/search.svg"
                                class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 opacity-50">
                        </div>` : ""}

                        <!-- LANGUAGE -->
                        <button id="langBtn"
                            class="px-6 py-2 rounded-full border border-gray-300 hover:border-teal-500 hover:text-teal-500 transition">
                            عربي
                        </button>

                        ${showView ? `
                        <!-- VIEW SWITCH -->
                        <div class="flex items-center rounded-xl border border-gray-300 overflow-hidden bg-gray-100">
                            
                            <button id="tableViewBtn"
                                class="px-4 py-2.5 flex items-center justify-center transition-all">
                                <img src="images/icons/table.svg" class="w-5 opacity-100 transition-opacity">
                            </button>

                            <button id="gridViewBtn"
                                class="px-4 py-2.5 flex items-center justify-center transition-all">
                                <img src="images/icons/grid.svg" class="w-5 opacity-40 transition-opacity">
                            </button>

                        </div>` : ""}

                    </div>
                </div>

                <!-- MAIN CONTENT -->
                <div id="tableWrapper" class="overflow-x-auto"></div>
                <div id="gridWrapper" class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-6"></div>

                <!-- PAGINATION -->
                <div class="flex justify-between items-center mt-6 flex-wrap gap-3 p-6"
                    id="paginationWrapper"></div>

            </div>
        `;

        // ========= SEARCH =========
        if (showSearch) {
            this.querySelector("#searchInput").addEventListener("input", (e) => {
                const value = e.target.value.toLowerCase();
                this.filteredData = this.data.filter(row =>
                    JSON.stringify(row).toLowerCase().includes(value)
                );

                this.currentPage = 1;
                this.renderTable();
                this.renderGrid();
                this.renderPagination();
            });
        }

        // ========= LANGUAGE =========
        this.querySelector("#langBtn").addEventListener("click", () => {
            this.language = this.language === "EN" ? "AR" : "EN";
            this.querySelector("#langBtn").innerText =
                this.language === "EN" ? "عربي" : "English";
        });

        // ========= VIEW SWITCH =========
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

    // ========= SWITCH BETWEEN TABLE / GRID =========
    renderViewMode() {
        const table = this.querySelector("#tableWrapper");
        const grid = this.querySelector("#gridWrapper");

        const tableBtn = this.querySelector("#tableViewBtn");
        const gridBtn = this.querySelector("#gridViewBtn");
        const tableIcon = tableBtn?.querySelector("img");
        const gridIcon = gridBtn?.querySelector("img");

        if (this.viewMode === "table") {
            table.classList.remove("hidden");
            grid.classList.add("hidden");

            tableBtn.classList.add("bg-[#dce4ec]");
            gridBtn.classList.remove("bg-[#dce4ec]");

            tableIcon.style.opacity = "1";
            gridIcon.style.opacity = "0.4";
        } else {
            table.classList.add("hidden");
            grid.classList.remove("hidden");

            gridBtn.classList.add("bg-[#dce4ec]");
            tableBtn.classList.remove("bg-[#dce4ec]");

            gridIcon.style.opacity = "1";
            tableIcon.style.opacity = "0.4";
        }
    }

    // ========= ADD ICON CLICK EVENTS =========
    addActionEvents() {
        // VIEW icon
        this.querySelectorAll("img[src='images/Icon_Eye.svg']").forEach(icon => {
            icon.addEventListener("click", () => {
                window.location.href = "physical-security.html";
            });
        });

        // EDIT icon
        this.querySelectorAll("img[src='images/edit.svg']").forEach(icon => {
            icon.addEventListener("click", () => {
                window.location.href = "add-new-module-content.html";
            });
        });
    }

    // ========= TABLE MODE =========
    renderTable() {
        const wrapper = this.querySelector("#tableWrapper");
        const headers = this.getHeaders();
        const buttonCols = this.getButtonColumns();
        const keys = Object.keys(headers);
        const pageData = this.getPaginatedData();

        let headerHTML = `
            <thead>
                <tr class="bg-[#FAFBFC]">
                    ${keys.map(k =>
                        `<th class="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">${headers[k]}</th>`
                    ).join("")}
                </tr>
            </thead>
        `;

        let rowsHTML = pageData.map(row => `
            <tr class="border-b hover:bg-gray-50">

                ${keys.map((key, index) => {
                    const thKey = "th" + (index + 1);
                    const cellValue = row[headers[thKey]] || Object.values(row)[index];

                    if (buttonCols[thKey]) {
                        return `
                        <td class="px-6 py-4">
                            <button class="${buttonCols[thKey]}">
                                ${cellValue}
                            </button>
                        </td>`;
                    }

                    return `<td class="px-6 py-4">${cellValue}</td>`;
                }).join("")}

            </tr>
        `).join("");

        wrapper.innerHTML = `
            <table class="min-w-full text-sm text-left">
                ${headerHTML}
                <tbody>${rowsHTML}</tbody>
            </table>
        `;

        this.addActionEvents(); // <--- ADD HERE
    }

    // ========= GRID MODE =========
    renderGrid() {
        const wrapper = this.querySelector("#gridWrapper");
        const pageData = this.getPaginatedData();

        wrapper.innerHTML = pageData.map(row => `
            <div class="p-4 border rounded-2xl bg-white shadow hover:shadow-md transition">
                ${Object.entries(row)
                    .map(([key, val]) =>
                        `<p class="text-sm text-gray-600"><span class="font-medium">${key}:</span> ${val}</p>`
                    ).join("")}
            </div>
        `).join("");

        this.addActionEvents(); // <--- ADD HERE
    }

    // ========= PAGINATION =========
    getPaginatedData() {
        const start = (this.currentPage - 1) * this.rowsPerPage;
        return this.filteredData.slice(start, start + this.rowsPerPage);
    }

    renderPagination() {
        const wrapper = this.querySelector("#paginationWrapper");
        const totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);

        const perPageDropdown = `
            <select id="rowsPerPage" class="border rounded-lg px-3 py-2 text-sm">
                ${[5,10,15,20,25,30,35,40,45,50].map(n =>
                    `<option value="${n}" ${this.rowsPerPage === n ? "selected" : ""}>${n}</option>`
                ).join("")}
            </select>
        `;

        wrapper.innerHTML = `
            <div class="text-sm text-gray-600">
                Showing ${(this.currentPage - 1) * this.rowsPerPage + 1}–
                ${Math.min(this.currentPage * this.rowsPerPage, this.filteredData.length)}
                of ${this.filteredData.length}
            </div>

            <div>${perPageDropdown}</div>

            <div class="text-sm text-gray-600">
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

    goToPage(page) {
        this.currentPage = page;
        this.renderTable();
        this.renderGrid();
        this.renderPagination();
    }
}

customElements.define("table-component", TableComponent);



const table = document.getElementById("subscriptionTable");

table.setData([
    {
        "Module": "Screen Saver 1",
        "Description": "A simple clean screen saver",
        "Language": ` <img src="images/eng.png" class="inline-block w-5 h-5 ml-2"> English`,
        "Thumbnail": `<img src="images/img-frame.svg" class="w-12 h-12">`,
        "Action": `
            <img src="images/Icon_Eye.svg" class="w-5 h-5 inline cursor-pointer mr-2">
            <img src="images/edit.svg" class="w-5 h-5 inline cursor-pointer">
        `
    },
    {
        "Module": "Promo Intro Video",
        "Description": "Short promotional intro",
        "Language": ` <img src="images/eng.png" class="inline-block w-5 h-5 ml-2"> English`,
        "Thumbnail": `<img src="images/img-frame.svg" class="w-12 h-12">`,
        "Action": `
            <img src="images/Icon_Eye.svg" class="w-5 h-5 inline cursor-pointer mr-2">
            <img src="images/edit.svg" class="w-5 h-5 inline cursor-pointer">
        `
    },
    {
        "Module": "HR Announcement",
        "Description": "Company-wide HR update",
        "Language": ` <img src="images/eng.png" class="inline-block w-5 h-5 ml-2"> English`,
        "Thumbnail": `<img src="images/img-frame.svg" class="w-12 h-12">`,
        "Action": `
            <img src="images/Icon_Eye.svg" class="w-5 h-5 inline cursor-pointer mr-2">
            <img src="images/edit.svg" class="w-5 h-5 inline cursor-pointer">
        `
    },
    {
        "Module": "Daily Tips",
        "Description": "Short daily motivational message",
        "Language": ` <img src="images/eng.png" class="inline-block w-5 h-5 ml-2"> English`,
        "Thumbnail": `<img src="images/img-frame.svg" class="w-12 h-12">`,
        "Action": `
            <img src="images/Icon_Eye.svg" class="w-5 h-5 inline cursor-pointer mr-2">
            <img src="images/edit.svg" class="w-5 h-5 inline cursor-pointer">
        `
    },
    {
        "Module": "Safety Guidelines",
        "Description": "Mandatory workplace safety rules",
        "Language": ` <img src="images/eng.png" class="inline-block w-5 h-5 ml-2"> English`,
        "Thumbnail": `<img src="images/img-frame.svg" class="w-12 h-12">`,
        "Action": `
            <img src="images/Icon_Eye.svg" class="w-5 h-5 inline cursor-pointer mr-2">
            <img src="images/edit.svg" class="w-5 h-5 inline cursor-pointer">
        `
    }
]);
