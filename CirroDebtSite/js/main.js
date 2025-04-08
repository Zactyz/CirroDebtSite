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
    initParallaxElements();
    initHowItWorksCarousel();
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

// Add this function for improved parallax effects with better distribution
function initParallaxElements() {
    // Create fixed background elements with CSS transform for better performance
    initFixedBackgrounds();
    
    // Create evenly distributed floating elements
    addFloatingElements();
}

// Initialize fixed background parallax that won't be affected by scroll jank
function initFixedBackgrounds() {
    const sections = document.querySelectorAll('.hero, .benefits-static, .how-it-works, .features, .testimonials, .cta, .pricing');
    
    sections.forEach(section => {
        // Don't duplicate if already initialized
        if (section.hasAttribute('data-parallax-initialized')) return;
        
        // Mark as initialized
        section.setAttribute('data-parallax-initialized', 'true');
        
        // Add fixed position reference for parallax
        const parallaxRef = document.createElement('div');
        parallaxRef.className = 'parallax-reference';
        parallaxRef.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;';
        section.appendChild(parallaxRef);
    });
    
    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    function onScroll() {
        lastScrollY = window.scrollY;
        requestTick();
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    function updateParallax() {
        const elements = document.querySelectorAll('.wave-shape, .float-dollar, .float-dot, .float-cloud-dollar, .cloud');
        
        elements.forEach(element => {
            const section = element.closest('section');
            if (!section) return;
            
            const rect = section.getBoundingClientRect();
            const sectionVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (sectionVisible) {
                // Calculate how far element is from the center of the viewport
                const viewportMiddle = window.innerHeight / 2;
                const elementMiddle = rect.top + rect.height / 2;
                const distanceFromCenter = (elementMiddle - viewportMiddle) * 0.1;
                
                // Parallax effect based on element type
                if (element.classList.contains('wave-shape')) {
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    const speed = 0.15 * (index + 1);
                    element.style.transform = `translateY(${distanceFromCenter * speed}px) scaleY(${1 - Math.abs(distanceFromCenter) * 0.0003})`;
                } 
                else if (element.classList.contains('float-dollar')) {
                    element.style.transform = `translateY(${-distanceFromCenter * 0.2}px)`;
                }
                else if (element.classList.contains('float-dot')) {
                    element.style.transform = `translateY(${-distanceFromCenter * 0.3}px)`;
                }
                else if (element.classList.contains('float-cloud-dollar')) {
                    element.style.transform = `translateY(${-distanceFromCenter * 0.25}px)`;
                }
                else if (element.classList.contains('cloud')) {
                    element.style.transform = `translateX(${distanceFromCenter * 0.2}px)`;
                }
            }
        });
        
        ticking = false;
    }
    
    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial update
    updateParallax();
}

function addFloatingElements() {
    // Target all sections including footer
    const targetSections = document.querySelectorAll('.hero, .benefits-static, .how-it-works, .features, .testimonials, .cta, .pricing, footer');
    
    // Consistent config for all sections
    const sectionConfig = {
        dollars: 6,      // Reduced slightly
        dots: 10,       // Reduced slightly
        cloudDollars: 4, // Reduced slightly
        clouds: 3,       // Reduced slightly
        hasWaves: true     // Apply waves to ALL sections
    };
    
    // Predefined positions for better vertical distribution
    const dollarPositions = [
        { left: '8%', top: '12%' }, { right: '12%', top: '25%' },
        { left: '22%', top: '45%' }, { right: '28%', top: '55%' },
        { left: '15%', top: '75%' }, { right: '10%', top: '88%' }
    ];
    
    const dotPositions = [
        { left: '5%', top: '8%' }, { right: '8%', top: '18%' },
        { left: '18%', top: '35%' }, { right: '22%', top: '48%' },
        { left: '30%', top: '60%' }, { right: '35%', top: '72%' },
        { left: '12%', top: '85%' }, { right: '15%', top: '92%' },
        { left: '45%', top: '20%' }, { right: '40%', top: '80%' }
    ];
    
    const cloudDollarPositions = [
        { left: '10%', top: '20%' }, { right: '15%', top: '35%' },
        { left: '25%', top: '65%' }, { right: '30%', top: '80%' }
    ];

    const cloudPositions = [
        { left: '-200px', top: '15%', width: '200px', height: '100px', animationName: 'cloud-move-right', className: 'cloud-1' },
        { right: '-160px', top: '55%', width: '160px', height: '80px', animationName: 'cloud-move-left', className: 'cloud-2' },
        { left: '-140px', top: '80%', width: '140px', height: '70px', animationName: 'cloud-move-right', className: 'cloud-3' }
    ];
    
    targetSections.forEach(function(section) {
        // Clear existing elements if re-initializing (optional, for safety)
        const existingParallax = section.querySelector('.parallax-elements');
        if (existingParallax) existingParallax.remove();
        const existingClouds = section.querySelector('.cloud-container');
        if (existingClouds) existingClouds.remove();
        const existingWaves = section.querySelector('.wave-bg');
        if (existingWaves) existingWaves.remove();

        // --- Create containers --- 
        const parallaxElements = document.createElement('div');
        parallaxElements.className = 'parallax-elements';
        const slowLayer = document.createElement('div');
        slowLayer.className = 'parallax-layer parallax-slow';
        const mediumLayer = document.createElement('div');
        mediumLayer.className = 'parallax-layer parallax-medium';

        // --- Add Floating Elements --- 
        // Dollars
        for (let i = 0; i < sectionConfig.dollars; i++) {
            const dollar = document.createElement('div');
            dollar.className = `float-item float-dollar float-dollar-${i+1}`;
            dollar.innerHTML = '<i class="fas fa-dollar-sign"></i>';
            const pos = dollarPositions[i % dollarPositions.length];
            Object.assign(dollar.style, pos);
            dollar.style.animationDelay = `${(i * 1.8) % 11}s`; 
            slowLayer.appendChild(dollar);
        }

        // Cloud-Dollars
        for (let i = 0; i < sectionConfig.cloudDollars; i++) {
            const cloudDollar = document.createElement('div');
            cloudDollar.className = `float-item float-cloud-dollar float-cloud-dollar-${i+1}`;
            const pos = cloudDollarPositions[i % cloudDollarPositions.length];
             Object.assign(cloudDollar.style, pos);
            cloudDollar.style.animationDelay = `${(i * 2.5 + 1) % 16}s`;
            mediumLayer.appendChild(cloudDollar);
        }

        // Dots
        for (let i = 0; i < sectionConfig.dots; i++) {
            const dot = document.createElement('div');
            dot.className = `float-item float-dot float-dot-${i+1}`;
            const pos = dotPositions[i % dotPositions.length];
            Object.assign(dot.style, pos);
            dot.style.animationDelay = `${(i * 1.4) % 14}s`;
            const size = 5 + (i % 3) * 2;
            dot.style.width = `${size}px`;
            dot.style.height = `${size}px`;
            mediumLayer.appendChild(dot);
        }
        
        parallaxElements.appendChild(slowLayer);
        parallaxElements.appendChild(mediumLayer);
        section.appendChild(parallaxElements);

        // --- Add Moving Clouds --- 
        const cloudContainer = document.createElement('div');
        cloudContainer.className = 'cloud-container';
        for (let i = 0; i < sectionConfig.clouds; i++) {
            const cloud = document.createElement('div');
            const config = cloudPositions[i % cloudPositions.length];
            cloud.className = `cloud ${config.className}`;
            Object.keys(config).forEach(key => {
                if (key !== 'className' && key !== 'animationName') {
                    cloud.style[key] = config[key];
                }
            });
            const speedMultiplier = 1 + (i % 2) * 0.3;
            const baseSpeed = config.animationName === 'cloud-move-right' ? 
                              'var(--cloud-speed-slow)' : 'var(--cloud-speed-medium)';
            cloud.style.animationDuration = `calc(${baseSpeed} * ${speedMultiplier})`;
            cloudContainer.appendChild(cloud);
        }
        section.appendChild(cloudContainer);

        // --- Add Wave Background (if applicable) --- 
        if (sectionConfig.hasWaves) {
            const waveBg = document.createElement('div');
            waveBg.className = 'wave-bg';
            waveBg.innerHTML = `
                <div class="wave-gradient"></div>
                <div class="wave-shape wave-shape-1"></div>
                <div class="wave-shape wave-shape-2"></div>
                <div class="wave-shape wave-shape-3"></div>
                <div class="bg-pattern bg-dots"></div>
            `;
            section.insertBefore(waveBg, section.firstChild);
        }
        
        // Convert cards
        convertToCloudCards(section);
    });
}

// Apply cloud-card styling to existing cards
function convertToCloudCards(section) {
    // Find any card elements in the section
    const cards = section.querySelectorAll('.feature-card, .benefit-card, .pricing-card, .testimonial, .faq-accordion-item');
    
    cards.forEach(card => {
        if (!card.classList.contains('cloud-card')) {
            card.classList.add('cloud-card');
        }
    });
}

// Initialize carousel for How It Works section
function initHowItWorksCarousel() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.carousel-card');
    const prevBtn = carousel.querySelector('.carousel-nav.prev');
    const nextBtn = carousel.querySelector('.carousel-nav.next');
    const indicators = carousel.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    
    // Function to update carousel
    function updateCarousel(newIndex) {
        // Validate index
        if (newIndex < 0) newIndex = cards.length - 1;
        if (newIndex >= cards.length) newIndex = 0;
        
        const prevIndex = currentIndex;
        currentIndex = newIndex;
        
        // Update card classes
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev');
            
            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === prevIndex) {
                card.classList.add('prev');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Event listeners for navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            updateCarousel(currentIndex - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            updateCarousel(currentIndex + 1);
        });
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateCarousel(index);
        });
    });
    
    // Auto-advance carousel every 5 seconds
    let autoplayInterval;
    
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 5000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Start autoplay by default
    startAutoplay();
    
    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - show next
            updateCarousel(currentIndex + 1);
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right - show previous
            updateCarousel(currentIndex - 1);
        }
    }
    
    // Initialize carousel with first card active
    updateCarousel(0);
} 