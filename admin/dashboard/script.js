// Admin Dashboard Script

// Check if admin is logged in
const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn');
const adminUsername = sessionStorage.getItem('adminUsername');

if (!isAdminLoggedIn) {
  showAlert('Please login first', 'error');
  setTimeout(() => navigateTo('../login/index.html'), 1500);
} else {
  loadDashboard();
}

function loadDashboard() {
  // Update admin name
  document.getElementById('adminName').textContent = adminUsername;
  
  // Load statistics
  const exams = getAllExams();
  const candidates = getAllCandidates();
  const questions = getAllQuestions();
  const results = getAllResults();
  
  document.getElementById('totalExams').textContent = exams.length;
  document.getElementById('totalCandidates').textContent = candidates.length;
  document.getElementById('totalQuestions').textContent = questions.length;
  
  // Load recent activity
  loadRecentActivity(results);
  
  // Reinitialize icons
  lucide.createIcons();
}

function loadRecentActivity(results) {
  const tbody = document.getElementById('recentActivity');
  tbody.innerHTML = '';
  
  if (results.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-gray">No recent activity</td></tr>';
    return;
  }
  
  // Sort by date (most recent first) and take first 5
  const recentResults = results
    .sort((a, b) => new Date(b.dateTaken) - new Date(a.dateTaken))
    .slice(0, 5);
  
  recentResults.forEach(result => {
    const tr = document.createElement('tr');
    
    const statusClass = result.status === 'Pass' ? 'success' : 'error';
    
    tr.innerHTML = `
      <td>${result.candidateName}</td>
      <td>${result.examName}</td>
      <td><strong>${result.score}/${result.totalQuestions}</strong> (${result.percentage}%)</td>
      <td><span class="badge badge-${statusClass}">${result.status}</span></td>
      <td>${formatDate(result.dateTaken)}</td>
    `;
    
    tbody.appendChild(tr);
  });
}

// Logout button
document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('adminLoggedIn');
  sessionStorage.removeItem('adminUsername');
  
  showAlert('Logged out successfully', 'success');
  setTimeout(() => navigateTo('../login/index.html'), 1000);
});
