document.addEventListener("DOMContentLoaded", async function () {
    const url = 'https://api.mercadolibre.com/sites/MLA/search?q=iphone';
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && Array.isArray(data.results)) {
            const contenedorProductos = document.getElementById('productosDisponibles');
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            // Función para agregar un producto al carrito
            function agregarAlCarrito(producto) {
                carrito.push(producto);
                actualizarCarrito();
                Swal.fire({
                    icon: 'success',
                    title: 'Producto añadido al carrito!',
                    text: `${producto.title} ha sido añadido a tu carrito de compras.`,
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                });
                // Guardar el carrito en el localStorage
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }

            // Función para eliminar un producto del carrito
            function eliminarDelCarrito(index) {
                carrito.splice(index, 1);
                actualizarCarrito();
                // Actualizar el localStorage después de eliminar un producto
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }

            // Función para vaciar el carrito
            function vaciarCarrito() {
                carrito = [];
                actualizarCarrito();
                // Actualizar el localStorage después de vaciar el carrito
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }

            // Función para actualizar el contenido del carrito y calcular el precio total
            function actualizarCarrito() {
                const cuerpoTablaCarrito = document.querySelector('#carrito tbody');
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

                document.getElementById('precioTotal').textContent = `$${total.toFixed(2)}`;

                const botonVaciarCarrito = document.getElementById('botonVaciarCarrito');
                botonVaciarCarrito.disabled = carrito.length === 0;

                const botonPagar = document.getElementById('botonPagar');
                botonPagar.disabled = carrito.length === 0;

                const botonesEliminar = document.querySelectorAll('.boton-eliminar-item');
                botonesEliminar.forEach(boton => {
                    boton.addEventListener('click', (event) => {
                        const index = parseInt(event.target.dataset.index);
                        eliminarDelCarrito(index);
                    });
                });
            }

            // Cargar productos
            data.results.forEach(producto => {
                if (producto && producto.title && producto.price && producto.permalink && producto.thumbnail) {
                    const tarjetaProducto = document.createElement('div');
                    tarjetaProducto.classList.add('col', 'col-md-4');
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
            document.getElementById('botonVaciarCarrito').addEventListener('click', () => {
                vaciarCarrito();
            });

            // Evento para procesar el pago (simulado)
            document.getElementById('botonPagar').addEventListener('click', () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Compra realizada!',
                    text: 'Tu compra fue hecha satisfactoriamente!',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
                // Limpiar el carrito después de procesar el pago
                vaciarCarrito();
            });

            // Actualizar el contenido del carrito al cargar la página
            actualizarCarrito();
        } else {
            console.error("La propiedad 'results' en la respuesta no está definida o no es un array:", data);
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
});
