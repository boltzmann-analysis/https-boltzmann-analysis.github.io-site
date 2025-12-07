// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form handling
    const registrationForm = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const registrationData = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                role: formData.get('role'),
                useCase: formData.get('useCase'),
                updates: formData.get('updates') === 'on'
            };

            // Validate required fields
            if (!registrationData.name.trim() || !registrationData.email.trim()) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Validate email format
            if (!isValidEmail(registrationData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Send email with registration data
            sendRegistrationEmail(registrationData);
            
            // Show success message
            this.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Show notification
            showNotification('Registration submitted! Your email client will open to send the registration.', 'success');
        });
    }

    // Initialize page
    initializePage();
});

// Generate unique ID for registration
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Send registration email
function sendRegistrationEmail(data) {
    try {
        // Create email subject
        const subject = encodeURIComponent('Boltzmann Analyser - New Registration Interest');
        
        // Create email body with registration details
        const body = encodeURIComponent(
            `New registration for Boltzmann Analyser!

` +
            `Name: ${data.name}
` +
            `Email: ${data.email}
` +
            `Company: ${data.company || 'Not specified'}
` +
            `Role: ${data.role || 'Not specified'}
` +
            `Use Case: ${data.useCase || 'Not specified'}
` +
            `Wants Updates: ${data.updates ? 'Yes' : 'No'}
` +
            `Registration Date: ${new Date().toLocaleString()}

` +
            `--
` +
            `This registration was submitted via the Boltzmann Analyser website.`
        );
        
        // Create mailto link
        const mailtoLink = `mailto:boltzmannanalyser@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        console.log('Registration email prepared:', data);
    } catch (error) {
        console.error('Error creating registration email:', error);
        showNotification('There was an error preparing your registration email. Please try again.', 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent-green)' : type === 'error' ? 'var(--danger-red)' : 'var(--accent-blue)'};
        color: var(--primary-black);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-medium);
        z-index: 10000;
        font-weight: 600;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                opacity: 0.7;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Handle close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Initialize page functionality
function initializePage() {
    // Add scroll effect to header
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .registration-form');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation styles
    if (!document.querySelector('#animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .animate-in {
                animation: fadeInUp 0.6s ease-out;
            }
        `;
        document.head.appendChild(style);
    }
}

// Utility functions for email-based registrations
window.BoltzmannAdmin = {
    // Test email functionality
    testEmail: () => {
        const testData = {
            name: 'Test User',
            email: 'test@example.com',
            company: 'Test Company',
            role: 'developer',
            useCase: 'Testing the registration system',
            updates: true
        };
        sendRegistrationEmail(testData);
    },
    
    // Get mailto link for manual testing
    getMailtoLink: (data) => {
        const subject = encodeURIComponent('Boltzmann Analyser - New Registration Interest');
        const body = encodeURIComponent(
            `New registration for Boltzmann Analyser!\n\n` +
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Company: ${data.company || 'Not specified'}\n` +
            `Role: ${data.role || 'Not specified'}\n` +
            `Use Case: ${data.useCase || 'Not specified'}\n` +
            `Wants Updates: ${data.updates ? 'Yes' : 'No'}\n` +
            `Registration Date: ${new Date().toLocaleString()}\n\n` +
            `This registration was submitted via the Boltzmann Analyser website.`
        );
        return `mailto:boltzmannanalyser@gmail.com?subject=${subject}&body=${body}`;
    }
};

// Log initialization
console.log('Boltzmann Analyser site initialized');
console.log('Email-based registration system active');
console.log('Admin functions available via window.BoltzmannAdmin');

// Handle form field enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add real-time validation feedback
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear validation state on input
            this.classList.remove('field-valid', 'field-invalid');
        });
    });
});

// Field validation
function validateField(field) {
    let isValid = true;
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
    }
    
    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        isValid = false;
    }
    
    // Add visual feedback
    field.classList.remove('field-valid', 'field-invalid');
    if (field.value) {
        field.classList.add(isValid ? 'field-valid' : 'field-invalid');
    }
    
    return isValid;
}