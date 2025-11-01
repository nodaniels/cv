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
