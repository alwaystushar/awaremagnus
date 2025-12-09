/* -----------------------
    TRANSLATION BLOCK TEMPLATE (20% smaller UI + textarea fix)
----------------------- */
function createTranslationBlock(lang) {
  return `
    <div class="border border-gray-200 rounded-xl p-4">

      <h3 class="font-semibold text-base mb-3 flex items-center gap-1.5">
        <img src="images/lang-icon.svg" class="w-4 h-4 opacity-60" />
        Translation - ${lang}
      </h3>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- LEFT -->
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 mb-1 font-medium text-sm">Name</label>
            <input type="text" data-lang="${lang}-name"
                   placeholder="Enter Template Name"
                   class="w-full p-2 border border-gray-200 rounded-lg text-sm" />
          </div>

          <div>
            <label class="block text-gray-700 mb-1 font-medium text-sm">Description</label>

            <!-- FIXED TEXTAREA -->
            <textarea data-lang="${lang}-desc"
                      placeholder="Write your module description"
                      class="w-full min-h-24 p-3 border border-gray-200 rounded-lg text-sm resize-y"></textarea>

          </div>
        </div>

        <!-- RIGHT LOGO UPLOAD -->
        <div>
          <p class="font-medium text-gray-700 mb-1 text-sm">Upload Your Logo <span class="text-[10px]">(PNG, JPEG)</span></p>

          <div class="border-2 border-dashed border-gray-300 rounded-xl p-4 h-36 flex items-center justify-center bg-gray-50">
            <img data-preview="${lang}" src="images/placeholder-img.svg" class="w-10 opacity-40">
          </div>

          <!-- FULL WIDTH UPLOAD BUTTON -->
          <button 
            class="uploadBtn flex items-center justify-center gap-1 mt-2
                   bg-white border border-gray-200 rounded-full 
                   px-4 py-1.5 text-gray-700 hover:bg-gray-50 
                   text-sm w-full"
            data-input="${lang}">
            <img src="images/upload.svg" class="w-4 opacity-70" />
            Upload
          </button>

          <input type="file" class="hidden logoInput" data-logo="${lang}" accept="image/*" />
        </div>
      </div>
    </div>
  `;
}

/* -----------------------
    INITIALIZE DEFAULT LANGUAGES
----------------------- */
const translationContainer = document.getElementById("translationContainer");

// Add English + Arabic by default
["English", "Arabic"].forEach(lang => {
  translationContainer.insertAdjacentHTML("beforeend", createTranslationBlock(lang));
});

/* -----------------------
    HANDLE UPLOAD BUTTONS
----------------------- */
document.addEventListener("click", function (e) {
  if (e.target.closest(".uploadBtn")) {
    let lang = e.target.closest(".uploadBtn").dataset.input;
    document.querySelector(`input[data-logo="${lang}"]`).click();
  }
});

/* -----------------------
    PREVIEW LOGO
----------------------- */
document.addEventListener("change", function (e) {
  if (e.target.classList.contains("logoInput")) {
    const lang = e.target.dataset.logo;
    const previewImg = document.querySelector(`img[data-preview="${lang}"]`);

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => previewImg.src = reader.result;
    reader.readAsDataURL(file);
  }
});

/* -----------------------
    ADD TRANSLATION BUTTON
----------------------- */
document.getElementById("addTranslationBtn").onclick = () => {
  const checked = [...document.querySelectorAll(".langCheck:checked")].map(i => i.value);
  const existing = [...document.querySelectorAll("[data-preview]")].map(i => i.dataset.preview);

  const remaining = checked.filter(lang => !existing.includes(lang));

  if (remaining.length === 0) {
    alert("All selected languages already added.");
    return;
  }

  translationContainer.insertAdjacentHTML("beforeend", createTranslationBlock(remaining[0]));
};

/* -----------------------
    SUBMIT HANDLER
----------------------- */
document.getElementById("submitBtn").onclick = () => {
  let data = {
    moduleName: document.getElementById("moduleName").value,
    creationDay: document.getElementById("creationDay").value,
    category: document.getElementById("category").value,
    translations: []
  };

  document.querySelectorAll("[data-preview]").forEach(pre => {
    let lang = pre.dataset.preview;

    data.translations.push({
      lang,
      name: document.querySelector(`[data-lang="${lang}-name"]`).value,
      desc: document.querySelector(`[data-lang="${lang}-desc"]`).value,
    });
  });

  console.log("FORM DATA:", data);
  alert("Form submitted! Check console for details.");
};

/* -----------------------
    CANCEL HANDLER
----------------------- */
document.getElementById("cancelBtn").onclick = () => {
  window.location.reload();
};
