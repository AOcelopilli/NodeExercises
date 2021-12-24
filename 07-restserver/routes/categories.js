const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");

const { validarJWT, validarCampos, tieneRole } = require("../middlewares");
const { existeCategoria } = require("../helpers/db-validators");

const router = Router();

// obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// obtener categoria por id
router.get(
  "/:id",
  [check("id").custom(existeCategoria), validarCampos],
  obtenerCategoria
);

// crear categoria - privado - cualquier persona con un toquen valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// actualizar un registro por id - privado - cualquiera con token valido

router.put(
  "/:id",
  [
    validarJWT,
    check("id").custom(existeCategoria),
    check("id", "No es un ID valido").isMongoId(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    validarCampos,
  ],
  actualizarCategoria
);

// borrar categoria - admin
router.delete(
  "/:id",
  [
    validarJWT,
    check("id").custom(existeCategoria),
    check("id", "No es un ID valido").isMongoId(),
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
