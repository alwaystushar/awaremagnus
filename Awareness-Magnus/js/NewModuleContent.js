  // Active classes used for selected card
    const ACTIVE = ['border-[#BFE7FF]','shadow-lg','scale-[1.02]','bg-[#F5FBFF]'];

    // Card click (hard-coded cards)
    function cardClicked(el) {
      document.querySelectorAll('.content-card').forEach(c => c.classList.remove(...ACTIVE));
      el.classList.add(...ACTIVE);
      const type = el.dataset.type;
      showUploadForm(type);
    }

    // Auto select first card on load
    window.addEventListener('DOMContentLoaded', () => {
      const first = document.querySelector('.content-card[data-type="iSpring"]') || document.querySelector('.content-card');
      if (first) {
        first.classList.add(...ACTIVE);
        showUploadForm(first.dataset.type);
      }
    });

    // showUploadForm A3: replaces leftForm content entirely
    function showUploadForm(type) {
      document.getElementById('uploadTitle').textContent = `Upload ${type}`;
      setLogoPlaceholder();
      setFilePlaceholder();
      const leftForm = document.getElementById('leftForm');

      if (type === 'Quiz') leftForm.innerHTML = quizFormHtml(type);
      else leftForm.innerHTML = defaultFormHtml(type);

      // small timeout to ensure nodes exist then bind handlers
      setTimeout(bindDynamicFormListeners, 30);
    }

    // Default form HTML
    function defaultFormHtml(type) {
      return `
        <form id="contentFormDynamic" class="space-y-5">
          <input type="hidden" id="contentType" name="contentType" value="${type}">
          <label class="block text-sm text-gray-600">Content Name</label>
          <input id="contentName" name="name" type="text" placeholder="Enter content name" class="w-full p-3 rounded-xl border border-gray-200 text-sm">

          <label class="block text-sm text-gray-600">Description</label>
          <textarea id="contentDesc" name="description" rows="4" placeholder="Write your module description" class="w-full p-3 rounded-xl border border-gray-200 text-sm"></textarea>

          <label class="block text-sm text-gray-600">Logo</label>
          <div class="border border-gray-200 rounded-2xl p-3">
            <div class="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
              <div class="icon-circle text-gray-500">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="3"/></svg>
              </div>
              <div class="flex-1 text-xs">
                <div class="font-medium text-gray-700">Upload Your Logo Here</div>
                <div class="text-gray-400 text-xs">Upload PNG or JPG format logo here</div>
              </div>
              <label class="upload-pill px-4 py-2 text-sm cursor-pointer flex items-center gap-2">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12"/><path d="M5 10l7-7 7 7"/></svg>
                Choose File
                <input id="logoUploadInput" type="file" accept="image/*" class="hidden">
              </label>
            </div>
          </div>

          <div class="flex items-center gap-3 mt-1">
            <label class="cursor-pointer">
              <input id="radioUpload" type="radio" name="uploadType" value="upload" checked class="hidden">
              <span id="spanUpload" class="px-4 py-2 rounded-full border bg-blue-50 border-blue-100 text-blue-600 text-sm">Upload File</span>
            </label>
            <label class="cursor-pointer">
              <input id="radioUrl" type="radio" name="uploadType" value="url" class="hidden">
              <span id="spanUrl" class="px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm">Provide URL</span>
            </label>
          </div>

          <div id="fileUploadWrapper" class="file-upload-wrapper border border-gray-200 rounded-2xl p-3">
            <div class="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
              <div class="icon-circle text-gray-500">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="3"/></svg>
              </div>
              <div class="flex-1 text-xs">
                <div class="font-medium text-gray-700">Upload Your File Here</div>
                <div class="text-gray-400 text-xs">Upload any format file here</div>
              </div>
              <label class="upload-pill px-4 py-2 text-sm cursor-pointer flex items-center gap-2">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12"/><path d="M5 10l7-7 7 7"/></svg>
                Choose File
                <input id="contentFileInput" type="file" class="hidden">
              </label>
            </div>
          </div>

          <div id="fileUrlWrapper" class="hidden">
            <label class="block text-sm text-gray-600">Enter URL</label>
            <input id="fileUrlInput" type="url" placeholder="https://example.com" class="w-full p-3 rounded-xl border border-gray-200 text-sm">
          </div>

          <div>
            <label class="block text-sm text-gray-600 mb-2">Status</label>
            <div class="flex items-center gap-3">
              <label class="cursor-pointer">
                <input type="radio" name="status" value="active" checked class="hidden">
                <span class="px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm">Active</span>
              </label>
              <label class="cursor-pointer">
                <input type="radio" name="status" value="inactive" class="hidden">
                <span class="px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm">Deactivate</span>
              </label>
            </div>
          </div>
        </form>
      `;
    }

    // Quiz form HTML
    function quizFormHtml(type) {
      return `
        <form id="contentFormDynamic" class="space-y-5">
          <input type="hidden" id="contentType" name="contentType" value="${type}">
          <label class="block text-sm text-gray-600">Content Name</label>
          <input id="contentName" name="name" type="text" placeholder="Enter content name" class="w-full p-3 rounded-xl border border-gray-200 text-sm">

          <label class="block text-sm text-gray-600">Description</label>
          <textarea id="contentDesc" name="description" rows="4" placeholder="Write your module description" class="w-full p-3 rounded-xl border border-gray-200 text-sm"></textarea>

          <label class="block text-sm text-gray-600">Logo</label>
          <div class="border border-gray-200 rounded-2xl p-3">
            <div class="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
              <div class="icon-circle text-gray-500">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="3"/></svg>
              </div>
              <div class="flex-1 text-xs">
                <div class="font-medium text-gray-700">Upload Your Logo Here</div>
                <div class="text-gray-400 text-xs">Upload PNG or JPG format logo here</div>
              </div>
              <label class="upload-pill px-4 py-2 text-sm cursor-pointer flex items-center gap-2">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12"/><path d="M5 10l7-7 7 7"/></svg>
                Choose File
                <input id="logoUploadInput" type="file" accept="image/*" class="hidden">
              </label>
            </div>
          </div>

          <div>
            <div class="font-medium text-sm mb-2">Quiz Upload Options</div>
            <div class="file-upload-wrapper border border-gray-200 rounded-2xl p-3">
              <div class="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
                <div class="icon-circle text-gray-500">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12"/><path d="M5 10l7-7 7 7"/></svg>
                </div>
                <div class="flex-1 text-xs">
                  <div class="font-medium text-gray-700">Import Excel File</div>
                  <div class="text-gray-400 text-xs">Upload .xlsx or .xls file</div>
                </div>
                <label class="upload-pill px-4 py-2 text-sm cursor-pointer flex items-center gap-2">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12"/><path d="M5 10l7-7 7 7"/></svg>
                  Choose File
                  <input id="contentFileInput" type="file" accept=".xlsx,.xls" class="hidden">
                </label>
              </div>
            </div>

            <div class="mt-3 text-sm">OR <a href="quiz-form.html" target="_blank" class="text-blue-500 underline">Go to Quiz Form</a></div>
          </div>

          <div>
            <label class="block text-sm text-gray-600 mb-2">Status</label>
            <div class="flex items-center gap-3">
              <label class="cursor-pointer">
                <input type="radio" name="status" value="active" checked class="hidden">
                <span class="px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm">Active</span>
              </label>
              <label class="cursor-pointer">
                <input type="radio" name="status" value="inactive" class="hidden">
                <span class="px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm">Deactivate</span>
              </label>
            </div>
          </div>
        </form>
      `;
    }

    // Bind listeners for inputs generated dynamically
    function bindDynamicFormListeners() {
      const logoInput = document.getElementById('logoUploadInput');
      const contentFileInput = document.getElementById('contentFileInput');
      const fileUrlInput = document.getElementById('fileUrlInput');
      const radioUpload = document.getElementById('radioUpload');
      const radioUrl = document.getElementById('radioUrl');

      if (logoInput) {
        logoInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (!file) return setLogoPlaceholder();
          const reader = new FileReader();
          reader.onload = () => {
            document.getElementById('logoPreview').innerHTML = `<img src="${reader.result}" class="max-w-full max-h-[140px] object-contain rounded-xl">`;
          };
          reader.readAsDataURL(file);
        });
      }

      if (contentFileInput) {
        contentFileInput.addEventListener('change', (e) => {
          const f = e.target.files[0]; handleFilePreview(f);
        });
      }

      if (fileUrlInput) {
        fileUrlInput.addEventListener('input', (e) => updatePreviewFromUrl(e.target.value.trim()));
      }

      if (radioUpload && radioUrl) {
        const fileWrap = document.getElementById('fileUploadWrapper');
        const urlWrap = document.getElementById('fileUrlWrapper');
        const spanUpload = document.getElementById('spanUpload');
        const spanUrl = document.getElementById('spanUrl');

        function switchToUpload() {
          if (fileWrap) fileWrap.classList.remove('hidden');
          if (urlWrap) urlWrap.classList.add('hidden');
          spanUpload.classList.add('bg-blue-50','border-blue-100','text-blue-600');
          spanUrl.classList.remove('bg-blue-50','border-blue-100','text-blue-600');
          spanUrl.classList.add('border-gray-200','text-gray-600');
          setFilePlaceholder();
        }
        function switchToUrl() {
          if (fileWrap) fileWrap.classList.add('hidden');
          if (urlWrap) urlWrap.classList.remove('hidden');
          spanUrl.classList.add('bg-blue-50','border-blue-100','text-blue-600');
          spanUpload.classList.remove('bg-blue-50','border-blue-100','text-blue-600');
          spanUpload.classList.add('border-gray-200','text-gray-600');
          setFilePlaceholder();
        }
        if (radioUpload.checked) switchToUpload();
        radioUpload.addEventListener('change', () => { if (radioUpload.checked) switchToUpload(); });
        radioUrl.addEventListener('change', () => { if (radioUrl.checked) switchToUrl(); });
      }

      // Submit handling
      const submitBtn = document.getElementById('submitBtn');
      const form = document.getElementById('contentFormDynamic');
      if (submitBtn && form) {
        submitBtn.onclick = (ev) => {
          ev.preventDefault();
          const fd = new FormData(form);
          const logo = document.getElementById('logoUploadInput');
          if (logo && logo.files && logo.files[0]) fd.set('logo', logo.files[0]);
          const file = document.getElementById('contentFileInput');
          if (file && file.files && file.files[0]) fd.set('file', file.files[0]);
          const url = document.getElementById('fileUrlInput');
          if (url && url.value) fd.set('fileUrl', url.value);
          const lang = document.getElementById('languageStatic');
          if (lang) fd.set('language', lang.value);
          const out = {};
          for (const pair of fd.entries()) {
            if (pair[1] instanceof File) out[pair[0]] = pair[1].name;
            else out[pair[0]] = pair[1];
          }
          console.log('Submit payload:', out);
          alert('Form data logged to console. Replace submit handler to upload to your API.');
        };
      }

      // Cancel
      const cancelBtn = document.getElementById('cancelBtn');
      if (cancelBtn) {
        cancelBtn.onclick = () => {
          document.getElementById('leftForm').innerHTML = `<p class="text-gray-400">Select a card above to load the form...</p>`;
          setLogoPlaceholder();
          setFilePlaceholder();
          document.getElementById('uploadTitle').textContent = 'Upload Screen Saver';
          document.getElementById('languageStatic').value = 'en';
          document.querySelectorAll('.content-card').forEach(c => c.classList.remove(...ACTIVE));
        };
      }
    }

    // File preview handler
    function handleFilePreview(file) {
      const preview = document.getElementById('filePreview');
      if (!file) return setFilePlaceholder();
      const reader = new FileReader();
      reader.onload = () => {
        const t = file.type || '';
        if (t.startsWith('image/')) {
          preview.innerHTML = `<img src="${reader.result}" class="max-w-full max-h-[140px] object-contain rounded-xl">`;
        } else if (t === 'application/pdf') {
          preview.innerHTML = `<iframe src="${reader.result}" class="w-full h-[180px] rounded-xl border"></iframe>`;
        } else if (t.startsWith('video/')) {
          preview.innerHTML = `<video controls class="w-full h-[180px] rounded-xl border"><source src="${reader.result}"></video>`;
        } else {
          preview.innerHTML = `<div class="text-gray-600 text-sm"><svg class="w-8 h-8 mx-auto mb-2 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12"/><path d="M5 10l7-7 7 7"/></svg>${file.name}</div>`;
        }
      };
      reader.readAsDataURL(file);
    }

    // URL preview handler
    function updatePreviewFromUrl(url) {
      const preview = document.getElementById('filePreview');
      if (!url) return setFilePlaceholder();
      if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        preview.innerHTML = `<img src="${url}" class="max-w-full max-h-[140px] object-contain rounded-xl">`;
      } else if (url.endsWith('.pdf')) {
        preview.innerHTML = `<iframe src="${url}" class="w-full h-[180px] rounded-xl border"></iframe>`;
      } else if (url.match(/\.(mp4|webm|mov)$/i)) {
        preview.innerHTML = `<video controls class="w-full h-[180px] rounded-xl border"><source src="${url}"></video>`;
      } else {
        preview.innerHTML = `<div class="text-gray-600 text-sm"><svg class="w-8 h-8 mx-auto mb-2 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12"/><path d="M5 10l7-7 7 7"/></svg>${url}</div>`;
      }
    }

    function setLogoPlaceholder(){
      document.getElementById('logoPreview').innerHTML = `<svg class="w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5-7 7"/></svg>`;
    }
    function setFilePlaceholder(){
      document.getElementById('filePreview').innerHTML = `<svg class="w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5-7 7"/></svg>`;
    }

    // Expose debug helpers
    window._upload = { updatePreviewFromUrl, handleFilePreview };