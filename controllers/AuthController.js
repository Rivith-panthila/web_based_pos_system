// Basic Authentication Controller
class AuthController {
    constructor() {
        this.users = [{ username: 'admin', password: 'admin123' }];
        this.currentUser = null;
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
        
        // Navigation
        $('.nav-link[data-section]').on('click', (e) => {
            e.preventDefault();
            const section = $(e.currentTarget).data('section');
            this.showSection(section);
        });
    }
    
    login() {
        const username = $('#username').val().trim();
        const password = $('#password').val().trim();
        
        if (!username || !password) {
            this.showError('Please enter username and password');
            return;
        }
        
        if (this.authenticate(username, password)) {
            this.showMainApp();
            this.showSection('dashboard');
            this.showSuccess('Login successful!');
        } else {
            this.showError('Invalid credentials');
        }
    }
    
    logout() {
        this.currentUser = null;
        this.showLogin();
        this.showSuccess('Logged out successfully!');
    }
    
    authenticate(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            this.currentUser = username;
            return true;
        }
        return false;
    }
    
    showMainApp() {
        $('#loginContainer').addClass('d-none');
        $('#mainApp').removeClass('d-none');
    }
    
    showLogin() {
        $('#loginContainer').removeClass('d-none');
        $('#mainApp').addClass('d-none');
    }
    
    showSection(sectionName) {
        $('.content-section').addClass('d-none');
        $(`#${sectionName}Section`).removeClass('d-none');
        
        $('.nav-link').removeClass('active');
        $(`.nav-link[data-section="${sectionName}"]`).addClass('active');
    }
    
    showSuccess(message) {
        alert(message);
    }
    
    showError(message) {
        alert(message);
    }
}
