/**
 * Component loading system for Cirro Debt Website
 * This script handles the loading of reusable components like header and footer
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load all components
    loadComponents();
    
    // Initialize header functionality once loaded
    setTimeout(initializeHeader, 100);
});

/**
 * Load all components with data-component attribute
 */
function loadComponents() {
    // Get current page ID from body or filename
    const currentPage = document.body.id || window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    // Set base path for GitHub Pages if applicable
    const basePath = window.location.hostname.includes('github.io') ? 
        '/' + window.location.pathname.split('/')[1] : '';
    
    // Load all components
    const componentElements = document.querySelectorAll('[data-component]');
    
    componentElements.forEach(element => {
        const componentName = element.getAttribute('data-component');
        
        // Fetch the component HTML
        fetch(`${basePath}/${componentName}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${componentName}.html`);
                }
                return response.text();
            })
            .then(html => {
                // Insert the component HTML
                element.innerHTML = html;
                
                // If header component, mark current page as active
                if (componentName === 'header') {
                    markActiveNavLink(currentPage);
                }
            })
            .catch(error => {
                console.error('Component loading error:', error);
                element.innerHTML = `<div class="component-error">Failed to load ${componentName} component</div>`;
            });
    });
}

/**
 * Mark the appropriate navigation link as active
 */
function markActiveNavLink(currentPage) {
    // Handle delayed marking of active nav items
    setTimeout(() => {
        // Mark links with data-page attribute
        const navLinks = document.querySelectorAll('.nav-link[data-page]');
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('active');
            }
        });
        
        // Handle hash-based links for home page sections
        if (currentPage === 'index' && window.location.hash) {
            const hash = window.location.hash.substring(1);
            const sectionLink = document.querySelector(`.nav-link[href="index.html#${hash}"]`);
            if (sectionLink) {
                // Remove active from home link and add to section link
                document.querySelector('.nav-link[data-page="index"]')?.classList.remove('active');
                sectionLink.classList.add('active');
            }
        }
    }, 100);
}

/**
 * Initialize header functionality after it's loaded
 */
function initializeHeader() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Initialize theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const logoImage = document.getElementById('logo');
    const footerLogo = document.getElementById('footer-logo');
    
    if (themeToggle) {
        // Check for saved theme preference or use device preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
        
        // Apply the theme and update icons
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcons(currentTheme);
        
        // Add event listener for theme toggle
        themeToggle.addEventListener('click', function() {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            updateThemeIcons(newTheme);
        });
    }
    
    // Helper function to update theme icons
    function updateThemeIcons(theme) {
        if (!themeIcon) return;
        
        if (theme === 'dark') {
            themeIcon.innerHTML = '<i class="fas fa-sun"></i>';
            if (logoImage) logoImage.src = 'images/logo-dark.png';
            if (footerLogo) footerLogo.src = 'images/logo-dark.png';
        } else {
            themeIcon.innerHTML = '<i class="fas fa-moon"></i>';
            if (logoImage) logoImage.src = 'images/logo-light.png';
            if (footerLogo) footerLogo.src = 'images/logo-light.png';
        }
    }
    
    // Add scroll event to handle header styling
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // Trigger scroll event on page load
    window.dispatchEvent(new Event('scroll'));
} 