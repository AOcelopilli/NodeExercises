/* Requerir paquetes se hace con la palabra reservada 'require' */
const fs = require("fs");
const colors = require("colors");

const crearArchivo = async (base = 5, listar = false) => {
  try {
    let salida = "";

    for (let i = 1; i < 11; i++) {
      salida += `${base} x ${i} = ${base * i}\n`.random;
    }

    if (listar == true) {
      console.log("=======================".rainbow);
      console.log(`     Tabla del: `.bold, colors.blue(base));
      console.log("=======================".rainbow);
      console.log(salida);
    }

    fs.writeFileSync(`tabla-${base}.txt`, salida);

    return `tabla-${base}.txt`.green;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  crearArchivo,
};
