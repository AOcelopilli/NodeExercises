// Validar roles contra la base de datos
const { Categoria, Role, Usuario } = require("../models");

const isValidRole = async (rol = "") => {
  const isRole = await Role.findOne({ rol });

  if (!isRole) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos.`);
  }
};

// verificar si el correo existe
const isEmailInDB = async (correo = "") => {
  const isEmail = await Usuario.findOne({ correo });

  if (isEmail) {
    throw new Error(`El correo: ${correo}, ya se encuentra registrado.`);
  }
};

// verificar si el id no existe
const isUserById = async (id) => {
  const isID = await Usuario.findById(id);

  if (!isID) {
    throw new Error(`No existe un usuario con el ID: ${id}.`);
  }
};

// verificar si el id de categoria existe

const existeCategoria = async (id) => {
  const isID = await Categoria.findById(id);

  if (!isID) {
    throw new Error(`No existe una categoria con el ID ${id}`);
  }
};

module.exports = {
  isValidRole,
  isEmailInDB,
  isUserById,
  existeCategoria,
};
