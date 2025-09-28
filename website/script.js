// Noircraft Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const opacity = Math.min(scrollTop / 100, 0.95);
        
        navbar.style.background = `rgba(10, 10, 10, ${opacity})`;
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Animated counter for developer stats
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const finalValue = stat.textContent;
                    const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
                    const suffix = finalValue.replace(/[0-9]/g, '');
                    
                    animateCounter(stat, 0, numericValue, 2000, suffix);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.developer-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateCounter(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOutCubic);
            
            element.textContent = current.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end.toLocaleString() + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Parallax effect for floating contracts
    const floatingContracts = document.querySelector('.floating-contracts');
    if (floatingContracts) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            floatingContracts.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Interactive glow effects for template cards
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(244, 196, 48, 0.3), 0 0 30px rgba(138, 43, 226, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
        
        // Add mouse tracking glow effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Terminal typing animation
    const terminalLines = document.querySelectorAll('.terminal-line .typing');
    terminalLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            typeText(line, text, 100);
        }, index * 1000);
    });

    function typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Contract card hover effects with particle system
    const contractCards = document.querySelectorAll('.contract-card');
    contractCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createParticles(this);
        });
    });

    function createParticles(element) {
        const particleCount = 5;
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#f4c430';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            document.body.appendChild(particle);
            
            // Animate particle
            const animation = particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${(Math.random() - 0.5) * 100}px, ${-50 - Math.random() * 50}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => {
                particle.remove();
            };
        }
    }

    // Add CSS for particles
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        .particle {
            box-shadow: 0 0 6px #f4c430;
            filter: blur(0.5px);
        }
    `;
    document.head.appendChild(particleStyle);

    // News item hover effects
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = '#f4c430';
            this.style.boxShadow = '0 10px 30px rgba(244, 196, 48, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });

    // Button click effects
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple effect CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        button, .btn-primary, .btn-secondary {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);

    // Intersection Observer for fade-in animations
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Apply fade-in animation to sections
    const animatedElements = document.querySelectorAll('.template-card, .news-item, .feature-item');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(element);
    });

    // Code syntax highlighting simulation
    const codeContent = document.querySelector('.code-content pre code');
    if (codeContent) {
        const code = codeContent.textContent;
        const highlightedCode = code
            .replace(/\b(fn|let|assert|pub)\b/g, '<span style="color: #ff6b9d;">$1</span>')
            .replace(/\b(Field|main|pedersen_hash)\b/g, '<span style="color: #4ecdc4;">$1</span>')
            .replace(/\/\/.*$/gm, '<span style="color: #95a5a6;">$&</span>')
            .replace(/\b\d+\b/g, '<span style="color: #f39c12;">$&</span>');
        
        codeContent.innerHTML = highlightedCode;
    }

    // Mobile menu toggle (if needed)
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '☰';
    navToggle.style.display = 'none';
    navToggle.style.background = 'transparent';
    navToggle.style.border = 'none';
    navToggle.style.color = '#f4c430';
    navToggle.style.fontSize = '1.5rem';
    navToggle.style.cursor = 'pointer';
    
    // Insert toggle button
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(navToggle);
    
    // Mobile responsive menu
    function checkMobile() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
            navMenu.style.display = 'none';
        } else {
            navToggle.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    }
    
    navToggle.addEventListener('click', function() {
        const isVisible = navMenu.style.display === 'flex';
        navMenu.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) {
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(10, 10, 10, 0.95)';
            navMenu.style.padding = '1rem';
            navMenu.style.backdropFilter = 'blur(10px)';
        }
    });
    
    window.addEventListener('resize', checkMobile);
    checkMobile();

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.toString() === konamiSequence.toString()) {
            activateEasterEgg();
            konamiCode = [];
        }
    });
    
    function activateEasterEgg() {
        // Add rainbow effect to logo
        const logo = document.querySelector('.logo-text');
        if (logo) {
            logo.style.animation = 'rainbow 2s infinite';
            
            // Add rainbow animation CSS
            const rainbowStyle = document.createElement('style');
            rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { color: #ff0000; }
                    16% { color: #ff8000; }
                    33% { color: #ffff00; }
                    50% { color: #80ff00; }
                    66% { color: #00ffff; }
                    83% { color: #8000ff; }
                    100% { color: #ff0000; }
                }
            `;
            document.head.appendChild(rainbowStyle);
            
            // Show easter egg message
            const message = document.createElement('div');
            message.textContent = '🎉 You found the secret! Privacy is magic! 🎉';
            message.style.position = 'fixed';
            message.style.top = '50%';
            message.style.left = '50%';
            message.style.transform = 'translate(-50%, -50%)';
            message.style.background = 'rgba(244, 196, 48, 0.9)';
            message.style.color = '#0a0a0a';
            message.style.padding = '2rem';
            message.style.borderRadius = '10px';
            message.style.fontSize = '1.5rem';
            message.style.fontWeight = 'bold';
            message.style.zIndex = '10000';
            message.style.textAlign = 'center';
            message.style.boxShadow = '0 0 50px rgba(244, 196, 48, 0.8)';
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
                logo.style.animation = '';
            }, 3000);
        }
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('🚀 Noircraft Performance Metrics:');
            console.log(`📊 Page Load Time: ${Math.round(perfData.loadEventEnd - perfData.navigationStart)}ms`);
            console.log(`🎨 DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart)}ms`);
            console.log(`⚡ Time to Interactive: ${Math.round(perfData.domInteractive - perfData.navigationStart)}ms`);
        }, 0);
    });
}
