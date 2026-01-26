// Admin Signup Script

document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  // Clear previous errors
  hideError('fullNameError');
  hideError('emailError');
  hideError('usernameError');
  hideError('passwordError');
  hideError('confirmPasswordError');
  
  // Validate full name
  if (!validateRequired(fullName)) {
    showError('fullNameError', 'Full name is required');
    return;
  }
  
  if (fullName.length < 3) {
    showError('fullNameError', 'Full name must be at least 3 characters');
    return;
  }
  
  // Validate email
  if (!validateRequired(email)) {
    showError('emailError', 'Email address is required');
    return;
  }
  
  if (!validateEmail(email)) {
    showError('emailError', 'Please enter a valid email address');
    return;
  }
  
  // Validate username
  if (!validateRequired(username)) {
    showError('usernameError', 'Username is required');
    return;
  }
  
  if (username.length < 4) {
    showError('usernameError', 'Username must be at least 4 characters');
    return;
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    showError('usernameError', 'Username can only contain letters, numbers, and underscores');
    return;
  }
  
  // Check if username already exists
  if (checkAdminUsernameExists(username)) {
    showError('usernameError', 'This username is already taken. Please choose a different one.');
    return;
  }
  
  // Validate password
  if (!validateRequired(password)) {
    showError('passwordError', 'Password is required');
    return;
  }
  
  if (password.length < 8) {
    showError('passwordError', 'Password must be at least 8 characters');
    return;
  }
  
  if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
    showError('passwordError', 'Password must contain at least one letter and one number');
    return;
  }
  
  // Validate confirm password
  if (!validateRequired(confirmPassword)) {
    showError('confirmPasswordError', 'Please confirm your password');
    return;
  }
  
  if (password !== confirmPassword) {
    showError('confirmPasswordError', 'Passwords do not match');
    return;
  }
  
  // Create new admin object
  const newAdmin = {
    id: generateUniqueId('admin'),
    fullName: fullName,
    email: email,
    username: username,
    password: password,
    registrationDate: getCurrentDateTime()
  };
  
  // Save admin
  if (saveNewAdmin(newAdmin)) {
    showSuccessModal(fullName, username);
  } else {
    showAlert('Registration failed. Please try again.', 'error');
  }
});

function showSuccessModal(name, username) {
  const modalHTML = `
    <div class="modal-overlay" id="successModal">
      <div class="modal" style="max-width: 500px;">
        <div style="text-align: center; padding: 1rem;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #d1fae5 0%, #10b981 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2.5rem;">
            ✓
          </div>
          <h2 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 0.5rem;">Admin Account Created!</h2>
          <p style="color: #6b7280; margin-bottom: 2rem;">Welcome, ${name}</p>
          
          <div style="background: #f3f4f6; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1.5rem; text-align: left;">
            <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem;">Your Login Credentials</p>
            <div style="margin-bottom: 0.75rem;">
              <span style="font-size: 0.875rem; color: #6b7280;">Username:</span>
              <div style="font-size: 1.125rem; font-weight: 600; color: #2563eb; font-family: monospace;">
                ${username}
              </div>
            </div>
            <div>
              <span style="font-size: 0.875rem; color: #6b7280;">Password:</span>
              <div style="font-size: 0.875rem; color: #4b5563;">
                (The password you just created)
              </div>
            </div>
          </div>
          
          <div style="background: #dbeafe; border: 1px solid #3b82f6; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1.5rem; text-align: left;">
            <p style="font-size: 0.875rem; color: #1e40af; margin: 0;">
              <strong>🎉 Success:</strong> You can now login and access the admin dashboard to manage exams and questions.
            </p>
          </div>
          
          <button onclick="closeModalAndRedirect()" class="btn btn-primary btn-lg" style="width: 100%;">
            Continue to Login
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeModalAndRedirect() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.remove();
  }
  navigateTo('../login/index.html');
}
