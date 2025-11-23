export interface HeritageTheme {
  id: string;
  name: string;
  icon: string;
  description: string;
  experiences: string[];
}

export interface TourRoute {
  id: string;
  name: string;
  duration: number;
  description: string;
  image: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  name: string;
  type: 'morning' | 'afternoon' | 'evening' | 'lunch';
  category: 'attraction' | 'restaurant';
  price: number;
  description: string;
  theme: string;
  isFullDay?: boolean;
  image: string;
}

export interface Accommodation {
  id: string;
  name: string;
  pricePerRoom: number;
  description: string;
  amenities: string[];
  rating: number;
  image: string;
}

export interface DailyExperiences {
  morningExperience?: Experience;
  afternoonExperience?: Experience;
  lunchRestaurant?: Experience;
  supperRestaurant?: Experience;
  fullDayExperience?: Experience;
  accommodation?: Accommodation;
}

export interface TourSelection {
  route?: TourRoute;
  themes: HeritageTheme[];
  dailyExperiences: DailyExperiences[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    groupSize: number;
    preferredDates: string;
    dietaryRequirements: string;
    accessibilityNeeds: string;
    heritageBackground: string;
    wantsBusTransportation: boolean;
  };
}