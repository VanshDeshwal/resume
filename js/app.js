// Application Initialization
class ResumeApp {
    constructor() {
        this.darkModeManager = null;
        this.pdfManager = null;
    }

    async init() {
        // Initialize dark mode first
        this.darkModeManager = new DarkModeManager();
        window.darkModeManager = this.darkModeManager; // Make globally accessible
        
        // Initialize PDF manager
        this.pdfManager = new PDFManager();
        
        // Show loading and start PDF loading
        this.pdfManager.showLoading();
        
        try {
            await this.pdfManager.loadPDF();
        } catch (error) {
            console.error('Failed to load PDF:', error);
            setTimeout(() => this.pdfManager.showFallback(), 2000);
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const app = new ResumeApp();
    app.init();
});
