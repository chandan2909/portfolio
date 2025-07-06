// Portfolio Website JavaScript
// Modern ES6+ implementation with performance optimizations

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ==============================================
    // 1. SMOOTH SCROLLING FOR NAVIGATION
    // ==============================================
    
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            });
        });
    }

    // ==============================================
    // 2. NAVBAR SCROLL EFFECTS
    // ==============================================
    
    function initNavbarScrollEffects() {
        const navbar = document.querySelector('nav');
        let lastScrollY = window.scrollY;
        
        function updateNavbar() {
            const currentScrollY = window.scrollY;
            
            if (navbar) {
                // Add scrolled class for styling
                if (currentScrollY > 50) {
                    navbar.classList.add('nav-scrolled');
                } else {
                    navbar.classList.remove('nav-scrolled');
                }
                
                // Hide/show navbar on scroll (optional)
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollY = currentScrollY;
        }
        
        // Throttle scroll events for performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
                setTimeout(() => { ticking = false; }, 10);
            }
        });
    }

    // ==============================================
    // 3. MOBILE MENU FUNCTIONALITY
    // ==============================================
    
    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', toggleMobileMenu);
            
            // Close menu when clicking overlay
            if (menuOverlay) {
                menuOverlay.addEventListener('click', closeMobileMenu);
            }
            
            // Close menu when clicking menu links
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
        }
    }
    
    function toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        const body = document.body;
        
        if (mobileMenu) {
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                mobileMenu.classList.add('active');
                if (menuOverlay) menuOverlay.classList.add('active');
                body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        }
    }
    
    function closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        const body = document.body;
        
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            body.style.overflow = ''; // Restore scrolling
        }
    }

    // ==============================================
    // 4. ACTIVE SECTION HIGHLIGHTING
    // ==============================================
    
    function initActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        function updateActiveSection() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        // Throttle scroll events
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateActiveSection);
                ticking = true;
                setTimeout(() => { ticking = false; }, 10);
            }
        });
        
        // Initial call
        updateActiveSection();
    }

    // ==============================================
    // 5. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    // ==============================================
    
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .enhanced-card, article');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        
                        // Add staggered animation for cards
                        if (entry.target.matches('article')) {
                            const delay = Array.from(entry.target.parentNode.children)
                                .indexOf(entry.target) * 100;
                            entry.target.style.animationDelay = `${delay}ms`;
                        }
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(el => observer.observe(el));
        }
    }

    // ==============================================
    // 6. TYPING ANIMATION
    // ==============================================
    
    function initTypingAnimation() {
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.speed) || 100;
            
            element.textContent = '';
            element.style.visibility = 'visible';
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            }
            
            // Start typing animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    // ==============================================
    // 7. SKILL PROGRESS BARS ANIMATION
    // ==============================================
    
    function initSkillBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const progress = bar.dataset.progress || '0';
                    
                    // Animate progress bar
                    setTimeout(() => {
                        bar.style.width = `${progress}%`;
                        
                        // Add percentage text if needed
                        const percentText = bar.querySelector('.progress-text');
                        if (percentText) {
                            animateNumber(percentText, 0, parseInt(progress), 1000);
                        }
                    }, 200);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        progressBars.forEach(bar => observer.observe(bar));
    }

    // ==============================================
    // 8. NUMBER COUNTER ANIMATION
    // ==============================================
    
    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current + (element.dataset.suffix || '');
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    function initNumberCounters() {
        const counters = document.querySelectorAll('.counter-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target) || 0;
                    
                    animateNumber(counter, 0, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // ==============================================
    // 9. FORM HANDLING (Contact Form)
    // ==============================================
    
    function initFormHandling() {
        const contactForm = document.querySelector('#contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
            
            // Add real-time validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', validateField);
                input.addEventListener('input', clearFieldError);
            });
        }
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Validate form
        if (!validateForm(form)) {
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            showNotification('Message sent successfully! Thank you for reaching out.', 'success');
            form.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let message = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        }
        
        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
        }
        
        showFieldError(field, isValid ? '' : message);
        return isValid;
    }
    
    function clearFieldError(e) {
        showFieldError(e.target, '');
    }
    
    function showFieldError(field, message) {
        const errorElement = field.parentNode.querySelector('.field-error');
        
        if (message) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = message;
            } else {
                const error = document.createElement('span');
                error.className = 'field-error text-red-400 text-sm mt-1';
                error.textContent = message;
                field.parentNode.appendChild(error);
            }
        } else {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.remove();
            }
        }
    }

    // ==============================================
    // 10. NOTIFICATION SYSTEM
    // ==============================================
    
    function showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} fixed top-4 right-4 bg-gray-800 border border-gray-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <span class="flex-1">${message}</span>
                <button class="ml-4 text-gray-400 hover:text-white" onclick="this.parentElement.parentElement.remove()">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"/>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }

    // ==============================================
    // 11. DARK MODE TOGGLE (Optional)
    // ==============================================
    
    function initDarkModeToggle() {
        const toggleButton = document.querySelector('#dark-mode-toggle');
        
        if (toggleButton) {
            // Check for saved preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                document.documentElement.setAttribute('data-theme', savedTheme);
            }
            
            toggleButton.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    }

    // ==============================================
    // 12. PERFORMANCE OPTIMIZATIONS
    // ==============================================
    
    function initPerformanceOptimizations() {
        // Lazy load images
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        } else {
            // Fallback for browsers that don't support loading="lazy"
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Preload critical resources
        const criticalResources = [
            // Add critical CSS/JS files here
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    }

    // ==============================================
    // 13. INITIALIZE ALL FUNCTIONALITY
    // ==============================================
    
    function init() {
        try {
            initSmoothScrolling();
            initNavbarScrollEffects();
            initMobileMenu();
            initActiveSection();
            initScrollAnimations();
            initTypingAnimation();
            initSkillBars();
            initNumberCounters();
            initFormHandling();
            initDarkModeToggle();
            initPerformanceOptimizations();
            
            // Add loaded class to body for CSS animations
            document.body.classList.add('js-loaded');
            
            console.log('Portfolio JavaScript initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio JavaScript:', error);
        }
    }
    
    // Initialize everything
    init();
    
    // ==============================================
    // 14. UTILITY FUNCTIONS
    // ==============================================
    
    // Throttle function for performance
    window.throttle = function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };
    
    // Debounce function for performance
    window.debounce = function(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
    
    // Expose useful functions globally
    window.portfolioJS = {
        showNotification,
        closeMobileMenu,
        animateNumber
    };
});

// ==============================================
// 15. CSS ANIMATIONS SUPPORT
// ==============================================

// Add CSS for animations if not already present
const animationCSS = `
<style id="portfolio-animations">
/* Scroll animations */
.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Card animations */
article {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Progress bar animation */
.progress-bar {
    width: 0%;
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Notification animations */
.notification {
    animation: slideInRight 0.3s ease-out;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Form field error state */
.error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

.field-error {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #ef4444;
}

/* Mobile menu styles */
.mobile-menu {
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
}

.mobile-menu.active {
    transform: translateX(0);
}

.menu-overlay {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
}

.menu-overlay.active {
    opacity: 1;
    visibility: visible;
}

/* Navbar scroll effects */
nav {
    transition: all 0.3s ease-in-out;
}

.nav-scrolled {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

/* Loading states */
button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Typewriter effect */
.typewriter-text {
    visibility: hidden;
}

.typewriter-text::after {
    content: '|';
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}
</style>
`;

// Inject animation CSS if not already present
if (!document.getElementById('portfolio-animations')) {
    document.head.insertAdjacentHTML('beforeend', animationCSS);
}
