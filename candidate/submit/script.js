// Submit Page Script

let session = getCurrentSession();

// To check if the user is logged in
if (!session || !session.examStartTime) {
  showAlert('Invalid session', 'error');
  setTimeout(() => navigateTo('../login/index.html'), 1500);
} else {
  processSubmission();
}

function processSubmission() {
  // We simulate processing steps here
  setTimeout(() => {
    document.getElementById('step2').classList.add('active');
  }, 1000);
  
  setTimeout(() => {
    document.getElementById('step3').classList.add('active');
  }, 2000);
  
  setTimeout(() => {
    submitExam();
  }, 3000);
}

function submitExam() {
  // Get questions
  const questions = getQuestionsByExamId(session.examId);
  const exam = getExamById(session.examId);
  
  // Calculate score
  const scoreData = calculateScore(session.answers || {}, questions);
  
  // Calculate time taken
  const timeTaken = Math.floor((Date.now() - session.examStartTime) / 60000); // in minutes
  
  // Determine pass/fail
  const status = scoreData.percentage >= exam.passingScore ? 'Pass' : 'Fail';
  
  // We create result object here
  const result = {
    id: generateId('result'),
    candidateId: session.candidateId,
    candidateName: session.candidateName,
    examId: session.examId,
    examName: session.examName,
    score: scoreData.correct,
    totalQuestions: scoreData.total,
    percentage: scoreData.percentage,
    status: status,
    timeTaken: timeTaken,
    dateTaken: getCurrentDateTime(),
    answers: scoreData.detailedResults
  };
  
  // Then, we save the result
  saveResult(result);
  
  // To mark the session as submitted
  session.submitted = true;
  session.resultId = result.id;
  saveCurrentSession(session);
  
  // To show the success state
  document.getElementById('loadingState').classList.add('hidden');
  document.getElementById('successState').classList.remove('hidden');
  
  // We can reinitialize icons here
  lucide.createIcons();
}

// Then the view results button
document.getElementById('viewResultsBtn').addEventListener('click', () => {
  navigateTo('../result/index.html');
});
