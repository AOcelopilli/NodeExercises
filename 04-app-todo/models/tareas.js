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

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
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

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

const formatearTareas = (tareas) => {
  console.log();
  tareas.forEach(({ desc, completadoEn }, idx) => {
    let indice = `${idx + 1}.`.green,
      estado = completadoEn ? completadoEn.green : "Pendiente".red;

    console.log(`${indice} ${desc} :: ${estado}`);
  });
  console.log();
};

module.exports = Tareas;
