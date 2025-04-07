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
    const elements = document.querySelectorAll('.feature-card, .step, .dashboard-image, .pricing-card, .faq-accordion-item, .contact-card, .benefit-card');
    
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
        .benefit-card:nth-child(1) { transition-delay: 0.1s; }
        .benefit-card:nth-child(2) { transition-delay: 0.2s; }
        .benefit-card:nth-child(3) { transition-delay: 0.3s; }
        .benefit-card:nth-child(4) { transition-delay: 0.4s; }
        .benefit-card:nth-child(5) { transition-delay: 0.5s; }
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
    const processSteps = document.querySelectorAll('.process-step');
    const howItWorksSection = document.querySelector('.how-it-works');
    
    if (!howItWorksSection || processSteps.length === 0) return;
    
    // Set up intersection observer for steps reveal
    const stepsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Delay each step animation based on its position
                const step = entry.target;
                const stepNumber = step.getAttribute('data-step');
                const delay = parseInt(stepNumber) * 200;
                
                setTimeout(() => {
                    step.classList.add('revealed');
                }, delay);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe each process step
    processSteps.forEach(step => {
        stepsObserver.observe(step);
    });
    
    // Add hover effects to step cards
    processSteps.forEach(step => {
        const stepCard = step.querySelector('.step-card');
        const stepIndicator = step.querySelector('.step-indicator');
        
        if (stepCard && stepIndicator) {
            // Sync hover states between the card and indicator
            stepCard.addEventListener('mouseenter', () => {
                stepIndicator.classList.add('active');
            });
            
            stepCard.addEventListener('mouseleave', () => {
                stepIndicator.classList.remove('active');
            });
            
            // Add pulse animation to step number on hover
            const stepNumber = step.querySelector('.step-number');
            if (stepNumber) {
                stepCard.addEventListener('mouseenter', () => {
                    stepNumber.classList.add('pulse');
                });
                
                stepCard.addEventListener('mouseleave', () => {
                    stepNumber.classList.remove('pulse');
                });
            }
        }
    });
    
    // Add tracking for scroll progress on the timeline
    const timelineTrack = document.querySelector('.timeline-track');
    if (timelineTrack) {
        const progressFill = document.createElement('div');
        progressFill.classList.add('timeline-progress');
        timelineTrack.appendChild(progressFill);
        
        // Update timeline progress on scroll
        window.addEventListener('scroll', () => {
            const rect = howItWorksSection.getBoundingClientRect();
            const sectionHeight = howItWorksSection.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollPercentage = Math.max(0, Math.min(1, 
                (windowHeight - rect.top) / (sectionHeight + windowHeight - 200)
            ));
            
            progressFill.style.width = (scrollPercentage * 100) + '%';
        });
    }
    
    // Add CSS for dynamic elements
    const style = document.createElement('style');
    style.textContent = `
        .timeline-progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0;
            background: var(--primary-color);
            border-radius: 4px;
            transition: width 0.1s ease-out;
        }
        
        .step-indicator.active .step-number {
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255, 155, 14, 0.5);
        }
        
        .step-number.pulse {
            animation: step-pulse 1.5s infinite;
        }
        
        @keyframes step-pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(255, 155, 14, 0.5);
            }
            70% {
                box-shadow: 0 0 0 15px rgba(255, 155, 14, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(255, 155, 14, 0);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize Benefits Scrolling Experience
 * Apple-style pin and reveal
 */
function initBenefitsScroll() {
    // Check if benefits scroll section exists (it's commented out in the temporary version)
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
    
    // Set up panels in replacement mode
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
    
    // Reset all panels to initial state
    function resetPanels() {
        panels.forEach(panel => {
            panel.classList.remove('active', 'fixed');
            panel.style.transform = '';
            panel.style.opacity = '0';
        });
    }
    
    // Set initial panel states
    resetPanels();
    
    // Update positions and visibility based on scroll
    function updatePanels() {
        const scrollTop = window.scrollY;
        
        // Get the current section position relative to viewport
        const sectionRect = benefitsSection.getBoundingClientRect();
        
        // Calculate section top and bottom positions
        const sectionTopToViewportTop = sectionRect.top;
        const sectionBottomToViewportTop = sectionRect.bottom;
        
        // Calculate transition thresholds for smoother phase changes
        // We'll use these for gradual transitions between phases
        const enterThreshold = viewportHeight * 0.6; // When section is 60% into viewport from top
        const stickyThreshold = 0; // When section top reaches viewport top
        const exitThreshold = viewportHeight; // When section bottom reaches viewport bottom
        
        // Calculate normalized scroll progress (0 to 1) through the entire section
        const totalScrollDistance = sectionHeight + viewportHeight;
        const scrollProgress = Math.max(0, Math.min(1, 
            (scrollTop - (sectionTop - viewportHeight)) / totalScrollDistance
        ));
        
        // More granular phase detection with transition ranges
        const enteringPhaseProgress = Math.max(0, Math.min(1, 
            (enterThreshold - sectionTopToViewportTop) / enterThreshold
        ));
        
        const exitingPhaseProgress = Math.max(0, Math.min(1,
            (sectionBottomToViewportTop - (viewportHeight - 100)) / 100
        ));
        
        // Determine phase with improved detection
        let scrollPhase;
        if (sectionTopToViewportTop > enterThreshold) {
            scrollPhase = 'before'; // Section is mostly below viewport
        } else if (sectionTopToViewportTop > stickyThreshold) {
            scrollPhase = 'entering'; // Section is entering viewport
        } else if (sectionBottomToViewportTop > exitThreshold) {
            scrollPhase = 'sticky'; // Section is in sticky phase
        } else if (sectionBottomToViewportTop > 0) {
            scrollPhase = 'exiting'; // Section is exiting viewport
        } else {
            scrollPhase = 'after'; // Section is above viewport
        }
        
        // Handle smooth transitions for header and progress bar based on phase
        if (benefitsHeader) {
            if (scrollPhase === 'entering') {
                // Smooth transition from normal scroll to fixed
                const topPosition = Math.max(0, sectionTopToViewportTop * (1 - enteringPhaseProgress));
                benefitsHeader.style.position = 'relative';
                benefitsHeader.style.top = '0';
                benefitsHeader.style.transform = `translateY(${topPosition}px)`;
                benefitsHeader.style.opacity = Math.min(1, enteringPhaseProgress * 1.5);
            } else if (scrollPhase === 'sticky') {
                // Fully fixed in sticky phase
                benefitsHeader.style.position = 'fixed';
                benefitsHeader.style.top = '0';
                benefitsHeader.style.transform = 'none';
                benefitsHeader.style.opacity = '1';
            } else if (scrollPhase === 'exiting') {
                // Smooth transition from fixed to normal scroll
                benefitsHeader.style.position = 'relative';
                const headerOffset = sectionHeight - viewportHeight + (sectionTopToViewportTop);
                benefitsHeader.style.top = `${headerOffset}px`;
                benefitsHeader.style.transform = 'none';
                benefitsHeader.style.opacity = Math.max(0, 1 - exitingPhaseProgress);
            } else {
                // Hidden when out of view
                benefitsHeader.style.opacity = '0';
            }
        }
        
        // Handle progress container with smooth transitions
        if (progressContainer) {
            if (scrollPhase === 'entering') {
                // Progressively reveal and position progress bar during entrance
                progressContainer.style.position = 'absolute';
                progressContainer.style.top = `${50 + (1 - enteringPhaseProgress) * 25}%`;
                progressContainer.style.opacity = enteringPhaseProgress.toString();
                progressContainer.style.visibility = 'visible';
                progressContainer.style.transform = 'translateY(-50%)';
            } else if (scrollPhase === 'sticky') {
                // Fixed position during sticky phase
                progressContainer.style.position = 'fixed';
                progressContainer.style.top = '50%';
                progressContainer.style.opacity = '1';
                progressContainer.style.visibility = 'visible';
                progressContainer.style.transform = 'translateY(-50%)';
            } else if (scrollPhase === 'exiting') {
                // Smooth exit transition
                progressContainer.style.position = 'absolute';
                const progressOffset = sectionHeight - viewportHeight + (sectionTopToViewportTop);
                progressContainer.style.top = `${progressOffset + viewportHeight/2}px`;
                progressContainer.style.opacity = (1 - exitingPhaseProgress).toString();
                progressContainer.style.visibility = 'visible';
                progressContainer.style.transform = 'translateY(-50%)';
            } else {
                // Hidden when out of view
                progressContainer.style.opacity = '0';
                progressContainer.style.visibility = 'hidden';
            }
        }
        
        // Handle progress fill based on scroll phase
        if (progressFill) {
            if (scrollPhase === 'entering') {
                // Gradually start filling at beginning
                progressFill.style.height = `${enteringPhaseProgress * 15}%`;
            } else if (scrollPhase === 'sticky') {
                // Fill based on progress through panels
                const panelProgress = Math.min(TOTAL_PANELS - 1, Math.floor(scrollProgress * TOTAL_PANELS * 1.2)) / (TOTAL_PANELS - 1);
                progressFill.style.height = `${15 + panelProgress * 85}%`; // Start from 15% (where entering phase left off)
            } else if (scrollPhase === 'exiting') {
                // Keep full during exit
                progressFill.style.height = '100%';
            } else {
                // Reset when out of view
                progressFill.style.height = '0%';
            }
        }
        
        // Handle background parallax with smooth transitions
        if (parallaxBg) {
            if (scrollPhase === 'entering') {
                parallaxBg.style.opacity = enteringPhaseProgress.toString();
            } else if (scrollPhase === 'sticky') {
                parallaxBg.style.opacity = '1';
            } else if (scrollPhase === 'exiting') {
                parallaxBg.style.opacity = (1 - exitingPhaseProgress).toString();
            } else {
                parallaxBg.style.opacity = '0';
            }
        }
        
        // Handle panel visibility and position
        if (scrollPhase === 'sticky') {
            // Calculate which panel should be visible based on progress
            const activeIndex = Math.min(
                TOTAL_PANELS - 1,
                Math.floor(scrollProgress * TOTAL_PANELS * 1.2)
            );
            
            // Update all panels
            panels.forEach((panel, index) => {
                // Reset panel state
                panel.classList.remove('active', 'fixed');
                panel.style.opacity = '0';
                
                // Show active panel
                if (index === activeIndex) {
                    panel.classList.add('active', 'fixed');
                    panel.style.opacity = '1';
                    panel.style.transform = 'translateY(0)';
                }
            });
            
            // Update markers based on active panel
            markers.forEach((marker, index) => {
                marker.classList.remove('active', 'viewed');
                
                if (index <= activeIndex) {
                    marker.classList.add('viewed');
                }
                
                if (index === activeIndex) {
                    marker.classList.add('active');
                }
            });
        } else if (scrollPhase === 'entering') {
            // Smooth entrance for first panel
            const entranceProgress = enteringPhaseProgress;
            
            panels.forEach((panel, index) => {
                panel.classList.remove('active', 'fixed');
                panel.style.opacity = '0';
                
                if (index === 0) {
                    panel.classList.add('active');
                    panel.style.opacity = entranceProgress.toString();
                    panel.style.transform = `translateY(${(1 - entranceProgress) * 20}px)`;
                }
            });
            
            // Update first marker
            markers.forEach((marker, index) => {
                marker.classList.remove('active', 'viewed');
                
                if (index === 0 && entranceProgress > 0.5) {
                    marker.classList.add('active', 'viewed');
                }
            });
        } else if (scrollPhase === 'exiting') {
            // Smooth exit for last panel
            const exitProgress = exitingPhaseProgress;
            
            panels.forEach((panel, index) => {
                panel.classList.remove('fixed', 'active');
                panel.style.opacity = '0';
                
                if (index === TOTAL_PANELS - 1) {
                    panel.classList.add('active');
                    panel.style.opacity = (1 - exitProgress).toString();
                    panel.style.transform = 'translateY(0)';
                }
            });
            
            // Keep all markers viewed with last one active
            markers.forEach((marker, index) => {
                marker.classList.add('viewed');
                marker.classList.remove('active');
                
                if (index === TOTAL_PANELS - 1) {
                    marker.classList.add('active');
                }
            });
        } else {
            // When completely out of view, reset everything
            resetPanels();
            
            markers.forEach(marker => {
                marker.classList.remove('active', 'viewed');
            });
        }
    }
    
    // Add click events to markers for jumping to sections
    markers.forEach((marker, index) => {
        marker.addEventListener('click', () => {
            // Calculate position based on section and panel index
            const panelScrollPosition = sectionTop - viewportHeight * 0.5 + 
                ((index / TOTAL_PANELS) * sectionHeight * 0.7) + viewportHeight * 0.1;
            
            window.scrollTo({
                top: panelScrollPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Initialize position on load
    updatePanels();
    
    // Update on scroll with throttling for better performance
    let lastScrollTime = 0;
    window.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastScrollTime > 10) { // 10ms throttle
            lastScrollTime = now;
            requestAnimationFrame(updatePanels);
        }
    });
    
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