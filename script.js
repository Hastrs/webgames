document.addEventListener('DOMContentLoaded', function() {
    // Global scroll tracking variables
    window.lastScrollTime = 0;
    window.scrollThreshold = 80; // ms between scroll updates
    window.scrollCallbacks = [];
    
    // Setup unified scroll handler
    setupGlobalScrollHandler();
    
    // Initialize components
    initializeHeroSection();
    initializeTimelineSection();
    initializeFeaturedGamesSection();
    initializeTechnologySection();
    initializeCTASection();
});

// Define unified scroll handler for improved performance
function setupGlobalScrollHandler() {
    let ticking = false;
    
    // Method to add functions to scroll handler list
    window.addScrollHandler = function(callback) {
        window.scrollCallbacks.push(callback);
    };
    
    // Unified scroll handler
    window.addEventListener('scroll', function() {
        const lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const now = Date.now();
                // Only execute functions if enough time has passed
                if (now - window.lastScrollTime > window.scrollThreshold) {
                    window.lastScrollTime = now;
                    
                    // Execute all registered scroll handlers
                    for (let i = 0; i < window.scrollCallbacks.length; i++) {
                        window.scrollCallbacks[i](lastScrollY);
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Function to initialize Hero Section
function initializeHeroSection() {
    // Initialize particles.js for background effects
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6b46c1"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6b46c1",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Animate title with typewriter effect
    const titleLines = document.querySelectorAll('.title-line');
    animateTitleSequentially(titleLines);

    // Smooth scroll for "Learn the History" button
    const primaryButton = document.querySelector('.primary-button');
    if (primaryButton) {
        primaryButton.addEventListener('click', function() {
            const timelineSection = document.querySelector('.timeline');
            if (timelineSection) {
                window.scrollTo({
                    top: timelineSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add glitch effect to title on hover
    const highlightTitle = document.querySelector('.title-line.highlight');
    if (highlightTitle) {
        highlightTitle.addEventListener('mouseenter', function() {
            this.classList.add('glitch-effect');

            // Create glitch animation
            const glitchAnimation = this.animate([
                { transform: 'translate(-2px, 0)' },
                { transform: 'translate(2px, -2px)' },
                { transform: 'translate(-1px, 1px)' },
                { transform: 'translate(1px, -1px)' },
                { transform: 'translate(-2px, 2px)' },
                { transform: 'translate(2px, -2px)' },
                { transform: 'translate(0, 0)' }
            ], {
                duration: 500,
                iterations: 1
            });

            // Remove class after animation completes
            glitchAnimation.onfinish = () => {
                this.classList.remove('glitch-effect');
            };
        });
    }

    // Add interactive grid effect
    const heroSection = document.querySelector('.hero-section');
    const gridLines = document.querySelector('.grid-lines');

    if (heroSection && gridLines) {
        heroSection.addEventListener('mousemove', function(e) {
            // Calculate mouse position as percentage of hero section
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            // Move grid lines slightly based on mouse position
            gridLines.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
        });
    }
}

function initializeTimelineSection() {
    // Timeline elements
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineLine = document.querySelector('.timeline-line');
    const timeline = document.querySelector('.timeline');

    // Set initial line height to 0
    if (timelineLine) {
        timelineLine.style.height = '0';
    }

    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Create era labels once on load
    timelineItems.forEach(item => {
        if (!item.querySelector('.era-label')) {
            const isRight = item.querySelector('.timeline-content.right') !== null;
            const era = item.getAttribute('data-era');
            if (era) {
                const label = document.createElement('div');
                label.className = 'era-label';
                label.textContent = era;
                label.style.cssText = `
                    position: absolute;
                    top: -35px;
                    ${isRight ? 'right: 0; text-align: right;' : 'left: 0; text-align: left;'}
                    font-size: 28px;
                    font-weight: bold;
                    color: #6b46c1;
                    background-color: rgba(10, 10, 24, 0.1);
                    padding: 2px 10px;
                    border-radius: 5px;
                    z-index: 100;
                `;
                item.prepend(label);
            }
        }
    });

    // Ensure era elements are visible
    function ensureEraVisibility() {
        const eraElements = document.querySelectorAll('.timeline-era');
        eraElements.forEach(era => {
            era.style.display = 'block';
            era.style.visibility = 'visible';
            era.style.opacity = '1';
            era.style.animation = 'textGlow 2s infinite alternate';
        });
    }
    setTimeout(ensureEraVisibility, 500);

    // Throttle for scroll events to improve performance
    let lastScrollTime = 0;
    const scrollThreshold = 50; // ms between scroll updates

    // Main timeline animation function with throttling
    function animateTimelineItems() {
        const now = Date.now();
        if (now - lastScrollTime < scrollThreshold) return;
        lastScrollTime = now;

        let activeItemsCount = 0;

        timelineItems.forEach((item, index) => {
            if (isElementInViewport(item)) {
                item.classList.add('active');
                activeItemsCount = index + 1;

                // Add special animation for the current era
                const dot = item.querySelector('.timeline-dot');
                if (dot && !dot.hasAnimation) {
                    dot.style.animation = 'pulseGlow 2s infinite';
                    dot.hasAnimation = true;
                }
            } else if (window.scrollY < item.offsetTop) {
                item.classList.remove('active');

                // Remove animation from dots that are not in view
                const dot = item.querySelector('.timeline-dot');
                if (dot) {
                    dot.style.animation = 'none';
                    dot.hasAnimation = false;
                }
            }
        });

        // Calculate and set the line height based on active items
        if (activeItemsCount > 0 && timelineLine) {
            const lastActiveItem = timelineItems[activeItemsCount - 1];
            const lineHeight = lastActiveItem.offsetTop + lastActiveItem.offsetHeight - timelineItems[0].offsetTop;
            timelineLine.style.height = `${lineHeight}px`;
        }
    }

    // Separate function for parallax effects to improve performance
    function applyParallaxEffects() {
        const now = Date.now();
        if (now - lastScrollTime < scrollThreshold) return;

        const scrollPosition = window.scrollY;

        // Apply parallax effect to timeline items that are active
        timelineItems.forEach(item => {
            if (item.classList.contains('active')) {
                const image = item.querySelector('.timeline-image');
                if (image) {
                    // Limit the parallax effect to prevent overflow
                    const offset = Math.min(Math.max((scrollPosition - item.offsetTop) * 0.03, -5), 5);
                    image.style.transform = `translateY(${offset}px)`;
                }
            }
        });

        // Apply glow effect to timeline line
        if (timelineLine && timeline) {
            const timelineTop = timeline.offsetTop;
            const timelineHeight = timeline.offsetHeight;
            const scrollProgress = Math.min(
                Math.max((scrollPosition - timelineTop) / timelineHeight, 0),
                1
            );
            const glowIntensity = Math.min(scrollProgress * 2, 1);
            timelineLine.style.boxShadow = `0 0 ${15 + glowIntensity * 10}px rgba(107, 70, 193, ${0.5 + glowIntensity * 0.3})`;
        }
    }

    // Combined scroll handler for better performance
    function scrollHandler() {
        animateTimelineItems();
        applyParallaxEffects();
    }

    // Check timeline items on load
    animateTimelineItems();

    // Single scroll event listener to improve performance
    window.addScrollHandler(scrollHandler);

    // Add optimized hover interaction
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Create fewer particles for better performance
            createParticles(item, 8);
        });
    });
}

// Featured Games Section 
function initializeFeaturedGamesSection() {
    const gameCards = document.querySelectorAll('.game-card');
    const featuredSection = document.querySelector('.featured-games');
    
    // Reset initial styles - important!
    gameCards.forEach((card, index) => {
        // Set correct animation delay variable
        card.style.setProperty('--i', index);
        
        // Reset animations and opacity for clean start
        card.style.removeProperty('animation');
        card.style.opacity = '0';
        card.style.transform = index % 2 === 0 ? 'translateY(30px)' : 'translateX(30px)';
        card.classList.remove('in-view');
        
        // Add hover effect only
        card.addEventListener('mousemove', function(e) {
            if (!card.classList.contains('in-view')) return;
            
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const maxRotation = 5;
            const rotateY = (mouseX / cardRect.width) * maxRotation;
            const rotateX = ((mouseY / cardRect.height) * -maxRotation);
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            if (card.classList.contains('in-view')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Function to check and animate cards when they come into view
    function checkCardsVisibility() {
        const windowBottom = window.scrollY + window.innerHeight;
        const sectionTop = featuredSection.offsetTop;
        
        // If section is visible
        if (windowBottom > sectionTop) {
            gameCards.forEach((card, index) => {
                // Add staggered animation delay
                setTimeout(() => {
                    // Apply active state animation
                    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.classList.add('in-view');
                }, index * 150); // 150ms staggered delay between cards
            });
            
            // Remove scroll listener once animation is triggered
            window.removeEventListener('scroll', scrollCheck);
        }
    }
    
    // Scroll check with throttling
    let scrollTimeout;
    function scrollCheck() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkCardsVisibility, 100);
    }
    
    // Initial check
    checkCardsVisibility();
    
    // Add scroll listener
    window.addEventListener('scroll', scrollCheck);
}


function initializeTechnologySection() {
    // Animate technology section elements when scrolled into view
    const techEras = document.querySelectorAll('.tech-era');
    const modernEras = document.querySelectorAll('.modern-era');
    const consoleImage = document.querySelector('.console-image');
    const consoleGlow = document.querySelector('.console-glow');
    const techSection = document.querySelector('.technology-section');
    
    let techSectionTop = 0;
    let techSectionHeight = 0;
    
    if (techSection) {
        techSectionTop = techSection.offsetTop;
        techSectionHeight = techSection.offsetHeight;
        
        window.addEventListener('resize', function() {
            techSectionTop = techSection.offsetTop;
            techSectionHeight = techSection.offsetHeight;
        }, { passive: true });
    }

    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to animate technology section
    function animateTechSection(scrollY) {
        // Animate left column items
        techEras.forEach((era, index) => {
            if (isElementInViewport(era) && !era.classList.contains('active')) {
                setTimeout(() => {
                    era.classList.add('active');
                }, index * 200); // Staggered animation
            }
        });

        // Animate right column items
        modernEras.forEach((era, index) => {
            if (isElementInViewport(era) && !era.classList.contains('active')) {
                setTimeout(() => {
                    era.classList.add('active');
                }, index * 200 + 400); // Staggered animation with delay
            }
        });

        // Animate console image
        if (consoleImage && isElementInViewport(consoleImage) && !consoleImage.classList.contains('active')) {
            consoleImage.classList.add('active');

            // Activate glow effect after image appears
            setTimeout(() => {
                if (consoleGlow) {
                    consoleGlow.classList.add('active');
                }
            }, 500);
        }
    }

    // Add to unified scroll handler
    window.addScrollHandler(animateTechSection);

    // Initial animation check
    animateTechSection(window.scrollY);

    // Add subtle parallax effect to background images
    const techBackground = document.querySelector('.tech-background');
    if (techBackground) {
        window.addScrollHandler(function(scrollY) {
            if (!techSection) return;
            
            // Only apply if tech section is in view
            if (scrollY + window.innerHeight < techSectionTop || scrollY > techSectionTop + techSectionHeight) {
                return;
            }
            
            const bgOffset = (scrollY - techSectionTop) * 0.1;
            techBackground.style.transform = `translateY(${bgOffset}px)`;
        });
    }
}

// Fixed CTA Section with functional pagination dots
function initializeCTASection() {
    // CTA button hover effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(107, 70, 193, 0.7)';
        });

        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(107, 70, 193, 0.6)';
        });

        // Add click effect
        ctaButton.addEventListener('click', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(107, 70, 193, 0.5)';

            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 8px 25px rgba(107, 70, 193, 0.6)';

                // Would typically navigate to a contact form
                alert('Ready to start creating your gaming website! This would navigate to a contact or project setup page.');
            }, 200);
        });

        // Animate CTA items when they come into view
const ctaItems = document.querySelectorAll('.cta-container li');

// Function to check if CTA item is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Scroll animation for CTA items
function animateCTAItems(scrollY) {
    ctaItems.forEach((item, index) => {
        if (isElementInViewport(item)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Add to global scroll handler
window.addScrollHandler(animateCTAItems);

// Run it once on page load
animateCTAItems(window.scrollY);

    }

    // Fix pagination dots functionality
    const paginationDots = document.querySelectorAll('.pagination-dots .dot');
    
    // Define sections to navigate to (correctly formatted selectors)
    const sections = [
        '.hero-section',
        '.timeline',
        '.featured-games',
        '.technology-section'
    ];
    
    if (paginationDots.length > 0) {
        paginationDots.forEach((dot, index) => {
            // Fix active state initially
            if (index === 0) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', function() {
                // Remove active class from all dots
                paginationDots.forEach(d => d.classList.remove('active'));
                
                // Add active class to clicked dot
                this.classList.add('active');
                
                // Scroll to corresponding section
                if (index < sections.length) {
                    const targetSection = document.querySelector(sections[index]);
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    const ctaParagraph = document.querySelector('.cta-container p');
    // Function to animate paragraph
function animateCTAText(scrollY) {
    if (ctaParagraph && isElementInViewport(ctaParagraph)) {
        ctaParagraph.classList.add('active');
    } else {
        ctaParagraph.classList.remove('active');
    }
}

window.addScrollHandler(animateCTAText);

animateCTAText(window.scrollY);

    // Social link hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
}

// Utility function to animate title with typewriter effect
function animateTitleSequentially(elements) {
    elements.forEach((element, index) => {
        // Get original text
        const originalText = element.textContent;

        // Clear text initially
        element.textContent = '';

        // Calculate delay based on index
        const delay = index * 800; // 800ms delay between lines

        // Start animation after delay
        setTimeout(() => {
            let charIndex = 0;

            // Type characters one by one
            const typeInterval = setInterval(() => {
                if (charIndex < originalText.length) {
                    element.textContent += originalText.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50); // 50ms between characters
        }, delay);
    });
}

// Optimized particle creation for better performance
function createParticles(element, count = 8) {
    // Limit active particles
    if (element.particlesActive) return;
    element.particlesActive = true;
    
    // Create particles
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position around the element
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

        // Random size
        const size = Math.random() * 4 + 2;

        // Set particle properties
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;

        // Random color (purple to pink gradient)
        const hue = Math.random() * 60 + 260; // 260 to 320 (purple to pink)
        particle.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;

        // Add to element
        element.appendChild(particle);

        // Animate particles
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        const distance = Math.random() * 100 + 50;

        // Calculate destination
        const destX = posX + Math.cos(angle) * distance;
        const destY = posY + Math.sin(angle) * distance;

        // Apply animation
        if (typeof particle.animate === 'function') {
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${destX - posX}px, ${destY - posY}px) scale(0)`, opacity: 0 }
            ], {
                duration: speed * 1000,
                easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
            });
        }

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode === element) {
                element.removeChild(particle);
            }
        }, speed * 1000);
    }
    
    // Reset flag after some time
    setTimeout(() => {
        element.particlesActive = false;
    }, 500);
}
