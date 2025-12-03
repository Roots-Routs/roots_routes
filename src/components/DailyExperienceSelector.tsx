import React from 'react';
import { useState } from 'react';
import { Experience, DailyExperiences, Museum } from '../types/tour';
import { experiences, accommodations, museums } from '../data/tourData';
import { useTour } from '../context/TourContext';
import { Clock, MapPin, Utensils, Star, DollarSign, Bed, Wifi, Coffee, Car, Dumbbell, Sun, Moon, Building2 } from 'lucide-react';

interface DailyExperienceSelectorProps {
  dayIndex: number;
  dayExperiences: DailyExperiences;
}

const DailyExperienceSelector: React.FC<DailyExperienceSelectorProps> = ({ dayIndex, dayExperiences }) => {
  const { updateDailyExperience, tourSelection } = useTour();
  const [activeTab, setActiveTab] = useState<string>('all-day');

  const morningAttractions = experiences.filter(exp => exp.type === 'morning' && exp.category === 'attraction' && !exp.isFullDay);
  const afternoonAttractions = experiences.filter(exp => exp.type === 'afternoon' && exp.category === 'attraction' && !exp.isFullDay);
  const fullDayExperiences = experiences.filter(exp => exp.isFullDay);
  const lunchRestaurants = experiences.filter(exp => exp.type === 'lunch' && exp.category === 'restaurant');
  const supperRestaurants = experiences.filter(exp => exp.type === 'evening' && exp.category === 'restaurant');

  const tabs = [
    { id: 'all-day', label: 'All Day', icon: Sun, hasContent: fullDayExperiences.length > 0 },
    { id: 'morning', label: 'Morning', icon: Clock, hasContent: morningAttractions.length > 0 },
    { id: 'lunch', label: 'Lunch', icon: Utensils, hasContent: lunchRestaurants.length > 0 },
    { id: 'afternoon', label: 'Afternoon', icon: MapPin, hasContent: afternoonAttractions.length > 0 },
    { id: 'hotel', label: 'Hotel', icon: Bed, hasContent: dayIndex < (tourSelection.route?.duration || 0) - 1 },
    { id: 'supper', label: 'Supper', icon: Moon, hasContent: supperRestaurants.length > 0 },
    { id: 'museum', label: 'Museum', icon: Building2, hasContent: museums.length > 0 } // ✅ 修改 icon
  ];

  const getTabSelectionCount = (tabId: string) => {
    switch (tabId) {
      case 'all-day':
        return dayExperiences.fullDayExperience ? 1 : 0;
      case 'morning':
        return dayExperiences.morningExperience ? 1 : 0;
      case 'lunch':
        return dayExperiences.lunchRestaurant ? 1 : 0;
      case 'afternoon':
        return dayExperiences.afternoonExperience ? 1 : 0;
      case 'hotel':
        return dayExperiences.accommodation ? 1 : 0;
      case 'supper':
        return dayExperiences.supperRestaurant ? 1 : 0;
      case 'museum':
        return dayExperiences.museum ? 1 : 0; // ✅ 修改判断
      default:
        return 0;
    }
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

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="h-3 w-3" />;
    if (amenity.toLowerCase().includes('breakfast')) return <Coffee className="h-3 w-3" />;
    if (amenity.toLowerCase().includes('parking')) return <Car className="h-3 w-3" />;
    if (amenity.toLowerCase().includes('fitness') || amenity.toLowerCase().includes('gym')) return <Dumbbell className="h-3 w-3" />;
    return <Star className="h-3 w-3" />;
  };

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-amber-200 text-amber-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  const ExperienceCard: React.FC<{ 
    experience: Experience; 
    isSelected: boolean; 
    onSelect: () => void;
    onDeselect: () => void;
  }> = ({ experience, isSelected, onSelect, onDeselect }) => (
    <div
      onClick={isSelected ? onDeselect : onSelect}
      className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 hover:shadow-md ${
        isSelected 
          ? 'border-amber-400 bg-amber-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-green-300'
      }`}
    >
      <div className="mb-3">
        <img
          src={experience.image}
          alt={experience.name}
          className="w-full h-32 object-cover rounded-lg"
        />
      </div>
      
      <div className="flex items-start justify-between mb-2">
        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getThemeColor(experience.theme)}`}>
          {experience.theme.charAt(0).toUpperCase() + experience.theme.slice(1)}
        </span>
        <div className="flex items-center space-x-1 text-green-700 font-bold">
          <DollarSign className="h-4 w-4" />
          <span>${experience.price}</span>
        </div>
      </div>
      
      <h5 className="font-bold text-green-800 mb-2 text-sm leading-tight">
        {experience.name}
      </h5>
      
      <p className="text-gray-600 text-xs leading-relaxed mb-2">
        {experience.description}
      </p>
      
      {experience.isFullDay && (
        <div className="flex items-center space-x-1 text-amber-600 text-xs font-medium">
          <Star className="h-3 w-3" />
          <span>Full Day Experience</span>
        </div>
      )}
    </div>
  );

  // ✅ 添加 Museum Card 组件
  const MuseumCard: React.FC<{ 
    museum: Museum; 
    isSelected: boolean; 
    onSelect: () => void;
    onDeselect: () => void;
  }> = ({ museum, isSelected, onSelect, onDeselect }) => (
    <div
      onClick={isSelected ? onDeselect : onSelect}
      className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 hover:shadow-md ${
        isSelected 
          ? 'border-amber-400 bg-amber-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-green-300'
      }`}
    >
      <div className="mb-3">
        <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
          <Building2 className="h-16 w-16 text-green-600" />
        </div>
      </div>
      
      <div className="flex items-start justify-between mb-2">
        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getThemeColor(museum.theme)}`}>
          {museum.theme.charAt(0).toUpperCase() + museum.theme.slice(1)}
        </span>
      </div>
      
      <h5 className="font-bold text-green-800 mb-2 text-sm leading-tight">
        {museum.name}
      </h5>
      
      <div className="space-y-1 mb-2">
        <div className="flex items-start space-x-2 text-xs text-gray-600">
          <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <span>{museum.streetNumber} {museum.address}, {museum.city}</span>
        </div>
        {museum.phone && (
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <span>📞</span>
            <span>{museum.phone}</span>
          </div>
        )}
        {museum.website && (
          <a
            href={museum.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center space-x-2 text-xs text-blue-600 hover:text-blue-800"
          >
            <span>🌐</span>
            <span className="underline">Visit Website</span>
          </a>
        )}
      </div>
      
      <div className="text-xs text-gray-500 mt-2">
        {museum.postalCode}
      </div>
    </div>
  );

  const AccommodationCard: React.FC<{ 
    accommodation: any; 
    isSelected: boolean; 
    onSelect: () => void;
    onDeselect: () => void;
  }> = ({ accommodation, isSelected, onSelect, onDeselect }) => (
    <div
      onClick={isSelected ? onDeselect : onSelect}
      className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 hover:shadow-md ${
        isSelected 
          ? 'border-amber-400 bg-amber-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-green-300'
      }`}
    >
      <div className="mb-3">
        <img
          src={accommodation.image}
          alt={accommodation.name}
          className="w-full h-32 object-cover rounded-lg"
        />
      </div>
      
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-1">
          {getRatingStars(accommodation.rating)}
          <span className="text-xs text-gray-600 ml-1">({accommodation.rating})</span>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 text-green-700 font-bold">
            <DollarSign className="h-4 w-4" />
            <span>${accommodation.pricePerRoom / 2}</span>
          </div>
          <p className="text-xs text-gray-500">per person</p>
        </div>
      </div>
      
      <h5 className="font-bold text-green-800 mb-2 text-sm leading-tight">
        {accommodation.name}
      </h5>
      
      <p className="text-gray-600 text-xs leading-relaxed mb-2">
        {accommodation.description}
      </p>
      
      <div className="space-y-1">
        <h6 className="text-xs font-semibold text-green-700">Amenities:</h6>
        <div className="grid grid-cols-2 gap-1">
          {accommodation.amenities.slice(0, 4).map((amenity: string, index: number) => (
            <div key={index} className="flex items-center space-x-1 text-xs text-gray-600">
              {getAmenityIcon(amenity)}
              <span className="truncate">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const hasFullDaySelected = !!dayExperiences.fullDayExperience;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'all-day':
        return (
          <div>
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-amber-500" />
                <h4 className="text-lg font-bold text-green-800">Full Day Experience (Optional)</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {fullDayExperiences.map(experience => (
                  <ExperienceCard
                    key={experience.id}
                    experience={experience}
                    isSelected={dayExperiences.fullDayExperience?.id === experience.id}
                    onSelect={() => updateDailyExperience(dayIndex, 'fullDayExperience', experience)}
                    onDeselect={() => updateDailyExperience(dayIndex, 'fullDayExperience', undefined)}
                  />
                ))}
              </div>
              {hasFullDaySelected && (
                <div className="mt-4 p-3 bg-amber-100 border border-amber-300 rounded-lg">
                  <p className="text-amber-800 text-sm font-medium">
                    Full day experience selected. Morning and afternoon attraction slots are not available.
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'morning':
        return (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-amber-500" />
              <h4 className="text-lg font-bold text-green-800">Morning Attraction</h4>
            </div>
            {hasFullDaySelected ? (
              <div className="p-6 bg-amber-100 border border-amber-300 rounded-lg text-center">
                <p className="text-amber-800 font-medium">
                  Morning attractions are not available when a full day experience is selected.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {morningAttractions.map(experience => (
                  <ExperienceCard
                    key={experience.id}
                    experience={experience}
                    isSelected={dayExperiences.morningExperience?.id === experience.id}
                    onSelect={() => updateDailyExperience(dayIndex, 'morningExperience', experience)}
                    onDeselect={() => updateDailyExperience(dayIndex, 'morningExperience', undefined)}
                  />
                ))}
              </div>
            )}
          </div>
        );

      case 'lunch':
        return (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Utensils className="h-5 w-5 text-amber-500" />
              <h4 className="text-lg font-bold text-green-800">Lunch Restaurant</h4>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lunchRestaurants.map(experience => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  isSelected={dayExperiences.lunchRestaurant?.id === experience.id}
                  onSelect={() => updateDailyExperience(dayIndex, 'lunchRestaurant', experience)}
                  onDeselect={() => updateDailyExperience(dayIndex, 'lunchRestaurant', undefined)}
                />
              ))}
            </div>
          </div>
        );

      case 'afternoon':
        return (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-amber-500" />
              <h4 className="text-lg font-bold text-green-800">Afternoon Attraction</h4>
            </div>
            {hasFullDaySelected ? (
              <div className="p-6 bg-amber-100 border border-amber-300 rounded-lg text-center">
                <p className="text-amber-800 font-medium">
                  Afternoon attractions are not available when a full day experience is selected.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {afternoonAttractions.map(experience => (
                  <ExperienceCard
                    key={experience.id}
                    experience={experience}
                    isSelected={dayExperiences.afternoonExperience?.id === experience.id}
                    onSelect={() => updateDailyExperience(dayIndex, 'afternoonExperience', experience)}
                    onDeselect={() => updateDailyExperience(dayIndex, 'afternoonExperience', undefined)}
                  />
                ))}
              </div>
            )}
          </div>
        );

      case 'hotel':
        return (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Bed className="h-5 w-5 text-amber-500" />
              <h4 className="text-lg font-bold text-green-800">
                Night {dayIndex + 1} Accommodation
              </h4>
            </div>
            {dayIndex >= (tourSelection.route?.duration || 0) - 1 ? (
              <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg text-center">
                <p className="text-gray-600 font-medium">
                  No accommodation needed for the final day of your tour.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accommodations.map(accommodation => (
                  <AccommodationCard
                    key={accommodation.id}
                    accommodation={accommodation}
                    isSelected={dayExperiences.accommodation?.id === accommodation.id}
                    onSelect={() => updateDailyExperience(dayIndex, 'accommodation', accommodation as any)}
                    onDeselect={() => updateDailyExperience(dayIndex, 'accommodation', undefined)}
                  />
                ))}
              </div>
            )}
          </div>
        );

      case 'supper':
        return (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Moon className="h-5 w-5 text-amber-500" />
              <h4 className="text-lg font-bold text-green-800">Supper Restaurant</h4>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {supperRestaurants.map(experience => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  isSelected={dayExperiences.supperRestaurant?.id === experience.id}
                  onSelect={() => updateDailyExperience(dayIndex, 'supperRestaurant', experience)}
                  onDeselect={() => updateDailyExperience(dayIndex, 'supperRestaurant', undefined)}
                />
              ))}
            </div>
          </div>
        );

      // ✅ 添加 Museum 标签页内容
      case 'museum':
        return (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-5 w-5 text-amber-500" />
              <h4 className="text-lg font-bold text-green-800">Museums & Cultural Centers</h4>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {museums.map(museum => (
                <MuseumCard
                  key={museum.id}
                  museum={museum}
                  isSelected={dayExperiences.museum?.id === museum.id}
                  onSelect={() => updateDailyExperience(dayIndex, 'museum', museum as any)}
                  onDeselect={() => updateDailyExperience(dayIndex, 'museum', undefined)}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-green-800 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {dayIndex + 1}
        </div>
        <h3 className="text-2xl font-bold text-green-800" style={{ fontFamily: 'Playfair Display, serif' }}>
          Day {dayIndex + 1} - Choose Your Experiences
        </h3>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.filter(tab => tab.hasContent).map((tab) => {
              const IconComponent = tab.icon;
              const selectionCount = getTabSelectionCount(tab.id);
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {selectionCount > 0 && (
                    <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {selectionCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default DailyExperienceSelector;