const express = require("express");
const router = express.Router();

//Controller
const carController = require("../controllers/carController");

//Estas son subrutas de la ruta /products que se configura en app

/*** SHOW CAR ***/
router.get("/", carController.cart);

/*** PUSH CAR ***/
router.post("/:id", carController.carPush);

module.exports = router;
