import { useState } from 'react'
import Layout from '../components/Layout'

const tableData = [
  { name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', age: 61, startDate: '2011/04/25', salary: '$320,800' },
  { name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', age: 63, startDate: '2011/07/25', salary: '$170,750' },
  { name: 'Ashton Cox', position: 'Junior Technical Author', office: 'San Francisco', age: 66, startDate: '2009/01/12', salary: '$86,000' },
  { name: 'Cedric Kelly', position: 'Senior Javascript Developer', office: 'Edinburgh', age: 22, startDate: '2012/03/29', salary: '$433,060' },
  { name: 'Airi Satou', position: 'Accountant', office: 'Tokyo', age: 33, startDate: '2008/11/28', salary: '$162,700' },
  { name: 'Brielle Williamson', position: 'Integration Specialist', office: 'New York', age: 61, startDate: '2012/12/02', salary: '$372,000' },
  { name: 'Herrod Chandler', position: 'Sales Assistant', office: 'San Francisco', age: 59, startDate: '2012/08/06', salary: '$137,500' },
  { name: 'Rhona Davidson', position: 'Integration Specialist', office: 'Tokyo', age: 55, startDate: '2010/10/14', salary: '$327,900' },
  { name: 'Colleen Hurst', position: 'Javascript Developer', office: 'San Francisco', age: 39, startDate: '2009/09/15', salary: '$205,500' },
  { name: 'Sonya Frost', position: 'Software Engineer', office: 'Edinburgh', age: 23, startDate: '2008/12/13', salary: '$103,600' },
  { name: 'Jena Gaines', position: 'Office Manager', office: 'London', age: 30, startDate: '2008/12/19', salary: '$90,560' },
  { name: 'Quinn Flynn', position: 'Support Lead', office: 'Edinburgh', age: 22, startDate: '2013/03/03', salary: '$342,000' },
  { name: 'Charde Marshall', position: 'Regional Director', office: 'San Francisco', age: 36, startDate: '2008/10/16', salary: '$470,600' },
  { name: 'Haley Kennedy', position: 'Senior Marketing Designer', office: 'London', age: 43, startDate: '2012/12/18', salary: '$313,500' },
  { name: 'Tatyana Fitzpatrick', position: 'Regional Director', office: 'London', age: 19, startDate: '2010/03/17', salary: '$385,750' },
  { name: 'Michael Silva', position: 'Marketing Designer', office: 'London', age: 66, startDate: '2012/11/27', salary: '$198,500' },
  { name: 'Paul Byrd', position: 'Chief Financial Officer (CFO)', office: 'New York', age: 64, startDate: '2010/06/09', salary: '$725,000' },
  { name: 'Gloria Little', position: 'Systems Administrator', office: 'New York', age: 59, startDate: '2009/04/10', salary: '$237,500' },
  { name: 'Bradley Greer', position: 'Software Engineer', office: 'London', age: 41, startDate: '2012/10/13', salary: '$132,000' },
  { name: 'Dai Rios', position: 'Personnel Lead', office: 'Edinburgh', age: 35, startDate: '2012/09/26', salary: '$217,500' },
]

function Tables() {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)
  const perPage = 10

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const filtered = tableData.filter(row =>
    Object.values(row).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  )

  const sorted = [...filtered].sort((a, b) => {
    const av = String(a[sortKey]).toLowerCase()
    const bv = String(b[sortKey]).toLowerCase()
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  const totalPages = Math.ceil(sorted.length / perPage)
  const paginated = sorted.slice((page - 1) * perPage, page * perPage)

  const SortIcon = ({ k }) => (
    <i className={`fas fa-sort${sortKey === k ? (sortDir === 'asc' ? '-up' : '-down') : ''} ml-1`}
      style={{ fontSize: '0.7rem', opacity: sortKey === k ? 1 : 0.3 }}></i>
  )

  return (
    <Layout>
      <h1 className="h3 mb-2 text-gray-800">Tables</h1>
      <p className="mb-4">
        A React-powered data table with search, sort, and pagination — based on the original DataTables example.
      </p>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
        </div>
        <div className="card-body">
          {/* Search */}
          <div className="row mb-3">
            <div className="col-sm-6 ml-auto">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                />
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fas fa-search"></i></span>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  {['name', 'position', 'office', 'age', 'startDate', 'salary'].map(k => (
                    <th key={k} style={{ cursor: 'pointer' }} onClick={() => handleSort(k)}>
                      {k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1')}
                      <SortIcon k={k} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length > 0 ? paginated.map((row, i) => (
                  <tr key={i}>
                    <td>{row.name}</td>
                    <td>{row.position}</td>
                    <td>{row.office}</td>
                    <td>{row.age}</td>
                    <td>{row.startDate}</td>
                    <td>{row.salary}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="text-center">No results found</td></tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  {['Name', 'Position', 'Office', 'Age', 'Start Date', 'Salary'].map(h => <th key={h}>{h}</th>)}
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Pagination */}
          <div className="row mt-3">
            <div className="col-sm-5">
              <span className="text-muted small">
                Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length} entries
              </span>
            </div>
            <div className="col-sm-7">
              <nav className="float-right">
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item${page === 1 ? ' disabled' : ''}`}>
                    <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <li key={p} className={`page-item${p === page ? ' active' : ''}`}>
                      <button className="page-link" onClick={() => setPage(p)}>{p}</button>
                    </li>
                  ))}
                  <li className={`page-item${page === totalPages ? ' disabled' : ''}`}>
                    <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Tables
