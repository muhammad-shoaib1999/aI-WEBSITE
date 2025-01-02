// Form Validation
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');

const validationRules = {
    name: {
        required: true,
        minLength: 3,
        errorMessage: 'Name must be at least 3 characters long'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: 'Please enter a valid email address'
    },
    subject: {
        required: true,
        minLength: 5,
        errorMessage: 'Subject must be at least 5 characters long'
    },
    message: {
        required: true,
        minLength: 10,
        errorMessage: 'Message must be at least 10 characters long'
    }
};

// Validate single input
function validateInput(input) {
    const rule = validationRules[input.name];
    const errorElement = input.nextElementSibling;
    let isValid = true;
    let errorMessage = '';

    if (rule.required && !input.value.trim()) {
        isValid = false;
        errorMessage = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`;
    } else if (rule.minLength && input.value.length < rule.minLength) {
        isValid = false;
        errorMessage = rule.errorMessage;
    } else if (rule.pattern && !rule.pattern.test(input.value)) {
        isValid = false;
        errorMessage = rule.errorMessage;
    }

    if (!isValid) {
        input.classList.add('invalid');
        errorElement.style.display = 'block';
        errorElement.textContent = errorMessage;
    } else {
        input.classList.remove('invalid');
        errorElement.style.display = 'none';
    }

    return isValid;
}

// Add input event listeners
formInputs.forEach(input => {
    input.addEventListener('input', () => validateInput(input));
    input.addEventListener('blur', () => validateInput(input));
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isFormValid = true;
    formInputs.forEach(input => {
        if (!validateInput(input)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        // Show success message
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            alert('Message sent successfully!');
            contactForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, 1500);
    }
});

// Mobile Menu Toggle (reuse from other pages)
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
