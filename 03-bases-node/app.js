const { crearArchivo } = require("./helpers/multiplicar");

console.clear();

const [, , arg3 = "base=1"] = process.argv;
const [, base = 5] = arg3.split("=");

/* const base = 7; */

crearArchivo(base)
  .then((nombreArchivo) => console.log(nombreArchivo, `creado`))
  .catch((err) => console.log(err));
