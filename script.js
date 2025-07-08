document.addEventListener('DOMContentLoaded', () => {

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger not loaded');
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const heroTimeline = gsap.timeline({ delay: 0.2 });
    heroTimeline
        .to('.navbar', { y: 0, duration: 1, ease: 'power3.out' })
        .to('.hero-text-content', { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', duration: 1.2, ease: 'expo.out' }, '-=0.5')
        .fromTo(['.hero-text-content h1', '.hero-text-content p', '.hero-icons'], { y: 30 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out' }, '-=1')
        .to('.hero-image-container', { opacity: 1 }, 0.5)
        .to('.image-reveal-overlay', { scaleX: 0, duration: 1.2, ease: 'expo.inOut', transformOrigin: 'right center'}, 0.7)
        .to('.hero-image-container img', { scale: 1, duration: 1.6, ease: 'power2.inOut' }, 0.7)
        
        // === MODIFIED GLITCH LINE ANIMATION (ANIMATE-ONCE) ===
        .to('.glitch-line', {
            transform: 'translate(-50%, -50%) rotate(-35deg)', // Final, static position
            opacity: 0.5,
            duration: 1.5,
            ease: 'power2.inOut'
        }, 1.2); // Starts after image reveal has begun


    // --- All other GSAP timelines for other sections remain unchanged ---
    gsap.to('.interlude-content-container', {
        opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.interlude-section', start: 'top 70%' }
    });
    const highlightTimeline = gsap.timeline({
        scrollTrigger: { trigger: '.highlight-section', start: 'top 60%' }
    });
    highlightTimeline
        .to('.split-text', { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
        .to('.split-image img', { opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' }, '-=0.8');
    const path = document.querySelector('#mountain-path');
    if(path) {
        const pathLength = path.getTotalLength();
        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        const journeyTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.journey-section', start: 'top top', end: '+=2000', scrub: 1.5, pin: true, anticipatePin: 1,
                onUpdate: self => { if (self.direction === -1) { self.scroll(self.start - 1); } }
            }
        });
        journeyTimeline
            .to('.info-panel', { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 0)
            .to(path, { strokeDashoffset: 0, ease: 'none', duration: 2 }, 0.2)
            .to('#fact1', { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.5)
            .to('#fact2', { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 1.1)
            .to('#fact3', { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 1.6);
    }
});