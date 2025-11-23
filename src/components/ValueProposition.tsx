import React from 'react';
import { CheckCircle, Phone, Calendar, MapPin, Users, DollarSign } from 'lucide-react';

const ValueProposition: React.FC = () => {
  const benefits = [
    { icon: Calendar, text: 'Restaurant reservations' },
    { icon: MapPin, text: 'Museum and attraction bookings' },
    { icon: Users, text: 'Activity scheduling' },
    { icon: CheckCircle, text: 'Hotel accommodations' },
    { icon: MapPin, text: 'Transportation coordination' },
    { icon: DollarSign, text: 'Group rate negotiations' },
    { icon: CheckCircle, text: 'Perfect timing between experiences' }
  ];

  return (
    <section className="py-20 bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Why Choose Roots & Routes Coordination?
          </h2>
          <p className="text-2xl text-amber-300 font-semibold mb-4">
            You choose your experiences, we make it happen!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-8 text-amber-300" style={{ fontFamily: 'Playfair Display, serif' }}>
              We handle ALL bookings and arrangements for you:
            </h3>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="bg-amber-400 text-green-900 p-2 rounded-full">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-medium">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-green-700 rounded-xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="bg-amber-400 text-green-900 text-6xl font-bold py-4 px-6 rounded-lg inline-block mb-4">
                1
              </div>
              <h4 className="text-2xl font-bold text-amber-300 mb-2">
                ONE REQUEST = COMPLETE COORDINATION
              </h4>
            </div>
            
            <div className="space-y-6">
              <div className="bg-green-600 rounded-lg p-6">
                <h5 className="text-xl font-bold mb-3 text-amber-300">Dream it</h5>
                <p className="text-green-100">Choose your heritage themes and experiences</p>
              </div>
              
              <div className="bg-green-600 rounded-lg p-6">
                <h5 className="text-xl font-bold mb-3 text-amber-300">Select it</h5>
                <p className="text-green-100">Pick your route and daily activities</p>
              </div>
              
              <div className="bg-green-600 rounded-lg p-6">
                <h5 className="text-xl font-bold mb-3 text-amber-300">We'll arrange it all!</h5>
                <p className="text-green-100">Complete coordination and booking service</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-amber-400 text-green-900 rounded-xl p-8 max-w-2xl mx-auto">
            <h4 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              "Dream it, select it, we'll arrange it all!"
            </h4>
            <div className="flex items-center justify-center space-x-4 mt-6">
              <Phone className="h-6 w-6" />
              <span className="text-xl font-bold">780-933-0182</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;