const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos,
  validarJWT,
  esAdminrole,
  tieneRole,
} = require("../middlewares");

const {
  isValidRole,
  isEmailInDB,
  isUserById,
} = require("../helpers/db-validators");

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(isUserById),
    check("rol").custom(isValidRole),
    validarCampos,
  ],
  usersPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 characteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(isEmailInDB),
    check("rol").custom(isValidRole),
    validarCampos,
  ],
  usersPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    //esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(isUserById),
    validarCampos,
  ],
  usersDelete
);

module.exports = router;
