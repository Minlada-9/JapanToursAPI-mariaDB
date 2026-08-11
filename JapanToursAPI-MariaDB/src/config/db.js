const { Sequelize } = require('sequelize');

// MariaDB เข้ากันได้กับ MySQL protocol เต็มรูปแบบ จึงใช้ dialect 'mysql' ของ Sequelize ได้เลย
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

const connectDB = async () => {
  await sequelize.authenticate();
  console.log('MariaDB connected');
  return sequelize;
};

module.exports = { sequelize, connectDB };
