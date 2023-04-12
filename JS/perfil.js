import * as api from "../services/api.service.js";

const sesion = JSON.parse(localStorage.getItem("sesion")),
      $formDatosUSuario = document.getElementById("form-datos"),
      $formClave = document.getElementById("form-clave"),
      $buttonClave = document.querySelector(".button-clave")
;

const precargarFormularioDatos = async() => {
  const respuesta = await api.getUsuarioById(sesion.id);
  const datosUsuario = respuesta.data;
  console.log(datosUsuario);

  //Precargar datos del usuario
  $formDatosUSuario.nombre.value = datosUsuario.nombre;
  $formDatosUSuario.apellido.value = datosUsuario.apellido;
  $formDatosUSuario.correo.value = datosUsuario.correo;
  $formDatosUSuario.telefono.value = datosUsuario.telefono;
  $formDatosUSuario.direccion.value = datosUsuario.direccion;
}

precargarFormularioDatos();

$formClave.addEventListener("keyup", (e) => {
  const nuevaClave = $formClave.claveNueva.value;
  const confirmaClave = $formClave.claveConfirmar.value;
  if(nuevaClave === "" || confirmaClave === ""){
    $buttonClave.classList.add("button-disabled");
    return;
  }

  if(nuevaClave === confirmaClave){
    $buttonClave.classList.remove("button-disabled");
  } else {
    $buttonClave.classList.add("button-disabled");
  }
})

document.addEventListener("submit", async (e) =>{
  //Actualizar datos de usuario
  if(e.target.matches("#form-datos")){
    e.preventDefault();
    if($formDatosUSuario.checkValidity()){
      const nuevosDatosUsuario = {
        nombre: $formDatosUSuario.nombre.value,
        apellido: $formDatosUSuario.apellido.value,
        telefono: $formDatosUSuario.telefono.value,
        direccion: $formDatosUSuario.direccion.value
      }

      const respuesta = await api.actualizarUsuario(JSON.stringify(nuevosDatosUsuario), sesion.id);
      console.log(respuesta);
      if (!respuesta.res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }
    
      if (respuesta.data){
        localStorage.setItem("sesion", JSON.stringify(respuesta.data));
        location.reload();
      }
    }
  }

  //Enviar nueva clave
  if(e.target.matches("#form-clave")){
    e.preventDefault();
      const nuevosDatos = {
        correo: sesion.correo,
        claveActual: $formClave.claveActual.value,
        claveNueva: $formClave.claveNueva.value
      }

      const respuesta = await api.actualizaClave(JSON.stringify(nuevosDatos));
      console.log(respuesta);
      if(respuesta.res.ok){
        location.reload();
      }
    }
})