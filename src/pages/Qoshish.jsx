import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const emptyForm = {
  bolamalar: '', uchastkalar: '', bolimlar: '', lavozimlar: '', fio: '',
  ip_address: '', name_computer: '', mac_address: '',
  motherboard: '', cpu: '', ram: '', ssd: '', hdd: '', monitor: '',
  keyboard: '', mouse: '', gpu: '', printer: '', speaker: '', camera: '',
  microphone: '', ups: '', ip_tel: '', hub: '',
  izox: ''
}

// Field component is defined OUTSIDE Qoshish to prevent re-mounting on each keystroke
function Field({ label, name, required, value, onChange }) {
  return (
    <div className="form-group col-md-6">
      <label>{label} {required && <span className="text-danger">*</span>}</label>
      <input
        type="text"
        className="form-control"
        name={name}
        placeholder={`${label} kiriting`}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

function Qoshish() {
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.fio) { setError("F.I.O majburiy!"); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/royxat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error) }
      setSuccess(true)
      setForm(emptyForm)
      setTimeout(() => { setSuccess(false); navigate('/tables') }, 1500)
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi!')
    }
    setLoading(false)
  }

  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Yangi Ishchi Qo'shish</h1>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">✅ Muvaffaqiyatli saqlandi! Ro'yxatga o'tilmoqda...</div>}

      {/* Asosiy Ma'lumotlar */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            <i className="fas fa-user mr-2"></i>Asosiy Ma'lumotlar
          </h6>
        </div>
        <div className="card-body">
          <div className="form-row">
            <Field label="Bo'lamalar"  name="bolamalar"  value={form.bolamalar}  onChange={handleChange} />
            <Field label="Uchastkalar" name="uchastkalar" value={form.uchastkalar} onChange={handleChange} />
            <Field label="Bo'limlar"   name="bolimlar"   value={form.bolimlar}   onChange={handleChange} />
            <Field label="Lavozimlar"  name="lavozimlar"  value={form.lavozimlar}  onChange={handleChange} />
            <Field label="F.I.O"       name="fio"         value={form.fio}         onChange={handleChange} required />
          </div>
        </div>
      </div>

      {/* Digital Info */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-info">
            <i className="fas fa-network-wired mr-2"></i>Digital Info
          </h6>
        </div>
        <div className="card-body">
          <div className="form-row">
            <Field label="IP Address"    name="ip_address"    value={form.ip_address}    onChange={handleChange} />
            <Field label="Name Computer" name="name_computer" value={form.name_computer} onChange={handleChange} />
            <Field label="Mac Address"   name="mac_address"   value={form.mac_address}   onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Technical Equipment */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-warning">
            <i className="fas fa-desktop mr-2"></i>Technical Equipment
          </h6>
        </div>
        <div className="card-body">
          <div className="form-row">
            <Field label="MotherBoard" name="motherboard" value={form.motherboard} onChange={handleChange} />
            <Field label="CPU"         name="cpu"         value={form.cpu}         onChange={handleChange} />
            <Field label="RAM"         name="ram"         value={form.ram}         onChange={handleChange} />
            <Field label="SSD"         name="ssd"         value={form.ssd}         onChange={handleChange} />
            <Field label="HDD"         name="hdd"         value={form.hdd}         onChange={handleChange} />
            <Field label="Monitor"     name="monitor"     value={form.monitor}     onChange={handleChange} />
            <Field label="Keyboard"    name="keyboard"    value={form.keyboard}    onChange={handleChange} />
            <Field label="Mouse"       name="mouse"       value={form.mouse}       onChange={handleChange} />
            <Field label="GPU"         name="gpu"         value={form.gpu}         onChange={handleChange} />
            <Field label="Printer"     name="printer"     value={form.printer}     onChange={handleChange} />
            <Field label="Speaker"     name="speaker"     value={form.speaker}     onChange={handleChange} />
            <Field label="Camera"      name="camera"      value={form.camera}      onChange={handleChange} />
            <Field label="Microphone"  name="microphone"  value={form.microphone}  onChange={handleChange} />
            <Field label="UPS"         name="ups"         value={form.ups}         onChange={handleChange} />
            <Field label="IP Tel"      name="ip_tel"      value={form.ip_tel}      onChange={handleChange} />
            <Field label="Hub"         name="hub"         value={form.hub}         onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Izox */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-secondary">
            <i className="fas fa-comment mr-2"></i>Izox
          </h6>
        </div>
        <div className="card-body">
          <div className="form-group">
            <textarea
              className="form-control"
              name="izox"
              rows="3"
              placeholder="Izox kiriting..."
              value={form.izox}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mb-4 d-flex" style={{ gap: '10px' }}>
        <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={loading}>
          <i className="fas fa-save mr-2"></i>{loading ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
        <button className="btn btn-secondary btn-lg" onClick={() => navigate('/tables')}>
          <i className="fas fa-times mr-2"></i>Bekor qilish
        </button>
      </div>
    </Layout>
  )
}

export default Qoshish
