/* setTimeout(function () {
  console.log("Hola mundo");
}, 100); */

const getUsuarioById = (id, callback) => {
  const usuario = {
    id,
    nombre: "Angel",
  };

  setTimeout(() => {
    callback(usuario);
  }, 1500);
};

getUsuarioById(10, (usuario) => {
  console.log(usuario.nombre.toUpperCase());
});
