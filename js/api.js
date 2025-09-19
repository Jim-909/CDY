// ==========================
// VARIABLES GLOBALES
// ==========================
const listaProductos = document.querySelector(".camisas");
const inputBuscar = document.getElementById("inpBuscador");
const modalCarrito = document.getElementById("modalCarrito");
const btnAbrirCarrito = document.getElementById("btnAbrirCarrito");
const spanCerrar = document.querySelector(".cerrar");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("totalCarrito");
const badgeCarrito = document.getElementById("badgeCarrito");
const btnpagar = document.getElementById("btnPagar");

let productosCargados = [];

// ==========================
// MODAL CARRITO
// ==========================
btnAbrirCarrito.addEventListener("click", () => modalCarrito.style.display = "block");
spanCerrar.addEventListener("click", () => modalCarrito.style.display = "none");
window.addEventListener("click", e => { if(e.target === modalCarrito) modalCarrito.style.display = "none"; });

// ==========================
// CARGAR PRODUCTOS DESDE JSON
// ==========================
fetch("./json/productos.json")
  .then(res => res.json())
  .then(data => {
    productosCargados = [];
    for(const temporada in data) {
      for(const equipo in data[temporada]) {
        for(const tipo in data[temporada][equipo]) {
          data[temporada][equipo][tipo].forEach(p => {
            productosCargados.push({...p, equipo, tipo, temporada});
          });
        }
      }
    }
    mostrarProductos(productosCargados);
  })
  .catch(err => console.error("Error al cargar productos:", err));

// ==========================
// FUNCION MOSTRAR PRODUCTOS
// ==========================
function mostrarProductos(productos) {
  listaProductos.innerHTML = "";

  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";

    const imgSrc = p.imagen ? p.imagen : "img/placeholder.png";

    const coloresHTML = Array.isArray(p.colores) && p.colores.length 
      ? `<div class="colores">${p.colores.map(c => `<span class="color" style="background-color:${c}"></span>`).join('')}</div>`
      : "";

    const stockHTML = p.stock && Number(p.stock) <= 3 
      ? `<p class="stock-bajo">Últimas ${p.stock} unidades</p>` 
      : "";

    div.innerHTML = `
      <div class="producto-img">
        <img src="${imgSrc}" alt="${p.nombre}">
      </div>
      <div class="producto-info">
        <h3 class="marca">${p.marca}</h3>
        <h2 class="nombre">${p.nombre}</h2>
        <p class="talla">Talla: ${p.talla}</p>
        <p class="precio">€${p.precio.toFixed(2)}</p>
        ${coloresHTML}
        ${stockHTML}
        <button class="btn-agregar">Agregar al carrito</button>
      </div>
    `;

    div.querySelector("button").addEventListener("click", () => agregarAlCarrito(p));

    listaProductos.appendChild(div);
  });
}

// ==========================
// FUNCION CARRITO
// ==========================
function agregarAlCarrito(producto){
  const clave = `${producto.tipo}-${producto.nombre}-${producto.talla}`;
  const existente = Array.from(listaCarrito.children).find(p => p.dataset.clave === clave);

  if(existente){
    const input = existente.querySelector("input");
    if(parseInt(input.value) < producto.stock){
      input.value = parseInt(input.value) + 1;
      actualizarTotal();
      guardarCarrito();
    } else {
      if(!existente.querySelector(".stock-bajo")){
        const aviso = document.createElement("p");
        aviso.className = "stock-bajo";
        aviso.textContent = "Stock máximo alcanzado";
        existente.appendChild(aviso);
      }
    }
    return;
  }

  const div = document.createElement("div");
  div.className = "producto-carrito";
  div.dataset.clave = clave;
  div.innerHTML = `
    <img src="${producto.imagen ? producto.imagen : 'img/placeholder.png'}" style="width:90px ; border: 2px solid black;" alt="${producto.nombre}" class="img-carrito">
    <span>${producto.nombre} (${producto.talla}) - ${producto.tipo} - €${producto.precio.toFixed(2)}</span>
    <button class="btn-restar">-</button>
    <input type="number" value="1" min="1" max="${producto.stock}">
    <button class="btn-sumar">+</button>
    <button class="btn-eliminar">Eliminar</button>

    
  `;

  // Eventos botones
  div.querySelector(".btn-sumar").addEventListener("click", ()=> {
    const input = div.querySelector("input");
    if(parseInt(input.value) < producto.stock) input.value++;
    actualizarTotal();
    guardarCarrito();
  });
  div.querySelector(".btn-restar").addEventListener("click", ()=> {
    const input = div.querySelector("input");
    if(parseInt(input.value) > 1) input.value--;
    actualizarTotal();
    guardarCarrito();
  });
  div.querySelector(".btn-eliminar").addEventListener("click", ()=> { div.remove(); actualizarTotal(); guardarCarrito(); });
  div.querySelector("input").addEventListener("input", ()=> {
    const input = div.querySelector("input");
    if(input.value < 1) input.value = 1;
    if(parseInt(input.value) > producto.stock) input.value = producto.stock;
    actualizarTotal();
    guardarCarrito();
  });

  listaCarrito.appendChild(div);
  actualizarTotal();
  guardarCarrito();
}

// ==========================
// FUNCIONES AUXILIARES
// ==========================
function obtenerDatosCarrito() {
  return Array.from(listaCarrito.children).map(div => {
    const span = div.querySelector("span").textContent;
    const cantidad = parseInt(div.querySelector("input").value);
    return {
      clave: div.dataset.clave,
      descripcion: span,
      cantidad
    };
  });
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(obtenerDatosCarrito()));
}

function vaciarCarrito() {
  listaCarrito.innerHTML = "";
  actualizarTotal();
  guardarCarrito();
}

// ==========================
// IMPRIMIR DATOS IMPORTANTES
// ==========================
function imprimirCarrito() {
  const carrito = obtenerDatosCarrito();
  let totalGeneral = 0;

  carrito.forEach(item => {
    const partes = item.descripcion.split(" - ");
    const nombre = partes[0];        
    const precio = parseFloat(partes[2].replace("€",""));
    const subtotal = precio * item.cantidad;

    console.log(`Producto: ${nombre}`);
    console.log(`Cantidad: ${item.cantidad}`);
    console.log(`Precio unitario: €${precio.toFixed(2)}`);
    console.log(`Subtotal: €${subtotal.toFixed(2)}`);
    console.log("----------------------");

    totalGeneral += subtotal;
  });

  console.log(`TOTAL GENERAL: €${totalGeneral.toFixed(2)}`);
}

// ==========================
// ACTUALIZAR TOTAL Y BADGE
// ==========================
function actualizarTotal(){
  let total = 0;
  let cantidadTotal = 0;
  Array.from(listaCarrito.children).forEach(div => {
    const precio = parseFloat(div.querySelector("span").textContent.split("€")[1]);
    const cantidad = parseInt(div.querySelector("input").value);
    total += precio * cantidad;
    cantidadTotal += cantidad;
  });
  totalCarrito.textContent = `€${total.toFixed(2)}`;
  badgeCarrito.textContent = cantidadTotal;
  btnpagar.style.display = "block";
  
}

// ==========================
// BUSCADOR
// ==========================
inputBuscar.addEventListener("input", ()=>{
  const term = inputBuscar.value.toLowerCase().trim();
  if (!term) {
    mostrarProductos(productosCargados);
    return;
  }
  const terms = term.split(/\s+/).filter(Boolean);
  const filtrados = productosCargados.filter(p =>
    terms.every(t =>
      (p.talla && p.talla.toLowerCase() === t) ||
      p.nombre.toLowerCase().includes(t) ||
      p.tipo.toLowerCase().includes(t) ||
      p.equipo.toLowerCase().includes(t) ||
      (p.temporada && p.temporada.toLowerCase().includes(t))
    )
  );
  mostrarProductos(filtrados.length ? filtrados : []);
});
