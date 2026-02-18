import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Site from './Site';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminRoute from './admin/AdminRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Site />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
