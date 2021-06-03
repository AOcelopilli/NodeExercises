require("colors");
const inquirer = require("inquirer");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
} = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    // Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // Imprimir el menu
    opt = await inquirerMenu();

    // Manejar la opcion recibida.
    switch (opt) {
      case "1":
        //crear opcion
        const desc = await leerInput("Descriptcion: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        // console.log(tareas.listadoArr);
        tareas.listadoCompleto();
        break;
      case "3":
        // console.log(tareas.listadoArr);
        tareas.listarPendientesCompletadas(true);
        break;

      case "4":
        // console.log(tareas.listadoArr);
        tareas.listarPendientesCompletadas(false);
        break;

      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);

        if (id !== "0") {
          const ok = await confirmar("¿Estas seguro?");

          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada.");
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
