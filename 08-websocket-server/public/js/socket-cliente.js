// Referencias del HTML
const lblOnline = document.getElementById("lblOnline");
const lblOffline = document.getElementById("lblOffline");

// este es el socket del cliente
const socket = io();

socket.on("connect", () => {
  console.log("Conectado");
  lblOnline.style.display = "inline-block";
  lblOffline.style.display = "none";
});

socket.on("disconnect", () => {
  console.log("Desconectado");
  lblOffline.style.display = "inline-block";
  lblOnline.style.display = "none";
});
