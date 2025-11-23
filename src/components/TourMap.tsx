import React from 'react';
import { MapPin } from 'lucide-react';

interface TourMapProps {
  mapUrl?: string;
  title?: string;
  description?: string;
}

const TourMap: React.FC<TourMapProps> = ({ 
  mapUrl = "https://www.google.com/maps/d/embed?mid=1VUnGv8sRRVEVPAYTitBwKh68jjUyimo&ehbc=2E312F",
  title = "Your Tour Route",
  description = "Interactive map showing all locations on your heritage tour"
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-green-800 text-white p-6">
        <div className="flex items-center space-x-3">
          <MapPin className="h-6 w-6 text-amber-400" />
          <div>
            <h3 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              {title}
            </h3>
            <p className="text-green-100 text-sm mt-1">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src={mapUrl}
          className="absolute top-0 left-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
      <div className="p-4 bg-gray-50 text-center text-sm text-gray-600">
        <p>Click markers to see details about each location</p>
      </div>
    </div>
  );
};

export default TourMap;