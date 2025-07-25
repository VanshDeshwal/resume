// PDF Rendering and Management
class PDFManager {
    constructor() {
        this.loading = document.getElementById('loading');
        this.pdfContainer = document.getElementById('pdfContainer');
        this.fallback = document.getElementById('pdfFallback');
        this.resizeTimeout = null;
        
        this.init();
    }

    init() {
        // Set up PDF.js worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        
        // Set up resize handler
        window.addEventListener('resize', () => this.handleResize());
    }

    showLoading() {
        this.loading.style.display = 'flex';
        this.pdfContainer.style.display = 'none';
        this.fallback.style.display = 'none';
    }

    showPDF() {
        this.loading.style.display = 'none';
        this.pdfContainer.style.display = 'block';
        this.fallback.style.display = 'none';
    }

    showFallback() {
        this.loading.style.display = 'none';
        this.pdfContainer.style.display = 'none';
        this.fallback.style.display = 'block';
    }

    async loadPDF() {
        try {
            const pdf = await pdfjsLib.getDocument('VanshDeshwal_Resume.pdf').promise;
            
            // Clear container
            this.pdfContainer.innerHTML = '';
            
            // Render each page with high quality
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                await this.renderPage(pdf, pageNum);
            }
            
            this.showPDF();
        } catch (error) {
            console.error('Error loading PDF:', error);
            this.showFallback();
        }
    }

    async renderPage(pdf, pageNum) {
        const page = await pdf.getPage(pageNum);
        
        // Create page container
        const pageContainer = document.createElement('div');
        pageContainer.style.position = 'relative';
        pageContainer.style.display = 'inline-block';
        
        // Calculate scales
        const devicePixelRatio = window.devicePixelRatio || 1;
        const containerWidth = Math.min(window.innerWidth - 40, 800);
        const viewport = page.getViewport({ scale: 1 });
        const baseScale = containerWidth / viewport.width;
        
        // Render canvas
        const canvas = await this.renderCanvas(page, baseScale, devicePixelRatio);
        pageContainer.appendChild(canvas);
        
        // Disable all interactions - no text layer or annotations
        pageContainer.style.pointerEvents = 'none';
        
        this.pdfContainer.appendChild(pageContainer);
    }

    async renderCanvas(page, baseScale, devicePixelRatio) {
        // Use higher scale for rendering (2x for quality)
        const renderScale = baseScale * devicePixelRatio * 2;
        const renderViewport = page.getViewport({ scale: renderScale });
        
        // Create canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // Set actual size for high DPI
        canvas.height = renderViewport.height;
        canvas.width = renderViewport.width;
        
        // Set display size
        canvas.style.width = (renderViewport.width / (devicePixelRatio * 2)) + 'px';
        canvas.style.height = (renderViewport.height / (devicePixelRatio * 2)) + 'px';
        canvas.className = 'pdf-page';
        
        // Render
        const renderContext = {
            canvasContext: context,
            viewport: renderViewport
        };
        
        await page.render(renderContext).promise;
        return canvas;
    }

    handleResize() {
        clearTimeout(this.resizeTimeout);
        if (this.pdfContainer.style.display === 'block') {
            this.resizeTimeout = setTimeout(() => {
                const currentWidth = window.innerWidth;
                const lastWidth = window.lastWidth || currentWidth;
                
                if (Math.abs(currentWidth - lastWidth) > 100) {
                    window.lastWidth = currentWidth;
                    this.loadPDF();
                }
            }, 500);
        }
    }
}
