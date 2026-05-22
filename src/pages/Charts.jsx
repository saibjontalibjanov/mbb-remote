import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import Layout from '../components/Layout'

Chart.register(...registerables)

function Charts() {
  const areaRef = useRef(null)
  const barRef = useRef(null)
  const pieRef = useRef(null)
  const areaInst = useRef(null)
  const barInst = useRef(null)
  const pieInst = useRef(null)

  useEffect(() => {
    if (areaRef.current) {
      if (areaInst.current) areaInst.current.destroy()
      areaInst.current = new Chart(areaRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Earnings',
            data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 17000, 30000, 25000, 40000],
            backgroundColor: 'rgba(78, 115, 223, 0.05)',
            borderColor: 'rgba(78, 115, 223, 1)',
            fill: true, tension: 0.4,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { ticks: { callback: (v) => '$' + v.toLocaleString() } } }
        }
      })
    }

    if (barRef.current) {
      if (barInst.current) barInst.current.destroy()
      barInst.current = new Chart(barRef.current, {
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
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { ticks: { callback: (v) => '$' + v.toLocaleString() } } }
        }
      })
    }

    if (pieRef.current) {
      if (pieInst.current) pieInst.current.destroy()
      pieInst.current = new Chart(pieRef.current, {
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
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } }
        }
      })
    }

    return () => {
      areaInst.current?.destroy()
      barInst.current?.destroy()
      pieInst.current?.destroy()
    }
  }, [])

  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Charts</h1>
      </div>

      <div className="row">
        <div className="col-xl-8 col-lg-7">
          {/* Area Chart */}
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Area Chart</h6>
            </div>
            <div className="card-body">
              <div className="chart-area">
                <canvas ref={areaRef}></canvas>
              </div>
              <hr />
              Area chart powered by Chart.js
            </div>
          </div>

          {/* Bar Chart */}
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Bar Chart</h6>
            </div>
            <div className="card-body">
              <div className="chart-bar">
                <canvas ref={barRef}></canvas>
              </div>
              <hr />
              Bar chart powered by Chart.js
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-5">
          {/* Pie Chart */}
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Pie Chart</h6>
            </div>
            <div className="card-body">
              <div className="chart-pie pt-4">
                <canvas ref={pieRef}></canvas>
              </div>
              <hr />
              <div className="mt-4 text-center small">
                <span className="mr-2"><i className="fas fa-circle text-primary"></i> Direct</span>
                <span className="mr-2"><i className="fas fa-circle text-success"></i> Social</span>
                <span className="mr-2"><i className="fas fa-circle text-info"></i> Referral</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Charts
