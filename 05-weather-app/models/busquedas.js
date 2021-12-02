const axios = require("axios");

class Busquedas {
  historial = ["Acapulco", "Colima", "Taxco"];

  constructor() {
    // TODO: leer DB si existe
  }

  get getParamsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.getParamsMapBox,
      });

      const resp = await instance.get();

      console.log(resp.data);

      return []; // retornar los lugares
    } catch (error) {
      return [];
    }
  }
}

module.exports = Busquedas;
