const express = require("express");
const router = express.Router();

//Controller
const productsController = require("../controllers/productsController");

//Middlewares
const validationsCreateAlbum = require("../middlewares/validateAlbumMiddleware");
const validationsUpdateAlbum = require("../middlewares/validateUpdateAlbumMiddleware.js");
const uploadFile = require("../middlewares/multerAlbumCoverMiddleware");

//Estas son subrutas de la ruta /products que se configura en app

/*** GET ALL PRODUCTS ***/
router.get("/", productsController.colection);

/*** GET ONE PRODUCT ***/
router.get("/detail/:id", productsController.detail);

/*** TOP PRODUCTS ***/
router.get("/top", productsController.top);

/*** POPULAR PRODUCTS ***/
router.get("/popular", productsController.popular);

/*** MORE SALE PRODUCTS ***/
router.get("/more-sale", productsController.moreSale);

/*** CREATE ONE PRODUCT ***/
router.get("/create", productsController.create);
router.post(
  "/",
  uploadFile.single("image"),
  validationsCreateAlbum,
  productsController.store
);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", validationsUpdateAlbum, productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete("/delete/:id", productsController.destroy);

module.exports = router;
