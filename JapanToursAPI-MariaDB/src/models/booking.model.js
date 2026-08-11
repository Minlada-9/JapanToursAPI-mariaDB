const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Tour = require('./tour.model');

const Booking = sequelize.define('Booking', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  qty: { type: DataTypes.INTEGER, defaultValue: 1 },
  dateBooked: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  note: DataTypes.TEXT,
}, {
  tableName: 'bookings',
  timestamps: true,
});

// ความสัมพันธ์แบบเดียวกับ populate('tour') ตอน MongoDB:
// booking หนึ่งรายการอ้างอิงไปที่ tour หนึ่งรายการ ผ่านคอลัมน์ tourId (foreign key)
Booking.belongsTo(Tour, { foreignKey: 'tourId', as: 'tour' });
Tour.hasMany(Booking, { foreignKey: 'tourId', as: 'bookings' });

module.exports = Booking;
