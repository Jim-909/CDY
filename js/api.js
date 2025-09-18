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
        <p class="talla">Talla: ${p.talla}</p>
        <p class="precio">€${p.precio.toFixed(2)}</p>
        ${coloresHTML}
        ${stockHTML}
        <button class="btn-agregar">Agregar al carrito</button>
      </div>
    `;
      

    // Evento para agregar al carrito
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
    } else {
      // Opcional: muestra mensaje visual
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
    <img src="${producto.imagen ? producto.imagen : 'img/placeholder.png'}" style="width:90px ; border: 2px solid  black";"  alt="${producto.nombre}" class="img-carrito">
    <span>${producto.nombre} (${producto.talla}) - ${producto.tipo} - €${producto.precio.toFixed(2)}</span>
    <button class="btn-restar">-</button>
    <input type="number" value="1" min="1" max="${producto.stock}">
    <button class="btn-sumar">+</button>
    <button class="btn-eliminar">Eliminar</button>
  `;
  div.querySelector(".btn-sumar").addEventListener("click", ()=> {
    const input = div.querySelector("input");
    if(parseInt(input.value) < producto.stock){
      input.value++;
      // Quitar mensaje si la cantidad es menor al stock
      const aviso = div.querySelector(".stock-bajo");
      if(aviso && parseInt(input.value) < producto.stock) aviso.remove();
      actualizarTotal();
    } else {
      if(!div.querySelector(".stock-bajo")){
        const aviso = document.createElement("p");
        aviso.className = "stock-bajo";
        aviso.textContent = "Stock máximo alcanzado";
        div.appendChild(aviso);
      }
    }
  });
  div.querySelector(".btn-restar").addEventListener("click", ()=> {
    const input = div.querySelector("input");
    if(input.value > 1) input.value--;
    // Quitar mensaje si la cantidad es menor al stock
    const aviso = div.querySelector(".stock-bajo");
    if(aviso && parseInt(input.value) < producto.stock) aviso.remove();
    actualizarTotal();
  });
  div.querySelector(".btn-eliminar").addEventListener("click", ()=> { div.remove(); actualizarTotal(); });
  div.querySelector("input").addEventListener("input", ()=> {
    const input = div.querySelector("input");
    if(input.value < 1) input.value = 1;
    if(parseInt(input.value) > producto.stock) input.value = producto.stock;
    // Quitar mensaje si la cantidad es menor al stock
    const aviso = div.querySelector(".stock-bajo");
    if(aviso && parseInt(input.value) < producto.stock) aviso.remove();
    actualizarTotal();
  });

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
  const term = inputBuscar.value.toLowerCase().trim();
  if (!term) {
    mostrarProductos(productosCargados);
    return;
  }
  const terms = term.split(/\s+/).filter(Boolean);
  let filtrados = [];
  if (terms.length === 1) {
    // Un solo término: busca por talla exacta o en los demás campos
    filtrados = productosCargados.filter(p =>
      (p.talla && p.talla.toLowerCase() === terms[0])
    );
  } else {
    // Varios términos: todos deben coincidir en algún campo
    filtrados = productosCargados.filter(p =>
      terms.every(t =>
        (p.talla && p.talla.toLowerCase() === t) ||
        p.nombre.toLowerCase().includes(t) ||
        p.tipo.toLowerCase().includes(t) ||
        p.equipo.toLowerCase().includes(t) ||
        (p.temporada && p.temporada.toLowerCase().includes(t))
      )
    );
  }
  mostrarProductos(filtrados.length ? filtrados : []);
});
