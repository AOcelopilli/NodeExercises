const http = require("http");

http
  // request es cualquier cliente
  // response es lo que vamos a responder
  .createServer((req, res) => {
    // Respondemos
    res.write("Hola mundo desde un servidor web");
    // Terminamos respuesta
    res.end();
  })
  // El servidor necesita un puerto para ser escuchado.
  .listen(8080);
