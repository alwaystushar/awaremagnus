// Quiz data
const quizData = [
  {
    lesson: 1,
    question: "What Is Phishing?",
    options: ["Email Scam", "Personal Hack", "Firewall", "Virus"],
    correct: 0,
  },
  {
    lesson: 1,
    question: "What is the primary purpose of a firewall?",
    options: ["Monitor network traffic", "Encrypt data", "Create backups", "Update software"],
    correct: 0,
  },
  {
    lesson: 1,
    question: "Which of the following is NOT a type of malware?",
    options: ["Antivirus", "Virus", "Trojan", "Worm"],
    correct: 0,
  },
  {
    lesson: 1,
    question: "What does VPN stand for?",
    options: ["Virtual Private Network", "Very Personal Number", "Viral Protocol Network", "Virtual Protected Node"],
    correct: 0,
  },
  {
    lesson: 1,
    question: "How often should you update your passwords?",
    options: ["Every 3 months", "Every month", "Every week", "Never"],
    correct: 0,
  },
  {
    lesson: 1,
    question: "What is two-factor authentication?",
    options: [
      "Using two passwords",
      "Using password and another verification method",
      "Using two devices",
      "Using two email addresses",
    ],
    correct: 1,
  },
  {
    lesson: 1,
    question: "Which is a strong password characteristic?",
    options: [
      "Short and simple",
      "Your birthdate",
      "Mix of letters, numbers, and symbols",
      "Your pet's name",
    ],
    correct: 2,
  },
  {
    lesson: 1,
    question: "What should you do with suspicious emails?",
    options: ["Open attachments", "Report and delete", "Forward to friends", "Reply to sender"],
    correct: 1,
  },
];

let currentQuestion = 0;
let selectedAnswers = {};
let savedAnswers = {};

const elements = {
  lessonInfo: document.getElementById("lessonInfo"),
  questionText: document.getElementById("questionText"),
  progressText: document.getElementById("progressText"),
  progressIndicator: document.querySelector(".progress-indicator"),
  statusCount: document.getElementById("statusCount"),
  optionsContainer: document.getElementById("optionsContainer"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  saveAnswerBtn: document.getElementById("saveAnswerBtn"),
  answerStatusMsg: document.getElementById("answerStatusMsg"),
  quizContainer: document.getElementById("quizContainer"),
  completionContainer: document.getElementById("completionContainer"),
  viewReportBtn: document.getElementById("viewReportBtn"),
  goBackBtn: document.getElementById("goBackBtn"),
  totalCount: document.getElementById("totalCount"),
  totalQuizCount: document.getElementById("totalQuizCount"),
  completedCount: document.getElementById("completedCount"),
};

function initQuiz() {
  elements.totalCount.textContent = String(quizData.length).padStart(2, "0");
  elements.totalQuizCount.textContent = "12";
  elements.completedCount.textContent = "1";
  renderQuestion();
  bindEvents();
}

function renderQuestion() {
  const quiz = quizData[currentQuestion];

  if (!Array.isArray(selectedAnswers[currentQuestion])) {
    selectedAnswers[currentQuestion] = [];
  }

  elements.lessonInfo.textContent = `Lesson ${quiz.lesson} Of 2`;
  elements.questionText.textContent = quiz.question;
  elements.progressText.textContent = `${currentQuestion + 1}/${quizData.length}`;

  const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;
  elements.progressIndicator.style.width = `${progressPercentage}%`;
  elements.statusCount.textContent = String(currentQuestion + 1).padStart(2, "0");

  renderOptions(quiz.options);

  elements.prevBtn.disabled = currentQuestion === 0;
  elements.prevBtn.style.opacity = currentQuestion === 0 ? "0.5" : "1";
  elements.nextBtn.textContent =
    currentQuestion === quizData.length - 1 ? "Submit Quiz" : "Next Quiz";

  updateSaveButton();
  elements.answerStatusMsg.innerHTML = "";
}

function renderOptions(options) {
  elements.optionsContainer.innerHTML = "";

  options.forEach((option, index) => {
    const isChecked = selectedAnswers[currentQuestion].includes(index);
    const optionHTML = `
      <label class="flex items-center gap-4 cursor-pointer">
        <span class="option-check ${isChecked ? "is-checked" : ""}">
          <svg class="${
            isChecked ? "opacity-100" : "opacity-0"
          }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <input type="checkbox" name="answer" value="${index}" ${
          isChecked ? "checked" : ""
        } class="hidden" data-index="${index}">
        <div class="flex-1 border-2 rounded-lg px-4 py-3 transition-colors duration-200 ${
          isChecked
            ? "border-blue-500 bg-blue-50 text-blue-700"
            : "border-gray-200 hover:border-blue-300 text-gray-700"
        }">
          <span class="font-medium">${option}</span>
        </div>
      </label>
    `;

    elements.optionsContainer.insertAdjacentHTML("beforeend", optionHTML);
  });

  elements.optionsContainer
    .querySelectorAll("input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const index = Number(checkbox.dataset.index);
        toggleAnswer(index);
      });
    });
}

function toggleAnswer(index) {
  if (!Array.isArray(selectedAnswers[currentQuestion])) {
    selectedAnswers[currentQuestion] = [];
  }

  if (selectedAnswers[currentQuestion].includes(index)) {
    selectedAnswers[currentQuestion] = selectedAnswers[currentQuestion].filter(
      (item) => item !== index
    );
  } else {
    selectedAnswers[currentQuestion].push(index);
  }

  updateSaveButton();
  renderQuestion();
}

function updateSaveButton() {
  const hasAnswer =
    Array.isArray(selectedAnswers[currentQuestion]) &&
    selectedAnswers[currentQuestion].length > 0;
  const isSaved =
    Array.isArray(savedAnswers[currentQuestion]) &&
    savedAnswers[currentQuestion].length > 0;

  elements.saveAnswerBtn.disabled = !hasAnswer;

  if (isSaved) {
    elements.saveAnswerBtn.classList.remove("bg-blue-500", "hover:bg-blue-600");
    elements.saveAnswerBtn.classList.add("bg-green-500", "hover:bg-green-600");
    elements.saveAnswerBtn.textContent = "✓ Answer Saved";
    elements.answerStatusMsg.innerHTML =
      '<span class="text-green-600 font-semibold">Answer saved successfully!</span>';
  } else {
    elements.saveAnswerBtn.classList.remove("bg-green-500", "hover:bg-green-600");
    elements.saveAnswerBtn.classList.add("bg-blue-500", "hover:bg-blue-600");
    elements.saveAnswerBtn.textContent = "Save Answer";
    elements.answerStatusMsg.innerHTML = "";
  }
}

function saveAnswer() {
  if (
    Array.isArray(selectedAnswers[currentQuestion]) &&
    selectedAnswers[currentQuestion].length > 0
  ) {
    savedAnswers[currentQuestion] = [...selectedAnswers[currentQuestion]];
    updateSaveButton();
  }
}

function goToPreviousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion -= 1;
    renderQuestion();
  }
}

function goToNextQuestion() {
  if (!Array.isArray(savedAnswers[currentQuestion]) || savedAnswers[currentQuestion].length === 0) {
    elements.answerStatusMsg.innerHTML =
      '<span class="text-red-600 font-semibold">Please save your answer first!</span>';
    return;
  }

  if (currentQuestion < quizData.length - 1) {
    currentQuestion += 1;
    renderQuestion();
    return;
  }

  showCompletionScreen();
}

function showCompletionScreen() {
  elements.completionContainer.style.minHeight = `${elements.quizContainer.offsetHeight}px`;
  elements.quizContainer.classList.add("hidden");
  elements.completionContainer.classList.remove("hidden");
  requestAnimationFrame(() => {
    elements.completionContainer.classList.remove("opacity-0", "translate-y-4");
    elements.completionContainer.classList.add("opacity-100", "translate-y-0");

    const completionIcon = document.getElementById("completionIcon");
    const completionText = document.getElementById("completionText");
    const completionActions = document.getElementById("completionActions");

    if (completionIcon) {
      completionIcon.classList.remove("scale-90");
      completionIcon.classList.add("scale-100");
    }
    if (completionText) {
      setTimeout(() => {
        completionText.classList.remove("opacity-0", "translate-y-3");
        completionText.classList.add("opacity-100", "translate-y-0");
      }, 120);
    }

    if (completionActions) {
      setTimeout(() => {
        completionActions.classList.remove("opacity-0", "translate-y-3");
        completionActions.classList.add("opacity-100", "translate-y-0");
      }, 220);
    }
  });
}

function goBackToQuiz() {
  currentQuestion = 0;
  selectedAnswers = {};
  savedAnswers = {};
  elements.completionContainer.classList.add("opacity-0", "translate-y-6");
  elements.completionContainer.classList.remove("opacity-100", "translate-y-0");

  const completionIcon = document.getElementById("completionIcon");
  const completionText = document.getElementById("completionText");
  const completionActions = document.getElementById("completionActions");

  if (completionIcon) {
    completionIcon.classList.add("scale-90");
    completionIcon.classList.remove("scale-100");
  }

  [completionText, completionActions].forEach((el) => {
    if (!el) return;
    el.classList.add("opacity-0", "translate-y-3");
    el.classList.remove("opacity-100", "translate-y-0");
  });

  elements.completionContainer.classList.add("hidden");
  elements.quizContainer.classList.remove("hidden");
  renderQuestion();
}

function bindEvents() {
  elements.saveAnswerBtn.addEventListener("click", saveAnswer);
  elements.prevBtn.addEventListener("click", goToPreviousQuestion);
  elements.nextBtn.addEventListener("click", goToNextQuestion);
  elements.viewReportBtn.addEventListener("click", () => {
    window.location.href = "Report-Card.HTML";
  });
  elements.goBackBtn.addEventListener("click", goBackToQuiz);
}

initQuiz();