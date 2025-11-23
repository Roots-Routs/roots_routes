import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-lg border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/RnR_Logo_192.png" 
              alt="Roots & Routes Heritage Tours" 
              className="h-16 w-16"
            />
            <div>
              <h1 className="text-2xl font-bold text-green-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                Roots & Routes
              </h1>
              <p className="text-sm text-green-600 font-medium">Heritage Tours</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-green-800 border-b-2 border-amber-400' 
                  : 'text-gray-700 hover:text-green-800'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/tours" 
              className={`font-medium transition-colors ${
                location.pathname === '/tours' 
                  ? 'text-green-800 border-b-2 border-amber-400' 
                  : 'text-gray-700 hover:text-green-800'
              }`}
            >
              Tours
            </Link>
            <Link 
              to="/admin" 
              className={`font-medium transition-colors ${
                location.pathname === '/admin' 
                  ? 'text-green-800 border-b-2 border-amber-400' 
                  : 'text-gray-700 hover:text-green-800'
              }`}
            >
              Admin
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <a 
              href="tel:780-933-0182" 
              className="flex items-center space-x-2 text-green-800 hover:text-green-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">780-933-0182</span>
            </a>
            <a 
              href="mailto:exec.director@motorcycletourism.ca" 
              className="flex items-center space-x-2 text-green-800 hover:text-green-600 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden lg:inline font-medium">Contact</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;