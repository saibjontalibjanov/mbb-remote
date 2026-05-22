import { useState } from 'react'
import Layout from '../components/Layout'

const emptyForm = { ism: '', familiya: '', lavozim: '', xizmat: '', sana: '' }

function Dashboard() {
  const [rows, setRows] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const statCards = [
    { label: "Ishchilar soni", value: rows.length, icon: 'fa-users', color: 'primary' },
    { label: "Xizmat ko'rsatilgan", value: rows.filter(r => r.xizmat).length, icon: 'fa-handshake', color: 'success' },
  ]

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleAdd = () => {
    if (!form.ism || !form.familiya) return
    setRows([...rows, { ...form, id: Date.now() }])
    setForm(emptyForm)
    setShowModal(false)
  }

  const handleDelete = (id) => {
    setRows(rows.filter(r => r.id !== id))
  }

  return (
    <Layout>
      {/* Page Heading */}
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
          <h6 className="m-0 font-weight-bold text-primary">Ishchilar Ro'yxati</h6>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            <i className="fas fa-plus fa-sm mr-1"></i> Ishchi qo'shish
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ism</th>
                  <th>Familiya</th>
                  <th>Lavozim</th>
                  <th>Xizmat turi</th>
                  <th>Sana</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-gray-500 py-4">
                      <i className="fas fa-inbox fa-2x mb-2 d-block text-gray-300"></i>
                      Hozircha ma'lumot yo'q. Ishchi qo'shish tugmasini bosing.
                    </td>
                  </tr>
                ) : (
                  rows.map((row, i) => (
                    <tr key={row.id}>
                      <td>{i + 1}</td>
                      <td>{row.ism}</td>
                      <td>{row.familiya}</td>
                      <td>{row.lavozim}</td>
                      <td>{row.xizmat}</td>
                      <td>{row.sana}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(row.id)}
                        >
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
                <h5 className="modal-title">Yangi Ishchi Qo'shish</h5>
                <button className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Ism</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ism"
                    placeholder="Ismni kiriting"
                    value={form.ism}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Familiya</label>
                  <input
                    type="text"
                    className="form-control"
                    name="familiya"
                    placeholder="Familiyani kiriting"
                    value={form.familiya}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Lavozim</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lavozim"
                    placeholder="Lavozimni kiriting"
                    value={form.lavozim}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Xizmat turi</label>
                  <input
                    type="text"
                    className="form-control"
                    name="xizmat"
                    placeholder="Xizmat turini kiriting"
                    value={form.xizmat}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Sana</label>
                  <input
                    type="date"
                    className="form-control"
                    name="sana"
                    value={form.sana}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Bekor qilish</button>
                <button className="btn btn-primary" onClick={handleAdd}>Saqlash</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Dashboard
