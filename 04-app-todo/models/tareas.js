const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      // Con ayuda de la KEY podemos acceder a la tarea completa y crear un arreglo.
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    listado.push();

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    // mostrar tareas

    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    // 1: en verde
    // Completada: verde
    // Pendiente: rojo
    // 1. tarea
    console.log();

    this.listadoArr.forEach(({ id, desc, completadoEn: estado }, idx) => {
      let indice = idx + 1;

      console.log(
        `${indice}.`.green,
        desc,
        `${estado === null ? "Pendiente".red : "Completado".green}`
      );
    });

    console.log();
  }

  listarPendientesCompletadas(completadas = false) {
    let tareasParaMostrar = [];

    if (!completadas) {
      tareasParaMostrar = this.listadoArr.filter(
        (tarea) => tarea.completadoEn === null
      );
    } else {
      tareasParaMostrar = this.listadoArr.filter(
        (tarea) => tarea.completadoEn !== null
      );
    }

    formatearTareas(tareasParaMostrar);
  }
}

const formatearTareas = (tareas) => {
  console.log();
  tareas.forEach(({ id, desc, completadoEn }, idx) => {
    let indice = `${idx + 1}.`.green,
      estado = completadoEn ? "Completo".green : "Pendiente".red;

    console.log(`${indice} ${desc} :: ${completadoEn}`);
  });
  console.log();
};

module.exports = Tareas;
