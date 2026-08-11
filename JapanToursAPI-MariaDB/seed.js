require('dotenv').config();
const { sequelize, connectDB } = require('./src/config/db');
const Tour = require('./src/models/tour.model');
require('./src/models/booking.model'); // ต้อง require ก่อน sync เพื่อสร้างตาราง bookings ด้วย

const data = [
  { title: 'ทัวร์โตเกียว', description: 'เที่ยวโตเกียว 3 วัน', price: 12000, seats: 10 },
  { title: 'ทัวร์เกียวโต', description: 'ชมวัดดัง', price: 15000, seats: 8 },
];

const seed = async () => {
  await connectDB();
  await sequelize.sync({ force: true }); // ล้างตาราง tours/bookings เก่าทิ้งแล้วสร้างใหม่ทุกครั้งที่ seed
  await Tour.bulkCreate(data);
  console.log('Seed done');
  process.exit();
};

seed();
