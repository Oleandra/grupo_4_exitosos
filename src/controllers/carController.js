const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Album = db.Album;
const User = db.Album;
const Artist = db.Artist;
const Song = db.Song;
const Category = db.Category;
const Genre = db.Genre;
const Car = db.Car;

const carController = {
  //Carro de compras vacío
  cart: (req, res) => {
    res.render("products/productCartEmpty");
  },

  carPush: async (req, res) => {
    let { id } = req.params;
    console.log(id);
    let albumInCar = await Album.findByPk(id, {
      include: [
        { association: "category" },
        { association: "artist" },
        { association: "genre" },
        { association: "user" },
      ],
    });
    console.log(albumInCar);

    let newProduct = await Car.create({
      id_buyer: req.session.userLogged.id_users,
      id_product: albumInCar.id_albums,
      quantity: 1,
    });

    res.render("products/productCart.ejs", {
      albumInCar,
    });
  },

  carList: (req, res) => {
    let { id } = req.params;
    console.log(id);
  },
};

module.exports = carController;
