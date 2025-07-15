// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .contact-btn');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    // Mobile menu toggle functionality
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-menu-open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('mobile-menu-open');
        }
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('mobile-menu-open');
        });
    });
    
    // Add click event listeners to navigation links for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            let targetSection;
            
            // Handle special cases for navigation
            if (targetId === '#home') {
                targetSection = document.querySelector('.hero');
            } else if (targetId === '#contact') {
                targetSection = document.querySelector('.contact');
            } else {
                targetSection = document.querySelector(targetId);
            }
            
            if (targetSection) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Smooth scroll to target section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight current section in navigation
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            let sectionId = section.getAttribute('id');
            
            // Handle special case for hero section
            if (section.classList.contains('hero')) {
                sectionId = 'home';
            }
            
            const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial call to set active nav link
    updateActiveNavLink();
    
    // Add animation on scroll for elements
    function animateOnScroll() {
        const skillItems = document.querySelectorAll('.skill-item');
        const projectImages = document.querySelectorAll('.project-img');
        const sectionHeaders = document.querySelectorAll('.section-header');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe skill items
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
        
        // Observe project images
        projectImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'translateY(30px)';
            img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(img);
        });
        
        // Observe section headers
        sectionHeaders.forEach(header => {
            header.style.opacity = '0';
            header.style.transform = 'translateY(50px)';
            header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(header);
        });
    }
    
    // Initialize animations
    animateOnScroll();
    
    // Add parallax effect to hero section
    function addParallaxEffect() {
        const hero = document.querySelector('.hero');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (hero) {
                hero.style.backgroundPosition = `center ${rate}px`;
            }
        });
    }
    
    // Initialize parallax effect
    addParallaxEffect();
    
    // Add typing effect to hero text
    function addTypingEffect() {
        const heroName = document.querySelector('.hero-name');
        const originalText = heroName.textContent;
        
        heroName.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroName.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Initialize typing effect
    addTypingEffect();
    
    // Add hover effects to project images
    function addProjectHoverEffects() {
        const projectImages = document.querySelectorAll('.project-img');
        
        projectImages.forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 20px 40px rgba(255, 255, 255, 0.1)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Initialize project hover effects
    addProjectHoverEffects();
    
    // Add scroll progress indicator
    function addScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.width = '0%';
        progressBar.style.height = '3px';
        progressBar.style.background = 'linear-gradient(90deg, #ffffff, #cccccc)';
        progressBar.style.zIndex = '1001';
        progressBar.style.transition = 'width 0.1s ease';
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            progressBar.style.width = scrollPercentage + '%';
        });
    }
    
    // Initialize scroll progress
    addScrollProgress();
    
    // Add smooth reveal animations for contact section
    function revealContactSection() {
        const contactElements = document.querySelectorAll('.contact-content > *');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1
        });
        
        contactElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
    
    // Initialize contact section animations
    revealContactSection();
    
    // Add window resize handler
    function handleResize() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            navMenu.classList.remove('mobile-menu-open');
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Add CSS for active nav link
    const navActiveCSS = `
        .nav-link.active {
            color: #cccccc;
            text-decoration: underline;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = navActiveCSS;
    document.head.appendChild(styleSheet);
    
    // Add click effect to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 5) + 'px';
            ripple.style.top = (e.clientY - rect.top - 5) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleCSS = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    const rippleStyleSheet = document.createElement('style');
    rippleStyleSheet.textContent = rippleCSS;
    document.head.appendChild(rippleStyleSheet);
});

// Add Easter egg - konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        // Easter egg activated - rainbow effect
        document.body.style.animation = 'rainbow 3s ease-in-out';
        
        // Add rainbow animation CSS
        const rainbowCSS = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                25% { filter: hue-rotate(90deg); }
                50% { filter: hue-rotate(180deg); }
                75% { filter: hue-rotate(270deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = rainbowCSS;
        document.head.appendChild(styleSheet);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
        
        konamiCode = [];
    }
});

// Add floating animation to hero logo
document.addEventListener('DOMContentLoaded', function() {
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) {
        heroLogo.style.animation = 'float 6s ease-in-out infinite';
        
        const floatCSS = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = floatCSS;
        document.head.appendChild(styleSheet);
    }
});