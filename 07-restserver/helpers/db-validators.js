// Validar roles contra la base de datos
const Role = require("../models/role");
const Usuario = require("../models/user");

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
    /* return res.status(400).json({
      msg: "El correo ya se encuentra registrado.",
    }) */

    throw new Error(`El correo ${correo} ya se encuentra registrado.`);
  }
};

module.exports = {
  isValidRole,
  isEmailInDB,
};
