// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Slider Functionality
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
});

// Auto Slide
setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
}, 5000);

// Add to Cart Animation
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('added');
        button.textContent = 'Added to Cart';
        
        setTimeout(() => {
            button.classList.remove('added');
            button.textContent = 'Add to Cart';
        }, 2000);
    });
});
