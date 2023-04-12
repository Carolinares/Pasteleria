export class Dialogo {
    constructor(titulo, texto, tipo, acciones) {
      this.titulo = titulo;
      this.texto = texto;
      this.tipo = tipo;
      this.acciones = acciones;
    }
  
    mostrar() {
      const alertaDiv = document.createElement('div');
      alertaDiv.classList.add('dialogo', `dialogo-${this.tipo}`);
  
      const tituloDiv = document.createElement('div');
      tituloDiv.classList.add('dialogo-titulo');
      tituloDiv.textContent = this.titulo;
  
      const textoDiv = document.createElement('div');
      textoDiv.classList.add('dialogo-texto');
      textoDiv.textContent = this.texto;
  
      const accionesDiv = document.createElement('div');
      accionesDiv.classList.add('dialogo-acciones');
  
      this.acciones.forEach(accion => {
        const boton = document.createElement('button');
        boton.classList.add('dialogo-boton');
        boton.textContent = accion.texto;
        boton.addEventListener('click', accion.accion);
        accionesDiv.appendChild(boton);
      });
  
      alertaDiv.appendChild(tituloDiv);
      alertaDiv.appendChild(textoDiv);
      alertaDiv.appendChild(accionesDiv);
  
      document.body.appendChild(alertaDiv);
    }
}

export class Alerta {
    constructor(texto, tipo, duracion) {
      this.texto = texto;
      this.tipo = tipo;
      this.duracion = duracion;
      this.timeoutID = null;
    }

    mostrar() {
      const alertaDiv = document.createElement('div');
      alertaDiv.classList.add('alerta', `alerta-${this.tipo}`);
      alertaDiv.textContent = this.texto;
  
      const botonCerrar = document.createElement('button');
      botonCerrar.classList.add('alerta-cerrar');
      botonCerrar.textContent = '×';
      botonCerrar.addEventListener('click', () => {
        this.ocultar(alertaDiv);
      });
      alertaDiv.appendChild(botonCerrar);
  
      document.body.children[0].appendChild(alertaDiv);
  
      if (this.duracion !== undefined) {
        this.timeoutID = setTimeout(() => {
          this.ocultar(alertaDiv);
        }, this.duracion);
      }
    }
  
    ocultar(alertaDiv) {
      clearTimeout(this.timeoutID);
      alertaDiv.remove();
    }
  }
  

export const acciones = [
{
    texto: 'Aceptar',
    accion: () => console.log('Aceptar')
},
{
    texto: 'Cancelar',
    accion: () => console.log('Cancelar')
}
];