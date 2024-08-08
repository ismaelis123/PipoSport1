document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Balón de Fútbol', price: 950.0, description: 'Balón para fútbol Mikasa.' },
        { id: 2, name: 'Balón de Fútbol', price: 1030.0, description: 'Balón de alta calidad para fútbol.' },
        { id: 3, name: 'Balón de Fútbol', price: 350.0, description: 'Balón  De Futbol copia Mikasa.' },
        { id: 4, name: 'Zapatillas de Fútbol', price: 50.0, description: 'Zapatillas cómodas y duraderas para jugar fútbol.', sizes: ['38', '39', '40', '41', '42'] },
        { id: 5, name: 'Camiseta de Fútbol', price: 30.0, description: 'Camiseta oficial del equipo.', sizes: ['S', 'M', 'L', 'XL'] },
        { id: 6, name: 'Espinilleras', price: 15.0, description: 'Espinilleras ligeras y resistentes.', sizes: ['S', 'M', 'L'] },
        { id: 7, name: 'Pines Para Tus chinelas ', price: 20.0, description: 'Pines Para chinelas y darle estilos lleva el tuyo .'},
    ];

    const cart = [];

    const homeSection = document.getElementById('home');
    const productsSection = document.getElementById('products');
    const contactSection = document.getElementById('contact');
    const productList = document.getElementById('product-list');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    document.getElementById('home-button').addEventListener('click', () => {
        homeSection.style.display = 'block';
        productsSection.style.display = 'none';
        contactSection.style.display = 'none';
    });

    document.getElementById('products-button').addEventListener('click', () => {
        homeSection.style.display = 'none';
        productsSection.style.display = 'block';
        contactSection.style.display = 'none';
    });

    document.getElementById('contact-button').addEventListener('click', () => {
        homeSection.style.display = 'none';
        productsSection.style.display = 'none';
        contactSection.style.display = 'block';
    });

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Precio: $${product.price.toFixed(2)}</p>
                ${product.sizes ? `<label for="size-${product.id}">Talla:</label>
                <select id="size-${product.id}">
                    ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                </select>` : ''}
                <button data-id="${product.id}">Agregar al carrito</button>
            `;
            productList.appendChild(productDiv);
        });

        productList.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const productId = parseInt(event.target.getAttribute('data-id'));
                const sizeSelect = document.getElementById(`size-${productId}`);
                const selectedSize = sizeSelect ? sizeSelect.value : null;
                addToCart(productId, selectedSize);
            }
        });
    }

    function addToCart(productId, selectedSize) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push({ ...product, selectedSize });
            renderCart();
        }
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${item.name} ${item.selectedSize ? `- Talla: ${item.selectedSize}` : ''} - $${item.price.toFixed(2)}
                <button data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);

        cartItemsContainer.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const itemIndex = parseInt(event.target.getAttribute('data-index'));
                removeFromCart(itemIndex);
            }
        });
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        renderCart();
    }

    checkoutButton.addEventListener('click', () => {
        alert('Compra realizada con éxito!');
        cart.length = 0;
        renderCart();
    });

    renderProducts();
});

