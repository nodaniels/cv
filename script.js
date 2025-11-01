// Language state
let currentLanguage = 'da'; // default Danish

// View switching functionality
const navButtons = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.passion-statement, .content-view');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetView = button.getAttribute('data-view');
        
        // Remove active class from all buttons
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Hide all views
        views.forEach(view => view.classList.add('hidden'));
        
        // Show target view
        const target = document.getElementById(targetView);
        if (target) {
            target.classList.remove('hidden');
        }
    });
});

// Language switching functionality
const languageToggle = document.getElementById('language-toggle');

function updateLanguage(lang) {
    currentLanguage = lang;
    
    // Update all elements with data-da and data-en attributes
    const elements = document.querySelectorAll('[data-da][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // Check if element is a button or has text content
            if (element.tagName === 'BUTTON') {
                element.textContent = text;
            } else if (element.tagName === 'A') {
                element.textContent = text;
            } else if (element.tagName === 'P' || element.tagName === 'H2' || element.tagName === 'SPAN') {
                element.textContent = text;
            }
        }
    });
    
    // Update the language toggle button text - show opposite language
    languageToggle.textContent = lang === 'da' ? 'EN' : 'DA';
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize with Danish text
updateLanguage('da');

// Language toggle button click handler
languageToggle.addEventListener('click', () => {
    const newLang = currentLanguage === 'da' ? 'en' : 'da';
    updateLanguage(newLang);
});

// Easter Egg: Proximity hint and video switch
const contactInfo = document.getElementById('contact-info-trigger');
const proximityHint = document.getElementById('proximity-hint');
const profileImageStatic = document.getElementById('profile-image-static');
const profileVideoInline = document.getElementById('profile-video-inline');
const homeView = document.getElementById('home-view');
let hintShown = false;
let easterEggDiscovered = localStorage.getItem('easterEggDiscovered') === 'true';

// Create confetti effect
function createConfetti() {
    const colors = ['#000000', '#555555', '#888888'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        contactInfo.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Track mouse movement to detect proximity to contact info (only on home view)
document.addEventListener('mousemove', (e) => {
    if (!contactInfo || !proximityHint) return;
    
    // Only show proximity hint on home view
    const isHomeView = homeView && !homeView.classList.contains('hidden');
    if (!isHomeView) return;
    
    const contactRect = contactInfo.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate distance from mouse to contact info
    const distanceX = Math.min(
        Math.abs(mouseX - contactRect.left),
        Math.abs(mouseX - contactRect.right)
    );
    const distanceY = Math.min(
        Math.abs(mouseY - contactRect.top),
        Math.abs(mouseY - contactRect.bottom)
    );
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Show hint when within 200px of contact info but not hovering
    if (distance < 200 && distance > 20 && !hintShown && !easterEggDiscovered) {
        proximityHint.classList.add('visible');
        hintShown = true;
        // Hide hint after 2 seconds
        setTimeout(() => {
            proximityHint.classList.remove('visible');
        }, 2000);
    }
});

// Switch to video on hover over contact info (only on home view)
if (contactInfo) {
    contactInfo.addEventListener('mouseenter', () => {
        const isHomeView = homeView && !homeView.classList.contains('hidden');
        
        // Only trigger on home view
        if (!isHomeView) return;
        
        // Create confetti effect
        if (!easterEggDiscovered) {
            createConfetti();
        }
        
        // Replace static image with inline video
        if (profileImageStatic && profileVideoInline) {
            profileImageStatic.style.opacity = '0';
            profileVideoInline.style.opacity = '1';
            profileVideoInline.play();
        }
        
        // Hide proximity hint if it's showing
        if (proximityHint) {
            proximityHint.classList.remove('visible');
        }
    });
    
    contactInfo.addEventListener('mouseleave', () => {
        const isHomeView = homeView && !homeView.classList.contains('hidden');
        
        // Only trigger on home view
        if (!isHomeView) return;
        
        // Restore static image
        if (profileImageStatic && profileVideoInline) {
            profileImageStatic.style.opacity = '1';
            profileVideoInline.style.opacity = '0';
            profileVideoInline.pause();
            profileVideoInline.currentTime = 0;
        }
    });
    
    // Mark easter egg as discovered when inline video ends first time
    if (profileVideoInline) {
        profileVideoInline.addEventListener('ended', () => {
            if (!easterEggDiscovered) {
                localStorage.setItem('easterEggDiscovered', 'true');
                easterEggDiscovered = true;
            }
        });
    }
}

// Console Easter egg
console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║   Welcome to Noah Fabricius' CV!      ║
║                                       ║
║   $ whoami                           ║
║   > Noah Fabricius                   ║
║                                       ║
║   $ skills --list                    ║
║   > Python, JavaScript, SQL          ║
║   > Streamlit, AWS, dBeaver          ║
║   > Process Automation               ║
║                                       ║
║   Interested in connecting?          ║
║   > Noahnfdn@gmail.com               ║
║                                       ║
╚═══════════════════════════════════════╝
`);
