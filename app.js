// POS System - Main Application JavaScript
// Model and View are now in separate folders

// Initialize application when DOM is ready
$(document).ready(function() {
    const mainController = new MainController();
    
    // Make globally accessible for debugging
    window.POSModel = POSModel;
    window.POSView = POSView;
    window.mainController = mainController;
});
