// Validar roles contra la base de datos
const { Categoria, Role, Usuario, Producto } = require("../models");

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

// verificar que exista la categoria para el producto.

const existeProductoPorId = async (id) => {
  const isID = await Producto.findById(id);

  if (!isID) {
    throw new Error(`No existe el id ${id}`);
  }
};

// validar colecciones permitidas

const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);

  if (!incluida) {
    throw new Error(
      `La colección ${coleccion} no es permitida - ${colecciones}`
    );
  }

  return true;
};

module.exports = {
  isValidRole,
  isEmailInDB,
  isUserById,
  existeCategoria,
  existeProductoPorId,
  coleccionesPermitidas,
};
