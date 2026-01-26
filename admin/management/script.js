// Admin Management Script

// Check if admin is logged in
const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn');

if (!isAdminLoggedIn) {
  showAlert('Please login first', 'error');
  setTimeout(() => navigateTo('../login/index.html'), 1500);
} else {
  initializeManagement();
}

let currentEditingQuestionId = null;

function initializeManagement() {
  // Check URL parameter for tab
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab') || 'questions';
  
  // Activate correct tab
  switchTab(tab);
  
  // Load data
  loadQuestions();
  loadResults();
  
  // Setup event listeners
  setupEventListeners();
  
  // Reinitialize icons
  lucide.createIcons();
}

function setupEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      switchTab(tabName);
    });
  });
  
  // Add question button
  document.getElementById('addQuestionBtn').addEventListener('click', () => {
    openQuestionModal();
  });
  
  // Cancel button
  document.getElementById('cancelBtn').addEventListener('click', () => {
    closeQuestionModal();
  });
  
  // Question form submit
  document.getElementById('questionForm').addEventListener('submit', handleQuestionSubmit);
  
  // Export buttons
  document.getElementById('exportCSVBtn').addEventListener('click', exportResultsCSV);
  document.getElementById('exportPDFBtn').addEventListener('click', exportResultsPDF);
  
  // Logout button
  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUsername');
    showAlert('Logged out successfully', 'success');
    setTimeout(() => navigateTo('../login/index.html'), 1000);
  });
  
  // Close modal on overlay click
  document.getElementById('questionModal').addEventListener('click', (e) => {
    if (e.target.id === 'questionModal') {
      closeQuestionModal();
    }
  });
}

function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.tab === tabName) {
      tab.classList.add('active');
    }
  });
  
  // Update tab panels
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  
  if (tabName === 'questions') {
    document.getElementById('questionsPanel').classList.add('active');
  } else if (tabName === 'results') {
    document.getElementById('resultsPanel').classList.add('active');
  }
}

// ============================================
// Questions Management
// ============================================

function loadQuestions() {
  const questions = getAllQuestions();
  const tbody = document.getElementById('questionsTable');
  tbody.innerHTML = '';
  
  if (questions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center text-gray">No questions available</td></tr>';
    return;
  }
  
  questions.forEach((question, index) => {
    const tr = document.createElement('tr');
    
    const questionPreview = question.text.length > 80 
      ? question.text.substring(0, 80) + '...' 
      : question.text;
    
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${questionPreview}</td>
      <td class="text-center"><strong>Option ${question.correctAnswer}</strong></td>
      <td>
        <div class="flex gap-sm">
          <button class="btn btn-sm btn-secondary action-btn" onclick="editQuestion('${question.id}')">
            <i data-lucide="edit" class="icon-xs"></i>
            Edit
          </button>
          <button class="btn btn-sm btn-error action-btn" onclick="deleteQuestionConfirm('${question.id}')">
            <i data-lucide="trash-2" class="icon-xs"></i>
            Delete
          </button>
        </div>
      </td>
    `;
    
    tbody.appendChild(tr);
  });
  
  // Reinitialize icons
  lucide.createIcons();
}

function openQuestionModal(questionId = null) {
  currentEditingQuestionId = questionId;
  const modal = document.getElementById('questionModal');
  const form = document.getElementById('questionForm');
  const title = document.getElementById('modalTitle');
  
  form.reset();
  
  if (questionId) {
    // Edit mode
    title.textContent = 'Edit Question';
    const question = getQuestionById(questionId);
    
    if (question) {
      document.getElementById('questionId').value = question.id;
      document.getElementById('questionText').value = question.text;
      document.getElementById('optionA').value = question.optionA;
      document.getElementById('optionB').value = question.optionB;
      document.getElementById('optionC').value = question.optionC;
      document.getElementById('optionD').value = question.optionD;
      document.getElementById('correctAnswer').value = question.correctAnswer;
    }
  } else {
    // Add mode
    title.textContent = 'Add Question';
  }
  
  modal.classList.remove('hidden');
  lucide.createIcons();
}

function closeQuestionModal() {
  const modal = document.getElementById('questionModal');
  modal.classList.add('hidden');
  currentEditingQuestionId = null;
}

function handleQuestionSubmit(e) {
  e.preventDefault();
  
  const questionData = {
    id: currentEditingQuestionId || generateId('q'),
    text: document.getElementById('questionText').value.trim(),
    optionA: document.getElementById('optionA').value.trim(),
    optionB: document.getElementById('optionB').value.trim(),
    optionC: document.getElementById('optionC').value.trim(),
    optionD: document.getElementById('optionD').value.trim(),
    correctAnswer: document.getElementById('correctAnswer').value,
    examId: 'exam-001' // Default exam
  };
  
  saveQuestion(questionData);
  
  showAlert(
    currentEditingQuestionId ? 'Question updated successfully!' : 'Question added successfully!',
    'success'
  );
  
  closeQuestionModal();
  loadQuestions();
}

function editQuestion(questionId) {
  openQuestionModal(questionId);
}

function deleteQuestionConfirm(questionId) {
  showModal(
    'Delete Question',
    'Are you sure you want to delete this question? This action cannot be undone.',
    () => {
      deleteQuestion(questionId);
      showAlert('Question deleted successfully', 'success');
      loadQuestions();
    }
  );
}

// Make functions global for onclick handlers
window.editQuestion = editQuestion;
window.deleteQuestionConfirm = deleteQuestionConfirm;

// ============================================
// Results Management
// ============================================

function loadResults() {
  const results = getAllResults();
  const tbody = document.getElementById('resultsTable');
  tbody.innerHTML = '';
  
  if (results.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-gray">No results available</td></tr>';
    return;
  }
  
  // Sort by date (most recent first)
  const sortedResults = results.sort((a, b) => new Date(b.dateTaken) - new Date(a.dateTaken));
  
  sortedResults.forEach(result => {
    const tr = document.createElement('tr');
    
    const statusClass = result.status === 'Pass' ? 'success' : 'error';
    
    tr.innerHTML = `
      <td>${result.candidateName}</td>
      <td>${result.examName}</td>
      <td class="text-center">
        <strong>${result.score}/${result.totalQuestions}</strong>
        <br>
        <small class="text-gray">${result.percentage}%</small>
      </td>
      <td>
        <span class="badge badge-${statusClass}">${result.status}</span>
      </td>
      <td>${formatDate(result.dateTaken)}</td>
      <td>
        <button class="btn btn-sm btn-secondary action-btn" onclick="viewResultDetails('${result.id}')">
          <i data-lucide="eye" class="icon-xs"></i>
          View
        </button>
      </td>
    `;
    
    tbody.appendChild(tr);
  });
  
  // Reinitialize icons
  lucide.createIcons();
}

function viewResultDetails(resultId) {
  const result = getResultById(resultId);
  
  if (!result) {
    showAlert('Result not found', 'error');
    return;
  }
  
  let detailsHTML = `
    <strong>Candidate:</strong> ${result.candidateName}<br>
    <strong>Exam:</strong> ${result.examName}<br>
    <strong>Score:</strong> ${result.score}/${result.totalQuestions} (${result.percentage}%)<br>
    <strong>Status:</strong> ${result.status}<br>
    <strong>Time Taken:</strong> ${result.timeTaken} minutes<br>
    <strong>Date:</strong> ${formatDateTime(result.dateTaken)}
  `;
  
  showModal('Exam Result Details', detailsHTML, () => {});
}

window.viewResultDetails = viewResultDetails;

function exportResultsCSV() {
  const results = getAllResults();
  
  if (results.length === 0) {
    showAlert('No results to export', 'warning');
    return;
  }
  
  const csvData = results.map(result => ({
    'Candidate Name': result.candidateName,
    'Exam Name': result.examName,
    'Score': result.score,
    'Total Questions': result.totalQuestions,
    'Percentage': result.percentage + '%',
    'Status': result.status,
    'Time Taken (min)': result.timeTaken,
    'Date': formatDate(result.dateTaken)
  }));
  
  exportToCSV(csvData, 'exam-results.csv');
  showAlert('Results exported successfully', 'success');
}

function exportResultsPDF() {
  exportToPDF('resultsTable', 'exam-results.pdf');
}
