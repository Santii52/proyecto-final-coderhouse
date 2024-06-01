document.addEventListener("DOMContentLoaded", async function () {
    const url = 'https://real-time-amazon-data.p.rapidapi.com/search?query=Telefono&page=1&country=US';
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

        // Verificar si 'datos' y 'datos.productos' están definidos y 'datos.productos' es un array
        if (data && data.data && Array.isArray(data.data.products)) {
            const contenedorProductos = document.getElementById('productosDisponibles');

            data.data.products.forEach(producto => {
                if (producto && producto.product_title && producto.product_price && producto.product_url && producto.product_photo) {
                    const tarjetaProducto = document.createElement('div');
                    tarjetaProducto.classList.add('col');
                    tarjetaProducto.innerHTML = `
                        <div class="card h-100">
                            <img src="${producto.product_photo}" class="card-img-top" alt="${producto.product_title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${producto.product_title}</h5>
                                <p class="card-text">${producto.product_price}</p>
                                <button class="btn btn-primary mt-auto boton-agregar-carrito">Añadir al Carrito</button>
                            </div>
                        </div>
                    `;
                    
                    const botonAgregarCarrito = tarjetaProducto.querySelector('.boton-agregar-carrito');
                    botonAgregarCarrito.addEventListener('click', () => agregarAlCarrito(producto));
                    
                    contenedorProductos.appendChild(tarjetaProducto);
                } else {
                    console.error("Uno o más productos tienen propiedades indefinidas:", producto);
                }
            });
        } else {
            console.error("La propiedad 'products' en la respuesta no está definida o no es un array:", data);
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }

    function agregarAlCarrito(producto) {
        const cuerpoTablaCarrito = document.querySelector('#carrito tbody');
        const elementoCarrito = document.createElement('tr');
        elementoCarrito.innerHTML = `
            <td>${producto.product_title}</td>
            <td>${producto.product_price}</td>
            <td>1</td>
            <td>${producto.product_price}</td>
            <td><button class="btn btn-danger btn-sm boton-eliminar-item">Eliminar</button></td>
        `;
        cuerpoTablaCarrito.appendChild(elementoCarrito);
        actualizarPrecioTotal();
        
        elementoCarrito.querySelector('.boton-eliminar-item').addEventListener('click', () => {
            elementoCarrito.remove();
            actualizarPrecioTotal();
        });
    }

    function actualizarPrecioTotal() {
        const itemsCarrito = document.querySelectorAll('#carrito tbody tr');
        let total = 0;
        itemsCarrito.forEach(item => {
            const textoPrecio = item.children[3].textContent;
            const precio = parseFloat(textoPrecio.replace('$', ''));
            total += precio;
        });
        document.getElementById('precioTotal').textContent = `$${total.toFixed(2)}`;
    }

    document.getElementById('botonLimpiarCarrito').addEventListener('click', () => {
        document.querySelector('#carrito tbody').innerHTML = '';
        actualizarPrecioTotal();
    });

    document.getElementById('botonPagar').addEventListener('click', () => {
        alert('Proceso de pago no implementado.');
    });
});
