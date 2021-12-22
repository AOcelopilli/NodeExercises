const { response, request } = require("express");
const Usuario = require("../models/user");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    // Si el usuario en DB existe

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "El Token no se pudo verificar",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
