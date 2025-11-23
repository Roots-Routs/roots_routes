import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Phone, Mail, Calendar, Users, FileText, Clock, ArrowLeft } from 'lucide-react';

const ConfirmationPage: React.FC = () => {
  const steps = [
    {
      icon: CheckCircle,
      title: 'Your request logged with all selected experiences',
      description: 'We have received your complete heritage tour preferences and requirements.',
      status: 'completed'
    },
    {
      icon: Phone,
      title: 'We contact every venue, restaurant, and activity provider',
      description: 'Our team reaches out to all your selected experiences to check availability.',
      status: 'in-progress'
    },
    {
      icon: Calendar,
      title: 'Confirm availability for your preferred dates',
      description: 'We coordinate schedules to ensure perfect timing for your heritage journey.',
      status: 'pending'
    },
    {
      icon: Users,
      title: 'Negotiate group rates and coordinate timing',
      description: 'We secure the best prices and optimal scheduling for your group.',
      status: 'pending'
    },
    {
      icon: FileText,
      title: 'Create confirmed itinerary with all arrangements made',
      description: 'Your complete heritage tour package with all bookings confirmed.',
      status: 'pending'
    },
    {
      icon: Phone,
      title: 'Call you within 24 hours with complete details',
      description: 'Personal consultation to finalize your Alberta heritage adventure.',
      status: 'pending'
    }
  ];

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'in-progress':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-green-500 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Your Custom Heritage Tour Request Received!
          </h1>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Thank you for choosing Roots & Routes Heritage Tours. We're excited to create your personalized Alberta heritage adventure.
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            What Happens Next:
          </h2>
          
          <div className="space-y-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className={`flex items-start space-x-4 p-4 rounded-lg border-2 ${getStepColor(step.status)}`}>
                  <div className={`rounded-full p-2 flex-shrink-0 ${getIconColor(step.status)}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-lg font-bold">
                        {index + 1}.
                      </span>
                      <h3 className="text-lg font-bold">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Message */}
        <div className="bg-amber-400 text-green-900 rounded-xl p-8 text-center mb-8">
          <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            "You choose the stories you want to explore - we arrange everything else!"
          </h3>
          <p className="text-lg font-medium">
            Sit back and relax while we coordinate your perfect heritage journey
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-green-800 text-white rounded-xl p-8 text-center mb-8">
          <h3 className="text-2xl font-bold mb-6 text-amber-300" style={{ fontFamily: 'Playfair Display, serif' }}>
            We'll Be In Touch Soon
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <Phone className="h-6 w-6 text-amber-300" />
              <div>
                <p className="font-bold text-amber-300">Renee Charbonneau</p>
                <p className="text-lg">780-933-0182</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <Mail className="h-6 w-6 text-amber-300" />
              <div>
                <p className="font-bold text-amber-300">Email</p>
                <p className="text-sm">exec.director@motorcycletourism.ca</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-700 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-amber-300 mb-2">
              <Clock className="h-5 w-5" />
              <span className="font-bold">Expected Response Time</span>
            </div>
            <p className="text-xl font-bold">Within 24 Hours</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;