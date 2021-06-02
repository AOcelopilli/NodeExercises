/* Documentacion */
/* https://nodejs.org/api/readline.html#readline_readline */
require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("========================");
    console.log("  Seleccione una opcion ");
    console.log("========================");

    console.log(`1. Crear tarea`);
    console.log(`2. Listar tareas`);
    console.log(`3. Listar tareas completas`);
    console.log(`4. Listar tareas pendientes`);
    console.log(`5. Completar tarea(s)`);
    console.log(`6. Borrar tarea`);
    console.log(`0. Salir \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`Seleccione una opcion: `, (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\npresione ${"ENTER".green} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
