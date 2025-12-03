import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTour } from '../context/TourContext';
import { Send, User, Mail, Phone, Users, Calendar, Utensils, Accessibility, Heart, MapPin, Bus } from 'lucide-react';
import DailyExperienceSelector from './DailyExperienceSelector';
import TourMap from './TourMap';
import { sendEmail } from '../lib/resend';

const RequestForm: React.FC = () => {
  const navigate = useNavigate();
  const { tourSelection, updateCustomerInfo, getTotalPrice, getCoordinatedPrice, getSavings } = useTour();
  const [formData, setFormData] = useState(tourSelection.customerInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    updateCustomerInfo(updatedData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formattedRequest = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      groupSize: formData.groupSize,
      preferredDates: formData.preferredDates,
      specialDietary: formData.dietaryRequirements,
      accessibilityNeeds: formData.accessibilityNeeds,
      heritageInterest: formData.heritageBackground,
      tourSummary: {
        route: tourSelection.route?.name,
        duration: `${tourSelection.route?.duration} days`,
        totalExperiences: getTotalExperiencesCount(),
        selectedExperiences: tourSelection.dailyExperiences
      },
      totalCoordinatedPrice: getCoordinatedPrice()
    };

    console.log('Formatted Request Payload:', formattedRequest);

    const dailyItinerary = formattedRequest.tourSummary.selectedExperiences
      .map((day: any, index: number) => {
        const dayNumber = index + 1;
        const activities = [];
        
        if (day.fullDayExperience) activities.push(`<li><strong>Full Day:</strong> ${day.fullDayExperience.name} ($${day.fullDayExperience.price})</li>`);
        if (day.morningExperience) activities.push(`<li><strong>Morning:</strong> ${day.morningExperience.name} ($${day.morningExperience.price})</li>`);
        if (day.lunchRestaurant) activities.push(`<li><strong>Lunch:</strong> ${day.lunchRestaurant.name} ($${day.lunchRestaurant.price})</li>`);
        if (day.afternoonExperience) activities.push(`<li><strong>Afternoon:</strong> ${day.afternoonExperience.name} ($${day.afternoonExperience.price})</li>`);
        if (day.supperRestaurant) activities.push(`<li><strong>Supper:</strong> ${day.supperRestaurant.name} ($${day.supperRestaurant.price})</li>`);
        if (day.accommodation) activities.push(`<li><strong>Accommodation:</strong> ${day.accommodation.name} ($${day.accommodation.pricePerRoom / 2} per person)</li>`);

        if (activities.length === 0) return null;

        return `
          <div style="margin-bottom: 15px;">
            <h3 style="color: #b45309; margin-bottom: 5px;">Day ${dayNumber}</h3>
            <ul style="margin-top: 0; padding-left: 20px;">
              ${activities.join('')}
            </ul>
          </div>
        `;
      })
      .filter(Boolean)
      .join('');

    const emailBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #166534; border-bottom: 2px solid #166534; padding-bottom: 10px;">New Tour Request Submission</h1>
        
        <h2 style="color: #166534; margin-top: 20px;">Customer Information</h2>
        <p><strong>Name:</strong> ${formattedRequest.customerName}</p>
        <p><strong>Email:</strong> ${formattedRequest.customerEmail}</p>
        <p><strong>Phone:</strong> ${formattedRequest.customerPhone}</p>
        <p><strong>Group Size:</strong> ${formattedRequest.groupSize}</p>
        <p><strong>Preferred Dates:</strong> ${formattedRequest.preferredDates}</p>

        <h2 style="color: #166534; margin-top: 20px;">Special Requirements</h2>
        <p><strong>Dietary:</strong> ${formattedRequest.specialDietary || 'None'}</p>
        <p><strong>Accessibility:</strong> ${formattedRequest.accessibilityNeeds || 'None'}</p>
        <p><strong>Heritage Interest:</strong> ${formattedRequest.heritageInterest || 'None'}</p>

        <h2 style="color: #166534; margin-top: 20px;">Tour Summary</h2>
        <p><strong>Route:</strong> ${formattedRequest.tourSummary.route}</p>
        <p><strong>Duration:</strong> ${formattedRequest.tourSummary.duration}</p>
        <p><strong>Total Experiences:</strong> ${formattedRequest.tourSummary.totalExperiences}</p>

        <h2 style="color: #166534; margin-top: 20px;">Daily Itinerary</h2>
        ${dailyItinerary}

        <h2 style="color: #166534; margin-top: 20px;">Pricing</h2>
        <p style="font-size: 1.2em;"><strong>Total Coordinated Price:</strong> $${formattedRequest.totalCoordinatedPrice}</p>
      </div>
    `;

    console.log('Email Body (TXT):', emailBody);

    try {
      // Send to admin email
      await sendEmail('frankieliu97@gmail.com', 'New Tour Request Submission', emailBody);
      
      alert('Request submitted successfully! We will contact you shortly.');
      navigate('/confirmation');
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('There was an error submitting your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.groupSize > 0;

  const getTotalExperiencesCount = () => {
    return tourSelection.dailyExperiences.reduce((total, day) => {
      let count = 0;
      if (day.morningExperience) count++;
      if (day.afternoonExperience) count++;
      if (day.lunchRestaurant) count++;
      if (day.supperRestaurant) count++;
      if (day.fullDayExperience) count++;
      if (day.accommodation) count++;
      return total + count;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white py-12" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Submit Your Custom Heritage Tour Request
          </h1>
          <p className="text-xl text-gray-700">
            Build your daily itinerary and provide your details for complete coordination
          </p>
        </div>

        {/* Route Selection Required Message */}
        {!tourSelection.route && (
          <div className="bg-amber-100 border border-amber-400 rounded-lg p-6 mb-8 text-center">
            <MapPin className="h-8 w-8 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-amber-800 mb-2">Please Select a Tour Route First</h3>
            <p className="text-amber-700">
              You need to choose a tour route before you can customize your daily experiences.
            </p>
            <button
              onClick={() => navigate('/tours')}
              className="mt-4 bg-amber-500 hover:bg-amber-400 text-white px-6 py-2 rounded-lg font-bold transition-colors"
            >
              Choose Tour Route
            </button>
          </div>
        )}

        {/* Customer Information Form - Moved to Top */}
        {tourSelection.route && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                CUSTOMER INFORMATION
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="(780) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Users className="h-4 w-4" />
                      <span>Group Size *</span>
                    </label>
                    <select
                      name="groupSize"
                      value={formData.groupSize}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    >
                      <option value={1}>Solo Traveler</option>
                      <option value={2}>Couple</option>
                      <option value={3}>3 People</option>
                      <option value={4}>4 People</option>
                      <option value={5}>5-8 People</option>
                      <option value={9}>9-15 People</option>
                      <option value={16}>16-20 People</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <Bus className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-amber-800 mb-3">Transportation Options</h4>
                      
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="wantsBusTransportation"
                          checked={formData.wantsBusTransportation}
                          onChange={(e) => handleInputChange({
                            target: { name: 'wantsBusTransportation', value: e.target.checked }
                          } as any)}
                          className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            We require coordinated bus transportation
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            Bus transportation is an additional cost over and above the per-person price and is based on the number of travelers and route distance.
                          </p>
                        </div>
                      </label>
                      
                      {!formData.wantsBusTransportation && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-700">
                            <strong>Self-Drive Groups:</strong> Perfect for car clubs, motorcycle groups, or travelers who prefer their own transportation. We'll coordinate meeting points and provide detailed route information.
                          </p>
                        </div>
                      )}
                      
                      {formData.wantsBusTransportation && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-700">
                            <strong>Bus Transportation:</strong> We'll arrange comfortable coach transportation with professional drivers. Cost varies by group size, route distance, and duration.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Preferred Dates</span>
                  </label>
                  <input
                    type="text"
                    name="preferredDates"
                    value={formData.preferredDates}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="e.g., June 15-20, 2024 or Summer 2024"
                  />
                  <p className="text-sm text-gray-500 mt-1">We'll confirm availability for your preferred dates</p>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Utensils className="h-4 w-4" />
                    <span>Special Dietary Requirements</span>
                  </label>
                  <textarea
                    name="dietaryRequirements"
                    value={formData.dietaryRequirements}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Any allergies, dietary restrictions, or preferences..."
                  />
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Accessibility className="h-4 w-4" />
                    <span>Accessibility Needs</span>
                  </label>
                  <textarea
                    name="accessibilityNeeds"
                    value={formData.accessibilityNeeds}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Any mobility, hearing, vision, or other accessibility requirements..."
                  />
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Heart className="h-4 w-4" />
                    <span>Heritage Interests & Family Background (Optional)</span>
                  </label>
                  <textarea
                    name="heritageBackground"
                    value={formData.heritageBackground}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Tell us about your family heritage or specific cultural interests..."
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Daily Experience Selection */}
        {tourSelection.route && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Customize Your {tourSelection.route.name}
              </h2>
              <p className="text-lg text-gray-700">
                Select your preferred attractions and restaurants for each day of your {tourSelection.route.duration}-day tour
              </p>
            </div>

            {/* Dashboard Layout */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-4 min-h-[600px]">
                {/* Left Panel - Day Navigation */}
                <div className="lg:col-span-1 bg-green-800 text-white p-6">
                  <h3 className="text-xl font-bold mb-6 text-amber-300" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Select Day
                  </h3>
                  <div className="space-y-2">
                    {Array.from({ length: tourSelection.route.duration }, (_, index) => {
                      const dayExperiences = tourSelection.dailyExperiences[index] || {};
                      const hasSelections = dayExperiences.morningExperience || dayExperiences.afternoonExperience || 
                                          dayExperiences.fullDayExperience || dayExperiences.lunchRestaurant || 
                                          dayExperiences.supperRestaurant || dayExperiences.accommodation;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedDayIndex(index)}
                          className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                            selectedDayIndex === index
                              ? 'bg-amber-400 text-green-900 font-bold'
                              : 'bg-green-700 hover:bg-green-600 text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-lg">Day {index + 1}</span>
                            {hasSelections && (
                              <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                            )}
                          </div>
                          {hasSelections && (
                            <div className="text-xs mt-1 opacity-75">
                              {Object.values(dayExperiences).filter(Boolean).length} selections
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="mt-8 p-4 bg-green-700 rounded-lg">
                    <h4 className="font-bold text-amber-300 mb-2">Progress</h4>
                    <p className="text-sm text-green-200">
                      {getTotalExperiencesCount()} total selections made
                    </p>
                  </div>
                </div>

                {/* Right Panel - Daily Content */}
                <div className="lg:col-span-3 p-6">
                  <DailyExperienceSelector
                    key={selectedDayIndex}
                    dayIndex={selectedDayIndex}
                    dayExperiences={tourSelection.dailyExperiences[selectedDayIndex] || {}}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {
          tourSelection.route && (
            <div className="max-w-6xl mx-auto mb-12">
              <TourMap
                mapUrl="https://www.google.com/maps/d/embed?mid=1VUnGv8sRRVEVPAYTitBwKh68jjUyimo&ehbc=2E312F"
                title={`${tourSelection.route.name} Route Map`}
                description={`Explore all the locations included in your ${tourSelection.route.duration}-day heritage tour`}
              />
            </div>
          )
        }

        {/* Tour Summary Section */}
        {tourSelection.route && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                TOUR SUMMARY
              </h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-bold text-green-700 mb-2">Selected Route:</h3>
                  <p className="text-gray-800">{tourSelection.route.name} ({tourSelection.route.duration} days)</p>
                  <p className="text-sm text-gray-600 mt-1">{tourSelection.route.description}</p>
                </div>
                
                {tourSelection.themes.length > 0 && (
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-bold text-green-700 mb-2">Heritage themes chosen:</h3>
                    <p className="text-gray-800">
                      {tourSelection.themes.map(theme => theme.name).join(', ')}
                    </p>
                  </div>
                )}
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-bold text-green-700 mb-2">Selected experiences:</h3>
                  <p className="text-gray-800">{getTotalExperiencesCount()} activities and meals selected</p>
                  
                  {tourSelection.dailyExperiences.map((day, index) => {
                    const hasSelections = day.morningExperience || day.afternoonExperience || day.fullDayExperience || day.lunchRestaurant || day.supperRestaurant || day.accommodation;
                    if (!hasSelections) return null;
                    
                    return (
                      <div key={index} className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Day {index + 1}:</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          {day.fullDayExperience && (
                            <div>• Full Day: {day.fullDayExperience.name} (${day.fullDayExperience.price})</div>
                          )}
                          {!day.fullDayExperience && (
                            <>
                              {day.morningExperience && (
                                <div>• Morning: {day.morningExperience.name} (${day.morningExperience.price})</div>
                              )}
                              {day.afternoonExperience && (
                                <div>• Afternoon: {day.afternoonExperience.name} (${day.afternoonExperience.price})</div>
                              )}
                            </>
                          )}
                          {day.lunchRestaurant && (
                            <div>• Lunch: {day.lunchRestaurant.name} (${day.lunchRestaurant.price})</div>
                          )}
                          {day.supperRestaurant && (
                            <div>• Supper: {day.supperRestaurant.name} (${day.supperRestaurant.price})</div>
                          )}
                          {day.accommodation && (
                            <div>• Night {index + 1}: {day.accommodation.name} (${day.accommodation.pricePerRoom / 2} per person)</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Estimated retail total:</span>
                    <span className="font-bold text-gray-800">${getTotalPrice()} per person</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-green-700">Roots & Routes savings:</span>
                    <span className="font-bold text-green-600">-${getSavings()} per person</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-amber-700">Concierge service fee (15%):</span>
                    <span className="font-bold text-amber-700">+${getCoordinatedPrice() - getTotalPrice() + getSavings()} per person</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-green-200 pt-2">
                    <span className="font-bold text-green-800">Total coordinated price:</span>
                    <span className="font-bold text-green-800">${getCoordinatedPrice()} per person</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {tourSelection.route && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isFormValid && !isSubmitting
                      ? 'bg-green-700 hover:bg-green-600 text-white transform hover:scale-105 shadow-lg'
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Submit Request - We'll Arrange Everything!</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestForm;