const loginBtn = document.querySelector('.login-btn');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

loginBtn.addEventListener('click', () => {
  
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  
  if (!email || !isValidEmail(email)) {
    
    alert('Por favor ingrese un email valido');
    return;
  }

  if (!password || password.length < 8) {
    
    alert('Por favor Ingrese una contraseña de minimo 8 caracteres');
    return;
  } else if (!isValidPassword(password)) {
    
    const passwordStrength = getPasswordStrength(password);
    alert(`Su contraseña es ${passwordStrength}`);
    return;
  }
  

  function getPasswordStrength(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const length = password.length;
    const complexity = passwordRegex.test(password) ? 2 : 1;
    const strength = length * complexity;
    if (strength < 16) {
      return 'weak';
    } else if (strength < 24) {
      return 'medium';
    } else {
      return 'strong';
    }
  }
  

  
});


function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

window.location.href = '/formularioAdmin.html';
