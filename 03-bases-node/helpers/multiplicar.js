/* Requerir paquetes se hace con la palabra reservada 'require' */
const fs = require("fs");

const crearArchivo = async (base = 5) => {
  try {
    console.log("=======================");
    console.log(`     Tabla del: `, base);
    console.log("=======================");

    let salida = "";

    for (let i = 1; i < 11; i++) {
      salida += `${base} x ${i} = ${base * i}\n`;
    }

    console.log(salida);

    /* 
    fs.writeFile('tabla-5.txt', salida, (err) => {
      if (err) throw err;
      console.log('tabla-5.txt creado')
    });
    */

    fs.writeFileSync(`tabla-${base}.txt`, salida);

    return `tabla-${base}.txt`;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  crearArchivo,
};
