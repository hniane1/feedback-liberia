// Storage keys
const STORAGE = {
    USER: 'feedbackhub_user',
    BUSINESSES: 'feedbackhub_businesses',
    FEEDBACK: 'feedbackhub_feedback'
};

// Initialize mock data
function initMockData() {
    if (!localStorage.getItem(STORAGE.BUSINESSES)) {
        localStorage.setItem(STORAGE.BUSINESSES, JSON.stringify([]));
    }
    
    if (!localStorage.getItem(STORAGE.FEEDBACK)) {
        const mockFeedback = [
            {
                id: 1,
                customerId: 'C001',
                customerName: 'John Mensah',
                businessId: null,
                message: 'Excellent service! The team was professional and resolved my issue quickly. Very satisfied with the experience.',
                rating: 5,
                sentiment: 'positive',
                status: 'pending',
                priority: 'normal',
                attachments: [{ type: 'image', count: 2 }, { type: 'audio', count: 1 }],
                timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
                tags: ['service', 'support']
            },
            {
                id: 2,
                customerId: 'C002',
                customerName: 'Grace Kpoto',
                businessId: null,
                message: 'Product quality is good, but delivery was delayed by 3 days. Would appreciate better communication about shipping status.',
                rating: 3,
                sentiment: 'neutral',
                status: 'reviewed',
                priority: 'normal',
                attachments: [{ type: 'image', count: 1 }],
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
                tags: ['delivery', 'product']
            },
            {
                id: 3,
                customerId: 'C003',
                customerName: 'Samuel Williams',
                businessId: null,
                message: 'Outstanding! This is exactly what I was looking for. The quality exceeded my expectations. Will definitely recommend to friends.',
                rating: 5,
                sentiment: 'positive',
                status: 'reviewed',
                priority: 'normal',
                attachments: [{ type: 'video', count: 1 }],
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                tags: ['product', 'quality']
            },
            {
                id: 4,
                customerId: 'C004',
                customerName: 'Patience Gbessay',
                businessId: null,
                message: 'Had billing issues but customer service was very helpful. They fixed everything within an hour. Thank you!',
                rating: 4,
                sentiment: 'positive',
                status: 'pending',
                priority: 'high',
                attachments: [{ type: 'image', count: 1 }],
                timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
                tags: ['billing', 'support']
            },
            {
                id: 5,
                customerId: 'C005',
                customerName: 'Mohammed Kamara',
                businessId: null,
                message: 'Very disappointed. Product arrived damaged and customer service was unresponsive. Not what I expected at all.',
                rating: 1,
                sentiment: 'negative',
                status: 'pending',
                priority: 'urgent',
                attachments: [{ type: 'image', count: 3 }, { type: 'audio', count: 1 }],
                timestamp: new Date(Date.now() - 0.5 * 60 * 60 * 1000).toISOString(),
                tags: ['product', 'support', 'urgent']
            },
            {
                id: 6,
                customerId: 'C006',
                customerName: 'Mary Johnson',
                businessId: null,
                message: 'Love the new location! Much more spacious and convenient parking. The staff is friendly and helpful.',
                rating: 5,
                sentiment: 'positive',
                status: 'pending',
                priority: 'normal',
                attachments: [{ type: 'image', count: 2 }],
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                tags: ['location', 'service']
            },
            {
                id: 7,
                customerId: 'C007',
                customerName: 'Emmanuel Kofi',
                businessId: null,
                message: 'Good value for money. The product works as described. Delivery was on time.',
                rating: 4,
                sentiment: 'positive',
                status: 'reviewed',
                priority: 'normal',
                attachments: [],
                timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
                tags: ['product', 'delivery']
            }
        ];
        localStorage.setItem(STORAGE.FEEDBACK, JSON.stringify(mockFeedback));
    }
}

// Authentication
function login(email, password) {
    const businesses = JSON.parse(localStorage.getItem(STORAGE.BUSINESSES) || '[]');
    const business = businesses.find(b => b.email === email && b.password === password);
    
    if (business) {
        const user = {
            id: business.id,
            businessName: business.businessName,
            email: business.email,
            phone: business.phone,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem(STORAGE.USER, JSON.stringify(user));
        return { success: true, user };
    }
    
    return { success: false, error: 'Invalid email or password' };
}

function signup(businessName, email, phone, password) {
    const businesses = JSON.parse(localStorage.getItem(STORAGE.BUSINESSES) || '[]');
    
    if (businesses.find(b => b.email === email)) {
        return { success: false, error: 'Email already registered' };
    }
    
    const newBusiness = {
        id: 'B' + Date.now(),
        businessName,
        email,
        phone,
        password,
        createdAt: new Date().toISOString(),
        address: ''
    };
    
    businesses.push(newBusiness);
    localStorage.setItem(STORAGE.BUSINESSES, JSON.stringify(businesses));
    
    const user = {
        id: newBusiness.id,
        businessName,
        email,
        phone,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem(STORAGE.USER, JSON.stringify(user));
    
    return { success: true, user };
}

function logout() {
    localStorage.removeItem(STORAGE.USER);
    showPage('login');
}

function getCurrentUser() {
    const userStr = localStorage.getItem(STORAGE.USER);
    return userStr ? JSON.parse(userStr) : null;
}

// UI Navigation
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
    
    // Update user info
    document.getElementById('userName').textContent = user.businessName;
    document.getElementById('userAvatar').textContent = user.businessName.charAt(0).toUpperCase();
    
    // Load overview page
    showDashboardPage('overview');
}

function showDashboardPage(page) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(p => p.style.display = 'none');
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    // Show selected page
    const pageIds = {
        'overview': 'overviewPage',
        'feedback': 'feedbackPage',
        'settings': 'settingsPage'
    };
    
    const pageId = pageIds[page];
    if (pageId) {
        document.getElementById(pageId).style.display = 'block';
    }
    
    // Update active nav
    const navItem = document.querySelector(`[data-page="${page}"]`);
    if (navItem) navItem.classList.add('active');
    
    // Load data
    if (page === 'overview') loadOverview();
    else if (page === 'feedback') loadFeedback();
    else if (page === 'settings') loadSettings();
}

function loadOverview() {
    const feedback = getFeedback();
    const recent = feedback.slice(0, 4);
    
    const list = document.getElementById('recentFeedbackList');
    list.innerHTML = '';
    recent.forEach(item => list.appendChild(createFeedbackElement(item)));
}

function loadFeedback(filter = 'all') {
    let feedback = getFeedback();
    
    if (filter !== 'all') {
        feedback = feedback.filter(f => f.status === filter);
    }
    
    const list = document.getElementById('allFeedbackList');
    list.innerHTML = '';
    feedback.forEach(item => list.appendChild(createFeedbackElement(item, true)));
}

function loadSettings() {
    const user = getCurrentUser();
    if (!user) return;
    
    const businesses = JSON.parse(localStorage.getItem(STORAGE.BUSINESSES) || '[]');
    const business = businesses.find(b => b.id === user.id);
    
    if (business) {
        document.getElementById('settingsBusinessName').value = business.businessName || '';
        document.getElementById('settingsEmail').value = business.email || '';
        document.getElementById('settingsPhone').value = business.phone || '';
        document.getElementById('settingsAddress').value = business.address || '';
    }
}

function getFeedback() {
    const feedback = JSON.parse(localStorage.getItem(STORAGE.FEEDBACK) || '[]');
    return feedback.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function createFeedbackElement(item, showSentiment = false) {
    const div = document.createElement('div');
    div.className = 'feedback-item';
    div.onclick = () => showFeedbackModal(item);
    
    const timeAgo = formatTimeAgo(new Date(item.timestamp));
    const stars = '⭐'.repeat(item.rating);
    
    const attachmentsHtml = item.attachments.map(att => {
        const icons = { image: '📷', audio: '🎤', video: '🎥' };
        return `<span class="attachment-badge">${icons[att.type]} ${att.count}</span>`;
    }).join('');
    
    const sentimentHtml = showSentiment ? 
        `<span class="sentiment-badge ${item.sentiment}">${item.sentiment}</span>` : '';
    
    div.innerHTML = `
        <div class="feedback-avatar">${item.customerName.charAt(0)}</div>
        <div class="feedback-content">
            <div class="feedback-header">
                <div class="feedback-meta">
                    <div class="feedback-name">${item.customerName}</div>
                    <div class="feedback-time">${timeAgo}</div>
                </div>
                <div class="feedback-badges">
                    ${sentimentHtml}
                    <span class="feedback-status ${item.status}">${item.status === 'pending' ? 'Pending' : 'Reviewed'}</span>
                </div>
            </div>
            <div class="feedback-text">${item.message}</div>
            <div class="feedback-footer">
                <div class="feedback-rating">${stars}</div>
                <div class="feedback-attachments">${attachmentsHtml}</div>
            </div>
        </div>
    `;
    
    return div;
}

function formatTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
}

function showFeedbackModal(item) {
    const modal = document.getElementById('feedbackModal');
    const content = document.getElementById('feedbackDetailContent');
    
    const stars = '⭐'.repeat(item.rating);
    const attachmentsHtml = item.attachments.map(att => {
        const icons = { image: '📷', audio: '🎤', video: '🎥' };
        return `<span class="attachment-badge">${icons[att.type]} ${att.count} ${att.type}${att.count > 1 ? 's' : ''}</span>`;
    }).join('');
    
    content.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <div style="display: flex; gap: 1rem; align-items: start; margin-bottom: 1.5rem;">
                <div class="feedback-avatar" style="width: 64px; height: 64px; font-size: 1.75rem;">
                    ${item.customerName.charAt(0)}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem;">${item.customerName}</div>
                    <div style="color: var(--gray-500); font-size: 0.875rem; margin-bottom: 0.5rem;">
                        ${new Date(item.timestamp).toLocaleString()}
                    </div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <div style="font-size: 1.25rem;">${stars}</div>
                        <span class="sentiment-badge ${item.sentiment}">${item.sentiment}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.875rem; font-weight: 700; color: var(--gray-500); margin-bottom: 0.75rem; text-transform: uppercase;">Message</h4>
            <p style="line-height: 1.7; color: var(--gray-700); font-size: 1rem;">${item.message}</p>
        </div>
        
        ${item.attachments.length > 0 ? `
            <div style="margin-bottom: 1.5rem;">
                <h4 style="font-size: 0.875rem; font-weight: 700; color: var(--gray-500); margin-bottom: 0.75rem; text-transform: uppercase;">Attachments</h4>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">${attachmentsHtml}</div>
            </div>
        ` : ''}
        
        <div style="display: flex; gap: 0.75rem; padding-top: 1.5rem; border-top: 1px solid var(--border);">
            <button class="btn-primary" onclick="markAsReviewed(${item.id})" ${item.status === 'reviewed' ? 'disabled' : ''}>
                ${item.status === 'pending' ? 'Mark as Reviewed' : '✓ Reviewed'}
            </button>
            <button class="btn-ghost" onclick="closeModal()">Close</button>
        </div>
    `;
    
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('feedbackModal').classList.remove('show');
}

function markAsReviewed(feedbackId) {
    const feedback = JSON.parse(localStorage.getItem(STORAGE.FEEDBACK) || '[]');
    const item = feedback.find(f => f.id === feedbackId);
    
    if (item) {
        item.status = 'reviewed';
        localStorage.setItem(STORAGE.FEEDBACK, JSON.stringify(feedback));
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
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initMockData();
    
    const user = getCurrentUser();
    showPage(user ? 'dashboard' : 'login');
    
    // Login
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const result = login(email, password);
        if (result.success) {
            showPage('dashboard');
            showNotification('Welcome back!');
        } else {
            showNotification(result.error, 'error');
        }
    });
    
    // Signup
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
            showNotification('Account created successfully!');
        } else {
            showNotification(result.error, 'error');
        }
    });
    
    // Auth toggles
    document.getElementById('showSignup').addEventListener('click', (e) => {
        e.preventDefault();
        showPage('signup');
    });
    
    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        showPage('login');
    });
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            if (page) showDashboardPage(page);
        });
    });
    
    // Filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            loadFeedback(chip.dataset.filter);
        });
    });
    
    // Modal
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
    document.querySelector('.modal-overlay')?.addEventListener('click', closeModal);
    
    // Settings tabs
    document.querySelectorAll('.settings-nav-item').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.settings-nav-item').forEach(t => t.classList.remove('active'));
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
        
        const businesses = JSON.parse(localStorage.getItem(STORAGE.BUSINESSES) || '[]');
        const idx = businesses.findIndex(b => b.id === user.id);
        
        if (idx !== -1) {
            businesses[idx].businessName = document.getElementById('settingsBusinessName').value;
            businesses[idx].email = document.getElementById('settingsEmail').value;
            businesses[idx].phone = document.getElementById('settingsPhone').value;
            businesses[idx].address = document.getElementById('settingsAddress').value;
            
            localStorage.setItem(STORAGE.BUSINESSES, JSON.stringify(businesses));
            
            user.businessName = businesses[idx].businessName;
            user.email = businesses[idx].email;
            user.phone = businesses[idx].phone;
            localStorage.setItem(STORAGE.USER, JSON.stringify(user));
            
            loadDashboard();
            showNotification('Settings saved!');
        }
    });
});

// CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);