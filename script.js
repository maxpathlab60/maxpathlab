document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between hamburger and close
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // // Simple Form Submission (Demo)
    // const contactForm = document.querySelector('#contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         alert('Thank you for your message! We will contact you shortly.');
    //         contactForm.reset();
    //     });
    // }

    // Animation on Scroll (Simple Fade-in)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .about-content, .about-image').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Search functionality for book-test.html
    const searchInput = document.querySelector('.search-box input');
    const testCards = document.querySelectorAll('.test-card');

    if (searchInput && testCards) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            testCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const meta = card.querySelector('.test-meta').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || meta.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Carousel Functionality
    const setupCarousel = (carouselId) => {
        const carousel = document.querySelector(carouselId);
        if (!carousel) return;

        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const indicators = Array.from(carousel.querySelectorAll('.carousel-indicator'));
        
        if (slides.length === 0) return;

        // Get slide width including gap
        const getSlideWidth = () => {
            const slideStyle = window.getComputedStyle(slides[0]);
            const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
            return slides[0].getBoundingClientRect().width + gap;
        };

        let slideWidth = getSlideWidth();

        // Arrange slides next to each other (not needed with flex gap, but needed for calculation)
        // With flex gap, we just translate by index * (width + gap)
        
        const moveToSlide = (currentSlide, targetSlide, index) => {
            track.style.transform = 'translateX(-' + (index * slideWidth) + 'px)';
            
            // Update indicators
            const currentDot = carousel.querySelector('.current-slide');
            if (currentDot) currentDot.classList.remove('current-slide');
            if (indicators[index]) indicators[index].classList.add('current-slide');
        };

        // Click on indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                const currentSlide = track.querySelector('.current-slide'); // We aren't using this class on slides currently
                const targetSlide = slides[index];
                moveToSlide(currentSlide, targetSlide, index);
                
                // Reset autoplay timer on interaction
                resetAutoplay();
            });
        });

        // Autoplay
        let currentIndex = 0;
        let autoplayInterval;

        const startAutoplay = () => {
            autoplayInterval = setInterval(() => {
                currentIndex++;
                if (currentIndex >= slides.length) { // Or logic to loop back cleanly
                    // Simple loop back
                    currentIndex = 0;
                }
                
                // Check if we can scroll further. 
                // For a continuous look, we might want to check if the last slide is fully visible.
                // But for now, simple index based.
                // Wait, if visible area shows multiple slides, we shouldn't scroll one by one necessarily, or we should limit max index.
                // Let's keep it simple: scroll one by one, loop back to 0.
                
                // Adjust for visible slides?
                // If container width < total width, we scroll.
                // Let's just scroll to index. 
                // If we reach the end where no more content to scroll, we might want to go back to 0.
                
                // Improve loop logic:
                // Calculate max index based on container width
                const containerWidth = carousel.querySelector('.carousel-track-container').getBoundingClientRect().width;
                const totalWidth = slides.length * slideWidth;
                const maxTranslate = totalWidth - containerWidth;
                
                // Actually, let's just loop through all indicators.
                if (currentIndex >= indicators.length) currentIndex = 0;

                moveToSlide(null, slides[currentIndex], currentIndex);
            }, 3000); // 3 seconds
        };

        const resetAutoplay = () => {
            clearInterval(autoplayInterval);
            startAutoplay();
        };

        // Recalculate on resize
        window.addEventListener('resize', () => {
            slideWidth = getSlideWidth();
            // Reset position
            moveToSlide(null, slides[currentIndex], currentIndex);
        });

        startAutoplay();
    };

    setupCarousel('#packages-carousel');
    setupCarousel('#testimonials-carousel');
});
