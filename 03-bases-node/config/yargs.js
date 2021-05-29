const { option } = require("yargs");

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
    describe: "Muestra la tabla en consola.",
  })
  .option("h", {
    alias: "hasta",
    type: "number",
    default: 10,
    describe: "indica un limite para multiplicar la base",
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw "La base tiene que ser un numero";
    }
    return true;
  })
  .check((argv, options) => {
    if (isNaN(argv.h)) {
      throw "El valor de *hasta* debe ser un numero";
    }
    return true;
  }).argv;

module.exports = yargs;
