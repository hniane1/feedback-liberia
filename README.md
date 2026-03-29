# FeedbackHub - Customer Feedback Management Platform

A modern, sophisticated feedback management dashboard designed specifically for businesses in Liberia. Built with a clean, intuitive interface that makes collecting and managing customer feedback effortless.

## 🌟 Live Demo

**Dashboard:** https://hniane.com/feedback-liberia/

## ✨ What's New (v2.0)

### 🎨 Complete Design Overhaul
- **Modern Split-Screen Auth** - Beautiful gradient brand showcase on login/signup
- **Cleaner Typography** - Plus Jakarta Sans font for better readability
- **Softer Color Palette** - Professional blues and neutrals with better contrast
- **Improved Spacing** - More white space for a less cluttered feel
- **Better Shadows** - Subtle depth without overwhelming visuals

### 💡 Enhanced Features
- **Sentiment Analysis Badges** - Positive/Neutral/Negative indicators on feedback
- **Priority Levels** - Normal/High/Urgent tagging for better triage
- **Advanced Filtering** - Filter by status, rating, and sentiment
- **Filter Chips** - Modern pill-style filters for quick sorting
- **Trend Indicators** - Stats cards show performance vs. last month
- **Toggle Switches** - Beautiful switches for notification settings
- **Better Modal Design** - Cleaner feedback detail view

### 📊 Dashboard Improvements
- **Enhanced Stats Cards** - Color-coded icons, trend arrows, better hierarchy
- **Improved Feedback Cards** - Star ratings, sentiment badges, attachment counts
- **Time-Stamped Entries** - "2h ago" format for easy scanning
- **Quick Actions** - One-click mark as reviewed

## 🎯 Core Features

### Authentication System
- ✅ Secure signup and login
- ✅ Session management
- ✅ Password validation (min 8 chars)
- ✅ Beautiful split-screen auth pages
- ✅ Brand showcase with features/stats

### Dashboard
- 📊 **Real-time Statistics**
  - Total feedback count
  - Pending reviews
  - Average response time
  - Customer satisfaction (rating)
  
- 💬 **Feedback Management**
  - View all feedback with filtering
  - Sentiment analysis (positive/neutral/negative)
  - Priority levels (normal/high/urgent)
  - Status tracking (pending/reviewed)
  - Mark as reviewed functionality
  - Detailed feedback modal view
  - Customer ratings (1-5 stars)
  - Attachment indicators (photos, audio, video)
  
- ⚙️ **Settings**
  - Business profile editor
  - Notification preferences with toggle switches
  - Integration options (coming soon)

### UI/UX Highlights
- 🎨 Clean, modern design with plenty of white space
- 📱 Fully responsive (mobile, tablet, desktop)
- 🌈 Professional color scheme with subtle gradients
- ⚡ Smooth animations and micro-interactions
- 🔔 Toast notifications for user actions
- 📈 Visual data display with color-coded stats
- 🎯 Intuitive navigation with active states

## 🛠️ Technology Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Custom CSS with CSS Variables (modern design system)
- **Storage:** LocalStorage (Firebase-ready architecture)
- **Icons:** Unicode emojis (lightweight, no external dependencies)
- **Fonts:** Google Fonts (Plus Jakarta Sans)

## 📂 Project Structure

```
feedback-liberia/
├── index.html          # Main HTML (21KB)
├── style.css           # Complete styling (20KB)
├── app.js              # All JavaScript logic (21KB)
└── README.md           # This file
```

## 🚀 Getting Started

### Option 1: Use the Live Demo
Visit: https://hniane.com/feedback-liberia/

1. Click **"Create free account"**
2. Enter any details:
   - Business Name: Test Business
   - Email: test@example.com
   - Phone: +231 123 4567
   - Password: password123 (min 8 chars)
3. Explore the dashboard with pre-loaded mock data!

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/hniane1/feedback-liberia.git
cd feedback-liberia

# Open in browser
open index.html
# or run a local server
python3 -m http.server 8000
```

## 📱 Mock Data

The app comes with 7 realistic feedback entries for testing:
- Mix of positive, neutral, and negative sentiments
- Different priority levels
- Various attachment types
- Realistic Liberian customer names
- Time-stamped entries

## 🔄 Firebase Integration Guide

Currently uses localStorage for demo. To integrate Firebase:

### 1. Install Firebase
```bash
npm install firebase
```

### 2. Replace Auth Functions
```javascript
// Replace in app.js
login() → firebase.auth().signInWithEmailAndPassword()
signup() → firebase.auth().createUserWithEmailAndPassword()
logout() → firebase.auth().signOut()
```

### 3. Replace Storage with Firestore
```javascript
// Collections structure
businesses/
  ├── businessId
  │   ├── businessName
  │   ├── email
  │   ├── phone
  │   └── address

feedback/
  ├── feedbackId
  │   ├── customerId
  │   ├── customerName
  │   ├── message
  │   ├── rating
  │   ├── sentiment
  │   ├── status
  │   ├── priority
  │   ├── attachments[]
  │   └── timestamp
```

### 4. Add Real-time Listeners
```javascript
db.collection('feedback')
  .onSnapshot(snapshot => {
    // Update UI in real-time
  });
```

### 5. Add File Upload
```javascript
// Firebase Storage for attachments
const storageRef = firebase.storage().ref();
const fileRef = storageRef.child(`feedback/${feedbackId}/${filename}`);
await fileRef.put(file);
```

## 🎨 Design System

### Color Palette
- **Primary:** `#3b82f6` (Blue 500)
- **Secondary:** `#10b981` (Green 500)
- **Danger:** `#ef4444` (Red 500)
- **Warning:** `#f59e0b` (Amber 500)
- **Purple:** `#8b5cf6` (Purple 500)
- **Gray Scale:** 50 → 900 (comprehensive neutrals)

### Typography
- **Font:** Plus Jakarta Sans (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700, 800
- **Scale:** 0.75rem → 2.5rem (fluid type scale)

### Spacing
- **System:** 0.25rem increments (4px base)
- **Consistent:** padding, margins, gaps

### Shadows
- **5 Levels:** sm, default, md, lg, xl
- **Subtle:** Low opacity for modern look

### Borders
- **Radius:** 6px, 8px, 12px, 16px, full (9999px)
- **Width:** 1px, 1.5px for emphasis

## 📊 Features Roadmap

### ✅ Phase 1 (Complete)
- [x] Modern authentication UI
- [x] Dashboard with stats
- [x] Feedback list with filtering
- [x] Sentiment analysis display
- [x] Priority indicators
- [x] Settings page
- [x] Responsive design
- [x] Mock data system

### 🔄 Phase 2 (Firebase Integration)
- [ ] Firebase Authentication
- [ ] Firestore database
- [ ] Real-time updates
- [ ] Firebase Storage for files
- [ ] Cloud Functions for notifications

### 🚀 Phase 3 (Customer App)
- [ ] Simple feedback submission form
- [ ] Camera integration (photo capture)
- [ ] Voice recording
- [ ] Video recording
- [ ] One-click submission
- [ ] QR code for easy access

### 🌟 Phase 4 (Advanced Features)
- [ ] Email notifications (SendGrid/AWS SES)
- [ ] SMS notifications (Twilio for Liberian carriers)
- [ ] Analytics dashboard with charts
- [ ] Export to PDF/Excel
- [ ] Team collaboration features
- [ ] Customer profiles
- [ ] AI sentiment analysis (more accurate)
- [ ] Multi-language support (English, French)
- [ ] Response templates
- [ ] Auto-tagging with ML

## 🌍 Liberian Context

Built specifically for Liberian businesses:
- ✅ Mobile-first design (most access via phones)
- ✅ Low-bandwidth optimized (no heavy frameworks)
- ✅ Simple, accessible interface
- ✅ Local names in mock data
- ✅ +231 phone format support
- 🔄 Future: MTN/Orange/Lonestar mobile money
- 🔄 Future: Local language support (Bassa, Kpelle, etc.)

## 🤝 Contributing

Contributions welcome! Areas to help:
- Firebase integration
- Customer feedback app
- Analytics/charts
- Mobile app (React Native/Flutter)
- Translation support
- Testing on Liberian networks

## 📄 License

Open source. Free for Liberian businesses.

## 📞 Contact

For questions or support:
- Email: hassimiou.niane@maine.edu
- GitHub: https://github.com/hniane1/feedback-liberia

---

**Built with ❤️ for Liberian businesses**

_Version 2.0 - Complete redesign with modern, clean interface_