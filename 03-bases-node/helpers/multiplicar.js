/* Requerir paquetes se hace con la palabra reservada 'require' */
const fs = require("fs");
const colors = require("colors");

const crearArchivo = async (base = 5, listar, h) => {
  try {
    let salida = "";
    let consola = "";

    for (let i = 1; i <= h; i++) {
      salida += `${base} x ${i} = ${base * i}\n`;
      consola += `${base} ${"x".green} ${i} ${"=".green} ${base * i}\n`;
    }

    if (listar == true) {
      console.log("=======================".rainbow);
      console.log(`     Tabla del: `.bold, colors.blue(base));
      console.log("=======================".rainbow);
      console.log(consola);
    }

    fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);

    return `tabla-${base}.txt`.green;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  crearArchivo,
};
