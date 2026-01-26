// Review Page Script

let session = getCurrentSession();
let questions = [];
let timer = null;

// Check if user is logged in
if (!session || !session.examStartTime) {
  showAlert('Please complete the exam process first', 'error');
  setTimeout(() => navigateTo('../login/index.html'), 1500);
} else {
  initializeReview();
}

function initializeReview() {
  // Load questions
  questions = getQuestionsByExamId(session.examId);
  
  // Start timer
  const exam = getExamById(session.examId);
  startTimer(exam.duration);
  
  // Calculate statistics
  const answered = Object.keys(session.answers || {}).length;
  const marked = (session.markedForReview || []).length;
  const unanswered = questions.length - answered;
  
  // Update summary cards
  document.getElementById('answeredCount').textContent = answered;
  document.getElementById('markedCount').textContent = marked;
  document.getElementById('unansweredCount').textContent = unanswered;
  
  // Build questions grid
  buildQuestionsGrid();
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
  timerElement.textContent = formatTime(seconds);
}

function buildQuestionsGrid() {
  const grid = document.getElementById('questionsGrid');
  grid.innerHTML = '';
  
  questions.forEach((question, index) => {
    const isAnswered = session.answers && session.answers[question.id];
    const isMarked = session.markedForReview && session.markedForReview.includes(question.id);
    
    let status = 'unanswered';
    let statusText = 'Not Answered';
    let statusIcon = 'circle-alert';
    
    if (isAnswered) {
      status = 'answered';
      statusText = 'Answered';
      statusIcon = 'check-circle';
    }
    
    if (isMarked) {
      status = 'marked';
      statusText = 'Marked for Review';
      statusIcon = 'bookmark';
    }
    
    const item = document.createElement('div');
    item.className = `question-item ${status}`;
    item.innerHTML = `
      <div class="question-number">Question ${index + 1}</div>
      <div class="question-status">
        <i data-lucide="${statusIcon}" class="status-icon"></i>
        <span>${statusText}</span>
      </div>
    `;
    
    item.addEventListener('click', () => {
      // Save current question index and go back to exam
      session.currentQuestion = index;
      saveCurrentSession(session);
      navigateTo('../exam/index.html');
    });
    
    grid.appendChild(item);
  });
  
  // Reinitialize icons
  lucide.createIcons();
}

// Submit exam
document.getElementById('submitBtn').addEventListener('click', () => {
  const answered = Object.keys(session.answers || {}).length;
  const unanswered = questions.length - answered;
  
  let message = 'Are you sure you want to submit your exam?';
  
  if (unanswered > 0) {
    message += `\n\nYou have ${unanswered} unanswered question(s).`;
  }
  
  showModal(
    'Submit Exam',
    message,
    function() {
      clearInterval(timer);
      navigateTo('../submit/index.html');
    }
  );
});

function autoSubmitExam() {
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
