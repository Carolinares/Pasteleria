//const base_uri = "http://localhost:8080/api"; // Entorno de desarrollo
const base_uri = "https://edwinsuesca.net:8443/api"; // Entorno de producción

const peticionAPI = async (uri, requestOptions) => {
    try {
        const res = await fetch(uri, requestOptions),
          data = await res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        return { data, res };
    } catch (error) {
        console.log(error);
        let message = error.statusText || "Ocurrio un error";
        console.log(message);
        return { data: null, res: error};
    }
}

//REGISTRAR USUARIO
export const registrar = async (datosUsuario) => {
    const uri = `${base_uri}/usuarios`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "POST",
      body: datosUsuario
    };

    return await peticionAPI(uri, requestOptions);
}

// ACTUALIZAR USUARIO POR ID
export const actualizarUsuario = async (datosUsuario, id) => {
    const uri = `${base_uri}/usuarios/${id}`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "PUT",
      body: datosUsuario
    };

    return await peticionAPI(uri, requestOptions);
}

// ACTUALIZAR CLAVE DE USUARIO
export const actualizaClave = async (datos) => {
    const uri = `${base_uri}/usuarios/cambiar-clave`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "PUT",
      body: datos
    };

    return await peticionAPI(uri, requestOptions);
}

export const getUsuarioById = async (id) => {
    const uri = `${base_uri}/usuarios/${id}`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "GET"
    };

    return await peticionAPI(uri, requestOptions);
}

//INICIO DE SESIÓN
export const login = async (credenciales) => {
    const uri = `${base_uri}/login`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "POST",
      body: credenciales
    };

    return await peticionAPI(uri, requestOptions);
}

//ENVIAR COTIZACION
export const enviarCotizacion = async (cotizacion) => {
    const uri = `${base_uri}/cotizacion`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "POST",
      body: cotizacion
    };

    return await peticionAPI(uri, requestOptions);
}

// NOTIFICACIÓN ADMIN VÍA EMAIL
export const notificarAdmin = async (notificacion) => {
    const uri = `${base_uri}/notificacion-admin`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "POST",
      body: notificacion
    };

    return await peticionAPI(uri, requestOptions);
}


//CRUD CATEGORÍAS DE INGREDIENTES
export const getAllCategoriasIngredientes = async () => {
    const uri = `${base_uri}/categorias-ingredientes`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "GET"
    };

    return await peticionAPI(uri, requestOptions);
}

//CRUD INGREDIENTES
export const getAllIngredientes = async () => {
    const uri = `${base_uri}/ingredientes`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "GET"
    };

    return await peticionAPI(uri, requestOptions);
}

export const crearIngrediente = async (ingrediente) => {
    const uri = `${base_uri}/ingredientes`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "POST",
      body: ingrediente
    };

    return await peticionAPI(uri, requestOptions);
}

export const editarIngrediente = async (id, ingrediente) => {
    const uri = `${base_uri}/ingredientes/${id}`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "PUT",
      body: ingrediente
    };

    return await peticionAPI(uri, requestOptions);
}

export const eliminarIngrediente = async (id) => {
    const uri = `${base_uri}/ingredientes/${id}`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "DELETE"
    };

    return await peticionAPI(uri, requestOptions);
}

//CRUD PRODUCTOS
export const getAllProductos = async () => {
    const uri = `${base_uri}/productos`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "GET"
    };

    return await peticionAPI(uri, requestOptions);
}

export const crearProducto = async (producto) => {
    const uri = `${base_uri}/productos`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "POST",
      body: producto
    };

    return await peticionAPI(uri, requestOptions);
}

export const editarProducto = async (id, producto) => {
    const uri = `${base_uri}/productos/${id}`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "PUT",
      body: producto
    };

    return await peticionAPI(uri, requestOptions);
}

export const eliminarProducto = async (id) => {
    const uri = `${base_uri}/productos/${id}`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "DELETE"
    };

    return await peticionAPI(uri, requestOptions);
}

//CRUD PORCIONES
export const getAllPorciones = async () => {
    const uri = `${base_uri}/porciones`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "GET"
    };

    return await peticionAPI(uri, requestOptions);
}

//CRUD ARCHIVOS
export const crearArchivo = async (archivo) => {
    const uri = `${base_uri}/archivos/cargar`;
    const headersList = {
        "Accept": "*/*",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "POST",
      body: archivo
    };

    return await peticionAPI(uri, requestOptions);
}

//CRUD COMPRAS
export const crearCompra = async (compra) => {
    const uri = `${base_uri}/compras`;
    const headersList = {
        "Content-Type": "application/json",
        "acces-control-allow-origin": "*",
    };
   
    const requestOptions = {
      headers: headersList,
      method: "POST",
      body: compra
    };

    return await peticionAPI(uri, requestOptions);
}