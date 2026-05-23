import express from 'express'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json({ limit: '10mb' }))

const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const defaultData = { royxat: [], xizmat: [], users: [] }
const db = new Low(adapter, defaultData)
await db.read()

db.data.royxat = db.data.royxat ?? []
db.data.xizmat  = db.data.xizmat  ?? []
db.data.users   = db.data.users   ?? []
await db.write()

const genId = () => Date.now() + Math.floor(Math.random() * 1000)

console.log('✅ Database tayyor (db.json)')

// ─── AUTH ───────────────────────────────────
app.post('/api/login', async (req, res) => {
  await db.read()
  const { login, parol } = req.body
  const user = db.data.users.find(u => u.login === login && u.parol === parol)
  if (!user) return res.status(401).json({ error: "Login yoki parol noto'g'ri!" })
  const { parol: _, ...safe } = user
  res.json(safe)
})

// ─── ROYXAT ─────────────────────────────────
app.get('/api/royxat', async (req, res) => {
  await db.read(); res.json(db.data.royxat)
})
app.post('/api/royxat', async (req, res) => {
  const { bolamalar, uchastkalar, bolimlar, lavozimlar, fio,
    ip_address, name_computer, mac_address, motherboard, cpu, ram,
    ssd, hdd, monitor, keyboard, mouse, gpu, printer, speaker,
    camera, microphone, ups, ip_tel, hub, izox } = req.body
  if (!fio) return res.status(400).json({ error: 'F.I.O majburiy!' })
  const newRow = { id: genId(), bolamalar, uchastkalar, bolimlar, lavozimlar, fio,
    ip_address, name_computer, mac_address, motherboard, cpu, ram, ssd, hdd,
    monitor, keyboard, mouse, gpu, printer, speaker, camera, microphone,
    ups, ip_tel, hub, izox, created_at: new Date().toISOString() }
  db.data.royxat.push(newRow)
  await db.write()
  res.status(201).json(newRow)
})
app.delete('/api/royxat/:id', async (req, res) => {
  db.data.royxat = db.data.royxat.filter(r => r.id !== Number(req.params.id))
  await db.write(); res.json({ message: "O'chirildi" })
})

// ─── XIZMAT ─────────────────────────────────
app.get('/api/xizmat', async (req, res) => {
  await db.read(); res.json(db.data.xizmat)
})
app.post('/api/xizmat', async (req, res) => {
  const { bolim, lavozim, fio, xizmat_turi, name_computer, izox, sana } = req.body
  if (!fio) return res.status(400).json({ error: 'F.I.O majburiy!' })
  const newRow = { id: genId(), bolim, lavozim, fio, xizmat_turi, name_computer, izox, sana,
    created_at: new Date().toISOString() }
  db.data.xizmat.push(newRow)
  await db.write()
  res.status(201).json(newRow)
})
app.delete('/api/xizmat/:id', async (req, res) => {
  db.data.xizmat = db.data.xizmat.filter(r => r.id !== Number(req.params.id))
  await db.write(); res.json({ message: "O'chirildi" })
})

app.listen(PORT, () => console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`))
