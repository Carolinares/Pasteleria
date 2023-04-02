const loginBtn = document.querySelector('.login__btn'),
   emailInput = document.getElementById('email'),
   passwordInput = document.querySelector('#password');

  const $span = document.createElement("span");
  $span.id = "aviso";
  $span.textContent = "*Los datos ingresados son incorrectos";
  $span.classList.add("contacto__form-error", "none");
  loginBtn.insertAdjacentElement("beforebegin", $span);

  //para entorno de pruebas en vscode
  loginBtn.addEventListener("click", e => {
    e.preventDefault();
    const respuesta = login();
    if (respuesta){
      const sesion = JSON.stringify(respuesta) 
      localStorage.setItem("sesion", sesion);
      window.location.href = "./index.html"
      document.getElementById("aviso").classList.remove("is-active");
    }else{
      document.getElementById("aviso").classList.add("is-active");
    }
});

const login = () => {
  const data = localStorage.getItem("users");
  if(data){
    const users = JSON.parse(data);
    const userFound = users.find(user => user.email === emailInput.value);
    if (!userFound) return false;
    if(userFound.password === passwordInput.value) return {name: userFound.name, rol: userFound.rol};
    return false
  }
  return false
}












