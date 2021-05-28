const { crearArchivo } = require("./helpers/multiplicar");
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

console.clear();

/* const [, , arg3 = "base=1"] = process.argv;
const [, base = 5] = arg3.split("="); */
// console.log(process.argv);
console.log(yargs);
// console.log("base: yargs:", yargs.base);
// console.log("listar: yargs:", yargs.l);

/* const base = 7; */

crearArchivo(yargs.b, yargs.l)
  .then((nombreArchivo) => console.log(nombreArchivo, `creado`))
  .catch((err) => console.log(err));
