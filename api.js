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

    productosEnCarrito.forEach(producto => {
        const cantidadElemento = producto.querySelector('.cantidad');
        const cantidad = parseInt(cantidadElemento.value);
        const precio = parseFloat(producto.getAttribute('data-precio'));

        if (cantidad > 0) {
            total += cantidad * precio;
            console.log(`cantidad ${total}`)
        }
    });

    const totalElemento = document.getElementById('total');
    if (totalElemento) {
        totalElemento.textContent = total.toFixed(2);
    }

    
}
/* ----------------------leer api de futbol------------------------------------------------- */

