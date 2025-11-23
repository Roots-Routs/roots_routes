import React, { useState } from 'react';
import { useHeritageThemes, fallbackHeritageThemes } from '../data/tourData';
import { useTour } from '../context/TourContext';
import { Check } from 'lucide-react';

const HeritageThemes: React.FC = () => {
  const { tourSelection, updateThemes } = useTour();
  const { heritageThemes, loading, error } = useHeritageThemes();
  const [selectedThemes, setSelectedThemes] = useState<string[]>(
    tourSelection.themes.map(theme => theme.id)
  );

  const handleThemeToggle = (themeId: string) => {
    const newSelectedThemes = selectedThemes.includes(themeId)
      ? selectedThemes.filter(id => id !== themeId)
      : [...selectedThemes, themeId];
    
    setSelectedThemes(newSelectedThemes);
    
    const selectedThemeObjects = heritageThemes.filter(theme => 
      newSelectedThemes.includes(theme.id)
    );
    updateThemes(selectedThemeObjects);
  };
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-cream-50 to-white" style={{ backgroundColor: '#F5F5DC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading heritage themes...</p>
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    console.warn('Using fallback data due to:', error);
  }
  return (
    <section className="py-20 bg-gradient-to-b from-cream-50 to-white" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Your Heritage, Your Choice
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Select the cultural stories and heritage themes that resonate with your interests. 
            Each theme offers unique experiences and perspectives on Alberta's rich history.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {heritageThemes.map((theme) => {
            const isSelected = selectedThemes.includes(theme.id);
            
            return (
              <div
                key={theme.id}
                onClick={() => handleThemeToggle(theme.id)}
                className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 ${
                  isSelected 
                    ? 'border-amber-400 ring-4 ring-amber-200' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-amber-400 rounded-full p-2 shadow-lg">
                    <Check className="h-4 w-4 text-green-900" />
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-6xl mb-4 text-center">{theme.icon}</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-4 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {theme.name}
                  </h3>
                  <p className="text-gray-600 mb-6 text-center leading-relaxed">
                    {theme.description}
                  </p>
                  
                  <div className="space-y-2">
                    {theme.experiences.map((experience, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-600 leading-relaxed">{experience}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedThemes.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-green-100 border border-green-300 rounded-lg p-6 max-w-2xl mx-auto">
              <h4 className="text-lg font-bold text-green-800 mb-2">
                Selected Heritage Themes ({selectedThemes.length})
              </h4>
              <p className="text-green-700">
                {heritageThemes
                  .filter(theme => selectedThemes.includes(theme.id))
                  .map(theme => theme.name)
                  .join(', ')}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeritageThemes;