// JavaScript for Galaxy AI Courses Website

// Course data with IDs
const courses = {
    essentials: [
        { id: '2317', name: 'Everyone', image: '1.png' },
        { id: '28178', name: 'Foundation', image: '2.png' },
        { id: '14803', name: 'Prompt Level 1', image: '3.png' },
        { id: '294', name: 'Executive', image: '5.png' }
    ],
    design: [
        { id: '1079', name: 'Design', image: '6.png' },
        { id: '1081', name: 'UX Designer', image: '7.png' }
    ],
    specialized: [
        { id: '2518', name: 'Government', image: '8.png' },
        { id: '2520', name: 'Healthcare', image: '9.png' },
        { id: '25429', name: 'Chief AI Officer', image: '10.png' },
        { id: '1091', name: 'AI for Legal', image: '11.png' }
    ],
    tech: [
        { id: '1114', name: 'Ethical Hacker', image: '12.png' },
        { id: '14790', name: 'Security Level 1', image: '13.png' },
        { id: '14836', name: 'Security Level 2', image: '14.png' },
        { id: '15262', name: 'Security Level 3', image: '15.png' },
        { id: '1108', name: 'Data', image: '16.png' },
        { id: '1110', name: 'Engineer', image: '17.png' },
        { id: '1117', name: 'Cloud', image: '18.png' },
        { id: '14798', name: 'Network', image: '19.png' },
        { id: '14793', name: 'Security Compliance', image: '20.png' },
        { id: '296', name: 'Developer', image: '21.png' },
        { id: '1123', name: 'Robotics', image: '22.png' },
        { id: '1119', name: 'Architect', image: '23.png' },
        { id: '1125', name: 'Quantum', image: '24.png' }
    ],
    business: [
        { id: '1085', name: 'Product Manager', image: '26.png' },
        { id: '1071', name: 'Marketing', image: '27.png' },
        { id: '14803', name: 'Sales', image: '28.png' },
        { id: '1089', name: 'Finance', image: '29.png' },
        { id: '14800', name: 'Supply Chain', image: '30.png' },
        { id: '1073', name: 'Human Resources', image: '31.png' },
        { id: '32', name: 'Customer Service', image: '32.png' }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Disable submit button and show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                // Get form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    message: document.getElementById('message').value
                };
                
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We will contact you shortly.';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
                
                console.log('Form data that would be sent:', formData);
            } catch (error) {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-error-message';
                errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again.';
                contactForm.appendChild(errorMessage);
                
                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            } finally {
                // Reset submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Inquiry';
            }
        });
    }
    
    // Add animation classes on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .inclusion-item, .experience-step, .path-card, .stat-card, .benefit-item');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9) {
                element.classList.add('animate-slide-up');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Mobile navigation toggle (for responsive design)
    const createMobileNav = () => {
        const header = document.querySelector('.header');
        const nav = document.querySelector('.nav');
        
        // Add mobile nav styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .nav {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background-color: var(--white);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                    padding: 20px;
                    display: none;
                }
                
                .nav.active {
                    display: block;
                }
                
                .nav-list {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .mobile-nav-toggle {
                    display: block;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--dark-gray);
                    cursor: pointer;
                }
            }
            
            @media (min-width: 769px) {
                .mobile-nav-toggle {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Initialize mobile navigation
    createMobileNav();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            createMobileNav();
        }
    });
    
    // Check if mobile nav should be initialized on load
    if (window.innerWidth <= 768) {
        createMobileNav();
    }

    // Header scroll effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Handle category and course selection
    const categorySelect = document.getElementById('category');
    const courseSelect = document.getElementById('course');

    categorySelect.addEventListener('change', function() {
        // Clear previous courses
        courseSelect.innerHTML = '<option value="">Select a course</option>';
        
        // Get selected category
        const selectedCategory = this.value;
        
        if (selectedCategory) {
            // Add courses for selected category
            courses[selectedCategory].forEach(course => {
                const option = document.createElement('option');
                option.value = course.id;
                option.textContent = course.name;
                courseSelect.appendChild(option);
            });
        }
    });

    // Function to animate counting
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                // For the dollar amount, format with $ and B
                if (element.getAttribute('data-target') === '3500') {
                    element.textContent = `$${Math.floor(current)}B`;
                } 
                // For percentage values (84, 40)
                else if (['84', '40'].includes(element.getAttribute('data-target'))) {
                    element.textContent = `${Math.floor(current)}%`;
                }
                // For the fraction (9/10)
                else if (element.getAttribute('data-target') === '9') {
                    element.textContent = Math.floor(current);
                }
                else {
                    element.textContent = Math.floor(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                // For the dollar amount, format with $ and B
                if (element.getAttribute('data-target') === '3500') {
                    element.textContent = `$${target}B`;
                }
                // For percentage values (84, 40)
                else if (['84', '40'].includes(element.getAttribute('data-target'))) {
                    element.textContent = `${target}%`;
                }
                // For the fraction (9/10)
                else if (element.getAttribute('data-target') === '9') {
                    element.textContent = target;
                }
                else {
                    element.textContent = target;
                }
            }
        };

        updateCounter();
    }

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle scroll events
    function handleScroll() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(number => {
            if (isInViewport(number) && !number.classList.contains('animated')) {
                number.classList.add('animated');
                animateCounter(number);
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial check for elements in viewport
    handleScroll();

    const titleContainer = document.querySelector('.title-container');
    const titles = document.querySelectorAll('.title-text');
    let currentIndex = 0;

    function swapText() {
        titles[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % titles.length;
        titles[currentIndex].classList.add('active');
    }

    // Initial swap after 3 seconds
    setTimeout(swapText, 3000);

    // Continue swapping every 5 seconds
    setInterval(swapText, 5000);

    // Go to Top Button Functionality
    const goToTopButton = document.getElementById('goToTop');

    // Show button when scrolling down 200px from the top
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            goToTopButton.classList.add('visible');
        } else {
            goToTopButton.classList.remove('visible');
        }
    });

    // Smooth scroll to top when button is clicked
    goToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Menu Functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });

    // Add loading attribute to images below the fold
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.src = img.dataset.src;
    });

    // Search functionality
    const searchInput = document.getElementById('courseSearch');
    const courseCards = document.querySelectorAll('.path-card');
    const noResultsMessage = document.querySelector('.no-results');
    const clearButton = document.querySelector('.search-clear');

    function filterCourses() {
        const searchTerm = searchInput.value.toLowerCase();
        let visibleCount = 0;

        courseCards.forEach(card => {
            const imageSrc = card.querySelector('.course-image').src;
            const imageName = imageSrc.split('/').pop();
            let courseName = '';
            
            // Find matching course data
            for (const category in courses) {
                const course = courses[category].find(c => c.image === imageName);
                if (course) {
                    courseName = course.name.toLowerCase();
                    break;
                }
            }
            
            if (courseName.includes(searchTerm)) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            noResultsMessage.classList.add('visible');
        } else {
            noResultsMessage.classList.remove('visible');
        }
    }

    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', filterCourses);
    }
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            filterCourses();
        });
    }

    // Initial filter
    filterCourses();

    // Function to initialize course cards
    function initializeCourseCards() {
        // Get all path cards
        const pathCards = document.querySelectorAll('.path-card');
        
        // Add course IDs and links to cards
        pathCards.forEach(card => {
            const imageSrc = card.querySelector('.course-image').src;
            const imageName = imageSrc.split('/').pop();
            
            // Find matching course data
            for (const category in courses) {
                const course = courses[category].find(c => c.image === imageName);
                if (course) {
                    // Add course ID
                    card.setAttribute('data-course-id', course.id);
                    
                    // Add course link if it doesn't exist
                    if (!card.querySelector('.course-link')) {
                        const link = document.createElement('a');
                        link.href = `course-details.html?id=${course.id}`;
                        link.className = 'course-link';
                        link.innerHTML = '<i class="fas fa-arrow-right"></i>';
                        card.appendChild(link);
                    }
                    break;
                }
            }
        });
    }

    // Initialize when DOM is loaded
    initializeCourseCards();
});
