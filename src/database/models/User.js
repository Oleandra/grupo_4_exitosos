module.exports = (sequelize, dataTypes) => {
  let alias = "User";

  let cols = {
    id_users: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    full_name: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(200),
      allowNull: false,
    },
    politic: {
      type: dataTypes.BOOLEAN,
    },
    avatar: {
      type: dataTypes.STRING(512),
    },
    admin: {
      type: dataTypes.BOOLEAN,
    },
  };

  let config = {
    tableName: "users",
    timestamps: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.hasMany(models.Album, {
      as: "albums",
      foreignKey: "id_seller",
    });
    User.hasMany(models.Car, {
      as: "cars",
      foreignKey: "id_buyer",
    });
  };

  return User;
};
