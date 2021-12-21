const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se esta intentando verificar rol sin usuario previo.",
    });
  }

  const { rol, nombre } = req.user;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es un administrador.`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Se esta intentando verificar rol sin usuario previo.",
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(400).json({
        msg: `El servicio require alguno de los siguientes roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
