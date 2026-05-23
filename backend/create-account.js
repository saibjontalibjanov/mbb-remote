import readline from 'readline'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, 'db.json')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (question) => new Promise((resolve) => rl.question(question, resolve))

// Safe db read — handles missing or empty file
function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { royxat: [], xizmat: [], users: [] }
    }
    const content = fs.readFileSync(DB_PATH, 'utf-8').trim()
    if (!content) return { royxat: [], xizmat: [], users: [] }
    return JSON.parse(content)
  } catch (e) {
    console.log('⚠️  db.json o\'qilmadi, yangi yaratiladi.')
    return { royxat: [], xizmat: [], users: [] }
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

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
    console.log('\n❌ Ism, Login va Parol majburiy!\n')
    process.exit(1)
  }

  // Handle image
  let rasm = '/img/undraw_profile.svg'
  if (rasmPath && rasmPath.trim()) {
    const fullPath = path.resolve(rasmPath.trim())
    if (fs.existsSync(fullPath)) {
      try {
        const ext = path.extname(fullPath).toLowerCase()
        const mimes = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp' }
        const mime = mimes[ext] || 'image/jpeg'
        const imageData = fs.readFileSync(fullPath)
        rasm = `data:${mime};base64,${imageData.toString('base64')}`
        console.log('\n📷 Rasm muvaffaqiyatli o\'qildi.')
      } catch (e) {
        console.log('\n⚠️  Rasmni o\'qishda xatolik. Default rasm ishlatiladi.')
      }
    } else {
      console.log('\n⚠️  Rasm fayli topilmadi. Default rasm ishlatiladi.')
    }
  }

  // Load db safely
  const db = readDb()
  db.users = db.users ?? []

  // Check duplicate login
  if (db.users.find(u => u.login === login)) {
    console.log('\n❌ Bu login allaqachon mavjud! Boshqa login tanlang.\n')
    process.exit(1)
  }

  const newUser = {
    id: Date.now(),
    ism, familiya, login, parol, rasm,
    created_at: new Date().toISOString()
  }

  db.users.push(newUser)
  writeDb(db)

  console.log('\n✅ Account muvaffaqiyatli yaratildi!')
  console.log(`   👤 Ism     : ${ism} ${familiya}`)
  console.log(`   🔑 Login   : ${login}`)
  console.log(`   🌐 Kirish  : http://localhost:5173/login\n`)
}

main().catch((err) => {
  console.error('Xatolik:', err.message)
  process.exit(1)
})
