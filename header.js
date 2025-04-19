document.addEventListener('DOMContentLoaded', function() {
    // Create a fallback header if fetch fails
    const createFallbackHeader = () => {
        if (!document.querySelector('header')) {
            const headerHTML = `
            <header>
                <div class="container">
                    <nav>
                        <div class="logo">
                            <i class="fas fa-ship logo-icon"></i>
                            <h1><a href="index.html">Global Shipping</a></h1>
                        </div>
                        <ul class="nav-links">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About</a></li>
                            <li><a href="services.html">Services</a></li>
                            <li><a href="pricing.html">Pricing</a></li>
                            <li><a href="faq.html">FAQ</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                        <div class="mobile-menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </nav>
                </div>
            </header>`;
            document.body.insertAdjacentHTML('afterbegin', headerHTML);

            // Setup mobile menu for fallback header
            setupNavigation();
        }
    };

    // Setup navigation functionality
    const setupNavigation = () => {
        // Set active state based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (linkPage === currentPage.replace(/\.html$/, '') + '.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Mobile menu functionality
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinksContainer = document.querySelector('.nav-links');
        
        if (mobileMenu && navLinksContainer) {
            mobileMenu.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                navLinksContainer.classList.toggle('active');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (mobileMenu && navLinksContainer && 
                    !mobileMenu.contains(e.target) && 
                    !navLinksContainer.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                }
            });
        }
        
        // Header scroll effect
        const header = document.querySelector('header');
        let lastScroll = 0;
        
        if (header) {
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
        }
    };

    // Try to load header via fetch
    try {
        fetch('header.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load header: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                document.body.insertAdjacentHTML('afterbegin', data);
                setupNavigation();
            })
            .catch(error => {
                console.error('Error loading header:', error);
                createFallbackHeader();
            });
    } catch (error) {
        console.error('Error in fetch operation:', error);
        createFallbackHeader();
    }
}); 