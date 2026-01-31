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
  // Get candidate details from local storage
  const candidate = getCandidateById(session.candidateId);
  const exam = getExamById(session.examId);
  
  if (!candidate || !exam) {
    showAlert('Profile data not found', 'error');
    return;
  }
  
  // Update profile summary display with data from local storage
  document.getElementById('summaryName').textContent = candidate.name || '-';
  document.getElementById('summaryExamNumber').textContent = candidate.examNumber || '-';
  document.getElementById('summaryExamName').textContent = exam.name || '-';
  document.getElementById('summaryDuration').textContent = `${exam.duration} minutes` || '-';
  document.getElementById('summaryTotalQuestions').textContent = exam.totalQuestions || '-';
  document.getElementById('summaryDate').textContent = formatDate(new Date());
}

// Back button handler
document.getElementById('backBtn').addEventListener('click', function() {
  navigateTo('../instructions/index.html');
});

// Edit profile button handler
document.getElementById('editProfileBtn').addEventListener('click', function() {
  navigateTo('../instructions/index.html');
});

// Enable start exam button when confirmation is checked
document.getElementById('profileConfirm').addEventListener('change', function() {
  const startExamBtn = document.getElementById('startExamBtn');
  startExamBtn.disabled = !this.checked;
});

// Start exam button handler
document.getElementById('startExamBtn').addEventListener('click', function() {
  // Show confirmation modal
  if (confirm('Once you proceed, the timer will start. Are you ready?')) {
    // Update session with actual exam start time
    session.examStartTime = Date.now();
    saveCurrentSession(session);
    
    // Redirect to exam page
    navigateTo('../exam/index.html');
  }
});
