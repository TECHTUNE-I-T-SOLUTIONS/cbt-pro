// Profile Page Script

// Check if user is logged in
const session = getCurrentSession();

if (!session || !session.candidateId || !session.startTime) {
  showAlert('Please login and read instructions first', 'error');
  setTimeout(() => navigateTo('../login/index.html'), 1500);
} else {
  loadProfile();
}

function loadProfile() {
  // Get candidate details
  const candidate = getCandidateById(session.candidateId);
  const exam = getExamById(session.examId);
  
  if (!candidate || !exam) {
    showAlert('Profile data not found', 'error');
    return;
  }
  
  // Update profile details
  document.getElementById('candidateName').textContent = candidate.name;
  document.getElementById('examNumber').textContent = candidate.examNumber;
  document.getElementById('examName').textContent = exam.name;
  document.getElementById('examDate').textContent = formatDate(new Date());
  document.getElementById('duration').textContent = `${exam.duration} minutes`;
  document.getElementById('totalQuestions').textContent = exam.totalQuestions;
}

// Proceed to exam
document.getElementById('proceedBtn').addEventListener('click', function() {
  showModal(
    'Start Exam?',
    'Once you proceed, the timer will start. Are you ready?',
    function() {
      // Update session with actual exam start time
      session.examStartTime = Date.now();
      saveCurrentSession(session);
      
      // Redirect to exam page
      navigateTo('../exam/index.html');
    }
  );
});
