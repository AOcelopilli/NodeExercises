const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    // io - es toda la información de los sockets conectados
    this.io = require("socket.io")(this.server);

    this.paths = {};

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicacion
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {
    // cors
    this.app.use(cors());
    // directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    //this.app.use(this.paths.auth, require("../routes/auth"));
  }

  sockets() {
    this.io.on("connection", (socket) => {
      //console.log("Cliente conectado");

      socket.on("disconnect", () => {
        //console.log("Cliente desconectado", socket.id);
      });

      // con socket.on escuchamos lo que es enviado
      socket.on("enviar-mensaje", (payload, callback) => {
        // con esto enviamos mensaje a todos los clietnes
        //this.io.emit("enviar-mensaje", payload.mensaje);

        const id = 123456;

        callback(id);
      });
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
