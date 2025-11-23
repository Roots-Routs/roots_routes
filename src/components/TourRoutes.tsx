import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTourRoutes, fallbackTourRoutes } from '../data/tourData';
import { useTour } from '../context/TourContext';
import { Calendar, MapPin, Star, ArrowRight, ChevronLeft } from 'lucide-react';

const TourRoutes: React.FC = () => {
  const { updateRoute } = useTour();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { tourRoutes, loading, error } = useTourRoutes();

  const routesByDuration = {
    3: tourRoutes.filter(route => route.duration === 3),
    5: tourRoutes.filter(route => route.duration === 5),
    7: tourRoutes.filter(route => route.duration === 7),
    10: tourRoutes.filter(route => route.duration === 10)
  };

  const categoryCards = [
    {
      duration: 3,
      title: "3-Day Express Tours",
      subtitle: "Weekend Heritage Getaways",
      description: "Perfect for quick escapes and taste of Alberta's heritage",
      image: "/threedaycard.png",
      color: "from-green-600 to-green-700"
    },
    {
      duration: 5,
      title: "5-Day Heritage Tours", 
      subtitle: "Immersive Cultural Journeys",
      description: "Deep dive into specific heritage themes and regions",
      image: "/fivedaycardpng.png",
      color: "from-amber-500 to-amber-600"
    },
    {
      duration: 7,
      title: "7-Day Heritage Tours",
      subtitle: "Comprehensive Adventures", 
      description: "Complete exploration of Alberta's diverse cultural landscape",
      image: "/sevenday_card.png",
      color: "from-green-700 to-green-800"
    },
    {
      duration: 10,
      title: "10-Day Ultimate Tours",
      subtitle: "The Complete Experience",
      description: "Ultimate Alberta heritage adventure with everything included",
      image: "/tenday_card.png", 
      color: "from-amber-600 to-amber-700"
    }
  ];

  const handleRouteSelect = (route: any) => {
    updateRoute(route);
  };

  const handleCategorySelect = (duration: number) => {
    setSelectedCategory(duration);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-800 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading tour routes...</p>
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    console.warn('Using fallback tour routes data due to:', error);
  }

  if (selectedCategory) {
    const routes = routesByDuration[selectedCategory as keyof typeof routesByDuration];
    const categoryInfo = categoryCards.find(cat => cat.duration === selectedCategory);
    
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={handleBackToCategories}
              className="flex items-center space-x-2 text-green-700 hover:text-green-600 font-medium transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back to Tour Categories</span>
            </button>
          </div>

          {/* Category Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {categoryInfo?.title}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {categoryInfo?.description}
            </p>
            {error && (
              <div className="mt-4 inline-block bg-amber-100 border border-amber-400 text-amber-700 px-4 py-2 rounded">
                ℹ️ Displaying offline tour data
              </div>
            )}
          </div>

          {/* Specific Tours in Category */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {routes.map((route) => (
              <div
                key={route.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-amber-300 transform hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-80 object-contain bg-gray-50"
                  />
                  {route.featured && (
                    <div className="absolute top-4 left-4 bg-amber-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>Featured</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-green-800 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{route.duration} Days</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-green-800 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {route.name}
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {route.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-green-700">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">Alberta Heritage Route</span>
                    </div>
                    
                    <Link
                      to="/request"
                      onClick={() => handleRouteSelect(route)}
                      className="bg-amber-400 hover:bg-amber-300 text-green-900 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 flex items-center space-x-1"
                    >
                      <span>Select Route</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Choose Your Heritage Adventure
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            From quick weekend getaways to comprehensive heritage journeys, 
            select the perfect duration for your Alberta adventure.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {categoryCards.map((category) => (
            <div
              key={category.duration}
              onClick={() => handleCategorySelect(category.duration)}
              className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105 border border-gray-200 hover:border-amber-300"
            >
              <div className="relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-auto object-contain"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-800 text-white rounded-full px-4 py-2 inline-flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-bold">{category.duration} Days</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {routesByDuration[category.duration as keyof typeof routesByDuration].length} Routes Available
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-green-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {category.title}
                </h3>
                
                <p className="text-lg font-semibold text-amber-600 mb-3">
                  {category.subtitle}
                </p>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex justify-end">
                  <div className="bg-amber-400 hover:bg-amber-300 text-green-900 px-6 py-3 rounded-lg font-bold flex items-center space-x-2 transition-colors">
                    <span>Explore Routes</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TourRoutes;