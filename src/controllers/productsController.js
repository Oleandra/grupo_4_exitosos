const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const Album = db.Album;
const User = db.Album;
const Artist = db.Artist;
const Song = db.Song;
const Category = db.Category;
const Genre = db.Genre;

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

  // Create - Form to create
  create: async (req, res) => {
    let allGenres = await Genre.findAll();
    let allCategories = await Category.findAll();
    res.render("products/product-create-form.ejs", {
      allGenres,
      allCategories,
    });
  },

  // Create -  Method to store
  store: async (req, res) => {
    try {
      //validaciones
      const resultValidation = validationResult(req);

      if (resultValidation.errors.length > 0) {
        let allGenres = await Genre.findAll();
        let allCategories = await Category.findAll();

        return res.render("products/product-create-form.ejs", {
          errors: resultValidation.mapped(),
          oldData: req.body,
          allGenres,
          allCategories,
        });
      }

      //Encontrar al artista
      let artistToFind = await Artist.findOne({
        where: {
          name: req.body.artist,
        },
      });

      //Si encuentra al artista en la db crear el album
      if (artistToFind) {
        let newAlbum = await Album.create({
          title: req.body.title,
          id_artist: artistToFind.id_artists,
          description: req.body.description,
          id_genre: req.body.genre,
          release_date: req.body.release_date,
          price: req.body.price,
          id_category: req.body.id_categories,
          image: req.file.filename,
          id_seller: req.session.userLogged.id_users,
        });

        //separa cada cancion en un arreglo
        let songs = req.body.tracklist.split(",");

        //Recorrer el arregle e ir guardando cada cancion en la db
        for (let i = 0; i < songs.length; i++) {
          await Song.create({
            name: songs[i],
            id_album: newAlbum.id_albums,
          });
        }
      } else {
        // Si no encuentra al artista en la db, crearlo y crear album
        let newArtist = await Artist.create({
          name: req.body.artist,
        });
        let newAlbum = await Album.create({
          title: req.body.title,
          id_artist: newArtist.id_artists,
          description: req.body.description,
          id_genre: req.body.genre,
          release_date: req.body.release_date,
          price: req.body.price,
          id_category: req.body.id_categories,
          image: req.file.filename,
          id_seller: req.session.userLogged.id_users,
        });

        //separa cada cancion en un arreglo
        let songs = req.body.tracklist.split(",");

        //Recorrer el arregle e ir guardando cada cancion en la db
        for (let i = 0; i < songs.length; i++) {
          await Song.create({
            name: songs[i],
            id_album: newAlbum.id_albums,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }

    return res.redirect("/products");
  },

  // Update - Form to edit
  edit: async (req, res) => {
    let { id } = req.params;

    let albumToEdit = await Album.findByPk(id, {
      include: [
        { association: "category" },
        { association: "artist" },
        { association: "genre" },
        { association: "user" },
      ],
    });

    let allGenres = await Genre.findAll();
    let allCategories = await Category.findAll();

    let albumSongs = await Song.findAll({
      where: {
        id_album: id,
      },
    });

    let songs = albumSongs.map((song) => {
      return song.name;
    });

    //El método join() une todos los elementos de una matriz
    allAlbumSongs = songs.join();
    console.log(allAlbumSongs);

    res.render("products/product-edit-form.ejs", {
      albumToEdit,
      allGenres,
      allCategories,
      allAlbumSongs,
    });
  },

  // Update - Method to update
  update: async (req, res) => {
    //validaciones

    try {
      const { id } = req.params;

      const resultValidation = validationResult(req);

      if (resultValidation.errors.length > 0) {
        let albumToEdit = await Album.findByPk(id, {
          include: [
            { association: "category" },
            { association: "artist" },
            { association: "genre" },
            { association: "user" },
          ],
        });

        let allGenres = await Genre.findAll();
        let allCategories = await Category.findAll();

        let albumSongs = await Song.findAll({
          where: {
            id_album: id,
          },
        });

        let songs = albumSongs.map((song) => {
          return song.name;
        });

        //El método join() une todos los elementos de una matriz
        allAlbumSongs = songs.join();

        return res.render("products/product-edit-form.ejs", {
          errors: resultValidation.mapped(),
          oldData: req.body,
          albumToEdit,
          allGenres,
          allCategories,
          allAlbumSongs,
        });
      }

      //Encontrar al artista
      let artistToFind = await Artist.findOne({
        where: {
          name: req.body.artist,
        },
      });

      //Encontrar el album
      let album = await Album.findByPk(id);

      //Si encuentra al artista en la db actualizar el album
      if (artistToFind) {
        let updateAlbum = await Album.update(
          {
            title: req.body.title,
            id_artist: artistToFind.id_artists,
            description: req.body.description,
            id_genre: req.body.genre,
            release_date: req.body.release_date,
            price: req.body.price,
            id_category: req.body.id_categories,
            image: album.image,
            id_seller: album.id_seller,
          },
          {
            where: {
              id_albums: id,
            },
          }
        );

        //separa cada cancion en un arreglo
        let songs = req.body.tracklist.split(",");

        //hacemos consulta a la db para traer las canciones del album
        let songsFromAlbum = await Song.findAll({
          where: {
            id_album: id,
          },
        });

        //Guardamos en un arreglo cada id de cada cancion que traemos de la db
        let allIdsFromSongs = songsFromAlbum.map((song) => {
          return song.id_songs;
        });

        //Recorremos el arreglo de canciones que vienen del formulario
        //Y las insertamos en la db siempre y cuando coincida con los id que trajimos de la base de datos
        for (let i = 0; i < songs.length; i++) {
          await Song.update(
            {
              name: songs[i],
              id_album: id,
            },
            {
              where: {
                id_songs: allIdsFromSongs[i],
              },
            }
          );
        }
      } else {
        // Si no encuentra al artista en la db, crearlo y crear album
        let newArtist = await Artist.create({
          name: req.body.artist,
        });

        let updateAlbum = await Album.update(
          {
            title: req.body.title,
            id_artist: newArtist.id_artists,
            description: req.body.description,
            id_genre: req.body.genre,
            release_date: req.body.release_date,
            price: req.body.price,
            id_category: req.body.id_categories,
            image: album.image,
            id_seller: album.id_seller,
          },
          {
            where: {
              id_albums: id,
            },
          }
        );

        //separa cada cancion en un arreglo
        let songs = req.body.tracklist.split(",");

        //hacemos consulta a la db para traer las canciones del album
        let songsFromAlbum = await Song.findAll({
          where: {
            id_album: id,
          },
        });

        //Guardamos en un arreglo cada id de cada cancion que traemos de la db
        let allIdsFromSongs = songsFromAlbum.map((song) => {
          return song.id_songs;
        });

        //Recorremos el arreglo de canciones que vienen del formulario
        //Y las insertamos en la db siempre y cuando coincida con los id que trajimos de la base de datos
        for (let i = 0; i < songs.length; i++) {
          await Song.update(
            {
              name: songs[i],
              id_album: id,
            },
            {
              where: {
                id_songs: allIdsFromSongs[i],
              },
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }

    return res.redirect("/products");
  },

  // Delete - Delete one product from DB
  destroy: async (req, res) => {
    let songsFromAlbum = await Song.findAll({
      where: {
        id_album: req.params.id,
      },
    });

    let allIdsFromSongs = songsFromAlbum.map((song) => {
      return song.id_songs;
    });

    for (let i = 0; i < allIdsFromSongs.length; i++) {
      await Song.destroy({
        where: {
          id_songs: allIdsFromSongs[i],
        },
      });
    }

    await Album.destroy({
      where: {
        id_albums: req.params.id,
      },
    });

    res.redirect("/products");
  },
};

module.exports = productsController;
