# CBT Pro System - Computer-Based Testing Platform

A comprehensive, modern Computer-Based Testing (CBT) system built with vanilla HTML, CSS, and JavaScript using LocalStorage for data persistence.

## 🌟 Features

### Candidate Portal (9 Pages)
1. **Home Page** - Welcome page with system overview
2. **Signup Page** - New candidate registration
3. **Login Page** - Candidate authentication
4. **Instructions Page** - Exam rules and guidelines
5. **Profile Page** - Identity confirmation
6. **Exam Page** - Main testing interface with timer
7. **Review Page** - Answer review before submission
8. **Submit Page** - Processing and submission
9. **Result Page** - Score display and performance metrics

### Admin Portal (4 Pages)
1. **Admin Signup** - New administrator registration
2. **Admin Login** - Secure administrator access
3. **Dashboard** - System overview and statistics
4. **Management** - Question and result management

## 📁 Project Structure

```
CBT-SYSTEM/
├── shared/
│   ├── css/
│   │   ├── variables.css    # Design tokens (colors, typography, spacing)
│   │   └── common.css        # Reusable components and utilities
│   └── js/
│       ├── storage.js        # LocalStorage management
│       └── utils.js          # Helper functions
├── candidate/
│   ├── home/
│   ├── signup/
│   ├── login/
│   ├── instructions/
│   ├── profile/
│   ├── exam/
│   ├── review/
│   ├── submit/
│   └── result/
├── admin/
│   ├── signup/
│   ├── login/
│   ├── dashboard/
│   └── management/
└── index.html                # Main entry point
```

## Getting Started

### Quick Start

1. **Open the application:**
   - Simply open `index.html` in your web browser
   - Or navigate to `candidate/home/index.html` to start

2. **Access Options:**

   **For Candidates:**
   - **Sign Up:** Create a new account at `candidate/signup/index.html`
   - **Login:** Use existing credentials at `candidate/login/index.html`
   
   **Demo Candidate Credentials:**
   - Exam Number: `EXAM2024001` (John Doe)
   - Exam Number: `EXAM2024002` (Jane Smith)

   **For Admins:**
   - **Sign Up:** Create a new admin account at `admin/signup/index.html`
   - **Login:** Use existing credentials at `admin/login/index.html`
   
   **Demo Admin Credentials:**
   - Username: `admin`
   - Password: `admin123`

### Using the Candidate Portal

**New Users:**
1. **Start from Home** → Click "Start Exam"
2. **Sign Up** → Create account and receive unique Exam Number
3. **Login** → Enter your exam number
4. **Read Instructions** → Review exam rules and accept terms
5. **Confirm Profile** → Verify your identity
6. **Take Exam** → Answer questions with countdown timer
7. **Review Answers** → Check your responses
8. **Submit** → Finalize and process your exam
9. **View Results** → See your score and performance

**Existing Users:**
- Skip step 2 and login directly with your Exam Number

### Using the Admin Portal

**New Admins:**
1. **Sign Up** → Create admin account with username and password
2. **Login** → Access admin portal with credentials
3. **Dashboard** → View system statistics and recent activity
4. **Manage Questions** → Add, edit, or delete exam questions
5. **View Results** → See candidate performance and export data

**Existing Admins:**
- Skip step 1 and login directly with your credentials

## 🎨 Design Features

- **Color Scheme:** Blue (#2563eb), Black, and White
- **Responsive Design:** Works on mobile and desktop
- **Modern UI:** Card-based design with smooth transitions
- **Intuitive Navigation:** Clear user flow and feedback
- **Icon System:** Lucide icons for visual clarity

## 💾 Data Storage

All data is stored in the browser's LocalStorage:
- **Exams:** Exam configurations and settings
- **Questions:** Question bank with answers
- **Candidates:** Candidate information
- **Sessions:** Current exam sessions
- **Results:** Exam results and scores
- **Admin:** Administrator credentials

## ⚡ Key Features

### For Candidates
- ✅ Self-registration with unique Exam Number
- ✅ Secure candidate authentication
- ✅ Automatic answer saving
- ✅ Countdown timer with alerts
- ✅ Question navigation (Previous/Next)
- ✅ Mark questions for review
- ✅ Visual question palette
- ✅ Auto-submit on time expiry
- ✅ Instant score calculation
- ✅ Detailed results display

### For Administrators
- ✅ Self-registration for admins
- ✅ Multiple admin accounts support
- ✅ Dashboard with statistics
- ✅ Question management (CRUD)
- ✅ View all exam results
- ✅ Export results (CSV/PDF)
- ✅ Recent activity tracking
- ✅ Secure authentication

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Structure and content
- **CSS3** - Styling with custom properties
- **Vanilla JavaScript** - Functionality and logic
- **LocalStorage API** - Data persistence
- **Lucide Icons** - Icon library (via CDN)

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

### No Backend Required
This is a fully frontend demonstration system. All data is stored locally in the browser.

## 📝 Mock Data

The system comes pre-loaded with:
- 1 Active exam (General Knowledge Test)
- 10 Sample questions
- 2 Sample candidates
- Admin account
- 30-minute exam duration

## 🎯 Use Cases

- **Educational Institutions:** Conduct online tests
- **Training Centers:** Skill assessments
- **Recruitment:** Pre-employment testing
- **Certifications:** Online certification exams
- **Practice Tests:** Self-assessment tools

## ⚠️ Important Notes

1. **Demo System:** This is for demonstration purposes
2. **Data Persistence:** Data is stored in LocalStorage (cleared if browser data is cleared)
3. **Security:** Passwords are not encrypted (use hashing in production)
4. **No Backend:** All processing happens on the client side
5. **Browser Storage:** Each browser has separate data storage

## 🔧 Customization

### Changing Colors
Edit `shared/css/variables.css`:
```css
--color-primary: #2563eb;  /* Change primary color */
--color-success: #10b981;  /* Change success color */
```

### Adding Questions
1. Login as admin
2. Go to Management → Questions tab
3. Click "Add Question"
4. Fill in question details and save

### Modifying Exam Duration
Edit the exam duration in `shared/js/storage.js` in the `initializeMockData()` function.

## 📱 Responsive Design

The system is fully responsive and works on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1200px+)

## 🎓 Learning Outcomes

This project demonstrates:
- Modern HTML/CSS/JavaScript practices
- LocalStorage API usage
- State management
- Form handling and validation
- Timer implementation
- Responsive design
- Modal dialogs
- Data export functionality
- Authentication flow

## 🤝 Contributing

This is a demonstration project. Feel free to:
- Fork and modify
- Add new features
- Improve the UI/UX
- Fix bugs
- Enhance functionality

## 📄 License

This project is for educational and demonstration purposes.

## 🙏 Credits

- **Icons:** Lucide Icons
- **Design:** Modern, professional CBT interface
- **Inspiration:** Real-world computer-based testing systems

---

For questions or support, refer to the inline code comments and documentation.
