/*
 * JavaScript file for inner pages of Protonetix Website
 * Contains functionality specific to about, services, gallery, products, and collaborations pages
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Pages.js loaded successfully");
    
    // Initialize page-specific functionality
    initTabSwitching();
    initScrollToAnchor();
    initDownloadTracking();
    initCounterAnimation();
    
    // Page-specific initializations
    if (document.querySelector('.timeline')) {
        initTimelineAnimations();
    }
    
    if (document.querySelector('.faq-item')) {
        initFaqToggle();
    }
    
    if (document.querySelector('.folder-link')) {
        initGalleryFolders();
    }

    // Add animation class to all visible elements
    initVisibilityAnimation();
});

// Tab switching functionality for all pages with tabs
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (!tabButtons.length) return;
    
    console.log("Initializing tab switching");
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            const tabsContainer = this.closest('.tab-buttons');
            const tabsContent = tabsContainer.nextElementSibling;
            
            tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            tabsContent.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding pane
            const tabId = this.getAttribute('data-tab');
            const tabPane = document.getElementById(tabId);
            if (tabPane) {
                tabPane.classList.add('active');
            }
        });
    });
}

// Smooth scroll to anchor links
function initScrollToAnchor() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or it's a tab button
            if (targetId === '#' || this.classList.contains('tab-btn')) {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without actually navigating
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Track downloads for curriculum and brochures
function initDownloadTracking() {
    const downloadButtons = document.querySelectorAll('.download-btn, [download]');
    if (!downloadButtons.length) return;
    
    console.log("Initializing download tracking");
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fileInfo = this.getAttribute('data-file') || this.getAttribute('href').split('/').pop();
            console.log(`Download initiated: ${fileInfo}`);
        });
    });
}

// Animate timeline items when they come into view
function initTimelineAnimations() {
    console.log("Initializing timeline animations");
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Initially show timeline items on page load
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animated');
        }, index * 200);
    });
    
    // Add animation CSS class
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .timeline-item.animated {
            opacity: 1;
            transform: translateY(0);
        }
        .timeline-item:nth-child(odd).animated {
            transform: translateX(0);
        }
        .timeline-item:nth-child(even).animated {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
}

// FAQ accordion functionality
function initFaqToggle() {
    console.log("Initializing FAQ toggle");
    
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Close all other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
}

// Initialize counter animations
function initCounterAnimation() {
    console.log("Initializing counter animations");
    
    const counterElements = document.querySelectorAll('.stat-number[data-count]');
    if (!counterElements.length) return;
    
    counterElements.forEach(counter => {
        const countTo = parseInt(counter.getAttribute('data-count'));
        animateCounter(counter, 0, countTo, 2000);
    });
}

// Animation helper for counters
function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        element.textContent = value.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Initialize gallery folders
function initGalleryFolders() {
    console.log("Initializing gallery folders");
    
    const folderLinks = document.querySelectorAll('.folder-link');
    if (!folderLinks.length) return;
    
    // Set up click handlers for gallery folders
    folderLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const folderId = this.getAttribute('data-folder');
            console.log(`Folder clicked: ${folderId}`);
            
            // In a real implementation, this would open a modal or navigate to a folder page
            // For now, let's log it
            alert(`Gallery folder "${folderId}" would open here.`);
        });
    });
}

// Add aos-animate class to elements as they become visible
function initVisibilityAnimation() {
    console.log("Initializing visibility animations");
    
    // For elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    if (!animatedElements.length) return;
    
    // Add aos-animate class to initially visible elements
    animatedElements.forEach(element => {
        element.classList.add('aos-animate');
    });
}

// Add CSS class when page is scrolled
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Highlight active section in navigation
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}` || 
                    link.getAttribute('href') === `./${sectionId}.html`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Show back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (scrollPosition > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});