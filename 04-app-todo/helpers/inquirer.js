const inquirer = require("inquirer");

require("colors");

const menuOpts = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: "1. Crear tarea",
      },
      {
        value: "2",
        name: "2. Listar tareas",
      },
      {
        value: "3",
        name: "3. Listar tareas completas",
      },
      {
        value: "4",
        name: "4. Listar tareas pendientes",
      },
      {
        value: "5",
        name: "5. Completar tarea(s)",
      },
      {
        value: "6",
        name: "6. Borrar tarea",
      },
      {
        value: "0",
        name: "0. Salir",
      },
    ],
  },
];

const crearTarea = [
  {
    type: "input",
    name: "enter",
    message: `Presione ${"enter".green} para continuar`,
  },
];

const inquirerMenu = async () => {
  // console.clear();
  console.log("========================".green);
  console.log("  Seleccione una opcion ".green);
  console.log("========================".green);

  const { opcion } = await inquirer.prompt(menuOpts);

  return opcion;
};

const pausa = async () => {
  const pausa = await inquirer
    .prompt(crearTarea)
    .then((answer) => answer)
    .catch((err) => err);

  return pausa;
};

module.exports = {
  inquirerMenu,
  pausa,
};
