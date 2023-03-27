(function() {
    const form = document.querySelectorAll('.requires-validation');
    const $inputs = document.querySelectorAll('.requires-validation  [required]');
    const users = localStorage.getItem("users");

    $inputs.forEach((input) => {
      const $span = document.createElement("span");
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add("contacto__form-error", "none");
      input.insertAdjacentElement("afterend", $span);
    });
    
    document.addEventListener("keyup", (e) => {
      if(e.target.matches(".requires-validation [required]")){
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

    Array.from(form).forEach((input) => {
      input.addEventListener('submit', (event) => {
        if (!input.checkValidity()) { 
          event.preventDefault(); 
          event.stopPropagation(); 
        } else {
          const formData = new FormData(input);
          if(!formData.get("rol")){
            formData.append("rol", "cliente");
          }
          const serializedData = Object.fromEntries(formData.entries());

          if(users){
            //Agregar usuario
            let allUsers = JSON.parse(users);
            allUsers.push(serializedData);
            allUsers = JSON.stringify(allUsers)
            localStorage.setItem('users', allUsers);
            return
          } else {
            //Crear primer usuario
            const newUser = JSON.stringify([serializedData])
            localStorage.setItem('users', newUser);
          }
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
    
    if(user.rol === "admin"){
      const $selectRol = document.createElement("div");
      $selectRol.innerHTML = `
        <select class="form-select" required>
          <option selected value="Cliente">Cliente</option>
          <option value="Administrador">Administrador</option>
        </select>
      `
      $pass.insertAdjacentElement("beforebegin", $selectRol);
    }
  }
  insertSelectRoles();