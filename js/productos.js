document.addEventListener("DOMContentLoaded", async function () {
    const url = 'https://real-time-amazon-data.p.rapidapi.com/search?query=Phone&page=1&country=US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cd417f0d1emsh54a298f04c63a40p1c7e34jsneb5ece4bf8cb',
            'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        if (data && data.data && data.data.products && Array.isArray(data.data.products)) {
            const productsContainer = document.getElementById('availableProducts');

            data.data.products.forEach(product => {
                if (product && product.product_title && product.product_price && product.product_url && product.product_photo) {
                    const productCard = document.createElement('div');
                    productCard.classList.add('col');
                    productCard.innerHTML = `
                        <div class="card h-100">
                            <img src="${product.product_photo}" class="card-img-top" alt="${product.product_title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${product.product_title}</h5>
                                <p class="card-text">${product.product_price}</p>
                                <button class="btn btn-primary mt-auto add-to-cart-btn">Añadir al Carrito</button>
                            </div>
                        </div>
                    `;
                    
                    const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
                    addToCartBtn.addEventListener('click', () => addToCart(product));
                    
                    productsContainer.appendChild(productCard);
                } else {
                    console.error("Uno o más productos tienen propiedades indefinidas:", product);
                }
            });
        } else {
            console.error("La propiedad 'products' en la respuesta no está definida o no es un array:", data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    function addToCart(product) {
        const cartTableBody = document.querySelector('#cart tbody');
        const cartItem = document.createElement('tr');
        cartItem.innerHTML = `
            <td>${product.product_title}</td>
            <td>${product.product_price}</td>
            <td>1</td>
            <td>${product.product_price}</td>
            <td><button class="btn btn-danger btn-sm remove-item-btn">Eliminar</button></td>
        `;
        cartTableBody.appendChild(cartItem);
        updateTotalPrice();
        
        cartItem.querySelector('.remove-item-btn').addEventListener('click', () => {
            cartItem.remove();
            updateTotalPrice();
        });
    }

    function updateTotalPrice() {
        const cartItems = document.querySelectorAll('#cart tbody tr');
        let total = 0;
        cartItems.forEach(item => {
            const priceText = item.children[3].textContent;
            const price = parseFloat(priceText.replace('$', ''));
            total += price;
        });
        document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
    }

    document.getElementById('clearCartBtn').addEventListener('click', () => {
        document.querySelector('#cart tbody').innerHTML = '';
        updateTotalPrice();
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        alert('Proceso de pago no implementado.');
    });
});
