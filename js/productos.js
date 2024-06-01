document.addEventListener("DOMContentLoaded", async function () {
    const url = 'https://api.mercadolibre.com/sites/MLA/search?q=iphone';
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && Array.isArray(data.results)) {
            const contenedorProductos = document.getElementById('productosDisponibles');
            const carrito = [];

            // Función para agregar un producto al carrito
            function agregarAlCarrito(producto) {
                carrito.push(producto);
                actualizarCarrito();
            }

            // Función para eliminar un producto del carrito
            function eliminarDelCarrito(index) {
                carrito.splice(index, 1);
                actualizarCarrito();
            }

            // Función para vaciar el carrito
            function vaciarCarrito() {
                carrito.length = 0;
                actualizarCarrito();
            }

            // Función para actualizar el contenido del carrito y calcular el precio total
            function actualizarCarrito() {
                const cuerpoTablaCarrito = document.querySelector('#cart tbody');
                cuerpoTablaCarrito.innerHTML = '';

                let total = 0;

                carrito.forEach((producto, index) => {
                    const elementoCarrito = document.createElement('tr');
                    elementoCarrito.innerHTML = `
                        <td>${producto.title}</td>
                        <td>$${producto.price}</td>
                        <td>1</td>
                        <td>$${producto.price}</td>
                        <td><button class="btn btn-danger btn-sm boton-eliminar-item" data-index="${index}">Eliminar</button></td>
                    `;
                    cuerpoTablaCarrito.appendChild(elementoCarrito);

                    total += producto.price;
                });

                document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;

                const clearCartBtn = document.getElementById('clearCartBtn');
                clearCartBtn.disabled = carrito.length === 0;

                const checkoutBtn = document.getElementById('checkoutBtn');
                checkoutBtn.disabled = carrito.length === 0;

                const botonesEliminar = document.querySelectorAll('.boton-eliminar-item');
                botonesEliminar.forEach(boton => {
                    boton.addEventListener('click', (event) => {
                        const index = parseInt(event.target.dataset.index);
                        eliminarDelCarrito(index);
                    });
                });
            }

            // Renderizar productos
            data.results.forEach(producto => {
                if (producto && producto.title && producto.price && producto.permalink && producto.thumbnail) {
                    const tarjetaProducto = document.createElement('div');
                    tarjetaProducto.classList.add('col');
                    tarjetaProducto.innerHTML = `
                        <div class="card h-100">
                            <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${producto.title}</h5>
                                <p class="card-text">$${producto.price}</p>
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

            // Evento para vaciar el carrito
            document.getElementById('clearCartBtn').addEventListener('click', () => {
                vaciarCarrito();
            });

            // Evento para procesar el pago (simulado)
            document.getElementById('checkoutBtn').addEventListener('click', () => {
                alert('Proceso de pago no implementado.');
            });
        } else {
            console.error("La propiedad 'results' en la respuesta no está definida o no es un array:", data);
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
});
