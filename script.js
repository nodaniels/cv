// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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
