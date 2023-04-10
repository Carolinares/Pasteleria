import * as api from "../services/api.service.js";

const $formListaIngredientes = document.getElementById("lista-ingredientes"),
    $formCotizacion = document.getElementById("form-cotizacion"),
    $backdrop = document.querySelector(".backdrop"),
    $telefono = document.getElementById("telefono"),
    $img = document.getElementById("image-preview"),
    $inputImg = document.getElementById("imagen-producto"),
    sesion = localStorage.getItem("sesion"),
    sesionObject = JSON.parse(sesion),
    $listaTuPastel = document.getElementById("lista-tu-pastel"),
    $tabsCategorias = document.getElementById("pasosPastel"),
    $templateIngredientes = document.getElementById("template-opciones-pastel").content,
    $templateCategorias = document.getElementById("template-categorias").content,
    $fragmentoCategoria = document.createDocumentFragment(),
    $tituloListaIngredientes = document.querySelector(".tilulo-lista-opciones"),
    $fragmentoIngrediente = document.createDocumentFragment();

const $coberturaPastel = document.getElementById("coberturaPastel"),
    $rellenoPastel = document.getElementById("rellenoPastel"),
    $masaPastel = document.getElementById("masaPastel"),
    pastelCreado = {};
    
let pastelPorCotizar = {},
    urlImagenCorreo = "";

const listarCategorias = async () => {
    const respuestaCategorias = await api.getAllCategoriasIngredientes();
    if(!respuestaCategorias.res.ok)return;
    const categorias = respuestaCategorias.data;
    
    categorias.forEach((categoria) => {
        $templateCategorias.querySelector(".opcion-input").setAttribute("id", categoria.nombre);
        $templateCategorias.querySelector(".opcion").setAttribute("for", categoria.nombre);
        $templateCategorias.querySelector(".opcion").textContent = categoria.nombre;
        
        const $clon = document.importNode($templateCategorias, true);
        $fragmentoCategoria.appendChild($clon);

        listarIngredientes(categoria.ingrediente, categoria.nombre);
    });

    $tabsCategorias.appendChild($fragmentoCategoria);
    $tabsCategorias.innerHTML += `
    <div class="field-form">
        <input type="radio" name="pasos" id="cotizar" hidden>
        <label class="opcion" for="cotizar">Cotizar</label>
    </div>`;
    
    $tabsCategorias.children[0].children[1].classList.add("opcion1");
    $tabsCategorias.children[0].children[0].setAttribute("checked", null);
    const primerCategoria = $tabsCategorias.children[0].children[1].textContent;

    listarIngredientesPorCategoria(primerCategoria);
    $tituloListaIngredientes.textContent = `Elige ${primerCategoria}`;
}

const listarIngredientes = (ingredientes, categoria) => {
    ingredientes.forEach((ingrediente) => {
        const input = $templateIngredientes.querySelector("input"),
            label = $templateIngredientes.querySelector("label");

        input.setAttribute("id", ingrediente.id);
        input.setAttribute("name", categoria);
        input.dataset.nombre = ingrediente.nombre;
        input.dataset.color = ingrediente.color;
        label.setAttribute("for", ingrediente.id);
        label.dataset.categoria = categoria;
        label.textContent = ingrediente.nombre;

        const $clon = document.importNode($templateIngredientes, true);
        $fragmentoIngrediente.appendChild($clon);
    });

    $formListaIngredientes.appendChild($fragmentoIngrediente);
}

const listarIngredientesPorCategoria = (categoria) => {
    $tituloListaIngredientes.textContent = `Elige ${categoria}`;
    const labels = $formListaIngredientes.querySelectorAll("label");
    
    labels.forEach(label => {
        label.removeAttribute("hidden");
    })

    const labelsdiferentes = Array.from(labels).filter(label => label.dataset.categoria !== categoria);

    labelsdiferentes.forEach(labelDiferente => {
        labelDiferente.setAttribute("hidden", null);
    })
}

$tabsCategorias.addEventListener("change", e => {
    cotizar(e.target.id);
})

//Cambiar colores del pastel
$formListaIngredientes.addEventListener("change", e => {

    if(e.target.name === "Cobertura"){
        $coberturaPastel.style.fill = e.target.dataset.color;
        $listaTuPastel.children[0].children[1].textContent = e.target.dataset.nombre;
        pastelCreado.cobertura = e.target.dataset.nombre;
    }

    if(e.target.name === "Relleno"){
        $rellenoPastel.style.fill = e.target.dataset.color;
        $listaTuPastel.children[1].children[1].textContent = e.target.dataset.nombre;
        pastelCreado.relleno = e.target.dataset.nombre; 
    }

    if(e.target.name === "Masa"){
        $masaPastel.style.fill = e.target.dataset.color;
        $listaTuPastel.children[2].children[1].textContent = e.target.dataset.nombre;
        pastelCreado.masa = e.target.dataset.nombre; 
    }
})

//cotizar
const cotizar = (categoria) => {
    if(categoria === "cotizar"){
        $formCotizacion.nombre.value = `${sesionObject.nombre} ${sesionObject.apellido}`;
        $formCotizacion.correo.value = sesionObject.correo;
        $formCotizacion.telefono.value = sesionObject.telefono;
        $formCotizacion.descripcion.value = `Hola, deseo cotizar un pastel con las siguientes características:
        
        ♥ Cobertura: ${pastelCreado.cobertura || "Sin definir"}
        ♥ Relleno: ${pastelCreado.relleno || "Sin definir"}
        ♥ Masa: ${pastelCreado.masa || "Sin definir"}
        `;

        //Estructura de cotización para enviar por correo
        pastelPorCotizar = {
            asunto: `Arma tu pastel - ${sesionObject.nombre} ${sesionObject.apellido}`,
            remitente: sesionObject.correo,
            mensaje: `
            <body>
                <p><strong>Remitente: </strong> ${sesionObject.nombre} ${sesionObject.apellido} - ${sesionObject.correo}</p>
                <br>
                <strong>Mensaje:</strong>
                <p>Hola, deseo cotizar un pastel con las siguientes características: </p>
                <ul>${$listaTuPastel.innerHTML}</ul>
                <br>
                <img src="${urlImagenCorreo}">
                <p><strong>Teléfono de contacto: </strong> ${sesionObject.telefono}</p>
                <br>
                <a href="www.tortones.com">www.tortones.com</a>
            </body>
            `
        }

        $formCotizacion.parentElement.removeAttribute("hidden");
        $formListaIngredientes.parentElement.setAttribute("hidden", null);
        $listaTuPastel.parentElement.setAttribute("hidden", null);
    }else{
        $formCotizacion.parentElement.setAttribute("hidden", null);
        listarIngredientesPorCategoria(categoria);
        $formListaIngredientes.parentElement.removeAttribute("hidden");
        $listaTuPastel.parentElement.removeAttribute("hidden");
    }
}

//Previsualizar imagen en formulario
/* $inputImg.addEventListener("change", function (e) {
    if (this.files && this.files[0]) {
      const imgUrl = URL.createObjectURL(this.files[0]);
      $img.setAttribute("src", imgUrl);
    }
  }); */

document.addEventListener("click", async (e) => {
    if(e.target.matches(".aceptar")){
        $backdrop.setAttribute("hidden", null);
    }
})

document.addEventListener("submit", async (e) => {
    if(e.target === $formCotizacion){
        e.preventDefault();
        if ($formCotizacion.imagen.files[0]) {
            const imagen = new FormData();
            imagen.append("archivo", $formCotizacion.imagen.files[0]);
            //Cargar imagen
            const respuestaImg = await api.crearArchivo(imagen);
            urlImagenCorreo = respuestaImg.data.url;
            pastelPorCotizar.mensaje = `
            <body>
                <p><strong>Remitente: </strong> ${sesionObject.nombre} ${sesionObject.apellido} - ${sesionObject.correo}</p>
                <br>
                <strong>Mensaje:</strong>
                <p>Hola, deseo cotizar un pastel con las siguientes características: </p>
                <ul>${$listaTuPastel.innerHTML}</ul>
                <br>
                <img src="${urlImagenCorreo}">
                <p><strong>Teléfono de contacto: </strong> ${sesionObject.telefono}</p>
                <br>
                <a href="www.tortones.com">www.tortones.com</a>
            </body>
            `
        } else{
            pastelPorCotizar.mensaje = `
            <body>
                <p><strong>Remitente: </strong> ${sesionObject.nombre} ${sesionObject.apellido} - ${sesionObject.correo}</p>
                <br>
                <strong>Mensaje:</strong>
                <p>Hola, deseo cotizar un pastel con las siguientes características: </p>
                <ul>${$listaTuPastel.innerHTML}</ul>
                <br>
                <p><strong>Teléfono de contacto: </strong> ${sesionObject.telefono}</p>
                <br>
                <a href="www.tortones.com">www.tortones.com</a>
            </body>
            `
        }
        const respuesta = await api.enviarCotizacion(JSON.stringify(pastelPorCotizar));
        console.log(respuesta);
        if(respuesta.res.ok){
            $telefono.textContent = sesionObject.telefono;
            $backdrop.removeAttribute("hidden");
        }
    }
})

listarCategorias();