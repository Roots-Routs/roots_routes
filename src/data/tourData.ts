import { HeritageTheme, TourRoute, Experience, Museum } from '../types/tour';
import { Accommodation } from '../types/tour';
import { useSupabaseData } from '../hooks/useSupabaseData';

// Fallback data for when Supabase is not available
export const fallbackHeritageThemes: HeritageTheme[] = [
  {
    id: 'indigenous',
    name: 'Indigenous Heritage',
    icon: '🏛️',
    description: 'First Nations sacred sites and storytelling traditions',
    experiences: [
      'First Nations sacred sites and storytelling traditions',
      'Métis settlements and cultural celebrations',
      'Traditional crafts, foods, and ceremonies',
      'Medicine wheels and ancient gathering places'
    ]
  },
  {
    id: 'western',
    name: 'Western Heritage',
    icon: '🤠',
    description: 'RCMP history and frontier justice',
    experiences: [
      'RCMP history and frontier justice',
      'Ranching culture and cowboy traditions',
      'Pioneer settlements and homestead stories',
      'Rodeos, cattle drives, and western cuisine'
    ]
  },
  {
    id: 'european',
    name: 'European Roots',
    icon: '🌾',
    description: 'Ukrainian churches, festivals, and traditional foods',
    experiences: [
      'Ukrainian churches, festivals, and traditional foods',
      'Mennonite communities and agricultural heritage',
      'Scandinavian settlements and cultural centers',
      'French-Canadian fur trade routes and traditions'
    ]
  },
  {
    id: 'frontier',
    name: 'Frontier Stories',
    icon: '🛤️',
    description: 'Coal mining heritage and boom towns',
    experiences: [
      'Coal mining heritage and boom towns',
      'Railway development and station museums',
      'Trading posts and whiskey trader tales',
      'Ghost towns and abandoned settlements'
    ]
  }
];

export const fallbackTourRoutes: TourRoute[] = [
  // 3-Day Express Tours
  {
    id: 'northern-rockies-express', 
    name: 'Northern Rockies Express',
    duration: 3,
    description: 'NW Alberta - Northern Rockies adventure through pristine wilderness and mountain heritage',
    image: '/3day_nrockiesexpress.png',
    featured: true
  },
  {
    id: 'lakeland-express',
    name: 'Lakeland Express',
    duration: 3,
    description: 'NE Alberta - Northeast Alberta lakeland, Indigenous heritage, and natural beauty',
    image: '/threedaycard.png'
  },
  {
    id: 'chinook-country-express',
    name: 'Chinook Country Express',
    duration: 3,
    description: 'South Alberta - Southern Alberta prairies, ranching culture, and western heritage',
    image: '/threedaycard.png'
  },
  // 5-Day Heritage Tours
  {
    id: 'peaks-promises',
    name: 'Peaks & Promises',
    duration: 5,
    description: 'NW Alberta - Northwest Alberta mountain heritage and pioneer settlements',
    image: '/fivedaycardpng.png',
    featured: true
  },
  {
    id: 'tales-trapline',
    name: 'Tales of the Trapline',
    duration: 5,
    description: 'NE Alberta - Northeast Alberta fur trade routes and Indigenous storytelling traditions',
    image: '/fivedaycardpng.png',
    featured: true
  },
  {
    id: 'whiskey-traders',
    name: 'Whiskey Traders & Wind Walkers',
    duration: 5,
    description: 'South Alberta - South Alberta trading posts and frontier justice stories',
    image: '/fivedaycardpng.png'
  },
  // 7-Day Heritage Tours
  {
    id: 'northern-rockies-calling',
    name: 'Northern Rockies Calling', 
    duration: 7,
    description: 'NW Alberta - Northwest Alberta comprehensive mountain and cultural heritage journey',
    image: '/7day_nrockiescalling.png',
    featured: true
  },
  {
    id: 'heritage-circle',
    name: 'Alberta Heritage Circle',
    duration: 7,
    description: 'Central Alberta - Comprehensive cultural journey through all four heritage themes',
    image: '/sevenday_card.png'
  },
  {
    id: 'prairie-to-peaks',
    name: 'Prairie to Peaks Heritage',
    duration: 7,
    description: 'South Alberta - Complete Alberta experience from grasslands to mountain peaks',
    image: '/sevenday_card.png'
  },
  // 10-Day Ultimate Tours
  {
    id: 'midnight-sun-trail',
    name: 'Trail of the Midnight Sun',
    duration: 10,
    description: 'NW Alberta - Northern Alberta complete cultural immersion and natural wonders',
    image: '/10day_trailmidnightsun.png',
    featured: true
  },
  {
    id: 'badlands-boreal',
    name: 'Badlands to Boreal Adventure',
    duration: 10,
    description: 'Multi-Region - Calgary to Fort McMurray to Medicine Hat to Calgary loop - Ultimate Alberta diversity',
    image: '/tenday_card.png'
  },
  {
    id: 'alberta-heartland',
    name: 'The Alberta Heartland Adventure',
    duration: 10,
    description: 'South Central Alberta - Central & South Alberta Route including Waterton - Complete southern heritage experience',
    image: '/tenday_card.png'
  }
];

export const fallbackExperiences: Experience[] = [
  // Morning Attractions
  {
    id: 'ukrainian-village',
    name: 'Ukrainian Cultural Heritage Village',
    type: 'morning',
    category: 'attraction',
    price: 18,
    description: 'Traditional village life and cultural demonstrations',
    theme: 'european',
    image: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg'
  },
  {
    id: 'indigenous-storytelling',
    name: 'Indigenous storytelling with local Elders',
    type: 'morning',
    category: 'attraction',
    price: 25,
    description: 'Sacred traditions and oral history sharing',
    theme: 'indigenous',
    image: 'https://images.pexels.com/photos/6966292/pexels-photo-6966292.jpeg'
  },
  {
    id: 'rcmp-museum',
    name: 'RCMP museum and frontier justice stories',
    type: 'morning',
    category: 'attraction',
    price: 15,
    description: 'Law and order history in the Canadian West',
    theme: 'western',
    image: 'https://images.pexels.com/photos/8828462/pexels-photo-8828462.jpeg'
  },
  {
    id: 'mennonite-farm',
    name: 'Mennonite heritage farm and traditional crafts',
    type: 'morning',
    category: 'attraction',
    price: 22,
    description: 'Agricultural heritage and traditional skills',
    theme: 'european',
    image: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg'
  },
  {
    id: 'coal-mine-tour',
    name: 'Historic coal mine and boom town tour',
    type: 'morning',
    category: 'attraction',
    price: 20,
    description: 'Industrial heritage and mining community stories',
    theme: 'frontier',
    image: 'https://images.pexels.com/photos/162568/mining-excavator-coal-mining-wheel-162568.jpeg'
  },
  {
    id: 'medicine-wheel',
    name: 'Medicine wheel and sacred site visit',
    type: 'morning',
    category: 'attraction',
    price: 30,
    description: 'Ancient Indigenous spiritual sites and teachings',
    theme: 'indigenous',
    image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg'
  },
  
  // Afternoon Attractions
  {
    id: 'bannock-workshop',
    name: 'Traditional bannock making workshop',
    type: 'afternoon',
    category: 'attraction',
    price: 35,
    description: 'Indigenous cooking traditions and cultural sharing',
    theme: 'indigenous',
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg'
  },
  {
    id: 'blacksmith-demo',
    name: 'Western blacksmith demonstration',
    type: 'afternoon',
    category: 'attraction',
    price: 30,
    description: 'Pioneer skills and frontier craftsmanship',
    theme: 'western',
    image: 'https://images.pexels.com/photos/162553/blacksmith-craft-hot-glowing-162553.jpeg'
  },
  {
    id: 'scandinavian-weaving',
    name: 'Scandinavian weaving and textile arts',
    type: 'afternoon',
    category: 'attraction',
    price: 28,
    description: 'European textile traditions and cultural arts',
    theme: 'european',
    image: 'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg'
  },
  {
    id: 'voyageur-canoe',
    name: 'French-Canadian voyageur canoe experience',
    type: 'afternoon',
    category: 'attraction',
    price: 45,
    description: 'Fur trade history and traditional water travel',
    theme: 'european',
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg'
  },
  {
    id: 'railway-heritage',
    name: 'Railway heritage and station museum',
    type: 'afternoon',
    category: 'attraction',
    price: 18,
    description: 'Transportation history and community development',
    theme: 'frontier',
    image: 'https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg'
  },
  {
    id: 'ranch-experience',
    name: 'Working ranch and cattle drive experience',
    type: 'afternoon',
    category: 'attraction',
    price: 55,
    description: 'Authentic cowboy culture and ranching traditions',
    theme: 'western',
    image: 'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg'
  },
  
  // Full-Day Experiences
  {
    id: 'wilderness-immersion',
    name: 'Wilderness survival and traditional skills immersion',
    type: 'morning',
    category: 'attraction',
    price: 120,
    description: 'Full day learning traditional Indigenous survival skills and connection to the land',
    theme: 'indigenous',
    isFullDay: true,
    image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg'
  },
  {
    id: 'heritage-trail-ride',
    name: 'Historic trail ride and cowboy camp experience',
    type: 'morning',
    category: 'attraction',
    price: 150,
    description: 'Full day horseback journey following historic cattle drive routes',
    theme: 'western',
    isFullDay: true,
    image: 'https://images.pexels.com/photos/1996338/pexels-photo-1996338.jpeg'
  },
  {
    id: 'pioneer-homestead',
    name: 'Pioneer homestead living experience',
    type: 'morning',
    category: 'attraction',
    price: 110,
    description: 'Full day experiencing 1800s pioneer life and traditional skills',
    theme: 'european',
    isFullDay: true,
    image: 'https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg'
  },
  
  // Lunch Restaurants
  {
    id: 'indigenous-cafe',
    name: 'Three Sisters Indigenous Café',
    type: 'lunch',
    category: 'restaurant',
    price: 25,
    description: 'Traditional Indigenous ingredients in contemporary dishes',
    theme: 'indigenous',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  },
  {
    id: 'western-saloon',
    name: 'Historic Western Saloon',
    type: 'lunch',
    category: 'restaurant',
    price: 22,
    description: 'Authentic frontier atmosphere with hearty western fare',
    theme: 'western',
    image: 'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg'
  },
  {
    id: 'ukrainian-bistro',
    name: 'Ukrainian Heritage Bistro',
    type: 'lunch',
    category: 'restaurant',
    price: 20,
    description: 'Traditional Ukrainian comfort food and hospitality',
    theme: 'european',
    image: 'https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg'
  },
  {
    id: 'railway-diner',
    name: 'Historic Railway Diner',
    type: 'lunch',
    category: 'restaurant',
    price: 18,
    description: 'Classic diner fare in restored railway car',
    theme: 'frontier',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg'
  },
  {
    id: 'mennonite-kitchen',
    name: 'Mennonite Community Kitchen',
    type: 'lunch',
    category: 'restaurant',
    price: 16,
    description: 'Farm-fresh ingredients and traditional Mennonite recipes',
    theme: 'european',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  },
  
  // Supper Restaurants
  {
    id: 'indigenous-fusion',
    name: 'Indigenous fusion cuisine with traditional ingredients',
    type: 'evening',
    category: 'restaurant',
    price: 55,
    description: 'Contemporary Indigenous culinary traditions',
    theme: 'indigenous',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  },
  {
    id: 'ukrainian-feast',
    name: 'Ukrainian feast with live folk music',
    type: 'evening',
    category: 'restaurant',
    price: 48,
    description: 'Traditional Ukrainian hospitality and culture',
    theme: 'european',
    image: 'https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg'
  },
  {
    id: 'western-bbq',
    name: 'Western BBQ with cowboy poetry',
    type: 'evening',
    category: 'restaurant',
    price: 42,
    description: 'Ranch-style dining and western entertainment',
    theme: 'western',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  },
  {
    id: 'mennonite-dinner',
    name: 'Mennonite family-style dinner',
    type: 'evening',
    category: 'restaurant',
    price: 38,
    description: 'Traditional Mennonite hospitality and cuisine',
    theme: 'european',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  },
  {
    id: 'frontier-feast',
    name: 'Frontier trading post feast',
    type: 'evening',
    category: 'restaurant',
    price: 44,
    description: 'Historical frontier dining and storytelling',
    theme: 'frontier',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  },
  {
    id: 'indigenous-lodge',
    name: 'Indigenous cultural lodge dinner',
    type: 'evening',
    category: 'restaurant',
    price: 52,
    description: 'Traditional lodge atmosphere with cultural performances',
    theme: 'indigenous',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  },
  {
    id: 'ranch-cookout',
    name: 'Authentic ranch cookout under the stars',
    type: 'evening',
    category: 'restaurant',
    price: 46,
    description: 'Outdoor western dining with campfire atmosphere',
    theme: 'western',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  }
];

export const fallbackMuseum: Museum[] = [
  {
    id: '1',
    name: 'Museum Of The Highwood',
    streetNumber: '735',
    address: 'Main St',
    city: 'High River',
    Province: 'Alberta',
    region: 'Southern Alberta',
    postalCode: 'T1V 1N3',
    phone: '403-652-2110',
    email: 'info@museumofthehighwood.com',
    mobile: '403-652-2111',
    facebook: 'https://www.facebook.com/museumofthehighwood',
    website: 'https://museumofthehighwood.com/',
    theme: 'western'
  },
];

export const fallbackAccommodations: Accommodation[] = [
  {
    id: 'heritage-inn',
    name: 'Heritage Inn & Suites',
    pricePerRoom: 180,
    description: 'Comfortable mid-range hotel with heritage-themed decor and modern amenities',
    amenities: ['Free WiFi', 'Continental Breakfast', 'Fitness Center', 'Business Center'],
    rating: 4.2,
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'
  },
  {
    id: 'historic-boutique',
    name: 'Historic Boutique Hotel',
    pricePerRoom: 280,
    description: 'Beautifully restored historic property with unique character and premium service',
    amenities: ['Free WiFi', 'Gourmet Breakfast', 'Spa Services', 'Concierge', 'Room Service'],
    rating: 4.7,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
  },
  {
    id: 'prairie-lodge',
    name: 'Prairie View Lodge',
    pricePerRoom: 220,
    description: 'Rustic lodge with stunning prairie views and authentic western atmosphere',
    amenities: ['Free WiFi', 'Hot Breakfast', 'Fireplace Lounge', 'Outdoor Activities'],
    rating: 4.4,
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'
  },
  {
    id: 'mountain-resort',
    name: 'Mountain Heritage Resort',
    pricePerRoom: 320,
    description: 'Luxury mountain resort with spectacular views and world-class amenities',
    amenities: ['Free WiFi', 'Fine Dining', 'Spa & Wellness', 'Adventure Concierge', 'Room Service'],
    rating: 4.8,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg'
  },
  {
    id: 'budget-comfort',
    name: 'Comfort Inn Express',
    pricePerRoom: 120,
    description: 'Clean, comfortable accommodations with essential amenities at great value',
    amenities: ['Free WiFi', 'Continental Breakfast', 'Pool', 'Parking'],
    rating: 3.9,
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'
  },
  {
    id: 'cultural-b&b',
    name: 'Cultural Heritage B&B',
    pricePerRoom: 160,
    description: 'Charming bed & breakfast showcasing local cultural heritage and hospitality',
    amenities: ['Free WiFi', 'Homemade Breakfast', 'Cultural Tours', 'Local Guides'],
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
  }
];

// Export functions that try Supabase first, then fall back to static data
export const useHeritageThemes = () => {
  const { heritageThemes, loading, error } = useSupabaseData();
  return { 
    heritageThemes: error ? fallbackHeritageThemes : heritageThemes, 
    loading, 
    error 
  };
};

export const useTourRoutes = () => {
  const { tourRoutes, loading, error } = useSupabaseData();
  return { 
    tourRoutes: error ? fallbackTourRoutes : tourRoutes, 
    loading, 
    error 
  };
};

export const useExperiences = () => {
  const { experiences, loading, error } = useSupabaseData();
  return { 
    experiences: error ? fallbackExperiences : experiences, 
    loading, 
    error 
  };
};

export const useAccommodations = () => {
  const { accommodations, loading, error } = useSupabaseData();
  return { 
    accommodations: error ? fallbackAccommodations : accommodations, 
    loading, 
    error 
  };
};

// For backward compatibility, export the fallback data as the original names
export const heritageThemes = fallbackHeritageThemes;
export const tourRoutes = fallbackTourRoutes;
export const experiences = fallbackExperiences;
export const accommodations = fallbackAccommodations;
export const museums = fallbackMuseum;