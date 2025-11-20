(() => {
  // ✅ Select DOM elements
  const steps = Array.from(document.querySelectorAll('.step'));
  const progressWrap = document.getElementById('progress');
  const checkboxContainer = document.getElementById('checkbox-options');
  const previewEl = document.getElementById('preview');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const emailContent = document.getElementById('email-content'); // ✅ Added reference

  // ✅ Variables
  let currentStep = 0;
  let activeFlow = Array.from({ length: steps.length }, (_, i) => i); // Default: all steps
  let history = [0]; // Track visited steps
  const formData = {};
  let selectedMethod = null;

  // ✅ Conditions for step 2 options
  const conditions = {
    email: [
      { id: 'open', title: 'Open Email Template Only (Level 1)', desc: 'Simple phishing email template to monitor email open by users.' },
      { id: 'download', title: 'Download File Based Template (Level 2)', desc: 'Phishing email template with file attached in the message to monitor download by users.' },
      { id: 'url', title: 'URL Click Based Template (Level 3)', desc: 'Email template with a dedicated URL for testing users visiting the phishing page.' }
    ],
    nfc: [
      { id: 'download', title: 'Download File Based Template (Level 2)', desc: 'Phishing email template with file attached in the message to monitor download by users.' },
      { id: 'url', title: 'URL Click Based Template (Level 3)', desc: 'Email template with a dedicated URL for testing users visiting the phishing page.' }
    ],
    qr: [
      { id: 'download', title: 'DoUwnload File Based Template (Level 2)', desc: 'Phishing email template with file attached in the message to monitor download by users.' },
      { id: 'url', title: 'URL Click Based Template (Level 3)', desc: 'Email template with a dedicated URL for testing users visiting the phishing page.' }
    ],  

    sms: [
      { id: 'short', title: 'Short Message', desc: 'Send a simple SMS message.' },
      { id: 'attach', title: 'Attach URL', desc: 'Include a clickable link in SMS.' },
      { id: 'template', title: 'Download Template', desc: 'Use a ready-made SMS template.' }
    ],
    whatsapp: [
      { id: 'short', title: 'Short Message', desc: 'Send a simple SMS message.' },
      { id: 'attach', title: 'Attach URL', desc: 'Include a clickable link in SMS.' },
      { id: 'template', title: 'Download Template', desc: 'Use a ready-made SMS template.' }
    ],
  };

  // ✅ Navigation rules for skipping steps
  const customRules = [
// email 
    { method: 'email', options: ['Open Email Template Only (Level 1)'], goTo: [ 4] },
    { method: 'email', options: ['Open Email Template Only (Level 1)','Download File Based Template (Level 2)'], goTo: [3, 4, 7] },
    { method: 'email', options: ['Open Email Template Only (Level 1)','Download File Based Template (Level 2)','URL Click Based Template (Level 3)'], goTo: [3, 4, 5, 6, 7] },
    { method: 'email', options: ['Download File Based Template (Level 2)',], goTo: [3, 4, 5, 6, 7] },
    { method: 'email', options: ['URL Click Based Template (Level 3)'], goTo: [ 4, 5, 6, 7] },
    { method: 'email', options: ['Open Email Template Only (Level 1)', 'URL Click Based Template (Level 3)'], goTo: [3, 4, 5, 6, 7] },
    { method: 'email', options: ['Download File Based Template (Level 2)','URL Click Based Template (Level 3)'], goTo: [3, 4, 5, 6, 7] },
// nfc 
    { method: 'nfc', options: ['Download File Based Template (Level 2)','URL Click Based Template (Level 3)'], goTo: [3,  5, 6, 7] },
    { method: 'nfc', options: ['Download File Based Template (Level 2)'], goTo: [3, 4, 5, 6, 7] },
// qr
    { method: 'qr', options: ['Download File Based Template (Level 2)','URL Click Based Template (Level 3)'], goTo: [3,  5, 6, 7] },
    { method: 'qr', options: ['Download File Based Template (Level 2)'], goTo: [3, 4, 5, 6, 7] },

//sms
    { method: 'sms', options: ['Short Message', 'Download Template'], goTo: [3, 6, 7] },
    { method: 'sms', options: ['Attach URL'], goTo: [3, 6, 7] },
    { method: 'sms', options: ['Download Template'], goTo: [3, 6, 7] },
//whatsapp
    { method: 'whatsapp', options: ['Short Message', 'Download Template'], goTo: [3, 6, 7] },
    { method: 'whatsapp', options: ['Attach URL'], goTo: [3, 6, 7] },
  ];

  const stepTitles = [
    'Template Details',
    'Tracking Details',
    'File Attachment Setting (Optional)',
    'Phishing Content',
    'URL Phish Page Setting (Optional)',
    'Create Phishing Webpage (Optional)',
    'Landing Page (Optional)'
  ];

  function renderProgressBar() {
    progressWrap.innerHTML = '';
    const currentIndexInFlow = activeFlow.indexOf(currentStep);
    activeFlow.forEach((stepIndex, i) => {
      const isActive = i === currentIndexInFlow;
      const isCompleted = i < currentIndexInFlow;
      const circle = document.createElement('div');
      circle.className = 'flex flex-col items-center text-center mx-2';
      circle.innerHTML = `
        <div class="w-8 h-8 flex items-center justify-center rounded-full border-2
          ${isActive
            ? 'bg-teal-400 text-white border-teal-400'
            : isCompleted
            ? 'bg-teal-500 text-white border-teal-500'
            : 'bg-white text-gray-600 border-gray-300'}">
          ${i + 1}
        </div>
        <div class="text-xs mt-1">${stepTitles[stepIndex]}</div>
      `;
      progressWrap.appendChild(circle);
      if (i < activeFlow.length - 1) {
        const isLineActive = i < currentIndexInFlow;
        const line = document.createElement('div');
        line.className = `flex-1 h-1 ${isLineActive ? 'bg-teal-400' : 'bg-gray-200'}`;
        progressWrap.appendChild(line);
      }
    });
  }

  function showStep(index) {
    steps.forEach((el, i) => el.classList.toggle('hidden', i !== index));
    currentStep = index;
    prevBtn.disabled = history.length <= 1;
    const currentPos = activeFlow.indexOf(currentStep);
    nextBtn.textContent = currentPos === activeFlow.length - 1 ? 'Finish' : 'Next';
    if (index === steps.length - 1) {
      previewEl.textContent = JSON.stringify(formData, null, 2);
    }
    renderProgressBar();
  }

  function saveDataForStep(idx) {
    const stepEl = steps[idx];
    const inputs = Array.from(stepEl.querySelectorAll('input'));
    const key = `step${idx + 1}`;
    formData[key] = {};
    inputs.forEach(inp => {
      const name = inp.name || ('_anon_' + idx);
      if (inp.type === 'radio') {
        if (inp.checked) formData[key][name] = inp.value;
      } else if (inp.type === 'checkbox') {
        if (!formData[key][name]) formData[key][name] = [];
        if (inp.checked) formData[key][name].push(inp.value);
      } else {
        formData[key][name] = inp.value;
      }
    });
  }

  function computeMatchingRule(method, selectedOptions) {
    const candidates = customRules.filter(r => r.method === method && r.options.every(o => selectedOptions.includes(o)));
    if (!candidates.length) return null;
    candidates.sort((a, b) => b.options.length - a.options.length);
    return candidates[0];
  }

  function buildActiveFlow(matchedRule) {
    if (!matchedRule) return Array.from({ length: steps.length }, (_, i) => i);
    const goToZeroBased = matchedRule.goTo.map(n => n - 1);
    const uniq = [0, 1];
    goToZeroBased.forEach(x => { if (!uniq.includes(x)) uniq.push(x); });
    return uniq;
  }

  function renderOptions(type) {
    checkboxContainer.innerHTML = '';
    conditions[type].forEach((option, index) => {
      const id = `option-${index}`;
      const wrapper = document.createElement('label');
      wrapper.className = 'custom-option';
      wrapper.innerHTML = `
        <input type="checkbox" id="${id}" name="options" value="${option.title}" class="hidden-checkbox" />
        <span class="custom-circle"></span>
        <div class="text-content">
          <span class="text-2xl font-medium mb-2">${option.title}</span>
          <p class="text-sm">${option.desc}</p>
        </div>
      `;
      checkboxContainer.appendChild(wrapper);
    });
  }

  function handleNext() {
    saveDataForStep(currentStep);
    if (currentStep === 0) {
      const sel = formData.step1.method;
      if (!sel) {
        alert('Please choose a method to continue.');
        return;
      }
      selectedMethod = sel;

      // ✅ NEW FEATURE: Hide email if NFC selected
      if (selectedMethod === 'nfc' && emailContent) {
        emailContent.style.display = 'none'; 
      }

      if (selectedMethod === 'qr' && emailContent) {
        emailContent.style.display = 'none'; 
      }










      renderOptions(selectedMethod);
      history.push(1);
      showStep(1);
      return;
    }
    if (currentStep === 1) {
      const selectedOptions = (formData.step2.options) ? formData.step2.options : [];
      if (selectedOptions.length === 0) {
        alert('Please select at least one option.');
        return;
      }
      const matched = computeMatchingRule(selectedMethod, selectedOptions);
      activeFlow = buildActiveFlow(matched);
      const idxInFlow = activeFlow.indexOf(1);
      const nextInFlow = activeFlow[idxInFlow + 1] || steps.length - 1;
      history.push(nextInFlow);
      showStep(nextInFlow);
      return;
    }
    const idx = activeFlow.indexOf(currentStep);
    if (idx < activeFlow.length - 1) {
      const nextStepIndex = activeFlow[idx + 1];
      history.push(nextStepIndex);
      showStep(nextStepIndex);
      return;
    }
    alert('Onboarding finished!');
  }

  function handlePrev() {
    if (history.length <= 1) return;
    history.pop();
    const prev = history[history.length - 1];
    currentStep = prev;
    showStep(currentStep);
  }

  function init() {
    renderProgressBar();
    showStep(0);
    nextBtn.addEventListener('click', handleNext);
    prevBtn.addEventListener('click', handlePrev);
  }

  init();
})();








    const radios = document.querySelectorAll('input[name="phish-option"]');
    const customInput = document.getElementById('custom-url-input');

    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'custom-url') {
          customInput.classList.remove('hidden');
        } else {
          customInput.classList.add('hidden');
        }
      });
    });







      // Initialize all editors
        // const editors = ['#editor1', '#editor2', '#editor3'];

        // editors.forEach(selector => {
        //     ClassicEditor
        //         .create(document.querySelector(selector), {
        //             toolbar: [
        //                 'heading', '|',
        //                 'bold', 'italic', 'link', '|',
        //                 'undo', 'redo', '|',
        //                 'sourceEditing' // ✅ Add SourceEditing button
        //             ],
        //             extraPlugins: [ window.ClassicEditor.builtinPlugins ],
        //         })
        //         .then(editor => {
        //             console.log('Editor initialized:', selector, editor);
        //         })
        //         .catch(error => {
        //             console.error('Error initializing editor:', selector, error);
        //         });
        // });


        const editors = ['editor1', 'editor2', 'editor3'];

        editors.forEach(id => {
            CKEDITOR.replace(id, {
                // Use full toolbar
                toolbar: 'Full'
            });
        });






    let editorInstance;

  // Hide the editor container on page load
  document.getElementById('editor-container').style.display = 'none';

  document.querySelectorAll('input[name="landing_option"]').forEach(radio => {
    radio.addEventListener('change', function () {
      const editorContainer = document.getElementById('editor-container');

      if (this.value === 'custom') {
        editorContainer.style.display = 'block';

        // Initialize CKEditor only once
        if (!editorInstance) {
          ClassicEditor
            .create(document.querySelector('#editor'), {
              placeholder: 'Enter custom page HTML here...'
            })
            .then(editor => {
              editorInstance = editor;
            })
            .catch(error => console.error(error));
        }
      } else {
        editorContainer.style.display = 'none';
      }
    });
  });
