const { response, request } = require("express");
const Usuario = require("../models/user");

const jwt = require("jsonwebtoken");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay un token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await Usuario.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Token no valido - usuario no existe en DB",
      });
    }

    if (!user.estado) {
      return res.status(401).json({
        msg: "Token no valido - usuario con estado: false",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
