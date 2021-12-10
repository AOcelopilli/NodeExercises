const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.put("/:id", usersPut);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 characteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").isEmail(),
    check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],
  usersPost
);

router.delete("/", usersDelete);

module.exports = router;
