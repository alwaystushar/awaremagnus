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
    languageText.textContent = meta.label;
    languageFlag.textContent = meta.flag;
  });
}

// =========================
// 3. IMAGE STATE
// =========================
const uploadedImages = {
  topLogo: null,
  bottomLogo: null,
  borderImage: null,
  bgWatermark: null,
  stampLogo: null,
  signImage: null,
};

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

    if (previewId === 'topLogoPreview') uploadedImages.topLogo = dataUrl;
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
  };
  reader.readAsDataURL(file);
}

function removeExistingImage(previewId, btn) {
  const preview = document.getElementById(previewId);
  if (!preview) return;

  if (previewId === 'topLogoPreview') uploadedImages.topLogo = null;
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
}

// =========================
// 5. BUILD CERTIFICATE HTML
// =========================
function buildCertificateHTML() {
  const template = quill.root.innerHTML;
  const bgColor = document.getElementById('bgColorInput')?.value || '#fdfcf8';

  const sampleData = {
    first_name: 'John',
    last_name: 'Doe',
    content_name: 'Cybersecurity Awareness Training',
    completion_date: new Date().toLocaleDateString(),
  };

  let textHtml = template;
  for (const key in sampleData) {
    const re = new RegExp(`&lt;%${key}%&gt;`, 'g');
    textHtml = textHtml.replace(re, sampleData[key]);
  }

  const topLogo = uploadedImages.topLogo || '';
  const bottomLogo = uploadedImages.bottomLogo || '';
  const borderImage = uploadedImages.borderImage || '';
  const watermark = uploadedImages.bgWatermark || '';
  const stampLogo = uploadedImages.stampLogo || '';
  const signImage = uploadedImages.signImage || '';

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Certificate</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: "Times New Roman", serif;
        background-color: #f3f3f3;
      }

      .certificate-wrapper {
        position: relative;
        min-height: 100vh;
        padding: 20px;
        box-sizing: border-box;
      }

      .export-btn {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 8px 20px;
        border-radius: 999px;
        border: none;
        background: #0ea5e9;
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(14,165,233,0.35);
      }

      .certificate-container {
        position: relative;
        width: 900px;
        height: 650px;
        margin: 60px auto 40px;
        background-color: white;
        color: #333;
        border: 20px solid transparent;
        box-shadow: 0 4px 25px rgba(0,0,0,0.2);
        overflow: hidden;
        background-color: ${bgColor};
      }

      .certificate-container {
        border-image-slice: 30;
        border-image-repeat: round;
        border-image-width: 20px;
        ${borderImage ? `border-image-source: url('${borderImage}');` : ''}
      }

      .certificate-watermark {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        ${watermark ? `background-image: url('${watermark}');` : ''}
        background-repeat: no-repeat;
        background-position: center;
        background-size: 60%;
        opacity: 0.15;
        z-index: 0;
        pointer-events: none;
      }

      .certificate-top-logo {
        position: absolute;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        height: 80px;
        z-index: 2;
      }

      .certificate-bottom-logo {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        height: 60px;
        z-index: 2;
      }

      .certificate-content {
        position: relative;
        z-index: 1;
        padding: 140px 60px 100px 60px;
        text-align: center;
        background-color: rgba(255,255,255,0.85);
      }

      .certificate-title {
        font-size: 32px;
        font-weight: bold;
        color: #333;
        margin-bottom: 20px;
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      .certificate-text {
        font-size: 18px;
        line-height: 1.7;
        color: #444;
        margin: 20px auto;
        width: 80%;
      }

      .certificate-signature-area {
        position: absolute;
        bottom: 100px;
        left: 60px;
        right: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 2;
      }

      .certificate-sign {
        text-align: center;
      }

      .certificate-sign img {
        height: 60px;
      }

      .certificate-sign small {
        display: inline-block;
        margin-top: 6px;
        font-size: 11px;
        color: #555;
      }

      .certificate-stamp {
        position: absolute;
        bottom: 120px;
        right: 100px;
        width: 100px;
        opacity: 0.9;
      }

      @media print {
        .export-btn { display: none; }
        body { background: #ffffff; padding: 0; }
        .certificate-wrapper { padding: 0; }
        .certificate-container {
          margin: 0 auto;
          box-shadow: none;
        }
      }
    </style>
  </head>
  <body>
    <div class="certificate-wrapper">
      <button class="export-btn" onclick="window.print()">Export PDF</button>

      <div class="certificate-container">
        <div class="certificate-watermark"></div>

        ${topLogo ? `<img class="certificate-top-logo" src="${topLogo}" alt="Top Logo">` : ''}

        <div class="certificate-content">
          <div class="certificate-title">CERTIFICATE OF COMPLETION</div>
          <div class="certificate-text">
            ${textHtml}
          </div>
        </div>

        <div class="certificate-signature-area">
          <div class="certificate-sign">
            ${signImage ? `<img src="${signImage}" alt="Signature">` : ''}
            <br>
            <small>Authorized Signature</small>
          </div>
          <div class="certificate-sign">
            ${stampLogo ? `<img src="${stampLogo}" alt="Stamp" class="certificate-stamp">` : ''}
          </div>
        </div>

        ${bottomLogo ? `<img class="certificate-bottom-logo" src="${bottomLogo}" alt="Bottom Logo">` : ''}
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
