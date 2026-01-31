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
  // Get exam details from local storage
  const exam = getExamById(session.examId);
  
  if (!exam) {
    showAlert('Exam not found', 'error');
    return;
  }
  
  // Update exam details
  document.getElementById('durationText').textContent = `Total Time: ${exam.duration} Minutes`;
  document.getElementById('totalQuestionsText').textContent = exam.totalQuestions;
  document.getElementById('totalMarksText').textContent = exam.totalQuestions;
  document.getElementById('passingScoreText').textContent = `${exam.passingScore}%`;
  
  // Update instructions list
  const instructionsList = document.getElementById('generalInstructions');
  if (exam.instructions && exam.instructions.length > 0) {
    instructionsList.innerHTML = '';
    exam.instructions.forEach(instruction => {
      const li = document.createElement('li');
      li.textContent = instruction;
      instructionsList.appendChild(li);
    });
  }
}

// Enable begin button when terms are accepted
document.getElementById('termsCheckbox').addEventListener('change', function() {
  const startBtn = document.getElementById('startBtn');
  startBtn.disabled = !this.checked;
});

// Begin exam - navigate to profile page
document.getElementById('startBtn').addEventListener('click', function() {
  // Initialize exam session data
  session.startTime = Date.now();
  session.answers = {};
  session.markedForReview = [];
  session.currentQuestion = 0;
  session.submitted = false;
  
  saveCurrentSession(session);
  
  // Redirect to profile page
  navigateTo('../profile/index.html');
});
