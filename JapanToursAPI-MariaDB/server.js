require("dotenv").config();

const app = require("./src/app");
const { sequelize, connectDB } = require("./src/config/db");

// ต้อง require model ทั้งสองตัวก่อน sync() เพื่อให้ Sequelize รู้จักตารางและความสัมพันธ์ระหว่างกัน
require("./src/models/tour.model");
require("./src/models/booking.model");

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => sequelize.sync()) // สร้างตาราง tours / bookings อัตโนมัติถ้ายังไม่มี (ไม่ลบข้อมูลเดิม)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MariaDB connection failed:", err.message);
    process.exit(1);
  });
