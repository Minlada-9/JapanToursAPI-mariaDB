# Japan Tours API (MariaDB)

REST API + หน้าเว็บสำหรับระบบจองทัวร์ญี่ปุ่น เขียนด้วย Node.js / Express / Sequelize เชื่อมต่อกับฐานข้อมูล MariaDB

## โครงสร้างโปรเจกต์

```
JapanToursAPI-MariaDB/
├── docker-compose.yml   # สตาร์ท MariaDB ด้วย Docker
├── seed.js              # ใส่ข้อมูลทัวร์ตัวอย่าง
├── server.js            # จุดเริ่มต้นของแอป
├── src/
│   ├── app.js
│   ├── config/db.js
│   ├── controllers/
│   ├── models/
│   └── routes/
├── frontend/            # หน้าเว็บ (index.html) เสิร์ฟจาก http://localhost:3000/
└── JapanToursAPI.postman_collection.json
```

## ข้อกำหนดเบื้องต้น

- [Node.js](https://nodejs.org/) เวอร์ชัน 18 ขึ้นไป
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (สำหรับรัน MariaDB)

## วิธีรันโปรเจกต์

> ⚠️ ทุกคำสั่งด้านล่างต้องรันจากโฟลเดอร์ที่มีไฟล์ `docker-compose.yml` / `package.json` / `server.js` อยู่ด้วยกัน (คือโฟลเดอร์ `JapanToursAPI-MariaDB` นี้)

### 1. สตาร์ทฐานข้อมูล MariaDB ด้วย Docker

```bash
docker compose up -d
```

ตรวจสอบว่า container รันอยู่:

```bash
docker ps
```

ควรเห็น container ชื่อ `japan-tours-mariadb` สถานะ `Up`

### 2. ติดตั้ง dependencies

```bash
npm install
```

### 3. ตั้งค่าไฟล์ `.env`

โปรเจกต์มีไฟล์ `.env` มาให้แล้ว (ค่าตรงกับ `docker-compose.yml`):

```
DB_HOST=localhost
DB_PORT=3307
DB_NAME=mydb
DB_USER=japanuser
DB_PASSWORD=japanpass
PORT=3000
```

### 4. ใส่ข้อมูลทัวร์ตัวอย่าง (seed)

```bash
node seed.js
```

คำสั่งนี้จะล้างตาราง `tours` / `bookings` เดิมทิ้ง แล้วสร้างข้อมูลทัวร์ตัวอย่างใหม่ (รันครั้งเดียวตอนเริ่ม หรือรันซ้ำได้เวลาต้องการล้างข้อมูล)

### 5. สตาร์ทเซิร์ฟเวอร์

```bash
npm start
```

หรือถ้าต้องการให้ auto-reload ตอนแก้โค้ด:

```bash
npm run dev
```

เมื่อรันสำเร็จจะเห็นข้อความ:

```
MariaDB connected
🚀 Server running at http://localhost:3000
```

### 6. เปิดใช้งาน

- หน้าเว็บ (จองทัวร์): **http://localhost:3000/**
- Health check: **http://localhost:3000/health**

## Postman

Import ไฟล์ `JapanToursAPI.postman_collection.json` เข้า Postman เพื่อทดสอบ API ได้ทันที (ตั้งค่า variable `baseUrl` ไว้แล้วเป็น `http://localhost:3000`)

### วิธี Import

1. เปิด Postman → **File → Import**
2. เลือกไฟล์ `JapanToursAPI.postman_collection.json`
3. เริ่มยิง request ได้เลย โดยไม่ต้องแก้ base URL (ใช้ `{{baseUrl}}` อยู่แล้ว)

### รายการ Endpoint ทั้งหมด

Base URL: `http://localhost:3000`

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET    | `/health` | เช็คว่า API ทำงานอยู่ |
| GET    | `/api/tours` | ดึงรายการทัวร์ทั้งหมด |
| POST   | `/api/tours` | สร้างทัวร์ใหม่ |
| GET    | `/api/tours/:id` | ดึงข้อมูลทัวร์ตาม id |
| PUT    | `/api/tours/:id` | แก้ไขทัวร์ |
| DELETE | `/api/tours/:id` | ลบทัวร์ |
| GET    | `/api/bookings` | ดึงรายการจองทั้งหมด (พร้อมข้อมูลทัวร์ที่เชื่อมโยง) |
| POST   | `/api/bookings` | สร้างการจองใหม่ |
| PUT    | `/api/bookings/:id` | แก้ไขการจอง |
| DELETE | `/api/bookings/:id` | ลบการจอง |

## แก้ปัญหาที่พบบ่อย

- **`no configuration file provided: not found`** เวลารัน `docker compose up -d` → แปลว่า cmd อยู่คนละโฟลเดอร์กับ `docker-compose.yml` ให้ `cd` เข้าไปในโฟลเดอร์โปรเจกต์ก่อน (ดูขั้นตอนที่ 1)
- **หน้าเว็บจองทัวร์ไม่ได้ / ไม่เจอทัวร์** → ตรวจว่ารัน `node seed.js` แล้วหรือยัง และ container MariaDB สถานะ `Up` อยู่หรือไม่ (`docker ps`)
- **`MariaDB connection failed`** → เช็คว่า container รันอยู่จริง และค่าพอร์ตใน `.env` (`DB_PORT=3307`) ตรงกับที่ map ไว้ใน `docker-compose.yml`