/* =========================================================
   LANGUAGE CONFIGURATION WITH FLAG ICONS
   - Maps language codes to flag emoji and display names
========================================================= */
const LANGUAGE_CONFIG = {
    en: {
        name: "English",
        flag: "🇺🇸",
        countryCode: "us"
    },
    ar: {
        name: "Arabic",
        flag: "🇸🇦",
        countryCode: "sa"
    }
};

// Global state for quiz type and selected languages
let QUIZ_STATE = {
    quizType: null,
    selectedLanguages: []
};

// Track language card numbers for automatic numbering
let LANGUAGE_COUNTERS = {};

// Modal state
let currentModalCard = null;
let modalCSVData = null;


/* =========================================================
   TOAST SYSTEM  
   - Shows animated success/error notifications
========================================================= */
function showToast(message, type = "success") {
    const box = document.getElementById("toastContainer");
    if (!box) return;

    const el = document.createElement("div");
    el.className =
        `flex items-center gap-2 px-4 py-2 text-xs font-medium 
         rounded-lg border backdrop-blur-md shadow-sm
         transition-all duration-300 transform translate-x-10 opacity-0
         ${type === "success"
            ? "bg-[#3CC471] border-[#24A459] text-white"
            : "bg-[#FF4E4E] border-[#D83232] text-white"
         }`;

    el.innerHTML = `<span>${type === "success" ? "✔" : "⚠️"}</span> ${message}`;
    box.appendChild(el);

    setTimeout(() => {
        el.style.transform = "translateX(0)";
        el.style.opacity = "1";
    }, 40);

    setTimeout(() => {
        el.style.transform = "translateX(40px)";
        el.style.opacity = "0";
    }, 2400);

    setTimeout(() => el.remove(), 2800);
}

/* =========================================================
   TEMPLATE NODES
========================================================= */
const langTpl = document.getElementById("langTemplate");
const ansTpl = document.getElementById("answerTemplate");

/* =========================================================
   BUILD TRUE/FALSE ANSWERS WITH NICE RADIO
========================================================= */
function buildTF(text, lang) {
    const div = document.createElement("div");
    div.className = "answer flex items-center gap-3";

    div.innerHTML = `
        <input disabled value="${text}"
            class="w-full px-4 py-2 text-xs rounded-lg border border-gray-300 bg-gray-100 ">

        <div class="answer-pill flex items-center gap-2 px-2 py-1 border border-gray-300 rounded-lg cursor-pointer transition hover:border-[#3FBDFF]" style="width: fit-content;">
            <input type="radio" name="correct_${lang}" class="correctCheck hidden">
            
            <span class="radio-btn flex items-center justify-center w-4 h-4 rounded-full border-2 border-gray-300 bg-white flex-shrink-0" style="transition: all 0.2s ease;">
                <span class="radio-dot hidden w-2 h-2 rounded-full bg-[#3FBDFF]"></span>
            </span>
            
            <span class="text-[10px] text-gray-700 select-none font-medium">Correct</span>
        </div>

        <div class="w-6 h-6 opacity-0"></div>
    `;

    return div;
}

/* =========================================================
   BUILD NORMAL ANSWER
========================================================= */
function buildAnswer(lang, type) {
    const frag = ansTpl.content.cloneNode(true);
    const chk = frag.querySelector(".correctCheck");

    chk.name = `correct_${lang}`;
    chk.type = type === "multi" ? "checkbox" : "radio";

    frag.querySelector(".remove-ans").onclick =
        e => e.target.closest(".answer")?.remove();

    return frag;
}

/* =========================================================
   APPLY VISUAL STYLING TO ANSWER PILLS
   - Works with radio-component.js for consistent behavior
========================================================= */
function applyAnswerStyling() {
    document.querySelectorAll(".answer-pill").forEach(pill => {
        const input = pill.querySelector(".correctCheck");
        const radioBtn = pill.querySelector(".radio-btn");
        const radioDot = pill.querySelector(".radio-dot");
        
        if (!input || !radioBtn) return;
        
        // Determine if this is a checkbox or radio
        const isCheckbox = input.type === 'checkbox';
        
        // Apply beautiful styling based on checked status
        if (input.checked) {
            // ✅ CHECKED STATE - Beautiful gradient and shadow
            pill.style.background = "linear-gradient(135deg, #EAF6FF, #E3F2FD)";
            pill.style.borderColor = "#3FBDFF";
            pill.style.borderWidth = "2px";
            pill.style.boxShadow = "0 2px 8px rgba(63, 189, 255, 0.2)";
            
            // Checkbox: blue bg with checkmark, Radio: white bg with blue dot
            radioBtn.style.background = isCheckbox ? "#3FBDFF" : "white";
            radioBtn.style.borderColor = "#3FBDFF";
            radioBtn.style.borderWidth = "2px";
            radioBtn.style.borderRadius = isCheckbox ? "4px" : "50%";
            
            // Only show dot for radio, hide for checkbox
            if (radioDot) {
                if (isCheckbox) {
                    radioDot.style.display = "none";
                } else {
                    radioDot.style.display = "";
                    radioDot.classList.remove("hidden");
                }
            }
        } else {
            // ⚪ UNCHECKED STATE - Clean and minimal
            pill.style.background = "";
            pill.style.borderColor = "#D1D5DB";
            pill.style.borderWidth = "";
            pill.style.boxShadow = "";
            
            radioBtn.style.background = "#FFFFFF";
            radioBtn.style.borderColor = "#D1D5DB";
            radioBtn.style.borderWidth = "2px";
            radioBtn.style.borderRadius = isCheckbox ? "4px" : "50%";
            
            if (radioDot) {
                if (isCheckbox) {
                    radioDot.style.display = "none";
                } else {
                    radioDot.classList.add("hidden");
                }
            }
        }
    });
}

/* =========================================================
   MUTATION OBSERVER FOR DYNAMIC CONTENT
========================================================= */
function watchDynamicAnswers() {
    const observer = new MutationObserver(() => {
        applyAnswerStyling();
    });
    observer.observe(document.getElementById("languageForms"), {
        subtree: true,
        childList: true
    });
}

/* =========================================================
   CSV PARSING & PREVIEW
========================================================= */
function parseCSVData(csvContent, lang) {
    return new Promise((resolve, reject) => {
        Papa.parse(csvContent, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.data.length === 0) {
                    reject("No data found in CSV file");
                    return;
                }
                resolve(results.data);
            },
            error: (error) => reject(error.message)
        });
    });
}

/* =========================================================
   CSV UPLOAD MODAL MANAGEMENT
========================================================= */
function openCSVModal(card) {
    currentModalCard = card;
    modalCSVData = null;
    
    const modal = document.getElementById("csvUploadModal");
    const fileInput = document.getElementById("modalFileInput");
    const fileName = document.getElementById("modalFileName");
    const previewArea = document.getElementById("modalPreviewArea");
    const confirmBtn = document.getElementById("confirmUploadBtn");
    
    // Reset modal
    fileInput.value = "";
    fileName.textContent = "";
    fileName.classList.add("hidden");
    previewArea.classList.add("hidden");
    confirmBtn.disabled = true;
    
    // Show modal
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closeCSVModal() {
    const modal = document.getElementById("csvUploadModal");
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    currentModalCard = null;
    modalCSVData = null;
}

function handleModalFileSelect(file) {
    if (!file) return;
    
    const fileName = document.getElementById("modalFileName");
    const previewArea = document.getElementById("modalPreviewArea");
    const previewContent = document.getElementById("modalPreviewContent");
    const confirmBtn = document.getElementById("confirmUploadBtn");
    
    // Show file name
    fileName.textContent = `Selected: ${file.name}`;
    fileName.classList.remove("hidden");
    
    // Parse CSV
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            if (results.errors.length > 0) {
                showToast("Error parsing file. Please check format.", "error");
                return;
            }
            
            modalCSVData = results.data;
            
            // Show preview
            previewContent.innerHTML = generatePreviewTable(results.data, 5);
            previewArea.classList.remove("hidden");
            confirmBtn.disabled = false;
        },
        error: (error) => {
            showToast(`Error: ${error.message}`, "error");
        }
    });
}

function generatePreviewTable(data, maxRows = 10) {
    if (!data || data.length === 0) return '<p class="text-xs text-gray-500">No data</p>';
    
    const headers = Object.keys(data[0]);
    const rows = data.slice(0, maxRows);
    
    let html = '<table class="w-full text-[10px] border-collapse">';
    
    // Header
    html += '<thead><tr class="bg-[#E8EAED]">';
    headers.forEach(h => {
        html += `<th class="px-3 py-2 text-left font-semibold text-gray-700 border border-gray-300">${h}</th>`;
    });
    html += '</tr></thead>';
    
    // Body
    html += '<tbody>';
    rows.forEach((row, idx) => {
        const bgClass = idx % 2 === 0 ? 'bg-white' : 'bg-gray-50';
        html += `<tr class="${bgClass} hover:bg-blue-50 transition">`;
        headers.forEach(h => {
            html += `<td class="px-3 py-2 border border-gray-300 text-gray-700">${row[h] || ''}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';
    
    if (data.length > maxRows) {
        html += `<p class="text-xs text-gray-500 mt-2 text-center">Showing ${maxRows} of ${data.length} rows</p>`;
    }
    
    return html;
}

function confirmModalUpload() {
    if (!currentModalCard || !modalCSVData) return;
    
    const card = currentModalCard;
    const fileInput = document.getElementById("modalFileInput");
    const fileName = fileInput.files[0]?.name || "file.csv";
    
    // Store data in card
    card.dataset.csvData = JSON.stringify(modalCSVData);
    
    // Update UI
    const csvStatus = card.querySelector(".csv-status");
    const csvPreview = card.querySelector(".csv-preview");
    const formSection = card.querySelector(".form-section");
    const fileNameSpan = card.querySelector(".file-name");
    
    fileNameSpan.textContent = fileName;
    csvStatus.classList.remove("hidden");
    csvPreview.innerHTML = generatePreviewTable(modalCSVData, 10);
    csvPreview.classList.remove("hidden");
    formSection.classList.add("hidden");
    
    showToast("CSV file uploaded successfully!", "success");
    closeCSVModal();
}

function downloadDemoCSV() {
    const quizType = QUIZ_STATE.quizType;
    let demoData, filename, typeText;
    
    if (quizType === 'truefalse') {
        // ========================================
        // TRUE/FALSE FORMAT
        // Only 2 columns: question, correct_answer
        // correct_answer must be either "True" or "False"
        // ========================================
        demoData = [
            { question: "The Earth revolves around the Sun", correct_answer: "True" },
            { question: "Water freezes at 0°C (32°F)", correct_answer: "True" },
            { question: "Python is only a type of snake", correct_answer: "False" },
            { question: "Tokyo is the capital of Japan", correct_answer: "True" },
            { question: "2 + 2 equals 5", correct_answer: "False" },
            { question: "HTML is a programming language", correct_answer: "False" }
        ];
        filename = 'TRUE_FALSE_template.csv';
        typeText = 'True/False (only True or False answers)';
        
    } else if (quizType === 'single') {
        // ========================================
        // SINGLE CHOICE FORMAT
        // Columns: question, answer1, answer2, answer3, answer4, correct_answer
        // correct_answer must match ONE of the answer options exactly
        // ========================================
        demoData = [
            { question: "What is the capital of France?", answer1: "London", answer2: "Paris", answer3: "Berlin", answer4: "Madrid", correct_answer: "Paris" },
            { question: "What is 10 ÷ 2?", answer1: "3", answer2: "4", answer3: "5", answer4: "6", correct_answer: "5" },
            { question: "Which planet is closest to the Sun?", answer1: "Venus", answer2: "Mercury", answer3: "Earth", answer4: "Mars", correct_answer: "Mercury" },
            { question: "How many continents are there?", answer1: "5", answer2: "6", answer3: "7", answer4: "8", correct_answer: "7" },
            { question: "What is the largest ocean?", answer1: "Atlantic", answer2: "Indian", answer3: "Arctic", answer4: "Pacific", correct_answer: "Pacific" }
        ];
        filename = 'SINGLE_CHOICE_template.csv';
        typeText = 'Single Choice (only ONE correct answer)';
        
    } else if (quizType === 'multi') {
        // ========================================
        // MULTIPLE CHOICE FORMAT
        // Columns: question, answer1, answer2, answer3, answer4, correct_answer
        // correct_answer contains MULTIPLE answers separated by commas
        // Example: "Python,JavaScript" means both are correct
        // ========================================
        demoData = [
            { question: "Select programming languages (not markup)", answer1: "Python", answer2: "HTML", answer3: "JavaScript", answer4: "CSS", correct_answer: "Python,JavaScript" },
            { question: "Which are prime numbers?", answer1: "2", answer2: "4", answer3: "5", answer4: "6", correct_answer: "2,5" },
            { question: "Select water bodies", answer1: "Pacific Ocean", answer2: "Sahara Desert", answer3: "Atlantic Ocean", answer4: "Himalayas", correct_answer: "Pacific Ocean,Atlantic Ocean" },
            { question: "Which are fruits?", answer1: "Carrot", answer2: "Apple", answer3: "Potato", answer4: "Banana", correct_answer: "Apple,Banana" },
            { question: "Select odd numbers", answer1: "2", answer2: "3", answer3: "5", answer4: "8", correct_answer: "3,5" }
        ];
        filename = 'MULTIPLE_CHOICE_template.csv';
        typeText = 'Multiple Choice (MULTIPLE correct answers, comma-separated)';
        
    } else {
        // Default fallback
        demoData = [
            { question: "Sample question?", answer1: "Option 1", answer2: "Option 2", answer3: "Option 3", correct_answer: "Option 1" }
        ];
        filename = 'quiz_template.csv';
        typeText = 'General Quiz';
    }
    
    const csv = Papa.unparse(demoData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(`✅ ${typeText} template downloaded!`, "success");
}

function displayCSVPreview(card, data) {
    const preview = card.querySelector(".csv-preview");
    const formSection = card.querySelector(".form-section");
    
    // Hide form, show preview
    formSection.classList.add("hidden");
    preview.classList.remove("hidden");

    // Create preview table - styled like Excel
    let html = `
        <table class="w-full text-[10px] border-collapse">
            <thead>
                <tr class="bg-[#E8EAED] sticky top-0">
                    ${Object.keys(data[0]).map(key => `<th class="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800">${key}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${data.slice(0, 10).map((row, idx) => `
                    <tr class="${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50">
                        ${Object.values(row).map(val => `<td class="border border-gray-300 px-3 py-2 text-gray-700">${val || '-'}</td>`).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <p class="text-[9px] text-gray-600 mt-2">Showing ${Math.min(10, data.length)} of ${data.length} rows</p>
    `;
    
    preview.innerHTML = html;
}

/* =========================================================
   SETUP CSV UPLOAD HANDLER FOR LANGUAGE CARD
========================================================= */
function setupCSVUpload(card, lang) {
    const openModalBtn = card.querySelector(".open-csv-modal");
    const removeBtn = card.querySelector(".remove-csv");
    const csvStatus = card.querySelector(".csv-status");
    const csvPreview = card.querySelector(".csv-preview");
    const formSection = card.querySelector(".form-section");
    
    // Open modal when button clicked
    if (openModalBtn) {
        openModalBtn.onclick = () => {
            openCSVModal(card);
        };
    }
    
    // Remove CSV
    if (removeBtn) {
        removeBtn.onclick = () => {
            card.dataset.csvData = "";
            csvStatus.classList.add("hidden");
            csvPreview.classList.add("hidden");
            csvPreview.innerHTML = "";
            formSection.classList.remove("hidden");
            showToast("CSV file removed", "success");
        };
    }
}

/* =========================================================
   ADD LANGUAGE CARD WITH NUMBERING & POSITIONING
========================================================= */
function addLangCard(lang, type, afterCard = null) {
    const frag = langTpl.content.cloneNode(true);
    const card = frag.querySelector(".language-card");

    // Increment counter for this language
    if (!LANGUAGE_COUNTERS[lang]) {
        LANGUAGE_COUNTERS[lang] = 0;
    }
    LANGUAGE_COUNTERS[lang]++;
    const cardNumber = LANGUAGE_COUNTERS[lang];

    // Store metadata
    card.dataset.lang = lang;
    card.dataset.quizType = type;
    card.dataset.cardNumber = cardNumber;

    // Language header with number
    frag.querySelector(".lang-title").innerText = `${LANGUAGE_CONFIG[lang].name} ${cardNumber}`;

    // Flag icon
    const icon = frag.querySelector(".lang-icon");
    icon.innerHTML = `<span class="fi fi-${LANGUAGE_CONFIG[lang].countryCode}"></span>`;

    const answers = frag.querySelector(".answers");
    const addBtn = frag.querySelector(".add-answer");

    // Remove language card button
    card.querySelector(".remove-lang").onclick = () => {
        card.remove();
        renumberLanguageCards(lang);
    };

    // Add same language card button handled globally

    // If true/false quiz → auto insert 2 fixed answers
    if (type === "truefalse") {
        addBtn.classList.add("hidden");
        answers.appendChild(buildTF("True", `${lang}_${cardNumber}`));
        answers.appendChild(buildTF("False", `${lang}_${cardNumber}`));
    } else {
        for (let i = 0; i < 3; i++) answers.appendChild(buildAnswer(`${lang}_${cardNumber}`, type));

        addBtn.onclick = () => {
            if (answers.children.length < 6) {
                answers.appendChild(buildAnswer(`${lang}_${cardNumber}`, type));
                setTimeout(() => applyAnswerStyling(), 10);
            } else {
                showToast("Max 6 answers allowed", "error");
            }
        };
    }

    // Insert card in the correct position
    const container = document.getElementById("languageForms");
    if (afterCard && afterCard.parentNode === container) {
        // Insert full fragment right after the specified card
        container.insertBefore(frag, afterCard.nextSibling);
    } else {
        // Append to container
        container.appendChild(frag);
    }

    // Setup CSV upload on the actual card element
    setupCSVUpload(card, lang);

    // Render per-language add buttons
    renderAddSameLangButtons();
    
    // Apply initial styling
    setTimeout(() => applyAnswerStyling(), 10);
    
    return card;
}

/* =========================================================
   RENUMBER LANGUAGE CARDS AFTER DELETION
========================================================= */
function renumberLanguageCards(lang) {
    const cards = document.querySelectorAll(`.language-card[data-lang="${lang}"]`);
    cards.forEach((card, index) => {
        const newNumber = index + 1;
        card.dataset.cardNumber = newNumber;
        const title = card.querySelector(".lang-title");
        const cfg = LANGUAGE_CONFIG[lang];
        title.textContent = `${cfg.name} ${newNumber}`;
        
        // Update radio/checkbox names to match new number
        const inputs = card.querySelectorAll('.correctCheck');
        inputs.forEach(input => {
            input.name = `correct_${lang}_${newNumber}`;
        });
    });
    // Update counter
    LANGUAGE_COUNTERS[lang] = cards.length;

    // Render per-language add buttons
    renderAddSameLangButtons();
}

/* =========================================================
   PER-LANGUAGE "ADD ONE MORE QUIZ" BUTTONS
========================================================= */
function renderAddSameLangButtons() {
    // Remove existing buttons
    document.querySelectorAll(".add-same-lang-wrap").forEach(el => el.remove());

    const tpl = document.getElementById("addSameLangTemplate");
    if (!tpl) return;

    const cards = [...document.querySelectorAll("#languageForms .language-card")];
    if (!cards.length) return;

    // Find last card index for each language
    const lastIndex = {};
    cards.forEach((card, idx) => {
        const lang = card.dataset.lang;
        if (lang) lastIndex[lang] = idx;
    });

    const langsInOrder = Object.keys(lastIndex).sort((a, b) => lastIndex[a] - lastIndex[b]);

    langsInOrder.forEach(lang => {
        const lastCard = cards[lastIndex[lang]];
        if (!lastCard) return;

        const node = tpl.content.cloneNode(true);
        const wrap = node.firstElementChild;
        if (!wrap) return;

        wrap.dataset.lang = lang;
        const labelSpan = wrap.querySelector(".lang-name");
        if (labelSpan) labelSpan.textContent = LANGUAGE_CONFIG[lang]?.name || "";

        const btn = wrap.querySelector(".add-same-lang");
        if (btn) {
            btn.onclick = () => {
                const langCards = [...document.querySelectorAll(`.language-card[data-lang="${lang}"]`)];
                const currentLast = langCards[langCards.length - 1];
                if (!currentLast) {
                    showToast("Add a language card first", "error");
                    return;
                }
                const type = currentLast.dataset.quizType;
                const newCard = addLangCard(lang, type, currentLast);
                showToast(`${LANGUAGE_CONFIG[lang].name} ${newCard.dataset.cardNumber} added!`, "success");
            };
        }

        lastCard.insertAdjacentElement("afterend", wrap);
    });
}

/* =========================================================
   UPDATE "ADD MORE LANGUAGE" BUTTON VISIBILITY
========================================================= */
function updateAddLanguageBtn() {
    const btn = document.getElementById("addMoreLanguageBtn");
    const formsContainer = document.getElementById("languageForms");
    
    if (formsContainer.children.length > 0) {
        btn.classList.remove("hidden");
    } else {
        btn.classList.add("hidden");
    }
}

/* =========================================================
   GENERATE INITIAL LANGUAGE FORMS
========================================================= */
function generateLanguageForms() {
    const type = document.querySelector('input[name="quizType"]:checked');
    if (!type) return showToast("Select quiz type first", "error");

    const langs = QUIZ_STATE.selectedLanguages;
    if (!langs.length) return showToast("Select language first", "error");

    const wrap = document.getElementById("languageForms");
    wrap.innerHTML = "";
    QUIZ_STATE.quizType = type.value;
    
    // Reset language counters
    LANGUAGE_COUNTERS = {};

    langs.forEach(lang => addLangCard(lang, type.value));

    renderAddSameLangButtons();

    showToast("Forms loaded!", "success");
}

/* =========================================================
   FORM VALIDATION BEFORE SUBMIT
========================================================= */
document.getElementById("quizForm").onsubmit = e => {
    e.preventDefault();

    let missingQ = false;
    let missingCorrect = false;
    let hasData = false;

    document.querySelectorAll(".language-card").forEach(card => {
        // Check if CSV was uploaded
        if (card.dataset.csvData) {
            hasData = true;
            return;
        }

        // Otherwise check form
        const q = card.querySelector(".question")?.value.trim();
        if (!q) missingQ = true;

        const ok = [...card.querySelectorAll("input[type=radio],input[type=checkbox]")]
            .some(i => i.checked);

        if (!ok) missingCorrect = true;
        hasData = true;
    });

    if (!hasData) return showToast("Add at least one language card", "error");
    if (missingQ) return showToast("Fill all questions or upload CSV", "error");
    if (missingCorrect) return showToast("Mark correct answers", "error");

    showToast("Quiz saved!", "success");
};

/* =========================================================
   INITIALIZE ON PAGE LOAD
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    // Initialize components - These will handle the styling automatically
    new ModernRadio();
    new ModernCheckbox();
    
    // Setup quiz type selection handler
    document.querySelectorAll('input[name="quizType"]').forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.checked) {
                QUIZ_STATE.quizType = this.value;
                // Clear existing forms and reset counters when type changes
                document.getElementById("languageForms").innerHTML = "";
                LANGUAGE_COUNTERS = {};
            }
        });
    });
    
    // Setup language selection handler
    document.querySelectorAll("#languageGrid .real-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            QUIZ_STATE.selectedLanguages = [...document.querySelectorAll("#languageGrid .real-checkbox:checked")]
                .map(i => i.value);
        });
    });
    
    
    // Apply initial styling
    setTimeout(() => applyAnswerStyling(), 100);
    
    // Listen for change events to update styling
    document.addEventListener('change', (e) => {
        if (e.target.matches('.correctCheck')) {
            setTimeout(() => applyAnswerStyling(), 10);
        }
    });
    watchDynamicAnswers();
    // Radio/Checkbox components auto-initialize via event delegation

    // Generate forms button
    const generateBtn = document.querySelector('button[onclick="generateLanguageForms()"]');
    if (generateBtn) {
        generateBtn.onclick = generateLanguageForms;
    }
    
    // CSV Modal Event Listeners
    const modalFileInput = document.getElementById("modalFileInput");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const cancelModalBtn = document.getElementById("cancelModalBtn");
    const confirmUploadBtn = document.getElementById("confirmUploadBtn");
    const downloadDemoBtn = document.getElementById("downloadDemoBtn");
    const csvUploadModal = document.getElementById("csvUploadModal");
    
    if (modalFileInput) {
        modalFileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) handleModalFileSelect(file);
        };
    }
    
    if (closeModalBtn) closeModalBtn.onclick = closeCSVModal;
    if (cancelModalBtn) cancelModalBtn.onclick = closeCSVModal;
    if (confirmUploadBtn) confirmUploadBtn.onclick = confirmModalUpload;
    if (downloadDemoBtn) downloadDemoBtn.onclick = downloadDemoCSV;
    
    // Close modal when clicking outside
    if (csvUploadModal) {
        csvUploadModal.onclick = (e) => {
            if (e.target === csvUploadModal) closeCSVModal();
        };
    }
});
