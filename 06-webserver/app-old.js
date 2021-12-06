const http = require("http");

http
  // request es cualquier cliente
  // response es lo que vamos a responder
  .createServer((req, res) => {
    console.log(req);

    //indica el estado de la respuesta de nuestro servidor
    res.writeHead(200, { "Content-Type": "text/plain" });

    // Respondemos
    res.write("Hola mundo");

    // Terminamos respuesta
    res.end();
  })
  // El servidor necesita un puerto para ser escuchado.
  .listen(8000);
