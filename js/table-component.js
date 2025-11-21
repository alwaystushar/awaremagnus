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

    // TITLE
    getTableName() {
        return this.getAttribute("tableName") || "Table";
    }

    // HEADERS
    getHeaders() {
        const headers = {};
        [...this.attributes].forEach(attr => {
            if (attr.name.startsWith("th")) headers[attr.name] = attr.value;
        });
        return headers;
    }

    // BUTTON COLUMNS
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

    // PUBLIC SET DATA
    setData(dataArray) {
        this.data = dataArray;
        this.filteredData = dataArray;

        this.renderTable();
        this.renderGrid();
        this.renderPagination();
        this.renderViewMode();
    }

    // BASE UI
    renderBase() {
        const showSearch = this.getAttribute("search") !== "false";
        const showView = this.getAttribute("view") !== "false";

        this.innerHTML = `
            <div class="bg-white rounded-2xl shadow-sm">

                <!-- TOP BAR -->
                <div class="flex items-center justify-between mb-3 flex-wrap gap-2 p-4">

                    <h2 class="font-semibold text-base">${this.getTableName()}</h2>

                    <div class="flex items-center gap-2">

                        ${showSearch ? `
                        <!-- SEARCH -->
                        <div class="relative">
                            <input type="text" id="searchInput"
                                placeholder="Search..."
                                class="pl-9 pr-8 py-1.5 rounded-full bg-white text-xs border border-gray-300 focus:outline-none">
                            <img src="images/img/search.svg"
                                class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50">
                        </div>` : ""}

                        <!-- LANGUAGE -->
                        <button id="langBtn"
                            class="px-3 py-1 rounded-full border text-xs border-gray-300 hover:border-teal-500 hover:text-teal-500 transition">
                            عربي
                        </button>

                        ${showView ? `
                        <div class="flex items-center rounded-xl border border-gray-300 overflow-hidden bg-gray-100">
                            
                            <button id="tableViewBtn"
                                class="px-3 py-1.5 flex items-center justify-center transition-all">
                                <img src="images/icons/table.svg" class="w-4 opacity-100 transition-opacity">
                            </button>

                            <button id="gridViewBtn"
                                class="px-3 py-1.5 flex items-center justify-center transition-all">
                                <img src="images/icons/grid.svg" class="w-4 opacity-40 transition-opacity">
                            </button>

                        </div>` : ""}

                    </div>
                </div>

                <!-- CONTENT -->
                <div id="tableWrapper" class="overflow-x-auto"></div>
                <div id="gridWrapper" class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 p-4"></div>

                <!-- PAGINATION -->
                <div class="flex justify-between items-center mt-4 flex-wrap gap-2 p-4"
                    id="paginationWrapper"></div>

            </div>
        `;

        // SEARCH
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

        // LANGUAGE TOGGLE
        this.querySelector("#langBtn").addEventListener("click", () => {
            this.language = this.language === "EN" ? "AR" : "EN";
            this.querySelector("#langBtn").innerText =
                this.language === "EN" ? "عربي" : "English";
        });

        // VIEW SWITCH
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

    // VIEW MODE
renderViewMode() {
    const table = this.querySelector("#tableWrapper");
    const grid = this.querySelector("#gridWrapper");

    if (this.viewMode === "table") {
        table.classList.remove("hidden");
        grid.classList.add("hidden");
    } else {
        table.classList.add("hidden");
        grid.classList.remove("hidden");
    }
}


    // ICON ACTIONS
    addActionEvents() {
        this.querySelectorAll("img[src='images/Icon_Eye.svg']").forEach(icon => {
            icon.addEventListener("click", () => {
                window.location.href = "physical-security.html";
            });
        });

        this.querySelectorAll("img[src='images/edit.svg']").forEach(icon => {
            icon.addEventListener("click", () => {
                window.location.href = "add-new-module-content.html";
            });
        });
    }

    // TABLE
    renderTable() {
        const wrapper = this.querySelector("#tableWrapper");
        const headers = this.getHeaders();
        const btnCols = this.getButtonColumns();
        const keys = Object.keys(headers);
        const rows = this.getPaginatedData();

        let headerHTML = `
            <thead>
                <tr class="bg-[#FAFBFC] text-xs">
                    ${keys.map(k =>
                        `<th class="px-4 py-2 font-semibold text-gray-700 whitespace-nowrap">${headers[k]}</th>`
                    ).join("")}
                </tr>
            </thead>
        `;

        let rowsHTML = rows.map(row => `
            <tr class="border-b hover:bg-gray-50 text-xs">
                ${keys.map((key, idx) => {
                    const thKey = "th" + (idx + 1);
                    const val = row[headers[thKey]] || Object.values(row)[idx];

                    if (btnCols[thKey]) {
                        return `
                        <td class="px-4 py-2">
                            <button class="${btnCols[thKey]} text-xs">
                                ${val}
                            </button>
                        </td>`;
                    }

                    return `<td class="px-4 py-2">${val}</td>`;
                }).join("")}
            </tr>
        `).join("");

        wrapper.innerHTML = `
            <table class="min-w-full text-left text-xs">
                ${headerHTML}
                <tbody>${rowsHTML}</tbody>
            </table>
        `;

        this.addActionEvents();
    }

    // GRID
renderGrid() {
    const wrapper = this.querySelector("#gridWrapper");
    const rows = this.getPaginatedData();

    // Ensure only GRID classes are added without removing "hidden"
    wrapper.classList.add(
        "grid",
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-4",
        "gap-4",
        "p-4"
    );

    wrapper.innerHTML = rows.map(row => `
        <div class="rounded-2xl bg-white border overflow-hidden cursor-pointer transition hover:shadow"
             onclick="window.location.href='physical-security.html'">

            <!-- Thumbnail -->
            <div class="p-6 flex items-center justify-center bg-gray-100">
                <img src="images/img-frame.svg" class="w-14 h-14 opacity-80">
            </div>

            <!-- Content -->
            <div class="p-4 text-xs">

                <!-- Title -->
                <h3 class="text-sm font-semibold text-gray-900 mb-1">
                    ${row.Module}
                </h3>

                <!-- Language -->
                <p class="text-gray-500 mb-2 flex items-center gap-1">
                    <img src="images/eng.png" class="w-4 h-4">
                    ${row.Language.replace(/<[^>]+>/g, "")}
                </p>

                <!-- Description -->
                <p class="text-gray-500 leading-relaxed text-[11px] mb-3">
                    ${row.Description}
                </p>

                <!-- Edit Button -->
                <button class="flex items-center gap-2 px-3 py-1.5 rounded-md border text-[11px] font-medium bg-white hover:bg-gray-100 transition"
                        onclick="event.stopPropagation(); window.location.href='add-new-module-content.html'">
                    <img src="images/edit.svg" class="w-4 h-4"> Edit
                </button>

            </div>

        </div>
    `).join("");

    this.addActionEvents();
}



    // PAGINATION
    getPaginatedData() {
        const start = (this.currentPage - 1) * this.rowsPerPage;
        return this.filteredData.slice(start, start + this.rowsPerPage);
    }

    renderPagination() {
        const wrap = this.querySelector("#paginationWrapper");
        const totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);

        const perPage = `
            <select id="rowsPerPage" class="border rounded-lg px-2 py-1 text-xs">
                ${[5,10,15,20].map(n =>
                    `<option value="${n}" ${this.rowsPerPage === n ? "selected" : ""}>${n}</option>`
                ).join("")}
            </select>
        `;

        wrap.innerHTML = `
            <div class="text-gray-600 text-xs">
                Showing ${(this.currentPage - 1) * this.rowsPerPage + 1}–
                ${Math.min(this.currentPage * this.rowsPerPage, this.filteredData.length)}
                of ${this.filteredData.length}
            </div>

            <div>${perPage}</div>

            <div class="text-gray-600 text-xs">
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




const table = document.getElementById("subscriptionTable");

table.setData([
    {
        "Module": "Screen Saver 1",
        "Description": "A simple clean screen saver",
        "Language": ` <img src="images/eng.png" class="inline-block w-5 h-5 ml-2"> English`,
        "Thumbnail": `<img src="images/img-frame.svg" class="w-10 h-10">`,
        "Action": `
            <img src="images/Icon_Eye.svg" class="w-5 h-5 inline cursor-pointer mr-2">
            <img src="images/edit.svg" class="w-5 h-5 inline cursor-pointer">
        `
    },
    {
        "Module": "Promo Intro Video",
        "Description": "Short promotional intro",
        "Language": ` <img src="images/eng.png" class="inline-block w-5 h-5 ml-2"> English`,
        "Thumbnail": `<img src="images/img-frame.svg" class="w-10 h-10">`,
        "Action": `
            <img src="images/Icon_Eye.svg" class="w-5 h-5 inline cursor-pointer mr-2">
            <img src="images/edit.svg" class="w-5 h-5 inline cursor-pointer">
        `
    },
    {
        "Module": "HR Announcement",
        "Description": "Company-wide HR update",
        "Language": ` <img src="images/eng.png" class="inline-block w-5 h-5 ml-2"> English`,
        "Thumbnail": `<img src="images/img-frame.svg" class="w-10 h-10">`,
        "Action": `
            <img src="images/Icon_Eye.svg" class="w-5 h-5 inline cursor-pointer mr-2">
            <img src="images/edit.svg" class="w-5 h-5 inline cursor-pointer">
        `
    },
    {
        "Module": "Daily Tips",
        "Description": "Short daily motivational message",
        "Language": ` <img src="images/eng.png" class="inline-block w-5 h-5 ml-2"> English`,
        "Thumbnail": `<img src="images/img-frame.svg" class="w-10 h-10">`,
        "Action": `
            <img src="images/Icon_Eye.svg" class="w-5 h-5 inline cursor-pointer mr-2">
            <img src="images/edit.svg" class="w-5 h-5 inline cursor-pointer">
        `
    },
    {
        "Module": "Safety Guidelines",
        "Description": "Mandatory workplace safety rules",
        "Language": ` <img src="images/eng.png" class="inline-block w-5 h-5 ml-2"> English`,
        "Thumbnail": `<img src="images/img-frame.svg" class="w-10 h-10">`,
        "Action": `
            <img src="images/Icon_Eye.svg" class="w-5 h-5 inline cursor-pointer mr-2">
            <img src="images/edit.svg" class="w-5 h-5 inline cursor-pointer">
        `
    }
]);
