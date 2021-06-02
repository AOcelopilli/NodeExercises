require("colors");
const inquirer = require("inquirer");
const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //crear opcion
        const desc = await leerInput("descriptcion: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        console.log(tareas._listado);
        break;
    }

    await pausa();
  } while (opt !== "0");
};

main();
