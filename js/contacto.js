// ==========================
// INICIALIZAR EMAILJS
// ==========================
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
  const telefonoRegex = /^(6|7|9)\d{8}$/;

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
  if(!comentarios){ document.getElementById('error-comentarios').textContent = 'Por favor ingresa tus comentarios.'; document.getElementById('comentarios').classList.add('error-border'); valid=false; }

  if(!valid) return;

  btn.value = 'Sending...';
  emailjs.sendForm('default_service','template_ziot0lo', this)
    .then(()=>{ btn.value='Send Email'; alert('✅ Mensaje enviado con éxito'); this.reset(); })
    .catch(err=>{ btn.value='Send Email'; alert('❌ Error al enviar: '+JSON.stringify(err)); });
});
