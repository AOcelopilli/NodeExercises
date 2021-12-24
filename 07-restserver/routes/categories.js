const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria } = require("../controllers/categorias");

const { validarJWT, validarCampos } = require("../middlewares");

const router = Router();

/*
 * {{url}}/api/categories
 */

// obtener todas las categorias - publico
router.get("/", (req, res) => {
  res.json("get");
});

// obtener una categoria por id - publico
router.get("/:id", (req, res) => {
  res.json("get - id");
});

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
router.put("/:id", (req, res) => {
  res.json("put");
});

// borrar categoria - admin
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
