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
 * Initialize Benefits Scrolling Experience
 */
function initBenefitsScroll() {
    const benefitsSection = document.querySelector('.benefits-scroll');
    
    // If the benefits scroll section doesn't exist on this page, exit
    if (!benefitsSection) return;
    
    const panels = document.querySelectorAll('.benefit-panel');
    const markers = document.querySelectorAll('.progress-marker');
    const continueButton = document.querySelector('.benefits-continue');
    const parallaxBg = document.querySelector('.benefits-parallax-bg');
    const parallaxShapes = document.querySelectorAll('.benefits-shape, .benefits-parallax-bg .shape');
    
    // Set initial state
    if (panels.length > 0) {
        panels[0].classList.add('active');
    }
    if (markers.length > 0) {
        markers[0].classList.add('active');
    }
    
    // Variables for tracking scroll state
    let lastScrollTop = 0;
    let isScrolling = false;
    let targetScrollSpeed = 0.3; // Lower means slower scrolling
    let currentScrollSpeed = 1;
    let inBenefitsSection = false;
    
    // Create a simulated progress bar since we don't have access to the pseudo-element in JS
    const progressBarContainer = document.querySelector('.scroll-progress-bar');
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: var(--primary-color);
        border-radius: 4px;
        transition: height 0.3s ease;
        height: 0%;
        z-index: 2;
    `;
    if (progressBarContainer) {
        progressBarContainer.appendChild(progressBar);
    }
    
    // Smoothly ease between values (for scroll speed)
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    // Check if section is in viewport
    function isSectionInView() {
        const rect = benefitsSection.getBoundingClientRect();
        return (
            rect.top <= 0 &&
            rect.bottom >= window.innerHeight * 0.5
        );
    }
    
    // Make the section "sticky" when it's in view
    const benefitsSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            inBenefitsSection = entry.isIntersecting;
            
            if (entry.isIntersecting) {
                // Add scroll event listeners when in view
                window.addEventListener('wheel', handleWheelScroll, { passive: false });
                window.addEventListener('touchstart', handleTouchStart, { passive: true });
                window.addEventListener('touchmove', handleTouchMove, { passive: false });
            } else {
                // Remove event listeners when out of view
                window.removeEventListener('wheel', handleWheelScroll);
                window.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchmove', handleTouchMove);
            }
        });
    }, {
        threshold: 0.1
    });
    
    benefitsSectionObserver.observe(benefitsSection);
    
    // Wheel scrolling control
    function handleWheelScroll(e) {
        if (inBenefitsSection && isSectionInView()) {
            e.preventDefault();
            
            // Apply the current scroll speed (will be updated in animation loop)
            const delta = e.deltaY * currentScrollSpeed;
            window.scrollBy(0, delta);
            
            // Set flag to indicate active scrolling
            isScrolling = true;
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 150);
        }
    }
    
    // Touch controls for mobile
    let touchStartY = 0;
    
    function handleTouchStart(e) {
        if (inBenefitsSection) {
            touchStartY = e.touches[0].clientY;
        }
    }
    
    function handleTouchMove(e) {
        if (inBenefitsSection && isSectionInView()) {
            const touchY = e.touches[0].clientY;
            const diff = touchStartY - touchY;
            
            if (Math.abs(diff) > 5) {
                e.preventDefault();
                
                // Apply the current scroll speed (will be updated in animation loop)
                const delta = diff * currentScrollSpeed * 0.5;
                window.scrollBy(0, delta);
                touchStartY = touchY;
                
                // Set flag to indicate active scrolling
                isScrolling = true;
                clearTimeout(window.scrollTimeout);
                window.scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 150);
            }
        }
    }
    
    // Animation loop for smooth scroll speed transitions and parallax
    function animateScroll() {
        // Smoothly transition between normal and slow scrolling
        if (inBenefitsSection && isSectionInView()) {
            currentScrollSpeed = lerp(currentScrollSpeed, targetScrollSpeed, 0.1);
        } else {
            currentScrollSpeed = lerp(currentScrollSpeed, 1, 0.1);
        }
        
        // Only update if we're in the benefits section
        if (inBenefitsSection) {
            updateActivePanelAndProgress();
            animateParallaxElements();
        }
        
        requestAnimationFrame(animateScroll);
    }
    
    // Start animation loop
    animateScroll();
    
    // Animate parallax background elements
    function animateParallaxElements() {
        if (!parallaxBg) return;
        
        const scrollPosition = window.scrollY;
        const sectionTop = benefitsSection.offsetTop;
        const sectionHeight = benefitsSection.offsetHeight;
        const relativeScroll = scrollPosition - sectionTop;
        const scrollPercentage = relativeScroll / sectionHeight;
        
        // Move the entire background container for a parallax effect
        parallaxBg.style.transform = `translateY(${relativeScroll * 0.15}px)`;
        
        // Move individual shapes at different rates
        if (parallaxShapes) {
            parallaxShapes.forEach((shape, index) => {
                const speed = 0.1 - (index * 0.02); // Different speeds for each shape
                shape.style.transform = `translateY(${-relativeScroll * speed}px)`;
            });
        }
    }
    
    // Update active panel and progress bar based on scroll position
    function updateActivePanelAndProgress() {
        const scrollPosition = window.scrollY;
        const sectionTop = benefitsSection.offsetTop;
        const sectionHeight = benefitsSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Calculate progress through the section (0 to 1)
        const relativeScroll = scrollPosition - sectionTop;
        const scrollableDistance = sectionHeight - viewportHeight;
        const scrollProgress = Math.min(1, Math.max(0, relativeScroll / scrollableDistance));
        
        // Update progress bar
        if (progressBar) {
            progressBar.style.height = `${scrollProgress * 100}%`;
        }
        
        // Determine which panel is active based on scroll percentage
        const panelHeight = viewportHeight; // Each panel is viewport height
        const totalPanelScrollDistance = sectionHeight - viewportHeight;
        const panelProgress = scrollProgress * panels.length;
        const activePanelIndex = Math.min(
            Math.floor(panelProgress),
            panels.length - 1
        );
        
        // Update panel visibility with animation classes
        panels.forEach((panel, index) => {
            // Remove all state classes first
            panel.classList.remove('active', 'exit');
            
            // Active panel
            if (index === activePanelIndex) {
                panel.classList.add('active');
            }
            // Panel that's about to exit (for transition effects)
            else if (index === activePanelIndex - 1) {
                panel.classList.add('exit');
            }
        });
        
        // Update markers
        markers.forEach((marker, index) => {
            marker.classList.remove('active', 'viewed');
            
            if (index < activePanelIndex) {
                marker.classList.add('viewed');
            } else if (index === activePanelIndex) {
                marker.classList.add('active');
            }
        });
        
        // Show the continue button when nearing the end
        if (scrollProgress > 0.85 && continueButton) {
            continueButton.classList.add('visible');
        } else if (continueButton) {
            continueButton.classList.remove('visible');
        }
    }
    
    // Click event for markers - smooth scroll to panel
    markers.forEach(marker => {
        marker.addEventListener('click', () => {
            const markerNum = marker.getAttribute('data-marker');
            const targetPanel = document.getElementById(`benefit-${markerNum}`);
            
            if (targetPanel) {
                const panelIndex = parseInt(markerNum) - 1;
                const panelHeight = window.innerHeight;
                const offsetTop = benefitsSection.offsetTop + (panelIndex * panelHeight);
                
                // Smooth scroll to panel
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update on page load and resize
    window.addEventListener('resize', () => {
        setTimeout(updateActivePanelAndProgress, 100);
    });
    
    setTimeout(updateActivePanelAndProgress, 100);
} 