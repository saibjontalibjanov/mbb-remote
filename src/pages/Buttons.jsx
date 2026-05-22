import Layout from '../components/Layout'

function Buttons() {
  return (
    <Layout>
      <h1 className="h3 mb-4 text-gray-800">Buttons</h1>

      {/* Default Buttons */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Default Buttons</h6>
        </div>
        <div className="card-body">
          <button className="btn btn-primary mr-2 mb-2">Primary</button>
          <button className="btn btn-secondary mr-2 mb-2">Secondary</button>
          <button className="btn btn-success mr-2 mb-2">Success</button>
          <button className="btn btn-danger mr-2 mb-2">Danger</button>
          <button className="btn btn-warning mr-2 mb-2">Warning</button>
          <button className="btn btn-info mr-2 mb-2">Info</button>
          <button className="btn btn-light mr-2 mb-2">Light</button>
          <button className="btn btn-dark mr-2 mb-2">Dark</button>
          <button className="btn btn-link mr-2 mb-2">Link</button>
        </div>
      </div>

      {/* Outline Buttons */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Outline Buttons</h6>
        </div>
        <div className="card-body">
          <button className="btn btn-outline-primary mr-2 mb-2">Primary</button>
          <button className="btn btn-outline-secondary mr-2 mb-2">Secondary</button>
          <button className="btn btn-outline-success mr-2 mb-2">Success</button>
          <button className="btn btn-outline-danger mr-2 mb-2">Danger</button>
          <button className="btn btn-outline-warning mr-2 mb-2">Warning</button>
          <button className="btn btn-outline-info mr-2 mb-2">Info</button>
          <button className="btn btn-outline-dark mr-2 mb-2">Dark</button>
        </div>
      </div>

      {/* Size Variants */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Button Sizes</h6>
        </div>
        <div className="card-body">
          <button className="btn btn-primary btn-lg mr-2 mb-2">Large Button</button>
          <button className="btn btn-primary mr-2 mb-2">Default Button</button>
          <button className="btn btn-primary btn-sm mr-2 mb-2">Small Button</button>
        </div>
      </div>

      {/* Block Buttons */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Block Buttons</h6>
        </div>
        <div className="card-body">
          <button className="btn btn-primary btn-block mb-2">Block Level Button</button>
          <button className="btn btn-secondary btn-block mb-2">Block Level Button</button>
        </div>
      </div>

      {/* Buttons with Icons */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Buttons with Icons</h6>
        </div>
        <div className="card-body">
          <button className="btn btn-primary mr-2 mb-2"><i className="fas fa-arrow-right mr-1"></i> Primary</button>
          <button className="btn btn-success mr-2 mb-2"><i className="fas fa-check mr-1"></i> Success</button>
          <button className="btn btn-danger mr-2 mb-2"><i className="fas fa-times mr-1"></i> Danger</button>
          <button className="btn btn-warning mr-2 mb-2"><i className="fas fa-exclamation-triangle mr-1"></i> Warning</button>
          <button className="btn btn-info mr-2 mb-2"><i className="fas fa-info-circle mr-1"></i> Info</button>
        </div>
      </div>

      {/* Disabled Buttons */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Disabled Buttons</h6>
        </div>
        <div className="card-body">
          <button className="btn btn-primary mr-2 mb-2" disabled>Primary Disabled</button>
          <button className="btn btn-secondary mr-2 mb-2" disabled>Secondary Disabled</button>
          <button className="btn btn-success mr-2 mb-2" disabled>Success Disabled</button>
        </div>
      </div>

      {/* Button Groups */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Button Groups</h6>
        </div>
        <div className="card-body">
          <div className="btn-group mr-2" role="group">
            <button type="button" className="btn btn-primary">Left</button>
            <button type="button" className="btn btn-primary">Middle</button>
            <button type="button" className="btn btn-primary">Right</button>
          </div>
          <div className="btn-group mr-2" role="group">
            <button type="button" className="btn btn-secondary">1</button>
            <button type="button" className="btn btn-secondary">2</button>
            <button type="button" className="btn btn-secondary">3</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Buttons
