/* =========================================================
   LANGUAGE ICON MAP  
   - Stores icon paths for dynamically added language cards
========================================================= */
const LANGUAGE_ICONS = {
    en: "images/eng.png",
    ar: "images/ar.png",
};


/* =========================================================
   TOAST SYSTEM  
   - Shows animated success/error notifications
========================================================= */
function showToast(message, type = "success") {
    const box = document.getElementById("toastContainer");
    if (!box) return;

    // Create toast node
    const el = document.createElement("div");

    // Style class + theme color
    el.className =
        `flex items-center gap-2 px-4 py-2 text-xs font-medium 
         rounded-lg border backdrop-blur-md shadow-sm
         transition-all duration-300 transform translate-x-10 opacity-0
         ${type === "success"
            ? "bg-[#3CC471] border-[#24A459] text-white"
            : "bg-[#FF4E4E] border-[#D83232] text-white"
         }`;

    // Icon + message
    el.innerHTML = `<span>${type === "success" ? "✔" : "⚠️"}</span> ${message}`;

    // Insert toast
    box.appendChild(el);

    // Entrance animation
    setTimeout(() => {
        el.style.transform = "translateX(0)";
        el.style.opacity = "1";
    }, 40);

    // Exit animation
    setTimeout(() => {
        el.style.transform = "translateX(40px)";
        el.style.opacity = "0";
    }, 2400);

    // Remove after animation
    setTimeout(() => el.remove(), 2800);
}


/* =========================================================
   QUIZ TYPE UI BEHAVIOR (Single / Multiple / True-False)
   - Handles pill styling + checking logic
========================================================= */
function initQuizTypeUI() {
    const pills = document.querySelectorAll("label.quiz-pill");

    pills.forEach(label => {
        const radio = label.querySelector("input");
        const dot = label.querySelector(".pill-dot");

        /* Inject inner animated core IF not created */
        if (!dot.querySelector(".dot-core")) {
            dot.style.display = "flex";
            dot.style.alignItems = "center";
            dot.style.justifyContent = "center";

            dot.innerHTML = `
                <span class="dot-core"
                    style="
                        width:8px;
                        height:8px;
                        border-radius:50%;
                        background:#3FBDFF;
                        opacity:0;
                        transform:scale(0.2);
                        transition: all .2s ease;
                    ">
                </span>
            `;
        }

        /* Click handler */
        label.onclick = () => {

            // reset all pills
            pills.forEach(l => {
                const d = l.querySelector(".pill-dot");
                const core = l.querySelector(".dot-core");

                l.classList.remove("border-[#3FBDFF]", "bg-[#EAF6FF]");
                d.style.borderColor = "#ccc";
                d.style.background = "white";

                core.style.opacity = "0";
                core.style.transform = "scale(0.2)";
            });

            // activate selected pill
            radio.checked = true;
            label.classList.add("border-[#3FBDFF]", "bg-[#EAF6FF]");

            const core = dot.querySelector(".dot-core");
            dot.style.borderColor = "#3FBDFF";
            dot.style.background = "#EAF6FF";

            core.style.opacity = "1";
            core.style.transform = "scale(1)";
        };
    });
}



/* =========================================================
   LANGUAGE SELECTION GRID UI
   - Handles custom tick + icon change when selecting language
========================================================= */
function initLanguageGrid() {
    document.querySelectorAll("#languageGrid .lang-item").forEach(label => {
        const input = label.querySelector(".real-checkbox");
        const tick = label.querySelector(".visual-tick");

        // Toggle on click
        label.onclick = () => {
            input.checked = !input.checked;

            // Apply active state
            if (input.checked) {
                tick.style.background = "#3FBDFF";
                tick.style.borderColor = "#3FBDFF";
                tick.innerHTML =
                    `<svg class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="3">
                        <path d="M5 13l4 4L19 7"/>
                    </svg>`;
            }
            // Reset unselected state
            else {
                tick.style.background = "white";
                tick.style.borderColor = "#ccc";
                tick.innerHTML = "";
            }
        };
    });
}


/* =========================================================
   GLOBAL TEMPLATE NODES (Cloned when generating fields)
========================================================= */
const langTpl = document.getElementById("langTemplate");
const ansTpl = document.getElementById("answerTemplate");


/* =========================================================
   BUILD TRUE/FALSE ANSWER UI BLOCK
========================================================= */
/* =========================================================
   BUILD TRUE/FALSE ANSWER UI BLOCK
   - Now compatible with applyAnswerUI (has <svg> inside .tick)
========================================================= */
function buildTF(text, lang) {
    const div = document.createElement("div");
    div.className = "answer flex items-center gap-3";

    div.innerHTML = `
        <input disabled value="${text}"
            class="w-full px-4 py-2 text-xs rounded-lg border border-gray-300 bg-gray-100">

        <label class="answer-pill flex items-center gap-2 px-3 py-1 
            border border-gray-300 rounded-full text-xs cursor-pointer transition">

            <input type="radio" name="correct_${lang}" class="correctCheck hidden">

            <span class="tick flex items-center justify-center w-3 h-3 
                rounded-full border border-gray-300 bg-white overflow-hidden">
                
                <!-- this svg is required for applyAnswerUI -->
                <svg class="w-2 h-2 opacity-0 text-white transition-opacity duration-200"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     stroke-width="3">
                    <path d="M5 13l4 4L19 7"/>
                </svg>
            </span>

            Correct
        </label>

        <div class="w-6 h-6 opacity-0"></div>
    `;

    return div;
}



/* =========================================================
   BUILD NORMAL ANSWER (Text + correct selector)
========================================================= */
function buildAnswer(lang, type) {
    const frag = ansTpl.content.cloneNode(true);
    const chk = frag.querySelector(".correctCheck");

    // Assign correct group name
    chk.name = `correct_${lang}`;
    chk.type = type === "multi" ? "checkbox" : "radio";

    // Remove button event
    frag.querySelector(".remove-ans").onclick =
        e => e.target.closest(".answer")?.remove();

    return frag;
}


/* =========================================================
   CUSTOM RADIO & CHECKBOX UI LOGIC
========================================================= */
/* ========= RADIO / CHECKBOX UI ENGINE ========= */

function applyAnswerUI() {
    document.querySelectorAll(".answer-pill").forEach(pill => {
        const input = pill.querySelector(".correctCheck");
        const tick = pill.querySelector(".tick");
        const svg = tick ? tick.querySelector("svg") : null;

        if (!input || !tick || !svg) return;

        // CLICK BEHAVIOUR
        pill.onclick = (e) => {
            e.preventDefault();

            if (input.type === "radio") {

                // uncheck all same group
                document.querySelectorAll(`input[name="${input.name}"]`).forEach(r => {
                    r.checked = false;
                    resetTick(r.closest(".answer-pill"));
                });

                input.checked = true;
            } else {
                // checkbox toggle
                input.checked = !input.checked;
            }

            updateTick(pill);
        };

        // INITIAL SYNC UI
        updateTick(pill);
    });
}

function resetTick(pill) {
    if (!pill) return;
    const tick = pill.querySelector(".tick");
    const svg = tick.querySelector("svg");

    // unfill state
    pill.style.background = "";
    pill.style.borderColor = "#D1D5DB"; // gray-300

    tick.style.background = "#FFFFFF";
    tick.style.borderColor = "#D1D5DB";

    svg.style.opacity = "0";
}

function updateTick(pill) {
    const input = pill.querySelector(".correctCheck");
    const tick = pill.querySelector(".tick");
    const svg = tick.querySelector("svg");

    if (input.checked) {

        pill.style.background = "#EAF6FF";
        pill.style.borderColor = "#3FBDFF";

        tick.style.background = "#3FBDFF";
        tick.style.borderColor = "#3FBDFF";

        svg.style.opacity = "1";
    } else {
        resetTick(pill);
    }
}

/* ========= INJECT UI WHEN ANSWERS ADDED ========= */

function watchDynamicAnswers() {
    // mutation observer — whenever answers are inserted, UI binds
    const observer = new MutationObserver(() => applyAnswerUI());
    observer.observe(document.getElementById("languageForms"), {
        subtree: true,
        childList: true
    });
}

/* ========= CALL THIS AFTER YOU GENERATE FORMS ========= */

document.addEventListener("DOMContentLoaded", () => {
    watchDynamicAnswers();
    applyAnswerUI();
});



/* =========================================================
   UI Update Helpers (Tick fill / unfill)
========================================================= */
function updateTickState(input, tick, pill) {
    if (input.checked) {
        pill.style.background = "#EAF6FF";
        pill.style.borderColor = "#3FBDFF";

        tick.style.background = "#3FBDFF";
        tick.style.borderColor = "#3FBDFF";
        tick.innerHTML =
            `<svg class="w-2 h-2 text-white" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="3">
                <path d="M5 13l4 4L19 7"/>
            </svg>`;
    } else {
        updateTickOff(tick, pill);
    }
}

function updateTickOff(tick, pill) {
    pill.style.background = "white";
    pill.style.borderColor = "#ddd";

    tick.style.background = "white";
    tick.style.borderColor = "#ccc";
    tick.innerHTML = "";
}


/* =========================================================
   ADD LANGUAGE FORM BLOCK + ANSWERS INSIDE IT
========================================================= */
function addLangCard(lang, type) {
    const frag = langTpl.content.cloneNode(true);

    // Language title
    frag.querySelector(".lang-title").innerText = `Language · ${lang.toUpperCase()}`;

    // Insert flag icon
    const icon = frag.querySelector(".lang-icon");
    if (LANGUAGE_ICONS[lang])
        icon.innerHTML =
            `<img src="${LANGUAGE_ICONS[lang]}" class="w-full h-full object-cover rounded-full">`;

    const answers = frag.querySelector(".answers");
    const addBtn = frag.querySelector(".add-answer");
    const card = frag.querySelector(".language-card");

    // Remove language card button
    card.querySelector(".remove-lang").onclick = () => card.remove();

    // If true/false quiz → auto insert 2 fixed answers
    if (type === "truefalse") {
        addBtn.classList.add("hidden");
        answers.appendChild(buildTF("True", lang));
        answers.appendChild(buildTF("False", lang));
    }
    // Else generate default 3 answers + add button support
    else {
        for (let i = 0; i < 3; i++) answers.appendChild(buildAnswer(lang, type));

        addBtn.onclick = () => {
            if (answers.children.length < 6) {
                answers.appendChild(buildAnswer(lang, type));
                applyAnswerUI();
            } else {
                showToast("Max 6 answers allowed", "error");
            }
        };
    }

    // Append card to container
    document.getElementById("languageForms").appendChild(frag);

    // Activate tick UI behaviour
    applyAnswerUI();
}


/* =========================================================
   GENERATE LANGUAGE FORMS (Triggered by button click)
========================================================= */
function generateLanguageForms() {
    const type = document.querySelector('input[name="quizType"]:checked');
    if (!type) return showToast("Select quiz type first", "error");

    const langs = [...document.querySelectorAll("#languageGrid .real-checkbox:checked")]
        .map(i => i.value);

    if (!langs.length) return showToast("Select language first", "error");

    const wrap = document.getElementById("languageForms");
    wrap.innerHTML = "";

    langs.forEach(lang => addLangCard(lang, type.value));

    showToast("Forms loaded!", "success");
}


/* =========================================================
   FORM VALIDATION BEFORE SUBMIT
========================================================= */
document.getElementById("quizForm").onsubmit = e => {
    e.preventDefault();

    let missingQ = false;
    let missingCorrect = false;

    document.querySelectorAll(".language-card").forEach(card => {
        const q = card.querySelector(".question")?.value.trim();
        if (!q) missingQ = true;

        const ok =
            [...card.querySelectorAll("input[type=radio],input[type=checkbox]")]
                .some(i => i.checked);

        if (!ok) missingCorrect = true;
    });

    if (missingQ) return showToast("Fill all questions", "error");
    if (missingCorrect) return showToast("Mark correct answers", "error");

    showToast("Quiz saved!", "success");
};


/* =========================================================
   INITUI ON PAGE LOAD
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    initQuizTypeUI();
    initLanguageGrid();
});
