fetch('prodcutos.json')
    .then(response => {

        if (!response.ok) throw new Error("Error al cargar los productos")
        return response.json();
    })
    .then(response => response.json())
    .then(productos => {

        const ctncamisas = document.querySelector('.camisas')

        let camisastotales = ''; 

        productos.forEach(camisa => {
            camisastotales += `
                <div class="producto" data-id="${camisa.id}" data-precio="${camisa.precio}" >
                    <h3>${camisa.nombre}</h3>
                    <p> Precio : ${camisa.precio.toFixed(2)}</p>
                    <p> Temporada : ${camisa.temporada}</p>
                    <label> cantidad: </label>
                    <input type="number" class="cantidad" min="0" value="0" onchange="calcularTotal()">
                </div>
                
            `;

        });

        ctncamisas.innerHTML = camisastotales ;
    
    });
