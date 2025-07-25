# Portfolio Integration Guide

This resume site is designed to be easily integrated into your main portfolio at `vanshdeshwal.dev`. Here are the options for integration:

## Option 1: Direct Link (Simplest)
Add a navigation link in your portfolio that opens the resume in a new tab:
```html
<a href="https://resume.vanshdeshwal.dev" target="_blank">Resume</a>
```

## Option 2: Iframe Integration (Embedded)
Embed the resume directly in your portfolio:
```html
<iframe 
  src="https://resume.vanshdeshwal.dev" 
  width="100%" 
  height="100vh" 
  frameborder="0"
  title="Vansh Deshwal Resume">
</iframe>
```

## Option 3: Modal/Overlay Integration
Open the resume in a modal or overlay on your portfolio site:
```javascript
// Example with a modal
function openResumeModal() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8); z-index: 9999; display: flex;
    justify-content: center; align-items: center;
  `;
  
  modal.innerHTML = `
    <div style="width: 90%; height: 90%; position: relative;">
      <button onclick="this.closest('div').remove()" 
              style="position: absolute; top: 10px; right: 10px; z-index: 10000;">
        Close
      </button>
      <iframe src="https://resume.vanshdeshwal.dev" 
              width="100%" height="100%" frameborder="0">
      </iframe>
    </div>
  `;
  
  document.body.appendChild(modal);
}
```

## Theme Synchronization

The resume supports theme synchronization with your portfolio:

### URL Parameter Method
```javascript
// Open resume with specific theme
const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
window.open(`https://resume.vanshdeshwal.dev?theme=${theme}`, '_blank');
```

### PostMessage API (for iframe)
```javascript
// Send theme to iframe
const iframe = document.querySelector('iframe');
iframe.onload = function() {
  iframe.contentWindow.postMessage({
    type: 'set-theme',
    theme: 'dark' // or 'light'
  }, '*');
};

// Listen for theme changes from resume
window.addEventListener('message', function(event) {
  if (event.data.type === 'resume-theme-change') {
    console.log('Resume theme changed to:', event.data.theme);
    // Update your portfolio theme accordingly
  }
});
```

## Features Available for Integration

1. **Responsive Design**: Works seamlessly in any container size
2. **Dark/Light Mode**: Automatic theme detection and synchronization
3. **No Header**: Clean integration without redundant branding
4. **Download Functionality**: Users can still download the PDF
5. **Mobile Optimized**: Works perfectly on all devices

## Recommended Implementation

For your portfolio navbar, I recommend:

1. **Desktop**: Use a dropdown or modal approach for better UX
2. **Mobile**: Direct link to new tab for better mobile experience
3. **Theme Sync**: Automatically match your portfolio's theme

Example navbar implementation:
```html
<nav>
  <a href="#about">About</a>
  <a href="#projects">Projects</a>
  <a href="#contact">Contact</a>
  <a href="https://resume.vanshdeshwal.dev" 
     target="_blank" 
     class="resume-link">Resume</a>
</nav>
```

## SEO Considerations

- The resume site has proper meta tags and title
- It's hosted on a separate subdomain for clean organization
- Direct links are SEO-friendly and shareable
- The PDF is directly accessible for scrapers/crawlers

## Future Enhancements

If you want more advanced integration, consider:
- Adding breadcrumbs that link back to your portfolio
- Custom styling via URL parameters
- Analytics tracking for resume views
- A/B testing different resume versions
