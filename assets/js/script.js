// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('theme-icon').className = 'fas fa-sun';
    }
});

// Typing Effect
const texts = [
    "Aspiring Software Engineer",
    "B.Tech CSE (AI & Data Science)",
    "Full Stack Developer",
    "Problem Solver & Innovator"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typed-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenTexts = 2000;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentText.length) {
        speed = delayBetweenTexts;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 500;
    }

    setTimeout(type, speed);
}

// Smooth Scroll
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
        
        // Close mobile menu if open
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// Active Navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});


// Contact Form with EmailJS
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    btn.disabled = true;
    
    const formData = {
        from_name: this.name.value,
        from_email: this.email.value,
        subject: this.subject.value,
        message: this.message.value,
        to_email: 'naavviinn001@gmail.com'
    };
    
    // Replace with your actual EmailJS credentials
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
        .then(() => {
            alert('✅ Message sent successfully! I will get back to you soon.');
            this.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            alert('❌ Failed to send message. Please email directly at naavviinn001@gmail.com');
            btn.innerHTML = originalText;
            btn.disabled = false;
        });



});
// Resume Upload
const resumeInput = document.getElementById('resumeInput');
const resumeViewer = document.getElementById('resumeViewer');
if (resumeInput) {
resumeInput.addEventListener('change', function(e) {
const file = e.target.files[0];
if (file && file.type === 'application/pdf') {
const fileURL = URL.createObjectURL(file);
resumeViewer.innerHTML = <iframe src="${fileURL}" style="width: 100%; height: 100%; border: none; border-radius: 10px;"></iframe>;
resumeViewer.classList.add('active');
} else {
alert('Please upload a PDF file');
}
});
}
// Certificate Upload
function setupCertificateUpload(modalId, inputId) {
const modal = document.getElementById(modalId);
if (modal) {
const input = modal.querySelector('input[type="file"]');
input?.addEventListener('change', function(e) {
const file = e.target.files[0];
if (file) {
const fileURL = URL.createObjectURL(file);
const viewer = document.createElement('div');
viewer.className = 'document-viewer active mt-3';
            if (file.type === 'application/pdf') {
                viewer.innerHTML = `<iframe src="${fileURL}" style="width: 100%; height: 500px; border: none; border-radius: 10px;"></iframe>`;
            } else if (file.type.startsWith('image/')) {
                viewer.innerHTML = `<img src="${fileURL}" style="width: 100%; border-radius: 10px;" alt="Certificate">`;
            }
            
            const existingViewer = modal.querySelector('.document-viewer');
            if (existingViewer) {
                existingViewer.remove();
            }
            
            input.parentNode.appendChild(viewer);
        }
    });
}
}
// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
type();
setupCertificateUpload('certModal1');
setupCertificateUpload('certModal2');
});
// Navbar background on scroll
window.addEventListener('scroll', () => {
const navbar = document.querySelector('.navbar');
if (window.scrollY > 50) {
navbar.style.boxShadow = '0 4px 20px rgba(13, 138, 188, 0.15)';
} else {
navbar.style.boxShadow = '0 2px 10px rgba(13, 138, 188, 0.1)';
}
});