// Initialize cart from localStorage and update cart count
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();
updateCartTotal();

// Function to add item to cart
function addToCart(name, price, img, event) {
    const quantityInput = event.target.previousElementSibling;
    const quantity = parseInt(quantityInput.value) || 1;

    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ name, price, img, quantity: quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartTotal();
    if (event) {
        event.preventDefault();
    }
    window.location.href = 'cart/index.html'; // Navigate to cart page
}

// Function to update cart count in UI
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

// Function to update cart total amount in UI
function updateCartTotal() {
    const itemTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
    const deliveryCharge = 1.00; // Example delivery charge
    const tax = 0.50; // Example tax
    const totalAmount = itemTotal + deliveryCharge + tax;

    document.getElementById('item-total').textContent = itemTotal.toFixed(2);
    document.getElementById('delivery-charge').textContent = deliveryCharge.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

// Function to toggle 'liked' class on button
function toggleLike(button) {
    button.classList.toggle('liked');
}

// Integration of timer functionality
window.onload = function () {
    const fiveMinutes = 60 * 5; // Five minutes timer
    const display = document.querySelector('#time');

    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    startTimer(fiveMinutes, display);
};
