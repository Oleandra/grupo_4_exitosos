const express = require("express");
const router = express.Router();

//Controller
const carController = require("../controllers/carController");

//Middleware de autenticación para el botón "comprame"
const authMiddleware = require("../middlewares/authMiddleware");

//Estas son subrutas de la ruta /products que se configura en app

/*** SHOW EMPTY CAR ***/
router.get("/", carController.cart);

/*** PUSH CAR ***/
router.post("/:id", authMiddleware, carController.carPush);

/*** SHOW A LIST CAR ***/
router.get("/list", carController.carList);

module.exports = router;
