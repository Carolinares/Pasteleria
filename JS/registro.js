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

    //Recorrer inputs del formulario y construir objeto "datosUsuario"
    Array.from(form).forEach((input) => {
      input.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!input.checkValidity()) { 
          event.stopPropagation(); 
        } else {
          const formData = new FormData(input);
          if(!formData.get("rol")){
            formData.append("rol", "cliente");
          }
          const datosUsuario = JSON.stringify(Object.fromEntries(formData.entries()));
          const respuesta = await registrar("https://edwinsuesca.net:8443/api/usuarios", datosUsuario);
          console.log(respuesta);
        }
  
        input.classList.add('was-validated'); 
      }, false);
    });
  })();
  
  const registrar = async (uri, datosUsuario) => {
    let headersList = {
      "Content-Type": "application/json",
      "acces-control-allow-origin": "*"
    }
  
    const requestOptions = {
      method: 'POST',
      headers: headersList,
      body: datosUsuario
    };
  
    try{
      const res = await fetch(uri, requestOptions),
      data = await res.json();
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      return {data, res}
    } catch (error) {
      let message = error.statusText || "Ocurrio un error";
      console.log(message);
    }
  }

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
