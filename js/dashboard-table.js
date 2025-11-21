    const sampleRows = [
      { name: "Campaign 23-06", startDate: "23 July 2025", dueDate: "23 July 2025", badge: "fire", experience: "Experienced" },
      { name: "Campaign 23-07", startDate: "24 July 2025", dueDate: "24 July 2025", badge: "fire", experience: "Experienced" },
      { name: "Campaign 23-08", startDate: "25 July 2025", dueDate: "25 July 2025", badge: "fire", experience: "Experienced" },
      { name: "Campaign 23-09", startDate: "26 July 2025", dueDate: "26 July 2025", badge: "fire", experience: "Experienced" },
      { name: "Campaign 23-10", startDate: "27 July 2025", dueDate: "27 July 2025", badge: "fire", experience: "Experienced" },
      { name: "Campaign 23-11", startDate: "28 July 2025", dueDate: "28 July 2025", badge: "fire", experience: "Experienced" },
      { name: "Campaign 23-12", startDate: "29 July 2025", dueDate: "29 July 2025", badge: "fire", experience: "Experienced" },
      { name: "Campaign 23-13", startDate: "30 July 2025", dueDate: "30 July 2025", badge: "fire", experience: "Experienced" },
      { name: "Campaign 23-14", startDate: "31 July 2025", dueDate: "31 July 2025", badge: "fire", experience: "Experienced" },
      { name: "Campaign 23-15", startDate: "01 Aug 2025", dueDate: "01 Aug 2025", badge: "fire", experience: "Experienced" }
    ];

    const highState = { data: [...sampleRows], page: 1, perPage: 5 };
    const lowState = { data: [...sampleRows].reverse(), page: 1, perPage: 5 };

    function renderTable(state, bodyId, showingId, pageId) {
      const body = document.getElementById(bodyId);
      const showing = document.getElementById(showingId);
      const pageNums = document.getElementById(pageId);

      const total = state.data.length;
      const totalPages = Math.ceil(total / state.perPage);
      const start = (state.page - 1) * state.perPage;
      const pageRows = state.data.slice(start, start + state.perPage);

      body.innerHTML = pageRows.map(r => `
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4">${r.name}</td>
          <td class="px-6 py-4">${r.startDate}</td>
          <td class="px-6 py-4">${r.dueDate}</td>
          <td class="px-6 py-4">
            <div class="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
              <span class="text-purple-500 text-lg">🔥</span>
            </div>
          </td>
          <td class="px-6 py-4">
            <span class="px-3 py-1 rounded-full text-green-600 border border-green-400 bg-green-50">
              ${r.experience}
            </span>
          </td>
        </tr>
      `).join("");

      showing.textContent = `Showing ${start + 1}–${Math.min(start + state.perPage, total)} out of ${total} Entries`;

      pageNums.innerHTML = "";
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = `w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 ${i === state.page ? "bg-green-50 border-green-400 text-green-600" : ""}`;
        btn.onclick = () => { state.page = i; renderAll(); };
        pageNums.appendChild(btn);
      }
    }

    function sortTable(state, key) {
      state.data.sort((a, b) => a[key].localeCompare(b[key]));
      state.page = 1;
      renderAll();
    }

    document.getElementById("sortHigh").onchange = (e) => {
      if (e.target.value !== "default") sortTable(highState, e.target.value);
    };

    document.getElementById("sortLow").onchange = (e) => {
      if (e.target.value !== "default") sortTable(lowState, e.target.value);
    };

    document.getElementById("highPrev").onclick = () => { highState.page--; renderAll(); };
    document.getElementById("highNext").onclick = () => { highState.page++; renderAll(); };

    document.getElementById("lowPrev").onclick = () => { lowState.page--; renderAll(); };
    document.getElementById("lowNext").onclick = () => { lowState.page++; renderAll(); };

    function renderAll() {
      renderTable(highState, "highBody", "highShowing", "highPageNums");
      renderTable(lowState, "lowBody", "lowShowing", "lowPageNums");
    }

    renderAll();