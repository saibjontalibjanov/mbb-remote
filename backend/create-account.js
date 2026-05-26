import readline from 'readline'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const Database = require('better-sqlite3')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise((resolve) => rl.question(q, resolve))

async function main() {
  console.log('\n╔══════════════════════════════════╗')
  console.log('║     Yangi Account Yaratish       ║')
  console.log('╚══════════════════════════════════╝\n')

  const ism      = await ask('Ism       : ')
  const familiya = await ask('Familiya  : ')
  const login    = await ask('Login     : ')
  const parol    = await ask('Parol     : ')
  const rasmPath = await ask("Rasm yo'li (bo'sh qoldirish mumkin): ")
  rl.close()

  if (!ism || !login || !parol) {
    console.log('\n❌ Ism, Login va Parol majburiy!\n'); process.exit(1)
  }

  let rasm = null
  if (rasmPath && rasmPath.trim()) {
    const fullPath = path.resolve(rasmPath.trim())
    if (fs.existsSync(fullPath)) {
      const ext = path.extname(fullPath).toLowerCase()
      const mimes = { '.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.gif':'image/gif','.webp':'image/webp' }
      const mime = mimes[ext] || 'image/jpeg'
      rasm = `data:${mime};base64,${fs.readFileSync(fullPath).toString('base64')}`
      console.log('\n📷 Rasm muvaffaqiyatli o\'qildi.')
    } else {
      console.log('\n⚠️  Rasm topilmadi. Default rasm ishlatiladi.')
    }
  }

  const db = new Database(path.join(__dirname, 'mbb.db'))
  db.exec(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, ism TEXT NOT NULL, familiya TEXT, login TEXT UNIQUE NOT NULL, parol TEXT NOT NULL, rasm TEXT, created_at TEXT DEFAULT (datetime('now')))`)

  const existing = db.prepare('SELECT id FROM users WHERE login = ?').get(login)
  if (existing) {
    console.log('\n❌ Bu login allaqachon mavjud!\n'); process.exit(1)
  }

  db.prepare('INSERT INTO users (ism, familiya, login, parol, rasm) VALUES (?,?,?,?,?)').run(ism, familiya, login, parol, rasm)

  console.log('\n✅ Account muvaffaqiyatli yaratildi!')
  console.log(`   👤 Ism   : ${ism} ${familiya}`)
  console.log(`   🔑 Login : ${login}`)
  console.log(`   🌐 Kirish: http://localhost:5173/login\n`)
}

main().catch(err => { console.error('Xatolik:', err.message); process.exit(1) })
