import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TourSelection, TourRoute, HeritageTheme, Experience, DailyExperiences, Accommodation } from '../types/tour';

interface TourContextType {
  tourSelection: TourSelection;
  updateRoute: (route: TourRoute) => void;
  updateThemes: (themes: HeritageTheme[]) => void;
  updateDailyExperience: (dayIndex: number, slot: keyof DailyExperiences, experience: Experience | undefined) => void;
  updateCustomerInfo: (info: Partial<TourSelection['customerInfo']>) => void;
  getTotalPrice: () => number;
  getCoordinatedPrice: () => number;
  getSavings: () => number;
  clearDailyExperiences: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [tourSelection, setTourSelection] = useState<TourSelection>({
    themes: [],
    dailyExperiences: [],
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      groupSize: 1,
      preferredDates: '',
      dietaryRequirements: '',
      accessibilityNeeds: '',
      heritageBackground: '',
      wantsBusTransportation: false
    }
  });

  const updateRoute = (route: TourRoute) => {
    setTourSelection(prev => {
      // Initialize daily experiences array based on route duration
      const dailyExperiences = Array.from({ length: route.duration }, () => ({}));
      return { ...prev, route, dailyExperiences };
    });
  };

  const updateThemes = (themes: HeritageTheme[]) => {
    setTourSelection(prev => ({ ...prev, themes }));
  };


  const updateDailyExperience = (dayIndex: number, slot: keyof DailyExperiences, experience: Experience | undefined) => {
    setTourSelection(prev => {
      const newDailyExperiences = [...prev.dailyExperiences];
      
      // Ensure the array is long enough
      while (newDailyExperiences.length <= dayIndex) {
        newDailyExperiences.push({});
      }
      
      // If selecting a full-day experience, clear morning and afternoon
      if (slot === 'fullDayExperience' && experience) {
        newDailyExperiences[dayIndex] = {
          ...newDailyExperiences[dayIndex],
          fullDayExperience: experience,
          morningExperience: undefined,
          afternoonExperience: undefined
        };
      }
      // If selecting morning or afternoon, clear full-day experience
      else if ((slot === 'morningExperience' || slot === 'afternoonExperience') && experience) {
        newDailyExperiences[dayIndex] = {
          ...newDailyExperiences[dayIndex],
          [slot]: experience,
          fullDayExperience: undefined
        };
      }
      // For lunch and supper, just update normally
      else {
        newDailyExperiences[dayIndex] = {
          ...newDailyExperiences[dayIndex],
          [slot]: experience
        };
      }
      
      return { ...prev, dailyExperiences: newDailyExperiences };
    });
  };

  const updateCustomerInfo = (info: Partial<TourSelection['customerInfo']>) => {
    setTourSelection(prev => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, ...info }
    }));
  };

  const clearDailyExperiences = () => {
    setTourSelection(prev => ({
      ...prev,
      dailyExperiences: prev.route ? Array.from({ length: prev.route.duration }, () => ({})) : []
    }));
  };

  const getTotalPrice = () => {
    let experienceTotal = tourSelection.dailyExperiences.reduce((total, day) => {
      let dayTotal = 0;
      if (day.morningExperience) dayTotal += day.morningExperience.price;
      if (day.afternoonExperience) dayTotal += day.afternoonExperience.price;
      if (day.lunchRestaurant) dayTotal += day.lunchRestaurant.price;
      if (day.supperRestaurant) dayTotal += day.supperRestaurant.price;
      if (day.fullDayExperience) dayTotal += day.fullDayExperience.price;
      if (day.accommodation) dayTotal += (day.accommodation.pricePerRoom / 2); // Per person, double occupancy
      return total + dayTotal;
    }, 0);
    
    return experienceTotal;
  };

  const getCoordinatedPrice = () => {
    const total = getTotalPrice();
    const conciergeServiceFee = Math.round(total * 0.15); // 15% concierge service fee
    return total + conciergeServiceFee;
  };

  const getSavings = () => {
    const retail = getTotalPrice();
    const negotiatedDiscount = Math.round(retail * 0.12); // 12% Roots & Routes savings
    return negotiatedDiscount;
  };

  return (
    <TourContext.Provider value={{
      tourSelection,
      updateRoute,
      updateThemes,
      updateDailyExperience,
      updateCustomerInfo,
      getTotalPrice,
      getCoordinatedPrice,
      getSavings,
      clearDailyExperiences
    }}>
      {children}
    </TourContext.Provider>
  );
};