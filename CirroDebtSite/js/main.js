// Main JavaScript for Cirro Debt website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTheme();
    initNavigation();
    initScrollReveal();
    initPricingToggle();
    initFaqAccordion();
    initHowItWorks();
    initBenefitsScroll();
});

// Theme Toggle Functionality
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const logoImage = document.getElementById('logo');
    const footerLogo = document.getElementById('footer-logo');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use device preference
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icons based on current theme
    updateThemeIcons(currentTheme);
    
    // Toggle theme when button is clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            updateThemeIcons(newTheme);
        });
    }
    
    // Update icons based on theme
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
}

// Navigation Functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Highlight active link based on scroll position
    window.addEventListener('scroll', updateActiveLink);
    
    function updateActiveLink() {
        // Only apply on homepage
        if (!document.querySelector('.hero')) return;
        
        const scrollPosition = window.scrollY + 200;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (sectionTop <= scrollPosition && sectionTop + sectionHeight > scrollPosition) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}` || 
                        (sectionId === 'features' && link.getAttribute('href') === '#')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after clicking
                    if (navToggle && navMenu) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                }
            });
        }
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const elements = document.querySelectorAll('.feature-card, .step, .dashboard-image, .pricing-card, .faq-accordion-item, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(element => {
        element.classList.add('reveal-element');
        observer.observe(element);
    });
    
    // Add required CSS if not already present
    const style = document.createElement('style');
    style.textContent = `
        .reveal-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
        .feature-card:nth-child(5) { transition-delay: 0.5s; }
        .pricing-card:nth-child(1) { transition-delay: 0.1s; }
        .pricing-card:nth-child(2) { transition-delay: 0.2s; }
        .pricing-card:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);
}

// Pricing Toggle
function initPricingToggle() {
    const billingToggle = document.getElementById('billingToggle');
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('annual-billing');
            } else {
                document.body.classList.remove('annual-billing');
            }
        });
    }
}

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-accordion-item');
    const faqNavBtns = document.querySelectorAll('.faq-nav-btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    // Initialize accordion items
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-accordion-header');
        const content = item.querySelector('.faq-accordion-content');
        
        if (header && content) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('.faq-accordion-content');
                    if (otherContent && otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherContent.style.height = '0';
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    content.style.height = '0';
                } else {
                    item.classList.add('active');
                    content.style.height = content.scrollHeight + 'px';
                }
            });
        }
    });
    
    // Initialize FAQ category navigation
    if (faqNavBtns.length && faqCategories.length) {
        faqNavBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-target');
                
                // Update active button
                faqNavBtns.forEach(otherBtn => {
                    otherBtn.classList.remove('active');
                });
                btn.classList.add('active');
                
                // Show target category
                faqCategories.forEach(category => {
                    category.classList.remove('active');
                    if (category.id === target) {
                        category.classList.add('active');
                    }
                });
            });
        });
    }
}

/**
 * Initialize How It Works section with scroll animations
 */
function initHowItWorks() {
    const stepsContainer = document.querySelector('.steps-container');
    
    // If How It Works section doesn't exist on this page, exit
    if (!stepsContainer) return;
    
    const steps = document.querySelectorAll('.step');
    
    // Create Intersection Observer
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add revealed class when step comes into view
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Optional: Stop observing after revealing
                // stepObserver.unobserve(entry.target);
            } else {
                // Optional: Remove class when out of view for reappearing effect
                // entry.target.classList.remove('revealed');
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% visible
        rootMargin: '-100px 0px' // trigger when 100px into viewport
    });
    
    // Observe each step
    steps.forEach(step => {
        stepObserver.observe(step);
    });
    
    // Add parallax effect to icons if user's device supports it
    if (window.matchMedia('(min-width: 992px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const stepIcons = document.querySelectorAll('.step-icon');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            stepIcons.forEach((icon, index) => {
                // Create different parallax speeds based on index
                const speed = index % 2 === 0 ? 0.05 : -0.05;
                const yPos = scrollY * speed;
                
                // Apply transformation
                icon.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

/**
 * Initialize Benefits Scrolling Experience with Pin-and-Reveal effect
 */
function initBenefitsScroll() {
    const benefitsSection = document.querySelector('.benefits-scroll');
    
    // If the benefits scroll section doesn't exist on this page, exit
    if (!benefitsSection) return;
    
    const benefitsContainer = document.querySelector('.benefits-scroll-container');
    const panels = document.querySelectorAll('.benefit-panel');
    const progressFill = document.querySelector('.scroll-progress-filled');
    const markers = document.querySelectorAll('.progress-marker');
    const continueButton = document.querySelector('.benefits-continue');
    const parallaxShapes = document.querySelectorAll('.benefits-shape, .benefits-parallax-bg .shape');
    
    // Calculate section dimensions
    const numPanels = panels.length;
    const windowHeight = window.innerHeight;
    
    // Set total scroll height (one screen height per panel plus one to exit)
    const totalScrollHeight = (numPanels + 1) * windowHeight;
    benefitsSection.style.height = `${totalScrollHeight}px`;
    
    // Update section based on scroll position
    function updateBenefitsSection() {
        const scrollTop = window.scrollY;
        const sectionTop = benefitsSection.offsetTop;
        const sectionBottom = sectionTop + benefitsSection.offsetHeight;
        const scrollPosition = scrollTop - sectionTop;
        
        // If we're not in the section, don't update
        if (scrollTop < sectionTop || scrollTop > sectionBottom) return;
        
        // Calculate which panel should be active based on scroll position
        // Each panel gets a full viewport height of scrolling space
        const progress = Math.min(numPanels, Math.max(0, scrollPosition / windowHeight));
        const activeIndex = Math.min(Math.floor(progress), numPanels - 1);
        
        // Update progress bar fill
        const progressPercent = (progress / numPanels) * 100;
        if (progressFill) {
            // For mobile, we need to handle horizontal progress
            const isHorizontal = window.innerWidth <= 991;
            if (isHorizontal) {
                progressFill.style.width = `${progressPercent}%`;
            } else {
                progressFill.style.height = `${progressPercent}%`;
            }
        }
        
        // Update section data attribute for CSS styling
        benefitsSection.setAttribute('data-progress', activeIndex);
        
        // Determine if we should stick or release the container
        if (progress < numPanels) {
            // Still revealing panels - stick the container
            benefitsContainer.style.position = 'sticky';
            benefitsContainer.style.top = '0';
        } else {
            // All panels revealed - release the container
            benefitsContainer.style.position = 'relative';
            benefitsContainer.style.top = `${numPanels * windowHeight}px`;
        }
        
        // Show/hide the continue button
        if (activeIndex === numPanels - 1 && progress > numPanels - 0.2) {
            continueButton.classList.add('visible');
        } else {
            continueButton.classList.remove('visible');
        }
        
        // Reveal panels one by one as we scroll
        panels.forEach((panel, index) => {
            // Remove all active states first
            panel.classList.remove('visible');
            
            // Make panels visible as we progress
            if (index <= activeIndex) {
                panel.classList.add('visible');
            }
        });
        
        // Animate parallax background elements
        if (parallaxShapes) {
            parallaxShapes.forEach((shape, index) => {
                const speed = 0.1 - (index * 0.02); // Different speeds for each shape
                const parallaxOffset = scrollPosition * speed;
                shape.style.transform = `translateY(${-parallaxOffset}px)`;
            });
        }
    }
    
    // Click event for markers - smooth scroll to panel
    markers.forEach(marker => {
        marker.addEventListener('click', () => {
            const markerNum = marker.getAttribute('data-marker');
            // Convert to zero-based index
            const targetIndex = parseInt(markerNum) - 1;
            // Calculate target scroll position
            const targetPosition = benefitsSection.offsetTop + (targetIndex * windowHeight);
            
            // Smooth scroll to panel
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Listen for scroll events to update the section
    window.addEventListener('scroll', updateBenefitsSection);
    
    // Listen for resize events to recalculate dimensions
    window.addEventListener('resize', () => {
        setTimeout(() => {
            // Update window height
            const newWindowHeight = window.innerHeight;
            // Update total scroll height
            const newTotalHeight = (numPanels + 1) * newWindowHeight;
            benefitsSection.style.height = `${newTotalHeight}px`;
            // Update the section
            updateBenefitsSection();
        }, 100);
    });
    
    // Initialize on page load
    setTimeout(updateBenefitsSection, 100);
} 