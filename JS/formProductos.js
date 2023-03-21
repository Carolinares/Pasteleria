function validarFormulario() {//Se define funcion
  let nombre = document.getElementById("nombre").value;
  let imagen = document.getElementById("imagen").value;//se obtiene valor-img ingresadoy se almacena en imagen
  let descripcion = document.getElementById("descripcion").value;
  let porciones = document.getElementById("porciones").value;
  let precio = document.getElementById("precio").value;

  if (nombre == "") { //Se verifica si el valor de nombre es una cadena vacía es decir que no hay datos disponibles, que requiere que se ingresen datos
    alert("Por favor ingresa un nombre válido");
    return false;
  }

  if (descripcion == "") {
    alert("Por favor ingresa una descripción válida");
    return false;
  }

  if (porciones == "" || porciones <= 0) {
    alert("Por favor ingresa una cantidad de porciones válida");
    return false;
  }

  if (precio == "" || precio <= 0) {
    alert("Por favor ingresa un precio válido"); //se muestra alerta se pide en Bootstrap en este caso se hace en JS
    return false;
  }

  return true; //retorna true paar indicar que el form se puede enviar
}
