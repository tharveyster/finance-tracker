const User = require('./User');
const Account = require('./Account');
const Mortgage = require('./Mortgage');
const Car = require('./Car');

User.hasMany(Account, {
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

Account.belongsTo(User, {
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

module.exports = { User, Account, Mortgage, Car };