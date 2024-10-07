const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Book = require('./Book');

const Loan = sequelize.define('Loan', {
  loan_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id'
    },
  }}, {
    timestamps: false, 
  });

User.hasMany(Loan, { foreignKey: 'userId' });
Loan.belongsTo(User, { foreignKey: 'userId' });
Book.hasMany(Loan, { foreignKey: 'bookId' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = Loan;
