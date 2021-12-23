const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

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
router.post("/", (req, res) => {
  res.json("post");
});

// actualizar un registro por id - privado - cualquiera con token valido
router.put("/:id", (req, res) => {
  res.json("put");
});

// borrar categoria - admin
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
