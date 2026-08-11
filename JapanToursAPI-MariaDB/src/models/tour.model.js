const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// หมายเหตุ: ไม่ต้องมีฟิลด์ no แยกต่างหากเหมือนตอน MongoDB แล้ว
// เพราะ MariaDB มี id แบบ AUTO_INCREMENT (1, 2, 3, ...) ให้อัตโนมัติอยู่แล้ว
const Tour = sequelize.define('Tour', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  price: { type: DataTypes.FLOAT, allowNull: false },
  seats: { type: DataTypes.INTEGER, defaultValue: 0 },
  date: DataTypes.DATE,
  image: DataTypes.STRING,
}, {
  tableName: 'tours',
  timestamps: true, // สร้างคอลัมน์ createdAt / updatedAt ให้อัตโนมัติ
});

module.exports = Tour;
