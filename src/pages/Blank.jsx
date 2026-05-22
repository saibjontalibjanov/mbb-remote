import Layout from '../components/Layout'

function Blank() {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Blank Page</h1>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Ready to Start?</h6>
        </div>
        <div className="card-body">
          This is your blank canvas. Start building your content here.
        </div>
      </div>
    </Layout>
  )
}

export default Blank
