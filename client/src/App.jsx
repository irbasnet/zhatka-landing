import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FeedbackPage from './pages/FeedbackPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
    </Routes>
  );
}
