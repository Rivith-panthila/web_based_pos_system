// POS System - Main Application JavaScript
// Simplified authentication and navigation

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const authController = new AuthController();

    // Make globally accessible for debugging
    window.authController = authController;
});
