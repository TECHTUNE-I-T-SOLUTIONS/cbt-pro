// ============================================
// CBT Pro System - Utility Functions
// ============================================

// ============================================
// Timer Functions
// ============================================

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function createCountdownTimer(durationMinutes, onTick, onComplete) {
  let remainingSeconds = durationMinutes * 60;
  
  const interval = setInterval(() => {
    remainingSeconds--;
    
    if (onTick) {
      onTick(remainingSeconds);
    }
    
    if (remainingSeconds <= 0) {
      clearInterval(interval);
      if (onComplete) {
        onComplete();
      }
    }
  }, 1000);
  
  return {
    stop: () => clearInterval(interval),
    getRemainingSeconds: () => remainingSeconds
  };
}

// ============================================
// Validation Functions
// ============================================

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateRequired(value) {
  return value && value.trim().length > 0;
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

function hideError(elementId) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
}

// ============================================
// Modal Functions
// ============================================

function showModal(title, message, onConfirm, onCancel) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  modal.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">${title}</h3>
    </div>
    <div class="modal-body">
      <p>${message}</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
      <button class="btn btn-primary" id="modal-confirm">Confirm</button>
    </div>
  `;
  
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  document.getElementById('modal-confirm').addEventListener('click', () => {
    document.body.removeChild(overlay);
    if (onConfirm) onConfirm();
  });
  
  document.getElementById('modal-cancel').addEventListener('click', () => {
    document.body.removeChild(overlay);
    if (onCancel) onCancel();
  });
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
      if (onCancel) onCancel();
    }
  });
}

function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
    <span>${message}</span>
  `;
  
  const container = document.querySelector('.container') || document.body;
  container.insertBefore(alertDiv, container.firstChild);
  
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.parentNode.removeChild(alertDiv);
    }
  }, 5000);
}

// ============================================
// Navigation Functions
// ============================================

function navigateTo(url) {
  window.location.href = url;
}

function goBack() {
  window.history.back();
}

// ============================================
// Date/Time Functions
// ============================================

function formatDate(date) {
  const d = new Date(date);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  };
  return d.toLocaleDateString('en-US', options);
}

function formatDateTime(date) {
  const d = new Date(date);
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return d.toLocaleString('en-US', options);
}

function getCurrentDateTime() {
  return new Date().toISOString();
}

// ============================================
// ID Generation
// ============================================

function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================
// Score Calculation
// ============================================

function calculateScore(answers, questions) {
  let correct = 0;
  let wrong = 0;
  const detailedResults = {};
  
  questions.forEach(question => {
    const userAnswer = answers[question.id];
    const isCorrect = userAnswer === question.correctAnswer;
    
    if (isCorrect) {
      correct++;
    } else if (userAnswer) {
      wrong++;
    }
    
    detailedResults[question.id] = {
      selected: userAnswer || null,
      correct: question.correctAnswer,
      isCorrect: isCorrect
    };
  });
  
  const total = questions.length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  return {
    correct,
    wrong,
    unanswered: total - correct - wrong,
    total,
    percentage,
    detailedResults
  };
}

// ============================================
// Export Functions
// ============================================

function exportToCSV(data, filename = 'export.csv') {
  if (!data || data.length === 0) {
    showAlert('No data to export', 'warning');
    return;
  }
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

function exportToPDF(elementId, filename = 'export.pdf') {
  showAlert('PDF export functionality requires a library like jsPDF. For demo purposes, printing the page instead.', 'info');
  window.print();
}

// ============================================
// Loading State
// ============================================

function showLoading(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
      <div class="flex-center" style="padding: 3rem;">
        <div class="loader"></div>
      </div>
    `;
  }
}

function hideLoading(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '';
  }
}
