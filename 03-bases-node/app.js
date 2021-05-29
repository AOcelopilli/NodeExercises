const { crearArchivo } = require("./helpers/multiplicar");
const yargs = require("./config/yargs");
const colors = require("colors");

console.clear();
console.log(yargs);

crearArchivo(yargs.b, yargs.l, yargs.h)
  .then((nombreArchivo) => console.log(nombreArchivo, `creado`))
  .catch((err) => console.log(err.brightRed));
