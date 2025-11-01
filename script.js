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
