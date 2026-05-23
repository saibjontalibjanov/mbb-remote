import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Topbar({ onSidebarToggle }) {
  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [alertsOpen, setAlertsOpen]   = useState(false)
  const [messagesOpen, setMessagesOpen] = useState(false)
  const [userOpen, setUserOpen]       = useState(false)

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const fullName = user.ism ? `${user.ism} ${user.familiya || ''}`.trim() : 'Foydalanuvchi'
  const userPhoto = user.rasm || '/img/undraw_profile.svg'

  const handleLogout = () => {
    localStorage.removeItem('user')
    setShowLogoutModal(false)
    navigate('/login')
  }

  const closeAll = () => {
    setAlertsOpen(false)
    setMessagesOpen(false)
    setUserOpen(false)
  }

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
          onClick={onSidebarToggle}
        >
          <i className="fa fa-bars"></i>
        </button>

        {/* Topbar Search */}
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input type="text" className="form-control bg-light border-0 small" placeholder="Qidirish..." />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>

        <ul className="navbar-nav ml-auto">

          {/* Alerts */}
          <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#"
              onClick={(e) => { e.preventDefault(); closeAll(); setAlertsOpen(!alertsOpen) }}>
              <i className="fas fa-bell fa-fw"></i>
              <span className="badge badge-danger badge-counter">3+</span>
            </a>
            {alertsOpen && (
              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in show">
                <h6 className="dropdown-header">Bildirishnomalar</h6>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-primary">
                      <i className="fas fa-file-alt text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">Bugun</div>
                    <span className="font-weight-bold">Yangi oylik hisobot tayyor!</span>
                  </div>
                </a>
                <a className="dropdown-item text-center small text-gray-500" href="#">Barcha bildirishnomalar</a>
              </div>
            )}
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>

          {/* User Dropdown */}
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#"
              onClick={(e) => { e.preventDefault(); closeAll(); setUserOpen(!userOpen) }}>
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">{fullName}</span>
              <img
                className="img-profile rounded-circle"
                src={userPhoto}
                alt="profile"
                style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                onError={(e) => { e.target.src = '/img/undraw_profile.svg' }}
              />
            </a>
            {userOpen && (
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in show">
                <div className="dropdown-item text-center py-3">
                  <img
                    className="rounded-circle mb-2"
                    src={userPhoto}
                    alt="profile"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/img/undraw_profile.svg' }}
                  />
                  <div className="font-weight-bold">{fullName}</div>
                  <div className="small text-muted">{user.login}</div>
                </div>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#"
                  onClick={(e) => { e.preventDefault(); setShowLogoutModal(true) }}>
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Chiqish
                </a>
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chiqishni tasdiqlaysizmi?</h5>
                <button className="close" onClick={() => setShowLogoutModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Siz tizimdan chiqmoqchisiz. Davom etasizmi?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>Bekor qilish</button>
                <button className="btn btn-primary" onClick={handleLogout}>Chiqish</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Topbar
