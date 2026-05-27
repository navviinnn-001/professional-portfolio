/* ═══════════════════════════════════════════
   NAVIN KRISHNA PORTFOLIO — SCRIPT
═══════════════════════════════════════════ */

// ─── PAGE LOADER ─────────────────────────
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('pageLoader');
        loader.classList.add('gone');
        document.body.style.overflow = 'visible';
    }, 1800);
});
document.body.style.overflow = 'hidden';

// ─── THEME TOGGLE ─────────────────────────
const themeBtn  = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    }
}

themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('nk-theme', next);
});

const savedTheme = localStorage.getItem('nk-theme') || 'light';
applyTheme(savedTheme);

// ─── NAVBAR ───────────────────────────────
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNav();
});

function openMobileMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

mobileCloseBtn?.addEventListener('click', closeMobileMenu);

document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.addEventListener('click', closeMobileMenu);
});

// Close on backdrop click (outside menu content)
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ─── ACTIVE NAV HIGHLIGHT ─────────────────
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY  = window.scrollY + 120;

    sections.forEach(sec => {
        const top    = sec.offsetTop;
        const height = sec.offsetHeight;
        const id     = sec.getAttribute('id');
        const link   = document.querySelector(`.nav-item[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
}

// ─── TYPING EFFECT ────────────────────────
const roles = [
    "Aspiring Software Engineer",
    "B.Tech CSE (AI & Data Science)",
    "Full Stack Developer",
    "Problem Solver & Innovator"
];

let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
    if (!typedEl) return;
    const current = roles[roleIdx];

    if (deleting) {
        typedEl.textContent = current.slice(0, --charIdx);
    } else {
        typedEl.textContent = current.slice(0, ++charIdx);
    }

    let delay = deleting ? 45 : 95;

    if (!deleting && charIdx === current.length) {
        delay = 2200; deleting = true;
    } else if (deleting && charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
        delay    = 400;
    }

    setTimeout(typeEffect, delay);
}

// ─── REVEAL ON SCROLL ─────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const delay = parseFloat(entry.target.dataset.delay || 0) * 80;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Stagger delays within grids
document.querySelectorAll('.skills-grid, .projects-grid, .certs-grid, .about-cards, .about-stats').forEach(grid => {
    grid.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el, i) => {
        el.dataset.delay = i;
    });
});

revealEls.forEach(el => revealObserver.observe(el));

// ─── SKILL BARS ───────────────────────────
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.sk-bar');
            bars.forEach((bar, i) => {
                setTimeout(() => {
                    bar.style.width = bar.dataset.width + '%';
                }, i * 120);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(grid => skillBarObserver.observe(grid));

// ─── COUNTER ANIMATION ────────────────────
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-num').forEach(num => {
                const raw    = num.dataset.count;
                const suffix = raw.replace(/[0-9]/g, '');
                const target = parseInt(raw);
                let current  = 0;
                const step   = Math.ceil(target / 30);
                const timer  = setInterval(() => {
                    current = Math.min(current + step, target);
                    num.textContent = current + suffix;
                    if (current >= target) clearInterval(timer);
                }, 50);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.about-stats').forEach(el => counterObserver.observe(el));

// ─── CURSOR MAGNETIC EFFECT on social pills ──
document.querySelectorAll('.social-pill, .cs-link, .mobile-social').forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect   = el.getBoundingClientRect();
        const cx     = rect.left + rect.width / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) * 0.25;
        const dy     = (e.clientY - cy) * 0.25;
        el.style.transform = `translate(${dx}px, ${dy}px) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = '';
    });
});

// ─── PARALLAX on hero blobs ───────────────
window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    const b1 = document.querySelector('.b1');
    const b2 = document.querySelector('.b2');
    const b3 = document.querySelector('.b3');
    if (b1) b1.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
    if (b2) b2.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
    if (b3) b3.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});

// ─── CONTACT FORM ─────────────────────────
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn      = document.getElementById('submitBtn');
    const original = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled  = true;

    try {
        emailjs.init('yXA_MBDvQ3p9d3GSL');
        const formData = {
            from_name:  contactForm.name.value,
            from_email: contactForm.email.value,
            subject:    contactForm.subject.value,
            message:    contactForm.message.value
        };
        await emailjs.send('service_3s3vkrs', 'template_3i9kyqj', formData);
        showToast('✅ Message sent! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    } catch (err) {
        console.error('EmailJS Error:', err);
        showToast('❌ Failed to send. Email me at naavviinn001@gmail.com', 'error');
    } finally {
        btn.innerHTML = original;
        btn.disabled  = false;
    }
});

// ─── TOAST NOTIFICATION ──────────────────
function showToast(msg, type = 'success') {
    document.querySelector('.nk-toast')?.remove();

    const toast = document.createElement('div');
    toast.className = 'nk-toast';
    toast.style.cssText = `
        position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
        padding: 1rem 1.5rem; border-radius: 14px;
        font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 500;
        background: #fff;
        color: #0F1F33;
        border-left: 4px solid ${type === 'success' ? '#4CAF50' : '#ef4444'};
        box-shadow: 0 8px 40px rgba(0,0,0,0.15);
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        max-width: 380px;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(() => { toast.style.transform = 'translateX(0)'; });
    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// ─── INIT ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 2000);
    updateActiveNav();
});