# FeedbackHub - Business Feedback Dashboard for Liberia

A sophisticated, multi-tenant feedback management platform designed specifically for businesses in Liberia. Enables businesses to collect customer feedback through photos, voice messages, and videos, then manage everything from a beautiful dashboard.

## 🌟 Live Demo

**Dashboard:** https://hniane.com/feedback-liberia/

## 🎯 Purpose

Liberian businesses often lack proper systems to collect and manage customer feedback. FeedbackHub solves this by providing:

1. **Simple customer feedback submission** - Take photos, record messages/videos, and send instantly
2. **Professional business dashboard** - Manage all feedback from one place
3. **Multi-tenant support** - Multiple businesses can use the same platform
4. **Real-time updates** - Businesses see feedback immediately

## ✨ Features

### Authentication System
- ✅ User registration (signup)
- ✅ Secure login
- ✅ Session management
- ✅ Password validation
- ✅ Remember me functionality
- 🔄 Firebase integration ready (currently using localStorage mock)

### Dashboard Features
- 📊 **Overview Page**
  - Real-time statistics (total feedback, pending reviews, response rate, avg rating)
  - Recent feedback list
  - Quick action buttons (QR code, email campaigns, export reports, team invites)
  
- 💬 **Feedback Management**
  - View all feedback with filtering (All, Pending, Reviewed, Archived)
  - Detailed feedback view modal
  - Mark feedback as reviewed
  - See customer ratings (1-5 stars)
  - View attachments (photos, audio, video indicators)
  - Time-stamped feedback
  
- ⚙️ **Settings**
  - Update business profile
  - Manage notification preferences
  - Integration options
  - Customizable feedback settings

### UI/UX Highlights
- 🎨 Modern, sophisticated design
- 📱 Fully responsive (works on mobile, tablet, desktop)
- 🌙 Professional color scheme with gradients
- ⚡ Smooth animations and transitions
- 🔔 Real-time notifications
- 📈 Visual data display with stats cards

## 🛠️ Technology Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Custom CSS with CSS Variables
- **Storage:** LocalStorage (mock implementation, Firebase-ready)
- **Icons:** Unicode emojis (can be replaced with icon library)
- **Fonts:** Google Fonts (Inter)

## 📂 Project Structure

```
feedback-liberia/
├── index.html          # Main HTML with all pages
├── style.css           # Complete styling (16KB)
├── app.js              # All JavaScript logic (20KB)
└── README.md           # This file
```

## 🚀 Getting Started

### Option 1: Use the Live Demo
Visit: https://hniane.com/feedback-liberia/

### Option 2: Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/hniane1/feedback-liberia.git
   cd feedback-liberia
   ```

2. Open `index.html` in your browser:
   ```bash
   open index.html
   # or
   python3 -m http.server 8000
   ```

3. Create an account and explore!

## 📱 Mock Data & Testing

The app comes pre-loaded with mock feedback data for testing:
- 6 sample feedback entries
- Mix of pending and reviewed statuses
- Various attachment types
- Realistic Liberian customer names

### Test Account
You can create any account on the signup page. For testing:
- **Business Name:** Test Business
- **Email:** test@example.com
- **Phone:** +231 123 4567
- **Password:** password123

## 🔄 Firebase Integration (Next Steps)

Currently uses localStorage for demo purposes. To integrate Firebase:

1. **Install Firebase:**
   ```bash
   npm install firebase
   ```

2. **Replace mock auth functions** in `app.js`:
   - `login()` → `firebase.auth().signInWithEmailAndPassword()`
   - `signup()` → `firebase.auth().createUserWithEmailAndPassword()`
   - `logout()` → `firebase.auth().signOut()`

3. **Replace localStorage with Firestore:**
   - `STORAGE_KEYS.BUSINESSES` → Firestore collection `businesses`
   - `STORAGE_KEYS.FEEDBACK` → Firestore collection `feedback`
   - `STORAGE_KEYS.USER` → Firebase Auth current user

4. **Add real-time listeners:**
   ```javascript
   db.collection('feedback').onSnapshot(snapshot => {
       // Update UI in real-time
   });
   ```

## 🎨 Design System

### Color Palette
- **Primary:** `#6366f1` (Indigo)
- **Secondary:** `#10b981` (Green)
- **Danger:** `#ef4444` (Red)
- **Warning:** `#f59e0b` (Amber)
- **Dark:** `#0f172a` (Navy)

### Typography
- **Font Family:** Inter (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700, 800

### Components
- Buttons (Primary, Secondary, Icon)
- Cards (Stats, Feedback, Action)
- Forms (Input, Textarea, Checkbox)
- Modals (Centered, Overlay)
- Navigation (Sidebar, Topbar)

## 📊 Features Roadmap

### Phase 1 (Current - Mock Implementation)
- [x] Authentication system
- [x] Dashboard overview
- [x] Feedback list & detail view
- [x] Settings page
- [x] Responsive design
- [x] Mock data

### Phase 2 (Firebase Integration)
- [ ] Firebase Authentication
- [ ] Firestore database
- [ ] Real-time updates
- [ ] Image upload to Firebase Storage
- [ ] Audio/video upload

### Phase 3 (Customer App)
- [ ] Simple customer feedback form
- [ ] Camera integration
- [ ] Voice recording
- [ ] Video recording
- [ ] One-click submission
- [ ] QR code scanning

### Phase 4 (Advanced Features)
- [ ] Email notifications
- [ ] SMS notifications (Liberian carriers)
- [ ] Analytics & reports
- [ ] Multi-language support (English, French, local languages)
- [ ] Export to PDF/Excel
- [ ] Team collaboration
- [ ] Customer profiles
- [ ] Sentiment analysis

## 🌍 Liberian Context

This platform is designed with Liberian businesses in mind:
- Mobile-first (many users access via phone)
- Low-bandwidth optimized
- Simple, intuitive interface (accessible to all education levels)
- Phone number support (+231 format)
- Local business names in mock data
- Future: Mobile Money integration (MTN, Orange, Lonestar)

## 📄 License

This project is open source and available for use by Liberian businesses.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📞 Support

For questions or support, contact: hassimiou.niane@maine.edu

---

**Built with ❤️ for Liberian businesses**