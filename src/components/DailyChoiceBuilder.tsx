import React, { useState, useEffect } from 'react';
import { experiences } from '../data/tourData';
import { useTour } from '../context/TourContext';
import { Experience } from '../types/tour';
import { Clock, DollarSign, Check } from 'lucide-react';

const DailyChoiceBuilder: React.FC = () => {
  const { tourSelection, updateExperiences, getTotalPrice, getCoordinatedPrice, getSavings } = useTour();
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(
    tourSelection.experiences.map(exp => exp.id)
  );

  const morningExperiences = experiences.filter(exp => exp.type === 'morning');
  const afternoonExperiences = experiences.filter(exp => exp.type === 'afternoon');
  const eveningExperiences = experiences.filter(exp => exp.type === 'evening');

  const handleExperienceToggle = (experienceId: string) => {
    const newSelected = selectedExperiences.includes(experienceId)
      ? selectedExperiences.filter(id => id !== experienceId)
      : [...selectedExperiences, experienceId];
    
    setSelectedExperiences(newSelected);
    
    const selectedExperienceObjects = experiences.filter(exp => 
      newSelected.includes(exp.id)
    );
    updateExperiences(selectedExperienceObjects);
  };

  const getThemeColor = (theme: string) => {
    const colors = {
      indigenous: 'bg-red-100 text-red-800 border-red-200',
      western: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      european: 'bg-blue-100 text-blue-800 border-blue-200',
      frontier: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[theme as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const ExperienceCard: React.FC<{ experience: Experience; timeOfDay: string }> = ({ experience, timeOfDay }) => {
    const isSelected = selectedExperiences.includes(experience.id);
    
    return (
      <div
        onClick={() => handleExperienceToggle(experience.id)}
        className={`relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${
          isSelected 
            ? 'border-amber-400 ring-2 ring-amber-200' 
            : 'border-gray-200 hover:border-green-300'
        }`}
      >
        {isSelected && (
          <div className="absolute -top-2 -right-2 bg-amber-400 rounded-full p-1 shadow-lg">
            <Check className="h-4 w-4 text-green-900" />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getThemeColor(experience.theme)}`}>
              {experience.theme.charAt(0).toUpperCase() + experience.theme.slice(1)}
            </span>
            <div className="flex items-center space-x-1 text-green-700 font-bold">
              <DollarSign className="h-4 w-4" />
              <span>${experience.price}</span>
            </div>
          </div>
          
          <h4 className="text-lg font-bold text-green-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {experience.name}
          </h4>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {experience.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream-50" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Sample Daily Heritage Menu
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Choose your morning heritage experience, afternoon cultural immersion, 
            and evening heritage dining. Mix and match to create your perfect day.
          </p>
        </div>

        {/* Morning Experiences */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="h-6 w-6 text-amber-500" />
            <h3 className="text-2xl font-bold text-green-800" style={{ fontFamily: 'Playfair Display, serif' }}>
              Choose Your Morning Heritage Experience
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {morningExperiences.map(experience => (
              <ExperienceCard key={experience.id} experience={experience} timeOfDay="morning" />
            ))}
          </div>
        </div>

        {/* Afternoon Experiences */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="h-6 w-6 text-amber-500" />
            <h3 className="text-2xl font-bold text-green-800" style={{ fontFamily: 'Playfair Display, serif' }}>
              Choose Your Afternoon Cultural Immersion
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {afternoonExperiences.map(experience => (
              <ExperienceCard key={experience.id} experience={experience} timeOfDay="afternoon" />
            ))}
          </div>
        </div>

        {/* Evening Experiences */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="h-6 w-6 text-amber-500" />
            <h3 className="text-2xl font-bold text-green-800" style={{ fontFamily: 'Playfair Display, serif' }}>
              Choose Your Evening Heritage Dining
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eveningExperiences.map(experience => (
              <ExperienceCard key={experience.id} experience={experience} timeOfDay="evening" />
            ))}
          </div>
        </div>

        {/* Pricing Calculator */}
        {selectedExperiences.length > 0 && (
          <div className="bg-green-800 text-white rounded-xl p-8 shadow-xl">
            <h4 className="text-2xl font-bold mb-6 text-center text-amber-300" style={{ fontFamily: 'Playfair Display, serif' }}>
              Real-time Pricing Calculator
            </h4>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-green-700 rounded-lg p-6">
                <h5 className="text-lg font-bold text-amber-300 mb-2">Retail Total</h5>
                <p className="text-3xl font-bold">${getTotalPrice()}</p>
                <p className="text-sm text-green-200">per person</p>
              </div>
              
              <div className="bg-amber-400 text-green-900 rounded-lg p-6">
                <h5 className="text-lg font-bold mb-2">Coordinated Price</h5>
                <p className="text-3xl font-bold">${getCoordinatedPrice()}</p>
                <p className="text-sm">per person</p>
              </div>
              
              <div className="bg-green-700 rounded-lg p-6">
                <h5 className="text-lg font-bold text-amber-300 mb-2">Roots & Routes Savings</h5>
                <p className="text-3xl font-bold text-amber-300">${getSavings()}</p>
                <p className="text-sm text-green-200">+ full coordination</p>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-amber-300 font-semibold">
                Selected Experiences: {selectedExperiences.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyChoiceBuilder;