const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      users: "/api/usuarios",
      productos: "/api/productos",
    };

    // conectar a db
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // lectura y parseo del body
    /* Esto intenta serializar la informacion recibida de los metodos HTTP a formato json*/
    this.app.use(express.json());

    // Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // cors
    this.app.use(cors());
    // directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.users, require("../routes/users"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.categories, require("../routes/categories"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
