const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Account extends Model {}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    limit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    available: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    used: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'account',
  }
);

module.exports = Account;