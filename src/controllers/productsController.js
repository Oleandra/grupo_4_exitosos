// const fs = require("fs");
// const path = require("path");
// const { validationResult } = require("express-validator");

// const discsFilePath = path.join(__dirname, "../database/discsDataBase.json");
// let discs = JSON.parse(fs.readFileSync(discsFilePath, "utf-8"));

// const productsController = {
//   // Root - Show all products
//   index: (req, res) => {
//     let discs = JSON.parse(fs.readFileSync(discsFilePath, "utf-8"));
//     res.render("products/products", {
//       discs: discs,
//     });
//   },

//   //Top - Show top discs
//   top: (req, res) => {
//     let discs = JSON.parse(fs.readFileSync(discsFilePath, "utf-8"));
//     let topDiscs = discs.filter((disc) => disc.category == "top");
//     res.render("products/topProducts", {
//       topDiscs: topDiscs,
//     });
//   },

//   //Popular - Show popular discs
//   popular: (req, res) => {
//     let discs = JSON.parse(fs.readFileSync(discsFilePath, "utf-8"));
//     let popularDiscs = discs.filter((disc) => disc.category == "popular");
//     res.render("products/popularProducts", {
//       popularDiscs: popularDiscs,
//     });
//   },

//   //More sale - Show top discs
//   moreSale: (req, res) => {
//     let discs = JSON.parse(fs.readFileSync(discsFilePath, "utf-8"));
//     let moreSaleDiscs = discs.filter((disc) => disc.category == "moreSale");
//     res.render("products/moreSaleProducts", {
//       moreSaleDiscs: moreSaleDiscs,
//     });
//   },

//   // Detail - Detail from one product
//   detail: (req, res) => {
//     let id = req.params.id;
//     let disc = discs.find((disc) => disc.id == id);
//     res.render("products/productDetail", {
//       disc,
//     });
//   },

//   //Carro de compras
//   cart: (req, res) => {
//     return res.render("products/productCart");
//   },

//   // Create - Form to create
//   create: (req, res) => {
//     res.render("products/product-create-form.ejs");
//   },

//   // Create -  Method to store
//   store: (req, res) => {
//     const resultValidation = validationResult(req);

//     if (resultValidation.errors.length > 0) {
//       return res.render("products/product-create-form.ejs", {
//         errors: resultValidation.mapped(),
//         oldData: req.body,
//       });
//     }

//     let newDisc = {
//       id: discs[discs.length - 1].id + 1,
//       ...req.body,
//       img: req.file.filename,
//     };

//     newDisc.tracklist = newDisc.tracklist.split(",");

//     discs.push(newDisc);

//     fs.writeFileSync(discsFilePath, JSON.stringify(discs, null, " "));

//     // res.redirect("/");
//     return res.redirect("/products/detail/" + newDisc.id);
//   },

//   // Update - Form to edit
//   edit: (req, res) => {
//     let id = req.params.id;
//     let discToEdit = discs.find((disc) => disc.id == id);
//     res.render("products/product-edit-form.ejs", { discToEdit });
//   },
//   // Update - Method to update
//   update: (req, res) => {
//     let id = req.params.id;
//     let discToEdit = discs.find((disc) => disc.id == id);

//     console.log("El red.body");
//     console.log(req.body);

//     discToEdit = {
//       id: discToEdit.id,
//       ...req.body,
//       img: discToEdit.img,
//     };

//     discToEdit.tracklist = discToEdit.tracklist.split(",");

//     let newDiscs = discs.map((disc) => {
//       if (disc.id == discToEdit.id) {
//         return (disc = { ...discToEdit });
//       }
//       return disc;
//     });

//     fs.writeFileSync(discsFilePath, JSON.stringify(newDiscs, null, " "));
//     res.redirect("/products");
//   },

//   // Delete - Delete one product from DB
//   destroy: (req, res) => {
//     let id = req.params.id;
//     let finalDiscs = discs.filter((disc) => disc.id != id);
//     fs.writeFileSync(discsFilePath, JSON.stringify(finalDiscs, null, " "));
//     discs = JSON.parse(fs.readFileSync(discsFilePath, "utf-8"));
//     res.redirect("/products");
//   },
// };

// module.exports = productsController;

const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const Album = db.Album;

const productsController = {
  // Root - Show all products
  colection: (req, res) => {
    Album.findAll({
      include: [{ association: "artist" }],
    }).then((albums) => {
      res.render("products/products", {
        albums,
      });
    });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let { id } = req.params;
    Album.findByPk(id, {
      include: [{ association: "artist" }, { association: "songs" }],
    }).then((album) => {
      res.render("products/productDetail", {
        album,
      });
    });
  },

  //Top - Show top discs
  top: (req, res) => {
    Album.findAll({
      include: [{ association: "category" }, { association: "artist" }],
      where: {
        id_category: 1,
      },
    }).then((albumsTop) => {
      res.render("products/topProducts", {
        albumsTop,
      });
    });
  },

  //Popular - Show popular discs
  popular: (req, res) => {
    Album.findAll({
      include: [{ association: "category" }, { association: "artist" }],
      where: {
        id_category: 2,
      },
    }).then((albumsPopular) => {
      res.render("products/popularProducts", {
        albumsPopular,
      });
    });
  },

  //More sale - Show top discs
  moreSale: (req, res) => {
    Album.findAll({
      include: [{ association: "category" }, { association: "artist" }],
      where: {
        id_category: 3,
      },
    }).then((moreSaleAlbums) => {
      res.render("products/moreSaleProducts", {
        moreSaleAlbums,
      });
    });
  },

  //Carro de compras
  cart: (req, res) => {
    return res.render("products/productCart");
  },
};

module.exports = productsController;
