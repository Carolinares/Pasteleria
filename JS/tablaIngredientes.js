const $templateAdminIngredientes = document.getElementById("template-admin-ingredientes").content,
  $tablaIngredientes = document.querySelector(".tabla-ingredientes"),
  $formIngredientes = document.getElementById("form-ingredientes"),
  $headerTabla = document.querySelector(".tabla-header");

// Escuchar cambio de pestaña (tab)
$tabs.addEventListener("change", function() {
    tabla = this.querySelector("input[name='tab']:checked").dataset.tab;

    if(tabla === "productos"){
        $tablaIngredientes.setAttribute("hidden", null);
        $tablaProductos.removeAttribute("hidden");
        $headerTabla.children[0].textContent = "Administrar productos";
        $headerTabla.children[1].textContent = "Agregar producto";
    }

    if(tabla === "ingredientes"){
        $tablaProductos.setAttribute("hidden", null);
        $tablaIngredientes.removeAttribute("hidden");
        $headerTabla.children[0].textContent = "Administrar ingredientes";
        $headerTabla.children[1].textContent = "Agregar ingrediente";
    }
})

const traerIngredientes = async (uri) => {
let headersList = {
    "Content-Type": "application/json",
    "acces-control-allow-origin": "*",
};

try {
    const res = await fetch(uri, {
        headers: headersList,
    }),
    data = await res.json();
    return data;
} catch (err) {
    return err;
}
};

const gestionarIngredientes = async () => {
    //Traer todos los productos

    const ingredientes = await traerIngredientes("http://localhost:8080/api/ingredientes");

    ingredientes.forEach((ingrediente) => {
        $templateAdminIngredientes.querySelector(".nombre").textContent = ingrediente.nombre;
        $templateAdminIngredientes.querySelector(".descripcion").textContent = ingrediente.descripcion;

        //dataset aributos de producto para acciones editar y borrar
/*         $templateAdminIngredientes.querySelector(".editar").dataset.id = ingrediente.id;
        $templateAdminIngredientes.querySelector(".editar").dataset.imagen = ingrediente.urlImagen;
        $templateAdminIngredientes.querySelector(".editar").dataset.nombre = ingrediente.nombre;
        $templateAdminIngredientes.querySelector(".editar").dataset.descripcion = ingrediente.descripcion;
        $templateAdminIngredientes.querySelector(".editar").dataset.precio = ingrediente.precio;
        $templateAdminIngredientes.querySelector(".borrar").dataset.id = ingrediente.id; */
    
        const $clon = document.importNode($templateAdminIngredientes, true);
        const divColor = document.createElement("div");
        divColor.classList.add("color-ingrediente");
        divColor.style.backgroundColor = `${ingrediente.color}`;
        $clon.querySelector(".color").appendChild(divColor);

        $fragmento.appendChild($clon);
    });

    $tablaIngredientes.querySelector("tbody").appendChild($fragmento);
}

gestionarIngredientes();

