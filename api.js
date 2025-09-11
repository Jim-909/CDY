fetch('productos.json')
  .then(response => {
    if (!response.ok) throw new Error("Error al cargar los productos");
    return response.json();
  })
  .then(productos => {
    const ctncamisas = document.querySelector('.camisas');
    let camisastotales = ''; 

    // Recorrer temporadas
    for (const temporada in productos) {
      const equipos = productos[temporada];

      // Recorrer equipos
      for (const equipo in equipos) {
        const equipaciones = equipos[equipo];

        // Recorrer tipos de equipación (local, visitante, entrenamiento, etc.)
        for (const tipo in equipaciones) {
          const camisas = equipaciones[tipo];

          // Recorrer cada camisa
          camisas.forEach(camisa => {
            camisastotales += `
              <div class="producto" data-id="${camisa.id}" data-precio="${camisa.precio}">
                   
                <h3>${camisa.nombre} (${equipo} - ${tipo})</h3>
                <div>
                    <img src="${camisa.imagen}" atl="${camisa.nombre}">
                </div>
                
                <p>Precio: $${camisa.precio.toFixed(2)}</p>
                <p>Temporada: ${temporada}</p>
                <label>Cantidad: </label>
                <input type="number" class="cantidad" min="0" value="0" onchange="calcularTotal()">
              </div>
            `;
          });
        }
      }
    }

    ctncamisas.innerHTML = camisastotales;
  })
  .catch(error => console.error(error));
  /* -------------------------carrito ------------------------------ */
function calcularTotal() {
    const productosEnCarrito = document.querySelectorAll('.producto');
    let total = 0;
    let resumenHTML = ''; // Inicializamos una cadena vacía para el resumen

    productosEnCarrito.forEach(producto => {
        const cantidadElemento = producto.querySelector('.cantidad');
        const cantidad = parseInt(cantidadElemento.value);
        const precio = parseFloat(producto.getAttribute('data-precio'));
        
        // Obtenemos el nombre del producto del HTML
        const nombreProducto = producto.querySelector('h3').textContent;

        if (cantidad > 0) {
            const subtotal = cantidad * precio;
            total += subtotal;

            // Construimos la cadena de HTML para cada producto en el resumen
            resumenHTML += `
                <div>
                    <p>Producto: ${nombreProducto}, Cantidad: ${cantidad}, Precio unitario: $${precio.toFixed(2)}, Subtotal: €${subtotal.toFixed(2)}</p>
                </div>
            `;
        }
    });

    const totalElemento = document.getElementById('total');
    if (totalElemento) {
        totalElemento.textContent = `€${total.toFixed(2)}`;
    }
    
    // Corregimos la variable resumen
    const resumenElemento = document.getElementById('resumen'); 
    if (resumenElemento) {
        resumenElemento.innerHTML = resumenHTML;
    }
}

/* ----------------------leer api de futbol------------------------------------------------- */

