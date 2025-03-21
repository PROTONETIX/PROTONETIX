/*
 * Animations JavaScript file for Protonetix Website
 * Contains advanced animations and scroll effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize parallax effect
    initParallaxEffect();
    
    // Initialize custom hover animations
    initHoverAnimations();
    
    // Initialize scroll-triggered animations
    initScrollEffects();
});

// Create parallax scrolling effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-image, .about-image');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = 0.05;
            const yPos = -(scrollY * speed);
            
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Add custom hover animations
function initHoverAnimations() {
    // Solution cards hover effect
    const solutionCards = document.querySelectorAll('.solution-card');
    
    solutionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.solution-icon').style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.solution-icon').style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // Button hover effect
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            createRippleEffect(e, button);
        });
    });
    
    // Create ripple effect on buttons
    function createRippleEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Add scroll-triggered effects and animations
function initScrollEffects() {
    // Animate section headers when they come into view
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate the underline
                const underline = document.createElement('span');
                underline.classList.add('animated-underline');
                entry.target.appendChild(underline);
                
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    sectionHeaders.forEach(header => {
        headerObserver.observe(header);
    });
    
    // Create staggered animation for solution cards
    const solutionCards = document.querySelectorAll('.solution-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                }, index * 150);
                
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    solutionCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Add subtle floating animation to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        // Add different animation duration for each card to create a more organic feel
        const animationDuration = 3 + (index * 0.5);
        card.style.animation = `float ${animationDuration}s ease-in-out infinite`;
    });
    
    // Add fade-in animations to contact form fields on scroll
    const formGroups = document.querySelectorAll('.form-group');
    
    const formObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                }, index * 100);
                
                formObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    formGroups.forEach(group => {
        formObserver.observe(group);
    });
}

// Add CSS class for the stagger animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    .fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .animated-underline {
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 0;
        height: 4px;
        background-color: var(--sky-blue);
        animation: expandWidth 1s ease forwards 0.2s;
    }
    
    @keyframes expandWidth {
        from { width: 0; }
        to { width: 60px; }
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
</style>
`);

// Add a typing animation effect to the hero heading
function initTypingEffect() {
    const heroHeading = document.querySelector('.hero h1');
    
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        heroHeading.style.opacity = '1';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }
}

// Initialize the typing effect with a delay
setTimeout(initTypingEffect, 500);