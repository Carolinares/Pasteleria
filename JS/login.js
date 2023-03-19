const loginBtn = document.querySelector('.login__btn');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

loginBtn.addEventListener('click', (event) => {
  console.log("Aqui estoy")
  
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !isValidEmail(email)) {
    event.preventDefault();
    alert('Por favor ingrese un email válido');
    return;
  }

  if (!password || password.length < 8) {
    event.preventDefault();
    alert('Por favor ingrese una contraseña de mínimo 8 caracteres');
    return;
  } else if (!isValidPassword(password)) {
    const passwordStrength = getPasswordStrength(password);
    alert(`La fortaleza de su contraseña es ${passwordStrength}`);
    return;
  }

  validar()
  
 
});

function validar() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var storedEmail = localStorage.getItem("email");
  var storedPassword = localStorage.getItem("password");

  if (email == storedEmail && password == storedPassword) {
    alert("Bienvenido " );
  } else {
    alert("Email o contraseña incorrectos");
  }
}  

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

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return passwordRegex.test(password);
}
