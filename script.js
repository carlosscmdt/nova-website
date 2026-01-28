// ================================
// Nova - AI Store Builder
// Opus.pro Inspired Interactions
// ================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initShowcaseTabs();
    initFeatureNav();
    initFAQ();
    initPricingToggle();
    initStatsCounter();
    initScrollAnimations();
    initInputEffects();
    initParallax();
    initSmoothScroll();
});

// ================================
// Navbar
// ================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
}

// ================================
// Mobile Menu
// ================================
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const links = document.querySelectorAll('.mobile-menu a');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ================================
// Showcase Tabs (Demo Screens)
// ================================
function initShowcaseTabs() {
    const tabs = document.querySelectorAll('.showcase-tab');
    const screens = document.querySelectorAll('.demo-screen');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetScreen = tab.dataset.tab;

            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update screens with animation
            screens.forEach(screen => {
                if (screen.dataset.screen === targetScreen) {
                    screen.classList.add('active');
                } else {
                    screen.classList.remove('active');
                }
            });
        });
    });

    // Auto-rotate tabs
    let currentTab = 0;
    setInterval(() => {
        if (document.hidden) return;

        currentTab = (currentTab + 1) % tabs.length;
        tabs[currentTab].click();
    }, 5000);
}

// ================================
// Feature Navigation
// ================================
function initFeatureNav() {
    const navItems = document.querySelectorAll('.feature-nav-item');
    const screens = document.querySelectorAll('.feature-screen');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetFeature = item.dataset.feature;

            // Update nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Update screens
            screens.forEach(screen => {
                if (screen.dataset.feature === targetFeature) {
                    screen.classList.add('active');
                } else {
                    screen.classList.remove('active');
                }
            });
        });
    });
}

// ================================
// FAQ Accordion
// ================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ================================
// Pricing Toggle
// ================================
function initPricingToggle() {
    const toggle = document.getElementById('pricingToggle');
    const labels = document.querySelectorAll('.toggle-label');
    const prices = document.querySelectorAll('.price[data-monthly]');

    if (!toggle) return;

    let isYearly = false;

    toggle.addEventListener('click', () => {
        isYearly = !isYearly;
        toggle.classList.toggle('active', isYearly);

        // Update labels
        labels.forEach(label => {
            label.classList.toggle('active',
                (label.dataset.period === 'yearly') === isYearly
            );
        });

        // Update prices with animation
        prices.forEach(price => {
            const newPrice = isYearly ? price.dataset.yearly : price.dataset.monthly;

            price.style.transform = 'translateY(-10px)';
            price.style.opacity = '0';

            setTimeout(() => {
                price.textContent = newPrice;
                price.style.transform = 'translateY(0)';
                price.style.opacity = '1';
            }, 150);
        });
    });
}

// ================================
// Stats Counter Animation
// ================================
function initStatsCounter() {
    const stats = document.querySelectorAll('[data-count]');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);

        element.textContent = current.toLocaleString('de-DE');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ================================
// Scroll Animations (GSAP-style)
// ================================
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.feature-nav-item, .process-step, .testimonial-card, .pricing-card, .faq-item'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

// ================================
// Input Effects
// ================================
function initInputEffects() {
    const input = document.getElementById('heroInput');
    const btn = document.getElementById('generateBtn');

    if (!input || !btn) return;

    // Placeholder animation
    const placeholders = [
        'Paste your AliExpress link here...',
        'Paste your Amazon link here...',
        'Paste your CJ Dropshipping link here...',
        'Paste your Alibaba link here...'
    ];

    let placeholderIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typePlaceholder() {
        const current = placeholders[placeholderIndex];

        if (isPaused) {
            setTimeout(typePlaceholder, 2000);
            isPaused = false;
            isDeleting = true;
            return;
        }

        if (isDeleting) {
            input.placeholder = current.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                placeholderIndex = (placeholderIndex + 1) % placeholders.length;
            }
        } else {
            input.placeholder = current.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                isPaused = true;
            }
        }

        setTimeout(typePlaceholder, isDeleting ? 25 : 40);
    }

    setTimeout(typePlaceholder, 2500);

    // Button click handler
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = input.value.trim();

        if (!url) {
            input.focus();
            input.style.animation = 'shake 0.5s ease';
            setTimeout(() => input.style.animation = '', 500);
            return;
        }

        // Show loading state
        const originalContent = btn.innerHTML;
        btn.innerHTML = `
            <span class="loading-spinner"></span>
            <span class="btn-text">Generating...</span>
        `;
        btn.disabled = true;

        // Simulate generation
        setTimeout(() => {
            btn.innerHTML = `
                <span class="btn-text">✓ Store Ready!</span>
            `;

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
                input.value = '';
            }, 2000);
        }, 3000);
    });

    // Enter key handler
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btn.click();
        }
    });
}

// ================================
// Parallax Effects
// ================================
function initParallax() {
    const floatingStats = document.querySelectorAll('.floating-stat');

    if (floatingStats.length === 0) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        floatingStats.forEach((stat, index) => {
            const depth = (index + 1) * 8;
            const x = currentX * depth;
            const y = currentY * depth;

            stat.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ================================
// Smooth Scroll
// ================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// Add Dynamic Styles
// ================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    .loading-spinner {
        display: inline-block;
        width: 18px;
        height: 18px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .price {
        transition: transform 0.15s ease, opacity 0.15s ease;
    }
`;
document.head.appendChild(dynamicStyles);

// ================================
// Intersection Observer for Marquee
// ================================
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            marqueeTrack.style.animationPlayState =
                entry.isIntersecting ? 'running' : 'paused';
        });
    });

    observer.observe(marqueeTrack);
}

// ================================
// Testimonials Drag Scroll
// ================================
const testimonialTrack = document.querySelector('.testimonial-track');
if (testimonialTrack) {
    let isDown = false;
    let startX;
    let scrollLeft;

    testimonialTrack.style.cursor = 'grab';
    testimonialTrack.style.userSelect = 'none';

    testimonialTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        testimonialTrack.style.cursor = 'grabbing';
        startX = e.pageX - testimonialTrack.offsetLeft;
        scrollLeft = testimonialTrack.parentElement.scrollLeft;
    });

    testimonialTrack.addEventListener('mouseleave', () => {
        isDown = false;
        testimonialTrack.style.cursor = 'grab';
    });

    testimonialTrack.addEventListener('mouseup', () => {
        isDown = false;
        testimonialTrack.style.cursor = 'grab';
    });

    testimonialTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialTrack.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialTrack.parentElement.scrollLeft = scrollLeft - walk;
    });
}

// ================================
// Button Ripple Effect
// ================================
document.querySelectorAll('.btn-primary, .btn-generate').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ================================
// Prefers Reduced Motion
// ================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--ease-out', '0s');

    // Disable animations
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ================================
// Console Message
// ================================
console.log(
    '%c Nova %c AI Store Builder ',
    'background: linear-gradient(135deg, #a855f7, #6366f1); color: white; padding: 8px 12px; font-size: 14px; font-weight: bold; border-radius: 6px 0 0 6px;',
    'background: #18181b; color: #a855f7; padding: 8px 12px; font-size: 14px; font-weight: bold; border-radius: 0 6px 6px 0;'
);
