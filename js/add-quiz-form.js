/* === Toast === */
function showToast(msg, type="success"){
    const box=document.getElementById("toastContainer");
    const el=document.createElement("div");
    el.className=`px-3 py-1 text-xs rounded-full text-white ${type==="success"?"bg-green-500":"bg-red-500"} transition`;
    el.style.opacity="0";
    el.innerText=msg;
    box.appendChild(el);
    setTimeout(()=>el.style.opacity="1",50)
    setTimeout(()=>el.style.opacity="0",2000)
    setTimeout(()=>el.remove(),2400)
}


/* === Quiz pill behavior === */
function initRadioGroup(name){
    const radios=document.querySelectorAll(`input[name="${name}"]`);
    radios.forEach(radio=>{
        const label=radio.closest("label");

        label.addEventListener("click",()=>{
            radio.checked=true;
            updateRadioUI(name);
        });

        label.addEventListener("keydown",e=>{
            if(e.key===" "||e.key==="Enter"){
                radio.checked=true;
                updateRadioUI(name);
            }
        });
    });
    updateRadioUI(name);
}

function updateRadioUI(name){
    document.querySelectorAll(`input[name="${name}"]`).forEach(radio=>{
        const label=radio.closest("label");
        const dot=label.querySelector(".pill-dot");

        label.classList.remove("border-[#3FBDFF]","bg-[#EAF6FF]");
        dot.classList.remove("border-[#3FBDFF]","bg-[#3FBDFF]");

        if(radio.checked){
            label.classList.add("border-[#3FBDFF]","bg-[#EAF6FF]");
            dot.classList.add("border-[#3FBDFF]","bg-[#3FBDFF]");
        }
    });
}


/* === Your language tick system === */
(function(){
    const CHECK = '<svg class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>';
    const EMPTY = '<svg class="w-2.5 h-2.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>';

    function initGrid(){
        document.querySelectorAll('#languageGrid .lang-item').forEach(label=>{
            const input=label.querySelector('.real-checkbox');
            const tick=label.querySelector('.visual-tick');
            sync(input,tick);

            label.setAttribute("tabindex",0);

            label.addEventListener("click",()=>toggle(label));
            label.addEventListener("keydown",e=>{
                if(e.key===" "||e.key==="Enter"){
                    e.preventDefault();
                    toggle(label);
                }
            });
        });
    }
    function sync(input,tick){
        if(input.checked){
            tick.classList.remove("border-gray-300","bg-white");
            tick.classList.add("bg-[#3FBDFF]","border-[#3FBDFF]");
            tick.innerHTML=CHECK;
        } else {
            tick.classList.remove("bg-[#3FBDFF]","border-[#3FBDFF]");
            tick.classList.add("border-gray-300","bg-white");
            tick.innerHTML=EMPTY;
        }
    }
    function toggle(label){
        const input=label.querySelector(".real-checkbox");
        const tick=label.querySelector(".visual-tick");
        input.checked=!input.checked;
        sync(input,tick);
    }
    if(document.readyState==="loading"){
        document.addEventListener("DOMContentLoaded",initGrid);
    }else initGrid();
})();

/* === Dynamic forms === */
const langTpl=document.getElementById("langTemplate");
const ansTpl=document.getElementById("answerTemplate");

function generateLanguageForms(){
    const type=document.querySelector('input[name="quizType"]:checked');
    if(!type) return showToast("Select quiz type","error");

    const langs=[...document.querySelectorAll("#languageGrid .real-checkbox:checked")].map(i=>i.value);
    if(!langs.length) return showToast("Select language","error");

    const container=document.getElementById("languageForms");
    container.innerHTML="";

    langs.forEach(lang=>addLang(lang,type.value));

    showToast("Forms loaded");
}

function addLang(lang, type){
    const frag = langTpl.content.cloneNode(true);
    frag.querySelector(".lang-title").innerText = `Language · ${lang.toUpperCase()}`;

    const answers = frag.querySelector(".answers");
    const addBtn = frag.querySelector(".add-answer");
    const card = frag.querySelector(".language-card");

    card.querySelector(".remove-lang").onclick = () => card.remove();

    if(type === "truefalse"){
        addBtn.classList.add("hidden");
        answers.innerHTML =
            buildTF("True",lang) +
            buildTF("False",lang);
    } else {
        // default 3 answers
        for (let i = 0; i < 3; i++) answers.appendChild(buildAnswer(lang,"multi"));

        // Add max 6
        addBtn.onclick = () => {
            if (answers.children.length < 6) answers.appendChild(buildAnswer(lang,"multi"));
            else showToast("Max 6 answers","error");
        };
    }

    document.getElementById("languageForms").appendChild(frag);
}

function buildAnswer(lang,type){
    const frag=ansTpl.content.cloneNode(true);
    const check=frag.querySelector(".correctCheck");
    check.name=`correct_${lang}`;
    check.type=type==="multi"?"checkbox":"radio";

    frag.querySelector(".remove-ans").onclick=e=>e.target.closest(".answer").remove();
    return frag;
}

function buildTF(text,lang){
    return `
    <div class="answer flex items-center gap-3">
        <input disabled value="${text}"
               class="w-full px-4 py-2 text-xs rounded-lg border border-gray-300 bg-white">
        <label class="correct-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-full text-xs cursor-pointer">
            <input type="radio" name="correct_${lang}" class="hidden peer">
            <span class="w-3 h-3 rounded-full border border-gray-300 peer-checked:bg-[#3FBDFF]"></span>
            <span class="peer-checked:text-[#3FBDFF] peer-checked:border-[#3FBDFF] peer-checked:bg-[#EAF6FF]  border-gray-200 px-2 py-0.5 rounded-full">
                Correct
            </span>
        </label>
        <div class="w-6 h-6 opacity-0"></div>
    </div>
    `;
}

document.getElementById("quizForm").onsubmit=function(e){
    e.preventDefault();

    let bad=false;
    document.querySelectorAll(".language-card").forEach(card=>{
        const correct=[...card.querySelectorAll("input[type=radio],input[type=checkbox]")].some(i=>i.checked);
        if(!correct) bad=true;
    });

    if(bad) return showToast("Select at least one correct answer","error");

    showToast("Saved successfully");
};

document.addEventListener("DOMContentLoaded",()=>initRadioGroup("quizType"));