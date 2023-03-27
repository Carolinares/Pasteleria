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












/* loginBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const emailValidation = validarEmail(email);
  const passwordValidation = validarContrasena(password);

  if (emailValidation && passwordValidation) {
    validar(email, password);
  }
});

function validarEmail(email) {
  if (!isValidEmail(email)) {
    alert('Por favor ingrese un email válido');
    return false;
  }
  return true;
};

function validarContrasena(password) {
  if (!isValidPassword(password)) {
    alert('Por favor ingrese una contraseña de mínimo 8 caracteres');
    return false;
  } else {
    const passwordStrength = getPasswordStrength(password);
    alert(`La fortaleza de su contraseña es ${passwordStrength}`);
  }
  return true;
}

//**
function validar(email, password) {
  const storedData = JSON.parse(localStorage.getItem('formData'));
  
  if (!storedData || email !== storedData.email || password !== storedData.password) {
    alert('Email o contraseña incorrectos o no se encontró información de registro.');

  validar()  
 
}};

function validar() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var storedEmail = localStorage.getItem("email");
  var storedPassword = localStorage.getItem("password");
  console.log("Desde validar");

  if (email == storedEmail && password == storedPassword) {
    alert("Bienvenido " );
//**
  } else {
    alert('Bienvenido');
  }
};

function getPasswordStrength(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  const length = password.length;
  const complexity = passwordRegex.test(password) ? 2 : 1;
  const strength = length * complexity;
  if (strength < 5) {
    return 'debil';
  } else if (strength < 9) {
    return 'media';
  } else {
    return 'fuerte';
  }
}

function isValidEmail(email){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function isValidPassword(password){
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return passwordRegex.test(password);
}; */
