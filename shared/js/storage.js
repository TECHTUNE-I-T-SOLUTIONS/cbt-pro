// ============================================
// CBT Pro System - LocalStorage Utilities
// ============================================

const STORAGE_KEYS = {
  EXAMS: 'cbt_exams',
  QUESTIONS: 'cbt_questions',
  CANDIDATES: 'cbt_candidates',
  ADMIN: 'cbt_admin',
  CURRENT_SESSION: 'cbt_current_session',
  RESULTS: 'cbt_results'
};

// ============================================
// Generic Storage Functions
// ============================================

function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

function getItem(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

function removeItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
}

// ============================================
// Utility Functions for Signup
// ============================================

function generateUniqueId(prefix) {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}-${timestamp}-${random}`;
}

function generateExamNumber() {
  const year = new Date().getFullYear();
  const candidates = getAllCandidates();
  const count = candidates.length + 1;
  const paddedCount = String(count).padStart(3, '0');
  return `EXAM${year}${paddedCount}`;
}

// ============================================
// Exam Functions
// ============================================

function getAllExams() {
  return getItem(STORAGE_KEYS.EXAMS) || [];
}

function getExamById(examId) {
  const exams = getAllExams();
  return exams.find(exam => exam.id === examId);
}

function saveExam(exam) {
  const exams = getAllExams();
  const existingIndex = exams.findIndex(e => e.id === exam.id);
  
  if (existingIndex >= 0) {
    exams[existingIndex] = exam;
  } else {
    exams.push(exam);
  }
  
  return setItem(STORAGE_KEYS.EXAMS, exams);
}

function deleteExam(examId) {
  const exams = getAllExams();
  const filtered = exams.filter(exam => exam.id !== examId);
  return setItem(STORAGE_KEYS.EXAMS, filtered);
}

// ============================================
// Question Functions
// ============================================

function getAllQuestions() {
  return getItem(STORAGE_KEYS.QUESTIONS) || [];
}

function getQuestionsByExamId(examId) {
  const questions = getAllQuestions();
  return questions.filter(q => q.examId === examId);
}

function getQuestionById(questionId) {
  const questions = getAllQuestions();
  return questions.find(q => q.id === questionId);
}

function saveQuestion(question) {
  const questions = getAllQuestions();
  const existingIndex = questions.findIndex(q => q.id === question.id);
  
  if (existingIndex >= 0) {
    questions[existingIndex] = question;
  } else {
    questions.push(question);
  }
  
  return setItem(STORAGE_KEYS.QUESTIONS, questions);
}

function deleteQuestion(questionId) {
  const questions = getAllQuestions();
  const filtered = questions.filter(q => q.id !== questionId);
  return setItem(STORAGE_KEYS.QUESTIONS, filtered);
}

// ============================================
// Candidate Functions
// ============================================

function getAllCandidates() {
  return getItem(STORAGE_KEYS.CANDIDATES) || [];
}

function getCandidateById(candidateId) {
  const candidates = getAllCandidates();
  return candidates.find(c => c.id === candidateId);
}

function getCandidateByExamNumber(examNumber) {
  const candidates = getAllCandidates();
  return candidates.find(c => c.examNumber === examNumber);
}

function saveCandidate(candidate) {
  const candidates = getAllCandidates();
  const existingIndex = candidates.findIndex(c => c.id === candidate.id);
  
  if (existingIndex >= 0) {
    candidates[existingIndex] = candidate;
  } else {
    candidates.push(candidate);
  }
  
  return setItem(STORAGE_KEYS.CANDIDATES, candidates);
}

function checkEmailExists(email) {
  const candidates = getAllCandidates();
  return candidates.some(c => c.email.toLowerCase() === email.toLowerCase());
}

// ============================================
// Admin Functions
// ============================================

function getAdmin() {
  const admin = getItem(STORAGE_KEYS.ADMIN);
  // If admin is an array, return it; if it's a single object, convert to array
  if (!admin) return [];
  return Array.isArray(admin) ? admin : [admin];
}

function saveAdmin(admin) {
  return setItem(STORAGE_KEYS.ADMIN, admin);
}

function validateAdmin(username, password) {
  const admins = getAdmin();
  return admins.some(admin => admin.username === username && admin.password === password);
}

function saveNewAdmin(newAdmin) {
  const admins = getAdmin();
  admins.push(newAdmin);
  return saveAdmin(admins);
}

function checkAdminUsernameExists(username) {
  const admins = getAdmin();
  return admins.some(admin => admin.username === username);
}

// ============================================
// Session Functions
// ============================================

function getCurrentSession() {
  return getItem(STORAGE_KEYS.CURRENT_SESSION);
}

function saveCurrentSession(session) {
  return setItem(STORAGE_KEYS.CURRENT_SESSION, session);
}

function clearCurrentSession() {
  return removeItem(STORAGE_KEYS.CURRENT_SESSION);
}

function updateSessionAnswer(questionId, answer) {
  const session = getCurrentSession();
  if (!session) return false;
  
  if (!session.answers) {
    session.answers = {};
  }
  
  session.answers[questionId] = answer;
  return saveCurrentSession(session);
}

function markQuestionForReview(questionId, marked) {
  const session = getCurrentSession();
  if (!session) return false;
  
  if (!session.markedForReview) {
    session.markedForReview = [];
  }
  
  if (marked && !session.markedForReview.includes(questionId)) {
    session.markedForReview.push(questionId);
  } else if (!marked) {
    session.markedForReview = session.markedForReview.filter(id => id !== questionId);
  }
  
  return saveCurrentSession(session);
}

// ============================================
// Result Functions
// ============================================

function getAllResults() {
  return getItem(STORAGE_KEYS.RESULTS) || [];
}

function getResultById(resultId) {
  const results = getAllResults();
  return results.find(r => r.id === resultId);
}

function saveResult(result) {
  const results = getAllResults();
  results.push(result);
  return setItem(STORAGE_KEYS.RESULTS, results);
}

function getResultsByCandidateId(candidateId) {
  const results = getAllResults();
  return results.filter(r => r.candidateId === candidateId);
}

// ============================================
// Initialize Mock Data
// ============================================

function initializeMockData() {
  // Check if data already exists
  if (getAllExams().length > 0) {
    return; // Data already initialized
  }
  
  // Mock Exam
  const mockExam = {
    id: 'exam-001',
    name: 'General Knowledge Test',
    duration: 30,
    totalQuestions: 10,
    passingScore: 60,
    instructions: [
      'Read each question carefully before selecting your answer',
      'You can navigate between questions using Previous and Next buttons',
      'Mark questions for review if you want to revisit them',
      'Your answers are automatically saved',
      'Once time expires, the exam will be automatically submitted',
      'Do not refresh or close the browser during the exam'
    ],
    createdDate: new Date().toISOString(),
    isActive: true
  };
  
  // Mock Questions
  const mockQuestions = [
    {
      id: 'q1',
      text: 'What is the capital of France?',
      optionA: 'London',
      optionB: 'Paris',
      optionC: 'Berlin',
      optionD: 'Madrid',
      correctAnswer: 'B',
      examId: 'exam-001'
    },
    {
      id: 'q2',
      text: 'Which planet is known as the Red Planet?',
      optionA: 'Venus',
      optionB: 'Jupiter',
      optionC: 'Mars',
      optionD: 'Saturn',
      correctAnswer: 'C',
      examId: 'exam-001'
    },
    {
      id: 'q3',
      text: 'Who wrote "Romeo and Juliet"?',
      optionA: 'Charles Dickens',
      optionB: 'William Shakespeare',
      optionC: 'Jane Austen',
      optionD: 'Mark Twain',
      correctAnswer: 'B',
      examId: 'exam-001'
    },
    {
      id: 'q4',
      text: 'What is the largest ocean on Earth?',
      optionA: 'Atlantic Ocean',
      optionB: 'Indian Ocean',
      optionC: 'Arctic Ocean',
      optionD: 'Pacific Ocean',
      correctAnswer: 'D',
      examId: 'exam-001'
    },
    {
      id: 'q5',
      text: 'In which year did World War II end?',
      optionA: '1943',
      optionB: '1944',
      optionC: '1945',
      optionD: '1946',
      correctAnswer: 'C',
      examId: 'exam-001'
    },
    {
      id: 'q6',
      text: 'What is the chemical symbol for gold?',
      optionA: 'Go',
      optionB: 'Au',
      optionC: 'Ag',
      optionD: 'Gd',
      correctAnswer: 'B',
      examId: 'exam-001'
    },
    {
      id: 'q7',
      text: 'How many continents are there?',
      optionA: '5',
      optionB: '6',
      optionC: '7',
      optionD: '8',
      correctAnswer: 'C',
      examId: 'exam-001'
    },
    {
      id: 'q8',
      text: 'What is the smallest prime number?',
      optionA: '0',
      optionB: '1',
      optionC: '2',
      optionD: '3',
      correctAnswer: 'C',
      examId: 'exam-001'
    },
    {
      id: 'q9',
      text: 'Which gas do plants absorb from the atmosphere?',
      optionA: 'Oxygen',
      optionB: 'Nitrogen',
      optionC: 'Carbon Dioxide',
      optionD: 'Hydrogen',
      correctAnswer: 'C',
      examId: 'exam-001'
    },
    {
      id: 'q10',
      text: 'What is the speed of light?',
      optionA: '300,000 km/s',
      optionB: '150,000 km/s',
      optionC: '450,000 km/s',
      optionD: '600,000 km/s',
      correctAnswer: 'A',
      examId: 'exam-001'
    }
  ];
  
  // Mock Candidates
  const mockCandidates = [
    {
      id: 'cand-001',
      name: 'John Doe',
      examNumber: 'EXAM2024001',
      email: 'john.doe@example.com'
    },
    {
      id: 'cand-002',
      name: 'Jane Smith',
      examNumber: 'EXAM2024002',
      email: 'jane.smith@example.com'
    }
  ];
  
  // Mock Admin (stored as array to support multiple admins)
  const mockAdmins = [
    {
      id: 'admin-001',
      fullName: 'System Administrator',
      email: 'admin@cbtpro.com',
      username: 'admin',
      password: 'admin123',
      registrationDate: new Date().toISOString()
    }
  ];
  
  // Save to localStorage
  saveExam(mockExam);
  mockQuestions.forEach(q => saveQuestion(q));
  mockCandidates.forEach(c => saveCandidate(c));
  saveAdmin(mockAdmins);
  
  console.log('Mock data initialized successfully!');
}

// Initialize on load
if (typeof window !== 'undefined') {
  initializeMockData();
}
