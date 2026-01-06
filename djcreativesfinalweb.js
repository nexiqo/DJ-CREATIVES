// ===================================
// DJ CREATIVES - Interactive JavaScript
// ===================================

// --- PRELOADER LOGIC ---
// Hides preloader after a fixed duration.
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500); // 1.5 seconds
    }
});

// --- MAIN INITIALIZATION ---
// This runs after the HTML document is parsed, initializing all interactive components.
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initGridCanvas();
    initCustomCursor();
    initNavbarEffects();
    initMobileMenu();
    initSmoothScroll();
    initAnimatedCounters();
    initPortfolioFilter();
    initScrollReveal();
    initFaqAccordion();
    initCardEffects();
    initParallax();
    startCountdown();
    initMagneticButtons();
    createScrollProgress();
    initFormSubmission();
    initializeBeforeAfterModal();

    console.log('✓ DJ CREATIVES Website Initialized');
});


// ===================================
// COMPONENT INITIALIZATION FUNCTIONS
// ===================================

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 50;
    particlesContainer.innerHTML = ''; // Clear existing particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `position: absolute; width: ${Math.random() * 3 + 1}px; height: ${Math.random() * 3 + 1}px; background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2}); border-radius: 50%; left: ${Math.random() * 100}%; top: ${Math.random() * 100}%; animation: float ${Math.random() * 10 + 10}s linear infinite; animation-delay: ${Math.random() * 5}s;`;
        particlesContainer.appendChild(particle);
    }
}

function initGridCanvas() {
    const canvas = document.getElementById('gridCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let scrollOffset = 0;
    const gridSize = 50;
    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; drawGrid(); };
    const drawGrid = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let x = 0; x <= canvas.width; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
        for (let y = scrollOffset % gridSize; y <= canvas.height; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
    };
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', () => { scrollOffset = window.pageYOffset * 0.5; drawGrid(); });
    resizeCanvas();
}

function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (!cursorDot || !cursorOutline) return;
    window.addEventListener('mousemove', e => {
        const { clientX: posX, clientY: posY } = e;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: 'forwards' });
    });
    document.querySelectorAll('a, button, .portfolio-item, .service-card, .pricing-card, .filter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navbar || sections.length === 0 || navLinks.length === 0) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.pageYOffset > 100);
        let current = '';
        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 200) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        });
    });
}

function initAnimatedCounters() {
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const animateCounter = (el, target, suffix) => {
        // Test if the target is a pure number.
        if (!/^[0-9]+$/.test(target)) {
            // Special handling for "24/7" to add a gap and tilt the '/'
            if (target === '24/7') {
                el.innerHTML = '24<span class="slash">/</span><span class="gap">7</span>';
            } else {
                el.textContent = target;
            }
            return;
        }

        const numericTarget = parseInt(target, 10);

        let start = 0;
        const duration = 2000;
        const increment = numericTarget / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= numericTarget) {
                el.textContent = numericTarget + (suffix || '');
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(start);
            }
        }, 16);
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-number').forEach(stat => {
                    const target = stat.dataset.target;
                    const suffix = stat.dataset.suffix || '';
                    animateCounter(stat, target, suffix);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (filterButtons.length === 0) return;
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            portfolioItems.forEach(item => {
                const isVisible = filterValue === 'all' || item.dataset.category === filterValue;
                item.style.display = isVisible ? 'block' : 'none';
                setTimeout(() => item.classList.toggle('visible', isVisible), 10);
            });
        });
    });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .pricing-card, .testimonial-card, .digitizing-feature, .process-step, .visual-box, .about-content, .faq-item, .section-header');
    if (revealElements.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('revealed'), index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => observer.observe(el));
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
}

function initCardEffects() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top;
            card.style.transform = `perspective(1000px) rotateX(${(y - rect.height / 2) / 20}deg) rotateY(${(rect.width / 2 - x) / 20}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => card.style.transform = '');
    });
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', () => document.querySelectorAll('.pricing-card').forEach(other => { if (other !== card && !other.classList.contains('featured')) other.style.opacity = '0.5'; }));
        card.addEventListener('mouseleave', () => document.querySelectorAll('.pricing-card').forEach(other => other.style.opacity = '1'));
    });
}

function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.street-light').forEach((light, index) => {
            light.style.transform = `translateY(${scrolled * (0.3 + index * 0.1)}px)`;
        });
    });
}

function startCountdown() {
    const hoursEl = document.getElementById('hours');
    if (!hoursEl) return;
    let endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    setInterval(() => {
        const now = new Date().getTime(), distance = endTime - now;
        if (distance < 0) endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        hoursEl.textContent = h.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = m.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = s.toString().padStart(2, '0');
    }, 1000);
}

function initMagneticButtons() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', e => {
            const rect = button.getBoundingClientRect();
            button.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.2}px, ${(e.clientY - rect.top - rect.height / 2) * 0.2}px)`;
        });
        button.addEventListener('mouseleave', () => button.style.transform = 'translate(0, 0)');
    });
}

function createScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
        bar.style.width = `${(window.pageYOffset / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100}%`;
    });
}

function initFormSubmission() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]'), originalText = btn.innerHTML;
        btn.innerHTML = '<span>SENDING...</span>'; btn.disabled = true;
        fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm), headers: { 'Accept': 'application/json' } })
            .then(res => {
                if (res.ok) {
                    btn.innerHTML = '<span>✓ MESSAGE SENT!</span>';
                    contactForm.reset();
                    showNotification('Thank you! Your message has been sent.', 'success');
                } else { throw new Error('Submission failed'); }
            })
            .catch(() => {
                btn.innerHTML = '<span>✗ TRY AGAIN</span>';
                showNotification('Sorry, there was an error. Please try again.', 'error');
            })
            .finally(() => setTimeout(() => { btn.innerHTML = originalText; btn.disabled = false; }, 5000));
    });
}

function showNotification(message, type = 'info') {
    document.querySelectorAll('.notification').forEach(n => n.remove());
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<div>${message}</div>`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

function initializeBeforeAfterModal() {
    const comparisonModal = document.querySelector('.comparison-modal');
    const lightboxModal = document.getElementById('lightbox-modal'); // This can be left as is if you plan to use it.
    if (!comparisonModal) return;

    const beforeImage = document.getElementById('before-image');
    const afterImage = document.getElementById('after-image');
    const closeButtons = document.querySelectorAll('.modal-close');

    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const images = item.querySelectorAll('.double-image img');
            if (images.length === 2) {
                beforeImage.src = images[0].src;
                afterImage.src = images[1].src;
                comparisonModal.classList.add('active');
            }
        });
    });

    const closeModal = () => {
        comparisonModal.classList.remove('active');
        if (lightboxModal) lightboxModal.classList.remove('active'); // Also close lightbox if open
    };

    closeButtons.forEach(button => button.addEventListener('click', closeModal));
    comparisonModal.addEventListener('click', e => {
        if (e.target === comparisonModal) {
            closeModal();
        }
    });
}
