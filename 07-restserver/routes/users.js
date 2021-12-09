const { Router } = require("express");
const { check } = require("express-validator");

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
  [check("correo", "El correo no es valido").isEmail()],
  usersPost
);

router.delete("/", usersDelete);

module.exports = router;
