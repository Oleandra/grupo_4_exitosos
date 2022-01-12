const path = require("path");
const { body } = require("express-validator");

module.exports = [
  body("fullName").notEmpty().withMessage("Tienes que escribir un nombre"),
  body("email")
    .notEmpty()
    .withMessage("Tienes que escribir un correo electrónico")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo válido"),
  body("password").notEmpty().withMessage("Tienes que escribir una contraseña"),
  body("politic").isIn(["on"]).withMessage("Tienes que aceptar las politicas"),
  body("avatar").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png"];

    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      // lo niego por si no la encuentra salga el error
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones permitidas son ${acceptedExtensions.join(", ")} `
        );
      }
    }

    return true;
  }),
];