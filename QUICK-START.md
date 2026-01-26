# Quick Start Guide - CBT Pro System

## Getting Started in 30 Seconds

### Option 1: Open Main Entry Point
Simply open **`index.html`** in your browser and choose your portal!

### Option 2: Direct Access
- **Candidates:** Open `candidate/home/index.html`
- **Admins:** Open `admin/login/index.html`

---

## 🎓 For Candidates (Taking an Exam)

### Option 1: Create New Account
1. **Home** → Click "Start Exam"
2. **Click "Sign up here"** on login page
3. **Fill Registration Form** → Enter name, email, etc.
4. **Get Exam Number** → Note down your unique exam number
5. **Login** → Use your new exam number
6. **Continue with exam...**

### Option 2: Use Demo Credentials
```
Exam Number: EXAM2024001  (Candidate: John Doe)
Exam Number: EXAM2024002  (Candidate: Jane Smith)
```

### Complete Workflow
1. **Home** → Click "Start Exam"
2. **Signup/Login** → Create account or use: `EXAM2024001`
3. **Instructions** → Read and accept terms
4. **Profile** → Confirm your details
5. **Exam** → Answer 10 questions (30 minutes)
6. **Review** → Check your answers
7. **Submit** → Finalize your exam
8. **Results** → View your score instantly!

### Tips
- ✅ Answers are auto-saved
- ⏰ Timer shows remaining time
- 🔖 Mark questions for review
- ⬅️➡️ Navigate between questions freely
- 📊 See question palette on the right

---

## 👨‍💼 For Administrators (Managing System)

### Option 1: Create New Admin Account
1. **Go to Admin Login** → `admin/login/index.html`
2. **Click "Sign up here"**
3. **Fill Registration Form** → Name, email, username, password
4. **Account Created** → Login with your credentials
5. **Access Dashboard**

### Option 2: Use Demo Credentials
```
Username: admin
Password: admin123
```

### Complete Workflow
1. **Signup/Login** → Create account or use demo credentials
2. **Dashboard** → View statistics
3. **Management** → Manage questions or view results

### Features
- ➕ Add new questions
- ✏️ Edit existing questions
- 🗑️ Delete questions
- 📊 View all exam results
- 📥 Export results (CSV/PDF)

---

## 📁 Quick Navigation

### Candidate Portal Pages
| Page | Location | Purpose |
|------|----------|---------|
| Home | `candidate/home/index.html` | Landing page |
| Signup | `candidate/signup/index.html` | New registration |
| Login | `candidate/login/index.html` | Authentication |
| Instructions | `candidate/instructions/index.html` | Exam rules |
| Profile | `candidate/profile/index.html` | Identity confirmation |
| Exam | `candidate/exam/index.html` | Taking the test |
| Review | `candidate/review/index.html` | Answer review |
| Submit | `candidate/submit/index.html` | Submission processing |
| Result | `candidate/result/index.html` | Score display |

### Admin Portal Pages
| Page | Location | Purpose |
|------|----------|---------|
| Signup | `admin/signup/index.html` | New admin registration |
| Login | `admin/login/index.html` | Admin authentication |
| Dashboard | `admin/dashboard/index.html` | Overview & stats |
| Management | `admin/management/index.html` | Questions & results |

---

## 🎨 Design Features

### Colors
- **Primary Blue:** #2563eb
- **Dark Blue:** #1e40af
- **Black:** #000000
- **White:** #ffffff
- **Success Green:** #10b981
- **Error Red:** #ef4444

### Icons
Using **Lucide Icons** (loaded via CDN)

### Responsive
- 📱 Mobile: 320px+
- 📱 Tablet: 768px+
- 💻 Desktop: 1024px+

---

## 💾 Data Storage

Everything is stored in **LocalStorage**:
- Questions (10 pre-loaded)
- Candidates (2 demo users)
- Exam sessions
- Results
- Admin credentials

**Note:** Data persists until you clear browser data!

---

## 🧪 Test Scenarios

### Scenario 1: New Candidate Registration
1. Go to candidate signup page
2. Fill in: Name, Email
3. Receive unique Exam Number
4. Login and take exam

### Scenario 2: Complete an Exam
1. Login as `EXAM2024001` (or use your new account)
2. Complete all 10 questions
3. Submit and view results

### Scenario 3: Time Management
1. Login and start exam
2. Watch the countdown timer
3. Answer strategically

### Scenario 4: New Admin Registration
1. Go to admin signup page
2. Create account with username/password
3. Login and access dashboard

### Scenario 5: Admin Operations
1. Login as admin (or use your new account)
2. Add a new question
3. View recent results
4. Export data to CSV

---

## ⚡ Quick Commands

### View Mock Data
Open browser console (F12) and type:
```javascript
// View all questions
getAllQuestions()

// View all candidates
getAllCandidates()

// View all results
getAllResults()

// Clear all data (reset system)
localStorage.clear()
location.reload()
```

---

## 🆘 Troubleshooting

### Issue: No questions showing
**Solution:** Open browser console, run:
```javascript
localStorage.clear()
location.reload()
```

### Issue: Can't login
**Solution:** Double-check credentials (case-sensitive)

### Issue: Timer not working
**Solution:** Refresh the page and restart exam

### Issue: Data not saving
**Solution:** Check if LocalStorage is enabled in browser

---

## 📝 Customization Guide

### Change Primary Color
Edit `shared/css/variables.css`:
```css
--color-primary: #YOUR_COLOR;
```

### Change Exam Duration
Edit `shared/js/storage.js`, line ~200:
```javascript
duration: 30  // Change to your desired minutes
```

### Add More Questions
1. Login as admin
2. Go to Management → Questions
3. Click "Add Question"

---

## 🎯 Project Structure

```
CBT-SYSTEM/
├── index.html              ← START HERE
├── README.md
├── QUICK-START.md         ← You are here
├── shared/
│   ├── css/               ← Styles
│   └── js/                ← JavaScript utilities
├── candidate/             ← 9 candidate pages
│   ├── home/
│   ├── signup/            ← NEW: Registration
│   ├── login/
│   ├── instructions/
│   ├── profile/
│   ├── exam/
│   ├── review/
│   ├── submit/
│   └── result/
└── admin/                 ← 4 admin pages
    ├── signup/            ← NEW: Admin registration
    ├── login/
    ├── dashboard/
    └── management/
```

---

## 💡 Pro Tips

1. **Use Chrome DevTools** to inspect LocalStorage data
2. **Open multiple tabs** to test simultaneous exams
3. **Try different screen sizes** to see responsive design
4. **Export results** to see data in CSV format
5. **Clear LocalStorage** to reset the entire system

---

## 🎉 Enjoy Your CBT System!

For detailed documentation, see **README.md**

For issues or questions, check the inline code comments.

**Happy Testing!**
