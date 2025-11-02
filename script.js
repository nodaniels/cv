// Language state
let currentLanguage = 'da'; // default Danish

// View switching functionality
const navButtons = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.passion-statement, .content-view');

function showView(targetView) {
    // Remove active class from all buttons
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to the button that matches targetView
    const activeButton = document.querySelector(`[data-view="${targetView}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Hide all views
    views.forEach(view => view.classList.add('hidden'));
    
    // Show target view
    const target = document.getElementById(targetView);
    if (target) {
        target.classList.remove('hidden');
    }
    
    // On mobile: hide header bar on content views, show on home view
    if (window.innerWidth <= 768) {
        if (targetView === 'home-view') {
            document.body.classList.remove('hide-header');
        } else {
            document.body.classList.add('hide-header');
        }
    }
    
    // If navigating to home view, reset all videos and show only the image
    if (targetView === 'home-view') {
        const profileImageStatic = document.getElementById('profile-image-static');
        const profileVideoInline = document.getElementById('profile-video-inline');
        const educationVideoInline = document.getElementById('education-video-inline');
        const workerVideoInline = document.getElementById('worker-video-inline');
        const projectsVideoInline = document.getElementById('projects-video-inline');
        
        if (profileImageStatic) {
            profileImageStatic.style.opacity = '1';
        }
        
        // Hide and reset all videos
        if (profileVideoInline) {
            profileVideoInline.style.opacity = '0';
            profileVideoInline.pause();
            profileVideoInline.currentTime = 0;
        }
        if (educationVideoInline) {
            educationVideoInline.style.opacity = '0';
            educationVideoInline.pause();
            educationVideoInline.currentTime = 0;
        }
        if (workerVideoInline) {
            workerVideoInline.style.opacity = '0';
            workerVideoInline.pause();
            workerVideoInline.currentTime = 0;
        }
        if (projectsVideoInline) {
            projectsVideoInline.style.opacity = '0';
            projectsVideoInline.pause();
            projectsVideoInline.currentTime = 0;
        }
    }
    
    // On mobile: play video on content views once
    if (window.innerWidth <= 768) {
        if (targetView === 'uddannelse-view') {
            const mobileVideo = document.getElementById('mobile-profile-video-uddannelse');
            const mobileImage = document.getElementById('mobile-profile-image-uddannelse');
            if (mobileVideo && mobileImage) {
                mobileVideo.currentTime = 0;
                mobileVideo.style.opacity = '1';
                mobileVideo.play().catch(err => console.log('Video play failed:', err));
                mobileVideo.onended = () => {
                    mobileVideo.style.opacity = '0';
                    mobileVideo.currentTime = 0;
                };
            }
        } else if (targetView === 'erfaring-view') {
            const mobileVideo = document.getElementById('mobile-profile-video-erfaring');
            const mobileImage = document.getElementById('mobile-profile-image-erfaring');
            if (mobileVideo && mobileImage) {
                mobileVideo.currentTime = 0;
                mobileVideo.style.opacity = '1';
                mobileVideo.play().catch(err => console.log('Video play failed:', err));
                mobileVideo.onended = () => {
                    mobileVideo.style.opacity = '0';
                    mobileVideo.currentTime = 0;
                };
            }
        } else if (targetView === 'projekter-view') {
            const mobileVideo = document.getElementById('mobile-profile-video-projekter');
            const mobileImage = document.getElementById('mobile-profile-image-projekter');
            if (mobileVideo && mobileImage) {
                mobileVideo.currentTime = 0;
                mobileVideo.style.opacity = '1';
                mobileVideo.play().catch(err => console.log('Video play failed:', err));
                mobileVideo.onended = () => {
                    mobileVideo.style.opacity = '0';
                    mobileVideo.currentTime = 0;
                };
            }
        }
    }
}

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetView = button.getAttribute('data-view');
        showView(targetView);
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
const educationVideoInline = document.getElementById('education-video-inline');
const workerVideoInline = document.getElementById('worker-video-inline');
const projectsVideoInline = document.getElementById('projects-video-inline');
const homeView = document.getElementById('home-view');
const educationNavBtn = document.querySelector('[data-view="uddannelse-view"]');
const erfaringNavBtn = document.querySelector('[data-view="erfaring-view"]');
const projectsNavBtn = document.querySelector('[data-view="projekter-view"]');
let hintShown = false;
let easterEggDiscovered = localStorage.getItem('easterEggDiscovered') === 'true';

// Create confetti effect with pastel colors
function createConfetti(element) {
    const colors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E0BBE4', '#FEC8D8'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 0.3 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        element.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 2000);
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
            createConfetti(contactInfo);
        }
        
        // Hide any other videos first
        if (educationVideoInline) {
            educationVideoInline.style.opacity = '0';
            educationVideoInline.pause();
            educationVideoInline.currentTime = 0;
        }
        if (workerVideoInline) {
            workerVideoInline.style.opacity = '0';
            workerVideoInline.pause();
            workerVideoInline.currentTime = 0;
        }
        if (projectsVideoInline) {
            projectsVideoInline.style.opacity = '0';
            projectsVideoInline.pause();
            projectsVideoInline.currentTime = 0;
        }
        
        // Replace static image with happy video
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

// Education button hover - show education video overlay (no confetti)
educationNavBtn.addEventListener('mouseenter', () => {
    // Only trigger on home view
    if (!homeView.classList.contains('hidden')) {
        // Hide other videos first
        profileVideoInline.style.opacity = '0';
        profileVideoInline.pause();
        profileVideoInline.currentTime = 0;
        workerVideoInline.style.opacity = '0';
        workerVideoInline.pause();
        workerVideoInline.currentTime = 0;
        projectsVideoInline.style.opacity = '0';
        projectsVideoInline.pause();
        projectsVideoInline.currentTime = 0;
        
        // Show education video
        profileImageStatic.style.opacity = '0';
        educationVideoInline.style.opacity = '1';
        educationVideoInline.play();
    }
});

educationNavBtn.addEventListener('mouseleave', () => {
    if (!homeView.classList.contains('hidden')) {
        profileImageStatic.style.opacity = '1';
        educationVideoInline.style.opacity = '0';
        educationVideoInline.pause();
        educationVideoInline.currentTime = 0;
    }
});

// On mobile: redirect to education view after 6 seconds
let educationVideoTimeout = null;
educationVideoInline.addEventListener('timeupdate', () => {
    if (!homeView.classList.contains('hidden') && window.innerWidth <= 768 && educationVideoInline.style.opacity === '1' && educationVideoInline.currentTime >= 6 && !educationVideoTimeout) {
        educationVideoTimeout = setTimeout(() => {
            // Hide video and restore image
            profileImageStatic.style.opacity = '1';
            educationVideoInline.style.opacity = '0';
            educationVideoInline.pause();
            educationVideoInline.currentTime = 0;
            educationVideoTimeout = null;
            
            // Navigate to education view
            showView('uddannelse-view');
        }, 0);
    }
});

// Education button click on mobile - play video instead of immediate navigation
educationNavBtn.addEventListener('click', (e) => {
    if (!homeView.classList.contains('hidden') && window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        
        // Reset timeout if exists
        if (educationVideoTimeout) {
            clearTimeout(educationVideoTimeout);
            educationVideoTimeout = null;
        }
        
        // Hide other videos first
        profileVideoInline.style.opacity = '0';
        profileVideoInline.pause();
        profileVideoInline.currentTime = 0;
        workerVideoInline.style.opacity = '0';
        workerVideoInline.pause();
        workerVideoInline.currentTime = 0;
        projectsVideoInline.style.opacity = '0';
        projectsVideoInline.pause();
        projectsVideoInline.currentTime = 0;
        
        // Show and play education video
        profileImageStatic.style.opacity = '0';
        educationVideoInline.style.opacity = '1';
        educationVideoInline.currentTime = 0;
        educationVideoInline.play().catch(err => {
            console.log('Video play failed:', err);
        });
        
        return false;
    }
});

// Worker button hover - show worker video overlay (no confetti)
erfaringNavBtn.addEventListener('mouseenter', () => {
    // Only trigger on home view
    if (!homeView.classList.contains('hidden')) {
        // Hide other videos first
        profileVideoInline.style.opacity = '0';
        profileVideoInline.pause();
        profileVideoInline.currentTime = 0;
        educationVideoInline.style.opacity = '0';
        educationVideoInline.pause();
        educationVideoInline.currentTime = 0;
        projectsVideoInline.style.opacity = '0';
        projectsVideoInline.pause();
        projectsVideoInline.currentTime = 0;
        
        // Show worker video
        profileImageStatic.style.opacity = '0';
        workerVideoInline.style.opacity = '1';
        workerVideoInline.play();
    }
});

erfaringNavBtn.addEventListener('mouseleave', () => {
    if (!homeView.classList.contains('hidden')) {
        profileImageStatic.style.opacity = '1';
        workerVideoInline.style.opacity = '0';
        workerVideoInline.pause();
        workerVideoInline.currentTime = 0;
    }
});

// On mobile: redirect to erfaring view after 6 seconds
let workerVideoTimeout = null;
workerVideoInline.addEventListener('timeupdate', () => {
    if (!homeView.classList.contains('hidden') && window.innerWidth <= 768 && workerVideoInline.style.opacity === '1' && workerVideoInline.currentTime >= 6 && !workerVideoTimeout) {
        workerVideoTimeout = setTimeout(() => {
            // Hide video and restore image
            profileImageStatic.style.opacity = '1';
            workerVideoInline.style.opacity = '0';
            workerVideoInline.pause();
            workerVideoInline.currentTime = 0;
            workerVideoTimeout = null;
            
            // Navigate to erfaring view
            showView('erfaring-view');
        }, 0);
    }
});

// Worker button click on mobile - play video instead of immediate navigation
erfaringNavBtn.addEventListener('click', (e) => {
    if (!homeView.classList.contains('hidden') && window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        
        // Reset timeout if exists
        if (workerVideoTimeout) {
            clearTimeout(workerVideoTimeout);
            workerVideoTimeout = null;
        }
        
        // Hide other videos first
        profileVideoInline.style.opacity = '0';
        profileVideoInline.pause();
        profileVideoInline.currentTime = 0;
        educationVideoInline.style.opacity = '0';
        educationVideoInline.pause();
        educationVideoInline.currentTime = 0;
        projectsVideoInline.style.opacity = '0';
        projectsVideoInline.pause();
        projectsVideoInline.currentTime = 0;
        
        // Show and play worker video
        profileImageStatic.style.opacity = '0';
        workerVideoInline.style.opacity = '1';
        workerVideoInline.currentTime = 0;
        workerVideoInline.play().catch(err => {
            console.log('Video play failed:', err);
        });
        
        return false;
    }
});

// Projects button hover - show projects video overlay (no confetti)
projectsNavBtn.addEventListener('mouseenter', () => {
    // Only trigger on home view
    if (!homeView.classList.contains('hidden')) {
        // Hide other videos first
        profileVideoInline.style.opacity = '0';
        profileVideoInline.pause();
        profileVideoInline.currentTime = 0;
        educationVideoInline.style.opacity = '0';
        educationVideoInline.pause();
        educationVideoInline.currentTime = 0;
        workerVideoInline.style.opacity = '0';
        workerVideoInline.pause();
        workerVideoInline.currentTime = 0;
        
        // Show projects video
        profileImageStatic.style.opacity = '0';
        projectsVideoInline.style.opacity = '1';
        projectsVideoInline.play();
    }
});

projectsNavBtn.addEventListener('mouseleave', () => {
    if (!homeView.classList.contains('hidden')) {
        profileImageStatic.style.opacity = '1';
        projectsVideoInline.style.opacity = '0';
        projectsVideoInline.pause();
        projectsVideoInline.currentTime = 0;
    }
});

// On mobile: redirect to projekter view after 6 seconds
let projectsVideoTimeout = null;
projectsVideoInline.addEventListener('timeupdate', () => {
    if (!homeView.classList.contains('hidden') && window.innerWidth <= 768 && projectsVideoInline.style.opacity === '1' && projectsVideoInline.currentTime >= 6 && !projectsVideoTimeout) {
        projectsVideoTimeout = setTimeout(() => {
            // Hide video and restore image
            profileImageStatic.style.opacity = '1';
            projectsVideoInline.style.opacity = '0';
            projectsVideoInline.pause();
            projectsVideoInline.currentTime = 0;
            projectsVideoTimeout = null;
            
            // Navigate to projekter view
            showView('projekter-view');
        }, 0);
    }
});

// Projects button click on mobile - play video instead of immediate navigation
projectsNavBtn.addEventListener('click', (e) => {
    if (!homeView.classList.contains('hidden') && window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        
        // Reset timeout if exists
        if (projectsVideoTimeout) {
            clearTimeout(projectsVideoTimeout);
            projectsVideoTimeout = null;
        }
        
        // Hide other videos first
        profileVideoInline.style.opacity = '0';
        profileVideoInline.pause();
        profileVideoInline.currentTime = 0;
        educationVideoInline.style.opacity = '0';
        educationVideoInline.pause();
        educationVideoInline.currentTime = 0;
        workerVideoInline.style.opacity = '0';
        workerVideoInline.pause();
        workerVideoInline.currentTime = 0;
        
        // Show and play projects video
        profileImageStatic.style.opacity = '0';
        projectsVideoInline.style.opacity = '1';
        projectsVideoInline.currentTime = 0;
        projectsVideoInline.play().catch(err => {
            console.log('Video play failed:', err);
        });
        
        return false;
    }
});

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
