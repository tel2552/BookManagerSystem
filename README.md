# Book Manager System

โปรเจกต์นี้เป็นระบบจัดการหนังสือ(Book Manager System)
 คือระบบ Web Application สำหรับจัดการรายการหนังสือ (CRUD) โดยแบ่งออกเป็น Frontend และ Backend

## โครงสร้างโปรเจกต์

```
book-manager/
├── backend/ # โค้ดส่วน Backend (NestJS + Prisma ORM)
│ ├── prisma(db)/
│ ├── src/books/dto/
│ └── test/
├── frontend/ # โค้ดส่วน Frontend (Next.js + Redux + Redux-Saga)
│ ├── __tests__/
│ ├── api/
│ ├── components/
│ ├── pages/edit/
│ ├── redux/books/
│ └── styles/  
└── README.md     
```

## ข้อกำหนดเบื้องต้น (Prerequisites)

ก่อนเริ่มต้น ตรวจสอบให้แน่ใจว่าคุณได้ติดตั้งเครื่องมือต่อไปนี้แล้ว:

*   Node.js (แนะนำเวอร์ชัน LTS ล่าสุด)
*   Git

## การติดตั้ง (Installation)

1.  **Clone Repository:**
    ```bash
    git clone <your-repository-url>
    cd book-manager-system
    ```

2.  **ติดตั้ง Dependencies สำหรับ Backend:**
    ```bash
    cd backend
    npm install
    ```

3.  **ติดตั้ง Dependencies สำหรับ Frontend:**
    ```bash
    cd frontend
    npm install
    ```

## การรัน Unit Tests

### Backend Unit Tests

1.  เข้าไปยังไดเรกทอรี `backend`:
    ```bash
    cd backend
    ```
2.  รันคำสั่งสำหรับ Test (อาจเป็น `npm test` หรือคำสั่งที่กำหนดไว้ใน `package.json`):
    ```bash
    npm test
    ```

### Frontend Unit Tests

1.  เข้าไปยังไดเรกทอรี `frontend`:
    ```bash
    cd frontend
    ```
2.  รันคำสั่งสำหรับ Test (อาจเป็น `npm test` หรือคำสั่งที่กำหนดไว้ใน `package.json`):
    ```bash
    npm test
    ```

## การรันโปรเจกต์ (Development Mode)

1.  **รัน Backend Server:**
    เปิด Terminal ใหม่, เข้าไปที่ไดเรกทอรี `backend` และรันคำสั่ง (เช่น `npm start` หรือ `npm run dev`):
    ```bash
    cd backend
    npm start # หรือ npm run dev
    ```
    โดยทั่วไป Backend จะรันอยู่ที่ `http://localhost:PORT_BACKEND` (เช่น `http://localhost:3001`)

2.  **รัน Frontend Development Server:**
    เปิด Terminal อีกอัน, เข้าไปที่ไดเรกทอรี `frontend` และรันคำสั่ง (เช่น `npm start` หรือ `npm run dev`):
    ```bash
    cd frontend
    npm start # หรือ npm run dev
    ```
    โดยทั่วไป Frontend development server จะเปิดเบราว์เซอร์ให้อัตโนมัติ หรือสามารถเข้าถึงได้ที่ `http://localhost:PORT_FRONTEND` (เช่น `http://localhost:3000`)

หลังจากทำตามขั้นตอนข้างต้นแล้ว คุณควรจะสามารถเข้าถึงหน้า Web Application ผ่านเบราว์เซอร์ได้
