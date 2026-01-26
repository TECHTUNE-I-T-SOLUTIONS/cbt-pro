// Admin Login Script

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  
  // Clear previous errors
  hideError('usernameError');
  hideError('passwordError');
  
  // Validate username
  if (!validateRequired(username)) {
    showError('usernameError', 'Username is required');
    return;
  }
  
  // Validate password
  if (!validateRequired(password)) {
    showError('passwordError', 'Password is required');
    return;
  }
  
  // Validate admin credentials
  if (!validateAdmin(username, password)) {
    showError('passwordError', 'Invalid username or password');
    return;
  }
  
  // Store admin session
  sessionStorage.setItem('adminLoggedIn', 'true');
  sessionStorage.setItem('adminUsername', username);
  
  // Redirect to dashboard
  showAlert('Login successful! Redirecting...', 'success');
  setTimeout(() => {
    navigateTo('../dashboard/index.html');
  }, 1000);
});
