# MBB Remote - Backend API

Node.js + Express + SQLite backend

## O'rnatish

```bash
cd backend
npm install
```

## Ishga tushirish

```bash
# Normal
npm start

# Development (auto-restart)
npm run dev
```

Server: `http://localhost:5000`

## API Endpoints

| Method | URL | Tavsif |
|--------|-----|--------|
| GET | /api/xizmatlar | Barcha xizmatlar |
| POST | /api/xizmatlar | Yangi xizmat qo'shish |
| PUT | /api/xizmatlar/:id | Xizmatni tahrirlash |
| DELETE | /api/xizmatlar/:id | Xizmatni o'chirish |
| GET | /api/bolimlar | Barcha bo'limlar |
| POST | /api/bolimlar | Yangi bo'lim |
| DELETE | /api/bolimlar/:id | Bo'limni o'chirish |
| GET | /api/ishchilar | Barcha ishchilar |
| POST | /api/ishchilar | Yangi ishchi |
| DELETE | /api/ishchilar/:id | Ishchini o'chirish |
| GET | /api/lavozimlar | Barcha lavozimlar |
| POST | /api/lavozimlar | Yangi lavozim |
| DELETE | /api/lavozimlar/:id | Lavozimni o'chirish |
| GET | /api/jihozlar | Barcha jihozlar |
| POST | /api/jihozlar | Yangi jihoz |
| DELETE | /api/jihozlar/:id | Jihozni o'chirish |
| GET | /api/ipaddresslar | Barcha IP addresslar |
| POST | /api/ipaddresslar | Yangi IP address |
| DELETE | /api/ipaddresslar/:id | IP ni o'chirish |

## Database
SQLite ishlatiladi. `mbb.db` fayli backend papkasida avtomatik yaratiladi.
