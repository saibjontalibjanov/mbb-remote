import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

const emptyForm = { bolim: '', lavozim: '', fio: '', xizmat_turi: '', name_computer: '', izox: '' }

const getToday = () => {
  const d = new Date()
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

function Dashboard() {
  const [royxatCount, setRoyxatCount] = useState(0)
  const [rows, setRows] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API = 'http://localhost:5000/api'

  useEffect(() => {
    fetch(`${API}/royxat`)
      .then(res => res.json())
      .then(data => setRoyxatCount(data.length))
      .catch(err => console.error('Xatolik:', err))

    fetch(`${API}/xizmat`)
      .then(res => res.json())
      .then(data => setRows(data))
      .catch(err => console.error('Xatolik:', err))
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleAdd = async () => {
    if (!form.fio) { setError("F.I.O majburiy!"); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/xizmat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sana: getToday() })
      })
      const newRow = await res.json()
      setRows([...rows, newRow])
      setForm(emptyForm)
      setShowModal(false)
    } catch (err) {
      setError('Saqlashda xatolik yuz berdi!')
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("O'chirishni tasdiqlaysizmi?")) return
    await fetch(`${API}/xizmat/${id}`, { method: 'DELETE' })
    setRows(rows.filter(r => r.id !== id))
  }

  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>

      {/* Stat Cards */}
      <div className="row">
        <div className="col-xl-6 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Ishchilar soni</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{royxatCount}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Xizmat ko'rsatilgan</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{rows.length}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-handshake fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Xizmat Ko'rsatilgan Table */}
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Xizmat Ko'rsatilgan</h6>
          <button className="btn btn-primary btn-sm" onClick={() => { setShowModal(true); setError('') }}>
            <i className="fas fa-plus fa-sm mr-1"></i> Qo'shish
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-sm" width="100%" cellSpacing="0">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Bo'lim</th>
                  <th>Lavozim</th>
                  <th>F.I.O</th>
                  <th>Xizmat turi</th>
                  <th>Name Computer</th>
                  <th>Sana</th>
                  <th>Izox</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-muted">
                      <i className="fas fa-inbox fa-2x mb-2 d-block text-gray-300"></i>
                      Hozircha ma'lumot yo'q.
                    </td>
                  </tr>
                ) : rows.map((row, i) => (
                  <tr key={row.id}>
                    <td>{i + 1}</td>
                    <td>{row.bolim || '—'}</td>
                    <td>{row.lavozim || '—'}</td>
                    <td>{row.fio}</td>
                    <td>{row.xizmat_turi || '—'}</td>
                    <td>{row.name_computer || '—'}</td>
                    <td>{row.sana}</td>
                    <td>{row.izox || '—'}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xizmat Ma'lumotini Kiritish</h5>
                <button className="close" onClick={() => setShowModal(false)}><span>&times;</span></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Auto date display */}
                <div className="alert alert-light border mb-3">
                  <i className="fas fa-calendar-alt mr-2 text-primary"></i>
                  Sana avtomatik: <strong>{getToday()}</strong>
                </div>

                <div className="form-group">
                  <label>Bo'lim</label>
                  <input type="text" className="form-control" name="bolim"
                    placeholder="Bo'lim kiriting" value={form.bolim} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Lavozim</label>
                  <input type="text" className="form-control" name="lavozim"
                    placeholder="Lavozim kiriting" value={form.lavozim} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>F.I.O <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="fio"
                    placeholder="F.I.O kiriting" value={form.fio} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Xizmat turi</label>
                  <input type="text" className="form-control" name="xizmat_turi"
                    placeholder="Xizmat turini kiriting" value={form.xizmat_turi} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Name Computer</label>
                  <input type="text" className="form-control" name="name_computer"
                    placeholder="Kompyuter nomini kiriting" value={form.name_computer} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Izox <span className="text-muted small">(Jihozlarida o'zgarishlar yuz bergan bo'lsa yozib keting)</span></label>
                  <textarea className="form-control" name="izox" rows="3"
                    placeholder="Izox kiriting..." value={form.izox} onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Bekor qilish</button>
                <button className="btn btn-primary" onClick={handleAdd} disabled={loading}>
                  {loading ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Dashboard
