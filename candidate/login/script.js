// Candidate Login Script

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const examNumber = document.getElementById('examNumber').value.trim();
  const candidateId = document.getElementById('candidateId').value.trim();
  
  // Clear previous errors
  hideError('examNumberError');
  hideError('candidateIdError');
  
  // Validate exam number
  if (!validateRequired(examNumber)) {
    showError('examNumberError', 'Exam number is required');
    return;
  }
  
  // Find candidate by exam number
  const candidate = getCandidateByExamNumber(examNumber);
  
  if (!candidate) {
    showError('examNumberError', 'Invalid exam number. Please check and try again.');
    return;
  }
  
  // Optional: Validate candidate ID if provided
  if (candidateId && candidate.id !== candidateId) {
    showError('candidateIdError', 'Candidate ID does not match exam number.');
    return;
  }
  
  // Get the first active exam (for demo purposes)
  const exams = getAllExams();
  const activeExam = exams.find(exam => exam.isActive);
  
  if (!activeExam) {
    showAlert('No active exam available at this time.', 'error');
    return;
  }
  
  // Create session data
  const sessionData = {
    candidateId: candidate.id,
    candidateName: candidate.name,
    examNumber: candidate.examNumber,
    examId: activeExam.id,
    examName: activeExam.name,
    duration: activeExam.duration,
    totalQuestions: activeExam.totalQuestions,
    loginTime: getCurrentDateTime()
  };
  
  // Save session
  saveCurrentSession(sessionData);
  
  // Redirect to instructions page
  showAlert('Login successful! Redirecting...', 'success');
  setTimeout(() => {
    navigateTo('../instructions/index.html');
  }, 1000);
});
