/* === Language Icons === */
const LANGUAGE_ICONS = {
    en: "images/eng.png",
    ar: "images/ar.png",
};

/* === Toast === */
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

/* === INIT QUIZ TYPE PILLS === */
function initQuizTypeUI() {
    document.querySelectorAll("label.quiz-pill").forEach(label => {
        const radio = label.querySelector("input");

        label.onclick = () => {
            document.querySelectorAll("label.quiz-pill").forEach(l => {
                l.classList.remove("border-[#3FBDFF]", "bg-[#EAF6FF]");
                l.querySelector(".pill-dot")?.classList.remove("bg-[#3FBDFF]", "border-[#3FBDFF]");
            });

            radio.checked = true;

            label.classList.add("border-[#3FBDFF]", "bg-[#EAF6FF]");
            label.querySelector(".pill-dot")
                ?.classList.add("bg-[#3FBDFF]", "border-[#3FBDFF]");
        };
    });
}

/* === LANGUAGE GRID BEHAVIOUR === */
function initLanguageGrid() {
    document.querySelectorAll("#languageGrid .lang-item").forEach(label => {
        const input = label.querySelector(".real-checkbox");
        const tick = label.querySelector(".visual-tick");

        label.onclick = () => {
            input.checked = !input.checked;

            if (input.checked) {
                tick.style.background = "#3FBDFF";
                tick.style.borderColor = "#3FBDFF";
                tick.innerHTML =
                    `<svg class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="3">
                        <path d="M5 13l4 4L19 7"/>
                    </svg>`;
            } else {
                tick.style.background = "white";
                tick.style.borderColor = "#ccc";
                tick.innerHTML = "";
            }
        };
    });
}

/* === GLOBAL VARS === */
const langTpl = document.getElementById("langTemplate");
const ansTpl = document.getElementById("answerTemplate");

/* === BUILD TRUE/FALSE ANSWER === */
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
                rounded-full border border-gray-300 bg-white overflow-hidden"></span>

            Correct
        </label>

        <div class="w-6 h-6 opacity-0"></div>
    `;

    return div;
}

/* === BUILD NORMAL ANSWER === */
function buildAnswer(lang, type) {
    const frag = ansTpl.content.cloneNode(true);
    const chk = frag.querySelector(".correctCheck");

    chk.name = `correct_${lang}`;
    chk.type = type === "multi" ? "checkbox" : "radio";

    frag.querySelector(".remove-ans").onclick =
        e => e.target.closest(".answer")?.remove();

    return frag;
}

/* === APPLY CUSTOM RADIO / CHECK UI === */
function applyAnswerUI() {
    document.querySelectorAll(".answer-pill").forEach(pill => {
        const input = pill.querySelector(".correctCheck");
        const tick = pill.querySelector(".tick");

        pill.onclick = e => {
            e.preventDefault();

            if (input.type === "radio") {
                // reset others
                document.querySelectorAll(`input[name="${input.name}"]`).forEach(r => {
                    r.checked = false;
                    const p = r.closest(".answer-pill");
                    updateTickOff(p.querySelector(".tick"), p);
                });

                input.checked = true;
            } else {
                input.checked = !input.checked;
            }

            updateTickState(input, tick, pill);
        };
    });
}

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

/* === ADD LANGUAGE CARD === */
function addLangCard(lang, type) {
    const frag = langTpl.content.cloneNode(true);

    frag.querySelector(".lang-title").innerText = `Language · ${lang.toUpperCase()}`;

    const icon = frag.querySelector(".lang-icon");
    if (LANGUAGE_ICONS[lang])
        icon.innerHTML =
            `<img src="${LANGUAGE_ICONS[lang]}" class="w-full h-full object-cover rounded-full">`;

    const answers = frag.querySelector(".answers");
    const addBtn = frag.querySelector(".add-answer");
    const card = frag.querySelector(".language-card");

    card.querySelector(".remove-lang").onclick = () => card.remove();

    if (type === "truefalse") {
        addBtn.classList.add("hidden");
        answers.appendChild(buildTF("True", lang));
        answers.appendChild(buildTF("False", lang));
    } else {
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

    document.getElementById("languageForms").appendChild(frag);
    applyAnswerUI();
}

/* === GENERATE LANGUAGES === */
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

/* === SUBMIT === */
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

/* === INIT === */
document.addEventListener("DOMContentLoaded", () => {
    initQuizTypeUI();
    initLanguageGrid();
});
