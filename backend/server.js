import express from 'express'
import cors from 'cors'
import { createRequire } from 'module'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const Database = require('better-sqlite3')

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json({ limit: '10mb' }))

// SQLite setup
const db = new Database(join(__dirname, 'mbb.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ism TEXT NOT NULL,
    familiya TEXT,
    login TEXT UNIQUE NOT NULL,
    parol TEXT NOT NULL,
    rasm TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS royxat (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bolamalar TEXT, uchastkalar TEXT, bolimlar TEXT, lavozimlar TEXT,
    fio TEXT NOT NULL,
    ip_address TEXT, name_computer TEXT, mac_address TEXT,
    motherboard TEXT, cpu TEXT, ram TEXT, ssd TEXT, hdd TEXT,
    monitor TEXT, keyboard TEXT, mouse TEXT, gpu TEXT, printer TEXT,
    speaker TEXT, camera TEXT, microphone TEXT, ups TEXT, ip_tel TEXT, hub TEXT,
    izox TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS xizmat (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bolim TEXT, lavozim TEXT, fio TEXT NOT NULL,
    xizmat_turi TEXT, name_computer TEXT,
    ip_manzil TEXT, bajaruvchi TEXT, olib_kelgan TEXT,
    izox TEXT, sana TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`)

console.log('✅ SQLite database tayyor (mbb.db)')

// AUTH
app.post('/api/login', (req, res) => {
  const { login, parol } = req.body
  const user = db.prepare('SELECT * FROM users WHERE login = ? AND parol = ?').get(login, parol)
  if (!user) return res.status(401).json({ error: "Login yoki parol noto'g'ri!" })
  const { parol: _, ...safe } = user
  res.json(safe)
})

// USERS
app.post('/api/users', (req, res) => {
  const { ism, familiya, login, parol, rasm } = req.body
  if (!ism || !login || !parol) return res.status(400).json({ error: 'Ism, login va parol majburiy!' })
  try {
    const result = db.prepare('INSERT INTO users (ism, familiya, login, parol, rasm) VALUES (?,?,?,?,?)').run(ism, familiya, login, parol, rasm || null)
    const user = db.prepare('SELECT id, ism, familiya, login, rasm, created_at FROM users WHERE id = ?').get(result.lastInsertRowid)
    res.status(201).json(user)
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(400).json({ error: 'Bu login allaqachon mavjud!' })
    res.status(500).json({ error: e.message })
  }
})

// ROYXAT
app.get('/api/royxat', (req, res) => {
  res.json(db.prepare('SELECT * FROM royxat ORDER BY id DESC').all())
})

app.post('/api/royxat', (req, res) => {
  const { bolamalar, uchastkalar, bolimlar, lavozimlar, fio, ip_address, name_computer, mac_address, motherboard, cpu, ram, ssd, hdd, monitor, keyboard, mouse, gpu, printer, speaker, camera, microphone, ups, ip_tel, hub, izox } = req.body
  if (!fio) return res.status(400).json({ error: 'F.I.O majburiy!' })
  const result = db.prepare(`INSERT INTO royxat (bolamalar,uchastkalar,bolimlar,lavozimlar,fio,ip_address,name_computer,mac_address,motherboard,cpu,ram,ssd,hdd,monitor,keyboard,mouse,gpu,printer,speaker,camera,microphone,ups,ip_tel,hub,izox) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(bolamalar,uchastkalar,bolimlar,lavozimlar,fio,ip_address,name_computer,mac_address,motherboard,cpu,ram,ssd,hdd,monitor,keyboard,mouse,gpu,printer,speaker,camera,microphone,ups,ip_tel,hub,izox)
  res.status(201).json(db.prepare('SELECT * FROM royxat WHERE id = ?').get(result.lastInsertRowid))
})

app.delete('/api/royxat/:id', (req, res) => {
  db.prepare('DELETE FROM royxat WHERE id = ?').run(req.params.id)
  res.json({ message: "O'chirildi" })
})

// XIZMAT
app.get('/api/xizmat', (req, res) => {
  res.json(db.prepare('SELECT * FROM xizmat ORDER BY id DESC').all())
})

app.post('/api/xizmat', (req, res) => {
  const { bolim, lavozim, fio, xizmat_turi, name_computer, ip_manzil, bajaruvchi, olib_kelgan, izox, sana } = req.body
  if (!fio) return res.status(400).json({ error: 'F.I.O majburiy!' })
  const result = db.prepare(`INSERT INTO xizmat (bolim,lavozim,fio,xizmat_turi,name_computer,ip_manzil,bajaruvchi,olib_kelgan,izox,sana) VALUES (?,?,?,?,?,?,?,?,?,?)`).run(bolim,lavozim,fio,xizmat_turi,name_computer,ip_manzil,bajaruvchi,olib_kelgan,izox,sana)
  res.status(201).json(db.prepare('SELECT * FROM xizmat WHERE id = ?').get(result.lastInsertRowid))
})

app.delete('/api/xizmat/:id', (req, res) => {
  db.prepare('DELETE FROM xizmat WHERE id = ?').run(req.params.id)
  res.json({ message: "O'chirildi" })
})

app.listen(PORT, () => console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`))
