// =========================
// 1. INIT QUILL
// =========================
const quill = new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Write your certificate text here...',
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['link', 'clean'],
    ],
  },
});

// =========================
// 2. LANGUAGE DROPDOWN SYNC
// =========================
const languageSelect = document.getElementById('languageSelect');
const languageText = document.getElementById('languageText');
const languageFlag = document.getElementById('languageFlag');

const langMeta = {
  en: { label: 'English', flag: '🇺🇸' },
  ar: { label: 'Arabic', flag: '🇸🇦' },
  fr: { label: 'French', flag: '🇫🇷' },
};

if (languageSelect) {
  languageSelect.addEventListener('change', () => {
    const val = languageSelect.value;
    const meta = langMeta[val] || langMeta.en;
    if (languageText) languageText.textContent = meta.label;
    if (languageFlag) languageFlag.textContent = meta.flag;
  });
}

// =========================
// 3. IMAGE STATE
// =========================
const uploadedImages = {
  bottomLogo: null,
  borderImage: null,
  bgWatermark: null,
  stampLogo: null,
  signImage: null,
};

function getCertificateTemplateHtml(firstName, lastName, courseName, completionDate) {
  const defaultTemplate =
    'This is to certify that <%first_name%> <%last_name%> has successfully completed <%content_name%> on <%completion_date%>';

  const templateHtml = quill?.root?.innerHTML?.trim() || defaultTemplate;

  return templateHtml
    .replace(/<%first_name%>/g, firstName)
    .replace(/<%last_name%>/g, lastName)
    .replace(/<%content_name%>/g, courseName)
    .replace(/<%completion_date%>/g, completionDate);
}

// =========================
// 4. IMAGE PREVIEW HELPERS
// =========================
function previewImage(input, previewId) {
  const file = input.files[0];
  const preview = document.getElementById(previewId);
  if (!preview || !file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;

    if (previewId === 'topLogoPreview') uploadedImages.bottomLogo = dataUrl;
    if (previewId === 'bottomLogoPreview') uploadedImages.bottomLogo = dataUrl;
    if (previewId === 'borderImagePreview') uploadedImages.borderImage = dataUrl;
    if (previewId === 'bgWatermarkPreview') uploadedImages.bgWatermark = dataUrl;
    if (previewId === 'stampLogoPreview') uploadedImages.stampLogo = dataUrl;
    if (previewId === 'signImagePreview') uploadedImages.signImage = dataUrl;

    preview.innerHTML = `
      <img src="${dataUrl}" alt="preview"
           class="w-full h-full object-contain rounded-xl" />
      <button
        type="button"
        class="absolute top-0.5 right-0.5 w-4 h-4 rounded-full border border-slate-200 bg-white/95 text-[10px] leading-[10px] text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white"
        onclick="removeExistingImage('${previewId}', this)"
      >
        ✖
      </button>
    `;
    previewCertificate();
  };
  reader.readAsDataURL(file);
}

function removeExistingImage(previewId, btn) {
  const preview = document.getElementById(previewId);
  if (!preview) return;

  if (previewId === 'topLogoPreview') uploadedImages.bottomLogo = null;
  if (previewId === 'bottomLogoPreview') uploadedImages.bottomLogo = null;
  if (previewId === 'borderImagePreview') uploadedImages.borderImage = null;
  if (previewId === 'bgWatermarkPreview') uploadedImages.bgWatermark = null;
  if (previewId === 'stampLogoPreview') uploadedImages.stampLogo = null;
  if (previewId === 'signImagePreview') uploadedImages.signImage = null;

  preview.innerHTML = '<i class="bi bi-image text-slate-300 text-lg"></i>';

  const wrapper = btn?.closest('.flex');
  if (wrapper) {
    const input = wrapper.querySelector('input[type="file"]');
    if (input) input.value = '';
  }

  previewCertificate();
}

// =========================
// 5. BUILD CERTIFICATE HTML
// =========================
function buildCertificateHTML() {
  // Get form inputs
  const firstName = document.getElementById('firstNameInput')?.value || 'John';
  const lastName = document.getElementById('lastNameInput')?.value || 'Doe';
  const topic = document.getElementById('topicInput')?.value || 'Physical Security';
  const completionDate = document.getElementById('completionDateInput')?.value || '1/27/2026';
  const courseName = document.getElementById('courseNameInput')?.value || 'Cybersecurity Awareness on Physical Security';
  const bgColor = document.getElementById('bgColorInput')?.value || '#ffffff';

  const bottomLogo = uploadedImages.bottomLogo || '';
  const stampLogo = uploadedImages.stampLogo || '';
  const signImage = uploadedImages.signImage || '';
  const certificateText = getCertificateTemplateHtml(firstName, lastName, courseName, completionDate);

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        background-color: #f5f5f5;
        padding: 20px;
        font-family: Arial, sans-serif;
      }
      .certificate-wrapper {
        position: relative;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      .export-btn {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 24px;
        border-radius: 999px;
        border: none;
        background: #0ea5e9;
        color: white;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(14,165,233,0.35);
        z-index: 100;
      }
      .certificate-container {
      padding: 20px;
        width: 100%;
        max-width: 900px;
        background-color: white;
        border: 4px solid #999;
        box-shadow: 0 4px 25px rgba(0,0,0,0.2);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        margin-top: 60px;
      }
      .certificate-header {
        background: #ffffff;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      .certificate-header-img {
        width: 100%;
        height: 100%;
        max-width: none;
        object-fit: cover;
      }
      .certificate-content {
        padding: 40px 40px 60px;
        text-align: center;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .topic-section {
        margin-bottom: 20px;
      }
      .topic-label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: #64748b;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 10px;
      }
      .topic-label i {
        font-size: 16px;
      }
      .topic-title {
        font-size: 48px;
        font-weight: bold;
        color: #1e293b;
        margin-bottom: 20px;
      }
      .divider {
        width: 200px;
        height: 2px;
        background-color: #cbd5e1;
        margin: 0 auto 30px;
      }
      .certification-text {
        font-size: 16px;
        color: #475569;
        line-height: 1.8;
        margin-bottom: 20px;
        letter-spacing: 0.5px;
      }
      .user-name {
        font-size: 24px;
        font-weight: bold;
        color: #1e293b;
        margin-top: 20px;
      }
      .signature-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 30px;
        margin-top: 40px;
        padding-top: 20px;
      }
      .signature-item {
        flex: 1;
        text-align: center;
      }
      .signature-line {
        width: 100%;
        height: 2px;
        background-color: #94a3b8;
        margin-bottom: 8px;
      }
      .signature-img {
        height: 50px;
        margin-bottom: 8px;
      }
      .signature-label {
        font-size: 12px;
        color: #64748b;
        font-weight: 600;
      }
      .logo-placeholder {
        width: 160px;
        height: 160px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 8px;
        color: #94a3b8;
        font-size: 28px;
      }
      .stamp {
        width: 70px;
        height: 70px;
        border: 3px solid #dc2626;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 8px;
        transform: rotate(15deg);
        font-size: 10px;
        font-weight: bold;
        color: #dc2626;
        text-align: center;
        line-height: 1.2;
      }
      .stamp-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      @media print {
        .export-btn { display: none; }
        body { background: white; padding: 0; }
        .certificate-wrapper { padding: 0; margin: 0; }
        .certificate-container { margin: 0; box-shadow: none; }
      }
    </style>
  </head>
  <body>
    <div class="certificate-wrapper">
      <button class="export-btn" onclick="window.print()">Export PDF</button>
      
      <div class="certificate-container">
        <!-- Header -->
        <div class="certificate-header">
          <img src="images/coc.png" alt="Certificate of Completion" class="certificate-header-img" />
        </div>

        <!-- Content -->
        <div class="certificate-content">
          <div>
            <!-- Topic Section -->
            <div class="topic-section">
              <div class="topic-label">
                <i class="bi bi-bookmark"></i>
                <span>Topic</span>
              </div>
              <h2 class="topic-title">${topic}</h2>
              <div class="divider"></div>
            </div>
            
            <!-- Certification Text -->
            <div class="certification-text">
              ${certificateText}
            </div>
            
            <!-- User Name -->
            <div class="user-name">${firstName} ${lastName}</div>
          </div>
          
          <!-- Signature Row -->
          <div class="signature-row">
            <div class="signature-item">
              ${signImage ? `<img src="${signImage}" alt="Signature" class="signature-img" style="width: 100%; height: auto; max-height: 50px; object-fit: contain; margin-bottom: 8px;">` : `<div class="signature-line"></div>`}
              <div class="signature-label">Authorized Signature</div>
            </div>
            
            <div class="signature-item">
              <div class="logo-placeholder">
                ${bottomLogo ? `<img src="${bottomLogo}" alt="Logo" style="width: 170px; height: 170px; object-fit: contain;">` : `<i class="bi bi-building"></i>`}
              </div>
            </div>
            
            <div class="signature-item">
              ${stampLogo ? `<img src="${stampLogo}" alt="Stamp" class="stamp-img" style="width: 70px; height: 70px; margin: 0 auto 8px; transform: rotate(15deg);">` : `<div class="stamp">OFFICIAL<br/>STAMP</div>`}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}

// =========================
// 6. PREVIEW IN RIGHT PANEL
// =========================
function previewCertificate() {
  const htmlDoc = buildCertificateHTML();
  const container = document.getElementById('certificatePreview');
  if (!container) return;

  // Use DOMParser to read the full HTML and extract the certificate-container
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlDoc, 'text/html');
  const cert = doc.querySelector('.certificate-container');

  if (!cert) {
    container.innerHTML = 'Unable to render preview.';
    return;
  }

  container.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.justifyContent = 'center';
  wrapper.style.padding = '10px';

  wrapper.appendChild(cert.cloneNode(true));
  container.appendChild(wrapper);
}

// =========================
// 7. CANCEL HANDLER
// =========================
function cancelForm() {
  if (!confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) return;

  document.getElementById('brandingForm')?.reset();
  quill.setText('');
  const previewBox = document.getElementById('certificatePreview');
  if (previewBox) previewBox.innerHTML = 'Click "Preview" to view.';

  uploadedImages.topLogo = null;
  uploadedImages.bottomLogo = null;
  uploadedImages.borderImage = null;
  uploadedImages.bgWatermark = null;
  uploadedImages.stampLogo = null;
  uploadedImages.signImage = null;

  [
    'topLogoPreview',
    'bottomLogoPreview',
    'borderImagePreview',
    'bgWatermarkPreview',
    'stampLogoPreview',
    'signImagePreview',
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '<i class="bi bi-image text-slate-300 text-lg"></i>';
  });
}

// =========================
// 8. SAVE → NEW TAB + EXPORT PDF BUTTON
// =========================
document.getElementById('brandingForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const docHtml = buildCertificateHTML();
  const win = window.open('', '_blank');
  if (!win) return;

  win.document.open();
  win.document.write(docHtml);
  win.document.close();
});
