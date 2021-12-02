require("dotenv").config();

const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();

  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // mostrar mensaje
        const termino = await leerInput("Ciudad: ");

        // buscar lugares
        const lugares = await busquedas.ciudad(termino);

        // Seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id === "0") continue;

        // Datos de la ciudad
        const ciudad = lugares.find((lugar) => lugar.id === id);

        // guardar en DB
        busquedas.agregarHistorial(ciudad.placeName);

        const { cityName, lat, lng } = ciudad;

        // clima
        const cityWeather = await busquedas.climaLugar(lat, lng);

        const { desc, min, max, temp } = cityWeather;

        // mostrar resultados
        console.clear();
        console.log("\nInformación de la ciudad");
        console.log("Ciudad: ", cityName);
        console.log("Lat: ", lat);
        console.log("Lng: ", lng);
        console.log("Descripcion:", desc);
        console.log("Temperatura: ", temp, "°C");
        console.log("Temp Min: ", min, "°C");
        console.log("Temp Max: ", max, "°C");
        break;

      case 2:
        busquedas.getHistorialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;

      default:
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
