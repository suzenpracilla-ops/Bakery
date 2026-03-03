// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && phone && subject && message) {
            // Show success message
            alert(`Thank you, ${name}! Your message has been sent. We'll contact you shortly at ${phone}.`);
            
            // Reset form
            contactForm.reset();
        } else {
            alert('Please fill in all fields');
        }
    });
}

// Add animation on scroll
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-in';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.product-card, .service-card, .team-member').forEach(el => {
        observer.observe(el);
    });
}

// Add fade-in animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', observeElements);

// Mobile menu toggle (optional - if you add hamburger menu)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Add active class to current page
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = location.pathname;
    const links = document.querySelectorAll('.nav-menu a');
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentLocation || 
            (link.getAttribute('href') === 'index.html' && currentLocation.endsWith('/'))) {
            link.classList.add('active');
        }
    });
});

// Hover effects for product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Simple animation counter for stats
function animateCounter() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        const h3 = card.querySelector('h3');
        const text = h3.innerText;
        const number = parseInt(text);
        
        if (number) {
            let count = 0;
            const increment = Math.ceil(number / 30);
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= number) {
                    h3.innerText = text;
                    clearInterval(timer);
                } else {
                    h3.innerText = count + '+';
                }
            }, 30);
        }
    });
}

// Call counter animation when scrolled into view
window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection && !statsSection.hasAttribute('data-animated')) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            animateCounter();
            statsSection.setAttribute('data-animated', 'true');
        }
    }
});