import React from 'react';
import TourRoutes from '../components/TourRoutes';

const ToursPage: React.FC = () => {
  return (
    <div className="pt-20">
      <div className="bg-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Alberta Heritage Tours
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our carefully crafted routes and choose the heritage experiences that speak to your heart
          </p>
        </div>
      </div>
      
      <TourRoutes />
    </div>
  );
};

export default ToursPage;