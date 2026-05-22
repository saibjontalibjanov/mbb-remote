import Layout from '../components/Layout'

function Cards() {
  return (
    <Layout>
      <h1 className="h3 mb-4 text-gray-800">Cards</h1>

      {/* Basic Cards */}
      <div className="row">
        {['primary', 'success', 'info', 'warning', 'danger', 'secondary', 'dark'].map(color => (
          <div key={color} className="col-lg-6 mb-4">
            <div className={`card bg-${color} text-white shadow`}>
              <div className="card-body">
                {color.charAt(0).toUpperCase() + color.slice(1)}
                <div className="text-white-50 small">Colored {color} card</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Border Left Cards */}
      <div className="row">
        {[
          { color: 'primary', label: 'Primary Accent', value: '$40,000', icon: 'fa-calendar' },
          { color: 'success', label: 'Success Accent', value: '$215,000', icon: 'fa-dollar-sign' },
          { color: 'info', label: 'Info Accent', value: '50%', icon: 'fa-clipboard-list' },
          { color: 'warning', label: 'Warning Accent', value: '18', icon: 'fa-comments' },
        ].map((card, i) => (
          <div key={i} className="col-xl-3 col-md-6 mb-4">
            <div className={`card border-left-${card.color} shadow h-100 py-2`}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className={`text-xs font-weight-bold text-${card.color} text-uppercase mb-1`}>{card.label}</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{card.value}</div>
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

      {/* Cards with Header */}
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Card with Header</h6>
            </div>
            <div className="card-body">
              This card has a header and a body. Use it to group information in a clean container.
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Card with Header & Dropdown</h6>
              <div className="dropdown no-arrow">
                <a className="dropdown-toggle" href="#" role="button">
                  <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
              </div>
            </div>
            <div className="card-body">
              This card has a dropdown button in the header for additional actions.
            </div>
          </div>
        </div>
      </div>

      {/* Cards with Image */}
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card shadow">
            <img className="card-img-top" src="/img/undraw_posting_photo.svg" alt="Card illustration" />
            <div className="card-body">
              <h5 className="card-title">Card with Image</h5>
              <p className="card-text">Some quick example text to build on the card title.</p>
              <a href="#" className="btn btn-primary btn-sm">Go somewhere</a>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Card Title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary btn-sm">Go somewhere</a>
            </div>
            <img className="card-img-bottom" src="/img/undraw_rocket.svg" alt="Card illustration" />
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card bg-dark text-white shadow">
            <img className="card-img" src="/img/undraw_posting_photo.svg" alt="Card image" style={{ opacity: 0.3 }} />
            <div className="card-img-overlay d-flex align-items-center">
              <div>
                <h5 className="card-title">Card Image Overlay</h5>
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Cards */}
      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="card shadow">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Collapsible Card</h6>
            </div>
            <div className="card-body">
              <div className="accordion" id="accordionExample">
                {['First', 'Second', 'Third'].map((item, i) => (
                  <div className="card mb-0 border" key={i}>
                    <div className="card-header" id={`heading${i}`}>
                      <h2 className="mb-0">
                        <button className="btn btn-link" type="button">
                          {item} Collapsible Item
                        </button>
                      </h2>
                    </div>
                    <div className={`collapse${i === 0 ? ' show' : ''}`}>
                      <div className="card-body">
                        This is the {item.toLowerCase()} item's accordion body.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cards
