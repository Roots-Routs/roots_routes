import React from 'react';
import Hero from '../components/Hero';
import HeritageThemes from '../components/HeritageThemes';
import TourRoutes from '../components/TourRoutes';
import ValueProposition from '../components/ValueProposition';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <HeritageThemes />
      <TourRoutes />
      <ValueProposition />
    </div>
  );
};

export default HomePage;