const scrollTo = document.getElementsByClassName("scrollTo");
const form = document.getElementById("contacto__form");
const allInput = document.getElementsByClassName("input-mitad");


Array.from(scrollTo).forEach(el => {
  el.addEventListener("click", function (e) {
    const target = e.currentTarget.getAttribute("target");
    const sectionObjetivo = document.getElementById(target);
    const position = sectionObjetivo.offsetTop - 100;
    window.scrollTo({
      top: position, behavior: "smooth"
    })
  })
})


Array.from(allInput).forEach(el => {
  el.addEventListener("blur", () => {
    validateForm(el)
  })
});


function validateForm(elemento) {
  const nombre = document.getElementById("form-nombre");
  const email = document.getElementById("form-correo");
  const telefono = document.getElementById("form-telefono");
  const mensaje = document.getElementById("form-mensaje");
  const buttonForm = document.querySelector('button[type="submit"]');
  const allAllert = document.getElementsByClassName("alert");
  const alertNombre = nombre.parentElement.parentElement.children[2];
  const alertEmail = email.parentElement.parentElement.children[2];
  const alertTelefono = telefono.parentElement.parentElement.children[2];
  const alertMensaje = mensaje.parentElement.children[1];
  const nombreElemento = elemento.getAttribute('name');

  if (!nombre.value ||
    typeof (nombre.value) !== "string" ||
    !(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/g.test(nombre.value))) {
    buttonForm.classList.add("button-disabled");
    alertNombre.classList.add("alert-error");
    nombre.classList.remove('input-correct');
    if (nombreElemento == "nombre") {
      if (!nombre.value) {
        alertNombre.textContent = '* Este campo es obligatorio';
      } else if (!(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/g.test(nombre.value))) {
        alertNombre.textContent = 'El dato ingresado no es un nombre';
      }
      return false;
    } 
  }else {
    alertNombre.classList.remove('alert-error');
    nombre.classList.add('input-correct');
  }

  if(!email.value ||
    !(/[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(email.value))) {
      buttonForm.classList.add("button-disabled");
      alertEmail.classList.add("alert-error");
      email.classList.remove('input-correct');
      if (nombreElemento == "correo") {
        if (!email.value) {
          alertEmail.textContent = '* Este campo es obligatorio';
        }else if (!(/[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(email.value))) {
          alertEmail.textContent = 'El dato ingresado no es un correo electrónico';
        }
        return false;
      }
    }else {
      alertEmail.classList.remove('alert-error');
      email.classList.add('input-correct');
    }

    if(!telefono.value ||
      telefono.value.length !== 10){
        buttonForm.classList.add("button-disabled");
        alertTelefono.classList.add("alert-error");
        telefono.classList.remove('input-correct');
        if (nombreElemento == "telefono") {
          if (!telefono.value){
            alertTelefono.textContent = '* Este campo es obligatorio';
          }else if (telefono.value.length !== 10){
            alertTelefono.textContent = 'El número de teléfono debe tener 10 dígitos';
          }
          return false;
        }
      }else {
        alertTelefono.classList.remove('alert-error');
        telefono.classList.add('input-correct');
      }

    
    if (!mensaje.value) {
      buttonForm.classList.add("button-disabled");
      alertMensaje.classList.add("alert-error");
      mensaje.classList.remove('input-correct');
      if (nombreElemento == "mensaje") {
        alertMensaje.textContent = 'No has escrito ningún mensaje';
      }
      return false;
    } else {
      alertMensaje.classList.remove('alert-error');
      mensaje.classList.add('input-correct');
    }

    // If all the fields are valid, allow the form to be submitted
    Array.from(allAllert).forEach(el => {
      el.classList.remove('alert-error');
    });

    buttonForm.classList.remove("button-disabled");
    return true;
  }

  