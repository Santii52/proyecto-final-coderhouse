document.addEventListener("DOMContentLoaded", async function () {
    const url = 'https://api.mercadolibre.com/sites/MLA/search?q=iphone';

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        // Verificar si 'data' y 'data.results' están definidos y 'data.results' es un array
        if (data && Array.isArray(data.results)) {
            const contenedorProductos = document.getElementById('productosDisponibles');

            data.results.forEach(producto => {
                if (producto && producto.title && producto.price && producto.permalink && producto.thumbnail) {
                    const tarjetaProducto = document.createElement('div');
                    tarjetaProducto.classList.add('col');
                    tarjetaProducto.innerHTML = `
                        <div class="card h-100">
                            <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${producto.title}</h5>
                                <p class="card-text">${producto.price}</p>
                                <a href="${producto.permalink}" class="btn btn-primary mt-auto" target="_blank">Ver Producto</a>
                            </div>
                        </div>
                    `;
                    
                    contenedorProductos.appendChild(tarjetaProducto);
                } else {
                    console.error("Uno o más productos tienen propiedades indefinidas:", producto);
                }
            });
        } else {
            console.error("La propiedad 'results' en la respuesta no está definida o no es un array:", data);
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
});
