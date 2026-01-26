// Result Page Script

let session = getCurrentSession();

// Check if user has submitted exam
if (!session || !session.submitted || !session.resultId) {
  showAlert('Please complete the exam first', 'error');
  setTimeout(() => navigateTo('../login/index.html'), 1500);
} else {
  loadResults();
}

function loadResults() {
  // Get result
  const result = getResultById(session.resultId);
  
  if (!result) {
    showAlert('Result not found', 'error');
    return;
  }
  
  // Animate percentage counter
  animateValue('percentage', 0, result.percentage, 1500, '%');
  
  // Update progress circle
  updateProgressCircle(result.percentage);
  
  // Update status badge
  const statusBadge = document.getElementById('statusBadge');
  const statusText = document.getElementById('status');
  statusText.textContent = result.status;
  statusBadge.classList.add(result.status.toLowerCase());
  
  // Update result details
  document.getElementById('correctAnswers').textContent = result.score;
  document.getElementById('wrongAnswers').textContent = result.percentage >= 0 
    ? (result.totalQuestions - result.score - (result.totalQuestions - Object.keys(result.answers).length))
    : 0;
  document.getElementById('unanswered').textContent = result.totalQuestions - Object.keys(result.answers).length;
  document.getElementById('timeTaken').textContent = `${result.timeTaken} min`;
  
  // Update candidate info
  document.getElementById('candidateName').textContent = result.candidateName;
  document.getElementById('examName').textContent = result.examName;
  document.getElementById('dateTaken').textContent = formatDateTime(result.dateTaken);
  
  // Reinitialize icons
  lucide.createIcons();
}

function updateProgressCircle(percentage) {
  const circle = document.getElementById('progressCircle');
  const circumference = 2 * Math.PI * 90;
  const offset = circumference - (percentage / 100) * circumference;
  
  // Set initial state
  circle.style.strokeDashoffset = circumference;
  
  // Animate to final state
  setTimeout(() => {
    circle.style.strokeDashoffset = offset;
  }, 100);
  
  // Change color based on percentage
  if (percentage >= 70) {
    // Keep success color (default)
  } else if (percentage >= 50) {
    circle.classList.add('warning');
  } else {
    circle.classList.add('error');
  }
}

function animateValue(elementId, start, end, duration, suffix = '') {
  const element = document.getElementById(elementId);
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.round(current) + suffix;
  }, 16);
}

// Logout button
document.getElementById('logoutBtn').addEventListener('click', () => {
  // Clear session
  clearCurrentSession();
  
  // Show success message
  showAlert('Thank you for using CBT Pro System!', 'success');
  
  // Redirect to home
  setTimeout(() => {
    navigateTo('../home/index.html');
  }, 1500);
});
