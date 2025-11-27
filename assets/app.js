document.addEventListener('DOMContentLoaded', () => {
    // Floating Navigation Logic
    const floatingNav = document.createElement('div');
    floatingNav.className = 'floating-nav';
    floatingNav.innerHTML = `
        <button class="nav-btn" id="toggle-all" title="Expand/Collapse All">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        <button class="nav-btn" id="back-to-top" title="Back to Top">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    `;
    document.body.appendChild(floatingNav);

    const toggleBtn = document.getElementById('toggle-all');
    const backToTopBtn = document.getElementById('back-to-top');
    const details = document.querySelectorAll('details');
    let allOpen = false;

    // Show floating nav on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            floatingNav.classList.add('visible');
        } else {
            floatingNav.classList.remove('visible');
        }
    });

    // Toggle All functionality
    toggleBtn.addEventListener('click', () => {
        allOpen = !allOpen;
        details.forEach(detail => {
            if (allOpen) {
                detail.setAttribute('open', '');
            } else {
                detail.removeAttribute('open');
            }
        });
        
        // Rotate icon
        toggleBtn.querySelector('svg').style.transform = allOpen ? 'rotate(180deg)' : 'rotate(0)';
    });

    // Back to Top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for TOC links
    document.querySelectorAll('.toc a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Open the details element if it's the target
                if (targetElement.tagName === 'DETAILS') {
                    targetElement.setAttribute('open', '');
                }
                
                const headerOffset = 20;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});