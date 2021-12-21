// importation to get suggestions from vsCode
const { response, request } = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/user");

const usersGet = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;

  const query = { estado: true };

  const [total, users] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const usersPost = async (req, res) => {
  /* extraer el body */
  const { nombre, correo, password, rol } = req.body;

  const usuario = new Usuario({ nombre, correo, password, rol });

  // encriptar password
  const salt = bcrypt.genSaltSync(11);
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.json({
    usuario,
  });
};

const usersPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync(11);
    rest.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, rest);

  res.json(usuario);
};

const usersDelete = async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
};
