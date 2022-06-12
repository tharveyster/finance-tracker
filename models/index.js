const User = require('./User');
const Card = require('./Card');
const Mortgage = require('./Mortgage');
const Car = require('./Car');
const Loan = require('./Loan');
const Account = require('./Account');

User.hasMany(Card, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Mortgage, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Car, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Loan, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Account, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
})

Card.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Mortgage.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Car.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Loan.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Account.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

module.exports = { User, Card, Mortgage, Car, Loan, Account };