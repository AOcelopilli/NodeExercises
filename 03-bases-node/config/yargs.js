const yargs = require("yargs")
  .option("b", {
    alias: "base",
    describe: "número base para generar tabla de multiplicar",
    type: "number",
    demandOption: true,
  })
  .option("l", {
    alias: "listar",
    type: "boolean",
    default: false,
    describe: "Lista el resultado de la base multiplicada por su numero",
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw "La base tiene que ser un numero";
    }
    return true;
  }).argv;
