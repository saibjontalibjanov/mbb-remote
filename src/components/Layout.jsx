import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function Layout({ children }) {
  const [sidebarToggled, setSidebarToggled] = useState(false)

  return (
    <div id="wrapper">
      <Sidebar toggled={sidebarToggled} onToggle={() => setSidebarToggled(!sidebarToggled)} />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar onSidebarToggle={() => setSidebarToggled(!sidebarToggled)} />
          <div className="container-fluid">
            {children}
          </div>
        </div>
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; MBB Remote 2024</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout
