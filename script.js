// ============================================
// LANDING PAGE - ENVELOPE & LETTER CLICK
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const letter = document.getElementById('letter');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const envelope = document.getElementById('envelope');
    const envelopeFlap = document.getElementById('envelopeFlap');
    let isOpened = false;
    
    if (letter && envelopeContainer && envelope && envelopeFlap) {
        // Click envelope to open flap and show letter
        envelopeContainer.addEventListener('click', function(e) {
            // Don't trigger if clicking on the letter itself
            if (e.target.closest('.letter')) {
                return;
            }
            
            if (!isOpened) {
                isOpened = true;
                envelopeFlap.classList.add('open');
                
                // Show letter after flap opens
                setTimeout(function() {
                    letter.classList.add('show');
                    
                    // Add hover effect after letter appears
                    setTimeout(function() {
                        letter.addEventListener('mouseenter', function() {
                            letter.style.transform = 'translateX(-50%) translateY(-30px) scale(1.05)';
                        });
                        
                        letter.addEventListener('mouseleave', function() {
                            letter.style.transform = 'translateX(-50%) translateY(-20px) scale(1)';
                        });
                    }, 500);
                }, 400);
            }
        });
        
        // Click letter to navigate to main page
        letter.addEventListener('click', function() {
            // Add exit animation
            envelopeContainer.style.animation = 'envelopeOpen 0.8s ease-out forwards';
            
            setTimeout(function() {
                window.location.href = 'invitation.html';
            }, 800);
        });
    }
    
    // ============================================
    // MAIN PAGE ANIMATIONS
    // ============================================
    
    // Parallax effect for clouds
    const parallaxClouds = document.querySelectorAll('.parallax-cloud');
    let scrollPosition = 0;
    
    function updateParallax() {
        scrollPosition = window.pageYOffset;
        
        parallaxClouds.forEach((cloud, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrollPosition * speed);
            // Parallax effect: clouds move sideways as user scrolls
            const xPos = (scrollPosition * (0.2 + index * 0.05)) % (window.innerWidth + 200) - 200;
            cloud.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    
    // Floating balloon scroll animation - Bear in Hot Air Balloon Floating Up
    const floatingBalloon = document.querySelector('.floating-balloon');
    const floatingBalloonSection = document.getElementById('floatingBalloon');
    
    if (floatingBalloon && floatingBalloonSection) {
        // Initial fade in when section comes into view
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };
        
        const balloonObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    floatingBalloon.style.opacity = '0';
                    floatingBalloon.style.transform = 'translateY(100px)';
                    floatingBalloon.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                    
                    setTimeout(function() {
                        floatingBalloon.style.opacity = '1';
                        floatingBalloon.style.transform = 'translateY(0)';
                    }, 200);
                    
                    balloonObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        floatingBalloonSection.style.opacity = '0';
        balloonObserver.observe(floatingBalloonSection);
        
        // Scroll-based floating upward animation
        let lastScrollY = 0;
        let balloonBaseY = 0;
        
        function updateFloatingBalloon() {
            const scrollY = window.pageYOffset;
            const sectionTop = floatingBalloonSection.offsetTop;
            const sectionHeight = floatingBalloonSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Check if section is in viewport
            if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
                // Calculate how far into the section we've scrolled
                const scrollProgress = Math.max(0, Math.min(1, (scrollY + windowHeight - sectionTop) / (sectionHeight + windowHeight)));
                
                // Float upward as user scrolls (slow and soft motion)
                const floatAmount = -scrollProgress * 150; // Moves up 150px max
                floatingBalloon.style.transform = `translateY(${floatAmount}px)`;
                floatingBalloon.style.transition = 'transform 0.1s ease-out';
            }
            
            lastScrollY = scrollY;
        }
        
        window.addEventListener('scroll', updateFloatingBalloon);
        updateFloatingBalloon(); // Initial call
    }
    
    // Bible verse fade in
    const bibleVerse = document.getElementById('bibleVerse');
    if (bibleVerse) {
        const verseObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'all 1s ease-out';
                    
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                    
                    verseObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        bibleVerse.style.opacity = '0';
        verseObserver.observe(bibleVerse);
    }
    
    // Polaroid photos animation
    const polaroidFrames = document.querySelectorAll('.polaroid-frame');
    if (polaroidFrames.length > 0) {
        const photoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-100px) rotate(-10deg)';
                    entry.target.style.transition = 'all 0.8s ease-out';
                    
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0) rotate(-2deg)';
                    }, 100);
                    
                    photoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        polaroidFrames.forEach(function(frame) {
            frame.style.opacity = '0';
            photoObserver.observe(frame);
        });
    }
    
    // Godparents section animation
    const godparentsSection = document.getElementById('godparents');
    if (godparentsSection) {
        const godparentsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const hearts = entry.target.querySelectorAll('.heart');
                    hearts.forEach(function(heart, index) {
                        setTimeout(function() {
                            heart.style.opacity = '0';
                            heart.style.transform = 'scale(0)';
                            heart.style.transition = 'all 0.5s ease-out';
                            
                            setTimeout(function() {
                                heart.style.opacity = '1';
                                heart.style.transform = 'scale(1)';
                            }, 100);
                        }, index * 200);
                    });
                    
                    godparentsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        godparentsObserver.observe(godparentsSection);
    }
    
    // Event Details Button
    const eventDetailsButton = document.getElementById('eventDetailsButton');
    const eventDetailsSection = document.getElementById('eventDetails');
    
    if (eventDetailsButton && eventDetailsSection) {
        eventDetailsButton.addEventListener('click', function() {
            eventDetailsSection.classList.toggle('show');
            eventDetailsButton.classList.toggle('active');
            
            // Smooth scroll to details when opening
            if (eventDetailsSection.classList.contains('show')) {
                setTimeout(function() {
                    eventDetailsSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            }
        });
    }
    
    // Animate event icons when details section opens
    if (eventDetailsSection) {
        const eventDetailsObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (eventDetailsSection.classList.contains('show')) {
                        const iconItems = document.querySelectorAll('.event-icon-item');
                        const infoCards = document.querySelectorAll('.event-info-card');
                        
                        iconItems.forEach(function(item, index) {
                            setTimeout(function() {
                                item.style.opacity = '0';
                                item.style.transform = 'translateY(30px)';
                                item.style.transition = 'all 0.6s ease-out';
                                
                                setTimeout(function() {
                                    item.style.opacity = '1';
                                    item.style.transform = 'translateY(0)';
                                }, 50);
                            }, index * 100);
                        });
                        
                        infoCards.forEach(function(card, index) {
                            setTimeout(function() {
                                card.style.opacity = '0';
                                card.style.transform = 'translateY(50px)';
                                card.style.transition = 'all 0.8s ease-out';
                                
                                setTimeout(function() {
                                    card.style.opacity = '1';
                                    card.style.transform = 'translateY(0)';
                                }, 50);
                            }, (iconItems.length * 100) + (index * 100));
                        });
                    }
                }
            });
        });
        
        eventDetailsObserver.observe(eventDetailsSection, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
    
    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll-triggered animations for main header
    const mainHeader = document.getElementById('mainHeader');
    if (mainHeader) {
        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset;
            const headerBalloon = document.querySelector('.header-balloon');
            
            if (headerBalloon && scrollY < window.innerHeight) {
                const parallaxValue = scrollY * 0.3;
                headerBalloon.style.transform = `translateY(${parallaxValue}px)`;
            }
        });
    }
});
