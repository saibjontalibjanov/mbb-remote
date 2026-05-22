import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Charts from './pages/Charts'
import Tables from './pages/Tables'
import Blank from './pages/Blank'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/charts" element={<Charts />} />
      <Route path="/tables" element={<Tables />} />
      <Route path="/blank" element={<Blank />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
