const User = require('./User');
const Card = require('./Card');
const Mortgage = require('./Mortgage');
const Car = require('./Car');
const Loan = require('./Loan');
const Bank = require('./Bank');
const Retirement = require('./401K');
const Ira = require('./Ira');
const Cd = require('./Cd');
const Brokerage = require('./Brokerage');

User.hasMany(Brokerage, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Cd, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Ira, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Retirement, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

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

User.hasMany(Bank, {
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

Bank.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Retirement.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Ira.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Cd.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Brokerage.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

module.exports = { User, Card, Mortgage, Car, Loan, Bank, Retirement, Ira, Cd, Brokerage };