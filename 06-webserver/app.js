const express = require("express");
const app = express();
const port = 8080;

/* Handlebars */

// TODO: require('hbs')

app.set("view engine", "hbs");

/* --------------------------------------------------------------- */

/* Mostrar contenido estatico, primero creamos una carpeta llamada public*/

/* Necesitamos decirle a node que queremos que nuestra página sea de contenido publico para poder mostrarla en la web.  */

/* Con ayuda de un middleware de express podemos mostrar esto. */

app.use(express.static("public"));

/* La siguiente linea no se ejecuta, porque una vez servido el contenido desde  */
/* app.get("/", function (req, res) {
  res.send("Hello World");
}); */

/* --------------------------------------------------------------- */

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/generic", function (req, res) {
  res.sendFile(`${__dirname}/public/template/generic.html`);
});

app.get("/elements", function (req, res) {
  res.sendFile(`${__dirname}/public/template/elements.html`);
});

/* Cuando el cliente solicita una ruta que no existe maneja este error en una forma sencilla. Pero se puede agregar una ruta para esto. */

/* Una ruta que funciona como comodín */

app.get("*", function (req, res) {
  res.send("404 | Page not found.");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
