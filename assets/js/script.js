// 1. Initialize Libraries
AOS.init({
    once: true,
    offset: 100,
    duration: 800,
});

VanillaTilt.init(document.querySelector(".tilt-effect"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

// 2. Preloader
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }, 1500);
});

// 3. Custom Cursor Logic (Only runs if mouse is detected)
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// Helper function to check if device has a mouse
function isDesktop() {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

if (isDesktop()) {
    window.addEventListener("mousemove", function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect for cursor
    const links = document.querySelectorAll('a, button, input, textarea');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
            cursorOutline.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            cursorOutline.style.borderColor = "transparent";
        });
        link.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
            cursorOutline.style.backgroundColor = "transparent";
            cursorOutline.style.borderColor = "var(--text-secondary)";
        });
    });
}

// 4. Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const icon = themeBtn.querySelector('i');

// Check local storage
if(localStorage.getItem('theme') === 'light') {
    html.setAttribute('data-theme', 'light');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if(newTheme === 'light'){
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// 5. EmailJS Integration
(function() {
    // -------------------------------------------------------------------
    // IMPORTANT: REPLACE THESE WITH YOUR KEYS FROM EMAILJS DASHBOARD
    // -------------------------------------------------------------------
    emailjs.init("DUvS4QegBBxK6HtX_"); 
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;

    // IMPORTANT: REPLACE WITH YOUR SERVICE ID AND TEMPLATE ID
    emailjs.sendForm('service_3s3vkrs', 'template_l7irodn', this)
        .then(() => {
            btn.innerHTML = '<span>Sent!</span> <i class="fas fa-check"></i>';
            btn.classList.add('btn-success');
            document.getElementById('contact-form').reset();
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.classList.remove('btn-success');
            }, 3000);
        }, (err) => {
            btn.innerHTML = 'Error!';
            console.error('EmailJS Error:', err);
            // Alert user to console for debugging
            alert("Email failed to send. Check Console for details (likely missing API Keys).");
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 3000);
        });
});