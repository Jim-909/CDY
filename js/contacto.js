document.addEventListener("DOMContentLoaded", () => {

  emailjs.init(publicKey);
  const btn = document.getElementById('button');

  const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
  const datosFormularioGuardados = JSON.parse(localStorage.getItem('formulario')) || {nombre: '', email: '', telefono: '', comentarios: ''};

  console.log("Datos del carrito cargados:", carritoGuardado);
  console.log("Datos del formulario cargados:", datosFormularioGuardados);

  document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault();

    // TOMAR VALORES
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const comentarios = document.getElementById('comentarios').value.trim();

    // GUARDAR FORMULARIO EN LOCALSTORAGE
    const datosFormulario = { nombre, email, telefono, comentarios };
    localStorage.setItem("formulario", JSON.stringify(datosFormulario));

    // VALIDACIONES
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[67]\d{8}$/;

    ['nombre','email','telefono','comentarios'].forEach(id=>{
      document.getElementById(`error-${id}`).textContent = '';
      document.getElementById(id).classList.remove('error-border');
    });

    let valid = true;
    if(!nombre){ document.getElementById('error-nombre').textContent = 'Por favor ingresa tu nombre.'; document.getElementById('nombre').classList.add('error-border'); valid=false; }
    if(!emailRegex.test(email)){ document.getElementById('error-email').textContent = 'Por favor ingresa un correo válido.'; document.getElementById('email').classList.add('error-border'); valid=false; }
    if(!telefono){ document.getElementById('error-telefono').textContent = 'Por favor ingresa tu teléfono.'; document.getElementById('telefono').classList.add('error-border'); valid=false; }
    else if(!telefonoRegex.test(telefono)){ document.getElementById('error-telefono').textContent = 'Teléfono español válido de 9 dígitos.'; document.getElementById('telefono').classList.add('error-border'); valid=false; }
    if(!comentarios){ document.getElementById('error-comentarios').textContent = 'Por favor ingresa tus comentarios.'; document.getElementById('comentarios').classList.add('error-border'); valid=false; }

    if(!valid) return;

    // Obtener carrito actual y formatear como texto legible
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let carritoTexto = "";
    let totalGeneral = 0;

    carrito.forEach(item => {
      const partes = item.descripcion.split(" - ");
      const nombreItem = partes[0];
      const precio = parseFloat(partes[2].replace("€",""));
      const subtotal = precio * item.cantidad;
      carritoTexto += `${nombreItem} | Cantidad: ${item.cantidad} | Precio: €${precio.toFixed(2)} | Subtotal: €${subtotal.toFixed(2)}\n`;
      totalGeneral += subtotal;
    });

    carritoTexto += `TOTAL GENERAL: €${totalGeneral.toFixed(2)}`;
    document.getElementById("inputCarrito").value = carritoTexto;

    // Enviar con emailjs
    btn.value = 'Sending...';
    emailjs.sendForm(servicioID,templateID, this)
      .then(()=>{
        btn.value='Send Email';
        alert('✅ Mensaje enviado con éxito');
        this.reset();
      })
      .catch(err=>{
        btn.value='Send Email';
        alert('❌ Error al enviar: '+JSON.stringify(err));
      });

  });

});
