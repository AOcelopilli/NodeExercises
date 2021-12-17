const { response, request } = require("express");
const Usuario = require("../models/user");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    // verificar si el email existe
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

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
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
