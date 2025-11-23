
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TourProvider } from './context/TourContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import RequestForm from './components/RequestForm';
import ConfirmationPage from './components/ConfirmationPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <TourProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tours" element={<ToursPage />} />
                <Route path="/request" element={<RequestForm />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </TourProvider>
    </AuthProvider>
  );
}

export default App;