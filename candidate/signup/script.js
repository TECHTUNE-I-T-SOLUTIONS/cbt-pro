// Candidate Signup Script

document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  
  // Clear previous errors
  hideError('fullNameError');
  hideError('emailError');
  hideError('phoneError');
  
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
  
  // Check if email already exists
  if (checkEmailExists(email)) {
    showError('emailError', 'This email is already registered. Please login or use a different email.');
    return;
  }
  
  // Validate phone (if provided)
  if (phone && phone.length < 10) {
    showError('phoneError', 'Please enter a valid phone number');
    return;
  }
  
  // Generate unique exam number
  const examNumber = generateExamNumber();
  
  // Create new candidate object
  const newCandidate = {
    id: generateUniqueId('cand'),
    name: fullName,
    email: email,
    phone: phone || null,
    dateOfBirth: dateOfBirth || null,
    examNumber: examNumber,
    registrationDate: getCurrentDateTime()
  };
  
  // Save candidate
  if (saveCandidate(newCandidate)) {
    // Show success modal with exam number
    showExamNumberModal(examNumber, fullName);
  } else {
    showAlert('Registration failed. Please try again.', 'error');
  }
});

function showExamNumberModal(examNumber, name) {
  const modalHTML = `
    <div class="modal-overlay" id="examNumberModal">
      <div class="modal" style="max-width: 500px;">
        <div style="text-align: center; padding: 1rem;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #d1fae5 0%, #10b981 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2.5rem;">
            ✓
          </div>
          <h2 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 0.5rem;">Registration Successful!</h2>
          <p style="color: #6b7280; margin-bottom: 2rem;">Welcome, ${name}</p>
          
          <div style="background: #f3f4f6; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1.5rem;">
            <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem;">Your Exam Number</p>
            <div style="font-size: 1.5rem; font-weight: bold; color: #2563eb; font-family: monospace; letter-spacing: 2px;">
              ${examNumber}
            </div>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1.5rem; text-align: left;">
            <p style="font-size: 0.875rem; color: #92400e; margin: 0;">
              <strong>⚠️ Important:</strong> Please save this exam number. You will need it to login and take exams.
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
  const modal = document.getElementById('examNumberModal');
  if (modal) {
    modal.remove();
  }
  navigateTo('../login/index.html');
}
