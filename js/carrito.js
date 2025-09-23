// ==========================
// VARIABLES
// ==========================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ==========================
// FUNCIONES
// ==========================
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarBadge();
  actualizarCarritoUI();
  actualizarTotal();
}

function actualizarBadge() {
  const badge = document.getElementById("badgeCarrito");
  if (badge) badge.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
}

function actualizarCarritoUI() {
  const lista = document.getElementById("lista-carrito");
  if (!lista) return;
  lista.innerHTML = "";

  carrito.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("producto-carrito");
    div.innerHTML = `
      <p>${producto.nombre} - €${producto.precio} x ${producto.cantidad}</p>
      <button class="btn-restar">-</button>
      <button class="btn-sumar">+</button>
      <button class="btn-eliminar">Eliminar</button>
    `;
    // eventos botones
    div.querySelector(".btn-restar").addEventListener("click", () => {
      if (producto.cantidad > 1) {
        producto.cantidad--;
      } else {
        carrito.splice(index, 1);
      }
      guardarCarrito();
    });

    div.querySelector(".btn-sumar").addEventListener("click", () => {
      producto.cantidad++;
      guardarCarrito();
    });

    div.querySelector(".btn-eliminar").addEventListener("click", () => {
      carrito.splice(index, 1);
      guardarCarrito();
    });

    lista.appendChild(div);
  });
}

function actualizarTotal() {
  const totalEl = document.getElementById("totalCarrito");
  if (!totalEl) return;
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  totalEl.textContent = `€${total.toFixed(2)}`;
}

// ==========================
// EVENTOS
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  actualizarBadge();
  actualizarCarritoUI();
  actualizarTotal();

  const btnAbrir = document.getElementById("btnAbrirCarrito");
  const modal = document.getElementById("modalCarrito");
  const btnCerrar = modal?.querySelector(".cerrar");
  const btnVaciar = document.getElementById("btnVaciarCarrito");

  if (btnAbrir && modal) {
    btnAbrir.addEventListener("click", () => modal.style.display = "block");
  }

  if (btnCerrar) {
    btnCerrar.addEventListener("click", () => modal.style.display = "none");
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      carrito = [];
      guardarCarrito();
    });
  }
});

// ==========================
// FUNCIONES GLOBALES (ej: desde botones "Agregar")
// ==========================
function agregarAlCarrito(producto) {
  const existe = carrito.find(p => p.id === producto.id);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  guardarCarrito();
}
