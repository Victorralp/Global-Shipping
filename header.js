document.addEventListener('DOMContentLoaded', function() {
    // Include header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Set active state based on current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('.nav-links a');
            
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href');
                if (linkPage === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            // Mobile menu functionality
            const mobileMenu = document.querySelector('.mobile-menu');
            const navLinksContainer = document.querySelector('.nav-links');
            
            mobileMenu.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                navLinksContainer.classList.toggle('active');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !navLinksContainer.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                }
            });
            
            // Header scroll effect
            const header = document.querySelector('header');
            let lastScroll = 0;
            
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 0) {
                    header.classList.remove('scrolled');
                    return;
                }
                
                if (currentScroll > lastScroll && !header.classList.contains('scrolled')) {
                    header.classList.add('scrolled');
                }
                
                lastScroll = currentScroll;
            });
        });
}); 