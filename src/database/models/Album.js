module.exports = (sequelize, dataTypes) => {
  let alias = "Album";

  let cols = {
    id_albums: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    id_artist: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT,
    },
    id_genre: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    release_date: {
      type: dataTypes.DATE,
    },
    price: {
      type: dataTypes.DECIMAL(4, 0),
    },
    id_category: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: dataTypes.STRING,
    },
    id_seller: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = {
    tableName: "albums",
    timestamps: false,
  };

  const Album = sequelize.define(alias, cols, config);

  Album.associate = function (models) {
    Album.belongsTo(models.Genre, {
      as: "genre",
      foreignKey: "id_genre",
    });
    Album.belongsTo(models.Artist, {
      as: "artist",
      foreignKey: "id_artist",
    });
    Album.belongsTo(models.Category, {
      as: "category",
      foreignKey: "id_category",
    });
    Album.belongsTo(models.User, {
      as: "user",
      foreignKey: "id_seller",
    });
    Album.belongsToMany(models.Invoice, {
      as: "invoices",
      through: "albums_invoices",
      foreignKey: "id_album",
      otherKey: "id_invoice",
      timestamps: false,
    });
    Album.hasMany(models.Song, {
      as: "songs",
      foreignKey: "id_album",
    });
    Album.hasMany(models.Car, {
      as: "cars",
      foreignKey: "id_product",
    });
  };

  return Album;
};
