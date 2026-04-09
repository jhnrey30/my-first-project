document.addEventListener('DOMContentLoaded', function() {
    const productSelect = document.getElementById('productSelect');
    const productOption = document.getElementById('productOption');
    const quantityInput = document.getElementById('quantity');
    const totalPriceEl = document.getElementById('totalPrice');
    const orderForm = document.getElementById('orderForm');

    // Prices per product
    const productPrices = {
        "Tuna Pie": 25,
        "Fruit Tea": 30,
        "Soft Drinks": 20
    };

    // Options (can affect price if needed)
    const options = {
        "Tuna Pie": ["Small", "Medium", "Large"],
        "Fruit Tea": ["Mango", "Peach", "Strawberry"],
        "Soft Drinks": ["Coke", "Sprite", "Pepsi"]
    };

    // Populate product options when product changes
    function populateOptions() {
        const selected = productSelect.value;
        productOption.innerHTML = '<option value="">Select Option</option>';
        if (options[selected]) {
            options[selected].forEach(opt => {
                const optionEl = document.createElement('option');
                optionEl.value = opt;
                optionEl.textContent = opt;
                productOption.appendChild(optionEl);
            });
        }
        calculateTotal();
    }

    productSelect.addEventListener('change', populateOptions);
    productOption.addEventListener('change', calculateTotal);
    quantityInput.addEventListener('input', calculateTotal);

    // Calculate total price
    function calculateTotal() {
        const product = productSelect.value;
        const quantity = parseInt(quantityInput.value) || 0;
        const price = productPrices[product] || 0;
        const total = price * quantity;
        totalPriceEl.textContent = total;
    }

    // Auto-fill product when clicking menu "Order" button
    const orderButtons = document.querySelectorAll('.card-overlay .btn');
    orderButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = btn.closest('.card-overlay');
            const productName = card.querySelector('h3').textContent;

            productSelect.value = productName;
            populateOptions();
            document.getElementById('order').scrollIntoView({behavior: 'smooth'});
        });
    });

    // Handle form submission
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('customerName').value;
        const product = productSelect.value;
        const option = productOption.value;
        const quantity = quantityInput.value;
        const total = totalPriceEl.textContent;

        if (!product || !option) {
            alert("Please select a product and an option!");
            return;
        }

        alert(`Order Submitted!
Name: ${name}
Product: ${product}
Option: ${option}
Quantity: ${quantity}
Total Price: ₱${total}`);

        orderForm.reset();
        totalPriceEl.textContent = 0;
    });
});