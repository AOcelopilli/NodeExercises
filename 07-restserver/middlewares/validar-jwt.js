const { response, request } = require("express");

const jwt = require("jsonwebtoken");

const validarJWT = (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay un token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    /* En js todo es por referencia, por lo cual esta request es la misma en todos lados. */
    req.uid = uid;

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
