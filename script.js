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

// ================================
// Store Generator API Integration
// ================================
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://nova-api-production-fcaa.up.railway.app';

// Create Generation Modal
function createGenerationModal() {
    const modal = document.createElement('div');
    modal.id = 'generation-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-logo">
                    <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
                        <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="url(#modal-grad)"/>
                        <path d="M2 23L16 30L30 23" stroke="url(#modal-grad)" stroke-width="2"/>
                        <path d="M2 16L16 23L30 16" stroke="url(#modal-grad)" stroke-width="2"/>
                        <defs>
                            <linearGradient id="modal-grad" x1="2" y1="2" x2="30" y2="30">
                                <stop stop-color="#a855f7"/>
                                <stop offset="1" stop-color="#6366f1"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h2>Building Your Store</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="generation-steps">
                    <div class="gen-step" data-step="scrape">
                        <div class="step-icon">🔍</div>
                        <div class="step-info">
                            <span class="step-title">Analyzing Product</span>
                            <span class="step-desc">Extracting images, pricing, and details...</span>
                        </div>
                        <div class="step-status">
                            <div class="spinner"></div>
                        </div>
                    </div>
                    <div class="gen-step" data-step="generate">
                        <div class="step-icon">🤖</div>
                        <div class="step-info">
                            <span class="step-title">AI Content Generation</span>
                            <span class="step-desc">Creating compelling copy & SEO...</span>
                        </div>
                        <div class="step-status"></div>
                    </div>
                    <div class="gen-step" data-step="theme">
                        <div class="step-icon">🎨</div>
                        <div class="step-info">
                            <span class="step-title">Building Theme</span>
                            <span class="step-desc">Generating Shopify-ready store...</span>
                        </div>
                        <div class="step-status"></div>
                    </div>
                    <div class="gen-step" data-step="complete">
                        <div class="step-icon">🚀</div>
                        <div class="step-info">
                            <span class="step-title">Store Ready!</span>
                            <span class="step-desc">Your store is ready to download</span>
                        </div>
                        <div class="step-status"></div>
                    </div>
                </div>
                <div class="generation-preview" style="display: none;">
                    <div class="preview-header">
                        <img class="preview-image" src="" alt="Product">
                        <div class="preview-info">
                            <h3 class="preview-title"></h3>
                            <p class="preview-price"></p>
                        </div>
                    </div>
                    <div class="preview-actions">
                        <button class="btn-preview">👁 Preview Store</button>
                        <button class="btn-download">📥 Download Theme</button>
                    </div>
                </div>
                <div class="generation-error" style="display: none;">
                    <div class="error-icon">⚠️</div>
                    <p class="error-message"></p>
                    <button class="btn-retry">Try Again</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        #generation-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
        }
        #generation-modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(10px);
        }
        .modal-content {
            position: relative;
            background: #18181b;
            border-radius: 20px;
            padding: 32px;
            max-width: 500px;
            width: 90%;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        }
        .modal-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 32px;
        }
        .modal-header h2 {
            flex: 1;
            font-size: 20px;
            font-weight: 700;
        }
        .modal-close {
            background: none;
            border: none;
            color: #888;
            font-size: 28px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        .modal-close:hover {
            color: #fff;
        }
        .generation-steps {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .gen-step {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px;
            background: rgba(255,255,255,0.03);
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.05);
            opacity: 0.4;
            transition: all 0.3s ease;
        }
        .gen-step.active {
            opacity: 1;
            border-color: #a855f7;
            background: rgba(168,85,247,0.1);
        }
        .gen-step.done {
            opacity: 1;
            border-color: #22c55e;
        }
        .gen-step.error {
            opacity: 1;
            border-color: #ef4444;
        }
        .step-icon {
            font-size: 24px;
        }
        .step-info {
            flex: 1;
        }
        .step-title {
            display: block;
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 4px;
        }
        .step-desc {
            display: block;
            font-size: 12px;
            color: #888;
        }
        .step-status {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .spinner {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(168,85,247,0.3);
            border-top-color: #a855f7;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .gen-step.done .step-status::after {
            content: '✓';
            color: #22c55e;
            font-size: 18px;
            font-weight: bold;
        }
        .gen-step.done .spinner {
            display: none;
        }
        .generation-preview {
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        .preview-header {
            display: flex;
            gap: 16px;
            margin-bottom: 20px;
        }
        .preview-image {
            width: 80px;
            height: 80px;
            border-radius: 12px;
            object-fit: cover;
        }
        .preview-info {
            flex: 1;
        }
        .preview-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
        }
        .preview-price {
            color: #22c55e;
            font-weight: 700;
        }
        .preview-actions {
            display: flex;
            gap: 12px;
        }
        .preview-actions button {
            flex: 1;
            padding: 14px 20px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-preview {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
        }
        .btn-preview:hover {
            border-color: #a855f7;
            background: rgba(168,85,247,0.1);
        }
        .btn-download {
            background: linear-gradient(135deg, #a855f7, #6366f1);
            border: none;
            color: white;
        }
        .btn-download:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(168,85,247,0.3);
        }
        .generation-error {
            text-align: center;
            padding: 24px;
        }
        .error-icon {
            font-size: 48px;
            margin-bottom: 16px;
        }
        .error-message {
            color: #ef4444;
            margin-bottom: 20px;
        }
        .btn-retry {
            padding: 12px 24px;
            background: #ef4444;
            border: none;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            cursor: pointer;
        }
    `;
    document.head.appendChild(modalStyles);

    // Close modal handlers
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal());
    modal.querySelector('.modal-overlay').addEventListener('click', () => closeModal());

    return modal;
}

function openModal() {
    const modal = document.getElementById('generation-modal') || createGenerationModal();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset steps
    modal.querySelectorAll('.gen-step').forEach(step => {
        step.classList.remove('active', 'done', 'error');
        step.querySelector('.step-status').innerHTML = '';
    });
    modal.querySelector('.generation-preview').style.display = 'none';
    modal.querySelector('.generation-error').style.display = 'none';
    modal.querySelector('.generation-steps').style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('generation-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateStep(stepName, status) {
    const modal = document.getElementById('generation-modal');
    const step = modal.querySelector(`[data-step="${stepName}"]`);

    step.classList.remove('active', 'done', 'error');
    step.classList.add(status);

    if (status === 'active') {
        step.querySelector('.step-status').innerHTML = '<div class="spinner"></div>';
    } else if (status === 'done') {
        step.querySelector('.step-status').innerHTML = '';
    }
}

// Store generation data
let generatedStore = null;

async function generateStore(productUrl) {
    openModal();

    try {
        // Step 1: Scrape product
        updateStep('scrape', 'active');

        const scrapeResponse = await fetch(`${API_BASE_URL}/api/scrape`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: productUrl })
        });

        if (!scrapeResponse.ok) throw new Error('Failed to analyze product');
        const scrapeData = await scrapeResponse.json();

        updateStep('scrape', 'done');

        // Step 2: Generate AI content
        updateStep('generate', 'active');

        const generateResponse = await fetch(`${API_BASE_URL}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productData: scrapeData.data,
                options: { style: 'modern', tone: 'professional' }
            })
        });

        if (!generateResponse.ok) throw new Error('Failed to generate content');
        const generateData = await generateResponse.json();

        updateStep('generate', 'done');

        // Step 3: Build theme
        updateStep('theme', 'active');

        // Simulate theme building (in production this would be another API call)
        await new Promise(resolve => setTimeout(resolve, 1500));

        updateStep('theme', 'done');

        // Step 4: Complete
        updateStep('complete', 'active');
        await new Promise(resolve => setTimeout(resolve, 500));
        updateStep('complete', 'done');

        // Store the generated data
        generatedStore = {
            product: scrapeData.data,
            content: generateData.data
        };

        // Show preview
        showGenerationPreview(generatedStore);

    } catch (error) {
        console.error('Generation error:', error);
        showGenerationError(error.message);
    }
}

function showGenerationPreview(data) {
    const modal = document.getElementById('generation-modal');
    const preview = modal.querySelector('.generation-preview');

    preview.querySelector('.preview-image').src = data.product.images?.[0] || '';
    preview.querySelector('.preview-title').textContent = data.content?.storeName || data.product.title;
    preview.querySelector('.preview-price').textContent = data.product.price || '';

    preview.style.display = 'block';

    // Preview button
    preview.querySelector('.btn-preview').onclick = () => {
        // Open preview in new tab
        const previewUrl = `${API_BASE_URL}/preview?data=${encodeURIComponent(JSON.stringify(data))}`;
        window.open(previewUrl, '_blank');
    };

    // Download button
    preview.querySelector('.btn-download').onclick = () => {
        downloadTheme(data);
    };
}

function showGenerationError(message) {
    const modal = document.getElementById('generation-modal');
    modal.querySelector('.generation-steps').style.display = 'none';

    const errorDiv = modal.querySelector('.generation-error');
    errorDiv.querySelector('.error-message').textContent = message;
    errorDiv.style.display = 'block';

    errorDiv.querySelector('.btn-retry').onclick = () => {
        const input = document.getElementById('heroInput');
        if (input?.value) {
            generateStore(input.value);
        }
    };
}

function downloadTheme(data) {
    // Create a simple JSON download for now
    // In production, this would generate actual Shopify theme files
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nova-store-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Connect Generate Button
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const heroInput = document.getElementById('heroInput');

    if (generateBtn && heroInput) {
        generateBtn.addEventListener('click', () => {
            const url = heroInput.value.trim();

            if (!url) {
                heroInput.focus();
                heroInput.style.borderColor = '#ef4444';
                setTimeout(() => heroInput.style.borderColor = '', 2000);
                return;
            }

            // Basic URL validation
            if (!url.includes('aliexpress') && !url.includes('amazon') && !url.includes('cj') && !url.startsWith('http')) {
                alert('Please enter a valid product URL from AliExpress, Amazon, or CJ Dropshipping');
                return;
            }

            generateStore(url);
        });

        // Enter key support
        heroInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                generateBtn.click();
            }
        });
    }
});
