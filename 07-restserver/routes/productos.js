const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");

const { validarJWT, validarCampos, tieneRole } = require("../middlewares");
const {
  existeProductoPorId,
  existeCategoria,
} = require("../helpers/db-validators");

const router = Router();

// obtener todas las Productos - publico
router.get("/", obtenerProductos);

// obtener Producto por id
router.get(
  "/:id",
  [
    check("id", "No es un ID de Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

// crear Producto - privado - cualquier persona con un toquen valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un ID de Mongo").isMongoId(),
    check("categoria").custom(existeCategoria),
    validarCampos,
  ],
  crearProducto
);

// actualizar un registro por id - privado - cualquiera con token valido

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID de Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    validarCampos,
  ],
  actualizarProducto
);

// borrar Producto - admin
router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID de Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
