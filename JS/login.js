import * as api from "../services/api.service.js";
import { Alerta, Dialogo, acciones } from "./elementos.js";
const loginBtn = document.querySelector('.login__btn'),
   $emailInput = document.getElementById('email'),
   $passwordInput = document.getElementById('password'),
   $allInput = document.querySelectorAll(".login-form [required]");

let alertaLogin;
const $span = document.createElement("span");
$span.id = "aviso";
$span.textContent = "*Los datos ingresados son incorrectos";
$span.classList.add("contacto__form-error", "none");
loginBtn.insertAdjacentElement("beforebegin", $span);

document.addEventListener("keyup", (e) => {
  if(e.target.matches(".login-form [required]")){
    let $input = e.target,
        pattern = $input.pattern

        if (pattern || $input.value !== "") {
          let regex = new RegExp(pattern);
          if(!regex.exec($input.value)){
            document.getElementById("aviso").classList.add("is-active");
            loginBtn.classList.add("button-disabled");
          }else{
            document.getElementById("aviso").classList.remove("is-active");
            loginBtn.classList.remove("button-disabled");
          }
        }
  } 
});

//login con backend
loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const credenciales = JSON.stringify({
    "correo": $emailInput.value,
    "clave": $passwordInput.value
  });
  const respuesta =  await api.login(credenciales);
  console.log(respuesta);
  if (!respuesta || !respuesta.res.ok) {
    alertaLogin = new Alerta('Usuario o contraseña incorrecta.', 'error');
    alertaLogin.mostrar();
    throw { status: res.status, statusText: res.statusText };
  }

  if (respuesta.data){
    localStorage.setItem("sesion", JSON.stringify(respuesta.data));
    window.location.href = "./index.html"
  }
});

const miDialogo = new Dialogo('Título de mi alerta', 'Este es el texto de mi diálogo.', 'error', acciones);

const miAlerta = new Alerta('Este es el texto de mi alerta.', 'error', 5000);
const miAlerta2 = new Alerta('Este es otro texto de mi alerta.', 'success');
const miAlerta3 = new Alerta('Este es un tercer texto de mi alerta.', 'danger');

//miDialogo.mostrar();