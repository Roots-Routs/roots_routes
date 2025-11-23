import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { HeritageTheme, TourRoute, Experience, Accommodation } from '../types/tour';

export interface Partner {
  id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface RoutePartner {
  id: string;
  route_id: string;
  partner_id: string;
  partner: Partner;
}

// Convert database records to frontend types
const convertToHeritageTheme = (record: any): HeritageTheme => ({
  id: record.id,
  name: record.name,
  icon: record.icon,
  description: record.description,
  experiences: record.experiences || []
});

const convertToTourRoute = (record: any): TourRoute => ({
  id: record.id,
  name: record.name,
  duration: record.duration,
  description: record.description,
  image: record.image,
  featured: record.featured
});

const convertToExperience = (record: any): Experience => ({
  id: record.id,
  name: record.name,
  type: record.type as 'morning' | 'afternoon' | 'evening' | 'lunch',
  category: record.category as 'attraction' | 'restaurant',
  price: parseFloat(record.price),
  description: record.description,
  theme: record.theme,
  isFullDay: record.is_full_day,
  image: record.image
});

const convertToAccommodation = (record: any): Accommodation => ({
  id: record.id,
  name: record.name,
  pricePerRoom: parseFloat(record.price_per_room),
  description: record.description,
  amenities: record.amenities || [],
  rating: parseFloat(record.rating),
  image: record.image
});

export const useSupabaseData = () => {
  const [heritageThemes, setHeritageThemes] = useState<HeritageTheme[]>([]);
  const [tourRoutes, setTourRoutes] = useState<TourRoute[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [
        themesResult,
        routesResult,
        experiencesResult,
        accommodationsResult,
        partnersResult
      ] = await Promise.all([
        supabase.from('heritage_themes').select('*').order('name'),
        supabase.from('tour_routes').select('*').order('duration, name'),
        supabase.from('experiences').select('*').order('type, name'),
        supabase.from('accommodations').select('*').order('name'),
        supabase.from('partners').select('*').order('name')
      ]);

      if (themesResult.error) throw themesResult.error;
      if (routesResult.error) throw routesResult.error;
      if (experiencesResult.error) throw experiencesResult.error;
      if (accommodationsResult.error) throw accommodationsResult.error;
      if (partnersResult.error) throw partnersResult.error;

      setHeritageThemes(themesResult.data.map(convertToHeritageTheme));
      setTourRoutes(routesResult.data.map(convertToTourRoute));
      setExperiences(experiencesResult.data.map(convertToExperience));
      setAccommodations(accommodationsResult.data.map(convertToAccommodation));
      setPartners(partnersResult.data);

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return {
    heritageThemes,
    tourRoutes,
    experiences,
    accommodations,
    partners,
    loading,
    error,
    refetch
  };
};