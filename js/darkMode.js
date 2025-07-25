// Dark Mode Functionality
class DarkModeManager {
    constructor() {
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.init();
    }

    init() {
        this.initializeDarkMode();
        this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        this.updateIcon(isDark);
    }

    updateIcon(isDark) {
        const icon = this.darkModeToggle.querySelector('svg');
        if (isDark) {
            icon.innerHTML = '<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>';
        } else {
            icon.innerHTML = '<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>';
        }
    }

    initializeDarkMode() {
        const savedTheme = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Check for URL parameter (for portfolio integration)
        const urlParams = new URLSearchParams(window.location.search);
        const themeParam = urlParams.get('theme');
        
        let shouldBeDark = false;
        if (themeParam) {
            shouldBeDark = themeParam === 'dark';
        } else if (savedTheme !== null) {
            shouldBeDark = savedTheme === 'true';
        } else {
            shouldBeDark = prefersDark;
        }

        if (shouldBeDark) {
            document.body.classList.add('dark-mode');
            this.updateIcon(true);
        }
    }
}

// Listen for theme changes from parent window (for portfolio integration)
window.addEventListener('message', function(event) {
    if (event.data.type === 'set-theme') {
        const isDark = event.data.theme === 'dark';
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        // Update the toggle button
        const darkModeManager = window.darkModeManager;
        if (darkModeManager) {
            darkModeManager.updateIcon(isDark);
        }
    }
});
