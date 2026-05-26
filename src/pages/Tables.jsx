import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import Layout from '../components/Layout'

const InfoRow = ({ label, value }) => (
  <tr>
    <td className="font-weight-bold text-gray-700" style={{ width: '45%' }}>{label}</td>
    <td>{value || <span className="text-muted">—</span>}</td>
  </tr>
)

function Tables() {
  const [rows, setRows] = useState([])
  const [search, setSearch] = useState('')
  const [selectedRow, setSelectedRow] = useState(null)
  const [popupType, setPopupType] = useState(null)
  const [page, setPage] = useState(1)
  const perPage = 10
  const API = 'http://localhost:5000/api'

  useEffect(() => {
    fetch(`${API}/royxat`).then(r => r.json()).then(setRows).catch(console.error)
  }, [])

  const openPopup = (row, type) => { setSelectedRow(row); setPopupType(type) }
  const closePopup = () => { setSelectedRow(null); setPopupType(null) }

  const handleDelete = async (id) => {
    if (!window.confirm("O'chirishni tasdiqlaysizmi?")) return
    await fetch(`${API}/royxat/${id}`, { method: 'DELETE' })
    setRows(rows.filter(r => r.id !== id))
  }

  const exportExcel = () => {
    const data = rows.map((r, i) => ({
      '#': i + 1,
      "Bo'lamalar": r.bolamalar, 'Uchastkalar': r.uchastkalar,
      "Bo'limlar": r.bolimlar, 'Lavozimlar': r.lavozimlar, 'F.I.O': r.fio,
      'IP Address': r.ip_address, 'Name Computer': r.name_computer, 'Mac Address': r.mac_address,
      'MotherBoard': r.motherboard, 'CPU': r.cpu, 'RAM': r.ram,
      'SSD': r.ssd, 'HDD': r.hdd, 'Monitor': r.monitor,
      'Keyboard': r.keyboard, 'Mouse': r.mouse, 'GPU': r.gpu,
      'Printer': r.printer, 'Speaker': r.speaker, 'Camera': r.camera,
      'Microphone': r.microphone, 'UPS': r.ups, 'IP Tel': r.ip_tel, 'Hub': r.hub,
      'Izox': r.izox
    }))
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Umumiy Ro'yxat")
    XLSX.writeFile(wb, `royxat_${new Date().toLocaleDateString('uz')}.xlsx`)
  }

  const filtered = rows.filter(row =>
    Object.values(row).some(v => String(v || '').toLowerCase().includes(search.toLowerCase()))
  )
  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Umumiy Ro'yxatlar</h1>
        <span className="badge badge-primary" style={{ fontSize: '1rem', padding: '8px 16px' }}>
          Jami: {rows.length} ta ishchi
        </span>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Barcha Ishchilar Ro'yxati</h6>
          <button className="btn btn-success btn-sm" onClick={exportExcel}>
            <i className="fas fa-file-excel mr-1"></i> Excel ga export
          </button>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-sm-6 ml-auto">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Qidirish..."
                  value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} />
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fas fa-search"></i></span>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-sm" width="100%" cellSpacing="0">
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Bo'lamalar</th>
                  <th>Uchastkalar</th>
                  <th>Bo'limlar</th>
                  <th>Lavozimlar</th>
                  <th>F.I.O</th>
                  <th>Digital Info</th>
                  <th>Technical Equipment</th>
                  <th>Izox</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-4 text-muted">
                      <i className="fas fa-inbox fa-2x mb-2 d-block text-gray-300"></i>
                      Ma'lumot topilmadi.
                    </td>
                  </tr>
                ) : paginated.map((row, i) => (
                  <tr key={row.id}>
                    <td>{(page - 1) * perPage + i + 1}</td>
                    <td>{row.bolamalar || '—'}</td>
                    <td>{row.uchastkalar || '—'}</td>
                    <td>{row.bolimlar || '—'}</td>
                    <td>{row.lavozimlar || '—'}</td>
                    <td className="font-weight-bold">{row.fio}</td>
                    <td>
                      <button className="btn btn-info btn-sm" onClick={() => openPopup(row, 'digital')}>
                        Batafsil...
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => openPopup(row, 'technical')}>
                        Batafsil...
                      </button>
                    </td>
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

          {totalPages > 1 && (
            <div className="row mt-3">
              <div className="col-sm-5">
                <span className="text-muted small">
                  {Math.min((page-1)*perPage+1, filtered.length)}–{Math.min(page*perPage, filtered.length)} / {filtered.length} ta
                </span>
              </div>
              <div className="col-sm-7">
                <nav className="float-right">
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item${page===1?' disabled':''}`}>
                      <button className="page-link" onClick={() => setPage(page-1)}>Oldingi</button>
                    </li>
                    {Array.from({length: totalPages},(_,i)=>i+1).map(p => (
                      <li key={p} className={`page-item${p===page?' active':''}`}>
                        <button className="page-link" onClick={() => setPage(p)}>{p}</button>
                      </li>
                    ))}
                    <li className={`page-item${page===totalPages?' disabled':''}`}>
                      <button className="page-link" onClick={() => setPage(page+1)}>Keyingi</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Digital Info Popup */}
      {selectedRow && popupType === 'digital' && (
        <div className="modal fade show" style={{ display:'block', backgroundColor:'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title"><i className="fas fa-network-wired mr-2"></i>Digital Info — {selectedRow.fio}</h5>
                <button className="close text-white" onClick={closePopup}><span>&times;</span></button>
              </div>
              <div className="modal-body">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <InfoRow label="IP Address" value={selectedRow.ip_address} />
                    <InfoRow label="Name Computer" value={selectedRow.name_computer} />
                    <InfoRow label="Mac Address" value={selectedRow.mac_address} />
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closePopup}>Yopish</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Technical Equipment Popup */}
      {selectedRow && popupType === 'technical' && (
        <div className="modal fade show" style={{ display:'block', backgroundColor:'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-warning">
                <h5 className="modal-title"><i className="fas fa-desktop mr-2"></i>Technical Equipment — {selectedRow.fio}</h5>
                <button className="close" onClick={closePopup}><span>&times;</span></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <table className="table table-borderless table-sm mb-0">
                      <tbody>
                        {[['MotherBoard',selectedRow.motherboard],['CPU',selectedRow.cpu],['RAM',selectedRow.ram],['SSD',selectedRow.ssd],['HDD',selectedRow.hdd],['Monitor',selectedRow.monitor],['Keyboard',selectedRow.keyboard],['Mouse',selectedRow.mouse]].map(([l,v])=><InfoRow key={l} label={l} value={v}/>)}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <table className="table table-borderless table-sm mb-0">
                      <tbody>
                        {[['GPU',selectedRow.gpu],['Printer',selectedRow.printer],['Speaker',selectedRow.speaker],['Camera',selectedRow.camera],['Microphone',selectedRow.microphone],['UPS',selectedRow.ups],['IP Tel',selectedRow.ip_tel],['Hub',selectedRow.hub]].map(([l,v])=><InfoRow key={l} label={l} value={v}/>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closePopup}>Yopish</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Tables
