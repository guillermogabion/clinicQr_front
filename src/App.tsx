import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layout/MainLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import PatientsPage from './pages/patients/PatientsPage';
import PatientDetailPage from './pages/patients/PatientDetailPage';
import NewPatientPage from './pages/patients/NewPatientPage';
import UsersPage from './pages/users/UsersPage';
import ResultsPage from './pages/results/ResultsPage';
import ResultDetailPage from './pages/results/ResultDetailPage';
import NewResultPage from './pages/results/NewResultPage';
import PrescriptionsPage from './pages/prescriptions/PrescriptionsPage';
import PrescriptionDetailPage from './pages/prescriptions/PrescriptionDetailPage';
import NewPrescriptionPage from './pages/prescriptions/NewPrescriptionPage';
import ScanPage from './pages/qr/ScanPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center h-screen text-slate-500">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/scan/:token" element={<ScanPage />} />

      {/* Protected */}
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="patients/new" element={<NewPatientPage />} />
        <Route path="patients/:id" element={<PatientDetailPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="results/new" element={<NewResultPage />} />
        <Route path="results/:id" element={<ResultDetailPage />} />
        <Route path="prescriptions" element={<PrescriptionsPage />} />
        <Route path="prescriptions/new" element={<NewPrescriptionPage />} />
        <Route path="prescriptions/:id" element={<PrescriptionDetailPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
