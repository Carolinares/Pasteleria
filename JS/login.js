const loginBtn = document.querySelector('.login__btn');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

loginBtn.addEventListener('click', (event) => {
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

function validar(email, password) {
  const storedData = JSON.parse(localStorage.getItem('formData'));
  
  if (!storedData || email !== storedData.email || password !== storedData.password) {
    alert('Email o contraseña incorrectos o no se encontró información de registro.');
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
};
