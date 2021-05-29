const { crearArchivo } = require("./helpers/multiplicar");

const yargs = require("./config/yargs");

console.clear();
console.log(yargs);

crearArchivo(yargs.b, yargs.l)
  .then((nombreArchivo) => console.log(nombreArchivo, `creado`))
  .catch((err) => console.log(err));
