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

let productosCargados = []; // array con todos los productos

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

    // Imagen con placeholder
    const imgSrc = p.imagen ? p.imagen : "img/placeholder.png";

    // Colores disponibles como círculos pequeños
    const coloresHTML = Array.isArray(p.colores) && p.colores.length 
      ? `<div class="colores">${p.colores.map(c => `<span class="color" style="background-color:${c}"></span>`).join('')}</div>`
      : "";

    // Stock bajo muestra mensaje o estilo diferente
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
        <p class="precio">€${p.precio.toFixed(2)}</p>
        ${coloresHTML}
        ${stockHTML}
        <button class="btn-agregar">Agregar al carrito</button>
      </div>
    `;
      

    // Evento para agregar al carrito
    div.querySelector("button").addEventListener("click", () => agregarAlCarrito(p.tipo, p.precio));

    listaProductos.appendChild(div);
  });
}

// ==========================
// FUNCION CARRITO
// ==========================
function agregarAlCarrito(tipo, precio){
  const existente = Array.from(listaCarrito.children).find(p => p.dataset.tipo === tipo);
  if(existente){
    const input = existente.querySelector("input");
    input.value = parseInt(input.value) + 1;
    actualizarTotal();
    return;
  }
  const div = document.createElement("div");
  div.className = "producto-carrito";
  div.dataset.tipo = tipo;
  div.innerHTML = `
    <span>${tipo} - €${precio.toFixed(2)}</span>
    <button class="btn-restar">-</button>
    <input type="number" value="1" min="1">
    <button class="btn-sumar">+</button>
    <button class="btn-eliminar">Eliminar</button>
  `;
  // EVENTOS DE BOTONES
  div.querySelector(".btn-sumar").addEventListener("click", ()=> { div.querySelector("input").value++; actualizarTotal(); });
  div.querySelector(".btn-restar").addEventListener("click", ()=> { const input = div.querySelector("input"); if(input.value>1) input.value--; actualizarTotal(); });
  div.querySelector(".btn-eliminar").addEventListener("click", ()=> { div.remove(); actualizarTotal(); });
  div.querySelector("input").addEventListener("input", ()=> { const input = div.querySelector("input"); if(input.value<1) input.value=1; actualizarTotal(); });

  listaCarrito.appendChild(div);
  actualizarTotal();
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
}

// ==========================
// BUSCADOR
// ==========================
inputBuscar.addEventListener("input", ()=>{
  const term = inputBuscar.value.toLowerCase();
  const filtrados = productosCargados.filter(p =>
    p.nombre.toLowerCase().includes(term) ||
    p.tipo.toLowerCase().includes(term) ||
    p.equipo.toLowerCase().includes(term)
  );
  mostrarProductos(filtrados.length ? filtrados : []);
});
