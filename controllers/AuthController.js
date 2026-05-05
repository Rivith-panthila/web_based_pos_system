// Basic Authentication Controller
class AuthController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Login form
        $('#loginForm').on('submit', (e) => {
            e.preventDefault();
            this.login();
        });
        
        // Logout button
        $('#logoutBtn').on('click', () => this.logout());
    }
    
    login() {
        const username = $('#username').val().trim();
        const password = $('#password').val().trim();
        
        if (!username || !password) {
            this.showError('Please enter username and password');
            return;
        }
        
        if (this.model.authenticate(username, password)) {
            this.view.showMainApp();
            this.view.showSection('dashboard');
            this.showSuccess('Login successful!');
        } else {
            this.showError('Invalid credentials');
        }
    }
    
    logout() {
        this.model.logout();
        this.view.showLogin();
        this.showSuccess('Logged out successfully!');
    }
    
    showSuccess(message) {
        alert(message);
    }
    
    showError(message) {
        alert(message);
    }
}
