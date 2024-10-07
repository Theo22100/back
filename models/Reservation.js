const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Book = require('./Book');

const Reservation = sequelize.define('Reservation', {
  reservation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(Reservation);
Reservation.belongsTo(User);
Book.hasMany(Reservation);
Reservation.belongsTo(Book);

module.exports = Reservation;
