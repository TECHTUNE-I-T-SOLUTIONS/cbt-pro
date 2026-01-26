// Instructions Page Script

// Check if user is logged in
const session = getCurrentSession();

if (!session || !session.candidateId) {
  showAlert('Please login first', 'error');
  setTimeout(() => navigateTo('../login/index.html'), 1500);
} else {
  loadInstructions();
}

function loadInstructions() {
  // Get exam details
  const exam = getExamById(session.examId);
  
  if (!exam) {
    showAlert('Exam not found', 'error');
    return;
  }
  
  // Update exam details
  document.getElementById('examName').textContent = exam.name;
  document.getElementById('duration').textContent = `${exam.duration} minutes`;
  document.getElementById('totalQuestions').textContent = exam.totalQuestions;
  document.getElementById('passingScore').textContent = `${exam.passingScore}%`;
  
  // Load instructions
  const instructionsList = document.getElementById('instructionsList');
  instructionsList.innerHTML = '';
  
  exam.instructions.forEach(instruction => {
    const li = document.createElement('li');
    li.textContent = instruction;
    instructionsList.appendChild(li);
  });
}

// Enable begin button when terms are accepted
document.getElementById('acceptTerms').addEventListener('change', function() {
  const beginBtn = document.getElementById('beginBtn');
  beginBtn.disabled = !this.checked;
});

// Begin exam
document.getElementById('beginBtn').addEventListener('click', function() {
  // Initialize exam session
  session.startTime = Date.now();
  session.answers = {};
  session.markedForReview = [];
  session.currentQuestion = 0;
  session.submitted = false;
  
  saveCurrentSession(session);
  
  // Redirect to profile page
  navigateTo('../profile/index.html');
});
