// Carousel functionality for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.recommended-courses-grid');
    if (!carousel) return;

    let isMobile = window.innerWidth <= 768;
    let startX, scrollLeft;
    let isDragging = false;

    // Function to update carousel behavior based on screen size
    function updateCarouselBehavior() {
        isMobile = window.innerWidth <= 768;
        if (isMobile) {
            carousel.style.cursor = 'grab';
            carousel.style.overflowX = 'auto';
            carousel.style.scrollSnapType = 'x mandatory';
            carousel.style.scrollBehavior = 'smooth';
            carousel.style.WebkitOverflowScrolling = 'touch';
        } else {
            carousel.style.cursor = 'default';
            carousel.style.overflowX = 'visible';
            carousel.style.scrollSnapType = 'none';
            carousel.style.scrollBehavior = 'auto';
        }
    }

    // Initial setup
    updateCarouselBehavior();

    // Update on window resize
    window.addEventListener('resize', updateCarouselBehavior);

    // Touch events for mobile
    carousel.addEventListener('mousedown', (e) => {
        if (!isMobile) return;
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging || !isMobile) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('mouseup', () => {
        if (!isMobile) return;
        isDragging = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseleave', () => {
        if (!isMobile) return;
        isDragging = false;
        carousel.style.cursor = 'grab';
    });

    // Touch events
    carousel.addEventListener('touchstart', (e) => {
        if (!isMobile) return;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isMobile) return;
        e.preventDefault();
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Add navigation buttons for mobile
    if (isMobile) {
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-nav prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.setAttribute('aria-label', 'Previous course');

        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-nav next';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.setAttribute('aria-label', 'Next course');

        carousel.parentNode.insertBefore(prevButton, carousel);
        carousel.parentNode.appendChild(nextButton);

        // Navigation button functionality
        prevButton.addEventListener('click', () => {
            const cardWidth = carousel.querySelector('.recommended-course-card').offsetWidth;
            carousel.scrollLeft -= cardWidth;
        });

        nextButton.addEventListener('click', () => {
            const cardWidth = carousel.querySelector('.recommended-course-card').offsetWidth;
            carousel.scrollLeft += cardWidth;
        });

        // Show/hide navigation buttons based on scroll position
        carousel.addEventListener('scroll', () => {
            prevButton.style.opacity = carousel.scrollLeft > 0 ? '1' : '0';
            nextButton.style.opacity = 
                carousel.scrollLeft < (carousel.scrollWidth - carousel.clientWidth) ? '1' : '0';
        });
    }
}); 