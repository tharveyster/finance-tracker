const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Loan extends Model {}

Loan.init(
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
    loan_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    annual_interest_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    months: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    remaining: {
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
    modelName: 'loan',
  }
);

module.exports = Loan;