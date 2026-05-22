import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRegister = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="bg-gradient-primary" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  <form className="user" onSubmit={handleRegister}>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input type="text" className="form-control form-control-user" name="firstName"
                          placeholder="First Name" value={form.firstName} onChange={handleChange} required />
                      </div>
                      <div className="col-sm-6">
                        <input type="text" className="form-control form-control-user" name="lastName"
                          placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-user" name="email"
                        placeholder="Email Address" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input type="password" className="form-control form-control-user" name="password"
                          placeholder="Password" value={form.password} onChange={handleChange} required />
                      </div>
                      <div className="col-sm-6">
                        <input type="password" className="form-control form-control-user" name="confirmPassword"
                          placeholder="Repeat Password" value={form.confirmPassword} onChange={handleChange} required />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-user btn-block">
                      Register Account
                    </button>
                    <hr />
                    <a href="#" className="btn btn-google btn-user btn-block">
                      <i className="fab fa-google fa-fw"></i> Register with Google
                    </a>
                    <a href="#" className="btn btn-facebook btn-user btn-block">
                      <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                    </a>
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link className="small" to="/forgot-password">Forgot Password?</Link>
                  </div>
                  <div className="text-center">
                    <Link className="small" to="/login">Already have an account? Login!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
