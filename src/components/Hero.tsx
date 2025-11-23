import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/elk_hero.png)',
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/60" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <img 
            src="/RnR_Logo_192.png" 
            alt="Roots & Routes Heritage Tours" 
            className="h-24 w-24 mx-auto mb-6 drop-shadow-lg"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
          Choose Your Alberta
          <span className="block text-amber-300">Heritage Adventure</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-cream-100 mb-4 font-medium" style={{ color: '#F5F5DC' }}>
          Discover the Stories That Speak to You
        </p>
        
        <p className="text-lg md:text-xl text-cream-200 mb-12 max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5DC' }}>
          Alberta's rich tapestry of cultures awaits your exploration. With Roots & Routes Heritage Tours, 
          you don't just follow a preset itinerary—you choose what roots and history you want to explore 
          along our carefully crafted routes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link 
            to="/tours"
            className="bg-amber-400 hover:bg-amber-300 text-green-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <span>Explore Our Routes</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          
          <Link 
            to="/request"
            className="bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <MapPin className="h-5 w-5" />
            <span>Request Custom Tour</span>
          </Link>
          
          <a 
            href="tel:780-933-0182"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-green-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Phone className="h-5 w-5" />
            <span>Call 780-933-0182</span>
          </a>
        </div>
        
        <div className="text-center">
          <p className="text-amber-300 text-lg font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            "See Alberta Through the Eyes of a Tourist"
          </p>
          <p className="text-cream-200 text-sm">
            Operated by CMTA Travel Services - A Nonprofit Travel Agency
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;