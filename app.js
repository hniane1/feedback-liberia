// Mock Data Storage
const STORAGE_KEYS = {
    USER: 'feedbackhub_user',
    BUSINESSES: 'feedbackhub_businesses',
    FEEDBACK: 'feedbackhub_feedback'
};

// Initialize mock data
function initializeMockData() {
    if (!localStorage.getItem(STORAGE_KEYS.BUSINESSES)) {
        localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify([]));
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.FEEDBACK)) {
        const mockFeedback = [
            {
                id: 1,
                customerId: 'C001',
                customerName: 'John Doe',
                businessId: null,
                message: 'Great service! The staff was very friendly and helpful. Will definitely come back again.',
                rating: 5,
                status: 'pending',
                attachments: ['📷 image', '🎤 audio'],
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 2,
                customerId: 'C002',
                customerName: 'Mary Johnson',
                businessId: null,
                message: 'The product quality is excellent, but delivery took longer than expected.',
                rating: 4,
                status: 'reviewed',
                attachments: ['📷 image'],
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 3,
                customerId: 'C003',
                customerName: 'Samuel Kpoto',
                businessId: null,
                message: 'Very satisfied with my purchase. Keep up the good work!',
                rating: 5,
                status: 'reviewed',
                attachments: ['🎤 audio', '🎥 video'],
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 4,
                customerId: 'C004',
                customerName: 'Grace Williams',
                businessId: null,
                message: 'Had an issue with billing but customer service resolved it quickly. Thank you!',
                rating: 4,
                status: 'pending',
                attachments: ['📷 image'],
                timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 5,
                customerId: 'C005',
                customerName: 'Mohammed Kamara',
                businessId: null,
                message: 'Excellent experience overall. Professional service and quality products.',
                rating: 5,
                status: 'reviewed',
                attachments: [],
                timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 6,
                customerId: 'C006',
                customerName: 'Patience Gbessay',
                businessId: null,
                message: 'The new location is much more convenient. Love the improvements!',
                rating: 5,
                status: 'pending',
                attachments: ['🎥 video'],
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
            }
        ];
        localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(mockFeedback));
    }
}

// Authentication Functions
function login(email, password) {
    const businesses = JSON.parse(localStorage.getItem(STORAGE_KEYS.BUSINESSES) || '[]');
    const business = businesses.find(b => b.email === email && b.password === password);
    
    if (business) {
        const user = {
            id: business.id,
            businessName: business.businessName,
            email: business.email,
            phone: business.phone,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        return { success: true, user };
    }
    
    return { success: false, error: 'Invalid email or password' };
}

function signup(businessName, email, phone, password) {
    const businesses = JSON.parse(localStorage.getItem(STORAGE_KEYS.BUSINESSES) || '[]');
    
    // Check if email already exists
    if (businesses.find(b => b.email === email)) {
        return { success: false, error: 'Email already registered' };
    }
    
    const newBusiness = {
        id: 'B' + Date.now(),
        businessName,
        email,
        phone,
        password, // In production, NEVER store plain text passwords!
        createdAt: new Date().toISOString(),
        address: ''
    };
    
    businesses.push(newBusiness);
    localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(businesses));
    
    // Auto login after signup
    const user = {
        id: newBusiness.id,
        businessName,
        email,
        phone,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    
    return { success: true, user };
}

function logout() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    showPage('login');
}

function getCurrentUser() {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
}

// UI Functions
function showPage(page) {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
    
    if (page === 'login') {
        document.getElementById('loginPage').style.display = 'flex';
    } else if (page === 'signup') {
        document.getElementById('signupPage').style.display = 'flex';
    } else if (page === 'dashboard') {
        document.getElementById('dashboard').style.display = 'flex';
        loadDashboard();
    }
}

function loadDashboard() {
    const user = getCurrentUser();
    if (!user) {
        showPage('login');
        return;
    }
    
    // Update sidebar user info
    document.getElementById('sidebarBusinessName').textContent = user.businessName;
    document.getElementById('sidebarEmail').textContent = user.email;
    document.querySelector('.user-avatar').textContent = user.businessName.charAt(0).toUpperCase();
    
    // Load initial page (overview)
    showDashboardPage('overview');
}

function showDashboardPage(page) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(p => p.style.display = 'none');
    
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    // Show selected page
    const pageMap = {
        'overview': 'overviewPage',
        'feedback': 'feedbackPage',
        'settings': 'settingsPage'
    };
    
    const pageId = pageMap[page];
    if (pageId) {
        document.getElementById(pageId).style.display = 'block';
    }
    
    // Update active nav
    const navItem = document.querySelector(`[data-page="${page}"]`);
    if (navItem) {
        navItem.classList.add('active');
    }
    
    // Update page title
    const titles = {
        'overview': 'Overview',
        'feedback': 'Feedback',
        'analytics': 'Analytics',
        'customers': 'Customers',
        'settings': 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[page] || 'Dashboard';
    
    // Load page data
    if (page === 'overview') {
        loadOverview();
    } else if (page === 'feedback') {
        loadFeedback();
    } else if (page === 'settings') {
        loadSettings();
    }
}

function loadOverview() {
    const feedback = getFeedback();
    const recentFeedback = feedback.slice(0, 3);
    
    const recentList = document.getElementById('recentFeedbackList');
    recentList.innerHTML = '';
    
    recentFeedback.forEach(item => {
        recentList.appendChild(createFeedbackElement(item));
    });
}

function loadFeedback(filter = 'all') {
    let feedback = getFeedback();
    
    if (filter !== 'all') {
        feedback = feedback.filter(f => f.status === filter);
    }
    
    const feedbackList = document.getElementById('allFeedbackList');
    feedbackList.innerHTML = '';
    
    feedback.forEach(item => {
        feedbackList.appendChild(createFeedbackElement(item));
    });
}

function loadSettings() {
    const user = getCurrentUser();
    if (!user) return;
    
    const businesses = JSON.parse(localStorage.getItem(STORAGE_KEYS.BUSINESSES) || '[]');
    const business = businesses.find(b => b.id === user.id);
    
    if (business) {
        document.getElementById('settingsBusinessName').value = business.businessName || '';
        document.getElementById('settingsEmail').value = business.email || '';
        document.getElementById('settingsPhone').value = business.phone || '';
        document.getElementById('settingsAddress').value = business.address || '';
    }
}

function getFeedback() {
    const feedback = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK) || '[]');
    // Sort by timestamp, newest first
    return feedback.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function createFeedbackElement(item) {
    const div = document.createElement('div');
    div.className = 'feedback-item';
    div.onclick = () => showFeedbackDetail(item);
    
    const timeAgo = formatTimeAgo(new Date(item.timestamp));
    const statusClass = item.status === 'pending' ? 'pending' : 'reviewed';
    const statusText = item.status === 'pending' ? 'Pending' : 'Reviewed';
    
    div.innerHTML = `
        <div class="feedback-avatar">${item.customerName.charAt(0)}</div>
        <div class="feedback-content">
            <div class="feedback-header">
                <div class="feedback-meta">
                    <div class="feedback-name">${item.customerName}</div>
                    <div class="feedback-time">${timeAgo}</div>
                </div>
                <span class="feedback-status ${statusClass}">${statusText}</span>
            </div>
            <div class="feedback-text">${item.message}</div>
            <div class="feedback-attachments">
                ${item.attachments.map(att => `<span class="attachment-badge">${att}</span>`).join('')}
            </div>
        </div>
    `;
    
    return div;
}

function formatTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }
    
    return 'Just now';
}

function showFeedbackDetail(item) {
    const modal = document.getElementById('feedbackModal');
    const content = document.getElementById('feedbackDetailContent');
    
    const rating = '⭐'.repeat(item.rating);
    
    content.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <div class="feedback-avatar" style="width: 64px; height: 64px; font-size: 1.5rem;">${item.customerName.charAt(0)}</div>
                <div>
                    <div style="font-weight: 700; font-size: 1.25rem; margin-bottom: 0.25rem;">${item.customerName}</div>
                    <div style="color: var(--gray-500);">${new Date(item.timestamp).toLocaleString()}</div>
                    <div style="font-size: 1.25rem; margin-top: 0.25rem;">${rating}</div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.75rem; color: var(--gray-700);">Message</h4>
            <p style="line-height: 1.6; color: var(--gray-800);">${item.message}</p>
        </div>
        
        ${item.attachments.length > 0 ? `
            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.75rem; color: var(--gray-700);">Attachments</h4>
                <div class="feedback-attachments">
                    ${item.attachments.map(att => `<span class="attachment-badge">${att}</span>`).join('')}
                </div>
            </div>
        ` : ''}
        
        <div style="display: flex; gap: 1rem;">
            <button class="btn-primary" onclick="markAsReviewed(${item.id})">
                ${item.status === 'pending' ? 'Mark as Reviewed' : 'Reviewed ✓'}
            </button>
            <button class="btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('feedbackModal').style.display = 'none';
}

function markAsReviewed(feedbackId) {
    const feedback = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK) || '[]');
    const item = feedback.find(f => f.id === feedbackId);
    
    if (item) {
        item.status = 'reviewed';
        localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedback));
        closeModal();
        loadOverview();
        loadFeedback();
        showNotification('Feedback marked as reviewed', 'success');
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? 'var(--secondary)' : 'var(--danger)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeMockData();
    
    // Check if user is logged in
    const user = getCurrentUser();
    if (user) {
        showPage('dashboard');
    } else {
        showPage('login');
    }
    
    // Login form
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const result = login(email, password);
        if (result.success) {
            showPage('dashboard');
            showNotification('Welcome back!', 'success');
        } else {
            showNotification(result.error, 'error');
        }
    });
    
    // Signup form
    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const businessName = document.getElementById('businessName').value;
        const email = document.getElementById('signupEmail').value;
        const phone = document.getElementById('phoneNumber').value;
        const password = document.getElementById('signupPassword').value;
        
        if (password.length < 8) {
            showNotification('Password must be at least 8 characters', 'error');
            return;
        }
        
        const result = signup(businessName, email, phone, password);
        if (result.success) {
            showPage('dashboard');
            showNotification('Account created successfully!', 'success');
        } else {
            showNotification(result.error, 'error');
        }
    });
    
    // Toggle between login and signup
    document.getElementById('showSignup').addEventListener('click', (e) => {
        e.preventDefault();
        showPage('signup');
    });
    
    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        showPage('login');
    });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            if (page) {
                showDashboardPage(page);
            }
        });
    });
    
    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadFeedback(tab.dataset.filter);
        });
    });
    
    // Modal close
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
    document.querySelector('.modal-overlay')?.addEventListener('click', closeModal);
    
    // Settings tabs
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tabName + 'Tab')?.classList.add('active');
        });
    });
    
    // Settings form
    document.querySelector('.settings-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const user = getCurrentUser();
        if (!user) return;
        
        const businesses = JSON.parse(localStorage.getItem(STORAGE_KEYS.BUSINESSES) || '[]');
        const businessIndex = businesses.findIndex(b => b.id === user.id);
        
        if (businessIndex !== -1) {
            businesses[businessIndex].businessName = document.getElementById('settingsBusinessName').value;
            businesses[businessIndex].email = document.getElementById('settingsEmail').value;
            businesses[businessIndex].phone = document.getElementById('settingsPhone').value;
            businesses[businessIndex].address = document.getElementById('settingsAddress').value;
            
            localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(businesses));
            
            // Update current user
            user.businessName = businesses[businessIndex].businessName;
            user.email = businesses[businessIndex].email;
            user.phone = businesses[businessIndex].phone;
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
            
            loadDashboard();
            showNotification('Settings saved successfully!', 'success');
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);