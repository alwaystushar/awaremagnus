   function openModal() {
      document.getElementById("popup").classList.remove("hidden");
    }
    function closeModal() {
      document.getElementById("popup").classList.add("hidden");
    }

    // Toggle all checkboxes in a table
    function toggleAll(master, cls) {
      let checkboxes = document.querySelectorAll("." + cls);
      checkboxes.forEach(cb => cb.checked = master.checked);
    }

    // Toggle checkbox when row is clicked
    function toggleRowCheckbox(row) {
      let checkbox = row.querySelector("input[type='checkbox']");
      if (event.target.tagName !== "INPUT") { // avoid double toggle if clicking on checkbox directly
        checkbox.checked = !checkbox.checked;
      }
    }

    // Move Enrolled → Unenrolled
    function moveToUnenrolled() {
      let enrolledTable = document.querySelector("#enrolledTable tbody");
      let unenrolledTable = document.querySelector("#unenrolledTable tbody");
      let rows = [...enrolledTable.querySelectorAll("tr")];

      rows.forEach(row => {
        let cb = row.querySelector(".enrolledCheckbox");
        if (cb && cb.checked) {
          cb.checked = false;
          cb.classList.remove("enrolledCheckbox");
          cb.classList.add("unenrolledCheckbox");
          unenrolledTable.appendChild(row);
        }
      });
    }

    // Move Unenrolled → Enrolled
    function moveToEnrolled() {
      let enrolledTable = document.querySelector("#enrolledTable tbody");
      let unenrolledTable = document.querySelector("#unenrolledTable tbody");
      let rows = [...unenrolledTable.querySelectorAll("tr")];

      rows.forEach(row => {
        let cb = row.querySelector(".unenrolledCheckbox");
        if (cb && cb.checked) {
          cb.checked = false;
          cb.classList.remove("unenrolledCheckbox");
          cb.classList.add("enrolledCheckbox");
          enrolledTable.appendChild(row);
        }
      });
    }

    // Search filter for tables
    function filterTable(searchId, tableId) {
      let input = document.getElementById(searchId).value.toLowerCase();
      let rows = document.getElementById(tableId).getElementsByTagName("tbody")[0].getElementsByTagName("tr");

      for (let i = 0; i < rows.length; i++) {
        let text = rows[i].innerText.toLowerCase();
        rows[i].style.display = text.includes(input) ? "" : "none";
      }
    }