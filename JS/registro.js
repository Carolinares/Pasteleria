import * as api from "../services/api.service.js";
import { Alerta, Dialogo, acciones } from "./elementos.js";
const $formRegistro = document.getElementById("formRegistro"),
      $botonRegistrar = document.querySelector(".button-registrar");
;
let alerta;
(function() {
    const form = document.querySelectorAll('.requires-validation');
    const $inputs = document.querySelectorAll('.requires-validation  [required]');

    $inputs.forEach((input) => {
      const $span = document.createElement("span");
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add("contacto__form-error", "none");
      input.insertAdjacentElement("afterend", $span);
    });

    const validarFormulario = () => {
      const nombreValido = $formRegistro.nombre.checkValidity();
      const apellidoValido = $formRegistro.apellido.checkValidity();
      const correoValido = $formRegistro.correo.checkValidity();
      const direccionValido = $formRegistro.direccion.checkValidity();
      const telefonoValido = $formRegistro.telefono.checkValidity();
      const claveValido = $formRegistro.clave.checkValidity();

      if(nombreValido &&
        apellidoValido &&
        correoValido &&
        direccionValido &&
        telefonoValido &&
        claveValido
        ){
          $botonRegistrar.classList.remove("button-disabled");
      } else{
        $botonRegistrar.classList.add("button-disabled");
      }
    }

    validarFormulario();
    
    document.addEventListener("keyup", (e) => {
      if(e.target.matches(".requires-validation [required]")){
        validarFormulario();
        let $input = e.target,
            pattern = $input.pattern;
    
            if (pattern && $input.value !== "") {
              let regex = new RegExp(pattern);
              return !regex.exec($input.value)
                ? document.getElementById($input.name).classList.add("is-active")
                : document.getElementById($input.name).classList.remove("is-active");
            }
      } 
    });

    //Recorrer inputs del formulario y construir objeto "datosUsuario"
    Array.from(form).forEach((input) => {
      input.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!input.checkValidity()) { 
          event.stopPropagation();
          alerta = new Alerta('Complete los campos con valores válidos.', 'error');
          alerta.mostrar();
        } else {
          const formData = new FormData(input);
          if(!formData.get("rol")){
            formData.append("rol", "cliente");
          }
          const datosUsuario = JSON.stringify(Object.fromEntries(formData.entries()));
          const respuesta = await api.registrar(datosUsuario);
          console.log(respuesta);
          if (respuesta.res.ok){
            alerta = new Alerta('Usuario registrado exitosamente.', 'success');
            alerta.mostrar();
          } else{
            alerta = new Alerta('No se pudo registrar el usuario.', 'error');
            alerta.mostrar();
          };
        }
  
        input.classList.add('was-validated'); 
      }, false);
    });
  })();

  const insertSelectRoles = () => {
    const $pass = document.getElementById("pass");
    const sesion = localStorage.getItem("sesion");
    const user = JSON.parse(sesion);
    if(!sesion) return;
    
    if(user.rol === "Administrador"){
      const $selectRol = document.createElement("div");
      $selectRol.innerHTML = `
        <select class="form-select" name="rol" required>
          <option selected value="Cliente">Cliente</option>
          <option value="Administrador">Administrador</option>
        </select>
      `
      $pass.insertAdjacentElement("beforebegin", $selectRol);
    }
  }
  insertSelectRoles();
