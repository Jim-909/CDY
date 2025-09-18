/* octener los datos del input del carrito de compra  */
function obtenerDatosCarrito() {
  // Recupera el carrito desde localStorage si no existe el div en la página
  const listaCarrito = document.getElementById("lista-carrito");
  if(listaCarrito) {
    const productos = [];
    Array.from(listaCarrito.children).forEach(div => {
      const nombre = div.querySelector("span").textContent;
      const cantidad = div.querySelector("input").value;
      productos.push({ nombre, cantidad });
    });
    // Guarda el carrito en localStorage para otras páginas
    localStorage.setItem('carrito', JSON.stringify(productos));
    return productos;
  } else {
    // Si no existe el div, recupera el carrito guardado
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }
}
emailjs.init('rad_eXXQPZOhiROyL');
const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function(event){
  event.preventDefault();

  // TOMAR VALORES
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const comentarios = document.getElementById('comentarios').value.trim();

  // EXPRESIONES REGULARES
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telefonoRegex = /^[67]\d{8}$/;

  // LIMPIAR ERRORES
  ['nombre','email','telefono','comentarios'].forEach(id=>{
    document.getElementById(`error-${id}`).textContent = '';
    document.getElementById(id).classList.remove('error-border');
  });

  let valid = true;

  if(!nombre){ document.getElementById('error-nombre').textContent = 'Por favor ingresa tu nombre.'; document.getElementById('nombre').classList.add('error-border'); valid=false; }
  if(!emailRegex.test(email)){ document.getElementById('error-email').textContent = 'Por favor ingresa un correo válido.'; document.getElementById('email').classList.add('error-border'); valid=false; }
  if(!telefono){ document.getElementById('error-telefono').textContent = 'Por favor ingresa tu teléfono.'; document.getElementById('telefono').classList.add('error-border'); valid=false; }
  else if(!telefonoRegex.test(telefono)){ document.getElementById('error-telefono').textContent = 'Teléfono español válido de 9 dígitos.'; document.getElementById('telefono').classList.add('error-border'); valid=false; }
  if(!comentarios){ document.getElementById('error-comentarios').textContent = 'Por favor ingresa tus comentarios.'; document.getElementById('comentarios').classList.add('error-border'); 
    
  valid=false; }

  if(!valid) return;
  const carrito = obtenerDatosCarrito();
  document.getElementById("inputCarrito").value = JSON.stringify(carrito);
  // El formulario se enviará con el campo oculto


  btn.value = 'Sending...';
  emailjs.sendForm('service_quao52m','template_ziot0lo', this)
    .then(()=>{ btn.value='Send Email'; alert('✅ Mensaje enviado con éxito'); this.reset(); })
    .catch(err=>{ btn.value='Send Email'; alert('❌ Error al enviar: '+JSON.stringify(err)); });
});
