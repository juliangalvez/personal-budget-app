const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("operation", {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Income", "Expense"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
