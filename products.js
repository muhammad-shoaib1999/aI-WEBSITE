// Sample products data
const products = [
    {
        id: 1,
        name: "Custom Website Development",
        price: 999.99,
        category: "web",
        image: "https://via.placeholder.com/300",
        description: "Professional website development with modern technologies and responsive design."
    },
    {
        id: 2,
        name: "Mobile App Development",
        price: 1499.99,
        category: "mobile",
        image: "https://via.placeholder.com/300",
        description: "Native iOS and Android app development with cutting-edge features."
    },
    {
        id: 3,
        name: "UI/UX Design Package",
        price: 799.99,
        category: "design",
        image: "https://via.placeholder.com/300",
        description: "Complete UI/UX design service including wireframes, prototypes, and user testing."
    },
    {
        id: 4,
        name: "SEO Optimization",
        price: 499.99,
        category: "marketing",
        image: "https://via.placeholder.com/300",
        description: "Comprehensive SEO service to improve your website's visibility."
    },
    {
        id: 5,
        name: "E-commerce Solution",
        price: 1299.99,
        category: "web",
        image: "https://via.placeholder.com/300",
        description: "Complete e-commerce website with payment integration and inventory management."
    }
];

let cart = [];

// Initialize the page
function initializePage() {
    displayProducts();
    initializeCategories();
    updateCartCount();
}

// Display products in the grid
function displayProducts(productsToShow = products) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add category filtering functionality
function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    const categoryButtons = document.querySelectorAll('.category-btn');

    // Update active button
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    // Filter products
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    displayProducts(filteredProducts);
}

// Initialize category buttons
function initializeCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterProducts(button.dataset.category);
        });
    });
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    updateCartCount();
}

// Update cart display
function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');

    updateTotal();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
            updateCartCount();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Update total amount
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.querySelector('.total-amount').textContent = `$${total.toFixed(2)}`;
}

// Toggle cart sidebar
function toggleCart() {
    document.querySelector('.cart-sidebar').classList.toggle('active');
}

// Add Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
