/**
 * AuraMetrics Client Engine UI Interactivity Scripts
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Hamburger Navigation Engine ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-btn');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) toggleMenu();
    }));


    // --- Advanced Scroll Reveal Engine via Intersection Observer API ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Execution cleanup
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- Numerical Metrics Counter Engine ---
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                let current = 0;
                const duration = 2000; // 2 seconds execution duration
                const increment = target / (duration / 16); // ~60fps evaluation tracking

                // Inject explicit custom indicators contextually
                if (target === 200) counter.setAttribute('data-append', '%');
                if (target === 10) counter.setAttribute('data-append', 'M+');
                if (target === 99) counter.setAttribute('data-append', '.9%');

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));


    // --- Interactive Ecosystem Tabs Logic ---
    const triggers = document.querySelectorAll('.tab-trigger');
    const contents = document.querySelectorAll('.tab-content');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetTab = trigger.getAttribute('data-tab');

            triggers.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            trigger.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });


    // --- Premium Glass Card Mouse Tilt / Parallax Effect ---
    const tiltCards = document.querySelectorAll('.tilt-target');

    if (window.innerWidth > 1024) { // Active only for premium desktop rendering tracks
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - (rect.width / 2);
                const y = e.clientY - rect.top - (rect.height / 2);
                
                // Fine tuned angular limitations
                const factorX = x / (rect.width / 2) * 6; 
                const factorY = y / (rect.height / 2) * -6;

                card.style.transform = `perspective(1000px) rotateX(${factorY}deg) rotateY(${factorX}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }


    // --- Testimonial Carousel Engine ---
    const slider = document.getElementById('testimonialSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    const updateSliderPosition = () => {
        slider.style.transform = `translateX(-${currentIndex * 50}%)`;
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 1) ? 0 : 1; // Cycle linearly across sets
        updateSliderPosition();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? 1 : 0;
        updateSliderPosition();
    });


    // --- Secure AJAX Asynchronous Form Transmission Handlers ---
    const contactForm = document.getElementById('ajaxContactForm');
    const formFeedback = document.getElementById('formFeedback');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        formFeedback.className = 'form-feedback';
        formFeedback.innerText = 'Transmitting data payload securely...';
        formFeedback.classList.add('success');

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            const data = await response.json();

            formFeedback.className = 'form-feedback'; // Reset states
            if (response.ok && data.status === 'success') {
                formFeedback.innerText = data.message;
                formFeedback.classList.add('success');
                contactForm.reset();
            } else {
                formFeedback.innerText = data.message || 'System fault executing validation execution workflows.';
                formFeedback.classList.add('error');
            }
        } catch (error) {
            formFeedback.className = 'form-feedback error';
            formFeedback.innerText = 'Network transmission error detected. Pipeline dropped.';
        }
    });
});