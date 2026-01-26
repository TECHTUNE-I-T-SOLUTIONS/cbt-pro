// Exam Page Script

let session = getCurrentSession();
let questions = [];
let currentQuestionIndex = 0;
let timer = null;

// Check if user is logged in and exam started
if (!session || !session.examStartTime) {
  showAlert('Please complete the registration process first', 'error');
  setTimeout(() => navigateTo('../login/index.html'), 1500);
} else {
  initializeExam();
}

function initializeExam() {
  // Load questions
  questions = getQuestionsByExamId(session.examId);
  
  if (questions.length === 0) {
    showAlert('No questions found for this exam', 'error');
    return;
  }
  
  // Load exam details
  const exam = getExamById(session.examId);
  const candidate = getCandidateById(session.candidateId);
  
  document.getElementById('examName').textContent = exam.name;
  document.getElementById('candidateName').textContent = candidate.name;
  document.getElementById('totalQuestions').textContent = questions.length;
  
  // Initialize answers if not exists
  if (!session.answers) {
    session.answers = {};
  }
  if (!session.markedForReview) {
    session.markedForReview = [];
  }
  
  // Load saved current question or start from 0
  currentQuestionIndex = session.currentQuestion || 0;
  
  // Start timer
  startTimer(exam.duration);
  
  // Build question palette
  buildPalette();
  
  // Load first question
  loadQuestion(currentQuestionIndex);
  
  // Setup event listeners
  setupEventListeners();
}

function startTimer(durationMinutes) {
  const examStartTime = session.examStartTime;
  const elapsedSeconds = Math.floor((Date.now() - examStartTime) / 1000);
  const totalSeconds = durationMinutes * 60;
  let remainingSeconds = totalSeconds - elapsedSeconds;
  
  if (remainingSeconds <= 0) {
    autoSubmitExam();
    return;
  }
  
  updateTimerDisplay(remainingSeconds);
  
  timer = setInterval(() => {
    remainingSeconds--;
    updateTimerDisplay(remainingSeconds);
    
    if (remainingSeconds <= 0) {
      clearInterval(timer);
      autoSubmitExam();
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const timerElement = document.getElementById('timer');
  const timerDisplay = document.getElementById('timerDisplay');
  
  timerElement.textContent = formatTime(seconds);
  
  // Change color based on remaining time
  if (seconds <= 300) { // 5 minutes
    timerDisplay.classList.add('danger');
    timerDisplay.classList.remove('warning');
  } else if (seconds <= 600) { // 10 minutes
    timerDisplay.classList.add('warning');
    timerDisplay.classList.remove('danger');
  }
}

function buildPalette() {
  const paletteGrid = document.getElementById('paletteGrid');
  paletteGrid.innerHTML = '';
  
  questions.forEach((question, index) => {
    const btn = document.createElement('button');
    btn.className = 'palette-item';
    btn.textContent = index + 1;
    btn.dataset.index = index;
    
    // Add status classes
    updatePaletteItem(btn, index);
    
    btn.addEventListener('click', () => {
      saveCurrentAnswer();
      currentQuestionIndex = index;
      loadQuestion(index);
    });
    
    paletteGrid.appendChild(btn);
  });
}

function updatePaletteItem(item, index) {
  const questionId = questions[index].id;
  
  // Remove all status classes
  item.classList.remove('answered', 'marked', 'current');
  
  // Add current class
  if (index === currentQuestionIndex) {
    item.classList.add('current');
  }
  
  // Add answered class
  if (session.answers[questionId]) {
    item.classList.add('answered');
  }
  
  // Add marked class
  if (session.markedForReview && session.markedForReview.includes(questionId)) {
    item.classList.add('marked');
  }
}

function updateAllPaletteItems() {
  const items = document.querySelectorAll('.palette-item');
  items.forEach((item, index) => {
    updatePaletteItem(item, index);
  });
}

function loadQuestion(index) {
  const question = questions[index];
  currentQuestionIndex = index;
  
  // Update session
  session.currentQuestion = index;
  saveCurrentSession(session);
  
  // Update question header
  document.getElementById('currentQuestionNum').textContent = index + 1;
  
  // Update question text
  document.getElementById('questionText').textContent = question.text;
  
  // Load options
  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';
  
  const options = ['A', 'B', 'C', 'D'];
  options.forEach(option => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option-item';
    
    const savedAnswer = session.answers[question.id];
    if (savedAnswer === option) {
      optionDiv.classList.add('selected');
    }
    
    optionDiv.innerHTML = `
      <input 
        type="radio" 
        name="answer" 
        value="${option}" 
        id="option${option}"
        ${savedAnswer === option ? 'checked' : ''}
      >
      <label for="option${option}" class="option-label">
        <strong>${option}.</strong> ${question['option' + option]}
      </label>
    `;
    
    optionDiv.addEventListener('click', function(e) {
      if (e.target.tagName !== 'INPUT') {
        const radio = this.querySelector('input');
        radio.checked = true;
        radio.dispatchEvent(new Event('change'));
      }
    });
    
    const radio = optionDiv.querySelector('input');
    radio.addEventListener('change', function() {
      // Remove selected class from all options
      document.querySelectorAll('.option-item').forEach(item => {
        item.classList.remove('selected');
      });
      // Add selected class to parent
      optionDiv.classList.add('selected');
      
      // Save answer
      saveAnswer(question.id, this.value);
    });
    
    optionsContainer.appendChild(optionDiv);
  });
  
  // Update mark for review button
  const markBtn = document.getElementById('markReviewBtn');
  if (session.markedForReview && session.markedForReview.includes(question.id)) {
    markBtn.innerHTML = `
      <i data-lucide="bookmark-check" class="icon-xs"></i>
      Marked for Review
    `;
    markBtn.classList.add('btn-warning');
  } else {
    markBtn.innerHTML = `
      <i data-lucide="bookmark" class="icon-xs"></i>
      Mark for Review
    `;
    markBtn.classList.remove('btn-warning');
  }
  
  // Update navigation buttons
  document.getElementById('prevBtn').disabled = index === 0;
  
  const nextBtn = document.getElementById('nextBtn');
  if (index === questions.length - 1) {
    nextBtn.innerHTML = `
      Review Answers
      <i data-lucide="arrow-right" class="icon-xs"></i>
    `;
  } else {
    nextBtn.innerHTML = `
      Next
      <i data-lucide="arrow-right" class="icon-xs"></i>
    `;
  }
  
  // Update palette
  updateAllPaletteItems();
  
  // Reinitialize icons
  lucide.createIcons();
}

function saveAnswer(questionId, answer) {
  session.answers[questionId] = answer;
  saveCurrentSession(session);
  updateAllPaletteItems();
}

function saveCurrentAnswer() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    const question = questions[currentQuestionIndex];
    saveAnswer(question.id, selectedOption.value);
  }
}

function setupEventListeners() {
  // Previous button
  document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      saveCurrentAnswer();
      loadQuestion(currentQuestionIndex - 1);
    }
  });
  
  // Next button
  document.getElementById('nextBtn').addEventListener('click', () => {
    saveCurrentAnswer();
    if (currentQuestionIndex < questions.length - 1) {
      loadQuestion(currentQuestionIndex + 1);
    } else {
      // Go to review page
      navigateTo('../review/index.html');
    }
  });
  
  // Clear button
  document.getElementById('clearBtn').addEventListener('click', () => {
    const question = questions[currentQuestionIndex];
    delete session.answers[question.id];
    saveCurrentSession(session);
    
    // Clear radio buttons
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
      radio.checked = false;
    });
    
    // Remove selected class
    document.querySelectorAll('.option-item').forEach(item => {
      item.classList.remove('selected');
    });
    
    updateAllPaletteItems();
  });
  
  // Mark for review button
  document.getElementById('markReviewBtn').addEventListener('click', () => {
    const question = questions[currentQuestionIndex];
    const isMarked = session.markedForReview.includes(question.id);
    
    if (isMarked) {
      session.markedForReview = session.markedForReview.filter(id => id !== question.id);
    } else {
      session.markedForReview.push(question.id);
    }
    
    saveCurrentSession(session);
    loadQuestion(currentQuestionIndex);
  });
  
  // Review button
  document.getElementById('reviewBtn').addEventListener('click', () => {
    saveCurrentAnswer();
    navigateTo('../review/index.html');
  });
}

function autoSubmitExam() {
  saveCurrentAnswer();
  showAlert('Time is up! Submitting your exam...', 'warning');
  
  setTimeout(() => {
    navigateTo('../submit/index.html');
  }, 2000);
}

// Prevent accidental page closure
window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = '';
});
