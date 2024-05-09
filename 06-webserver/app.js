require('dotenv').config();
const express = require("express");
const hbs = require('hbs');

const app = express();
const port = process.env.PORT;

/* Handlebars */


app.set("view engine", "hbs");
hbs.registerPartials(__dirname + '/views/partials');

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
  res.render("home", {
    nombre: 'Angel Pineda',
    titulo: 'Curso de Node'
  });
});

app.get("/generic", function (req, res) {
    res.render("generic", {
        nombre: 'Angel Pineda',
        titulo: 'Curso de Node'
    });
});

app.get("/elements", function (req, res) {
  res.sendFile(`${__dirname}/public/template/elements.html`);
});

/* Cuando el cliente solicita una ruta que no existe maneja este error en una forma sencilla. Pero se puede agregar una ruta para esto. */

/* Una ruta que funciona como comodín */

app.get("*", function (req, res) {
  res.sendFile(`${__dirname}/public/404.html`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
