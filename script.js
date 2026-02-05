// ================================
// Cursor Glow Effect
// ================================
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const ease = 0.15;
        currentX += (mouseX - currentX) * ease;
        currentY += (mouseY - currentY) * ease;

        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

// ================================
// Navigation
// ================================
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Scroll detection for nav styling
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile nav toggle
navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile nav on link click
navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ================================
// Smooth scroll for anchor links
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Intersection Observer for animations
// ================================
const observerOptions = {
    root: null,
    rootMargin: '-50px',
    threshold: 0.1
};

// Reveal animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add reveal class and observe elements
document.querySelectorAll('.section-header, .expertise-card, .case-study, .timeline-item, .principle, .quote-card, .philosophy-right, .contact-content, .education-card').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Stagger animations for grids
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.expertise-grid, .principles-grid, .case-studies').forEach(grid => {
    grid.classList.add('stagger-children');
    staggerObserver.observe(grid);
});

// ================================
// Counter Animation
// ================================
function animateCounter(el, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(counter => {
    counterObserver.observe(counter);
});

// ================================
// Parallax Effect on Hero Visual
// ================================
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual && window.matchMedia('(min-width: 1024px)').matches) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroVisual.style.transform = `translateY(${rate}px)`;
    });
}

// ================================
// Card Tilt Effect
// ================================
document.querySelectorAll('[data-tilt]').forEach(card => {
    if (window.matchMedia('(pointer: fine)').matches) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    }
});

// ================================
// Magnetic Buttons
// ================================
document.querySelectorAll('.btn-primary').forEach(btn => {
    if (window.matchMedia('(pointer: fine)').matches) {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-3px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    }
});

// ================================
// Text Reveal Animation
// ================================
function splitTextToSpans(element) {
    const text = element.textContent;
    element.innerHTML = '';

    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${i * 0.03}s`;
        element.appendChild(span);
    });
}

// ================================
// Scroll Progress Indicator
// ================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: #3b82f6;
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// ================================
// Active Section Highlight
// ================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--text-primary)';
        }
    });
});

// ================================
// Lazy Loading Images
// ================================
const lazyImages = document.querySelectorAll('img[data-src]');

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

lazyImages.forEach(img => imageObserver.observe(img));

// ================================
// Easter Eggs
// ================================

// Konami code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Rainbow mode
    document.documentElement.style.setProperty('--gradient-1', 'linear-gradient(135deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)');

    // Confetti effect
    createConfetti();

    setTimeout(() => {
        document.documentElement.style.setProperty('--gradient-1', 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)');
    }, 5000);

    console.log('%c Congratulations! You found the easter egg! ', 'background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
}

function createConfetti() {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#22c55e', '#f59e0b'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            opacity: ${Math.random() + 0.5};
            transform: rotate(${Math.random() * 360}deg);
            z-index: 9999;
            pointer-events: none;
            animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
        `;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
        }
    }
`;
document.head.appendChild(confettiStyle);

// ================================
// Console Greeting
// ================================
console.log(`
%c ██████╗  ██████╗ ██╗  ██╗██╗████████╗
%c ██╔══██╗██╔═══██╗██║  ██║██║╚══██╔══╝
%c ██████╔╝██║   ██║███████║██║   ██║
%c ██╔══██╗██║   ██║██╔══██║██║   ██║
%c ██║  ██║╚██████╔╝██║  ██║██║   ██║
%c ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝
`,
'color: #3b82f6',
'color: #6366f1',
'color: #8b5cf6',
'color: #a855f7',
'color: #d946ef',
'color: #ec4899'
);

console.log('%c Welcome to my portfolio! ', 'background: #050505; color: #3b82f6; font-size: 14px; padding: 8px 16px; border: 1px solid #3b82f6; border-radius: 4px;');
console.log('%c Curious about the code? Feel free to explore! ', 'color: rgba(255,255,255,0.5); font-size: 12px;');
console.log('%c Hint: Try the Konami code... ', 'color: rgba(255,255,255,0.3); font-size: 10px; font-style: italic;');

// ================================
// Performance: Reduce animations on scroll
// ================================
let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Batch scroll-based updates here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ================================
// Reduced Motion Support
// ================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');

    // Disable all animations
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ================================
// Initialize
// ================================
document.addEventListener('DOMContentLoaded', () => {
    // Hide scroll indicator after scrolling
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }, { passive: true });
    }

    // Animate hero elements on load
    document.body.classList.add('loaded');
});
