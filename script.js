// Mobile menu functionality
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Back to top functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

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
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Tracking functionality
function trackShipment() {
    const trackingNumber = document.getElementById('tracking-number').value;
    const trackingResult = document.getElementById('tracking-result');
    
    if (!trackingNumber) {
        trackingResult.innerHTML = '<p style="color: red;">Please enter a tracking number</p>';
        return;
    }

    // Simulate tracking API call
    trackingResult.innerHTML = '<p>Searching for shipment...</p>';
    
    setTimeout(() => {
        // This is a mock response - in a real application, this would be an API call
        const mockTrackingData = {
            status: 'In Transit',
            location: 'Distribution Center',
            estimatedDelivery: '2024-04-20',
            lastUpdate: '2024-04-16 14:30'
        };

        trackingResult.innerHTML = `
            <div style="background-color: #f8f9fa; padding: 1rem; border-radius: 5px;">
                <h3>Tracking Results</h3>
                <p><strong>Status:</strong> ${mockTrackingData.status}</p>
                <p><strong>Current Location:</strong> ${mockTrackingData.location}</p>
                <p><strong>Estimated Delivery:</strong> ${mockTrackingData.estimatedDelivery}</p>
                <p><strong>Last Update:</strong> ${mockTrackingData.lastUpdate}</p>
            </div>
        `;
    }, 1500);
}

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    setTimeout(() => {
        // This would be replaced with actual form submission logic
        submitButton.textContent = 'Message Sent!';
        this.reset();
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }, 1500);
});

// Scroll to top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

// Add styles for scroll button
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        font-size: 20px;
        z-index: 1000;
        transition: background-color 0.3s ease;
    }
    .scroll-top:hover {
        background: #2980b9;
    }
`;
document.head.appendChild(style);

// Show/hide scroll button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

// Scroll to top functionality
scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .contact-container > *');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Add initial styles for animation
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .service-card, .contact-container > * {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
`;
document.head.appendChild(animationStyle);

// Trigger animation on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll); 