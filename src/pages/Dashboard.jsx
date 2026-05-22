import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

const emptyForm = { bolim: '', lavozim: '', fio: '', ipaddress: '', txt: '', domenname: '', sana: '' }

function Dashboard() {
  const [rows, setRows] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API = 'http://localhost:5000/api'

  const fetchRows = async () => {
    try {
      const res = await fetch(`${API}/xizmatlar`)
      const data = await res.json()
      setRows(data)
    } catch (err) {
      console.error('Server bilan ulanishda xatolik:', err)
    }
  }

  useEffect(() => {
    fetchRows()
  }, [])

  const statCards = [
    { label: "Ishchilar soni", value: rows.length, icon: 'fa-users', color: 'primary' },
    { label: "Xizmat ko'rsatilgan", value: rows.filter(r => r.txt).length, icon: 'fa-handshake', color: 'success' },
  ]

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleAdd = async () => {
    if (!form.fio || !form.bolim) {
      setError("F.I.O va Bo'lim majburiy!")
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/xizmatlar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
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
    try {
      await fetch(`${API}/xizmatlar/${id}`, { method: 'DELETE' })
      setRows(rows.filter(r => r.id !== id))
    } catch (err) {
      console.error('O\'chirishda xatolik:', err)
    }
  }

  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>

      {/* Stat Cards */}
      <div className="row">
        {statCards.map((card, i) => (
          <div key={i} className="col-xl-6 col-md-6 mb-4">
            <div className={`card border-left-${card.color} shadow h-100 py-2`}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className={`text-xs font-weight-bold text-${card.color} text-uppercase mb-1`}>
                      {card.label}
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{card.value}</div>
                  </div>
                  <div className="col-auto">
                    <i className={`fas ${card.icon} fa-2x text-gray-300`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Xizmat ko'rsatilganlar</h6>
          <button className="btn btn-primary btn-sm" onClick={() => { setShowModal(true); setError('') }}>
            <i className="fas fa-plus fa-sm mr-1"></i> Qo'shish
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Bo'lim</th>
                  <th>Lavozim</th>
                  <th>F.I.O</th>
                  <th>IP Address</th>
                  <th>Sana</th>
                  <th>Xizmat turi</th>
                  <th>Domen</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center text-gray-500 py-4">
                      <i className="fas fa-inbox fa-2x mb-2 d-block text-gray-300"></i>
                      Hozircha ma'lumot yo'q.
                    </td>
                  </tr>
                ) : (
                  rows.map((row, i) => (
                    <tr key={row.id}>
                      <td>{i + 1}</td>
                      <td>{row.bolim}</td>
                      <td>{row.lavozim}</td>
                      <td>{row.fio}</td>
                      <td>{row.ipaddress}</td>
                      <td>{row.sana}</td>
                      <td>{row.txt}</td>
                      <td>{row.domenname}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
                <h5 className="modal-title">Yangi Ma'lumot Kiritish</h5>
                <button className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-group">
                  <label>Bo'lim <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="bolim"
                    placeholder="Bo'limni kiriting" value={form.bolim} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Lavozim</label>
                  <input type="text" className="form-control" name="lavozim"
                    placeholder="Lavozimni kiriting" value={form.lavozim} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>F.I.O <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="fio"
                    placeholder="F.I.O ni kiriting" value={form.fio} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>IP Manzil</label>
                  <input type="text" className="form-control" name="ipaddress"
                    placeholder="IP Addressni kiriting" value={form.ipaddress} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Xizmat turi</label>
                  <input type="text" className="form-control" name="txt"
                    placeholder="Xizmat turini kiriting" value={form.txt} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Domen</label>
                  <input type="text" className="form-control" name="domenname"
                    placeholder="Domen name ni kiriting" value={form.domenname} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Sana</label>
                  <input type="date" className="form-control" name="sana"
                    value={form.sana} onChange={handleChange} />
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
