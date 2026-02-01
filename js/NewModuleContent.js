// Active classes used for selected card
const ACTIVE = [
  "border-[#BFE7FF]",
  "bg-[#F5FBFF]",
];

// Card click (hard-coded cards)
function cardClicked(el) {
  document
    .querySelectorAll(".content-card")
    .forEach((c) => c.classList.remove(...ACTIVE));
  el.classList.add(...ACTIVE);
  const type = el.dataset.type;
  showUploadForm(type);
}

// Auto select first card on load
window.addEventListener("DOMContentLoaded", () => {
  if (window.ModernDropdown) {
    new ModernDropdown();
  }

  const first =
    document.querySelector('.content-card[data-type="iSpring"]') ||
    document.querySelector(".content-card");
  if (first) {
    first.classList.add(...ACTIVE);
    showUploadForm(first.dataset.type);
  }
});

// showUploadForm A3: replaces leftForm content entirely
function showUploadForm(type) {
  document.getElementById("uploadTitle").textContent = `Upload ${type}`;
  setLogoPlaceholder();
  setFilePlaceholder();
  const leftForm = document.getElementById("leftForm");

  if (type === "Quiz") leftForm.innerHTML = quizFormHtml(type);
  else leftForm.innerHTML = defaultFormHtml(type);

  setTimeout(bindDynamicFormListeners, 30);
}

// 40% SMALLER UI below — no logic changed

function defaultFormHtml(type) {
  return `
        <form id="contentFormDynamic" class="space-y-3">
          <input type="hidden" id="contentType" name="contentType" value="${type}">
          <label class="block text-xs text-gray-600">Content Name</label>
          <input id="contentName" name="name" type="text"
            placeholder="Enter content name"
            class="input-field">

          <label class="block text-xs text-gray-600">Description</label>
          <textarea id="contentDesc" name="description" rows="2"
            placeholder="Write your module description"
            class="input-field"></textarea>

          <label class="block text-xs text-gray-600">Logo</label>
          <div class="  rounded-lg p-2">
            <div class="flex items-center gap-2 bg-white p-2">
              <div class="icon-circle text-gray-500">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="3"/></svg>
              </div>
              <div class="flex-1 text-[10px] leading-tight">
                <div class="font-medium text-gray-700">Upload Your Logo Here</div>
                <div class="text-gray-400 text-[9px]">PNG/JPG only</div>
              </div>
              <label id="logoUploadPill" class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Choose
                <input id="logoUploadInput" type="file" accept="image/*" class="hidden">
              </label>
            </div>
          </div>

          <div class="flex items-center gap-1 mt-1">
            <label class="cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full border bg-blue-50 border-blue-100 text-blue-600 text-[10px]">
              <input id="radioUpload" type="radio" name="uploadType" value="upload" checked class="w-3 h-3 accent-blue-500">
              <span id="spanUpload">
                Upload File
              </span>
            </label>
            <label class="cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full   text-gray-600 text-[10px]">
              <input id="radioUrl" type="radio" name="uploadType" value="url" class="w-3 h-3 accent-blue-500">
              <span id="spanUrl">
                Provide URL
              </span>
            </label>
          </div>

          <div id="fileUploadWrapper" class="  rounded-lg p-2">
            <div class="flex items-center gap-2 bg-white p-2">
              <div class="icon-circle text-gray-500">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="3"/></svg>
              </div>
              <div class="flex-1 text-[10px] leading-tight">
                <div class="font-medium text-gray-700">Upload Your File</div>
                <div class="text-gray-400 text-[9px]">Any format</div>
              </div>
              <label id="contentUploadPill" class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Choose
                <input id="contentFileInput" type="file" class="hidden">
              </label>
            </div>
          </div>

          <div id="fileUrlWrapper" class="hidden">
            <label class="block text-xs text-gray-600">Enter URL</label>
            <input id="fileUrlInput" type="url"
              placeholder="https://example.com"
              class="input-field">
          </div>

          <div>
            <label class="block text-xs text-gray-600 mb-1">Status</label>
            <div class="flex items-center gap-1">
              <label class="cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full border bg-blue-50 border-blue-100 text-blue-600 text-[10px]">
                <input type="radio" name="status" value="active" checked class="w-3 h-3 accent-blue-500">
                <span>Active</span>
              </label>
              <label class="cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full   text-gray-600 text-[10px]">
                <input type="radio" name="status" value="inactive" class="w-3 h-3 accent-blue-500">
                <span>Deactivate</span>
              </label>
            </div>
          </div>
        </form>
      `;
}

function quizFormHtml(type) {
  return `
        <form id="contentFormDynamic" class="space-y-3">
          <input type="hidden" id="contentType" name="contentType" value="${type}">

          <label class="block text-xs text-gray-600">Content Name</label>
          <input id="contentName" name="name" type="text"
            placeholder="Enter content name"
            class="input-field">

          <label class="block text-xs text-gray-600">Description</label>
          <textarea id="contentDesc" name="description" rows="2"
            placeholder="Write your module description"
            class="input-field"></textarea>

          <label class="block text-xs text-gray-600">Logo</label>
          <div class="  rounded-lg p-2">
            <div class="flex items-center gap-2 bg-white p-2">
              <div class="icon-circle text-gray-500">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="3"/></svg>
              </div>
              <div class="flex-1 text-[10px] leading-tight">
                <div class="font-medium text-gray-700">Upload Your Logo Here</div>
                <div class="text-gray-400 text-[9px]">PNG/JPG only</div>
              </div>
              <label class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12"/><path d="M5 10l7-7 7 7"/></svg>
                Choose
                <input id="logoUploadInput" type="file" accept="image/*" class="hidden">
              </label>
            </div>
          </div>

          <div>
            <div class="font-medium text-[10px] mb-1">Quiz Upload Options</div>
            <div class="  rounded-lg p-2">
              <div class="flex items-center gap-2 bg-white p-2">
                <div class="icon-circle text-gray-500">
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12"/><path d="M5 10l7-7 7 7"/></svg>
                </div>
                <div class="flex-1 text-[10px] leading-tight">
                  <div class="font-medium text-gray-700">Import Excel File</div>
                  <div class="text-gray-400 text-[9px]">Upload .xls or .xlsx</div>
                </div>
                <label id="contentUploadPill" class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Choose
                  <input id="contentFileInput" type="file" accept=".xlsx,.xls" class="hidden">
                </label>
              </div>
            </div>

            <div class="mt-2 text-[10px]">OR
              <a href="quiz-form.html" target="_blank" class="text-blue-500 underline">Go to Quiz Form</a>
            </div>
          </div>

          <div>
            <label class="block text-xs text-gray-600 mb-1">Status</label>
            <div class="flex items-center gap-1">
              <label class="cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full border bg-blue-50 border-blue-100 text-blue-600 text-[10px]">
                <input type="radio" name="status" value="active" checked class="w-3 h-3 accent-blue-500">
                <span>Active</span>
              </label>
              <label class="cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full   text-gray-600 text-[10px]">
                <input type="radio" name="status" value="inactive" class="w-3 h-3 accent-blue-500">
                <span>Deactivate</span>
              </label>
            </div>
          </div>
        </form>
      `;
}

// (Listeners, preview handling, and helper functions remain unchanged — UI unaffected)

function convertPillToRemove(pill, onRemove) {
  if (!pill) return;
  
  // Store the file input for later
  const fileInput = pill.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.style.display = 'none';
  }
  
  // Change to remove button
  pill.className = 'remove-pill px-2 py-1 text-[10px] cursor-pointer flex items-center gap-1 bg-red-50 text-red-600 rounded-full';
  pill.innerHTML = `
    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 18L18 6M6 6l12 12"/>
    </svg>
    Remove
  `;
  
  // Remove label functionality and add click handler
  pill.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove();
  };
  
  // Remove for attribute if it exists
  pill.removeAttribute('for');
}

function convertPillToUpload(pill, fileInput) {
  if (!pill) return;
  
  // Change back to upload button
  pill.className = 'inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50';
  pill.innerHTML = `
    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 3v12"/><path d="M5 10l7-7 7 7"/>
    </svg>
    Choose
  `;
  
  // Re-append the file input
  if (fileInput) {
    fileInput.style.display = '';
    pill.appendChild(fileInput);
  }
  
  // Remove click handler
  pill.onclick = null;
}

function bindDynamicFormListeners() {
  const radioUpload = document.getElementById("radioUpload");
  const radioUrl = document.getElementById("radioUrl");
  const fileUploadWrapper = document.getElementById("fileUploadWrapper");
  const fileUrlWrapper = document.getElementById("fileUrlWrapper");

  if (radioUpload && radioUrl) {
    const updateToggleUI = () => {
      const uploadLabel = radioUpload.closest('label');
      const urlLabel = radioUrl.closest('label');
      
      if (radioUpload.checked) {
        if (uploadLabel) uploadLabel.className = "cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full border bg-blue-50 border-blue-100 text-blue-600 text-[10px]";
        if (urlLabel) urlLabel.className = "cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full   text-gray-600 text-[10px]";
        if (fileUploadWrapper) fileUploadWrapper.classList.remove("hidden");
        if (fileUrlWrapper) fileUrlWrapper.classList.add("hidden");
      } else {
        if (urlLabel) urlLabel.className = "cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full border bg-blue-50 border-blue-100 text-blue-600 text-[10px]";
        if (uploadLabel) uploadLabel.className = "cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full   text-gray-600 text-[10px]";
        if (fileUploadWrapper) fileUploadWrapper.classList.add("hidden");
        if (fileUrlWrapper) fileUrlWrapper.classList.remove("hidden");
      }
    };

    radioUpload.addEventListener("change", updateToggleUI);
    radioUrl.addEventListener("change", updateToggleUI);
    radioUpload.addEventListener("click", updateToggleUI);
    radioUrl.addEventListener("click", updateToggleUI);
    updateToggleUI();
  }

  const statusInputs = document.querySelectorAll('input[name="status"]');
  if (statusInputs.length) {
    const updateStatusUI = () => {
      statusInputs.forEach((input) => {
        const label = input.closest('label');
        if (!label) return;
        if (input.checked) {
          label.className = "cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full border bg-blue-50 border-blue-100 text-blue-600 text-[10px]";
        } else {
          label.className = "cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full   text-gray-600 text-[10px]";
        }
      });
    };

    statusInputs.forEach((input) => input.addEventListener("change", updateStatusUI));
    updateStatusUI();
  }

  // File upload preview
  const contentFileInput = document.getElementById("contentFileInput");
  const contentUploadPill = document.getElementById("contentUploadPill");
  if (contentFileInput && contentUploadPill) {
    contentFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFilePreview(file);
        addRemoveButton('filePreview', () => {
          contentFileInput.value = '';
          setFilePlaceholder();
          convertPillToUpload(contentUploadPill, contentFileInput);
        });
        convertPillToRemove(contentUploadPill, () => {
          contentFileInput.value = '';
          setFilePlaceholder();
          convertPillToUpload(contentUploadPill, contentFileInput);
        });
      }
    });
  }

  // Logo upload preview
  const logoUploadInput = document.getElementById("logoUploadInput");
  const logoUploadPill = document.getElementById("logoUploadPill");
  if (logoUploadInput && logoUploadPill) {
    logoUploadInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          document.getElementById('logoPreview').innerHTML = 
            `<img src="${event.target.result}" class="max-w-full max-h-full object-contain rounded-lg" alt="Logo Preview">`;
          addRemoveButton('logoPreview', () => {
            logoUploadInput.value = '';
            setLogoPlaceholder();
            convertPillToUpload(logoUploadPill, logoUploadInput);
          });
          convertPillToRemove(logoUploadPill, () => {
            logoUploadInput.value = '';
            setLogoPlaceholder();
            convertPillToUpload(logoUploadPill, logoUploadInput);
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // URL input preview
  const fileUrlInput = document.getElementById("fileUrlInput");
  if (fileUrlInput) {
    fileUrlInput.addEventListener("input", (e) => {
      const url = e.target.value;
      updatePreviewFromUrl(url);
    });
    fileUrlInput.addEventListener("paste", (e) => {
      setTimeout(() => {
        const url = e.target.value;
        updatePreviewFromUrl(url);
        if (url.trim()) {
          addRemoveButton('filePreview', () => {
            fileUrlInput.value = '';
            setFilePlaceholder();
          });
        }
      }, 10);
    });
    fileUrlInput.addEventListener("blur", (e) => {
      const url = e.target.value;
      if (url) {
        updatePreviewFromUrl(url);
        addRemoveButton('filePreview', () => {
          fileUrlInput.value = '';
          setFilePlaceholder();
        });
      }
    });
  }
}

function convertPillToRemove(pill, onRemove) {
  if (!pill) return;
  
  // Store the file input for later
  const fileInput = pill.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.style.display = 'none';
  }
  
  // Change to remove button
  pill.className = 'remove-pill px-2 py-1 text-[10px] cursor-pointer flex items-center gap-1 bg-red-50 text-red-600 rounded-full';
  pill.innerHTML = `
    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 18L18 6M6 6l12 12"/>
    </svg>
    Remove
  `;
  
  // Remove label functionality and add click handler
  pill.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove();
  };
  
  // Remove for attribute if it exists
  pill.removeAttribute('for');
}

function convertPillToUpload(pill, fileInput) {
  if (!pill) return;
  
  // Change back to upload button
  pill.className = 'inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50';
  pill.innerHTML = `
    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 3v12"/><path d="M5 10l7-7 7 7"/>
    </svg>
    Choose
  `;
  
  // Re-append the file input
  if (fileInput) {
    fileInput.style.display = '';
    pill.appendChild(fileInput);
  }
  
  // Remove click handler
  pill.onclick = null;
}

function addRemoveButton(previewId, onRemove) {
  const preview = document.getElementById(previewId);
  if (!preview) return;
  
  // Remove existing button if any
  const existingBtn = preview.querySelector('.remove-preview-btn');
  if (existingBtn) existingBtn.remove();
  
  // Add remove button
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-preview-btn absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all z-10';
  removeBtn.innerHTML = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M6 18L18 6M6 6l12 12"/>
  </svg>`;
  removeBtn.onclick = (e) => {
    e.preventDefault();
    onRemove();
  };
  
  preview.style.position = 'relative';
  preview.appendChild(removeBtn);
}

function handleFilePreview(file) {
  if (!file) return;

  const fileType = file.type;
  const fileName = file.name;
  const fileExt = fileName.split('.').pop().toLowerCase();
  
  // Image preview
  if (fileType.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('filePreview').innerHTML = 
        `<img src="${e.target.result}" class="max-w-full max-h-full object-contain rounded-lg" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  }
  // Video preview
  else if (fileType.startsWith('video/') || ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(fileExt)) {
    const videoUrl = URL.createObjectURL(file);
    document.getElementById('filePreview').innerHTML = 
      `<video controls class="max-w-full max-h-full rounded-lg">
        <source src="${videoUrl}" type="${fileType || 'video/mp4'}">
        Your browser does not support video preview.
      </video>`;
  }
  // PDF preview
  else if (fileType === 'application/pdf' || fileExt === 'pdf') {
    const pdfUrl = URL.createObjectURL(file);
    document.getElementById('filePreview').innerHTML = 
      `<iframe src="${pdfUrl}" class="w-full h-full min-h-[300px] rounded-lg border-0"></iframe>`;
  }
  // Document files (Word, Excel, PowerPoint)
  else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExt)) {
    const icon = fileExt.includes('doc') ? '📄' : fileExt.includes('xls') ? '📊' : '📽️';
    document.getElementById('filePreview').innerHTML = 
      `<div class="flex flex-col items-center justify-center gap-2">
        <div class="text-5xl">${icon}</div>
        <div class="text-xs text-gray-600 font-medium">${fileName}</div>
        <div class="text-[10px] text-gray-400">${(file.size / 1024).toFixed(2)} KB</div>
      </div>`;
  }
  // Generic file preview
  else {
    document.getElementById('filePreview').innerHTML = 
      `<div class="flex flex-col items-center justify-center gap-2">
        <svg class="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <div class="text-xs text-gray-600 font-medium">${fileName}</div>
        <div class="text-[10px] text-gray-400">${(file.size / 1024).toFixed(2)} KB</div>
      </div>`;
  }
}

function updatePreviewFromUrl(url) {
  if (!url || !url.trim()) {
    setFilePlaceholder();
    return;
  }

  url = url.trim();
  
  // Check if it's an image URL
  if (/\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?|$)/i.test(url)) {
    document.getElementById('filePreview').innerHTML = 
      `<img src="${url}" class="max-w-full max-h-full object-contain rounded-lg" alt="Preview" 
        onerror="this.parentElement.innerHTML='<div class=\\'text-xs text-red-500\\'>Failed to load image</div>'">`;
  }
  // Check if it's a video URL
  else if (/\.(mp4|webm|ogg|avi|mov)(\?|$)/i.test(url)) {
    document.getElementById('filePreview').innerHTML = 
      `<video controls class="max-w-full max-h-full rounded-lg">
        <source src="${url}" type="video/mp4">
        Your browser does not support video preview.
      </video>`;
  }
  // Check if it's a PDF URL
  else if (/\.pdf(\?|$)/i.test(url)) {
    document.getElementById('filePreview').innerHTML = 
      `<iframe src="${url}" class="w-full h-full min-h-[300px] rounded-lg border-0"></iframe>`;
  }
  // YouTube, Vimeo, or other embed links
  else if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    if (videoId) {
      document.getElementById('filePreview').innerHTML = 
        `<iframe src="https://www.youtube.com/embed/${videoId}" 
          class="w-full h-full min-h-[300px] rounded-lg" 
          frameborder="0" allowfullscreen></iframe>`;
    } else {
      showGenericUrlPreview(url);
    }
  }
  else if (url.includes('vimeo.com')) {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
    if (videoId) {
      document.getElementById('filePreview').innerHTML = 
        `<iframe src="https://player.vimeo.com/video/${videoId}" 
          class="w-full h-full min-h-[300px] rounded-lg" 
          frameborder="0" allowfullscreen></iframe>`;
    } else {
      showGenericUrlPreview(url);
    }
  }
  // Generic URL preview
  else {
    showGenericUrlPreview(url);
  }
}

function showGenericUrlPreview(url) {
  document.getElementById('filePreview').innerHTML = 
    `<div class="flex flex-col items-center justify-center gap-2">
      <svg class="w-12 h-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
      </svg>
      <div class="text-xs text-gray-600 font-medium break-all text-center px-4">${url}</div>
      <a href="${url}" target="_blank" class="text-[10px] text-blue-500 underline">Open in new tab</a>
    </div>`;
}

function setLogoPlaceholder() {
  document.getElementById(
    "logoPreview"
  ).innerHTML = `<svg class="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5-7 7"/></svg>`;
}
function setFilePlaceholder() {
  document.getElementById(
    "filePreview"
  ).innerHTML = `<svg class="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5-7 7"/></svg>`;
}

// expose debug helpers unchanged
window._upload = { updatePreviewFromUrl, handleFilePreview };
