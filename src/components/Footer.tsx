import React from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Roots & Routes Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/RnR_Logo_192.png" 
                alt="Roots & Routes Heritage Tours" 
                className="h-12 w-12"
              />
              <div>
                <h3 className="text-xl font-bold text-amber-300" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Roots & Routes
                </h3>
                <p className="text-sm text-green-200">Heritage Tours</p>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-amber-300 mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:exec.director@motorcycletourism.ca"
                  className="text-green-200 hover:text-amber-300 transition-colors"
                >
                  exec.director@motorcycletourism.ca
                </a>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-amber-300 mt-0.5 flex-shrink-0" />
                <div className="text-green-200">
                  <p>10908-102 St</p>
                  <p>Grande Prairie AB T8V 2X3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Services Partners */}
          <div>
            <h4 className="text-lg font-bold text-amber-300 mb-4">Travel Services</h4>
            <div className="space-y-3">
              <a 
                href="https://cmtatravelservices.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-200 hover:text-amber-300 transition-colors text-sm"
              >
                <span>CMTA Travel Services</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              
              <a 
                href="https://motorcycletourism.ca" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-200 hover:text-amber-300 transition-colors text-sm"
              >
                <span>CMTA</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              
              <a 
                href="https://cimta.ca" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-200 hover:text-amber-300 transition-colors text-sm"
              >
                <span>CIMTA</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Tourism Partners */}
          <div>
            <h4 className="text-lg font-bold text-amber-300 mb-4">Tourism Partners</h4>
            <div className="space-y-3">
              <a 
                href="https://indigenoustourismalberta.ca/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-200 hover:text-amber-300 transition-colors text-sm"
              >
                <span>Indigenous Tourism Alberta</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              
              <a 
                href="https://indigenoustourism.ca/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-200 hover:text-amber-300 transition-colors text-sm"
              >
                <span>Indigenous Tourism Canada</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              
              <a 
                href="https://gptourism.ca/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-200 hover:text-amber-300 transition-colors text-sm"
              >
                <span>GPRTA</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              
              <a 
                href="https://mightypeace.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-200 hover:text-amber-300 transition-colors text-sm"
              >
                <span>Mighty Peace Tourism</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="text-lg font-bold text-amber-300 mb-4">About</h4>
            <p className="text-green-200 text-sm leading-relaxed mb-4">
              Roots & Routes Heritage Tours is operated by CMTA Travel Services, 
              a nonprofit travel agency dedicated to promoting Alberta's rich cultural heritage.
            </p>
            <p className="text-amber-300 text-sm font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
              "See Alberta Through the Eyes of a Tourist"
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-200 text-sm">
            © 2024 Roots & Routes Heritage Tours. Operated by CMTA Travel Services.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;