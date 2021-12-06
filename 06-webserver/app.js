const express = require("express");
const app = express();
const port = 8080;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/about", function (req, res) {
  res.send("About us");
});

/* Cuando el cliente solicita una ruta que no existe maneja este error en una forma sencilla. Pero se puede agregar una ruta para esto. */

/* Una ruta que funciona como comodín */

app.get("*", function (req, res) {
  res.send("404 | Page not found.");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
