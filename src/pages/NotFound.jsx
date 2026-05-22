import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="bg-gradient-primary" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center" style={{ paddingTop: '8rem' }}>
            <div className="error mx-auto mb-4" style={{
              fontSize: '7rem',
              fontWeight: '700',
              color: 'white',
              textShadow: '0 0 20px rgba(0,0,0,0.2)'
            }}>
              404
            </div>
            <p className="lead text-white-50 mb-3">Page Not Found</p>
            <p className="text-white-50 mb-5">
              It looks like you found a glitch in the matrix...
            </p>
            <Link to="/dashboard" className="btn btn-light btn-lg">
              <i className="fas fa-arrow-left mr-2"></i> Back to Dashboard
            </Link>
            <br /><br />
            <Link to="/login" className="text-white-50 small">Go to Login instead</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
