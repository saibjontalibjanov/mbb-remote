import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

Chart.register(...registerables)

function Dashboard() {
  const areaChartRef = useRef(null)
  const pieChartRef = useRef(null)
  const barChartRef = useRef(null)
  const areaChartInstance = useRef(null)
  const pieChartInstance = useRef(null)
  const barChartInstance = useRef(null)

  useEffect(() => {
    // Area chart
    if (areaChartRef.current) {
      if (areaChartInstance.current) areaChartInstance.current.destroy()
      areaChartInstance.current = new Chart(areaChartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Earnings',
            data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 17000, 30000, 25000, 40000],
            backgroundColor: 'rgba(78, 115, 223, 0.05)',
            borderColor: 'rgba(78, 115, 223, 1)',
            fill: true,
            tension: 0.4,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { ticks: { callback: (v) => '$' + v.toLocaleString() } }
          }
        }
      })
    }

    // Pie chart
    if (pieChartRef.current) {
      if (pieChartInstance.current) pieChartInstance.current.destroy()
      pieChartInstance.current = new Chart(pieChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Direct', 'Social', 'Referral'],
          datasets: [{
            data: [55, 30, 15],
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            hoverBorderColor: 'rgba(234, 236, 244, 1)',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } }
        }
      })
    }

    // Bar chart
    if (barChartRef.current) {
      if (barChartInstance.current) barChartInstance.current.destroy()
      barChartInstance.current = new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue',
            data: [4215, 5312, 6251, 7841, 9821, 14984],
            backgroundColor: '#4e73df',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { ticks: { callback: (v) => '$' + v.toLocaleString() } } }
        }
      })
    }

    return () => {
      areaChartInstance.current?.destroy()
      pieChartInstance.current?.destroy()
      barChartInstance.current?.destroy()
    }
  }, [])

  const statCards = [
    { label: 'Earnings (Monthly)', value: '$40,000', icon: 'fa-calendar', color: 'primary' },
    { label: 'Earnings (Annual)', value: '$215,000', icon: 'fa-dollar-sign', color: 'success' },
    { label: 'Tasks', value: '50%', icon: 'fa-clipboard-list', color: 'info', progress: 50 },
    { label: 'Pending Requests', value: '18', icon: 'fa-comments', color: 'warning' },
  ]

  return (
    <Layout>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <i className="fas fa-download fa-sm text-white-50"></i> Generate Report
        </a>
      </div>

      {/* Stat Cards */}
      <div className="row">
        {statCards.map((card, i) => (
          <div key={i} className="col-xl-3 col-md-6 mb-4">
            <div className={`card border-left-${card.color} shadow h-100 py-2`}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className={`text-xs font-weight-bold text-${card.color} text-uppercase mb-1`}>{card.label}</div>
                    {card.progress !== undefined ? (
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{card.value}</div>
                        </div>
                        <div className="col">
                          <div className="progress progress-sm mr-2">
                            <div className={`progress-bar bg-${card.color}`} role="progressbar"
                              style={{ width: card.value }} aria-valuenow={card.progress} aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{card.value}</div>
                    )}
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

      {/* Charts Row */}
      <div className="row">
        {/* Area Chart */}
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
            </div>
            <div className="card-body">
              <div className="chart-area">
                <canvas ref={areaChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
            </div>
            <div className="card-body">
              <div className="chart-pie pt-4 pb-2">
                <canvas ref={pieChartRef}></canvas>
              </div>
              <div className="mt-4 text-center small">
                <span className="mr-2"><i className="fas fa-circle text-primary"></i> Direct</span>
                <span className="mr-2"><i className="fas fa-circle text-success"></i> Social</span>
                <span className="mr-2"><i className="fas fa-circle text-info"></i> Referral</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart & Tasks Row */}
      <div className="row">
        {/* Bar Chart */}
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Revenue Overview</h6>
            </div>
            <div className="card-body">
              <div className="chart-bar">
                <canvas ref={barChartRef}></canvas>
              </div>
              <hr />
              Generating server side charts using the Chart.js framework.
            </div>
          </div>
        </div>

        {/* Projects Card */}
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
              <div className="dropdown no-arrow">
                <a className="dropdown-toggle" href="#">
                  <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
              </div>
            </div>
            <div className="card-body">
              {[
                { label: 'Server Migration', pct: 20, color: 'danger' },
                { label: 'Sales Tracking', pct: 40, color: 'warning' },
                { label: 'Customer Database', pct: 60, color: 'primary' },
                { label: 'Payout Details', pct: 80, color: 'info' },
                { label: 'Account Setup', pct: 100, color: 'success' },
              ].map((p, i) => (
                <div key={i} className="mb-3">
                  <div className="small mb-1">
                    {p.label}
                    <span className="float-right">{p.pct}%</span>
                  </div>
                  <div className="progress mb-2">
                    <div className={`progress-bar bg-${p.color}`} role="progressbar" style={{ width: `${p.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Row - Messages & Approach */}
      <div className="row">
        {/* Illustrations */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Illustrations</h6>
            </div>
            <div className="card-body">
              <div className="text-center">
                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '25rem' }} src="/img/undraw_posting_photo.svg" alt="illustration" />
              </div>
              <p>
                Add some quality, svg illustrations to your project courtesy of{' '}
                <a target="_blank" rel="noreferrer" href="https://undraw.co/">unDraw</a>, a
                constantly updated collection of beautiful svg images that you can use completely free and without
                attribution!
              </p>
              <a target="_blank" rel="noreferrer" href="https://undraw.co/">Browse Illustrations on unDraw &rarr;</a>
            </div>
          </div>

          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
            </div>
            <div className="card-body">
              <p className="mb-0">
                This template uses Bootstrap 4 and SB Admin 2 theme, now converted to React. Customize the
                components to meet your needs!
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Search</h6>
            </div>
            <div className="card-body">
              <p className="mb-0">Use the sidebar to navigate to pages including Charts, Tables, Buttons, and more.</p>
            </div>
          </div>

          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Quick Links</h6>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li><Link to="/charts"><i className="fas fa-chart-area mr-2 text-primary"></i>Charts</Link></li>
                <li><Link to="/tables"><i className="fas fa-table mr-2 text-primary"></i>Tables</Link></li>
                <li><Link to="/buttons"><i className="fas fa-cog mr-2 text-primary"></i>Buttons</Link></li>
                <li><Link to="/cards"><i className="fas fa-clone mr-2 text-primary"></i>Cards</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
