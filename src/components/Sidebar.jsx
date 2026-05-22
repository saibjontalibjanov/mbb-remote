import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Sidebar({ toggled, onToggle }) {
  const location = useLocation()
  const [pagesOpen, setPagesOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <ul
      className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion${toggled ? ' toggled' : ''}`}
      id="accordionSidebar"
    >
      {/* Brand */}
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">MBB Remote</div>
      </Link>

      <hr className="sidebar-divider my-0" />

      {/* Dashboard */}
      <li className={`nav-item${isActive('/dashboard') ? ' active' : ''}`}>
        <Link className="nav-link" to="/dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Addons</div>

      {/* Pages collapse */}
      <li className="nav-item">
        <a
          className={`nav-link${pagesOpen ? '' : ' collapsed'}`}
          href="#"
          onClick={(e) => { e.preventDefault(); setPagesOpen(!pagesOpen) }}
          aria-expanded={pagesOpen}
        >
          <i className="fas fa-fw fa-folder"></i>
          <span>Ro`yxatlar</span>
        </a>
        <div className={`collapse${pagesOpen ? ' show' : ''}`}>
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Asosiy:</h6>
            <Link className={`collapse-item${isActive('/login') ? ' active' : ''}`} to="/filter-bolimlar">Bo`limlar</Link>
            <Link className={`collapse-item${isActive('/register') ? ' active' : ''}`} to="/filter-ishchilar">Ishchilar</Link>
            <Link className={`collapse-item${isActive('/forgot-password') ? ' active' : ''}`} to="/filter-lavozimlar">Lavozimlar</Link>
            <div className="collapse-divider"></div>
            <h6 className="collapse-header">Boshqalar</h6>
            <Link className={`collapse-item${isActive('/404') ? ' active' : ''}`} to="/filter-jihozlar">Jihozlar</Link>
            <Link className={`collapse-item${isActive('/blank') ? ' active' : ''}`} to="/filter-ip">IP Address</Link>
          </div>
        </div>
      </li>

      {/* Charts */}

      {/* Tables */}
      <li className={`nav-item${isActive('/tables') ? ' active' : ''}`}>
        <Link className="nav-link" to="/tables">
          <i className="fas fa-fw fa-table"></i>
          <span>Umumiy Ro`yxatlar</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" onClick={onToggle}></button>
      </div>
    </ul>
  )
}

export default Sidebar
