module.exports = (sequelize, dataTypes) => {
  let alias = "Car";

  let cols = {
    id_cars: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_buyer: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    id_product: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = {
    tableName: "cars",
    timestamps: false,
  };

  const Car = sequelize.define(alias, cols, config);

  Car.associate = function (models) {
    Car.belongsTo(models.Album, {
      as: "albums",
      foreignKey: "id_product",
    });
    Car.belongsTo(models.User, {
      as: "users",
      foreignKey: "id_buyer",
    });
  };

  return Car;
};
