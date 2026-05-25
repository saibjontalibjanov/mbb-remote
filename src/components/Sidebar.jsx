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

      {/* Qo'shish */}
      <li className={`nav-item${isActive('/qoshish') ? ' active' : ''}`}>
        <Link className="nav-link" to="/qoshish">
          <i className="fas fa-fw fa-plus-circle"></i>
          <span>Qo'shish</span>
        </Link>
      </li>

      {/* Umumiy Ro'yxat */}
      <li className={`nav-item${isActive('/tables') ? ' active' : ''}`}>
        <Link className="nav-link" to="/tables">
          <i className="fas fa-fw fa-table"></i>
          <span>Umumiy Ro'yxatlar</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />


      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" onClick={onToggle}></button>
      </div>
    </ul>
  )
}

export default Sidebar
