const { response, request } = require("express");
const Usuario = require("../models/user");
const bcrypt = require("bcrypt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    // verificar si el email existe

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Correo / Contraseña no son correctos - correo",
      });
    }

    // el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Correo / Contraseña no son correctos - estado: false",
      });
    }
    // verificar la contrasenia
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Correo / Contraseña no son correctos - password",
      });
    }
    // generar el jwt

    res.json({
      msg: "Login ok",
      correo,
      password,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Hable con el administrador.",
    });
  }
};

module.exports = {
  login,
};
