document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    updateCartSummary();
});

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        const itemImage = document.createElement('img');
        itemImage.src = '../Images/' + item.img; // Adjust the path based on your file structure
        itemImage.alt = item.name;
        itemElement.appendChild(itemImage);

        const itemDetails = document.createElement('div');
        itemDetails.classList.add('item-details');

        const itemName = document.createElement('p');
        itemName.textContent = item.name;
        itemDetails.appendChild(itemName);

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `$${item.price.toFixed(2)}`;
        itemDetails.appendChild(itemPrice);

        const itemQuantity = document.createElement('div');
        itemQuantity.classList.add('quantity-controls');

        const decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.onclick = function() {
            updateQuantity(item.name, -1);
        };
        itemQuantity.appendChild(decreaseBtn);

        const quantityText = document.createElement('span');
        quantityText.textContent = item.quantity;
        quantityText.classList.add('item-quantity');
        itemQuantity.appendChild(quantityText);

        const increaseBtn = document.createElement('button');
        increaseBtn.textContent = '+';
        increaseBtn.onclick = function() {
            updateQuantity(item.name, 1);
        };
        itemQuantity.appendChild(increaseBtn);

        itemDetails.appendChild(itemQuantity);

        itemElement.appendChild(itemDetails);

        cartItemsContainer.appendChild(itemElement);
    });
}

function updateQuantity(name, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.name !== name);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartSummary();
}

function updateCartSummary() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemTotalElement = document.getElementById('item-total');
    const deliveryChargeElement = document.getElementById('delivery-charge');
    const taxElement = document.getElementById('tax');
    const totalAmountElement = document.getElementById('total-amount');

    let itemTotal = 0;
    cartItems.forEach(item => {
        itemTotal += item.price * item.quantity;
    });

    const deliveryCharge = 1.00;
    const tax = 0.50;

    const totalAmount = itemTotal + deliveryCharge + tax;

    itemTotalElement.textContent = itemTotal.toFixed(2);
    deliveryChargeElement.textContent = deliveryCharge.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    totalAmountElement.textContent = totalAmount.toFixed(2);
}

function checkout() {
    alert('Checkout functionality to be implemented!');
}
