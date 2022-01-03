const socketController = (socket) => {
  console.log("Cliente conectado", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });

  // con socket.on escuchamos lo que es enviado
  socket.on("enviar-mensaje", (payload, callback) => {
    // con esto enviamos mensaje a todos los clientes

    const id = 123456;

    callback(id);

    // emite un mensaje a todos los clientes
    socket.broadcast.emit("enviar-mensaje", payload.mensaje);
  });
};

module.exports = {
  socketController,
};
