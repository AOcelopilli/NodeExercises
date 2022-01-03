// Referencias del HTML
const $lblOnline = document.getElementById("lblOnline");
const $lblOffline = document.getElementById("lblOffline");
const $txtMensaje = document.getElementById("txtMensaje");
const $btnEnviar = document.getElementById("btnEnviar");

// este es el socket del cliente
const socket = io();

socket.on("connect", () => {
  //console.log("Conectado");
  $lblOnline.style.display = "inline-block";
  $lblOffline.style.display = "none";
});

socket.on("disconnect", () => {
  //console.log("Desconectado");
  $lblOffline.style.display = "inline-block";
  $lblOnline.style.display = "none";
});

$btnEnviar.addEventListener("click", () => {
  const mensaje = $txtMensaje.value;
  const payload = {
    mensaje,
    id: "123ABC",
    fecha: new Date().getTime(),
  };

  // desde el cliente emitimos un evento con nombre personalizado que es escuchado en el server.
  socket.emit("enviar-mensaje", payload, (id) => {
    console.log("Desde el server", id);
  });
});

socket.on("enviar-mensaje", (payload) => {
  console.log(payload);
});
