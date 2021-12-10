// importation to get suggestions from vsCode
const { response, request } = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/user");

const usersGet = (req = request, res = response) => {
  // obtener los datos que vienen en la query
  const { q, nombre = "No name", apikey, page = 1, limit = 10 } = req.query;

  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usersPost = async (req, res) => {
  /* extraer el body */
  const { nombre, correo, password, rol } = req.body;

  const usuario = new Usuario({ nombre, correo, password, rol });

  // verificar si el correo existe
  const isEmail = await Usuario.findOne({ correo });
  if (isEmail) {
    return res.status(400).json({
      msg: "El correo ya se encuentra registrado.",
    });
  }

  // encriptar password
  const salt = bcrypt.genSaltSync(11);
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.json({
    usuario,
  });
};

const usersPut = (req, res) => {
  const id = req.params.id;

  res.json({
    msg: "put API - controlador",
    id,
  });
};

const usersDelete = (req, res) => {
  res.json({
    msg: "delete API - controlador",
  });
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
};
