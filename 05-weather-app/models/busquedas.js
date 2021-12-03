const fs = require("fs");
const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    // leer DB si existe
    this.leerDB();
  }

  get getHistorialCapitalizado() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");

      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));

      return palabras.join(" ");
    });
  }

  get getParamsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: "es",
    };
  }

  get getParamsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.getParamsMapBox,
      });

      const resp = await instance.get();

      // features - id,text, place_names, center

      return resp.data.features.map((place) => ({
        id: place.id,
        cityName: place.text,
        placeName: place.place_name,
        lat: place.center[1],
        lng: place.center[0],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      // instancia de axios
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.getParamsOpenWeather, lat, lon },
      });
      // resp

      const resp = await instance.get();

      // coord {lon, lat}, weather[{description}], main{temp, temp_min, temp_max}

      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = "") {
    // prevenir duplicados
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }

    this.historial = this.historial.splice(0, 5);

    this.historial.unshift(lugar.toLocaleLowerCase());

    // grabar en db

    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    // si no existe
    if (!fs.existsSync(this.dbPath)) {
      return null;
    }

    const data = fs.readFileSync(this.dbPath, { encoding: "utf-8" });

    const cities = JSON.parse(data);

    this.historial = cities.historial;
  }
}

module.exports = Busquedas;
