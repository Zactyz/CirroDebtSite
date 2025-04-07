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
 * Apple-style pin and reveal
 */
function initBenefitsScroll() {
    const benefitsSection = document.querySelector('.benefits-scroll');
    if (!benefitsSection) return;

    const benefitsPanels = document.querySelector('.benefit-panels');
    const benefitsHeader = document.querySelector('.benefits-header');
    const panels = document.querySelectorAll('.benefit-panel');
    const progressContainer = document.querySelector('.scroll-progress-container');
    const progressFill = document.querySelector('.scroll-progress-fill');
    const markers = document.querySelectorAll('.progress-marker');
    const continueBtn = document.querySelector('.benefits-continue');
    const parallaxBg = document.querySelector('.benefits-parallax-bg');
    
    // Exit if required elements don't exist
    if (!benefitsPanels || !panels.length) return;
    
    // Set up panels in replacement mode instead of stack mode
    benefitsPanels.classList.remove('stack-mode');
    benefitsPanels.classList.add('replace-mode');
    
    // Variables for dimensions that can change
    let sectionHeight = benefitsSection.offsetHeight;
    let viewportHeight = window.innerHeight;
    let sectionTop, sectionBottom;
    
    // Update section boundaries
    function updateBoundaries() {
        const rect = benefitsSection.getBoundingClientRect();
        sectionTop = window.scrollY + rect.top;
        sectionBottom = sectionTop + sectionHeight;
    }
    
    // Initialize boundaries
    updateBoundaries();
    
    // Constants for animation control
    const TOTAL_PANELS = panels.length;
    const PANEL_SEGMENT = 0.15; // Each panel occupies 15% of the scroll space
    
    // Set initial panel states
    panels.forEach((panel, index) => {
        panel.setAttribute('data-index', index);
    });
    
    // Update positions and visibility based on scroll
    function updatePanels() {
        const scrollTop = window.scrollY;
        const scrollBottom = scrollTop + viewportHeight;
        
        // Calculate normalized scroll progress (0 to 1)
        // Get the relative position within the section
        const relativeScrollPosition = scrollTop - (sectionTop - viewportHeight);
        const normalizedScrollPosition = relativeScrollPosition / (sectionHeight + viewportHeight);
        const scrollProgress = Math.max(0, Math.min(1, normalizedScrollPosition));
        
        // Determine if we're in the actual sticky phase (between 20% and 80% of scroll progress)
        const isInStickZone = scrollProgress > 0.2 && scrollProgress < 0.8;
        const isBeforeStickZone = scrollProgress <= 0.2;
        const isAfterStickZone = scrollProgress >= 0.8;
        
        // Handle scroll progress bar fill
        if (progressFill) {
            // Only show progress during the middle 60% of the scroll
            const progressFillAmount = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.6));
            progressFill.style.height = `${progressFillAmount * 100}%`;
        }
        
        // Show/hide progress container based on whether we're in the stick zone
        if (progressContainer) {
            progressContainer.style.opacity = isInStickZone ? '1' : '0';
            progressContainer.style.visibility = isInStickZone ? 'visible' : 'hidden';
        }
        
        // Show/hide parallax background based on whether we're in the stick zone
        if (parallaxBg) {
            parallaxBg.style.opacity = isInStickZone ? '1' : '0';
        }
        
        // Apply different behaviors based on scroll zone
        if (isBeforeStickZone) {
            // In the "scroll in" zone (first 20% of section)
            
            // Calculate how far we've scrolled into the entrance zone (0-1)
            const entranceProgress = scrollProgress / 0.2;
            
            // Handle section header during entrance
            if (benefitsHeader) {
                benefitsHeader.style.position = 'relative';
                benefitsHeader.style.transform = `translateY(${(1 - entranceProgress) * 50}px)`;
                benefitsHeader.style.opacity = entranceProgress;
            }
            
            // Remove sticky states as we're scrolling in naturally
            panels.forEach(panel => {
                panel.classList.remove('fixed', 'active');
                panel.style.opacity = 0;
            });
            
            // Set first panel to start appearing as we approach stick zone
            if (entranceProgress > 0.5 && panels[0]) {
                panels[0].classList.add('active');
                panels[0].style.opacity = (entranceProgress - 0.5) * 2;
                panels[0].style.transform = `translateY(${(1 - entranceProgress) * 30}px)`;
            }
            
        } else if (isInStickZone) {
            // In the "sticky" zone (middle 60% of section)
            
            // Calculate panel activation progress (0-1 within the middle 60%)
            const panelProgress = (scrollProgress - 0.2) / 0.6;
            
            // Header is fully visible and fixed
            if (benefitsHeader) {
                benefitsHeader.style.position = 'fixed';
                benefitsHeader.style.top = '0';
                benefitsHeader.style.transform = 'translateY(0)';
                benefitsHeader.style.opacity = '1';
            }
            
            // Since we're replacing panels, first reset all of them
            panels.forEach(panel => {
                panel.classList.remove('active', 'fixed');
                panel.style.opacity = 0;
                panel.style.transform = 'translateY(30px)';
            });
            
            // Determine which panel should be active based on panel progress
            const activeIndex = Math.min(
                Math.floor(panelProgress * TOTAL_PANELS), 
                TOTAL_PANELS - 1
            );
            
            // Calculate cross-fade between panels
            const panelSegmentSize = 1 / TOTAL_PANELS;
            const inSegmentProgress = (panelProgress - (activeIndex * panelSegmentSize)) / panelSegmentSize;
            
            // Show current panel
            if (panels[activeIndex]) {
                const currentPanel = panels[activeIndex];
                currentPanel.classList.add('active', 'fixed');
                currentPanel.style.opacity = 1;
                currentPanel.style.transform = 'translateY(0)';
            }
            
            // If we're transitioning to the next panel, start fading it in
            if (inSegmentProgress > 0.7 && activeIndex < TOTAL_PANELS - 1) {
                const nextPanel = panels[activeIndex + 1];
                if (nextPanel) {
                    const fadeInAmount = (inSegmentProgress - 0.7) / 0.3;
                    nextPanel.classList.add('active', 'fixed');
                    nextPanel.style.opacity = fadeInAmount;
                    nextPanel.style.transform = `translateY(${(1 - fadeInAmount) * 30}px)`;
                }
            }
            
            // Update marker states based on current progress
            markers.forEach((marker, index) => {
                marker.classList.remove('active', 'viewed');
                
                if (index <= activeIndex) {
                    marker.classList.add('viewed');
                }
                
                if (index === activeIndex) {
                    marker.classList.add('active');
                }
            });
            
        } else if (isAfterStickZone) {
            // In the "scroll out" zone (last 20% of section)
            
            // Calculate exit progress (0-1 in the exit zone)
            const exitProgress = (scrollProgress - 0.8) / 0.2;
            
            // Header starts scrolling out
            if (benefitsHeader) {
                benefitsHeader.style.position = 'relative';
                benefitsHeader.style.top = `${-50 * exitProgress}px`;
                benefitsHeader.style.opacity = Math.max(0, 1 - exitProgress * 1.5);
            }
            
            // Show only the last panel and have it scroll out naturally
            panels.forEach((panel, index) => {
                panel.classList.remove('fixed');
                
                if (index === TOTAL_PANELS - 1) {
                    // Last panel scrolls out
                    panel.classList.add('active');
                    panel.style.transform = `translateY(${-30 * exitProgress}px)`;
                    panel.style.opacity = Math.max(0, 1 - exitProgress * 1.5);
                } else {
                    // Hide all other panels
                    panel.classList.remove('active');
                    panel.style.opacity = 0;
                }
            });
        }
    }
    
    // Add click events to markers for jumping to sections
    markers.forEach((marker, index) => {
        marker.addEventListener('click', () => {
            // Calculate position in the scroll sequence based on panel index
            const panelProgress = (index / TOTAL_PANELS);
            // Convert to overall scroll progress (adding 0.2 for entrance and multiplying by 0.6 for middle section)
            const targetProgress = 0.2 + (panelProgress * 0.6);
            // Calculate the actual scroll position
            const targetPosition = sectionTop - viewportHeight + (targetProgress * (sectionHeight + viewportHeight));
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Initialize position on load
    updatePanels();
    
    // Update on scroll
    window.addEventListener('scroll', updatePanels);
    
    // Handle resize events
    window.addEventListener('resize', () => {
        // Recalculate dimensions
        sectionHeight = benefitsSection.offsetHeight;
        viewportHeight = window.innerHeight;
        updateBoundaries();
        
        // Update panel positions
        updatePanels();
    });
} 