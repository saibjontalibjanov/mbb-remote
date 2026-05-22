import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Sidebar({ toggled, onToggle }) {
  const location = useLocation()
  const [componentsOpen, setComponentsOpen] = useState(false)
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

      <div className="sidebar-heading">Interface</div>

      {/* Components collapse */}
      <li className={`nav-item${isActive('/buttons') || isActive('/cards') ? ' active' : ''}`}>
        <a
          className={`nav-link${componentsOpen ? '' : ' collapsed'}`}
          href="#"
          onClick={(e) => { e.preventDefault(); setComponentsOpen(!componentsOpen) }}
          aria-expanded={componentsOpen}
        >
          <i className="fas fa-fw fa-cog"></i>
          <span>Components</span>
        </a>
        <div className={`collapse${componentsOpen ? ' show' : ''}`}>
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Components:</h6>
            <Link className={`collapse-item${isActive('/buttons') ? ' active' : ''}`} to="/buttons">Buttons</Link>
            <Link className={`collapse-item${isActive('/cards') ? ' active' : ''}`} to="/cards">Cards</Link>
          </div>
        </div>
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
          <span>Pages</span>
        </a>
        <div className={`collapse${pagesOpen ? ' show' : ''}`}>
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Login Screens:</h6>
            <Link className="collapse-item" to="/login">Login</Link>
            <Link className="collapse-item" to="/register">Register</Link>
            <Link className="collapse-item" to="/forgot-password">Forgot Password</Link>
            <div className="collapse-divider"></div>
            <h6 className="collapse-header">Other Pages:</h6>
            <Link className="collapse-item" to="/404">404 Page</Link>
            <Link className="collapse-item" to="/blank">Blank Page</Link>
          </div>
        </div>
      </li>

      {/* Charts */}
      <li className={`nav-item${isActive('/charts') ? ' active' : ''}`}>
        <Link className="nav-link" to="/charts">
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Charts</span>
        </Link>
      </li>

      {/* Tables */}
      <li className={`nav-item${isActive('/tables') ? ' active' : ''}`}>
        <Link className="nav-link" to="/tables">
          <i className="fas fa-fw fa-table"></i>
          <span>Tables</span>
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
